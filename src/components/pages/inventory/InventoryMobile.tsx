"use client";

import { useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { EASE, Reveal, Stagger, StaggerItem, itemVariants } from "@/components/landing/motion";
import { AUDIENCE, BLOCKS, DIAMOND_SHOT, DOCS, GEM_SHOT, MEMO_ROWS, MEMO_STEPS, QA, TALLY, TALLY_ROWS, type Block, type BlockKey } from "./data";
import "./inventory-mobile.css";

function Icon({ size, stroke, width, children }: { size: number; stroke: string; width: number; children: ReactNode }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {children}
        </svg>
    );
}

function Arrow({ size, stroke }: { size: number; stroke: string }) {
    return (
        <Icon size={size} stroke={stroke} width={2.4}>
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
        </Icon>
    );
}

/* ---------- hero ---------- */

const STONES: { name: string; meta: string; status: string; bg: string; fg: string }[] = [
    { name: "Round · 1.02 ct", meta: "DM-1042 · G · VS1 · GIA", status: "In stock", bg: "#e3f1e7", fg: "#245c3e" },
    { name: "Oval · 1.50 ct", meta: "DM-0977 · F · VVS2 · IGI", status: "On memo", bg: "#fdf0d8", fg: "#8a5300" },
    { name: "Emerald · 2.01 ct", meta: "DM-1088 · H · SI1 · GIA", status: "In stock", bg: "#e3f1e7", fg: "#245c3e" },
    { name: "Pear · 0.90 ct", meta: "DM-1103 · E · VS2 · GIA", status: "Reserved", bg: "#e6eefc", fg: "#1f4fa8" },
    { name: "Cushion · 1.21 ct", meta: "DM-1110 · G · VS1 · HRD", status: "Sold", bg: "#f0f2f1", fg: "#3a403d" },
];

const tinyChip = (bg: string, fg: string): CSSProperties => ({ padding: "2px 8px", borderRadius: 999, background: bg, color: fg, fontSize: 9, fontWeight: 700, whiteSpace: "nowrap" });

