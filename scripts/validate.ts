import { loadCollection } from "./lib/load.ts";

const { tools, categories, errors } = loadCollection();

if (errors.length) {
  console.error(`\n❌ 검증 실패 — ${errors.length}개 문제:\n`);
  for (const e of errors) console.error(`  • [${e.file}] ${e.message}`);
  console.error("");
  process.exit(1);
}

const tried = tools.filter((t) => t.tried).length;
console.log(
  `✅ 검증 통과 — 카테고리 ${categories.length}개, 도구 ${tools.length}개 (직접 써봄 ${tried}개)`,
);
