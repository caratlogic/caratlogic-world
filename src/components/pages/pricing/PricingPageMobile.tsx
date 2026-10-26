"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { EASE, Reveal, Stagger, itemVariants } from "@/components/landing/motion";
import { CLIENTS } from "@/components/site/clients";
import { ClientChip } from "@/components/site/ClientChip";
import "./pricing-page-mobile.css";

/* ---------- data ---------- */

type Plan = { name: string; desc: string; price: string; features: string[]; hl?: boolean };

const PLANS: Plan[] = [
    {
        name: "Standard Package",
        desc: "For a small team managing one inventory module.",
        price: "€150",
        features: ["Choose the Gem or Diamond module", "Up to 3 active users", "All 9 core platform features", "Custom roles and permissions", "Unlimited stones and documents"],
    },
    {
        name: "Premium Package",
        desc: "For teams that need more users on one inventory module.",
        price: "€200",
        features: ["Choose the Gem or Diamond module", "Up to 7 active users", "All 9 core platform features", "Custom roles and permissions", "Unlimited stones and documents"],
    },
    {
        name: "Enterprise Package",
        desc: "For teams managing both diamonds and gemstones, with customer and supplier KYC included.",
        price: "€250",
        hl: true,
        features: ["Gem and Diamond modules", "Up to 7 active users", "All 17 platform features", "KYC application included", "Custom roles and permissions", "Unlimited stones and documents"],
    },
];

const QA: [string, string][] = [
    ["How do I access the ₹0 trial?", "Book a free demo first. After the walkthrough, the Carat Logic team can help arrange access to the trial."],
    ["What is included in the Standard and Premium packages?", "Both packages include one inventory module—Gem or Diamond—all 9 core platform features, custom roles and permissions, and unlimited stones and documents. Standard supports up to 3 active users; Premium supports up to 7."],
    ["Which package includes both Gem and Diamond inventory?", "The Enterprise Package includes both modules, up to 7 active users, all 17 platform features and the KYC application."],
    ["Are stones or documents limited by package?", "No. All three paid packages include unlimited stones and documents."],
    ["Which package should I choose?", "Choose Standard for one inventory module and up to 3 users. Choose Premium if you need the same single-module setup for up to 7 users. Choose Enterprise if you need both Gem and Diamond modules and KYC."],
];

const ROWS = [{ hidden: false }, { hidden: true }];
const stripMask = "linear-gradient(90deg, rgba(0,0,0,0) 0%, #000000 14%, #000000 86%, rgba(0,0,0,0) 100%)";

/**
 * The artboard pins the comparison header under its own 73px nav; the site header (rendered by the
 * layout) is 67px tall on mobile once scrolled (66px bar + 1px border; its announcement bar hides on scroll down).
 */
const STICKY_TOP = 67;

/* ---------- small pieces ---------- */

function Check() {
    return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#317a51" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", marginTop: 2 }}>
            <path d="m5 12 5 5 9-10" />
        </svg>
    );
}

function Arrow({ stroke }: { stroke: string }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
        </svg>
    );
}

const included = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#317a51" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-label="Included" role="img" style={{ verticalAlign: "middle" }}>
        <path d="m5 12 5 5 9-10" />
    </svg>
);
const notIncluded = (
    <span aria-label="Not included" style={{ color: "#a3aaa6" }}>
        —
    </span>
);

const CMP_ROWS: { label: string; cells: [ReactNode, ReactNode, ReactNode] }[] = [
    { label: "Monthly price", cells: ["€150", "€200", "€250"] },
    {
        label: "Inventory access",
        cells: [
            <>Gem <b>or</b> Diamond</>,
            <>Gem <b>or</b> Diamond</>,
            <>Gem <b>and</b> Diamond</>,
        ],
    },
    { label: "Active users", cells: ["Up to 3", "Up to 7", "Up to 7"] },
    { label: "Platform features", cells: ["9 core features", "9 core features", "All 17 features"] },
    { label: "Customer and supplier KYC", cells: [notIncluded, notIncluded, included] },
    { label: "Custom roles and permissions", cells: [included, included, included] },
    { label: "Stones and documents", cells: ["Unlimited", "Unlimited", "Unlimited"] },
];

const CMP_HEAD = [
    { name: "Standard", price: "€150" },
    { name: "Premium", price: "€200" },
    { name: "Enterprise", price: "€250", hl: true },
];

/* ---------- FAQ item ---------- */

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
                    <motion.svg width="13" height="13" viewBox="0 0 24 24" fill="none" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true" initial={false} animate={{ stroke: open ? "#ffffff" : "#111827" }} transition={t}>
                        <path d="M5 12h14" />
                        <motion.path d="M12 5v14" initial={false} animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1 }} transition={t} style={{ transformOrigin: "center", transformBox: "fill-box" }} />
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

