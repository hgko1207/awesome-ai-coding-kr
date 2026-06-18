# 설계 문서: awesome-ai-coding-kr

> 작성: /office-hours (빌더 모드) · 2026-06-18
> 작성자: hgko1207 (Ko Coding)
> 상태: DRAFT → 이 문서를 VSCode의 Claude에게 넘겨 구현 요청용으로 사용
> 모드: Builder (오픈소스 / 학습)

---

## 0. 이 문서를 어떻게 쓰나

이 파일은 **"무엇을 만들지"의 단일 출처(source of truth)**입니다.
VSCode에서 Claude에게 작업을 시킬 때, "이 설계 문서(`awesome-ai-coding-kr-design.md`) 읽고 Phase 1 구현해줘" 식으로 요청하세요.
각 섹션은 Claude가 코드/데이터/파일을 생성할 때 근거로 삼는 명세입니다.

---

## 1. 프로젝트명

**`awesome-ai-coding-kr`**

- GitHub의 `awesome-*` 관례를 따름 → 검색·발견이 쉽고 의미가 즉시 전달됨
- `-kr` → 한국어 우선임을 명시 (영어권 거대 리스트와 정면충돌 회피, 빈 땅 선점)
- 저장소 URL 예시: `github.com/hgko1207/awesome-ai-coding-kr`

> 나중에 다른 주제 컬렉션(예: 비개발자용)을 추가하게 되면, 생성 엔진을 별도 이름
> (예: `curait`, `tooldeck`)으로 분리할 수 있음. 지금은 첫 컬렉션 = 저장소 이름으로 단순하게 간다.

---

## 2. 우리가 궁극적으로 만들려는 것 (Vision)

> **"내가 매일 실제로 쓰는 AI 코딩 도구를, 직접 검증한 솔직한 평과 함께,
> 자동으로 안 썩게 관리되는 한국어 큐레이션으로 모아 두고 — 그걸 블로그와 연결해
> 동료·개발자·관심 있는 사람들에게 공유한다."**

세 가지가 동시에 충족되는 게 목표:
1. **나에게 유용** — 내 도구 북마크/스택이 검색·필터 가능한 형태로 정리됨 (dogfooding)
2. **남에게 공유 가능** — 한국어 + 솔직 평 + 블로그 심층글 → 동료/지인에게 바로 보낼 수 있는 자산
3. **나를 성장시킴** — GitHub Actions, 데이터 파이프라인, 정적 사이트 생성(SSG)을 직접 배움

핵심 플라이휠:
```
GitHub 리스트 ──(심층글 링크)──▶ 티스토리 블로그
     ▲                                  │
     └──────(스타·유입)──────────────────┘
```
두 자산(GitHub + 4년 된 티스토리 독자)을 연결해서 "제로 유통" 문제를 구조적으로 해소.

---

## 3. ai-collection 분석 — 그 방대함이 필요한가?

**결론: 필요 없다. 오히려 정반대로 가야 한다.**

| 항목 | ai-collection | awesome-ai-coding-kr (우리) |
|---|---|---|
| 범위 | 생성형 AI 앱 **전체** (수천 개) | AI **코딩 에이전트**만 (좁고 뾰족) |
| 별 | ~9,000 | (목표 아님 — 유용함이 목표) |
| 데이터 | 마크다운 중심 | YAML 데이터 + 자동 생성 |
| 큐레이션 | 링크 나열, 검증 없음 | **직접 써본 것 + 솔직 평** |
| 언어 | 영어 + 다국어 번역 | 한국어 우선 (이중언어 대비 구조) |
| 유지 | 대규모 커뮤니티 기여 | 1인 + 블로그 연동 (감당 가능한 범위) |
| 썩음 방지 | 수동 | **GitHub Actions 자동 갱신** |

