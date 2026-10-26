"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState, type CSSProperties, type ReactNode } from "react";
import { EASE, Reveal, Stagger, itemVariants } from "@/components/landing/motion";
import { CLIENTS } from "@/components/site/clients";
import { ClientChip } from "@/components/site/ClientChip";
import "./pricing-page.css";

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

/**
 * One set of the 9 client chips (~2,900px) can be narrower than very wide screens; each marquee half
 * repeats the set so it never shows a gap, and the duration scales with the repeats (~44s per set).
 */
const SET_REPEATS = 3;
const ROWS = [{ hidden: false }, { hidden: true }];
const stripMask = "linear-gradient(90deg, rgba(0,0,0,0) 0%, #000000 12%, #000000 88%, rgba(0,0,0,0) 100%)";

/* ---------- small pieces ---------- */

function Check({ style }: { style?: CSSProperties }) {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#317a51" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>
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
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#245c3e", fontWeight: 600 }}>
        <Check />
        Included
    </span>
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
            <>Gem <b>or</b> Diamond module</>,
            <>Gem <b>or</b> Diamond module</>,
            <>Gem <b>and</b> Diamond modules</>,
        ],
    },
    { label: "Active users", cells: ["Up to 3", "Up to 7", "Up to 7"] },
    { label: "Platform features", cells: ["All 9 core features", "All 9 core features", "All 17 platform features"] },
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
                    <motion.svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true" initial={false} animate={{ stroke: open ? "#ffffff" : "#111827" }} transition={t}>
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
                        <p style={{ margin: 0, padding: "0 20px 20px", fontSize: 16, lineHeight: 1.7, color: "#5f6663" }}>{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ---------- page ---------- */

export function PricingPageDesktop() {
    const [open, setOpen] = useState(0);
    const baseId = useId();
    const reduce = useReducedMotion();

    return (
        <div className="pg-pricing" style={{ color: "#111114", background: "#ffffff" }}>
            {/* ============ PRICING HEADER ============ */}
            <section style={{ padding: "96px 24px 64px" }}>
                <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
                    <motion.h1
                        initial={reduce ? false : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: EASE }}
                        style={{ margin: 0, fontSize: 68, lineHeight: 1.04, fontWeight: 600, letterSpacing: "-0.045em", color: "#0c0c10" }}
                    >
                        Clear Pricing for Diamond and Gemstone Businesses
                    </motion.h1>
                </div>
            </section>

            {/* ============ FREE TRIAL ============ */}
            <section style={{ padding: "0 24px 24px" }}>
                <Reveal
                    style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: 40, alignItems: "center", padding: "36px 40px", borderRadius: 24, background: "#f6f7f7" }}
                    delay={0.15}
                >
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <span style={{ fontSize: 15, fontWeight: 600, color: "#245c3e" }}>Start with a free trial</span>
                        <h2 style={{ margin: 0, fontSize: 34, lineHeight: 1.15, fontWeight: 600, letterSpacing: "-0.03em", color: "#0c0c10" }}>Explore Carat Logic for ₹0</h2>
                        <p style={{ margin: 0, maxWidth: 680, fontSize: 17, lineHeight: 1.65, color: "#3f4643" }}>
                            Book a free demo first. After the walkthrough, our team can help arrange access to the ₹0 trial so you can explore Carat Logic before choosing a paid package.
                        </p>
                        <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.55, color: "#6b736f", fontStyle: "italic" }}>
                            Trial access begins after a demo. Trial duration and access details can be confirmed during your walkthrough.
                        </p>
                    </div>
                    <a href="/contact?tab=demo" className="cl-btn" style={{ display: "flex", alignItems: "center", gap: 14, padding: "7px 7px 7px 24px", borderRadius: 999, background: "#111827", color: "#ffffff", fontSize: 16, fontWeight: 600, boxShadow: "0 0 0 4px #ffffff, 0 0 0 5px #dfe3e1, 0 12px 24px rgba(17,24,39,0.2)" }}>
                        <span style={{ color: "#ffffff" }}>Book a free demo</span>
                        <span style={{ flex: "none", width: 40, height: 40, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Arrow stroke="#111827" />
                        </span>
                    </a>
                </Reveal>
            </section>

            {/* ============ PACKAGES ============ */}
            <section style={{ padding: "88px 24px 24px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <Reveal>
                        <h2 style={{ margin: "0 0 40px", fontSize: 44, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.035em", color: "#0c0c10" }}>Choose your package</h2>
                    </Reveal>
                    <Stagger className="cl-plans" stagger={0.12}>
                        {PLANS.map((p) => (
                            <motion.article key={p.name} className={p.hl ? "cl-plan hl" : "cl-plan"} variants={itemVariants}>
                                <h3 style={{ margin: 0, fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em", color: "#0c0c10" }}>{p.name}</h3>
                                <p style={{ margin: "10px 0 0", minHeight: 48, fontSize: 15, lineHeight: 1.55, color: "#5f6663" }}>{p.desc}</p>
                                <div style={{ marginTop: 28, display: "flex", alignItems: "baseline", gap: 8 }}>
                                    <span style={{ fontSize: 56, lineHeight: 1, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>{p.price}</span>
                                    <span style={{ fontSize: 16, color: "#5f6663" }}>/ month</span>
                                </div>
                                <ul style={{ listStyle: "none", margin: "32px 0 0", padding: "28px 0 0", borderTop: "1px solid #eceeed", display: "flex", flexDirection: "column", gap: 14 }}>
                                    {p.features.map((f) => (
                                        <li key={f} style={{ display: "flex", gap: 12, fontSize: 16, lineHeight: 1.5, color: "#1d2320" }}>
                                            <Check style={{ flex: "none", marginTop: 3 }} />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.article>
                        ))}
                    </Stagger>
                    <Reveal y={16} style={{ marginTop: 48, display: "flex", justifyContent: "center" }}>
                        <a href="/contact?tab=demo" className="cl-btn" style={{ display: "flex", alignItems: "center", gap: 14, padding: "8px 8px 8px 26px", borderRadius: 999, background: "#111827", color: "#ffffff", fontSize: 17, fontWeight: 600, boxShadow: "0 0 0 5px #ffffff, 0 0 0 6px #dfe3e1, 0 12px 26px rgba(17,24,39,0.22)" }}>
                            <span style={{ color: "#ffffff" }}>Book a demo</span>
                            <span style={{ flex: "none", width: 40, height: 40, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Arrow stroke="#111827" />
                            </span>
                        </a>
                    </Reveal>
                    <p style={{ margin: "24px 0 0", textAlign: "center", fontSize: 14, color: "#6b736f", fontStyle: "italic" }}>Paid package prices are shown per month in euros.</p>
                </div>
            </section>

            {/* ============ CLIENT LOGOS ============ */}
            <section style={{ padding: "72px 0 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
                    <Reveal y={16}>
                        <p style={{ margin: 0, padding: "0 24px", textAlign: "center", fontSize: 17, fontWeight: 500, color: "#111114" }}>Trusted by diamond and gemstone businesses worldwide</p>
                    </Reveal>
                    <Reveal className="cl-strip" delay={0.1} y={16} style={{ position: "relative", width: "100%", overflow: "hidden", WebkitMaskImage: stripMask, maskImage: stripMask }}>
                        <div className="cl-track" style={{ display: "flex", width: "max-content", animationDuration: `${44 * SET_REPEATS}s` }}>
                            {ROWS.map((row, r) => (
                                <div key={r} aria-hidden={row.hidden || undefined} style={{ display: "flex", alignItems: "center", gap: 72, paddingRight: 72 }}>
                                    {Array.from({ length: SET_REPEATS }, (_, k) =>
                                        CLIENTS.map((c) => <ClientChip key={`${k}-${c.name}`} client={c} size="lg" hidden={row.hidden || k > 0} />),
                                    )}
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ============ COMPARE ============ */}
            <section style={{ padding: "80px 24px 24px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <Reveal>
                        <h2 style={{ margin: "0 0 32px", fontSize: 44, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.035em", color: "#0c0c10" }}>Compare Carat Logic packages</h2>
                    </Reveal>
                    <Reveal className="cl-cmp" delay={0.08} style={{ border: "1px solid #eceeed", borderRadius: 24, overflow: "hidden" }}>
                        <table className="cl-tbl">
                            <caption style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Carat Logic package comparison</caption>
                            <colgroup>
                                <col style={{ width: "31%" }} />
                                <col />
                                <col />
                                <col />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th scope="col" style={{ verticalAlign: "bottom" }}>
                                        <span style={{ fontSize: 15, fontWeight: 600, color: "#6b736f" }}>Feature</span>
                                    </th>
                                    {CMP_HEAD.map((h) => (
                                        <th key={h.name} scope="col" className={h.hl ? "hl" : undefined}>
                                            <span style={{ display: "block", fontSize: 18, fontWeight: 600, color: "#0c0c10" }}>{h.name}</span>
                                            <span style={{ display: "block", marginTop: 8, fontSize: 32, fontWeight: 600, letterSpacing: "-0.03em", color: "#0c0c10" }}>
                                                {h.price}
                                                <span style={{ fontSize: 14, fontWeight: 400, letterSpacing: 0, color: "#5f6663" }}> / month</span>
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {CMP_ROWS.map((row) => (
                                    <tr key={row.label}>
                                        <th scope="row">{row.label}</th>
                                        {row.cells.map((c, i) => (
                                            <td key={i} className={i === 2 ? "hl" : undefined}>
                                                {c}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Reveal>
                </div>
            </section>

            {/* ============ FAQ ============ */}
            <section style={{ padding: "112px 24px 40px" }}>
                <div className="cl-faq" style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <Reveal style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <h2 style={{ margin: 0, fontSize: 44, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.035em", color: "#0c0c10" }}>Frequently asked questions</h2>
                        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: "#5f6663" }}>Questions about the trial, packages and what each one includes.</p>
                    </Reveal>
                    <Stagger style={{ display: "flex", flexDirection: "column", gap: 12 }} stagger={0.06}>
                        {QA.map(([q, a], i) => (
                            <FaqItem key={q} q={q} a={a} id={`${baseId}-pgfaq-${i}`} open={i === open} onToggle={() => setOpen(i === open ? -1 : i)} />
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* ============ CLOSING CTA ============ */}
            <section style={{ padding: "72px 24px 112px" }}>
                <Reveal style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, padding: "48px 48px", borderRadius: 28, background: "#111827" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 640 }}>
                        <h2 style={{ margin: 0, fontSize: 38, lineHeight: 1.12, fontWeight: 600, letterSpacing: "-0.03em", color: "#ffffff" }}>See Carat Logic in a demo</h2>
                        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "rgba(255,255,255,0.75)" }}>Book a free demo to explore the platform and find the package that fits your team.</p>
                    </div>
                    <a href="/contact?tab=demo" className="cl-btn" style={{ flex: "none", display: "flex", alignItems: "center", gap: 14, padding: "7px 7px 7px 24px", borderRadius: 999, background: "#ffffff", color: "#111827", fontSize: 16, fontWeight: 600 }}>
                        <span style={{ color: "#111827" }}>Book a free demo</span>
                        <span style={{ width: 40, height: 40, borderRadius: 999, background: "#317a51", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Arrow stroke="#ffffff" />
                        </span>
                    </a>
                </Reveal>
            </section>
        </div>
    );
}
