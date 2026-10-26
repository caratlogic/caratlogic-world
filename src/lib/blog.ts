/** Server-only: reads post bodies from disk (used by server components / route files). */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { BLOGS, type BlogMeta } from "@/content/blogs";
import { parseMarkdown, type MdBlock } from "@/lib/markdown";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blogs");

export function getBlogMeta(slug: string): BlogMeta | undefined {
    return BLOGS.find((b) => b.slug === slug);
}

/** Post metadata + parsed body blocks, or undefined for an unknown slug. */
export async function getBlogPost(slug: string): Promise<(BlogMeta & { blocks: MdBlock[] }) | undefined> {
    const meta = getBlogMeta(slug);
    if (!meta) return undefined;
    const source = await readFile(path.join(BLOG_DIR, `${slug}.md`), "utf8");
    return { ...meta, blocks: parseMarkdown(source) };
}
