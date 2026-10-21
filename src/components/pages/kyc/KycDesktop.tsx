"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState, type CSSProperties, type ReactNode } from "react";
import { EASE, Reveal, Stagger, StaggerItem, itemVariants, REVEAL_VIEWPORT } from "@/components/landing/motion";
import "./kyc.css";

const LOGO = "/design/a0624d387c799bef34880b03ced88e69.webp";

/* ---------- shared bits ---------- */

const CHIP: Record<string, [string, string]> = {
    Approved: ["#e3f1e7", "#245c3e"],
    "In review": ["#e6eefc", "#1f4fa8"],
    "Docs pending": ["#fdf0d8", "#8a5300"],
    "Renewal due": ["#fde7e7", "#a12c2c"],
    "Form sent": ["#f0f2f1", "#3a403d"],
    Published: ["#e3f1e7", "#245c3e"],
    "✓ Checked": ["#e3f1e7", "#245c3e"],
    "Needs info": ["#fdf0d8", "#8a5300"],
    Valid: ["#e3f1e7", "#245c3e"],
    "Expiring soon": ["#fdf0d8", "#8a5300"],
};

/** Status pill. `big` = the table variant (4px 10px / 12px), otherwise 3px 9px / 11px. */
function Chip({ label, big = false }: { label: string; big?: boolean }) {
    const [bg, fg] = CHIP[label] ?? CHIP["Form sent"];
    return <span style={{ display: "inline-block", padding: big ? "4px 10px" : "3px 9px", borderRadius: 999, background: bg, color: fg, fontSize: big ? 12 : 11, fontWeight: 600, whiteSpace: "nowrap" }}>{label}</span>;
}

function Svg({ size, stroke, width, children, hidden = true }: { size: number; stroke: string; width: number; children: ReactNode; hidden?: boolean }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden={hidden ? true : undefined}>
            {children}
        </svg>
    );
}

