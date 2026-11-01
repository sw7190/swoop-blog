import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostList } from "@/components/post-list";
import { decodeParam, getPostsByTag, getTags, tagHref } from "@/lib/posts";

// 태그가 하나도 없어도 빌드가 되도록 자리표시자를 돌려주고, 페이지에서 404로 처리합니다.
export async function generateStaticParams() {
  const tags = await getTags();
  if (tags.length === 0) return [{ tag: "__placeholder__" }];
  return tags.map(({ tag }) => ({ tag }));
}

export async function generateMetadata({
  params,
}: PageProps<"/tags/[tag]">): Promise<Metadata> {
  const tag = decodeParam((await params).tag);
  const posts = await getPostsByTag(tag);
  if (posts.length === 0) return {};
  return {
    title: `#${tag}`,
    description: `'${tag}' 태그가 달린 글 ${posts.length}편`,
    alternates: { canonical: tagHref(tag) },
  };
}

export default async function TagPage({ params }: PageProps<"/tags/[tag]">) {
  const tag = decodeParam((await params).tag);
  const posts = await getPostsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">#{tag}</h1>
        <p className="text-muted-foreground">글 {posts.length}편</p>
      </div>
      <PostList posts={posts} />
    </div>
  );
}
