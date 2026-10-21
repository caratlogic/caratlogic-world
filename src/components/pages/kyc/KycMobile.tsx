"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState, type CSSProperties, type ReactNode } from "react";
import { EASE, Reveal, Stagger, StaggerItem, itemVariants } from "@/components/landing/motion";
import { KYC_QA } from "./KycDesktop";
import "./kyc-mobile.css";

/* ---------- shared bits ---------- */

const CHIP: Record<string, [string, string]> = {
    Approved: ["#e3f1e7", "#245c3e"],
    "In review": ["#e6eefc", "#1f4fa8"],
    "Docs pending": ["#fdf0d8", "#8a5300"],
    "Renewal due": ["#fde7e7", "#a12c2c"],
    Published: ["#e3f1e7", "#245c3e"],
    "✓ Checked": ["#e3f1e7", "#245c3e"],
    "Needs info": ["#fdf0d8", "#8a5300"],
    Valid: ["#e3f1e7", "#245c3e"],
    Expiring: ["#fdf0d8", "#8a5300"],
    Renew: ["#fde7e7", "#a12c2c"],
};

/** Status pill. `tiny` = the phone-screen variant (9px). */
function Chip({ label, tiny = false }: { label: string; tiny?: boolean }) {
    const [bg, fg] = CHIP[label] ?? ["#f0f2f1", "#3a403d"];
    return <span style={{ display: "inline-block", padding: "3px 9px", borderRadius: 999, background: bg, color: fg, fontSize: tiny ? 9 : 11, fontWeight: 600, whiteSpace: "nowrap" }}>{label}</span>;
}

function Svg({ size, stroke, width, children }: { size: number; stroke: string; width: number; children: ReactNode }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {children}
        </svg>
    );
}

function Arrow({ stroke }: { stroke: string }) {
    return (
        <Svg size={16} stroke={stroke} width={2.4}>
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
        </Svg>
    );
}

const P = {
    form: (
        <>
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <path d="M8 8h8" />
            <path d="M8 12h8" />
            <path d="M8 16h5" />
        </>
    ),
    send: (
        <>
            <path d="m22 2-7 20-4-9-9-4z" />
            <path d="M22 2 11 13" />
        </>
    ),
    doc: (
        <>
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <path d="M14 3v5h5" />
        </>
    ),
    check: (
        <>
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </>
    ),
    refresh: (
        <>
            <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
            <path d="M21 3v5h-5" />
        </>
    ),
    save: (
        <>
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <path d="M17 21v-8H7v8" />
            <path d="M7 3v5h8" />
        </>
    ),
    stages: (
        <>
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
            <path d="M7 12h3M14 12h3" />
        </>
    ),
    eye: (
        <>
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
            <circle cx="12" cy="12" r="3" />
        </>
    ),
    chatAlert: (
        <>
            <path d="M21 12a8.5 8.5 0 0 1-12.4 7.5L3 21l1.5-5.4A8.5 8.5 0 1 1 21 12z" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
        </>
    ),
    clock: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
        </>
    ),
    users: (
        <>
            <circle cx="9" cy="8" r="3.5" />
            <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
            <path d="M16 4.5a3.5 3.5 0 0 1 0 7" />
            <path d="M21.5 20a6.5 6.5 0 0 0-4-6" />
        </>
    ),
    shield: (
        <>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
        </>
    ),
};

/* ---------- hero ---------- */

const AUDIENCE = ["B2B", "B2C", "Manufacturers"];
const PHONE_FILTERS = ["All", "In review", "Approved", "Renewals"];
const PHONE_ROWS: [string, string, string][] = [
    ["Shah Diamonds", "Customer · B2B", "Approved"],
    ["Gemline LLP", "Supplier · B2B", "In review"],
    ["Aurum Jewels", "Customer · B2C", "Docs pending"],
    ["Navkar Gems", "Supplier · Manufacturer", "Renewal due"],
];
const floatCard: CSSProperties = { position: "absolute", borderRadius: 14, background: "rgba(255,255,255,0.96)", border: "1px solid #e6e9e8", boxShadow: "0 16px 32px rgba(16,24,20,0.16)" };