**왜 방대함을 따라하면 안 되는가:**
- 포괄성은 이미 점령된 해자다. "모든 AI 앱"을 두 번째로 모으는 건 1등 리스트에 묻힌다.
- 망라형은 빠르게 썩는다. 1인이 수천 개를 검증·유지하는 건 불가능 (트레드밀).
- 우리의 무기는 **양이 아니라 신뢰**다: "이 사람이 직접 써보고 한국어로 솔직하게 평했다."

**ai-collection에서 가져올 좋은 점 (형식만):**
- 데이터 → 자동 사이트 생성 파이프라인 (단, 우리는 마크다운이 아니라 YAML 데이터로)
- 카테고리 분류 체계 (단, 우리는 "코딩 에이전트" 안에서만 세분화)

---

## 4. 대상 독자 — "교사/비개발자까지?"에 대한 답

방금 대상이 넓어졌다: 팀원 → 개발자 → 관심 있는 사람 → 비개발자(교사) 까지.
**하나의 리스트로 "AI 코딩 도구(개발자용)"와 "AI 도구(교사용)"를 동시에 잘 만들 수는 없다.** 둘은 다른 제품이다.

해결책: **레이어드(layered) 대상 구조 + 멀티 컬렉션 아키텍처.**
지금은 ① 한 컬렉션만 만들되, ② 시스템은 컬렉션을 더 붙일 수 있게 설계한다. (이중언어 트릭과 같은 원리: 갈아엎지 말고 위에 얹기.)

| 단계 | 대상 | 컬렉션 | 시점 |
|---|---|---|---|
| **Tier 0** | 나 자신 | AI 코딩 에이전트 | 지금 (dogfood) |
| **Tier 1** | 팀원·개발자 지인 | 동일 | 한국어판 배포되면 |
| **Tier 2** | 관심 있는 일반인 | 동일 (입문 태그) | 자연 확장 |
| **Tier 3 (선택)** | 비개발자·교사 | **별도 컬렉션** "비개발자용 AI 도구" | 첫 컬렉션이 자리 잡은 뒤에만 |

핵심: **교사용은 지금 만들지 않는다.** 단, `collections/` 구조로 데이터를 분리해 두면
나중에 `collections/ai-coding/` 옆에 `collections/ai-for-everyone/`를 추가하는 것만으로 확장된다.
각 컬렉션은 **항상 작고 의견 있게** 유지 — 절대 "전부 모으기"로 가지 않는다.

> 즉 "교사분들께도 공유"는 살아있는 가능성이지만, **별도의 작은 큐레이션**으로 풀어야지
> 첫 리스트를 넓혀서 풀면 안 된다. 그러면 ai-collection의 함정에 그대로 빠진다.

---

## 5. 무엇을 모으는가 (데이터 스키마)

각 도구 = `tools/*.yaml` 항목 하나. 언어 중립 메타데이터 + 언어별 리뷰 분리.

```yaml
# collections/ai-coding/tools/claude-code.yaml
id: claude-code                 # 고유 식별자 (kebab-case)
name: Claude Code               # 표시 이름
repo: anthropics/claude-code    # GitHub repo (스타/커밋 자동 수집용, 없으면 생략)
homepage: https://...           # 공식 사이트
category: agent                 # agent | ide-extension | cli | mcp-server | autocomplete | review | prompt
tags: [terminal, cli, anthropic]
pricing: freemium               # free | freemium | paid | open-source
platform: [macos, windows, linux]

tried: true                     # 내가 직접 써봤는가 (우리의 핵심 신뢰 지표)
rating: 5                        # 1~5, 직접 써본 경우만
status: active                  # 자동 갱신: active | stale | archived (마지막 커밋 기준)

# --- 자동 수집 필드 (GitHub Actions가 채움, 수동 입력 금지) ---
stars: null                     # 자동
last_commit: null               # 자동
fetched_at: null                # 자동

# --- 언어별 리뷰 (지금은 ko만, en은 나중에 추가만) ---
review:
  ko:
    blurb: "터미널에서 바로 쓰는 코딩 에이전트. 가장 많이 씀."   # 한 줄 솔직 평
    body: "..."                  # (선택) 더 긴 설명
    post: https://hgko-dev.tistory.com/...  # 티스토리 심층글 링크
  # en: { ... }                  # 나중에 영어판 확장 시
```

