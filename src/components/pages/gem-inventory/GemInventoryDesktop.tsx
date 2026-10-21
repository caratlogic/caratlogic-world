"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { EASE, Reveal, Stagger, itemVariants, REVEAL_VIEWPORT } from "@/components/landing/motion";
import "./gem-inventory.css";

/* Design source: GemInventoryPage.dc.html (1440 artboard). NAV + FOOTER are rendered by the root layout. */

type TocLink = { href: string; label: string };
type Sec = { id: string; title: string; body: string[]; note?: string };

const TOC: TocLink[] = [
    { href: "#records", label: "Gemstone records and attributes" },
    { href: "#personalise", label: "Personalise gem inventory" },
    { href: "#types", label: "Singles, parcels, pairs and sets" },
    { href: "#certificates", label: "Certificates, images and client sharing" },
    { href: "#pricing", label: "Pricing and cost basis" },
    { href: "#locations", label: "Stock locations and physical audits" },
    { href: "#types", label: "Parcel merge and split" },
    { href: "#layouts", label: "Gemstone layouts" },
    { href: "#rough", label: "Rough-to-polished production" },
    { href: "#purchasing", label: "Purchasing and sales workflows" },
    { href: "#faqs", label: "FAQs" },
];

const SECTIONS: Sec[] = [
    {
        id: "records",
        title: "Record gemological details for each gemstone",
        body: [
            "Create inventory records for rubies, sapphires, emeralds, spinels, alexandrites, tourmalines and other coloured gemstones. Capture details such as variety or species, origin, treatment, colour intensity, clarity, cut style, dimensions and carat weight.",
            "Record a gemstone’s length, width and depth alongside its weight and grading details. This gives the team more information to use when comparing stones, responding to a buyer or preparing a matched selection.",
        ],
    },
    {
        id: "personalise",
        title: "Personalise gem inventory around your business",
        body: [
            "Customise the columns used to record and view gemstone details, so your team can focus on the information it needs for each stone. Gem settings such as varieties, colours, shapes, origins, clarity grades, treatments and laboratories can be configured to match your cataloguing standards.",
            "You can choose which details appear on barcode and QR labels, and select columns for exported stock lists. Role-based permissions can restrict sensitive information such as cost prices or supplier details.",
        ],
        note: "For example, a sales team can focus on variety, origin, treatment, dimensions, certificate and availability, while cost information remains visible only to authorised users.",
    },
    {
        id: "types",
        title: "Manage single stones, parcels, pairs and sets",
        body: [
            "Carat Logic supports different types of gemstone stock, including individual stones, parcels, pairs and sets. Keep each item or group organised according to how your business buys, processes and sells it.",
            "When a parcel needs to be divided, split it into individual stones or smaller parcels and allocate the appropriate share of its cost basis. When similar remaining parcels are combined, their records and cost reconciliation stay connected to the source stock.",
        ],
    },
    {
        id: "certificates",
        title: "Keep certificates, images and client sharing together",
        body: [
            "Store certificate details with the relevant gemstone, including the report number and issue date. Carat Logic supports reports from GRS, GIA, Gübelin, SSEF, Lotus and AGL, with downloadable verification links available from the record.",
            "Add high-resolution photography, 360-degree gemstone videos and plot diagrams to help your team review and present stones. When you are ready to share a selection, create a branded client link. Links can be open or password-protected and show stone details, videos and certificates without revealing internal cost or supplier information.",
        ],
    },
    {
        id: "pricing",
        title: "Track gemstone pricing and cost basis",
        body: [
            "Record cost per carat and total cost basis alongside wholesale and retail prices. Target markups give the team a reference when pricing stock for different types of buyers.",
        ],
        note: "For example, when a new gemstone is received, the team can record its purchase cost and use the resulting cost basis when considering a wholesale price or preparing a retail offer.",
    },
    {
        id: "locations",
        title: "Know where gemstones are and reconcile stock",
        body: [
            "Assign gemstones to warehouses or branches, then record a more specific location such as a safe, box or shelf. Document transfers between locations so the team can confirm dispatch and receipt.",
            "For physical stock checks, define the tally by warehouse, safe, stock type or ownership, then scan stone tags using barcode or RFID. The tally shows which records have been matched, which are pending and where a discrepancy has been found. For parcel stock, a discrepancy can include a difference between the counted carat weight and the recorded weight. Session history keeps a record of each stock check.",
        ],
    },
    {
        id: "layouts",
        title: "Create matched gemstone layouts",
        body: [
            "Group gemstones into named layouts for matched pairs, necklaces, bracelets or graduated suites. Carat Logic calculates combined carat weight, average stone size, total cost and package selling price for the layout.",
            "Stones included in a layout are marked as reserved, helping prevent them from being sold separately by mistake. A layout detail sheet and public presentation link can be used to share the completed selection with a client.",
        ],
    },
    {
        id: "rough",
        title: "Follow rough gemstones through production",
        body: [
            "For gemstone manufacturers, Carat Logic connects inventory with a rough-to-polished production workflow. Track rough lots through stages such as intake, sorting, preforming, cutting, treatment, polishing, grading, certification and final yield.",
            "Record weight and processing costs as a lot moves through production. Carat Logic calculates polished yield and weight loss, and completed stones can move into active gemstone inventory with their production costs. Teams can also record the artisan, contractor or machine responsible for a stage, along with processing time and cost.",
        ],
        note: "For example, a rough sapphire lot can be recorded at intake, tracked through cutting and treatment, then assessed after polishing. The finished stones can be added to inventory with their resulting weights and production costs.",
    },
    {
        id: "purchasing",
        title: "Connect gemstone inventory with purchasing and sales",
        body: [
            "Create purchase orders for gemstones or rough parcels. When goods are received, inventory records can be created from the purchase, with customs, freight and insurance included in the landed cost. Additional expenses, such as certification, recutting, polishing or shipping, can be assigned to a stone or parcel to keep its cost basis current.",
            "When a buyer wants to inspect gemstones, create a memo for the selected stones. Track returns, including partial returns, and convert approved memo items into an invoice without re-entering their details. Supplier goods received on memo can also be tracked with return deadlines and the option to return them or convert them into a purchase.",
            "For exhibitions, assign selected gemstones to an event and track them separately from regular warehouse stock. Record show sales, then transfer unsold stones back to their usual location. Sold, returned or decommissioned gemstones can be moved to the archive, where historical details such as sale prices, certificate copies and customer transactions remain accessible.",
        ],
    },
];