/* ---------- page ---------- */

export function PricingPageMobile() {
    const [open, setOpen] = useState(0);
    const baseId = `m-${useId()}`;
    const reduce = useReducedMotion();

    return (
        <div className="pg-pricing-m" style={{ position: "relative", overflowX: "clip", boxSizing: "border-box", color: "#111114", background: "#ffffff" }}>
            {/* page header */}
            <section style={{ padding: "48px 20px 32px", textAlign: "center" }}>
                <motion.h1
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    style={{ margin: 0, fontSize: 36, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}
                >
                    Clear Pricing for Diamond and Gemstone Businesses
                </motion.h1>
            </section>

            {/* free trial */}
            <section style={{ padding: "0 16px" }}>
                <Reveal delay={0.12} y={18} style={{ padding: "24px 20px", borderRadius: 22, background: "#f6f7f7", display: "flex", flexDirection: "column", gap: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#245c3e" }}>Start with a free trial</span>
                    <h2 style={{ margin: 0, fontSize: 26, lineHeight: 1.18, fontWeight: 600, letterSpacing: "-0.03em", color: "#0c0c10" }}>Explore Carat Logic for ₹0</h2>
                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: "#3f4643" }}>
                        Book a free demo first. After the walkthrough, our team can help arrange access to the ₹0 trial so you can explore Carat Logic before choosing a paid package.
                    </p>
                    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: "#6b736f", fontStyle: "italic" }}>
                        Trial access begins after a demo. Trial duration and access details can be confirmed during your walkthrough.
                    </p>
                    <div style={{ marginTop: 8 }}>
                        <a href="/contact?tab=demo" className="cl-btn" style={{ width: "100%", boxSizing: "border-box", minHeight: 54, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "6px 6px 6px 22px", borderRadius: 999, background: "#111827", color: "#ffffff", fontSize: 16, fontWeight: 600 }}>
                            <span style={{ color: "#ffffff" }}>Book a free demo</span>
                            <span style={{ flex: "none", width: 40, height: 40, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Arrow stroke="#111827" />
                            </span>
                        </a>
                    </div>
                </Reveal>
            </section>

            {/* packages */}
            <section style={{ padding: "56px 16px 0" }}>
                <Reveal y={16}>
                    <h2 style={{ margin: "0 0 20px", padding: "0 4px", fontSize: 30, lineHeight: 1.15, fontWeight: 600, letterSpacing: "-0.03em", color: "#0c0c10" }}>Choose your package</h2>
                </Reveal>
                <Stagger style={{ display: "flex", flexDirection: "column", gap: 14 }} stagger={0.1}>
                    {PLANS.map((p) => (
                        <motion.article
                            key={p.name}
                            variants={itemVariants}
                            style={{ padding: "24px 20px", borderRadius: 22, background: "#ffffff", border: `1px solid ${p.hl ? "#d5dcd8" : "#e6e9e8"}`, boxShadow: p.hl ? "0 18px 40px rgba(16,24,20,0.08)" : undefined }}
                        >
                            <h3 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", color: "#0c0c10" }}>{p.name}</h3>
                            <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.55, color: "#5f6663" }}>{p.desc}</p>
                            <div style={{ marginTop: 20, display: "flex", alignItems: "baseline", gap: 6 }}>
                                <span style={{ fontSize: 44, lineHeight: 1, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>{p.price}</span>
                                <span style={{ fontSize: 15, color: "#5f6663" }}>/ month</span>
                            </div>
                            <ul style={{ listStyle: "none", margin: "22px 0 0", padding: "20px 0 0", borderTop: "1px solid #eceeed", display: "flex", flexDirection: "column", gap: 12 }}>
                                {p.features.map((f) => (
                                    <li key={f} style={{ display: "flex", gap: 10, fontSize: 15, lineHeight: 1.5, color: "#1d2320" }}>
                                        <Check />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.article>
                    ))}
                </Stagger>
                <Reveal y={14} style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
                    <a href="/contact?tab=demo" className="cl-btn" style={{ minHeight: 54, display: "flex", alignItems: "center", gap: 14, padding: "6px 6px 6px 24px", borderRadius: 999, background: "#111827", color: "#ffffff", fontSize: 16, fontWeight: 600, boxShadow: "0 0 0 4px #ffffff, 0 0 0 5px #dfe3e1, 0 12px 24px rgba(17,24,39,0.2)" }}>
                        <span style={{ color: "#ffffff" }}>Book a demo</span>
                        <span style={{ flex: "none", width: 40, height: 40, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Arrow stroke="#111827" />
                        </span>
                    </a>
                </Reveal>
                <p style={{ margin: "16px 4px 0", textAlign: "center", fontSize: 13, color: "#6b736f", fontStyle: "italic" }}>Paid package prices are shown per month in euros.</p>
            </section>

            {/* client logos */}
            <section style={{ padding: "56px 0 8px" }}>
                <Reveal y={14}>
                    <p style={{ margin: "0 0 22px", padding: "0 20px", textAlign: "center", fontSize: 15, fontWeight: 500, color: "#111114" }}>Trusted by diamond and gemstone businesses worldwide</p>
                </Reveal>
                <div style={{ overflow: "hidden", WebkitMaskImage: stripMask, maskImage: stripMask }}>
                    <div className="cl-track" style={{ display: "flex", width: "max-content" }}>
                        {ROWS.map((row, r) => (
                            <div key={r} aria-hidden={row.hidden || undefined} style={{ display: "flex", alignItems: "center", gap: 44, paddingRight: 44 }}>
                                {CLIENTS.map((c) => (
                                    <ClientChip key={c.name} client={c} size="sm" hidden={row.hidden} />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* compare — no Reveal wrapper here: a transformed ancestor would break the sticky header row */}
            <section style={{ padding: "56px 16px 0" }}>
                <Reveal y={16}>
                    <h2 style={{ margin: "0 0 18px", padding: "0 4px", fontSize: 30, lineHeight: 1.15, fontWeight: 600, letterSpacing: "-0.03em", color: "#0c0c10" }}>Compare Carat Logic packages</h2>
                </Reveal>
                <div role="table" aria-label="Carat Logic package comparison" style={{ border: "1px solid #eceeed", borderRadius: 20, overflow: "clip", padding: "0 0 4px" }}>
                    <div role="row" className="cl-cg" style={{ position: "sticky", top: STICKY_TOP, zIndex: 2, background: "#ffffff", borderBottom: "1px solid #dfe5e1" }}>
                        {CMP_HEAD.map((h) => (
                            <div key={h.name} role="columnheader" className={h.hl ? "hl" : undefined} style={{ textAlign: "left", padding: "14px 10px" }}>
                                <span style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#0c0c10" }}>{h.name}</span>
                                <span style={{ display: "block", marginTop: 4, fontSize: 22, fontWeight: 600, letterSpacing: "-0.03em", color: "#0c0c10" }}>{h.price}</span>
                                <span style={{ display: "block", fontSize: 11, color: "#5f6663" }}>/ month</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ padding: "0 8px" }}>
                        {CMP_ROWS.map((row) => (
                            <div key={row.label} role="rowgroup">
                                <div role="row">
                                    <div role="rowheader" style={{ padding: "14px 4px 2px", fontSize: 14, fontWeight: 600, color: "#0c0c10" }}>
                                        {row.label}
                                    </div>
                                </div>
                                <div role="row" className="cl-cg" style={{ borderBottom: "1px solid #eceeed" }}>
                                    {row.cells.map((c, i) => (
                                        <span key={i} role="cell" className={i === 2 ? "hl" : undefined}>
                                            {c}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* faq */}
            <section className="cl-m" style={{ padding: "56px 16px 0", display: "flex", flexDirection: "column", gap: 18 }}>
                <Reveal y={16}>
                    <h2 style={{ padding: "0 4px" }}>Frequently asked questions</h2>
                </Reveal>
                <Stagger style={{ display: "flex", flexDirection: "column", gap: 10 }} stagger={0.06}>
                    {QA.map(([q, a], i) => (
                        <FaqItem key={q} q={q} a={a} id={`${baseId}-pgfaq-${i}`} open={i === open} onToggle={() => setOpen(i === open ? -1 : i)} />
                    ))}
                </Stagger>
            </section>

            {/* closing cta */}
            <section style={{ padding: "40px 16px 56px" }}>
                <Reveal y={18} style={{ padding: "28px 22px", borderRadius: 22, background: "#111827", display: "flex", flexDirection: "column", gap: 12 }}>
                    <h2 style={{ margin: 0, fontSize: 26, lineHeight: 1.18, fontWeight: 600, letterSpacing: "-0.03em", color: "#ffffff" }}>See Carat Logic in a demo</h2>
                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.75)" }}>Book a free demo to explore the platform and find the package that fits your team.</p>
                    <a href="/contact?tab=demo" className="cl-btn" style={{ marginTop: 8, minHeight: 54, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "6px 6px 6px 22px", borderRadius: 999, background: "#ffffff", color: "#111827", fontSize: 16, fontWeight: 600 }}>
                        <span style={{ color: "#111827" }}>Book a free demo</span>
                        <span style={{ flex: "none", width: 40, height: 40, borderRadius: 999, background: "#317a51", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Arrow stroke="#ffffff" />
                        </span>
                    </a>
                </Reveal>
            </section>
        </div>
    );
}
