import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h1>
      <p className="text-muted-foreground">
        주소가 바뀌었거나 삭제된 페이지입니다.
      </p>
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        글 목록으로 돌아가기
      </Link>
    </div>
  );
}
