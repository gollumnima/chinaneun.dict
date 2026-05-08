# 차이나는 사전

한국어 사용자를 위한 외국어 단어장 웹 앱입니다. 현재 중국어와 이탈리아어를 지원합니다.

## 주요 기능

- **언어 전환** — 중국어(🇨🇳) / 이탈리아어(🇮🇹) 탭으로 즉시 전환
- **단어 검색** — 원어, 발음(병음/발음 표기), 한국어 뜻으로 동시 검색
- **카테고리 필터** — 인사, 일상, 음식, 교통, 쇼핑, 감정, 숫자, 시간, 장소, 기타
- **단어 추가** — 원어, 발음, 한국어 뜻, 카테고리, 예문(선택)을 입력해 등록
- **단어 삭제** — 카드에 마우스를 올리면 삭제 버튼 노출
- **데이터 유지** — Supabase DB에 저장

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React 18 + TypeScript |
| 빌드 도구 | Vite |
| 스타일링 | Tailwind CSS |
| UI 컴포넌트 | shadcn/ui (Radix UI) |
| 상태 관리 | TanStack Query + React hooks |
| DB | Supabase |
| 배포 | Cloudflare Pages |
| 테스트 | Vitest + Testing Library |

## 시작하기

```bash
# 의존성 설치
bun install

# 개발 서버 실행
bun dev

# 빌드
bun run build

# 테스트
bun test
```

## 프로젝트 구조

```
src/
├── components/
│   ├── AddWordForm.tsx    # 단어 추가 폼
│   ├── CategoryFilter.tsx # 카테고리 필터 탭
│   ├── SearchBar.tsx      # 검색창
│   └── WordCard.tsx       # 단어 카드
├── data/
│   └── words.ts           # 초기 단어 데이터 & 타입 정의
├── hooks/
│   └── useWords.ts        # 단어 CRUD + 검색 로직
└── pages/
    └── Index.tsx          # 메인 페이지
```

## 데이터 구조

```ts
interface ChineseWord {
  id: string;
  chinese: string;        // 한자
  pinyin: string;         // 병음
  korean: string;         // 한국어 뜻
  category: string;       // 카테고리
  example?: string;       // 예문 (중국어)
  examplePinyin?: string;
  exampleKorean?: string;
}

interface ItalianWord {
  id: string;
  italian: string;              // 이탈리아어
  pronunciation: string;        // 한국어 발음 표기
  korean: string;               // 한국어 뜻
  category: string;             // 카테고리
  example?: string;             // 예문 (이탈리아어)
  examplePronunciation?: string;
  exampleKorean?: string;
}
```
