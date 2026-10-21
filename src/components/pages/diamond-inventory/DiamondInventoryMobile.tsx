"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type CSSProperties, type ReactNode } from "react";
import { EASE, Reveal, Stagger, itemVariants, REVEAL_VIEWPORT } from "@/components/landing/motion";
import "./diamond-inventory-mobile.css";

/* Design source: DiamondInventoryPageMobile.dc.html (390 artboard). Header + footer are rendered by the root layout. */

type Sec = { id: string; title: string; body: string[]; note?: string };

const SECTIONS: Sec[] = [
    {
        id: "records",
        title: "Keep each diamond’s specifications and report together",
        body: [
            "Create a record for each diamond with the details your team uses to identify and compare stones. Carat Logic supports natural and lab-grown diamonds, including CVD and HPHT, and records details such as carat weight, colour, clarity, cut and shape.",
            "For more detailed grading records, include polish, symmetry, fluorescence, table and depth percentages, ratio, culet and girdle. The inventory dashboard can show stock breakdowns by carat, shape, colour, clarity, origin and status.",
            "Keep GIA, IGI and HRD report information with the relevant diamond. Your team can refer to a stone’s specifications and report details together when reviewing stock or responding to a buyer.",
        ],
    },
    {
        id: "personalise",
        title: "Personalise diamond inventory columns",
        body: [
            "Customise the columns used to record and view diamond details, so your team can focus on the information it needs for each stone. Diamond settings such as shapes, colours, clarity grades and laboratories can also be configured to match your business’s cataloguing standards.",
            "Personalisation extends to barcode and QR labels, where you can choose which details to print, and stock exports, where you can select the columns to include. Role-based permissions can limit access to sensitive information such as cost prices or supplier details.",
        ],
        note: "For example, a sales team can focus on carat, shape, grading, report and availability, while cost information remains visible only to authorised users.",
    },
    {
        id: "import",
        title: "Import and search diamond stock",
        body: [
            "Bring existing stock lists into Carat Logic through CSV import. Column mapping connects spreadsheet data with the relevant inventory fields, making it easier to add a large stock list without entering every record manually.",
            "Once the diamonds are in the system, search and filter by the specifications buyers ask for, such as carat, shape, colour, clarity, cut and availability. If a buyer asks for a round diamond between 1.20 and 1.50 carats in G–H colour and VS1–VS2 clarity, the sales team can narrow the stock list to matching options and check their status.",
        ],
    },
    {
        id: "rapnet",
        title: "Review RapNet pricing and inventory value",
        body: [
            "For teams using RapNet, Carat Logic provides Rap price list lookup and calculates the diamond’s “Back %”—the discount or premium relative to Rap—along with its total valuation. Traders can use this pricing context when reviewing inventory value or preparing a price for a buyer.",
        ],
    },
    {
        id: "locations",
        title: "Track locations and reconcile physical stock",
        body: [
            "Assign diamonds to a warehouse or branch, then record a more specific location such as a safe, box or shelf. When stock moves between locations, document the transfer and confirm dispatch and receipt.",
            "For a physical stock check, define the tally by warehouse, safe, stock type or ownership, then scan stone tags using barcode or RFID. The tally shows which recorded stones have been matched, which are pending, and where a discrepancy has been found. For parcel stock, a discrepancy can include a difference between the counted carat weight and the weight in the system. The session history keeps a record of each stock check.",
            "Carat Logic can generate barcode or QR labels for diamond stock. Choose which details appear on a label, such as the inventory ID, carat weight, colour and clarity, report number or shape.",
        ],
    },
    {
        id: "parcels",
        title: "Manage parcels, matched pairs and layouts",
        body: [
            "When a parcel needs to be divided, split it into individual stones or smaller parcels and allocate the appropriate share of its cost basis. Carat Logic assigns new inventory IDs and keeps a record linking the new items to their source parcel. When similar remaining parcels are combined, their history and cost reconciliation remain traceable.",
            "For matched pairs or larger diamond layouts, group selected stones under a named layout. Carat Logic calculates details such as combined carat weight, average stone size, total cost and package selling price. The stones are marked as reserved within the layout, helping prevent them from being offered separately by mistake. A layout detail sheet and presentation link can be used to show the set to a client.",
        ],
    },
    {
        id: "rough",
        title: "Follow rough diamonds through production",
        body: [
            "For manufacturers, Carat Logic connects diamond inventory with a rough-to-polished production workflow. Track rough lots through intake, sorting, preforming or sawing, cutting, treatment, polishing, grading and quality control, certification, and final yield.",
            "Record weight as a lot moves through production. Carat Logic calculates polished yield and weight loss, and completed diamonds can move into active inventory with their production costs. Teams can also record which artisan, contractor or machine handled a stage, along with processing time and cost.",
        ],
        note: "For example, a factory can record a rough lot at intake, track it through cutting and polishing, then compare the finished weight with the original rough weight. The polished diamonds can then be added to active inventory with production costs attached.",
    },
    {
        id: "purchasing",
        title: "Connect inventory with purchasing and sales",
        body: [
            "Create purchase orders for diamonds or rough parcels. When goods are received, inventory records can be created from the purchase, with customs, freight and insurance included in the landed cost. Additional expenses, such as certification, polishing or shipping, can be assigned to a diamond or parcel to keep its cost basis up to date.",
            "When a buyer wants to inspect stones, create a memo for the selected diamonds. Track returns, including partial returns, and convert approved memo items into an invoice without re-entering their details. Supplier goods received on memo can also be tracked with return deadlines and the option to return them or convert them into a purchase.",
            "For exhibitions, assign selected stock to an event and track it separately from regular warehouse stock. Record show sales, then transfer unsold diamonds back to their usual location.",
            "Sold, returned or decommissioned diamonds can be moved to the archive. Historical details such as sale prices, report copies and customer transactions remain accessible. When exporting stock lists, select which columns to include so buyer-facing files can leave internal cost details out.",
        ],
    },
];