**카테고리 초안 (코딩 에이전트 안에서만 세분화):**
- `agent` — 자율 코딩 에이전트 (Claude Code, Cursor Agent 등)
- `ide-extension` — IDE 통합 (Copilot, Continue 등)
- `cli` — 터미널 도구
- `mcp-server` — MCP 서버
- `autocomplete` — 자동완성
- `review` — 코드 리뷰/PR 도구
- `prompt` — 프롬프트/스킬/룰 모음

**수집 정보 원칙:**
- 사람이 입력: `tried`, `rating`, `review.ko.blurb`, `tags`, `category` (= 큐레이션 = 가치)
- 기계가 입력: `stars`, `last_commit`, `status` (= 자동 = 안 썩음)

---

## 6. 내가 요청하면 무엇이 생성되나 (Request → Output)

VSCode에서 Claude에게 할 법한 요청과 그 결과물:

| 내 요청 | Claude가 하는 일 | 생성물 |
|---|---|---|
| "claude-code 항목 추가해줘" | 스키마대로 YAML 생성, 내가 blurb/rating만 채움 | `tools/claude-code.yaml` |
| "스타·커밋 자동 갱신 액션 만들어줘" | GitHub Action 워크플로 작성 | `.github/workflows/refresh.yml` |
| "README 자동 생성 스크립트 짜줘" | YAML들 → 카테고리별 마크다운 표로 빌드 | `scripts/build-readme.ts`, `README.md` |
| "Astro 사이트 만들어줘" | YAML 읽어 검색·필터 페이지 생성 | `site/` (Astro 프로젝트) |
| "죽은 프로젝트(stale) 표시해줘" | last_commit 6개월↑ 항목에 배지 | README/사이트에 ⚠️ 표시 |
| "이번 주 새로 추가된 도구로 블로그 초안 써줘" | 신규 항목 → 티스토리용 마크다운 초안 | `drafts/2026-06-xx.md` |
| "비개발자용 컬렉션 폴더 새로 만들어줘" | `collections/ai-for-everyone/` 스캐폴딩 | 새 컬렉션 뼈대 |

**최종 산출물 종류:**
1. `README.md` — GitHub에서 바로 보이는 카테고리별 큐레이션 표 (YAML에서 자동 생성)
2. 정적 사이트 — 검색·태그·필터 되는 웹페이지 (지인에게 보낼 URL)
3. 블로그 초안 — 신규/업데이트 도구 기반 티스토리 글 초안 (선택)
4. 데이터(`tools/*.yaml`) — 모든 것의 원천, 재사용·이전 가능

---

## 7. 저장소 구조

```
awesome-ai-coding-kr/
├── README.md                      # 자동 생성 (직접 수정 금지)
├── awesome-ai-coding-kr-design.md # 이 문서
├── collections/
│   └── ai-coding/
│       ├── categories.yaml        # 카테고리 정의/순서
│       └── tools/
│           ├── claude-code.yaml
│           ├── cursor.yaml
│           └── ...
├── scripts/
│   ├── build-readme.ts            # YAML → README.md
│   ├── refresh-metadata.ts        # GitHub API로 stars/last_commit 갱신
│   └── new-tool.ts                # 새 항목 스캐폴딩(대화형)
├── site/                          # Astro 정적 사이트 (Phase 3)
└── .github/workflows/
    ├── refresh.yml                # 매일: 메타데이터 갱신 + README 재빌드 + 커밋
    └── deploy.yml                 # 사이트 빌드 → GitHub Pages 배포
```

---

## 8. 단계별 구현 플랜

> 각 Phase를 VSCode에서 "Phase N 구현해줘"로 요청.

**Phase 1 — 존재하게 만들기 (하루)**
- [ ] 저장소 생성, 이 설계 문서 커밋
- [ ] `categories.yaml` 작성
- [ ] 직접 써본 도구 15~20개 `tools/*.yaml` 손으로 작성 (`tried: true`, blurb, rating)
- [ ] `build-readme.ts` 작성 → `README.md` 자동 생성
- 결과: GitHub에 바로 보이는 한국어 큐레이션 리스트

