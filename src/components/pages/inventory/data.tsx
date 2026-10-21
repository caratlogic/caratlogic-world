import type { CSSProperties, ReactNode } from "react";

/* Shared content for the Carat Logic Inventory product page (InventoryPage.dc.html / InventoryPageMobile.dc.html). */

export const AUDIENCE = ["Diamond Dealers", "Gem Wholesalers", "Manufacturers"];

const chip = (bg: string, fg: string): CSSProperties => ({ display: "inline-block", padding: "3px 9px", borderRadius: 999, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", background: bg, color: fg });
const G = chip("#e3f1e7", "#245c3e");
const A = chip("#fdf0d8", "#8a5300");
const R = chip("#fde7e7", "#a12c2c");
const B = chip("#e6eefc", "#1f4fa8");
const N = chip("#f0f2f1", "#3a403d");

export function dot(state: "done" | "now" | "next"): CSSProperties {
    const base: CSSProperties = { width: 24, height: 24, borderRadius: 999, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 };
    if (state === "done") return { ...base, background: "#317a51", color: "#ffffff" };
    if (state === "now") return { ...base, background: "#ffffff", border: "3px solid #317a51", color: "#317a51" };
    return { ...base, background: "#ffffff", border: "2px solid #d6dfda", color: "#8a908d" };
}

export const TALLY: { label: string; value: string; numStyle: CSSProperties }[] = [
    { label: "Scanned", value: "248", numStyle: { fontSize: 24, fontWeight: 700, color: "#245c3e" } },
    { label: "Still to find", value: "12", numStyle: { fontSize: 24, fontWeight: 700, color: "#8a5300" } },
    { label: "Discrepancies", value: "3", numStyle: { fontSize: 24, fontWeight: 700, color: "#a12c2c" } },
];

export const TALLY_ROWS: { id: string; loc: string; status: string; style: CSSProperties }[] = [
    { id: "DM-1042", loc: "Main warehouse", status: "Matched", style: G },
    { id: "GM-0381", loc: "Branch office", status: "Pending", style: A },
    { id: "PR-0117", loc: "Main warehouse", status: "Discrepancy", style: R },
    { id: "DM-1088", loc: "In transfer", status: "Transfer", style: B },
];

export const MEMO_STEPS: { label: string; dot: CSSProperties }[] = [
    { label: "Dispatched", dot: dot("done") },
    { label: "On memo", dot: dot("done") },
    { label: "Partial return", dot: dot("now") },
    { label: "Invoice", dot: dot("next") },
];

export const MEMO_ROWS: { id: string; desc: string; status: string; style: CSSProperties }[] = [
    { id: "DM-1042", desc: "Round · natural", status: "Approved for sale", style: G },
    { id: "DM-0977", desc: "Oval · lab-grown", status: "Returned to stock", style: N },
    { id: "GM-0381", desc: "Sapphire · parcel", status: "On memo", style: A },
];

const flowBase: CSSProperties = { padding: "9px 12px", borderRadius: 10, background: "#f6f7f7", border: "1px solid #e6e9e8", fontSize: 13, fontWeight: 600, color: "#1d2320" };
export const FLOW: { label: string; wire: boolean; style: CSSProperties }[] = [
    { label: "Enquiry", wire: true, style: flowBase },
    { label: "Quotation", wire: true, style: flowBase },
    { label: "Memo / Direct sale", wire: true, style: flowBase },
    { label: "Invoice", wire: false, style: { padding: "9px 14px", borderRadius: 10, background: "#317a51", fontSize: 13, fontWeight: 600, color: "#ffffff" } },
];

export const DOCS = ["Sales invoice", "Proforma invoice", "Credit note", "Payment record", "Purchase order"];

export const QA: [string, string][] = [
    ["What is Carat Logic Inventory?", "Carat Logic Inventory is inventory and operations software for diamond and gemstone businesses. It connects stone records with stock control, memos, orders, invoices and physical stock checks."],
    ["What types of inventory can Carat Logic manage?", "It can manage natural and lab-grown diamonds, coloured gemstones, loose stones, parcels, pairs, matched sets and layouts."],
    ["Can I track diamonds and gemstones sent on memo?", "Yes. Track Memo Out items sent to customers and Memo In items received from suppliers, including due dates, returns and stones approved for sale."],
    ["Can my team manage stock across multiple locations?", "Yes. Carat Logic supports stock tracking across warehouses and branches, with location details and stock transfer records."],
    ["Can I check physical inventory with barcode or RFID scanners?", "Yes. Inventory Tally lets your team scan stock and compare physical counts with system records, helping identify items that are matched, pending or discrepant."],
    ["Can Carat Logic track rough-to-polished production?", "Yes. Its manufacturing module tracks rough diamond and gemstone lots through production stages. Completed stones can then be added to active inventory."],
    ["Can I manage quotations, invoices and payments?", "Yes. Create quotations and move accepted selections into a memo or invoice. Carat Logic also supports proforma invoices, credit notes, payment records and invoice allocation."],
    ["Can I share stone details with buyers without showing internal costs?", "Yes. Create branded product links with selected stone details, certificates and media. Links can be password-protected, and client views can exclude internal costs and supplier details."],
    ["Is Carat Logic Inventory the same as Carat Logic KYC?", "No. Carat Logic Inventory manages stock and trade workflows. Carat Logic KYC is a separate product for customer and supplier onboarding."],
];

/* ---------- feature blocks ---------- */

export type Bullet = { icon: ReactNode; title: string; desc: string };
export type BlockKey = "diamond" | "gem" | "control" | "memo" | "orders";
export type Block = { key: BlockKey; tag: string; title: string; intro: string; href: string; bullets: Bullet[] };

export const BLOCKS: Block[] = [
    {
        key: "diamond",
        tag: "Diamond Inventory",
        title: "Find and Manage Diamond Stock with Confidence",
        intro: "Keep natural and lab-grown diamond records, certificates, pricing and availability together, so your team can find the right stone faster.",
        href: "/features/diamond-inventory",
        bullets: [
            { icon: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>), title: "Search by Stone Details", desc: "Record key diamond specifications and use them to find suitable stock." },
            { icon: (<><circle cx="12" cy="9" r="5" /><path d="m9 13-2 8 5-3 5 3-2-8" /></>), title: "Keep Certificates with Each Stone", desc: "Store report details and product media alongside the diamond record." },
            { icon: (<><path d="M12 15V3" /><path d="m7 8 5-5 5 5" /><path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" /></>), title: "Add Stock in Bulk", desc: "Use CSV tools to bring diamond records into your inventory." },
        ],
    },
    {
        key: "gem",
        tag: "Gem Inventory",
        title: "Organise Gemstones, Parcels and Sets",
        intro: "Manage coloured gemstones with records suited to their variety, origin, treatment and dimensions.",
        href: "/features/gem-inventory",
        bullets: [
            { icon: (<><path d="M6 3h12l4 6-10 12L2 9z" /><path d="M2 9h20" /></>), title: "Record Gemstone Details", desc: "Keep important gem characteristics, pricing and availability together." },
            { icon: (<><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="10" r="2" /><path d="m21 16-5-5-8 8" /></>), title: "Attach Reports and Media", desc: "Add certificate information, photos and videos to gemstone records." },
            { icon: (<><path d="M12 2 2 7l10 5 10-5z" /><path d="m2 12 10 5 10-5" /><path d="m2 17 10 5 10-5" /></>), title: "Build Matched Layouts", desc: "Group stones into sets or suites and see their combined details." },
        ],
    },
    {
        key: "control",
        tag: "Inventory Control",
        title: "Know Where Your Stock Is",
        intro: "Track stock across warehouses and branches, and keep physical counts aligned with inventory records.",
        href: "#",
        bullets: [
            { icon: (<><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></>), title: "Track Stock Locations", desc: "See where items are held across your business." },
            { icon: (<><path d="M4 7V5a1 1 0 0 1 1-1h2" /><path d="M17 4h2a1 1 0 0 1 1 1v2" /><path d="M20 17v2a1 1 0 0 1-1 1h-2" /><path d="M7 20H5a1 1 0 0 1-1-1v-2" /><path d="M8 8v8M12 8v8M16 8v8" /></>), title: "Check Physical Inventory", desc: "Use barcode or RFID scanning to compare physical stock with system records." },
            { icon: (<><path d="M3 21V10l6 4V10l6 4V6l6 4v11z" /><path d="M3 21h18" /></>), title: "Follow Production Stock", desc: "Move completed stones from rough-to-polished production into active inventory." },
        ],
    },
    {
        key: "memo",
        tag: "Memo Management",
        title: "Keep Memo Stock Moving",
        intro: "Track stones sent to customers and goods received from suppliers, from dispatch through return or sale.",
        href: "#",
        bullets: [
            { icon: (<><path d="m22 2-7 20-4-9-9-4z" /><path d="M22 2 11 13" /></>), title: "Monitor Memo Activity", desc: "See which items are on Memo In or Memo Out and follow due dates." },
            { icon: (<><path d="M9 14 4 9l5-5" /><path d="M4 9h11a5 5 0 0 1 0 10h-3" /></>), title: "Record Returns", desc: "Update stock when customers return all or part of a memo." },
            { icon: (<><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>), title: "Move Approved Stones Forward", desc: "Convert memo items approved by a customer into an invoice." },
        ],
    },
    {
        key: "orders",
        tag: "Orders & Invoicing",
        title: "Connect Quotations, Sales and Payments",
        intro: "Keep selected stones connected to the transaction as a customer enquiry moves toward a completed sale.",
        href: "/features/financial-operations",
        bullets: [
            { icon: (<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6" /><path d="M9 17h4" /></>), title: "Prepare Quotations", desc: "Create a quote and move accepted selections into a memo or invoice." },
            { icon: (<><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></>), title: "Record Invoices and Payments", desc: "Manage sales documents and keep payment records connected to transactions." },
            { icon: (<><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 6-6" /></>), title: "Review Business Balances", desc: "See stock value, memo exposure and outstanding receivables in your dashboards." },
        ],
    },
];

export const DIAMOND_SHOT = "/design/4ab4f19bef96cbb04e1be7acf468e253.png";
export const GEM_SHOT = "/design/e5a1514f91ab1fcbfab688c2326f4ede.png";
