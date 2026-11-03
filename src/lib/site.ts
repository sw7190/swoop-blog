// 블로그 이름은 이 파일에서 한 번에 바꿀 수 있습니다.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const site = {
  name: "swoop",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000"),
};
