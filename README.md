# swoop

Next.js, React, shadcn/ui로 만든 개인 블로그입니다. 글은 Markdown 파일로 관리합니다.

## 실행하기

Node 버전은 `.nvmrc`에 적혀 있습니다.

```bash
nvm use
npm install
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다.

## 새 글 쓰기

`content/posts` 폴더에 `날짜-번호.md` 이름으로 파일을 추가합니다. 파일 이름이 글 주소가 됩니다.
번호는 그날 쓴 순서대로 1부터 붙입니다.

- `2026-11-03-1.md` → `/posts/2026-11-03-1` (그날 첫 글)
- `2026-11-03-2.md` → `/posts/2026-11-03-2` (같은 날 두 번째 글)

글 날짜는 파일 이름에서 가져오므로 front matter에 `date`를 적지 않아도 됩니다.
적는다면 파일 이름의 날짜와 같아야 합니다.

```markdown
---
title: 글 제목
summary: 글 목록에 표시될 요약
tags: [태그1, 태그2]
---

여기에 본문을 씁니다.
```

`title`은 꼭 적어야 합니다. 이미지는 `public/images`에 넣고 `![설명](/images/파일명.png)`로 씁니다.

## 바꿔야 할 곳

- 블로그 이름: `src/lib/site.ts`
- 글: `content/posts`

## 배포 주소

Vercel에 배포하면 사이트 주소를 자동으로 사용합니다. 개인 도메인을 쓰면 `NEXT_PUBLIC_SITE_URL`에 그 주소를 설정합니다.

## 방문자 통계 (Google Analytics)

Google Analytics에서 웹 스트림을 만들고 측정 ID(`G-`로 시작)를 `NEXT_PUBLIC_GA_ID` 환경 변수에 넣습니다. Vercel에서는 Project Settings → Environment Variables에 추가한 뒤 다시 배포합니다. 값이 없으면 분석 스크립트를 넣지 않습니다.
