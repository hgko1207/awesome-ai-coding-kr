import { z } from "zod";

/**
 * 도구 1개 = collections/<collection>/tools/<id>.yaml 파일 하나.
 * - 사람이 입력하는 필드: 큐레이션의 가치 (tried, rating, review, tags, category ...)
 * - 기계가 입력하는 필드: 안 썩음의 근거 (stars, last_commit, status, fetched_at)
 *   → refresh-metadata.ts(GitHub Actions)가 채운다. 수동 입력 금지.
 */

export const CATEGORY_KEYS = [
  "agent",
  "ide-extension",
  "cli",
  "mcp-server",
  "autocomplete",
  "review",
  "prompt",
] as const;

export const PRICING = ["free", "freemium", "paid", "open-source"] as const;
export const PLATFORMS = ["macos", "windows", "linux", "web", "jetbrains", "vscode"] as const;
export const STATUS = ["active", "stale", "archived", "unknown"] as const;

const LangReview = z.object({
  blurb: z.string().min(1, "한 줄 평(blurb)은 비어 있으면 안 됩니다"),
  body: z.string().optional(),
  post: z.string().url().optional(), // 티스토리 심층글 링크
});

export const ToolSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "id는 kebab-case여야 합니다"),
    name: z.string().min(1),
    repo: z
      .string()
      .regex(/^[^/]+\/[^/]+$/, "repo는 owner/name 형식이어야 합니다")
      .nullable()
      .optional(),
    homepage: z.string().url().optional(),
    category: z.enum(CATEGORY_KEYS),
    tags: z.array(z.string()).default([]),
    pricing: z.enum(PRICING).optional(),
    platform: z.array(z.enum(PLATFORMS)).default([]),

    // --- 큐레이션 (사람) ---
    tried: z.boolean().default(false),
    rating: z.number().int().min(1).max(5).nullable().optional(),

    // --- 자동 수집 (기계) ---
    status: z.enum(STATUS).default("unknown"),
    stars: z.number().int().nullable().default(null),
    last_commit: z.string().nullable().default(null), // ISO date
    fetched_at: z.string().nullable().default(null), // ISO datetime

    review: z.object({
      ko: LangReview,
      en: LangReview.optional(),
    }),
  })
  .superRefine((tool, ctx) => {
    // 핵심 신뢰 규칙: 직접 써봤다면 별점이 있어야 하고, 안 써봤다면 별점이 없어야 한다.
    if (tool.tried && (tool.rating === null || tool.rating === undefined)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "tried: true 이면 rating(1~5)이 반드시 있어야 합니다",
        path: ["rating"],
      });
    }
    if (!tool.tried && tool.rating != null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "tried: false 인데 rating이 있습니다 (안 써본 도구에 별점 금지)",
        path: ["rating"],
      });
    }
  });

export type Tool = z.infer<typeof ToolSchema>;

export const CategorySchema = z.object({
  key: z.enum(CATEGORY_KEYS),
  name: z.string().min(1), // 한국어 표시명
  description: z.string().optional(),
});

export const CategoriesFileSchema = z.object({
  collection: z.string(),
  categories: z.array(CategorySchema),
});

export type Category = z.infer<typeof CategorySchema>;

/**
 * status 자동 계산 규칙 (단일 출처). refresh-metadata.ts가 이 함수를 사용한다.
 * - 기준: 마지막 커밋 시점
 * - 6개월(180일) 이상 커밋 없음 → stale
 * - 12개월(365일) 이상 또는 repo가 GitHub에서 archived → archived
 * - repo 없음/조회 실패 → unknown (closed-source 도구 등)
 */
export const STALE_DAYS = 180;
export const ARCHIVED_DAYS = 365;

export function computeStatus(
  lastCommitISO: string | null,
  repoArchived: boolean,
  now: Date,
): (typeof STATUS)[number] {
  if (repoArchived) return "archived";
  if (!lastCommitISO) return "unknown";
  const days = (now.getTime() - new Date(lastCommitISO).getTime()) / 86_400_000;
  if (days >= ARCHIVED_DAYS) return "archived";
  if (days >= STALE_DAYS) return "stale";
  return "active";
}
