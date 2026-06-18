# awesome-ai-coding-kr

> 직접 써본 AI 코딩 도구를 **솔직한 한국어 평**과 함께 모은 큐레이션. 양이 아니라 신뢰로 승부합니다.
>
> ✅ = 큐레이터가 직접 써보고 검증한 도구 · ★ = 직접 써본 도구의 5점 만점 평가

**도구 23개** · 직접 검증 **2개** · 마지막 갱신은 GitHub Actions가 자동 수행

<!-- 이 파일은 scripts/build-readme.ts가 자동 생성합니다. 직접 수정하지 마세요. -->

## 목차

- [코딩 에이전트](#코딩-에이전트) (7)
- [터미널 / CLI](#터미널-cli) (4)
- [IDE 확장](#ide-확장) (7)
- [자동완성](#자동완성) (3)
- [코드 리뷰 / PR](#코드-리뷰-pr) (1)
- [MCP 서버](#mcp-서버) (1)

## 코딩 에이전트

_작업을 받아 스스로 코드를 읽고 쓰고 실행하는 자율 에이전트_

| 도구 | 한 줄 평 | 평가 | ⭐ | 상태 |
|---|---|---|---|---|
| [Claude Code](https://www.anthropic.com/claude-code) ✅ | VSCode에 붙여 매일 쓰는 주력. 플랜 짜기·아이디어 생성·바이브코딩에 특히 강하다. | ★★★★★ | 133.2k | 🟢 |
| [Google Antigravity](https://antigravity.google) ✅ | 구글의 에이전트형 IDE. 깔아서 써봤는데 가능성은 보이지만 아직 손에 익진 않았다. | ★★★☆☆ | — |  |
| [OpenHands](https://www.all-hands.dev) | 구 OpenDevin. 샌드박스에서 자율로 코드를 작성·실행하는 오픈소스 에이전트. | 미사용 | 77.6k | 🟢 |
| [bolt.new](https://bolt.new) | 브라우저 안에서 풀스택 앱을 생성·실행·배포하는 에이전트. StackBlitz 제작. | 미사용 | 16.4k | 🪦 보관됨 |
| [Cursor](https://www.cursor.com) | VSCode 기반 AI 에디터. 에이전트 모드와 탭 자동완성으로 가장 널리 쓰임. | 미사용 | — |  |
| [v0](https://v0.app) | Vercel의 UI 생성 에이전트. 설명만으로 React/Tailwind 화면을 뽑아냄. | 미사용 | — |  |
| [Windsurf](https://windsurf.com) | Cascade 에이전트를 내장한 AI 에디터. Cursor의 주요 경쟁자. | 미사용 | — |  |

## 터미널 / CLI

_터미널에서 쓰는 AI 코딩 도구_

| 도구 | 한 줄 평 | 평가 | ⭐ | 상태 |
|---|---|---|---|---|
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | Google 공식 터미널 에이전트. 넉넉한 무료 한도가 강점. | 미사용 | 105.4k | 🟢 |
| [OpenAI Codex CLI](https://developers.openai.com/codex) | OpenAI 공식 터미널 코딩 에이전트. Claude Code의 OpenAI 진영 대응. | 미사용 | 92.0k | 🟢 |
| [Goose](https://block.github.io/goose) | Block(스퀘어)이 만든 오픈소스 에이전트. MCP 기반 확장이 자유로움. | 미사용 | 49.8k | 🟢 |
| [Aider](https://aider.chat) | 터미널에서 git과 짝지어 작동하는 페어 프로그래밍 CLI. 모델 선택 자유로움. | 미사용 | 46.4k | 🟢 |

## IDE 확장

_VSCode·JetBrains 등 에디터에 통합되는 도구_

| 도구 | 한 줄 평 | 평가 | ⭐ | 상태 |
|---|---|---|---|---|
| [Zed](https://zed.dev) | Rust로 만든 초고속 에디터. AI 에이전트 패널을 기본 내장. | 미사용 | 85.5k | 🟢 |
| [Cline](https://cline.bot) | VSCode 안에서 도는 자율 에이전트 확장. 파일 수정 단계를 사람이 승인하는 방식. | 미사용 | 63.5k | 🟢 |
| [Continue](https://www.continue.dev) | 오픈소스 IDE 확장. 자동완성·채팅을 직접 모델/규칙으로 커스터마이즈 가능. | 미사용 | 34.1k | 🟢 |
| [Amazon Q Developer](https://aws.amazon.com/q/developer) | 구 CodeWhisperer. AWS 생태계 연동과 보안 스캔에 강한 코딩 어시스턴트. | 미사용 | — |  |
| [Sourcegraph Cody](https://sourcegraph.com/cody) | Sourcegraph의 코드 검색을 등에 업은 IDE 어시스턴트. 대형 코드베이스 맥락에 강함. | 미사용 | — |  |
| [GitHub Copilot](https://github.com/features/copilot) | 원조 AI 코딩 보조. 자동완성 + 채팅 + 에이전트 모드를 IDE에 통합. | 미사용 | — |  |
| [Roo Code](https://roocode.com) | Cline에서 갈라져 나온 VSCode 에이전트. 모드·커스터마이즈가 더 풍부함. | 미사용 | — |  |

## 자동완성

_입력 중 코드를 제안하는 인라인 자동완성_

| 도구 | 한 줄 평 | 평가 | ⭐ | 상태 |
|---|---|---|---|---|
| [Tabby](https://www.tabbyml.com) | 직접 호스팅하는 오픈소스 자동완성. 코드가 외부로 안 나가야 할 때 선택. | 미사용 | 33.6k | 🟢 |
| [Supermaven](https://supermaven.com) | 초저지연·초장문맥 자동완성. 속도에 초점. (현재 Cursor 팀에 합류) | 미사용 | — |  |
| [Tabnine](https://www.tabnine.com) | 오래된 자동완성 도구. 보안·온프레미스 옵션으로 기업 시장을 노림. | 미사용 | — |  |

## 코드 리뷰 / PR

_PR·커밋을 자동으로 리뷰하는 도구_

| 도구 | 한 줄 평 | 평가 | ⭐ | 상태 |
|---|---|---|---|---|
| [CodeRabbit](https://www.coderabbit.ai) | PR을 자동으로 읽고 라인별 리뷰 코멘트를 다는 도구. 깃허브/깃랩 연동. | 미사용 | — |  |

## MCP 서버

_Model Context Protocol 서버 — 에이전트에 도구·데이터를 연결_

| 도구 | 한 줄 평 | 평가 | ⭐ | 상태 |
|---|---|---|---|---|
| [MCP Servers (공식 모음)](https://modelcontextprotocol.io) | Model Context Protocol 공식 레퍼런스 서버 모음. 에이전트에 도구·데이터 연결. | 미사용 | 87.4k | 🟢 |

---

이 리스트는 [설계 문서](awesome-ai-coding-kr-design.md)를 기반으로 만들어졌습니다. 데이터는 `collections/ai-coding/tools/*.yaml`에 있습니다.
