import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOGS } from "@/content/blogs";
import { getBlogMeta, getBlogPost } from "@/lib/blog";
import { BlogArticle } from "@/components/pages/blog-article/BlogArticle";

/** Every post is pre-rendered at build time; unknown slugs show the 404 page. */
export const dynamicParams = false;

export function generateStaticParams() {
    return BLOGS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const meta = getBlogMeta(slug);
    if (!meta) return {};
    return {
        title: `${meta.metaTitle} | Carat Logic`,
        description: meta.description,
        openGraph: { type: "article", title: meta.metaTitle, description: meta.description, publishedTime: meta.date },
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);
    if (!post) notFound();
    const { blocks, ...meta } = post;
    return <BlogArticle post={meta} blocks={blocks} />;
}