function Hero() {
    const reduce = useReducedMotion();
    const rise = (i: number) => (reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: EASE, delay: 0.05 + i * 0.1 } });

    return (
        <section style={{ padding: "48px 20px 0", textAlign: "center" }}>
            <motion.h1 {...rise(0)} style={{ margin: 0, fontSize: 40, lineHeight: 1.06, fontWeight: 600, letterSpacing: "-0.045em", color: "#0c0c10" }}>
                KYC Management <span style={{ color: "#6b6b75" }}>Software</span>
            </motion.h1>
            <motion.p {...rise(1)} style={{ margin: "18px 0 0", fontSize: 17, lineHeight: 1.5, color: "#6b6b75" }}>
                Manage forms, documents and reviews for B2B, B2C and manufacturing teams <span style={{ color: "#111114" }}>across the jewellery, diamond and gemstone industries.</span>
            </motion.p>
            <motion.ul {...rise(2)} aria-label="Built for" style={{ listStyle: "none", margin: "22px 0 0", padding: 0, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 18px" }}>
                {AUDIENCE.map((a) => (
                    <li key={a} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 14, fontWeight: 500, color: "#3a403d" }}>
                        <span style={{ width: 18, height: 18, borderRadius: 999, background: "#e3f1e7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Svg size={10} stroke="#245c3e" width={3}>
                                <path d="m5 12 5 5L20 7" />
                            </Svg>
                        </span>
                        {a}
                    </li>
                ))}
            </motion.ul>

            <motion.div
                style={{ position: "relative", margin: "40px auto 0", width: 268, textAlign: "left" }}
                initial={reduce ? false : { opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
            >
                <div style={{ height: 430, padding: "10px 10px 0", borderRadius: "46px 46px 0 0", background: "linear-gradient(160deg, #2a2e2c 0%, #0c0f0e 100%)", boxShadow: "inset 0 0 0 2px #3a3f3c, 0 30px 60px rgba(16,24,20,0.22)", boxSizing: "border-box" }}>
                    <div style={{ position: "relative", height: "100%", borderRadius: "36px 36px 0 0", overflow: "hidden", background: "#f6f7f7", display: "flex", flexDirection: "column" }}>
                        <div style={{ height: 34, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", background: "#ffffff", fontSize: 10, fontWeight: 600, color: "#0c0c10" }}>
                            <span>9:41</span>
                            <span aria-hidden="true" style={{ width: 76, height: 20, borderRadius: 999, background: "#0c0f0e" }} />
                            <span>●●●</span>
                        </div>
                        <div style={{ padding: "8px 14px 12px", background: "#ffffff", borderBottom: "1px solid #eceeed", display: "flex", flexDirection: "column", gap: 10 }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <span style={{ display: "flex", flexDirection: "column" }}>
                                    <span style={{ fontSize: 15, fontWeight: 700, color: "#0c0c10" }}>KYC Submissions</span>
                                    <span style={{ fontSize: 9.5, color: "#6b736f" }}>Customers and suppliers</span>
                                </span>
                                <span style={{ padding: "5px 9px", borderRadius: 8, background: "#317a51", color: "#ffffff", fontSize: 10, fontWeight: 700 }}>+ Assign</span>
                            </div>
                            <div style={{ display: "flex", gap: 5, overflow: "hidden" }}>
                                {PHONE_FILTERS.map((f, i) => (
                                    <span key={f} style={{ display: "inline-block", padding: "3px 9px", borderRadius: 999, background: i === 0 ? "#111827" : "#f0f2f1", color: i === 0 ? "#ffffff" : "#3a403d", fontSize: 9, fontWeight: 600, whiteSpace: "nowrap" }}>
                                        {f}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div style={{ flex: 1, padding: 10, display: "flex", flexDirection: "column", gap: 7 }}>
                            {PHONE_ROWS.map(([name, sub, status], i) => (
                                <motion.div
                                    key={name}
                                    initial={reduce ? false : { opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease: EASE, delay: 0.8 + i * 0.08 }}
                                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 12, background: "#ffffff", border: "1px solid #edf0ee" }}
                                >
                                    <span style={{ flex: "none", width: 32, height: 32, borderRadius: 999, background: "#e3f1e7", color: "#245c3e", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{name[0]}</span>
                                    <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 1 }}>
                                        <span style={{ fontSize: 11, fontWeight: 700, color: "#0c0c10" }}>{name}</span>
                                        <span style={{ fontSize: 9.5, color: "#6b736f" }}>{sub}</span>
                                    </span>
                                    <Chip label={status} tiny />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="cl-bob" aria-hidden="true" style={{ ...floatCard, left: -46, top: 150, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 5, width: 150, transform: "rotate(-4deg)", boxSizing: "border-box" }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: "#0c0c10" }}>Upload documents</span>
                    <span style={{ display: "flex", justifyContent: "space-between", fontSize: 9.5, color: "#3a403d" }}>
                        <span>Business registration</span>
                        <span style={{ color: "#317a51", fontWeight: 700 }}>✓</span>
                    </span>
                    <span style={{ display: "flex", justifyContent: "space-between", fontSize: 9.5, color: "#3a403d" }}>
                        <span>Bank reference</span>
                        <span style={{ color: "#8a5300", fontWeight: 600 }}>Pending</span>
                    </span>
                </div>
                <div className="cl-bob2" aria-hidden="true" style={{ ...floatCard, right: -42, top: 300, padding: "9px 11px", display: "flex", alignItems: "center", gap: 8, transform: "rotate(4deg)" }}>
                    <span style={{ width: 28, height: 28, borderRadius: 8, background: "#317a51", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Svg size={14} stroke="#ffffff" width={2}>
                            {P.shield}
                        </Svg>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: 10, color: "#5b6360" }}>Submission</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#0c0c10" }}>Approved</span>
                    </span>
                </div>
            </motion.div>
        </section>
    );
}

/* ---------- action bar ---------- */

const barBtn: CSSProperties = { flex: 1, minHeight: 52, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "5px 5px 5px 18px", borderRadius: 999, color: "#ffffff", fontSize: 15, fontWeight: 600 };
const barKnob: CSSProperties = { flex: "none", width: 40, height: 40, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" };

function ActionBar() {
    const reduce = useReducedMotion();
    return (
        // display stays inline here (no media rule touches it); `position/top` live in .cl-actionbar
        <div className="cl-actionbar" style={{ margin: "-86px 12px 18px", zIndex: 10 }}>
            <motion.div
                initial={reduce ? false : { y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
                style={{ padding: 8, borderRadius: 999, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", border: "1px solid #e3e6e5", boxShadow: "0 18px 40px rgba(16,24,20,0.16), 0 2px 6px rgba(16,24,20,0.06)", display: "flex", gap: 8, boxSizing: "border-box" }}
            >
                <a href="/contact" className="cl-btn" style={{ ...barBtn, background: "#111827", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)" }}>
                    <span style={{ color: "#ffffff", whiteSpace: "nowrap" }}>Get started</span>
                    <span style={barKnob}>
                        <Arrow stroke="#111827" />
                    </span>
                </a>
                <a href="/contact?tab=demo" className="cl-btn" style={{ ...barBtn, background: "linear-gradient(90deg, #245c3e 0%, #317a51 55%, #3f9463 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 18px rgba(44,111,75,0.3)" }}>
                    <span style={{ color: "#ffffff", whiteSpace: "nowrap" }}>Book a demo</span>
                    <span style={barKnob}>
                        <Arrow stroke="#245c3e" />
                    </span>
                </a>
            </motion.div>
        </div>
    );
}

/* ---------- overview ---------- */

const CARDS: { icon: ReactNode; title: string; desc: string }[] = [
    { icon: P.form, title: "Build Forms Around Your Process", desc: "Create multi-page forms with 15+ field types and choose which details are required." },
    { icon: P.send, title: "Invite the Right Contacts", desc: "Assign published forms to customers, suppliers, brokers or partners and send an email invitation." },
    { icon: P.doc, title: "Collect Documents and Track Expiry", desc: "Keep submitted files with each KYC record and see when documents need renewal." },
    { icon: P.check, title: "Review Submissions Step by Step", desc: "Check responses field by field, request missing information and monitor review status." },
    { icon: P.refresh, title: "Keep Onboarding Moving", desc: "Use reminders and page-by-page auto-save to help contacts complete forms and your team follow up." },
];
const dot = (bg: string): CSSProperties => ({ width: 4, height: 4, borderRadius: 999, background: bg });

function Overview() {
    return (
        <section id="m-features" style={{ padding: "56px 20px 64px", borderTop: "1px solid #eceeed" }}>
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                <Reveal as="span" style={{ display: "inline-flex", padding: "5px 12px", borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111114", border: "2px solid transparent", background: "linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(90deg, #2c6f4b, #7fc88f, #36823a, #317a51) border-box" }}>
                    Carat Logic KYC
                </Reveal>
                <Reveal delay={0.05}>
                    <h2 style={{ margin: 0, fontSize: 31, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>Keep Every KYC Request Moving</h2>
                </Reveal>
                <Reveal delay={0.1}>
                    <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#5f6663" }}>Manage KYC for B2B, B2C and manufacturing workflows across jewellery, diamond and gemstone businesses.</p>
                </Reveal>
            </div>
            <Stagger style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
                {CARDS.map((c) => (
                    <StaggerItem key={c.title}>
                        <article style={{ position: "relative", display: "flex", flexDirection: "column", gap: 22, padding: 22, borderRadius: 20, background: "#ffffff", border: "1px solid #e6e9e8", boxShadow: "0 1px 2px rgba(16,24,20,0.04), 0 12px 28px rgba(16,24,20,0.05)" }}>
                            <span style={{ width: 46, height: 46, borderRadius: 13, background: "#f5f6f6", border: "1px solid #e6e9e8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Svg size={22} stroke="#317a51" width={2}>
                                    {c.icon}
                                </Svg>
                            </span>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <h3 style={{ margin: 0, fontSize: 19, lineHeight: 1.25, fontWeight: 600, letterSpacing: "-0.02em", color: "#0c0c10" }}>{c.title}</h3>
                                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#5f6663" }}>{c.desc}</p>
                            </div>
                            <span aria-hidden="true" style={{ position: "absolute", right: 20, top: 24, display: "flex", gap: 5 }}>
                                <span style={dot("#d3d8d6")} />
                                <span style={dot("#d3d8d6")} />
                                <span style={dot("#317a51")} />
                            </span>
                        </article>
                    </StaggerItem>
                ))}
            </Stagger>
        </section>
    );
}

/* ---------- blocks ---------- */

type Feature = { icon: ReactNode; title: string; desc: string };

function FeatureList({ items }: { items: Feature[] }) {
    return (
        <Stagger style={{ display: "flex", flexDirection: "column", marginTop: 6 }} stagger={0.12}>
            {items.map((f, i) => {
                const first = i === 0;
                const last = i === items.length - 1;
                return (
                    <StaggerItem key={f.title} style={{ display: "flex", gap: 14, padding: last ? "2px 0 4px 16px" : "2px 0 20px 16px", borderLeft: `2px solid ${first ? "#317a51" : "#dfe7e2"}` }}>
                        <span style={{ flex: "none", width: 38, height: 38, borderRadius: 11, background: first ? "#e3f1e7" : "#f1f5f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Svg size={19} stroke="#2c6f4b" width={2}>
                                {f.icon}
                            </Svg>
                        </span>
                        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: "#0c0c10" }}>{f.title}</h3>
                            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "#5f6663" }}>{f.desc}</p>
                        </div>
                    </StaggerItem>
                );
            })}
        </Stagger>
    );
}

function Block({ tag, title, intro, visual, features, href }: { tag: string; title: string; intro: string; visual: ReactNode; features: Feature[]; href: string }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Reveal as="span" style={{ alignSelf: "flex-start", padding: "5px 12px", borderRadius: 999, border: "1px solid rgba(49,122,81,0.35)", background: "#eef6f0", fontSize: 12, fontWeight: 600, color: "#245c3e" }}>
                {tag}
            </Reveal>
            <Reveal delay={0.05}>
                <h2 style={{ margin: 0, fontSize: 30, lineHeight: 1.12, fontWeight: 600, letterSpacing: "-0.035em", color: "#0c0c10" }}>{title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "#5f6663" }}>{intro}</p>
            </Reveal>
            <Reveal delay={0.1} y={32} style={{ marginTop: 6, padding: 12, borderRadius: 22, background: "#f4f5f5", border: "1px solid #e7e9e8" }}>
                <div style={{ borderRadius: 16, background: "#ffffff", border: "1px solid #e3e6e5", boxShadow: "0 18px 40px rgba(16,24,20,0.12)", padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>{visual}</div>
            </Reveal>
            <FeatureList items={features} />
            <a href={href} className="cl-tl" style={{ alignSelf: "flex-start", marginTop: 4 }}>
                View Details <span aria-hidden="true">→</span>
            </a>
        </div>
    );
}

const vTable: CSSProperties = { border: "1px solid #eceeed", borderRadius: 12, overflow: "hidden" };
const vTableHead: CSSProperties = { padding: "8px 12px", background: "#f4f6f5", fontSize: 11, fontWeight: 600, color: "#4a514e" };
const vRow: CSSProperties = { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderTop: "1px solid #f0f2f1" };

function CardHead({ title, sub, chip }: { title: string; sub: string; chip: string }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#0c0c10" }}>{title}</span>
                <span style={{ fontSize: 11, color: "#6b736f" }}>{sub}</span>
            </span>
            <Chip label={chip} />
        </div>
    );
}

function Toggle({ on }: { on: boolean }) {
    return (
        <span style={{ width: 28, height: 16, borderRadius: 999, background: on ? "#317a51" : "#d6dcd9", position: "relative" }}>
            <span style={{ position: "absolute", top: 2, ...(on ? { right: 2 } : { left: 2 }), width: 12, height: 12, borderRadius: 999, background: "#fff" }} />
        </span>
    );
}

/* block 1: forms */
const STEPS: [string, string, "done" | "current" | "todo"][] = [
    ["✓", "Company", "done"],
    ["2", "Documents", "current"],
    ["3", "Declaration", "todo"],
];
const FIELDS: [string, string, boolean][] = [
    ["Company name", "Short text", true],
    ["Registration number", "Short text", true],
    ["Business licence", "File upload", true],
    ["Bank reference letter", "File upload", false],
];

const formsVisual = (
    <>
        <CardHead title="Supplier KYC form" sub="Form builder · 3 pages" chip="Published" />
        <div style={{ display: "flex", gap: 6 }}>
            {STEPS.map(([n, label, st]) => (
                <span key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5, padding: "8px 4px", borderRadius: 10, background: st === "current" ? "#eef6f0" : "#f6f7f7", color: st === "current" ? "#245c3e" : "#5f6663", fontSize: 10.5, fontWeight: 600 }}>
                    <span style={{ width: 20, height: 20, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, ...(st === "todo" ? { background: "#fff", border: "1px solid #d6dfda", color: "#8a908d" } : { background: "#317a51", color: "#fff" }) }}>{n}</span>
                    {label}
                </span>
            ))}
        </div>
        <div style={vTable}>
            <div style={{ ...vTableHead, display: "flex", justifyContent: "space-between" }}>
                <span>Page 2 · Documents</span>
                <span>Required</span>
            </div>
            {FIELDS.map(([name, type, on]) => (
                <div key={name} style={vRow}>
                    <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                        <span style={{ fontSize: 12.5, fontWeight: 600, color: "#1d2320" }}>{name}</span>
                        <span style={{ fontSize: 11, color: "#7a827e" }}>{type}</span>
                    </span>
                    <Toggle on={on} />
                </div>
            ))}
        </div>
    </>
);

const FORMS_FEATURES: Feature[] = [
    { icon: P.form, title: "Build forms around your process", desc: "Choose the information you need from each contact." },
    { icon: P.send, title: "Invite contacts to complete forms", desc: "Share a link so customers and partners can submit their details." },
    { icon: P.save, title: "Save progress as they go", desc: "Let contacts return to their form without starting again." },
];

/* block 2: reviews */
const REVIEW_FIELDS: [string, string, string, string][] = [
    ["Company name", "Gemline LLP", "#1d2320", "✓ Checked"],
    ["Registration certificate", "registration.pdf", "#1f4fa8", "✓ Checked"],
    ["Owner ID proof", "owner-id.jpg", "#1f4fa8", "✓ Checked"],
    ["Bank reference letter", "Not provided", "#1d2320", "Needs info"],
];

const reviewVisual = (
    <>
        <CardHead title="Gemline LLP" sub="Supplier · KYC v3" chip="In review" />
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600 }}>
            <span style={{ width: 20, height: 20, borderRadius: 999, background: "#317a51", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>✓</span>
            <span>Submitted</span>
            <span aria-hidden="true" style={{ flex: 1, height: 2, background: "#317a51" }} />
            <span style={{ width: 20, height: 20, borderRadius: 999, border: "3px solid #317a51", boxSizing: "border-box" }} />
            <span>In review</span>
            <span aria-hidden="true" style={{ flex: 1, height: 2, background: "#dfe5e1" }} />
            <span style={{ width: 20, height: 20, borderRadius: 999, border: "2px solid #d6dfda", boxSizing: "border-box" }} />
            <span style={{ color: "#8a908d" }}>Approved</span>
        </div>
        <div style={vTable}>
            <div style={vTableHead}>Field review</div>
            {REVIEW_FIELDS.map(([label, value, color, chip]) => (
                <div key={label} style={{ ...vRow, justifyContent: "space-between" }}>
                    <span style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0 }}>
                        <span style={{ fontSize: 11, color: "#6b736f" }}>{label}</span>
                        <span style={{ fontSize: 12.5, fontWeight: 600, color }}>{value}</span>
                    </span>
                    <Chip label={chip} />
                </div>
            ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8 }}>
            <span style={{ padding: "9px 10px", borderRadius: 10, border: "1px solid #e3e6e5", fontSize: 12, fontWeight: 600, color: "#3a403d", textAlign: "center" }}>Request missing info</span>
            <span style={{ padding: "9px 14px", borderRadius: 10, background: "#2f7a50", fontSize: 12, fontWeight: 600, color: "#ffffff" }}>Approve</span>
        </div>
    </>
);

const REVIEW_FEATURES: Feature[] = [
    { icon: P.stages, title: "Track each review stage", desc: "Know which KYC requests need attention." },
    { icon: P.eye, title: "Review details together", desc: "See submitted information and supporting documents in context." },
    { icon: P.chatAlert, title: "Request missing information", desc: "Follow up when a submission needs clarification." },
];

/* block 3: records */
const DOCS: [string, string, string][] = [
    ["Business registration", "Valid until Mar 2028", "Valid"],
    ["Owner ID proof", "Expires in 21 days", "Expiring"],
    ["Trade licence", "Expired 2 weeks ago", "Renew"],
    ["Bank reference letter", "Valid until Jan 2027", "Valid"],
];

const recordsVisual = (
    <>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ flex: "none", width: 40, height: 40, borderRadius: 999, background: "#e3f1e7", color: "#245c3e", fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>N</span>
            <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#0c0c10" }}>Navkar Gems</span>
                <span style={{ fontSize: 11, color: "#6b736f" }}>Supplier · KYC approved</span>
            </span>
            <span style={{ display: "inline-block", padding: "3px 9px", borderRadius: 999, background: "#fde7e7", color: "#a12c2c", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>Renewal due</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 8 }}>
            <span style={{ padding: 10, borderRadius: 12, background: "#f6f7f7", display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 11, color: "#5f6663" }}>Documents</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#0c0c10" }}>4 on file</span>
            </span>
            <span style={{ padding: 10, borderRadius: 12, background: "#f6f7f7", display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 11, color: "#5f6663" }}>Next expiry</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#8a5300" }}>21 days</span>
            </span>
        </div>
        <div style={vTable}>
            <div style={vTableHead}>Supporting documents</div>
            {DOCS.map(([name, note, chip]) => (
                <div key={name} style={vRow}>
                    <span style={{ flex: "none", width: 28, height: 28, borderRadius: 8, background: "#eef6f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Svg size={14} stroke="#317a51" width={2}>
                            {P.doc}
                        </Svg>
                    </span>
                    <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 1 }}>
                        <span style={{ fontSize: 12.5, fontWeight: 600, color: "#1d2320" }}>{name}</span>
                        <span style={{ fontSize: 11, color: "#7a827e" }}>{note}</span>
                    </span>
                    <Chip label={chip} />
                </div>
            ))}
        </div>
    </>
);

const RECORD_FEATURES: Feature[] = [
    { icon: P.doc, title: "Keep documents with each record", desc: "Find supporting files alongside the relevant contact details." },
    { icon: P.clock, title: "Monitor document expiry", desc: "See which documents may need renewing." },
    { icon: P.users, title: "Maintain organised contact records", desc: "Keep KYC information for customers, suppliers, brokers and partners in one place." },
];

function Blocks() {
    return (
        <section style={{ padding: "16px 20px 72px", display: "flex", flexDirection: "column", gap: 72 }}>
            <Block
                tag="KYC Forms"
                title="Collect the Details Your Business Needs"
                intro="Create a clear KYC process for customers, suppliers, brokers and partners across jewellery, diamond and gemstone businesses."
                visual={formsVisual}
                features={FORMS_FEATURES}
                href="/features/kyc-forms"
            />
            <Block
                tag="KYC Reviews"
                title="Keep Every KYC Review Moving"
                intro="See where each submission stands and give your team a clear way to review details and follow up."
                visual={reviewVisual}
                features={REVIEW_FEATURES}
                href="/features/kyc-review"
            />
            <Block
                tag="KYC Records"
                title="Keep Documents and Records Up to Date"
                intro="Keep contact details and supporting documents together, with expiry dates easier to monitor."
                visual={recordsVisual}
                features={RECORD_FEATURES}
                href="/features/kyc-documents"
            />
        </section>
    );
}

/* ---------- FAQ ---------- */

function FaqItem({ q, a, open, onToggle, id }: { q: string; a: string; open: boolean; onToggle: () => void; id: string }) {
    const reduce = useReducedMotion();
    const t = reduce ? { duration: 0 } : { duration: 0.35, ease: EASE };
    return (
        <motion.div variants={itemVariants} style={{ borderRadius: 16, background: "#ffffff", border: `1px solid ${open ? "#d5dcd8" : "#e6e9e8"}`, boxShadow: open ? "0 14px 30px rgba(16,24,20,0.07)" : "none", transition: "border-color .2s ease, box-shadow .2s ease" }}>
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
                    <motion.svg width="13" height="13" viewBox="0 0 24 24" fill="none" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true" initial={false} animate={{ rotate: open ? 180 : 0, stroke: open ? "#ffffff" : "#111827" }} transition={t}>
                        <path d="M5 12h14" />
                        <motion.path d="M12 5v14" initial={false} animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1 }} transition={t} style={{ transformOrigin: "center", transformBox: "fill-box" }} />
                    </motion.svg>
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div key="panel" id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={t} style={{ overflow: "hidden" }}>
                        <p style={{ margin: 0, padding: "0 18px 18px", fontSize: 14, lineHeight: 1.65, color: "#5f6663" }}>{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function Faq() {
    const [open, setOpen] = useState(0);
    const baseId = useId();
    return (
        <div style={{ padding: "0 8px 24px" }}>
            <section style={{ borderRadius: 26, background: "#f6f7f7", border: "1px solid #eceeed", padding: "44px 14px 16px", display: "flex", flexDirection: "column", gap: 22 }}>
                <Reveal>
                    <h2 style={{ margin: 0, padding: "0 6px", fontSize: 30, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>FAQs About Carat Logic KYC</h2>
                </Reveal>
                <Stagger style={{ display: "flex", flexDirection: "column", gap: 10 }} stagger={0.06}>
                    {KYC_QA.map(([q, a], i) => (
                        <FaqItem key={q} q={q} a={a} id={`m-${baseId}-kyc-faq-${i}`} open={i === open} onToggle={() => setOpen(i === open ? -1 : i)} />
                    ))}
                </Stagger>
            </section>
        </div>
    );
}

/* ---------- page ---------- */

export function KycMobile() {
    return (
        <div className="pg-kyc-m">
            <Hero />
            <ActionBar />
            <Overview />
            <Blocks />
            <Faq />
        </div>
    );
}
