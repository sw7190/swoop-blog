// 블로그 이름과 설명은 이 파일에서 한 번에 바꿀 수 있습니다.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const site = {
  name: "내 블로그",
  description: "생각과 배움을 기록하는 개인 블로그입니다.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000"),
};
