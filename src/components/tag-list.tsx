import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { tagHref } from "@/lib/posts";

export function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag}>
          <Badge variant="secondary" render={<Link href={tagHref(tag)} />}>
            {tag}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
