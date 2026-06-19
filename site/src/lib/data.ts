import { readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

// 빌드 타임에 저장소 루트의 collections/ 를 읽는다.
// data.ts 위치: site/src/lib/ → 루트까지 ../../../
const COLLECTION = "ai-coding";
const baseUrl = new URL(`../../../collections/${COLLECTION}/`, import.meta.url);

export interface Tool {
  id: string;
  name: string;
  repo: string | null;
  homepage?: string;
  category: string;
  tags: string[];
  pricing?: string;
  platform: string[];
  tried: boolean;
  rating: number | null;
  popular?: boolean;
  status: string;
  stars: number | null;
  last_commit: string | null;
  review: { ko: { blurb: string; body?: string; post?: string } };
}

export interface Category {
  key: string;
  name: string;
  description?: string;
}

export function getCategories(): Category[] {
  const path = fileURLToPath(new URL("categories.yaml", baseUrl));
  const data = parse(readFileSync(path, "utf8")) as { categories: Category[] };
  return data.categories;
}

export function getTools(): Tool[] {
  const dir = fileURLToPath(new URL("tools/", baseUrl));
  if (!existsSync(dir)) return [];
  const files = readdirSync(dir).filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"));
  const tools = files.map((f) => parse(readFileSync(`${dir}${f}`, "utf8")) as Tool);
  // 직접 써본 것 → 인기 → 별점 → 스타
  return tools.sort((a, b) => {
    if (a.tried !== b.tried) return a.tried ? -1 : 1;
    if (!!a.popular !== !!b.popular) return a.popular ? -1 : 1;
    if ((b.rating ?? 0) !== (a.rating ?? 0)) return (b.rating ?? 0) - (a.rating ?? 0);
    return (b.stars ?? 0) - (a.stars ?? 0);
  });
}

export function link(t: Tool): string | null {
  return t.homepage ?? (t.repo ? `https://github.com/${t.repo}` : null);
}

export function starsLabel(stars: number | null): string {
  if (stars == null) return "";
  return stars >= 1000 ? `${(stars / 1000).toFixed(1)}k ★` : `${stars} ★`;
}

export const STATUS_LABEL: Record<string, string> = {
  active: "🟢 활발",
  stale: "⚠️ 오래됨",
  archived: "🪦 보관됨",
  unknown: "",
};
