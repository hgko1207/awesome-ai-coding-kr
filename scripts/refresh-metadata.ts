import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { collectionDir, DEFAULT_COLLECTION } from "./lib/load.ts";
import { computeStatus } from "./lib/schema.ts";

/**
 * GitHub API로 stars / last_commit / status / fetched_at 를 갱신한다.
 * - 인증: GITHUB_TOKEN 환경변수 사용 (없으면 비인증 60회/시 제한 — Actions에서는 항상 주입됨)
 * - 커밋 노이즈 방지: stars/last_commit/status 중 하나라도 "실제로" 바뀐 파일만 다시 쓴다.
 *   fetched_at만 바뀐 경우는 저장하지 않는다 → 매일 의미 없는 diff가 쌓이지 않음.
 * - repo가 null인 도구(클로즈드 소스)는 건너뛴다.
 *
 * YAML을 정규식으로 한 줄씩 치환한다(주석/순서 보존). 파싱은 변경 감지에만 사용.
 */

const TOKEN = process.env.GITHUB_TOKEN;
const NOW = new Date();
const headers: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "User-Agent": "awesome-ai-coding-kr-refresh",
};
if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

interface Meta {
  stars: number | null;
  lastCommit: string | null;
  archived: boolean;
}

async function fetchRepo(repo: string): Promise<Meta | null> {
  const r = await fetch(`https://api.github.com/repos/${repo}`, { headers });
  if (r.status === 403 && r.headers.get("x-ratelimit-remaining") === "0") {
    throw new Error("GitHub API 레이트리밋 초과 (GITHUB_TOKEN을 설정하세요)");
  }
  if (!r.ok) {
    console.warn(`  ⚠️  ${repo}: HTTP ${r.status} — 건너뜀`);
    return null;
  }
  const j = (await r.json()) as { stargazers_count: number; pushed_at: string; archived: boolean };
  return {
    stars: j.stargazers_count ?? null,
    lastCommit: j.pushed_at ? j.pushed_at.slice(0, 10) : null,
    archived: Boolean(j.archived),
  };
}

function setField(yaml: string, key: string, value: string): string {
  const re = new RegExp(`^(${key}:).*$`, "m");
  if (re.test(yaml)) return yaml.replace(re, `$1 ${value}`);
  return yaml; // 키가 없으면 그대로 (스키마상 항상 존재)
}

const dir = join(collectionDir(DEFAULT_COLLECTION), "tools");
const files = readdirSync(dir).filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"));
let changed = 0;

for (const file of files) {
  const path = join(dir, file);
  const raw = readFileSync(path, "utf8");
  const data = parse(raw) as { repo?: string | null; stars?: number | null; last_commit?: string | null; status?: string };

  if (!data.repo) {
    console.log(`  – ${file}: repo 없음, 건너뜀`);
    continue;
  }

  let meta: Meta | null;
  try {
    meta = await fetchRepo(data.repo);
  } catch (e) {
    console.error(`  ❌ ${(e as Error).message}`);
    process.exit(1);
  }
  if (!meta) continue;

  const newStatus = computeStatus(meta.lastCommit, meta.archived, NOW);
  const realChange =
    meta.stars !== (data.stars ?? null) ||
    meta.lastCommit !== (data.last_commit ?? null) ||
    newStatus !== (data.status ?? "unknown");

  let yaml = raw;
  yaml = setField(yaml, "stars", String(meta.stars));
  yaml = setField(yaml, "last_commit", meta.lastCommit ? `"${meta.lastCommit}"` : "null");
  yaml = setField(yaml, "status", newStatus);
  yaml = setField(yaml, "fetched_at", `"${NOW.toISOString()}"`);

  if (realChange) {
    writeFileSync(path, yaml, "utf8");
    changed++;
    console.log(`  ✓ ${file}: ⭐${meta.stars} · ${meta.lastCommit} · ${newStatus}`);
  } else {
    console.log(`  = ${file}: 변경 없음 (저장 안 함)`);
  }
}

console.log(`\n갱신 완료 — ${changed}개 파일 변경됨.`);
