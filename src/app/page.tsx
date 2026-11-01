import { PostList } from "@/components/post-list";
import { getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default async function HomePage() {
  const posts = await getPosts();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">최신 글</h1>
        <p className="text-muted-foreground">{site.description}</p>
      </div>
      <PostList posts={posts} />
    </div>
  );
}
