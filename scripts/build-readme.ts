import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadCollection, ROOT } from "./lib/load.ts";
import type { Tool } from "./lib/schema.ts";

const { tools, categories, errors } = loadCollection();
if (errors.length) {
  console.error("❌ 검증 에러가 있어 README를 생성하지 않습니다. `npm run validate`로 확인하세요.");
  process.exit(1);
}

const STATUS_BADGE: Record<string, string> = {
  active: "🟢",
  stale: "⚠️ 오래됨",
  archived: "🪦 보관됨",
  unknown: "",
};

function stars(rating: number | null | undefined): string {
  if (rating == null) return "";
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function nameCell(t: Tool): string {
  const link = t.homepage ?? (t.repo ? `https://github.com/${t.repo}` : null);
  const display = link ? `[${t.name}](${link})` : t.name;
  const verified = t.tried ? " ✅" : "";
  return `${display}${verified}`;
}

function starsCount(t: Tool): string {
  if (t.stars == null) return "—";
  return t.stars >= 1000 ? `${(t.stars / 1000).toFixed(1)}k` : String(t.stars);
}

function row(t: Tool): string {
  const cells = [
    nameCell(t),
    t.review.ko.blurb + (t.review.ko.post ? ` · [📝 글](${t.review.ko.post})` : ""),
    t.tried ? stars(t.rating) : "미사용",
    starsCount(t),
    STATUS_BADGE[t.status] ?? "",
  ];
  return `| ${cells.join(" | ")} |`;
}

const lines: string[] = [];
lines.push("# awesome-ai-coding-kr");
lines.push("");
lines.push(
  "> 직접 써본 AI 코딩 도구를 **솔직한 한국어 평**과 함께 모은 큐레이션. 양이 아니라 신뢰로 승부합니다.",
);
lines.push(">");
lines.push("> ✅ = 큐레이터가 직접 써보고 검증한 도구 · ★ = 직접 써본 도구의 5점 만점 평가");
lines.push("");

const triedCount = tools.filter((t) => t.tried).length;
lines.push(
  `**도구 ${tools.length}개** · 직접 검증 **${triedCount}개** · 마지막 갱신은 GitHub Actions가 자동 수행`,
);
lines.push("");
lines.push("<!-- 이 파일은 scripts/build-readme.ts가 자동 생성합니다. 직접 수정하지 마세요. -->");
lines.push("");

// 목차
lines.push("## 목차");
lines.push("");
for (const c of categories) {
  const count = tools.filter((t) => t.category === c.key).length;
  if (!count) continue;
  const anchor = c.name.toLowerCase().replace(/[^\w가-힣]+/g, "-");
  lines.push(`- [${c.name}](#${anchor}) (${count})`);
}
lines.push("");

// 카테고리별 표
for (const c of categories) {
  const inCat = tools
    .filter((t) => t.category === c.key)
    .sort((a, b) => {
      // 직접 써본 것 우선, 그다음 별점, 그다음 스타
      if (a.tried !== b.tried) return a.tried ? -1 : 1;
      if ((b.rating ?? 0) !== (a.rating ?? 0)) return (b.rating ?? 0) - (a.rating ?? 0);
      return (b.stars ?? 0) - (a.stars ?? 0);
    });
  if (!inCat.length) continue;

  lines.push(`## ${c.name}`);
  lines.push("");
  if (c.description) {
    lines.push(`_${c.description}_`);
    lines.push("");
  }
  lines.push("| 도구 | 한 줄 평 | 평가 | ⭐ | 상태 |");
  lines.push("|---|---|---|---|---|");
  for (const t of inCat) lines.push(row(t));
  lines.push("");
}

lines.push("---");
lines.push("");
lines.push(
  "이 리스트는 [설계 문서](awesome-ai-coding-kr-design.md)를 기반으로 만들어졌습니다. 데이터는 `collections/ai-coding/tools/*.yaml`에 있습니다.",
);
lines.push("");

writeFileSync(join(ROOT, "README.md"), lines.join("\n"), "utf8");
console.log(`✅ README.md 생성 완료 — 도구 ${tools.length}개, 카테고리 ${categories.length}개`);
