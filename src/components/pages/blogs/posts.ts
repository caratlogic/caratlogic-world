import { BLOGS, blogHref, formatBlogDate } from "@/content/blogs";

/**
 * Blog listing cards (BlogPage.dc.html / BlogPageMobile.dc.html), built from the real posts in
 * src/content/blogs. Card thumbnails reuse the design's product screenshots; the articles are text only.
 */
export type BlogPost = { t: string; e: string; d: string; r: string; img: string; href: string };

const IMGS = ["/design/4ab4f19bef96cbb04e1be7acf468e253.png", "/design/e5a1514f91ab1fcbfab688c2326f4ede.png", "/design/c6a0c46d2279b4f4a50c7f3c24e7654e.png"];

export const BLOG_POSTS: BlogPost[] = BLOGS.map((b, i) => ({
    t: b.title,
    e: b.description,
    d: formatBlogDate(b.date),
    r: `${b.readMinutes} min read`,
    img: IMGS[i % IMGS.length],
    href: blogHref(b.slug),
}));

/** Case-insensitive match on title or excerpt. */
export function filterPosts(posts: BlogPost[], query: string): BlogPost[] {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => p.t.toLowerCase().includes(q) || p.e.toLowerCase().includes(q));
}
