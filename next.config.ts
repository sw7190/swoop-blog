import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // 배포 환경의 서버 함수에서도 글 파일을 읽을 수 있게 포함합니다.
  outputFileTracingIncludes: {
    "/**": ["./content/posts/**"],
  },
  // 글 주소를 "날짜-번호"로 바꾸기 전에 공개된 주소를 새 주소로 보냅니다.
  async redirects() {
    return [
      {
        source: "/posts/new-post",
        destination: "/posts/2026-11-03-1",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
