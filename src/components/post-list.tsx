import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TagList } from "@/components/tag-list";
import { formatDate, postHref, type PostMeta } from "@/lib/posts";

export function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return <p className="text-muted-foreground">아직 작성된 글이 없습니다.</p>;
  }
  return (
    <ul className="flex flex-col gap-4">
      {posts.map((post) => (
        <li key={post.slug}>
          <Card>
            <CardHeader>
              <CardTitle>
                <h2>
                  <Link href={postHref(post.slug)} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
              </CardTitle>
              <CardDescription>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {post.summary && <p>{post.summary}</p>}
              <TagList tags={post.tags} />
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
