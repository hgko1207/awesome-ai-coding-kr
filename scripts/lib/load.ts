import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import {
  ToolSchema,
  CategoriesFileSchema,
  ResourceSchema,
  type Tool,
  type Category,
  type Resource,
} from "./schema.ts";

export const ROOT = fileURLToPath(new URL("../../", import.meta.url));
export const DEFAULT_COLLECTION = "ai-coding";

export function collectionDir(collection = DEFAULT_COLLECTION): string {
  return join(ROOT, "collections", collection);
}

export interface LoadResult {
  tools: Tool[];
  categories: Category[];
  errors: { file: string; message: string }[];
}

/** 컬렉션의 모든 도구 YAML과 카테고리를 읽고 검증한다. 에러는 모아서 반환(throw 안 함). */
export function loadCollection(collection = DEFAULT_COLLECTION): LoadResult {
  const dir = collectionDir(collection);
  const errors: LoadResult["errors"] = [];

  // 카테고리
  const catPath = join(dir, "categories.yaml");
  let categories: Category[] = [];
  if (!existsSync(catPath)) {
    errors.push({ file: catPath, message: "categories.yaml 없음" });
  } else {
    const parsed = CategoriesFileSchema.safeParse(parse(readFileSync(catPath, "utf8")));
    if (parsed.success) categories = parsed.data.categories;
    else errors.push({ file: "categories.yaml", message: formatZod(parsed.error) });
  }

  // 도구들
  const toolsDir = join(dir, "tools");
  const tools: Tool[] = [];
  const seenIds = new Map<string, string>(); // id -> file
  const files = existsSync(toolsDir)
    ? readdirSync(toolsDir).filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"))
    : [];

  for (const file of files) {
    const raw = parse(readFileSync(join(toolsDir, file), "utf8"));
    const parsed = ToolSchema.safeParse(raw);
    if (!parsed.success) {
      errors.push({ file, message: formatZod(parsed.error) });
      continue;
    }
    const tool = parsed.data;

    // 파일명 == id 검증
    const expected = `${tool.id}.yaml`;
    if (file !== expected) {
      errors.push({ file, message: `파일명이 id와 다릅니다 (기대: ${expected})` });
    }
    // id 중복 검증
    if (seenIds.has(tool.id)) {
      errors.push({ file, message: `id 중복: '${tool.id}' (이미 ${seenIds.get(tool.id)})` });
    } else {
      seenIds.set(tool.id, file);
    }
    // 카테고리 존재 검증
    if (categories.length && !categories.some((c) => c.key === tool.category)) {
      errors.push({ file, message: `categories.yaml에 없는 category: '${tool.category}'` });
    }
    tools.push(tool);
  }

  return { tools, categories, errors };
}

/** 컬렉션의 학습 자료(resources/*.yaml)를 읽고 검증한다. */
export function loadResources(collection = DEFAULT_COLLECTION): {
  resources: Resource[];
  errors: LoadResult["errors"];
} {
  const dir = join(collectionDir(collection), "resources");
  const errors: LoadResult["errors"] = [];
  const resources: Resource[] = [];
  if (!existsSync(dir)) return { resources, errors };

  const seenIds = new Map<string, string>();
  const files = readdirSync(dir).filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"));
  for (const file of files) {
    const parsed = ResourceSchema.safeParse(parse(readFileSync(join(dir, file), "utf8")));
    if (!parsed.success) {
      errors.push({ file, message: formatZod(parsed.error) });
      continue;
    }
    const r = parsed.data;
    if (file !== `${r.id}.yaml`)
      errors.push({ file, message: `파일명이 id와 다릅니다 (기대: ${r.id}.yaml)` });
    if (seenIds.has(r.id)) errors.push({ file, message: `id 중복: '${r.id}'` });
    else seenIds.set(r.id, file);
    resources.push(r);
  }
  return { resources, errors };
}

function formatZod(err: import("zod").ZodError): string {
  return err.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`).join("; ");
}