const EXAMPLE = {
    title: "From new stock to a buyer’s order",
    body: [
        "A dealer imports a diamond stock spreadsheet and maps its columns into Carat Logic. The team searches the inventory against a buyer’s specifications, checks the grading and report details for matching stones, then uses RapNet pricing information to prepare a quote.",
        "If the buyer wants to inspect a selection, the dealer sends those diamonds on memo. When the buyer approves the stones, the memo can be converted into an invoice. The inventory status and transaction history remain connected to the diamond records.",
    ],
};

const QA: [string, string][] = [
    ["What does diamond inventory management software do?", "It helps diamond businesses record and search stone specifications, manage reports and pricing, track stock locations and status, and connect inventory with operations such as audits, memos and sales."],
    ["Can Carat Logic manage natural and lab-grown diamonds?", "Yes. Carat Logic supports natural and lab-grown diamonds, including CVD and HPHT stones."],
    ["Can I customise diamond inventory columns?", "Yes. Teams can customise the columns used to record and view diamond details, choose fields for barcode and QR labels, and select columns for exported stock lists."],
    ["Can I import diamond stock from a spreadsheet?", "Yes. CSV import tools let teams map spreadsheet columns to diamond inventory fields when bringing stock into Carat Logic."],
    ["Can Carat Logic track rough diamonds and production?", "Yes. Manufacturers can track rough lots through production stages, record weight and processing costs, and move completed polished diamonds into active inventory."],
    ["Can Carat Logic manage diamond parcels and matched sets?", "Yes. Teams can split or merge parcels with traceable records and group diamonds into matched pairs or larger layouts while tracking combined weight and package value."],
    ["Does Carat Logic support RapNet pricing?", "Carat Logic provides Rap price list lookup and calculates the discount or premium relative to Rap, along with total valuation."],
];