function Arrow({ size, stroke, width }: { size: number; stroke: string; width: number }) {
    return (
        <Svg size={size} stroke={stroke} width={width}>
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
    docClock: (
        <>
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <path d="M14 3v5h5" />
            <circle cx="12" cy="15" r="3" />
            <path d="M12 13.5V15l1 1" />
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
    doc: (
        <>
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <path d="M14 3v5h5" />
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
const SIDEBAR = ["Dashboard", "KYC Submissions", "Form Builder", "Business Contacts", "Documents", "Renewals"];
const FILTERS = ["All", "In review", "Approved", "Docs pending", "Renewals"];
const ROWS: [string, string, string, string, string][] = [
    ["Shah Diamonds", "Customer", "B2B", "KYC v3", "Approved"],
    ["Gemline LLP", "Supplier", "B2B", "KYC v3", "In review"],
    ["Aurum Jewels", "Customer", "B2C", "KYC v2", "Docs pending"],
    ["Navkar Gems", "Supplier", "Manufacturer", "KYC v3", "Renewal due"],
    ["Orion Jewellers", "Customer", "B2B", "KYC v3", "Form sent"],
    ["Meridian Stones", "Supplier", "Manufacturer", "KYC v3", "Approved"],
];
const tableGrid: CSSProperties = { display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 0.8fr 1fr", gap: 12 };
const floatCard: CSSProperties = { position: "absolute", zIndex: 2, width: 230, padding: "14px 16px", borderRadius: 20, background: "rgba(255,255,255,0.92)", border: "1px solid #ffffff", boxShadow: "0 24px 48px rgba(28,72,48,0.16), 0 4px 12px rgba(28,72,48,0.08)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", display: "flex", boxSizing: "border-box", textAlign: "left" };
const ctaBtn: CSSProperties = { display: "flex", alignItems: "center", gap: 16, padding: "10px 10px 10px 30px", borderRadius: 999, color: "#ffffff", fontSize: 19, fontWeight: 600 };
const ctaKnob: CSSProperties = { width: 44, height: 44, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" };

function Hero() {
    const reduce = useReducedMotion();
    const rise = (i: number) => (reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: EASE, delay: 0.05 + i * 0.1 } });

    return (
        <section style={{ position: "relative", padding: "104px 24px 96px", overflowX: "clip" }}>
            <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24 }}>
                <motion.h1 {...rise(0)} style={{ margin: 0, fontSize: 80, lineHeight: 1.04, fontWeight: 600, letterSpacing: "-0.045em", color: "#0c0c10" }}>
                    KYC Management <span style={{ color: "#6b6b75" }}>Software</span>
                </motion.h1>
                <motion.p {...rise(1)} style={{ margin: 0, maxWidth: 820, fontSize: 22, lineHeight: 1.5, letterSpacing: "-0.01em", color: "#6b6b75" }}>
                    Manage forms, documents and reviews for B2B, B2C and manufacturing teams <span style={{ color: "#111114" }}>across the jewellery, diamond and gemstone industries.</span>
                </motion.p>
                <motion.div {...rise(2)} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20, marginTop: 12 }}>
                    <a href="/contact?tab=demo" className="cl-btn" style={{ ...ctaBtn, background: "linear-gradient(90deg, #245c3e 0%, #317a51 55%, #3f9463 100%)", boxShadow: "0 0 0 5px #ffffff, 0 0 0 6px #cfe8d0, 0 12px 28px rgba(44,111,75,0.3)" }}>
                        <span style={{ color: "#ffffff" }}>Book a Demo</span>
                        <span style={ctaKnob}>
                            <Arrow size={18} stroke="#245c3e" width={2.2} />
                        </span>
                    </a>
                    <a href="#features" className="cl-btn" style={{ ...ctaBtn, background: "#111827", boxShadow: "0 0 0 5px #ffffff, 0 0 0 6px #e0e0e8, 0 12px 28px rgba(0,0,0,0.2)" }}>
                        <span style={{ color: "#ffffff" }}>Explore Features</span>
                        <span style={ctaKnob}>
                            <Arrow size={18} stroke="#111827" width={2.2} />
                        </span>
                    </a>
                </motion.div>
                <motion.ul {...rise(3)} aria-label="Built for" style={{ listStyle: "none", margin: "14px 0 0", padding: 0, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px 28px" }}>
                    {AUDIENCE.map((a) => (
                        <li key={a} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 500, color: "#3a403d" }}>
                            <span style={{ width: 20, height: 20, borderRadius: 999, background: "#e3f1e7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Svg size={11} stroke="#245c3e" width={3}>
                                    <path d="m5 12 5 5L20 7" />
                                </Svg>
                            </span>
                            {a}
                        </li>
                    ))}
                </motion.ul>
            </div>

            {/* product frame: KYC submissions */}
            <motion.div
                style={{ position: "relative", maxWidth: 1140, margin: "72px auto 0" }}
                initial={reduce ? false : { opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
            >
                <div style={{ padding: 16, borderRadius: 24, background: "linear-gradient(180deg, #e9ebea, #f3f4f4)", border: "1px solid #e3e6e5", boxShadow: "0 30px 60px rgba(16,24,20,0.14)" }}>
                    <div style={{ background: "#ffffff", borderRadius: 12, overflow: "hidden" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: "1px solid #eef0f4" }}>
                            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                                <span key={c} style={{ width: 11, height: 11, borderRadius: 999, background: c }} />
                            ))}
                        </div>
                        <div style={{ display: "flex", minHeight: 520, textAlign: "left" }}>
                            <div style={{ width: 210, flex: "none", borderRight: "1px solid #eef1ef", padding: "20px 14px", display: "flex", flexDirection: "column", gap: 4 }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={LOGO} alt="" style={{ height: 30, width: "auto", alignSelf: "flex-start", margin: "0 0 18px 6px" }} />
                                {SIDEBAR.map((s) =>
                                    s === "KYC Submissions" ? (
                                        <span key={s} style={{ padding: "8px 10px", borderRadius: 9, fontSize: 13, background: "#2f7a50", color: "#ffffff", fontWeight: 600 }}>
                                            {s}
                                        </span>
                                    ) : (
                                        <span key={s} style={{ padding: "8px 10px", borderRadius: 9, fontSize: 13, color: "#5f6663" }}>
                                            {s}
                                        </span>
                                    ),
                                )}
                            </div>
                            <div style={{ flex: 1, padding: "24px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                        <span style={{ fontSize: 22, fontWeight: 600, color: "#0c0c10" }}>KYC Submissions</span>
                                        <span style={{ fontSize: 13, color: "#6b736f" }}>Customers and suppliers across your business</span>
                                    </span>
                                    <span style={{ padding: "9px 16px", borderRadius: 10, background: "#2f7a50", color: "#ffffff", fontSize: 14, fontWeight: 600 }}>+ Assign Form</span>
                                </div>
                                <div style={{ display: "flex", gap: 8 }}>
                                    {FILTERS.map((f, i) => (
                                        <span key={f} style={{ display: "inline-block", padding: "4px 10px", borderRadius: 999, background: i === 0 ? "#2f7a50" : "#ffffff", color: i === 0 ? "#ffffff" : "#3a403d", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>
                                            {f}
                                        </span>
                                    ))}
                                </div>
                                <div style={{ border: "1px solid #e6e9e8", borderRadius: 12, overflow: "hidden" }}>
                                    <div style={{ ...tableGrid, padding: "11px 18px", background: "#f4f6f5", fontSize: 13, fontWeight: 600, color: "#4a514e" }}>
                                        <span>Business contact</span>
                                        <span>Type</span>
                                        <span>Segment</span>
                                        <span>Form</span>
                                        <span>Status</span>
                                    </div>
                                    {ROWS.map(([name, type, seg, form, status], i) => (
                                        <motion.div
                                            key={name}
                                            initial={reduce ? false : { opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, ease: EASE, delay: 0.9 + i * 0.07 }}
                                            style={{ ...tableGrid, alignItems: "center", padding: "13px 18px", borderTop: "1px solid #eef1ef", fontSize: 14 }}
                                        >
                                            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                <span style={{ width: 30, height: 30, borderRadius: 999, background: "#e3f1e7", color: "#245c3e", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{name[0]}</span>
                                                <span style={{ fontWeight: 600, color: "#1d2320" }}>{name}</span>
                                            </span>
                                            <span style={{ color: "#5f6663" }}>{type}</span>
                                            <span style={{ color: "#5f6663" }}>{seg}</span>
                                            <span style={{ color: "#1f4fa8" }}>{form}</span>
                                            <span>
                                                <Chip label={status} big />
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cl-bob" aria-hidden="true" style={{ ...floatCard, left: -56, top: 150, flexDirection: "column", gap: 9, transform: "rotate(-4deg)" }}>
                    <span style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600, color: "#0c0c10" }}>
                        <span>Upload documents</span>
                        <span style={{ fontSize: 11, fontWeight: 500, color: "#6b736f" }}>Page 2 of 3</span>
                    </span>
                    <span style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#3a403d" }}>
                        <span>Business registration</span>
                        <span style={{ color: "#317a51", fontWeight: 700 }}>✓</span>
                    </span>
                    <span style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#3a403d" }}>
                        <span>Owner ID proof</span>
                        <span style={{ color: "#317a51", fontWeight: 700 }}>✓</span>
                    </span>
                    <span style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#3a403d" }}>
                        <span>Bank reference</span>
                        <span style={{ color: "#8a5300", fontWeight: 600 }}>Pending</span>
                    </span>
                </div>
                <div className="cl-bob2" aria-hidden="true" style={{ ...floatCard, right: -48, top: 300, alignItems: "center", gap: 12, transform: "rotate(4deg)" }}>
                    <span style={{ flex: "none", width: 36, height: 36, borderRadius: 10, background: "#317a51", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 14px rgba(44,111,75,0.35)" }}>
                        <Svg size={18} stroke="#ffffff" width={2.2} hidden={false}>
                            {P.shield}
                        </Svg>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: "#5b6360" }}>Submission</span>
                        <span style={{ fontSize: 17, fontWeight: 700, color: "#0c0c10" }}>Approved</span>
                    </span>
                </div>
            </motion.div>
        </section>
    );
}

/* ---------- overview cards ---------- */

const CARDS: { cls: string; icon: ReactNode; title: string; desc: string }[] = [
    { cls: "cl-top", icon: P.form, title: "Build Forms Around Your Process", desc: "Create multi-page forms with 15+ field types and choose which details are required." },
    { cls: "cl-top", icon: P.send, title: "Invite the Right Contacts", desc: "Assign published forms to customers, suppliers, brokers or partners and send an email invitation." },
    { cls: "cl-top", icon: P.docClock, title: "Collect Documents and Track Expiry", desc: "Keep submitted files with each KYC record and see when documents need renewal." },
    { cls: "cl-wide", icon: P.check, title: "Review Submissions Step by Step", desc: "Check responses field by field, request missing information and monitor review status." },
    { cls: "cl-wide", icon: P.refresh, title: "Keep Onboarding Moving", desc: "Use reminders and page-by-page auto-save to help contacts complete forms and your team follow up." },
];

const dot = (bg: string): CSSProperties => ({ width: 4, height: 4, borderRadius: 999, background: bg });

function Overview() {
    return (
        <section id="features" style={{ padding: "112px 24px 120px", background: "#ffffff" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 48 }}>
                <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                    <Reveal as="span" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111114", border: "2px solid transparent", background: "linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(90deg, #2c6f4b, #7fc88f, #36823a, #317a51) border-box" }}>
                        Carat Logic KYC
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 style={{ margin: 0, fontSize: 60, lineHeight: 1.05, fontWeight: 600, letterSpacing: "-0.045em", color: "#0c0c10" }}>Keep Every KYC Request Moving</h2>
                    </Reveal>
                    <Reveal delay={0.1} style={{ maxWidth: 760 }}>
                        <p style={{ margin: 0, fontSize: 19, lineHeight: 1.55, color: "#5f6663" }}>Manage KYC for B2B, B2C and manufacturing workflows across jewellery, diamond and gemstone businesses.</p>
                    </Reveal>
                </div>
                <Stagger className="cl-feat">
                    {CARDS.map((c) => (
                        <StaggerItem key={c.title} className={c.cls} style={{ display: "flex" }}>
                            <article className="cl-card" style={{ flex: 1, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 40, minHeight: 240, padding: 28, borderRadius: 22, background: "#ffffff", border: "1px solid #e6e9e8", boxShadow: "0 1px 2px rgba(16,24,20,0.04), 0 14px 32px rgba(16,24,20,0.06)", boxSizing: "border-box" }}>
                                <span style={{ width: 54, height: 54, borderRadius: 14, background: "#f5f6f6", border: "1px solid #e6e9e8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Svg size={24} stroke="#317a51" width={2}>
                                        {c.icon}
                                    </Svg>
                                </span>
                                <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 520 }}>
                                    <h3 style={{ margin: 0, fontSize: 22, lineHeight: 1.25, fontWeight: 600, letterSpacing: "-0.02em", color: "#0c0c10" }}>{c.title}</h3>
                                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#5f6663" }}>{c.desc}</p>
                                </div>
                                <span aria-hidden="true" style={{ position: "absolute", right: 22, bottom: 22, display: "flex", gap: 6 }}>
                                    <span style={dot("#d3d8d6")} />
                                    <span style={dot("#d3d8d6")} />
                                    <span style={dot("#317a51")} />
                                </span>
                            </article>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}

/* ---------- feature rows ---------- */

type Feature = { icon: ReactNode; title: string; desc: string };

function FeatureList({ items }: { items: Feature[] }) {
    return (
        <Stagger style={{ display: "flex", flexDirection: "column", marginTop: 12 }} stagger={0.12}>
            {items.map((f, i) => {
                const first = i === 0;
                const last = i === items.length - 1;
                return (
                    <StaggerItem key={f.title} style={{ display: "flex", gap: 18, padding: last ? "4px 0 6px 22px" : "4px 0 26px 22px", borderLeft: `2px solid ${first ? "#317a51" : "#dfe7e2"}` }}>
                        <span style={{ flex: "none", width: 44, height: 44, borderRadius: 12, background: first ? "#e3f1e7" : "#f1f5f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Svg size={22} stroke="#2c6f4b" width={2}>
                                {f.icon}
                            </Svg>
                        </span>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <h3 style={{ margin: 0, fontSize: 21, fontWeight: 600, color: "#0c0c10" }}>{f.title}</h3>
                            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#5f6663" }}>{f.desc}</p>
                        </div>
                    </StaggerItem>
                );
            })}
        </Stagger>
    );
}

function TextColumn({ tag, title, intro, features, href }: { tag: string; title: string; intro: string; features: Feature[]; href: string }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <Reveal as="span" style={{ alignSelf: "flex-start", padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(49,122,81,0.35)", background: "#eef6f0", fontSize: 13, fontWeight: 600, color: "#245c3e" }}>
                {tag}
            </Reveal>
            <Reveal delay={0.05}>
                <h2 style={{ margin: 0, fontSize: 48, lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.035em", color: "#0c0c10" }}>{title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "#5f6663" }}>{intro}</p>
            </Reveal>
            <FeatureList items={features} />
            <a href={href} className="cl-tl" style={{ alignSelf: "flex-start", marginTop: 8 }}>
                View Details <span aria-hidden="true">→</span>
            </a>
        </div>
    );
}

const vPanel: CSSProperties = { position: "relative", padding: 28, borderRadius: 28, background: "#f4f5f5", border: "1px solid #e7e9e8", boxSizing: "border-box" };
const vCard: CSSProperties = { borderRadius: 18, background: "#ffffff", border: "1px solid #e3e6e5", boxShadow: "0 24px 50px rgba(16,24,20,0.12)", padding: 22, display: "flex", flexDirection: "column", gap: 18 };
const vTable: CSSProperties = { border: "1px solid #eceeed", borderRadius: 12, overflow: "hidden" };
const vTableHead: CSSProperties = { padding: "9px 14px", background: "#f4f6f5", fontSize: 12, fontWeight: 600, color: "#4a514e" };
const vRow: CSSProperties = { display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderTop: "1px solid #f0f2f1" };
const callout: CSSProperties = { position: "absolute", zIndex: 3, display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 14, background: "#ffffff", border: "1px solid #e3e9e5", boxShadow: "0 16px 36px rgba(16,40,28,0.18)" };

function Callout({ pos, bg, icon, label, value }: { pos: CSSProperties; bg: string; icon: ReactNode; label: string; value: string }) {
    return (
        <div className="cl-call cl-bob" aria-hidden="true" style={{ ...callout, ...pos }}>
            <span style={{ width: 32, height: 32, borderRadius: 9, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Svg size={16} stroke="#ffffff" width={2.2} hidden={false}>
                    {icon}
                </Svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <span style={{ fontSize: 11, color: "#5b6360" }}>{label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#0c0c10" }}>{value}</span>
            </span>
        </div>
    );
}

/** The visual panel: reveals as a unit; callouts pop in after it. */
function Visual({ children, callouts }: { children: ReactNode; callouts: ReactNode }) {
    const reduce = useReducedMotion();
    return (
        <motion.div
            className="cl-vis"
            style={vPanel}
            initial={reduce ? false : { opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
            <div style={vCard}>{children}</div>
            {/* positioned overlay with the panel's box, so the callouts keep their design offsets while the wrapper animates */}
            <motion.div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} initial={reduce ? false : { opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={REVEAL_VIEWPORT} transition={{ duration: 0.5, ease: EASE, delay: 0.55 }}>
                {callouts}
            </motion.div>
        </motion.div>
    );
}

function CardHead({ title, sub, chip }: { title: string; sub: string; chip: string }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 17, fontWeight: 600, color: "#0c0c10" }}>{title}</span>
                <span style={{ fontSize: 12, color: "#6b736f" }}>{sub}</span>
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

/* block 1 */
const FORMS_FEATURES: Feature[] = [
    { icon: P.form, title: "Build forms around your process", desc: "Choose the information you need from each contact." },
    { icon: P.send, title: "Invite contacts to complete forms", desc: "Share a link so customers and partners can submit their details." },
    { icon: P.save, title: "Save progress as they go", desc: "Let contacts return to their form without starting again." },
];
const STEPS: [string, string, "done" | "current" | "todo"][] = [
    ["✓", "Company", "done"],
    ["2", "Documents", "current"],
    ["3", "Declaration", "todo"],
];
const FIELDS: [string, string, boolean][] = [
    ["Company name", "Short text", true],
    ["Registration number", "Short text", true],
    ["Country of incorporation", "Dropdown", true],
    ["Business licence", "File upload", true],
    ["Bank reference letter", "File upload", false],
];

function FormsVisual() {
    return (
        <Visual
            callouts={
                <>
                    <Callout pos={{ right: -24, top: 70 }} bg="#111827" icon={P.send} label="Invitation sent" value="Orion Jewellers" />
                    <Callout pos={{ left: -28, bottom: 40 }} bg="#317a51" icon={P.save} label="Progress saved" value="Page 2 of 3" />
                </>
            }
        >
            <CardHead title="Supplier KYC form" sub="Form builder · 3 pages" chip="Published" />
            <div style={{ display: "flex", gap: 8 }}>
                {STEPS.map(([n, label, st]) => (
                    <span key={label} style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "9px 10px", borderRadius: 10, background: st === "current" ? "#eef6f0" : "#f6f7f7", color: st === "current" ? "#245c3e" : "#5f6663", fontSize: 12, fontWeight: 600 }}>
                        <span style={{ width: 20, height: 20, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, ...(st === "todo" ? { background: "#fff", border: "1px solid #d6dfda", color: "#8a908d" } : { background: "#317a51", color: "#fff" }) }}>{n}</span>
                        {label}
                    </span>
                ))}
            </div>
            <div style={vTable}>
                <div style={vTableHead}>Page 2 · Documents</div>
                {FIELDS.map(([name, type, on]) => (
                    <div key={name} style={vRow}>
                        <span style={{ color: "#b7beba", fontSize: 14 }}>⋮⋮</span>
                        <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: "#1d2320" }}>{name}</span>
                            <span style={{ fontSize: 11, color: "#7a827e" }}>{type}</span>
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#5f6663" }}>
                            Required
                            <Toggle on={on} />
                        </span>
                    </div>
                ))}
            </div>
            <span style={{ alignSelf: "flex-start", padding: "8px 12px", borderRadius: 10, border: "1px dashed #c9d6cf", fontSize: 12, fontWeight: 600, color: "#245c3e" }}>+ Add field</span>
        </Visual>
    );
}

/* block 2 */
const REVIEW_FEATURES: Feature[] = [
    { icon: P.stages, title: "Track each review stage", desc: "Know which KYC requests need attention." },
    { icon: P.eye, title: "Review details together", desc: "See submitted information and supporting documents in context." },
    { icon: P.chatAlert, title: "Request missing information", desc: "Follow up when a submission needs clarification." },
];
const REVIEW_FIELDS: [string, string, string, string][] = [
    ["Company name", "Gemline LLP", "#1d2320", "✓ Checked"],
    ["Registration certificate", "registration.pdf", "#1f4fa8", "✓ Checked"],
    ["Owner ID proof", "owner-id.jpg", "#1f4fa8", "✓ Checked"],
    ["Bank reference letter", "Not provided", "#1d2320", "Needs info"],
];
const stepDot: CSSProperties = { width: 22, height: 22, borderRadius: 999, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 };

function ReviewVisual() {
    return (
        <Visual callouts={<Callout pos={{ left: -28, top: 90 }} bg="#111827" icon={P.chatAlert} label="Request sent" value="Bank reference letter" />}>
            <CardHead title="Gemline LLP" sub="Supplier · KYC v3" chip="In review" />
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ ...stepDot, background: "#317a51", color: "#fff" }}>✓</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#0c0c10" }}>Submitted</span>
                </span>
                <span aria-hidden="true" style={{ flex: 1, height: 2, background: "#dfe5e1" }} />
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ ...stepDot, background: "#fff", border: "3px solid #317a51" }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#0c0c10" }}>In review</span>
                </span>
                <span aria-hidden="true" style={{ flex: 1, height: 2, background: "#dfe5e1" }} />
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ ...stepDot, background: "#fff", border: "2px solid #d6dfda" }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#8a908d" }}>Approved</span>
                </span>
            </div>
            <div style={vTable}>
                <div style={vTableHead}>Field review</div>
                {REVIEW_FIELDS.map(([label, value, color, chip]) => (
                    <div key={label} style={{ ...vRow, justifyContent: "space-between" }}>
                        <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <span style={{ fontSize: 12, color: "#6b736f" }}>{label}</span>
                            <span style={{ fontSize: 13, fontWeight: 600, color }}>{value}</span>
                        </span>
                        <Chip label={chip} />
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <span style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #e3e6e5", fontSize: 12, fontWeight: 600, color: "#3a403d" }}>Request missing information</span>
                <span style={{ padding: "8px 12px", borderRadius: 10, background: "#2f7a50", fontSize: 12, fontWeight: 600, color: "#ffffff" }}>Approve</span>
            </div>
        </Visual>
    );
}

/* block 3 */
const RECORD_FEATURES: Feature[] = [
    { icon: P.doc, title: "Keep documents with each record", desc: "Find supporting files alongside the relevant contact details." },
    { icon: P.clock, title: "Monitor document expiry", desc: "See which documents may need renewing." },
    { icon: P.users, title: "Maintain organised contact records", desc: "Keep KYC information for customers, suppliers, brokers and partners in one place." },
];
const STATS: [string, string, string][] = [
    ["Contact type", "Supplier", "#0c0c10"],
    ["Documents", "4 on file", "#0c0c10"],
    ["Next expiry", "21 days", "#8a5300"],
];
const DOCS: [string, string, string][] = [
    ["Business registration", "Valid until Mar 2028", "Valid"],
    ["Owner ID proof", "Expires in 21 days", "Expiring soon"],
    ["Trade licence", "Expired 2 weeks ago", "Renewal due"],
    ["Bank reference letter", "Valid until Jan 2027", "Valid"],
];

function RecordsVisual() {
    return (
        <Visual callouts={<Callout pos={{ right: -24, bottom: 40 }} bg="#317a51" icon={P.clock} label="Reminder sent" value="Trade licence renewal" />}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ width: 46, height: 46, borderRadius: 999, background: "#e3f1e7", color: "#245c3e", fontWeight: 700, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>N</span>
                <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 17, fontWeight: 600, color: "#0c0c10" }}>Navkar Gems</span>
                    <span style={{ fontSize: 12, color: "#6b736f" }}>Supplier · KYC approved</span>
                </span>
                <Chip label="Renewal due" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 10 }}>
                {STATS.map(([k, v, c]) => (
                    <span key={k} style={{ padding: 12, borderRadius: 12, background: "#f6f7f7", display: "flex", flexDirection: "column", gap: 2 }}>
                        <span style={{ fontSize: 11, color: "#5f6663" }}>{k}</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: c }}>{v}</span>
                    </span>
                ))}
            </div>
            <div style={vTable}>
                <div style={vTableHead}>Supporting documents</div>
                {DOCS.map(([name, note, chip]) => (
                    <div key={name} style={vRow}>
                        <span style={{ flex: "none", width: 30, height: 30, borderRadius: 8, background: "#eef6f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Svg size={15} stroke="#317a51" width={2.2}>
                                {P.doc}
                            </Svg>
                        </span>
                        <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: "#1d2320" }}>{name}</span>
                            <span style={{ fontSize: 11, color: "#7a827e" }}>{note}</span>
                        </span>
                        <Chip label={chip} />
                    </div>
                ))}
            </div>
        </Visual>
    );
}

function FeatureRows() {
    return (
        <section style={{ padding: "40px 24px 120px", background: "#ffffff" }}>
            <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", flexDirection: "column", gap: 140 }}>
                <div className="cl-prod">
                    <TextColumn
                        tag="KYC Forms"
                        title="Collect the Details Your Business Needs"
                        intro="Create a clear KYC process for customers, suppliers, brokers and partners across jewellery, diamond and gemstone businesses."
                        features={FORMS_FEATURES}
                        href="/features/kyc-forms"
                    />
                    <FormsVisual />
                </div>
                <div className="cl-prod rev">
                    <TextColumn
                        tag="KYC Reviews"
                        title="Keep Every KYC Review Moving"
                        intro="See where each submission stands and give your team a clear way to review details and follow up."
                        features={REVIEW_FEATURES}
                        href="/features/kyc-review"
                    />
                    <ReviewVisual />
                </div>
                <div className="cl-prod">
                    <TextColumn
                        tag="KYC Records"
                        title="Keep Documents and Records Up to Date"
                        intro="Keep contact details and supporting documents together, with expiry dates easier to monitor."
                        features={RECORD_FEATURES}
                        href="/features/kyc-documents"
                    />
                    <RecordsVisual />
                </div>
            </div>
        </section>
    );
}

/* ---------- FAQ ---------- */

export const KYC_QA: [string, string][] = [
    ["What does Carat Logic KYC software do?", "Carat Logic KYC helps jewellery, diamond and gemstone businesses collect KYC information and documents, review submissions, and keep contact records organised."],
    ["Can Carat Logic KYC support B2B, B2C and manufacturing workflows?", "Yes. Teams can manage KYC requests for customers, suppliers, brokers and partners across B2B, B2C and manufacturing workflows."],
    ["Can I customise KYC forms for my business?", "Yes. Create forms around the information your business needs to collect from different contacts."],
    ["Can contacts upload documents with their KYC forms?", "Yes. Contacts can submit supporting documents with their forms, and your team can review them alongside the submitted information."],
    ["Can I track document expiry dates?", "Yes. Track document expiry dates to see which records may need updating."],
    ["Can my team request more information after reviewing a submission?", "Yes. If details are missing or need clarification, your team can request additional information as part of the review process."],
];

function FaqItem({ q, a, open, onToggle, id }: { q: string; a: string; open: boolean; onToggle: () => void; id: string }) {
    const reduce = useReducedMotion();
    const t = reduce ? { duration: 0 } : { duration: 0.35, ease: EASE };
    return (
        <motion.div variants={itemVariants} style={{ borderRadius: 18, background: "#ffffff", border: `1px solid ${open ? "#d5dcd8" : "#e6e9e8"}`, boxShadow: open ? "0 14px 30px rgba(16,24,20,0.07)" : "none", transition: "border-color .2s ease, box-shadow .2s ease" }}>
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
                    <motion.svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true" initial={false} animate={{ rotate: open ? 180 : 0, stroke: open ? "#ffffff" : "#111827" }} transition={t}>
                        <path d="M5 12h14" />
                        <motion.path d="M12 5v14" initial={false} animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1 }} transition={t} style={{ transformOrigin: "center", transformBox: "fill-box" }} />
                    </motion.svg>
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div key="panel" id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={t} style={{ overflow: "hidden" }}>
                        <p style={{ margin: 0, padding: "0 20px 20px", maxWidth: 620, fontSize: 15, lineHeight: 1.65, color: "#5f6663" }}>{a}</p>
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
        <div style={{ padding: "80px 12px 56px" }}>
            <section style={{ maxWidth: 1180, margin: "0 auto", borderRadius: 32, background: "#f6f7f7", border: "1px solid #eceeed", padding: "88px 40px", boxSizing: "border-box" }}>
                <div className="cl-faq">
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <Reveal as="span" style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#2c6f4b" }}>
                            FAQ
                        </Reveal>
                        <Reveal delay={0.05}>
                            <h2 style={{ margin: 0, fontSize: 48, lineHeight: 1.05, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>FAQs About Carat Logic KYC</h2>
                        </Reveal>
                        <Reveal delay={0.1} style={{ alignSelf: "flex-start", marginTop: 8 }}>
                            <a href="/contact?tab=demo" className="cl-btn" style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 6px 6px 20px", borderRadius: 999, background: "#111827", color: "#ffffff", fontSize: 15, fontWeight: 600 }}>
                                <span style={{ color: "#ffffff" }}>Book a Demo</span>
                                <span style={{ width: 34, height: 34, borderRadius: 999, background: "#317a51", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Arrow size={14} stroke="#ffffff" width={2.4} />
                                </span>
                            </a>
                        </Reveal>
                    </div>
                    <Stagger style={{ display: "flex", flexDirection: "column", gap: 12 }} stagger={0.06}>
                        {KYC_QA.map(([q, a], i) => (
                            <FaqItem key={q} q={q} a={a} id={`${baseId}-kyc-faq-${i}`} open={i === open} onToggle={() => setOpen(i === open ? -1 : i)} />
                        ))}
                    </Stagger>
                </div>
            </section>
        </div>
    );
}

/* ---------- page ---------- */

export function KycDesktop() {
    return (
        <div className="pg-kyc">
            <Hero />
            <Overview />
            <FeatureRows />
            <Faq />
        </div>
    );
}
