"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type CSSProperties, type ReactNode } from "react";
import { EASE, Reveal, Stagger, itemVariants, REVEAL_VIEWPORT } from "@/components/landing/motion";
import "./gem-inventory-mobile.css";

/* Design source: GemInventoryPageMobile.dc.html (390 artboard). Header + footer are rendered by the root layout. */

type Sec = { id: string; title: string; body: string[]; note?: string };

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

const ID_PREFIX = "m-pggem";

function SectionReveal({ id, style, children }: { id?: string; style: CSSProperties; children: ReactNode }) {
    const reduce = useReducedMotion();
    return (
        <motion.section
            id={id}
            className="cl-m"
            style={style}
            initial={reduce ? false : { opacity: 0, y: 10 }}
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

export function GemInventoryMobile() {
    const [open, setOpen] = useState(0);
    const reduce = useReducedMotion();

    return (
        <div className="pg-gem-m" style={{ position: "relative", overflowX: "clip", boxSizing: "border-box", color: "#111114", background: "#ffffff" }}>
            {/* page header */}
            <section style={{ padding: "48px 20px 0", textAlign: "center" }}>
                <Reveal y={18}>
                    <h1 style={{ margin: 0, fontSize: 34, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>Gemstone Inventory Management Software</h1>
                </Reveal>
                <Reveal y={18} delay={0.08}>
                    <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.6, color: "#5f6663" }}>
                        Manage individual gemstones, parcels, matched pairs and sets in one inventory system. Keep gemological details, certificates, pricing, images, stock locations and client presentations connected to each stone.
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