const EXAMPLE = {
    title: "Prepare a matched sapphire selection",
    body: [
        "A buyer asks for a pair of sapphires with a particular origin, treatment, colour and size. The team searches its gemstone inventory, compares the available stones, and reviews their dimensions, certificates, photographs and videos.",
        "The selected stones are grouped into a named layout, where the team can review the combined weight and package price. It can then share a branded link with the buyer while keeping internal cost and supplier information private.",
    ],
};

const QA: [string, string][] = [
    ["What does gemstone inventory management software do?", "It helps gemstone businesses record gemological details, manage certificates and media, track pricing and stock locations, and organise stones into parcels, pairs, sets and layouts."],
    ["Can Carat Logic manage different gemstone varieties?", "Yes. Carat Logic can manage varieties such as rubies, sapphires, emeralds, spinels, alexandrites and tourmalines, with fields for details including origin, treatment, colour, clarity and dimensions."],
    ["Can I manage gemstone parcels, pairs and sets?", "Yes. Carat Logic supports individual stones, parcels, pairs and sets. Teams can also split or merge parcels and group stones into layouts."],
    ["Which gemstone certificates can I store?", "Carat Logic supports certificate information from GRS, GIA, Gübelin, SSEF, Lotus and AGL, including report numbers, issue dates and downloadable verification links."],
    ["Can I share gemstone details with a buyer?", "Yes. Create branded client links to show stone details, images, 360-degree videos and certificates. Links can be open or password-protected and do not expose internal cost or supplier information."],
    ["Can Carat Logic track gemstone manufacturing?", "Yes. Manufacturers can track rough gemstone lots through production stages, record weight and processing costs, and move completed stones into active inventory."],
];

const ID_PREFIX = "pggem";
/** Distance from the viewport top at which a section counts as "current" for the table of contents. */
const SPY_OFFSET = 160;

/** Index of the first TOC link pointing at the section currently being read. */
function useActiveToc(links: TocLink[]) {
    const [active, setActive] = useState(0);
    useEffect(() => {
        const ids = Array.from(new Set(links.map((l) => l.href.slice(1))));
        let raf = 0;
        const update = () => {
            raf = 0;
            let current = ids[0];
            for (const id of ids) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= SPY_OFFSET) current = id;
            }
            const idx = links.findIndex((l) => l.href === `#${current}`);
            setActive(idx < 0 ? 0 : idx);
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [links]);
    return active;
}

function SectionReveal({ id, style, children }: { id?: string; style: CSSProperties; children: ReactNode }) {
    const reduce = useReducedMotion();
    return (
        <motion.section
            id={id}
            className="cl-sec"
            style={style}
            initial={reduce ? false : { opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: 0.7, ease: EASE }}
        >
            {children}
        </motion.section>
    );
}

