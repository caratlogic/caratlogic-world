/** Blog posts from BlogPage.dc.html / BlogPageMobile.dc.html (no article pages yet → href "#"). */
export type BlogPost = { t: string; e: string; d: string; r: string; img: string };

const IMG_A = "/design/4ab4f19bef96cbb04e1be7acf468e253.png";
const IMG_B = "/design/e5a1514f91ab1fcbfab688c2326f4ede.png";
const IMG_C = "/design/c6a0c46d2279b4f4a50c7f3c24e7654e.png";

export const BLOG_POSTS: BlogPost[] = [
    { t: "How to Organise Diamond Stock by 4Cs, Certificates and Location", e: "Set up a stock structure your whole team can search, update and trust.", d: "Oct 14, 2026", r: "5 min read", img: IMG_A },
    { t: "A Simple Guide to Memo Management for Gem Traders", e: "Track which stones are out on memo, with whom, and when they are due back.", d: "Oct 8, 2026", r: "4 min read", img: IMG_B },
    { t: "What to Collect in a Supplier KYC Form", e: "The business details and documents most teams ask for before onboarding a supplier.", d: "Sep 30, 2026", r: "6 min read", img: IMG_C },
    { t: "Sharing Stones on WhatsApp Without Losing Track", e: "Send clean stone details to clients and keep a record of what was shared.", d: "Sep 22, 2026", r: "4 min read", img: IMG_A },
    { t: "From Rough to Polished: Tracking Manufacturing Stages", e: "Follow each stone through cutting and polishing with weights and costs attached.", d: "Sep 15, 2026", r: "7 min read", img: IMG_B },
    { t: "Keeping Customer KYC Up to Date", e: "Use statuses and renewals so expired documents do not slip through.", d: "Sep 6, 2026", r: "5 min read", img: IMG_C },
    { t: "Invoices, Payments and Balances in One Place", e: "How connected orders and invoices make month-end easier for trading teams.", d: "Aug 28, 2026", r: "5 min read", img: IMG_A },
    { t: "Setting Roles and Permissions for Your Team", e: "Give sales, office and management staff the access they need — and nothing more.", d: "Aug 19, 2026", r: "3 min read", img: IMG_B },
    { t: "Preparing Your Inventory for a Trade Show", e: "Get stock, prices and memos ready before you travel to an exhibition.", d: "Aug 9, 2026", r: "6 min read", img: IMG_C },
];

/** Case-insensitive match on title or excerpt. */
export function filterPosts(posts: BlogPost[], query: string): BlogPost[] {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => p.t.toLowerCase().includes(q) || p.e.toLowerCase().includes(q));
}
