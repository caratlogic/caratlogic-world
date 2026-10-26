import Link from "next/link";
import { BLOGS, blogHref, formatBlogDate, type BlogMeta } from "@/content/blogs";
import { headingsOf, renderInline, type MdBlock } from "@/lib/markdown";
import { Reveal } from "@/components/landing/motion";

/*
 * Blog article page (text only). No artboard exists for it, so it reuses the site's feature-page language:
 * centred header, sticky "On this page" list, and the dark "Book a demo" card. Styled with Tailwind.
 */

const LINK = "font-medium text-[#245c3e] underline decoration-[#245c3e]/35 underline-offset-[3px] transition-colors hover:text-[#163d29] hover:decoration-[#245c3e]";

function Arrow({ className = "" }: { className?: string }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
        </svg>
    );
}

function Block({ block }: { block: MdBlock }) {
    switch (block.type) {
        case "h2":
            return (
                <h2 id={block.id} className="mt-14 scroll-mt-32 text-[26px] font-semibold leading-[1.2] tracking-[-0.025em] text-[#0c0c10] first:mt-0 md:text-[30px]">
                    {renderInline(block.text, LINK)}
                </h2>
            );
        case "h3":
            return (
                <h3 id={block.id} className="mt-9 scroll-mt-32 text-[19px] font-semibold leading-[1.35] tracking-[-0.01em] text-[#0c0c10] md:text-[20px]">
                    {renderInline(block.text, LINK)}
                </h3>
            );
        case "ul":
            return (
                <ul className="mt-5 flex list-disc flex-col gap-2.5 pl-6 text-[17px] leading-[1.7] text-[#3a403d] marker:text-[#317a51]">
                    {block.items.map((item, i) => (
                        <li key={i} className="pl-1">
                            {renderInline(item, LINK)}
                        </li>
                    ))}
                </ul>
            );
        case "ol":
            return (
                <ol className="mt-5 flex list-decimal flex-col gap-3 pl-6 text-[17px] leading-[1.7] text-[#3a403d] marker:font-semibold marker:text-[#317a51]">
                    {block.items.map((item, i) => (
                        <li key={i} className="pl-1">
                            {renderInline(item, LINK)}
                        </li>
                    ))}
                </ol>
            );
        default:
            return <p className="mt-5 text-[17px] leading-[1.75] text-[#3a403d] [h2+&]:mt-4 [h3+&]:mt-3">{renderInline(block.text, LINK)}</p>;
    }
}

export function BlogArticle({ post, blocks }: { post: BlogMeta; blocks: MdBlock[] }) {
    const toc = headingsOf(blocks).filter((h) => h.level === 2);
    const more = BLOGS.filter((b) => b.slug !== post.slug).slice(0, 3);

    return (
        <article className="bg-white font-[family-name:var(--font-geist-sans)] text-[#111114]">
            {/* ============ HEADER ============ */}
            <header className="px-5 pb-12 pt-14 md:px-6 md:pb-16 md:pt-24">
                <Reveal className="mx-auto flex max-w-[860px] flex-col items-center gap-5 text-center">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] font-medium text-[#6b736f]">
                        <Link href="/blogs" className="transition-colors hover:text-[#245c3e]">
                            Blogs
                        </Link>
                        <span aria-hidden="true">/</span>
                        <span className="text-[#245c3e]">{post.category}</span>
                    </nav>
                    <h1 className="text-[34px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#0c0c10] md:text-[52px]">{post.title}</h1>
                    <p className="max-w-[720px] text-[17px] leading-[1.6] text-[#5f6663] md:text-[19px]">{post.description}</p>
                    <p className="flex items-center gap-2.5 text-[14px] text-[#6b736f]">
                        <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#c9d0cc]" />
                        <span>{post.readMinutes} min read</span>
                    </p>
                </Reveal>
            </header>

            {/* ============ BODY ============ */}
            <div className="mx-auto grid max-w-[1120px] gap-12 border-t border-[#eceeed] px-5 pb-24 pt-12 md:px-6 md:pt-16 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-16">
                {toc.length > 1 && (
                    <aside className="hidden lg:block">
                        <nav aria-label="On this page" className="sticky top-32 flex flex-col gap-1">
                            <span className="mb-2 px-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6b736f]">On this page</span>
                            {toc.map((h) => (
                                <a key={h.id} href={`#${h.id}`} className="rounded-[10px] px-3 py-2 text-[14px] leading-[1.4] text-[#4f5753] transition-colors hover:bg-[#f6f7f7] hover:text-[#245c3e]">
                                    {h.text}
                                </a>
                            ))}
                        </nav>
                    </aside>
                )}

                <div className="min-w-0 max-w-[720px]">
                    {blocks.map((b, i) => (
                        <Block key={i} block={b} />
                    ))}

                    {/* demo card (feature-page style) */}
                    <section className="mt-16 flex flex-col items-start gap-6 rounded-[22px] bg-[#111827] p-7 md:flex-row md:items-center md:justify-between md:p-8">
                        <h2 className="max-w-[420px] text-[22px] font-semibold leading-[1.25] tracking-[-0.02em] text-white md:text-[24px]">See how Carat Logic KYC organises customer and supplier onboarding</h2>
                        <Link href="/contact?tab=demo" className="group flex flex-none items-center gap-3.5 rounded-full bg-white py-[7px] pl-6 pr-[7px] text-[16px] font-semibold text-[#111827] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#317a51]">
                            Book a demo
                            <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#317a51] text-white transition-transform group-hover:translate-x-0.5">
                                <Arrow />
                            </span>
                        </Link>
                    </section>
                </div>
            </div>

            {/* ============ MORE ARTICLES ============ */}
            <section className="bg-[#fafafa] px-5 py-16 md:px-6 md:py-20">
                <div className="mx-auto max-w-[1120px]">
                    <div className="mb-8 flex items-end justify-between gap-4">
                        <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-[#0c0c10] md:text-[32px]">More articles</h2>
                        <Link href="/blogs" className="flex items-center gap-2 text-[15px] font-semibold text-[#245c3e] hover:text-[#163d29]">
                            All blogs <Arrow />
                        </Link>
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        {more.map((b) => (
                            <Link
                                key={b.slug}
                                href={blogHref(b.slug)}
                                className="group flex flex-col gap-3 rounded-[20px] border border-[#e6e9e8] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,20,0.04),0_14px_32px_rgba(16,24,20,0.06)] transition hover:-translate-y-0.5 hover:border-[#cfe0d6] hover:shadow-[0_24px_48px_rgba(16,24,20,0.1)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                            >
                                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#2c6f4b]">{b.category}</span>
                                <span className="text-[18px] font-semibold leading-[1.35] tracking-[-0.01em] text-[#0c0c10] transition-colors group-hover:text-[#245c3e]">{b.title}</span>
                                <span className="line-clamp-3 text-[14.5px] leading-[1.55] text-[#5f6663]">{b.description}</span>
                                <span className="mt-auto pt-2 text-[13px] text-[#6b736f]">
                                    {formatBlogDate(b.date)} · {b.readMinutes} min read
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </article>
    );
}
