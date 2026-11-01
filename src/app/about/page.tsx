import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개",
  description: `${site.name}와 운영자를 소개합니다.`,
};

// 아래 문구는 예시입니다. 운영자 소개로 바꿔 주세요.
export default function AboutPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">소개</h1>
      <p>안녕하세요. {site.name}에 오신 것을 환영합니다.</p>
      <p>여기에 운영자와 블로그 소개를 적어 주세요.</p>
    </div>
  );
}
