# awesome-ai-coding-kr

> 직접 써본 AI 코딩 도구를 **솔직한 한국어 평**과 함께 모은 큐레이션. 양이 아니라 신뢰로 승부합니다.
>
> **표시 뜻**
> - ✅ **검증** — 큐레이터가 *직접 써보고* 평한 도구 (1인칭 경험)
> - 🔥 **인기** — 개발자들 사이에서 *널리 쓰이는* 도구 (일반 평판 · 개인 검증과는 별개)
> - ★ **별점** — 직접 써본 도구에만 매긴 솔직한 5점 평가

**도구 27개** · 직접 검증 **4개** · 마지막 갱신은 GitHub Actions가 자동 수행

<!-- 이 파일은 scripts/build-readme.ts가 자동 생성합니다. 직접 수정하지 마세요. -->

## 목차

- [코딩 에이전트](#코딩-에이전트) (6)
- [앱 빌더 (설명→앱)](#앱-빌더-설명-앱-) (4)
- [터미널 / CLI](#터미널-cli) (5)
- [IDE 확장](#ide-확장) (7)
- [코드 리뷰 / PR](#코드-리뷰-pr) (3)
- [MCP 서버](#mcp-서버) (1)
- [프롬프트 / 스킬 / 룰](#프롬프트-스킬-룰) (1)

## 코딩 에이전트

_작업을 받아 스스로 코드를 읽고 쓰고 실행하는 자율 에이전트_

| 도구 | 한 줄 평 | 평가 | ⭐ | 상태 |
|---|---|---|---|---|
| [Claude Code](https://www.anthropic.com/claude-code) ✅ 🔥 | VSCode에 붙여 매일 쓰는 주력. 플랜 짜기·아이디어 생성·바이브코딩에 특히 강하다. | ★★★★★ | 138.7k | 🟢 |
| [Google Antigravity](https://antigravity.google) ✅ | 구글의 에이전트형 IDE. 깔아서 써봤는데 가능성은 보이지만 아직 손에 익진 않았다. | ★★★☆☆ | — |  |
| [Cursor](https://www.cursor.com) 🔥 | VSCode 기반 AI 에디터. 에이전트 모드와 탭 자동완성으로 가장 널리 쓰임. | 미사용 | — |  |
| [Devin](https://devin.ai) 🔥 | Cognition이 만든 자율 SW 엔지니어. 작업을 통째로 맡기는 클라우드 에이전트. | 미사용 | — |  |
| [Windsurf](https://windsurf.com) 🔥 | Cascade 에이전트를 내장한 AI 에디터. Cursor의 주요 경쟁자. | 미사용 | — |  |
| [OpenHands](https://www.all-hands.dev) | 구 OpenDevin. 샌드박스에서 자율로 코드를 작성·실행하는 오픈소스 에이전트. | 미사용 | 81.7k | 🟢 |

## 앱 빌더 (설명→앱)

_자연어 설명만으로 동작하는 앱·UI를 생성하고 바로 배포하는 도구_

| 도구 | 한 줄 평 | 평가 | ⭐ | 상태 |
|---|---|---|---|---|
| [bolt.new](https://bolt.new) 🔥 | 브라우저 안에서 풀스택 앱을 생성·실행·배포하는 앱 빌더. StackBlitz 제작. | 미사용 | — |  |
| [Lovable](https://lovable.dev) 🔥 | 설명으로 풀스택 웹앱을 생성하는 인기 앱 빌더. 비개발자도 접근하기 쉽다. | 미사용 | — |  |
| [Replit (Agent)](https://replit.com) 🔥 | 브라우저 IDE에 Agent를 결합. 설명만으로 앱을 만들고 그 자리에서 배포한다. | 미사용 | — |  |
| [v0](https://v0.app) 🔥 | Vercel의 UI 생성 에이전트. 설명만으로 React/Tailwind 화면을 뽑아냄. | 미사용 | — |  |

## 터미널 / CLI

_터미널에서 쓰는 AI 코딩 도구_

| 도구 | 한 줄 평 | 평가 | ⭐ | 상태 |
|---|---|---|---|---|
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) ✅ 🔥 | 무료 한도가 넉넉하고, 검색·리서치 작업에 특히 좋았다. 터미널에서 가볍게 굴리기 괜찮다. | ★★★★☆ | 106.1k | 🟢 |
| [OpenAI Codex CLI](https://developers.openai.com/codex) 🔥 | OpenAI 공식 터미널 코딩 에이전트. Claude Code의 OpenAI 진영 대응. | 미사용 | 100.7k | 🟢 |
| [Aider](https://aider.chat) 🔥 | 터미널에서 git과 짝지어 작동하는 페어 프로그래밍 CLI. 모델 선택 자유로움. | 미사용 | 47.6k | 🟢 |
| [Warp](https://www.warp.dev) 🔥 | AI를 내장한 현대적 터미널. 명령어 추천과 에이전트 모드를 지원한다. | 미사용 | — |  |
| [Goose](https://block.github.io/goose) | Block(스퀘어)이 만든 오픈소스 에이전트. MCP 기반 확장이 자유로움. | 미사용 | 51.5k | 🟢 |

## IDE 확장

_VSCode·JetBrains 등 에디터에 통합되는 도구_

| 도구 | 한 줄 평 | 평가 | ⭐ | 상태 |
|---|---|---|---|---|
| [GitHub Copilot](https://github.com/features/copilot) ✅ 🔥 | VS·VSCode에 기본으로 깔려 있어 편하다. 자동완성은 무난하지만, 요즘 에이전트형 도구만큼 똑똑하진 않다. | ★★★☆☆ | — |  |
| [Zed](https://zed.dev) 🔥 | Rust로 만든 초고속 에디터. AI 에이전트 패널을 기본 내장. | 미사용 | 87.4k | 🟢 |
| [Cline](https://cline.bot) 🔥 | VSCode 안에서 도는 자율 에이전트 확장. 파일 수정 단계를 사람이 승인하는 방식. | 미사용 | 64.9k | 🟢 |
| [Continue](https://www.continue.dev) 🔥 | 오픈소스 IDE 확장. 자동완성·채팅을 직접 모델/규칙으로 커스터마이즈 가능. | 미사용 | 35.0k | 🟢 |
| [Amazon Q Developer](https://aws.amazon.com/q/developer) | 구 CodeWhisperer. AWS 생태계 연동과 보안 스캔에 강한 코딩 어시스턴트. | 미사용 | — |  |
| [JetBrains Junie](https://www.jetbrains.com/junie) | JetBrains의 코딩 에이전트. IntelliJ·Rider 등 JetBrains IDE에 통합된다. | 미사용 | — |  |
| [Roo Code](https://roocode.com) | Cline에서 갈라져 나온 VSCode 에이전트. 모드·커스터마이즈가 더 풍부함. | 미사용 | — |  |

## 코드 리뷰 / PR

_PR·커밋을 자동으로 리뷰하는 도구_

| 도구 | 한 줄 평 | 평가 | ⭐ | 상태 |
|---|---|---|---|---|
| [CodeRabbit](https://www.coderabbit.ai) 🔥 | PR을 자동으로 읽고 라인별 리뷰 코멘트를 다는 도구. 깃허브/깃랩 연동. | 미사용 | — |  |
| [Qodo](https://www.qodo.ai) | 구 CodiumAI. PR 리뷰와 테스트 생성에 특화. 오픈소스 PR-Agent도 제공한다. | 미사용 | 12.2k | 🟢 |
| [Greptile](https://www.greptile.com) | 코드베이스 전체 맥락을 이해해 PR을 리뷰하는 도구. 큰 저장소에 강하다. | 미사용 | — |  |

## MCP 서버

_Model Context Protocol 서버 — 에이전트에 도구·데이터를 연결_

| 도구 | 한 줄 평 | 평가 | ⭐ | 상태 |
|---|---|---|---|---|
| [MCP Servers (공식 모음)](https://modelcontextprotocol.io) 🔥 | Model Context Protocol 공식 레퍼런스 서버 모음. 에이전트에 도구·데이터 연결. | 미사용 | 88.8k | 🟢 |

## 프롬프트 / 스킬 / 룰

_프롬프트·스킬·룰 모음과 관련 자원_

| 도구 | 한 줄 평 | 평가 | ⭐ | 상태 |
|---|---|---|---|---|
| [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) 🔥 | Cursor용 .cursorrules 규칙 모음. 프로젝트별 AI 동작을 손쉽게 세팅한다. | 미사용 | 40.4k | 🟢 |

# 📚 학습 자료 & 가이드

_AI 코딩을 잘하기 위한 가이드·문서·아티클. 도구가 아니라 '잘 쓰는 법'._

### 가이드 / 베스트 프랙티스

- 🇬🇧 [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices) — _Anthropic_<br>Claude Code를 효과적으로 쓰는 공식 가이드. 컨텍스트 관리·워크플로우 팁이 알차다.
- 🇬🇧 [Prompt Engineering Guide](https://www.promptingguide.ai) — _DAIR.AI_<br>프롬프트 엔지니어링을 기법별로 정리한 종합 가이드. 입문·참고용으로 두루 좋다.

### 아티클

- 🇬🇧 [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) — _Anthropic_<br>에이전트 설계 패턴을 정리한 Anthropic 글. AI 코딩 워크플로우를 직접 짤 때 기준이 된다.
- 🇬🇧 [Simon Willison's Weblog](https://simonwillison.net) — _Simon Willison_<br>LLM·AI 코딩 실전 글이 꾸준히 올라오는 블로그. 깊이 있는 관찰과 실험이 강점.

### 공식 문서

- 🇬🇧 [Anthropic 공식 문서](https://docs.anthropic.com) — _Anthropic_<br>Claude API·프롬프트·도구 사용의 공식 레퍼런스. 막히면 결국 여기로 돌아온다.
- 🇬🇧 [Model Context Protocol 공식 문서](https://modelcontextprotocol.io) — _Anthropic_<br>에이전트에 도구·데이터를 연결하는 MCP 표준 문서. MCP 서버 직접 만들 때 출발점.

---

이 리스트는 [설계 문서](awesome-ai-coding-kr-design.md)를 기반으로 만들어졌습니다. 데이터는 `collections/ai-coding/`의 `tools/`·`resources/` YAML에 있습니다.