**Phase 2 — 안 썩게 만들기 (학습 1단계, 주말)**
- [ ] `refresh-metadata.ts` — GitHub API로 stars/last_commit 수집
- [ ] `status` 자동 계산 (6개월+ 커밋 없으면 `stale`)
- [ ] `.github/workflows/refresh.yml` — 매일 자동 갱신 + README 재빌드 + 자동 커밋
- 결과: 죽은 링크가 자동 표시되는 살아있는 리스트 (= GitHub Actions 학습)

**Phase 3 — 보여줄 수 있게 만들기 (학습 2단계)**
- [ ] Astro로 `site/` — YAML 읽어 카드 그리드 + 검색 + 태그/카테고리 필터
- [ ] `deploy.yml` — GitHub Pages 자동 배포
- 결과: 지인에게 보낼 URL 생김 (= SSG/배포 학습)

**Phase 4 — 연결 (플라이휠 가동)**
- [ ] 각 항목 `review.ko.post`에 티스토리 심층글 링크
- [ ] (선택) 신규 도구 → 블로그 초안 자동 생성 스크립트
- 결과: GitHub ↔ 티스토리 양방향 순환

**Phase 5 — 확장 (선택, 자리 잡은 뒤에만)**
- [ ] `review.ko` 옆에 `review.en` 추가 → 영어 라우트 (글로벌판)
- [ ] `collections/ai-for-everyone/` 추가 → 비개발자·교사용 작은 큐레이션

---

## 9. 이게 나한테 어떻게 도움이 되나

- **실용:** 매일 쓰는 도구가 검색 가능하게 정리됨. "그 MCP 서버 뭐였지" 가 사라짐.
- **학습:** GitHub Actions / 데이터 파이프라인 / SSG / GitHub Pages를 실전으로 익힘.
- **평판/네트워크:** 한국어 AI 코딩 큐레이션이라는 빈 땅에서 "검증된 큐레이터" 포지션.
- **콘텐츠 엔진:** 블로그 글감이 데이터에서 나옴 (큐레이션 → 심층글 → 트래픽).
- **공유 자산:** 팀원·지인에게 "이거 봐" 하고 보낼 URL 하나로 정리됨.

---

## 10. 차별화 핵심 (한 줄 요약)

> **"양으로 ai-collection과 싸우지 않는다. 좁은 주제 × 직접 검증 × 한국어 × 안 썩는 자동화 × 블로그 연결로 이긴다."**

---

## 11. 기술 스택 (권장)

- 데이터: **YAML** (사람이 읽고 쓰기 쉬움)
- 빌드 스크립트: **TypeScript** (당신 주력, Node 실행)
- 사이트: **Astro** (콘텐츠 사이트에 최적, 학습 가치 높고 무겁지 않음)
- 자동화: **GitHub Actions**
- 배포: **GitHub Pages** (무료, Actions와 자연 연동)

---

## 12. 열린 질문 (나중에 결정)

- 사이트 디자인 톤 (미니멀 / 컬러풀?) — Phase 3에서 결정
- 영어판 확장 시점 — 한국어판 트래픽 보고 판단
- 비개발자 컬렉션을 같은 저장소 vs 별도 저장소 — Tier 3 도달 시 결정
- 외부 기여(PR) 받을지 — 1인 큐레이션 신뢰가 핵심이라 당분간 닫아둘 것 권장

---

## 13. 다음에 할 일 (The Assignment)

**구현 전, 손으로 종이/메모에 "내가 지난달 실제로 써본 AI 코딩 도구"를 10개 적어라.**
이게 Phase 1의 `tools/*.yaml` 시드가 된다. 검증된 10개가 검증 안 된 100개보다 가치 있다.
그 다음 VSCode에서: "이 설계 문서 읽고 Phase 1 구현해줘."