const ID_PREFIX = "m-pgdia";

function SectionReveal({ id, style, children }: { id?: string; style: CSSProperties; children: ReactNode }) {
    const reduce = useReducedMotion();
    return (
        <motion.section
            id={id}
            className="cl-m"
            style={style}
            initial={reduce ? false : { opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: 0.6, ease: EASE }}
        >
            {children}
        </motion.section>
    );
}

function Note({ text }: { text: string }) {
    return (
        <div style={{ display: "flex", gap: 14, padding: "14px 16px", borderRadius: 14, background: "#f6f7f7", border: "1px solid #eceeed" }}>
            <span style={{ flex: "none", width: 4, borderRadius: 999, background: "#317a51" }} />
            <p style={{ fontSize: 15, color: "#2b302e" }}>{text}</p>
        </div>
    );
}

function FaqItem({ q, a, open, onToggle, id }: { q: string; a: string; open: boolean; onToggle: () => void; id: string }) {
    const reduce = useReducedMotion();
    const t = reduce ? { duration: 0 } : { duration: 0.35, ease: EASE };
    return (
        <motion.div
            variants={itemVariants}
            style={{
                borderRadius: 16,
                background: "#ffffff",
                border: `1px solid ${open ? "#d5dcd8" : "#e6e9e8"}`,
                boxShadow: open ? "0 14px 30px rgba(16,24,20,0.07)" : "0 14px 30px rgba(16,24,20,0)",
                transition: "border-color .2s ease, box-shadow .25s ease",
            }}
        >
            <button
                type="button"
                className="cl-q"
                onClick={onToggle}
                aria-expanded={open}
                aria-controls={`${id}-panel`}
                id={`${id}-btn`}
                style={{ width: "100%", minHeight: 60, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "15px 16px 15px 18px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
            >
                <span style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.4, color: "#0c0c10" }}>{q}</span>
                <motion.span
                    initial={false}
                    animate={{ backgroundColor: open ? "#111827" : "#f1f3f2" }}
                    transition={reduce ? { duration: 0 } : { duration: 0.2 }}
                    style={{ flex: "none", width: 30, height: 30, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                    <motion.svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        aria-hidden="true"
                        initial={false}
                        animate={{ rotate: open ? 180 : 0, stroke: open ? "#ffffff" : "#111827" }}
                        transition={t}
                    >
                        <path d="M5 12h14" />
                        <motion.path
                            d="M12 5v14"
                            initial={false}
                            animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1 }}
                            transition={t}
                            style={{ transformOrigin: "center", transformBox: "fill-box" }}
                        />
                    </motion.svg>
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="panel"
                        id={`${id}-panel`}
                        role="region"
                        aria-labelledby={`${id}-btn`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={t}
                        style={{ overflow: "hidden" }}
                    >
                        <p style={{ padding: "0 18px 18px", fontSize: 14, lineHeight: 1.65, color: "#5f6663" }}>{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function DiamondInventoryMobile() {
    const [open, setOpen] = useState(0);
    const reduce = useReducedMotion();

    return (
        <div className="pg-diamond-m" style={{ position: "relative", overflowX: "clip", boxSizing: "border-box", color: "#111114", background: "#ffffff" }}>
            {/* page header */}
            <section style={{ padding: "48px 20px 0", textAlign: "center" }}>
                <Reveal y={18}>
                    <h1 style={{ margin: 0, fontSize: 34, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>Diamond Inventory Management Software for Dealers and Manufacturers</h1>
                </Reveal>
                <Reveal y={18} delay={0.08}>
                    <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.6, color: "#5f6663" }}>
                        Manage natural and lab-grown diamonds, parcels, pairs and rough lots in one inventory system. Carat Logic connects diamond specifications, custom columns, certificates, pricing, stock locations, production and sales workflows.
                    </p>
                </Reveal>
                <div style={{ height: 120 }} />
            </section>

            {/* action bar: sits over the bottom of the hero on first load, then stays pinned to the bottom of the screen while scrolling */}
            <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                style={{ position: "sticky", top: "calc(100vh - 86px)", margin: "-86px 12px 18px", zIndex: 10, padding: 8, borderRadius: 999, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", border: "1px solid #e3e6e5", boxShadow: "0 18px 40px rgba(16,24,20,0.16), 0 2px 6px rgba(16,24,20,0.06)", display: "flex", gap: 8, boxSizing: "border-box" }}
            >
                <a href="/contact" className="cl-cta" style={{ flex: 1, minHeight: 52, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "5px 5px 5px 18px", borderRadius: 999, background: "#111827", color: "#ffffff", fontSize: 15, fontWeight: 600, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)" }}>
                    <span style={{ color: "#ffffff", whiteSpace: "nowrap" }}>Get started</span>
                    <span style={{ flex: "none", width: 40, height: 40, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12h14" />
                            <path d="m13 6 6 6-6 6" />
                        </svg>
                    </span>
                </a>
                <a href="/contact?tab=demo" className="cl-cta" style={{ flex: 1, minHeight: 52, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "5px 5px 5px 18px", borderRadius: 999, background: "linear-gradient(90deg, #245c3e 0%, #317a51 55%, #3f9463 100%)", color: "#ffffff", fontSize: 15, fontWeight: 600, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 18px rgba(44,111,75,0.3)" }}>
                    <span style={{ color: "#ffffff", whiteSpace: "nowrap" }}>Book a demo</span>
                    <span style={{ flex: "none", width: 40, height: 40, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#245c3e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12h14" />
                            <path d="m13 6 6 6-6 6" />
                        </svg>
                    </span>
                </a>
            </motion.div>

            {/* content */}
            <div style={{ padding: "8px 20px 64px" }}>
                {SECTIONS.map((s, i) => (
                    <SectionReveal
                        key={s.id}
                        id={`m-${s.id}`}
                        style={
                            i === 0
                                ? { display: "flex", flexDirection: "column", gap: 16, padding: "40px 0 0" }
                                : { display: "flex", flexDirection: "column", gap: 16, padding: "40px 0 0", marginTop: 40, borderTop: "1px solid #eceeed" }
                        }
                    >
                        <h2>{s.title}</h2>
                        {s.body.map((p) => (
                            <p key={p.slice(0, 32)}>{p}</p>
                        ))}
                        {s.note && <Note text={s.note} />}
                    </SectionReveal>
                ))}

                <SectionReveal style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 14, padding: "24px 20px", borderRadius: 20, background: "#111827" }}>
                    <span style={{ alignSelf: "flex-start", padding: "4px 10px", borderRadius: 999, background: "rgba(143,224,165,0.16)", color: "#8fe0a5", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Example</span>
                    <h2 style={{ color: "#ffffff", fontSize: 23 }}>{EXAMPLE.title}</h2>
                    {EXAMPLE.body.map((p) => (
                        <p key={p.slice(0, 32)} style={{ color: "rgba(255,255,255,0.8)", fontSize: 15 }}>
                            {p}
                        </p>
                    ))}
                </SectionReveal>

                <SectionReveal id="m-faqs" style={{ marginTop: 40, paddingTop: 40, borderTop: "1px solid #eceeed", display: "flex", flexDirection: "column", gap: 18 }}>
                    <h2>Frequently asked questions</h2>
                    <Stagger style={{ display: "flex", flexDirection: "column", gap: 10 }} stagger={0.06}>
                        {QA.map(([q, a], i) => (
                            <FaqItem key={q} q={q} a={a} id={`${ID_PREFIX}-faq-${i}`} open={i === open} onToggle={() => setOpen(i === open ? -1 : i)} />
                        ))}
                    </Stagger>
                </SectionReveal>
            </div>
        </div>
    );
}