function Note({ text }: { text: string }) {
    return (
        <div style={{ display: "flex", gap: 14, padding: "18px 20px", borderRadius: 16, background: "#f6f7f7", border: "1px solid #eceeed" }}>
            <span style={{ flex: "none", width: 4, borderRadius: 999, background: "#317a51" }} />
            <p style={{ fontSize: 16, color: "#2b302e" }}>{text}</p>
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
                borderRadius: 18,
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
                style={{ width: "100%", minHeight: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, padding: "16px 20px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
            >
                <span style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.4, color: "#0c0c10" }}>{q}</span>
                <motion.span
                    initial={false}
                    animate={{ backgroundColor: open ? "#111827" : "#f1f3f2" }}
                    transition={reduce ? { duration: 0 } : { duration: 0.2 }}
                    style={{ flex: "none", width: 30, height: 30, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                    <motion.svg
                        width="14"
                        height="14"
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
                        <p style={{ margin: 0, padding: "0 20px 20px", fontSize: 16, lineHeight: 1.7, color: "#5f6663" }}>{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function GemInventoryDesktop() {
    const [open, setOpen] = useState(0);
    const active = useActiveToc(TOC);
    const reduce = useReducedMotion();

    return (
        <div className="pg-gem" style={{ color: "#111114", background: "#ffffff" }}>
            {/* ============ PAGE HEADER ============ */}
            <section style={{ padding: "96px 24px 96px" }}>
                <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
                        <Reveal>
                            <h1 style={{ margin: 0, fontSize: 56, lineHeight: 1.06, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>Gemstone Inventory Management Software</h1>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <p style={{ margin: 0, fontSize: 19, lineHeight: 1.6, color: "#5f6663" }}>
                                Manage individual gemstones, parcels, matched pairs and sets in one inventory system. Keep gemological details, certificates, pricing, images, stock locations and client presentations connected to each stone.
                            </p>
                        </Reveal>
                        <Reveal delay={0.16} style={{ alignSelf: "center", marginTop: 8 }}>
                            <a
                                href="/contact?tab=demo"
                                className="cl-btn"
                                style={{ display: "flex", alignItems: "center", gap: 14, padding: "8px 8px 8px 26px", borderRadius: 999, background: "linear-gradient(90deg, #245c3e 0%, #317a51 55%, #3f9463 100%)", color: "#ffffff", fontSize: 17, fontWeight: 600, boxShadow: "0 0 0 5px #ffffff, 0 0 0 6px #cfe8d0, 0 12px 28px rgba(44,111,75,0.3)" }}
                            >
                                <span style={{ color: "#ffffff" }}>Book a demo</span>
                                <span style={{ width: 40, height: 40, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#245c3e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M5 12h14" />
                                        <path d="m13 6 6 6-6 6" />
                                    </svg>
                                </span>
                            </a>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ MAIN CONTENT ============ */}
            <div style={{ padding: "0 24px 104px" }}>
                <div className="cl-dbody" style={{ maxWidth: 1200, margin: "0 auto" }}>
                    {/* sticky offset clears the fixed site header (design: 24px under a non-fixed header) */}
                    <aside className="cl-tocwrap" style={{ position: "sticky", top: 112 }}>
                        <Reveal y={16}>
                            <span style={{ display: "block", padding: "0 16px 12px", fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b736f" }}>On this page</span>
                            <nav className="cl-toc" aria-label="On this page" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                {TOC.map((l, i) => (
                                    <a key={`${l.href}-${i}`} href={l.href} className={i === active ? "on" : undefined} aria-current={i === active ? "location" : undefined}>
                                        {i === active && (
                                            <motion.span
                                                layoutId={`${ID_PREFIX}-toc-pill`}
                                                className="cl-toc-pill"
                                                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                                            />
                                        )}
                                        <span className="cl-toc-lbl">{l.label}</span>
                                    </a>
                                ))}
                            </nav>
                        </Reveal>
                    </aside>

                    <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
                        {SECTIONS.map((s, i) => (
                            <SectionReveal
                                key={s.id}
                                id={s.id}
                                style={
                                    i === 0
                                        ? { display: "flex", flexDirection: "column", gap: 18, paddingTop: 0 }
                                        : { display: "flex", flexDirection: "column", gap: 18, paddingTop: 56, borderTop: "1px solid #eceeed", marginTop: 56 }
                                }
                            >
                                <h2>{s.title}</h2>
                                {s.body.map((p) => (
                                    <p key={p.slice(0, 32)}>{p}</p>
                                ))}
                                {s.note && <Note text={s.note} />}
                            </SectionReveal>
                        ))}

                        <SectionReveal style={{ marginTop: 56, display: "flex", flexDirection: "column", gap: 16, padding: 32, borderRadius: 22, background: "#111827", color: "#ffffff" }}>
                            <span style={{ alignSelf: "flex-start", padding: "5px 12px", borderRadius: 999, background: "rgba(143,224,165,0.16)", color: "#8fe0a5", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Example</span>
                            <h2 style={{ color: "#ffffff", fontSize: 28 }}>{EXAMPLE.title}</h2>
                            {EXAMPLE.body.map((p) => (
                                <p key={p.slice(0, 32)} style={{ color: "rgba(255,255,255,0.8)" }}>
                                    {p}
                                </p>
                            ))}
                        </SectionReveal>

                        <SectionReveal id="faqs" style={{ marginTop: 56, paddingTop: 56, borderTop: "1px solid #eceeed", display: "flex", flexDirection: "column", gap: 22 }}>
                            <h2>Frequently asked questions</h2>
                            <Stagger style={{ display: "flex", flexDirection: "column", gap: 12 }} stagger={0.06}>
                                {QA.map(([q, a], i) => (
                                    <FaqItem key={q} q={q} a={a} id={`${ID_PREFIX}-faq-${i}`} open={i === open} onToggle={() => setOpen(i === open ? -1 : i)} />
                                ))}
                            </Stagger>
                        </SectionReveal>
                    </div>
                </div>
            </div>
        </div>
    );
}
