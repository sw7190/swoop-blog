import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // 배포 환경의 서버 함수에서도 글 파일을 읽을 수 있게 포함합니다.
  outputFileTracingIncludes: {
    "/**": ["./content/posts/**"],
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
