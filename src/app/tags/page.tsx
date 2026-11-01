import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getTags, tagHref } from "@/lib/posts";

export const metadata: Metadata = {
  title: "태그",
  description: "태그별로 글을 찾아볼 수 있습니다.",
};

export default async function TagsPage() {
  const tags = await getTags();
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">태그</h1>
      {tags.length === 0 ? (
        <p className="text-muted-foreground">아직 태그가 없습니다.</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => (
            <li key={tag}>
              <Badge variant="outline" render={<Link href={tagHref(tag)} />}>
                {tag} ({count})
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
