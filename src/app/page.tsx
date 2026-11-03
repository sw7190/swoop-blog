import { PostList } from "@/components/post-list";
import { getPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getPosts();
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">최신 글</h1>
      <PostList posts={posts} />
    </div>
  );
}
