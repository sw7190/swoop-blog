import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  tags: string[];
};

export type Post = PostMeta & { content: string };

function parseDate(value: unknown, file: string): string {
  // YAML은 따옴표 없는 날짜를 Date로, 따옴표가 있으면 문자열로 읽습니다.
  const date = value instanceof Date ? value.toISOString().slice(0, 10) : value;
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`${file}: date는 YYYY-MM-DD 형식이어야 합니다.`);
  }
  return date;
}

function parsePost(file: string, raw: string): Post {
  const { data, content } = matter(raw);
  if (typeof data.title !== "string" || !data.title.trim()) {
    throw new Error(`${file}: title이 필요합니다.`);
  }
  if (data.tags !== undefined && !Array.isArray(data.tags)) {
    throw new Error(`${file}: tags는 [태그1, 태그2] 형식이어야 합니다.`);
  }
  return {
    // macOS는 한글 파일명을 자모 분리(NFD) 형태로 줄 수 있습니다.
    slug: file.replace(/\.md$/, "").normalize("NFC"),
    title: data.title,
    date: parseDate(data.date, file),
    summary: typeof data.summary === "string" ? data.summary : "",
    tags: (data.tags ?? []).map((tag: unknown) => String(tag).normalize("NFC")),
    content,
  };
}

async function getAllPosts(): Promise<Post[]> {
  "use cache";
  const files = (await fs.readdir(POSTS_DIR)).filter((f) => f.endsWith(".md"));
  const posts = await Promise.all(
    files.map(async (file) =>
      parsePost(file, await fs.readFile(path.join(POSTS_DIR, file), "utf8")),
    ),
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPosts(): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  return posts.map(({ slug, title, date, summary, tags }) => ({
    slug,
    title,
    date,
    summary,
    tags,
  }));
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getTags(): Promise<{ tag: string; count: number }[]> {
  const counts = new Map<string, number>();
  for (const post of await getPosts()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "ko"));
}

export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
  return (await getPosts()).filter((post) => post.tags.includes(tag));
}

// 한글 slug와 태그는 라우트 params에 인코딩된 상태로 들어올 수 있습니다.
export function decodeParam(value: string): string {
  try {
    return decodeURIComponent(value).normalize("NFC");
  } catch {
    return value;
  }
}

export function postHref(slug: string): string {
  return `/posts/${encodeURIComponent(slug)}`;
}

export function tagHref(tag: string): string {
  return `/tags/${encodeURIComponent(tag)}`;
}

export function formatDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return `${year}년 ${month}월 ${day}일`;
}
