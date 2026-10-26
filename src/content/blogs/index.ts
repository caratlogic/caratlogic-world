/**
 * Blog posts. Each post's body lives next to this file as `<slug>.md` (text only, no images); this list holds
 * the metadata used by the /blogs listing, the article pages and the header's Resources menu.
 * Source: the "Carat Logic 1" Google Doc (BLOGS section), in its journey-stage order.
 *
 * To add a post: drop `<slug>.md` here (H2/H3 headings, paragraphs, lists, **bold**, *italic*, [links](url))
 * and add an entry below.
 */
export type BlogMeta = {
    slug: string;
    title: string;
    /** <title> tag (the doc's "Meta title"; falls back to the post title). */
    metaTitle: string;
    description: string;
    category: string;
    /** Publish date, ISO yyyy-mm-dd. */
    date: string;
    readMinutes: number;
};

export const BLOGS: BlogMeta[] = [
    {
        slug: "kyc-diamond-business-onboarding",
        title: "KYC for Diamond Businesses: Organizing Customer and Supplier Onboarding",
        metaTitle: "KYC for Diamond Businesses: Customer and Supplier Onboarding",
        description: "Learn how diamond businesses can organize customer and supplier onboarding, collect business documents, review submissions, and keep records current.",
        category: "KYC & compliance",
        date: "2026-10-26",
        readMinutes: 6,
    },
    {
        slug: "how-to-onboard-a-diamond-supplier",
        title: "How to Onboard a Diamond Supplier, Step by Step",
        metaTitle: "How to Onboard a Diamond Supplier: 6 Steps",
        description: "Use this six-step supplier onboarding process to collect business details, review documents, record decisions, and keep diamond supplier records current.",
        category: "KYC & compliance",
        date: "2026-10-26",
        readMinutes: 6,
    },
    {
        slug: "onboard-diamond-customer",
        title: "How to Onboard a New Customer Before the First Diamond Trade",
        metaTitle: "How to Onboard a New Customer Before the First Diamond Trade",
        description: "Learn how diamond businesses can organize customer onboarding before a first trade, from collecting business details to reviewing documents and recording approval.",
        category: "KYC & compliance",
        date: "2026-10-26",
        readMinutes: 11,
    },
    {
        slug: "diamond-customer-supplier-information-checklist",
        title: "What Information Should You Collect from Diamond Customers and Suppliers?",
        metaTitle: "What Information Should You Collect from Diamond Customers and Suppliers?",
        description: "A practical guide for diamond businesses on customer and supplier onboarding information, supporting documents, review steps, and recordkeeping.",
        category: "KYC & compliance",
        date: "2026-10-26",
        readMinutes: 9,
    },
    {
        slug: "keep-customer-supplier-documents-current",
        title: "How to Keep Customer and Supplier Documents Current",
        metaTitle: "How to Keep Customer and Supplier Documents Current",
        description: "Learn how diamond businesses can track document expiry dates, request updated files, review changes, and keep customer and supplier records organized.",
        category: "KYC & compliance",
        date: "2026-10-26",
        readMinutes: 9,
    },
    {
        slug: "kyc-onboarding-software-diamond-business",
        title: "How to Choose KYC and Onboarding Software for a Diamond Business",
        metaTitle: "How to Choose KYC and Onboarding Software for a Diamond Business",
        description: "Compare KYC and onboarding software for diamond businesses. Learn what to check in forms, document tracking, review workflows, security, and product demos.",
        category: "KYC & compliance",
        date: "2026-10-26",
        readMinutes: 8,
    },
];

export function blogHref(slug: string): string {
    return `/blogs/${slug}`;
}

/** "Oct 26, 2026" — fixed locale/timezone so server and client render the same text. */
export function formatBlogDate(iso: string): string {
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}
