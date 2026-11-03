import type { MetadataRoute } from "next";
import { getPosts, getTags, postHref, tagHref } from "@/lib/posts";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, tags] = await Promise.all([getPosts(), getTags()]);
  const paths = ["/", "/tags", ...tags.map(({ tag }) => tagHref(tag))];

  return [
    ...paths.map((path) => ({ url: new URL(path, site.url).toString() })),
    ...posts.map((post) => ({
      url: new URL(postHref(post.slug), site.url).toString(),
      lastModified: post.date,
    })),
  ];
}