function Hero() {
    const reduce = useReducedMotion();
    const rise = (i: number) => (reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: EASE, delay: 0.05 + i * 0.1 } });
    return (
        <section style={{ padding: "48px 20px 0", textAlign: "center" }}>
            <motion.h1 {...rise(0)} style={{ margin: 0, fontSize: 40, lineHeight: 1.06, fontWeight: 600, letterSpacing: "-0.045em", color: "#0c0c10" }}>
                Diamond and Gem Inventory <span style={{ color: "#6b6b75" }}>Software</span>
            </motion.h1>
            <motion.p {...rise(1)} style={{ margin: "18px 0 0", fontSize: 17, lineHeight: 1.5, color: "#6b6b75" }}>
                Manage diamond and gemstone stock, memos, and orders <span style={{ color: "#111114" }}>in one place.</span>
            </motion.p>
            <motion.ul {...rise(2)} aria-label="Built for" style={{ listStyle: "none", margin: "22px 0 0", padding: 0, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 18px" }}>
                {AUDIENCE.map((a) => (
                    <li key={a} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 14, fontWeight: 500, color: "#3a403d" }}>
                        <span style={{ width: 18, height: 18, borderRadius: 999, background: "#e3f1e7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon size={10} stroke="#245c3e" width={3}>
                                <path d="m5 12 5 5L20 7" />
                            </Icon>
                        </span>
                        {a}
                    </li>
                ))}
            </motion.ul>
            <motion.div
                style={{ position: "relative", margin: "40px auto 0", width: 268, textAlign: "left" }}
                initial={reduce ? false : { opacity: 0, y: 48 }}
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
                                    <span style={{ fontSize: 15, fontWeight: 700, color: "#0c0c10" }}>Diamond Inventory</span>
                                    <span style={{ fontSize: 9.5, color: "#6b736f" }}>309 stones · 5,669.08 ct</span>
                                </span>
                                <span style={{ width: 28, height: 28, borderRadius: 9, background: "#317a51", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 600 }}>+</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 10px", borderRadius: 10, background: "#f3f5f4", fontSize: 10, color: "#8a908d" }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8a908d" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                                    <circle cx="11" cy="11" r="7" />
                                    <path d="m20 20-4-4" />
                                </svg>
                                Search stock ID, shape, carat…
                            </div>
                            <div style={{ display: "flex", gap: 5, overflow: "hidden" }}>
                                <span style={tinyChip("#111827", "#ffffff")}>All</span>
                                <span style={tinyChip("#f0f2f1", "#3a403d")}>Natural</span>
                                <span style={tinyChip("#f0f2f1", "#3a403d")}>Lab-grown</span>
                                <span style={tinyChip("#f0f2f1", "#3a403d")}>On memo</span>
                            </div>
                        </div>
                        <div style={{ flex: 1, padding: 10, display: "flex", flexDirection: "column", gap: 7 }}>
                            {STONES.map((s, i) => (
                                <motion.div
                                    key={s.meta}
                                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 12, background: "#ffffff", border: "1px solid #edf0ee" }}
                                    initial={reduce ? false : { opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease: EASE, delay: 0.8 + i * 0.08 }}
                                >
                                    <span style={{ flex: "none", width: 34, height: 34, borderRadius: 10, background: "#f1f5f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Icon size={16} stroke="#317a51" width={2}>
                                            <path d="M6 3h12l4 6-10 12L2 9z" />
                                            <path d="M2 9h20" />
                                        </Icon>
                                    </span>
                                    <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 1 }}>
                                        <span style={{ fontSize: 11, fontWeight: 700, color: "#0c0c10" }}>{s.name}</span>
                                        <span style={{ fontSize: 9.5, color: "#6b736f" }}>{s.meta}</span>
                                    </span>
                                    <span style={tinyChip(s.bg, s.fg)}>{s.status}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="cl-bob" aria-hidden="true" style={{ position: "absolute", left: -46, top: 170, padding: "10px 12px", borderRadius: 14, background: "rgba(255,255,255,0.96)", border: "1px solid #e6e9e8", boxShadow: "0 16px 32px rgba(16,24,20,0.16)", display: "flex", flexDirection: "column", gap: 6, width: 140, transform: "rotate(-4deg)", boxSizing: "border-box" }}>
                    <span style={{ fontSize: 10, color: "#5b6360" }}>Stock by type</span>
                    <span style={{ display: "flex", height: 6, borderRadius: 999, overflow: "hidden" }}>
                        <span style={{ width: "52%", background: "#317a51" }} />
                        <span style={{ width: "30%", background: "#7fc391" }} />
                        <span style={{ width: "18%", background: "#c9d6cf" }} />
                    </span>
                    <span style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#5f6663" }}>
                        <span>Diamonds</span>
                        <span>Gems</span>
                    </span>
                </div>
                <div className="cl-bob2" aria-hidden="true" style={{ position: "absolute", right: -42, top: 300, padding: "9px 11px", borderRadius: 14, background: "rgba(255,255,255,0.96)", border: "1px solid #e6e9e8", boxShadow: "0 16px 32px rgba(16,24,20,0.16)", display: "flex", alignItems: "center", gap: 8, transform: "rotate(4deg)" }}>
                    <span style={{ width: 28, height: 28, borderRadius: 8, background: "#317a51", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon size={14} stroke="#ffffff" width={2.2}>
                            <path d="m22 2-7 20-4-9-9-4z" />
                            <path d="M22 2 11 13" />
                        </Icon>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: 10, color: "#5b6360" }}>Memo returned</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#0c0c10" }}>Back to stock</span>
                    </span>
                </div>
            </motion.div>
        </section>
    );
}

/* ---------- sticky action bar ---------- */

function ActionBar() {
    const reduce = useReducedMotion();
    const base: CSSProperties = { flex: 1, minHeight: 52, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "5px 5px 5px 18px", borderRadius: 999, color: "#ffffff", fontSize: 15, fontWeight: 600 };
    const knob: CSSProperties = { flex: "none", width: 40, height: 40, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" };
    return (
        <motion.div
            className="cl-actionbar"
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
            style={{ position: "sticky", margin: "-86px 12px 18px", zIndex: 10, padding: 8, borderRadius: 999, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", border: "1px solid #e3e6e5", boxShadow: "0 18px 40px rgba(16,24,20,0.16), 0 2px 6px rgba(16,24,20,0.06)", display: "flex", gap: 8, boxSizing: "border-box" }}
        >
            <a href="/contact" className="cl-cta" style={{ ...base, background: "#111827", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)" }}>
                <span style={{ color: "#ffffff", whiteSpace: "nowrap" }}>Get started</span>
                <span style={knob}>
                    <Arrow size={16} stroke="#111827" />
                </span>
            </a>
            <a href="/contact?tab=demo" className="cl-cta" style={{ ...base, background: "linear-gradient(90deg, #245c3e 0%, #317a51 55%, #3f9463 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 18px rgba(44,111,75,0.3)" }}>
                <span style={{ color: "#ffffff", whiteSpace: "nowrap" }}>Book a demo</span>
                <span style={knob}>
                    <Arrow size={16} stroke="#245c3e" />
                </span>
            </a>
        </motion.div>
    );
}

/* ---------- control: feature cards ---------- */

const CARDS: { title: string; desc: string; icon: ReactNode }[] = [
    { title: "Find the Right Stone Faster", desc: "Search diamond and gem stock by specifications, certificate, price and availability.", icon: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>) },
    { title: "Keep Sales and Memos Moving", desc: "Move from quotation to memo or invoice, then record returns and payments.", icon: (<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6" /><path d="M9 17h4" /></>) },
    { title: "Share Stock With Buyers", desc: "Share branded stone links while keeping internal costs and supplier details private.", icon: (<><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></>) },
    { title: "Know What’s in Stock and Outstanding", desc: "Review stock value, memo exposure and outstanding receivables in one view.", icon: (<><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 6-6" /></>) },
    { title: "Control Team Access", desc: "Set team roles and manage who can view or update inventory details.", icon: (<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><rect x="9" y="10" width="6" height="5" rx="1" /><path d="M10.5 10V8.5a1.5 1.5 0 0 1 3 0V10" /></>) },
];

const dotSm: CSSProperties = { width: 4, height: 4, borderRadius: 999, background: "#d3d8d6" };

function Control() {
    return (
        <section id="m-features" style={{ padding: "56px 20px 64px", borderTop: "1px solid #eceeed" }}>
            <Reveal style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                <span style={{ display: "inline-flex", padding: "5px 12px", borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111114", border: "2px solid transparent", background: "linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(90deg, #2c6f4b, #7fc88f, #36823a, #317a51) border-box" }}>
                    Carat Logic Inventory
                </span>
                <h2 style={{ margin: 0, fontSize: 31, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>More Control Over Every Stone, Sale and Payment</h2>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#5f6663" }}>Manage diamond and gemstone inventory, track memos, and follow sales through invoices and payments—all in one workspace.</p>
            </Reveal>
            <Stagger style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }} stagger={0.08}>
                {CARDS.map((c) => (
                    <StaggerItem key={c.title}>
                        <article style={{ position: "relative", display: "flex", flexDirection: "column", gap: 22, padding: 22, borderRadius: 20, background: "#ffffff", border: "1px solid #e6e9e8", boxShadow: "0 1px 2px rgba(16,24,20,0.04), 0 12px 28px rgba(16,24,20,0.05)" }}>
                            <span style={{ width: 46, height: 46, borderRadius: 13, background: "#f5f6f6", border: "1px solid #e6e9e8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Icon size={22} stroke="#317a51" width={2}>
                                    {c.icon}
                                </Icon>
                            </span>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <h3 style={{ margin: 0, fontSize: 19, lineHeight: 1.25, fontWeight: 600, letterSpacing: "-0.02em", color: "#0c0c10" }}>{c.title}</h3>
                                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#5f6663" }}>{c.desc}</p>
                            </div>
                            <span aria-hidden="true" style={{ position: "absolute", right: 20, top: 24, display: "flex", gap: 5 }}>
                                <span style={dotSm} />
                                <span style={dotSm} />
                                <span style={{ ...dotSm, background: "#317a51" }} />
                            </span>
                        </article>
                    </StaggerItem>
                ))}
            </Stagger>
        </section>
    );
}

/* ---------- feature blocks ---------- */

const visCard: CSSProperties = { borderRadius: 16, background: "#ffffff", border: "1px solid #e3e6e5", boxShadow: "0 18px 40px rgba(16,24,20,0.12)", padding: 16, display: "flex", flexDirection: "column", gap: 14 };

function Shot({ src, alt }: { src: string; alt: string }) {
    return (
        <div style={{ borderRadius: 16, padding: 6, background: "#ffffff", border: "1px solid #e3e6e5", boxShadow: "0 18px 40px rgba(16,24,20,0.12)" }}>
            <div style={{ height: 270, borderRadius: 11, overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={alt} style={{ display: "block", width: "175%", maxWidth: "none", height: "auto", marginLeft: "-24%" }} />
            </div>
        </div>
    );
}

function GrowBar({ pct }: { pct: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.8 });
    const reduce = useReducedMotion();
    return (
        <span ref={ref} style={{ height: 7, borderRadius: 999, background: "#e7ece9", overflow: "hidden", display: "flex" }}>
            <motion.span
                style={{ background: "#317a51", borderRadius: 999 }}
                initial={reduce ? false : { width: "0%" }}
                animate={reduce || inView ? { width: `${pct}%` } : { width: "0%" }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
            />
        </span>
    );
}

function TallyCard() {
    return (
        <div style={visCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#0c0c10" }}>Inventory Tally</span>
                    <span style={{ fontSize: 11, color: "#6b736f" }}>Main warehouse · in progress</span>
                </span>
                <span style={{ flex: "none", display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 999, background: "#eef6f0", color: "#245c3e", fontSize: 11, fontWeight: 600 }}>
                    <Icon size={13} stroke="#245c3e" width={2}>
                        <path d="M4 7V5a1 1 0 0 1 1-1h2" />
                        <path d="M17 4h2a1 1 0 0 1 1 1v2" />
                        <path d="M20 17v2a1 1 0 0 1-1 1h-2" />
                        <path d="M7 20H5a1 1 0 0 1-1-1v-2" />
                        <path d="M8 8v8M12 8v8M16 8v8" />
                    </Icon>
                    RFID
                </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 8 }}>
                {TALLY.map((t) => (
                    <div key={t.label} style={{ padding: 10, borderRadius: 12, background: "#f6f7f7", display: "flex", flexDirection: "column", gap: 2 }}>
                        <span style={{ fontSize: 11, color: "#5f6663" }}>{t.label}</span>
                        <span style={t.numStyle}>{t.value}</span>
                    </div>
                ))}
            </div>
            <GrowBar pct={94} />
            <div style={{ border: "1px solid #eceeed", borderRadius: 12, overflow: "hidden", fontSize: 12 }}>
                {TALLY_ROWS.map((r) => (
                    <div key={r.id + r.status} style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", padding: "10px 12px", borderTop: "1px solid #f0f2f1" }}>
                        <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <span style={{ fontWeight: 600, color: "#1d2320" }}>{r.id}</span>
                            <span style={{ fontSize: 11, color: "#6b736f" }}>{r.loc}</span>
                        </span>
                        <span style={r.style}>{r.status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MemoCard() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const reduce = useReducedMotion();
    return (
        <div style={visCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                <span style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ display: "flex", gap: 6 }}>
                        <span style={{ padding: "3px 9px", borderRadius: 999, background: "#111827", color: "#ffffff", fontSize: 11, fontWeight: 600 }}>Memo Out</span>
                        <span style={{ padding: "3px 9px", borderRadius: 999, background: "#f1f3f2", color: "#3a403d", fontSize: 11, fontWeight: 600 }}>Memo In</span>
                    </span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#0c0c10" }}>MO-2291 · Shah Diamonds</span>
                </span>
                <span style={{ flex: "none", padding: "5px 10px", borderRadius: 999, background: "#fdf0d8", color: "#8a5300", fontSize: 11, fontWeight: 600 }}>Due in 4 days</span>
            </div>
            <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", position: "relative" }}>
                <span aria-hidden="true" style={{ position: "absolute", left: "12%", right: "12%", top: 11, height: 2, background: "#dfe5e1" }}>
                    <motion.span
                        style={{ position: "absolute", left: 0, top: 0, bottom: 0, background: "#317a51" }}
                        initial={reduce ? false : { width: "0%" }}
                        animate={reduce || inView ? { width: "66%" } : { width: "0%" }}
                        transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
                    />
                </span>
                {MEMO_STEPS.map((m) => (
                    <span key={m.label} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textAlign: "center" }}>
                        <span style={m.dot} />
                        <span style={{ fontSize: 10, fontWeight: 600, color: "#1d2320", lineHeight: 1.25 }}>{m.label}</span>
                    </span>
                ))}
            </div>
            <div style={{ border: "1px solid #eceeed", borderRadius: 12, overflow: "hidden", fontSize: 12 }}>
                {MEMO_ROWS.map((r) => (
                    <div key={r.id} style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", padding: "10px 12px", borderTop: "1px solid #f0f2f1" }}>
                        <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <span style={{ fontWeight: 600, color: "#1d2320" }}>{r.id}</span>
                            <span style={{ fontSize: 11, color: "#6b736f" }}>{r.desc}</span>
                        </span>
                        <span style={r.style}>{r.status}</span>
                    </div>
                ))}
            </div>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 5px 5px 16px", borderRadius: 999, background: "linear-gradient(90deg, #245c3e, #317a51 55%, #3f9463)", color: "#ffffff", fontSize: 13, fontWeight: 600 }}>
                Move approved to invoice{" "}
                <span style={{ width: 30, height: 30, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Arrow size={16} stroke="#245c3e" />
                </span>
            </span>
        </div>
    );
}

const FLOW_M: { label: string; meta: string; done: boolean; mark: string }[] = [
    { label: "Enquiry", meta: "Received", done: true, mark: "✓" },
    { label: "Quotation", meta: "Accepted", done: true, mark: "✓" },
    { label: "Memo or direct sale", meta: "Approved", done: true, mark: "✓" },
    { label: "Invoice", meta: "Ready", done: false, mark: "4" },
];

function OrdersCard() {
    const eyebrow: CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b736f" };
    const mark: CSSProperties = { flex: "none", width: 26, height: 26, borderRadius: 999, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 };
    return (
        <div style={visCard}>
            <span style={eyebrow}>Sales flow</span>
            <div style={{ position: "relative", display: "flex", flexDirection: "column", marginTop: -4 }}>
                <span aria-hidden="true" style={{ position: "absolute", left: 12, top: 22, bottom: 22, width: 2, background: "#cfe3d6" }} />
                <Stagger style={{ position: "relative", display: "flex", flexDirection: "column" }} stagger={0.1}>
                    {FLOW_M.map((f) => (
                        <StaggerItem key={f.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0" }}>
                            <span style={{ ...mark, ...(f.done ? { background: "#317a51", color: "#ffffff" } : { background: "#ffffff", border: "2px solid #317a51", color: "#317a51" }) }}>{f.mark}</span>
                            <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: "#0c0c10" }}>{f.label}</span>
                            <span style={{ fontSize: 12, color: "#6b736f" }}>{f.meta}</span>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
            <div style={{ height: 1, background: "#eef0ef" }} />
            <span style={eyebrow}>Documents</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {DOCS.map((d) => (
                    <span key={d} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 999, background: "#f6f7f7", border: "1px solid #e6e9e8", fontSize: 12, fontWeight: 600, color: "#1d2320", whiteSpace: "nowrap" }}>
                        <span style={{ width: 6, height: 6, borderRadius: 999, background: "#317a51" }} />
                        {d}
                    </span>
                ))}
            </div>
        </div>
    );
}

function Visual({ k }: { k: BlockKey }) {
    switch (k) {
        case "diamond":
            return <Shot src={DIAMOND_SHOT} alt="Carat Logic Diamond Inventory screen" />;
        case "gem":
            return <Shot src={GEM_SHOT} alt="Carat Logic Gem Inventory screen" />;
        case "control":
            return <TallyCard />;
        case "memo":
            return <MemoCard />;
        case "orders":
            return <OrdersCard />;
    }
}

function BlockM({ block }: { block: Block }) {
    const n = block.bullets.length;
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Reveal as="span" style={{ alignSelf: "flex-start", padding: "5px 12px", borderRadius: 999, border: "1px solid rgba(49,122,81,0.35)", background: "#eef6f0", fontSize: 12, fontWeight: 600, color: "#245c3e" }}>
                {block.tag}
            </Reveal>
            <Reveal delay={0.05}>
                <h2 style={{ margin: 0, fontSize: 30, lineHeight: 1.12, fontWeight: 600, letterSpacing: "-0.035em", color: "#0c0c10" }}>{block.title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "#5f6663" }}>{block.intro}</p>
            </Reveal>
            <Reveal y={32} style={{ marginTop: 6, padding: 12, borderRadius: 22, background: "#f4f5f5", border: "1px solid #e7e9e8" }}>
                <Visual k={block.key} />
            </Reveal>
            <Stagger style={{ display: "flex", flexDirection: "column", marginTop: 6 }} stagger={0.1}>
                {block.bullets.map((b, i) => (
                    <StaggerItem key={b.title} style={{ display: "flex", gap: 14, padding: i === n - 1 ? "2px 0 4px 16px" : "2px 0 20px 16px", borderLeft: `2px solid ${i === 0 ? "#317a51" : "#dfe7e2"}` }}>
                        <span style={{ flex: "none", width: 38, height: 38, borderRadius: 11, background: i === 0 ? "#e3f1e7" : "#f1f5f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon size={19} stroke="#2c6f4b" width={2}>
                                {b.icon}
                            </Icon>
                        </span>
                        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: "#0c0c10" }}>{b.title}</h3>
                            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "#5f6663" }}>{b.desc}</p>
                        </div>
                    </StaggerItem>
                ))}
            </Stagger>
            <a href={block.href} className="cl-tl" style={{ alignSelf: "flex-start", marginTop: 4 }}>
                View Details <span aria-hidden="true">→</span>
            </a>
        </div>
    );
}

/* ---------- FAQ ---------- */

function FaqItem({ q, a, open, onToggle, id }: { q: string; a: string; open: boolean; onToggle: () => void; id: string }) {
    const reduce = useReducedMotion();
    const t = reduce ? { duration: 0 } : { duration: 0.35, ease: EASE };
    return (
        <motion.div variants={itemVariants} style={{ borderRadius: 18, background: "#ffffff", border: `1px solid ${open ? "#d5dcd8" : "#e6e9e8"}`, boxShadow: open ? "0 14px 30px rgba(16,24,20,0.07)" : undefined }}>
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
                    <h2 style={{ margin: 0, padding: "0 6px", fontSize: 30, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>Frequently Asked Questions</h2>
                </Reveal>
                <Stagger style={{ display: "flex", flexDirection: "column", gap: 10 }} stagger={0.05}>
                    {QA.map(([q, a], i) => (
                        <FaqItem key={q} q={q} a={a} id={`m-${baseId}-inv-faq-${i}`} open={i === open} onToggle={() => setOpen(i === open ? -1 : i)} />
                    ))}
                </Stagger>
            </section>
        </div>
    );
}

export function InventoryMobile() {
    return (
        <div className="pg-inv-m">
            <Hero />
            <ActionBar />
            <Control />
            <section style={{ padding: "16px 20px 72px", display: "flex", flexDirection: "column", gap: 72 }}>
                {BLOCKS.map((b) => (
                    <BlockM key={b.key} block={b} />
                ))}
            </section>
            <Faq />
        </div>
    );
}
