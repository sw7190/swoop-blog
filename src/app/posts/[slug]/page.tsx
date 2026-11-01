import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import { TagList } from "@/components/tag-list";
import { Separator } from "@/components/ui/separator";
import {
  decodeParam,
  formatDate,
  getPost,
  getPosts,
  postHref,
} from "@/lib/posts";

// 글이 하나도 없어도 빌드가 되도록 자리표시자를 돌려주고, 페이지에서 404로 처리합니다.
export async function generateStaticParams() {
  const posts = await getPosts();
  if (posts.length === 0) return [{ slug: "__placeholder__" }];
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(decodeParam(slug));
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary || undefined,
    alternates: { canonical: postHref(post.slug) },
    openGraph: {
      title: post.title,
      description: post.summary || undefined,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({
  params,
}: PageProps<"/posts/[slug]">) {
  const { slug } = await params;
  const post = await getPost(decodeParam(slug));
  if (!post) notFound();

  return (
    <article className="flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <time dateTime={post.date} className="text-sm text-muted-foreground">
          {formatDate(post.date)}
        </time>
        <TagList tags={post.tags} />
      </header>
      <Separator />
      <Markdown content={post.content} />
    </article>
  );
}
