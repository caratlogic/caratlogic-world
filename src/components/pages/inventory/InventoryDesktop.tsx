"use client";

import { useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { EASE, Reveal, Stagger, StaggerItem, itemVariants } from "@/components/landing/motion";
import { AUDIENCE, BLOCKS, DIAMOND_SHOT, DOCS, FLOW, GEM_SHOT, MEMO_ROWS, MEMO_STEPS, QA, TALLY, TALLY_ROWS, type Block, type BlockKey } from "./data";
import "./inventory.css";

/* ---------- shared bits ---------- */

function Arrow({ size, stroke, width }: { size: number; stroke: string; width: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
        </svg>
    );
}

function Icon({ size, stroke, width, children }: { size: number; stroke: string; width: number; children: ReactNode }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {children}
        </svg>
    );
}

const callout: CSSProperties = { position: "absolute", zIndex: 3, display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 14, background: "#ffffff", border: "1px solid #e3e9e5", boxShadow: "0 16px 36px rgba(16,40,28,0.18)" };
const visPanel: CSSProperties = { position: "relative", padding: 28, borderRadius: 28, background: "#f4f5f5", border: "1px solid #e7e9e8", boxSizing: "border-box" };
const visCard: CSSProperties = { borderRadius: 18, background: "#ffffff", border: "1px solid #e3e6e5", boxShadow: "0 24px 50px rgba(16,24,20,0.12)", display: "flex", flexDirection: "column" };

function Callout({ pos, bg, label, value, children }: { pos: CSSProperties; bg: string; label: string; value: string; children: ReactNode }) {
    return (
        <div className="cl-call cl-bob" aria-hidden="true" style={{ ...callout, ...pos }}>
            <span style={{ width: 32, height: 32, borderRadius: 9, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={16} stroke="#ffffff" width={2.2}>
                    {children}
                </Icon>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <span style={{ fontSize: 11, color: "#5b6360" }}>{label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#0c0c10" }}>{value}</span>
            </span>
        </div>
    );
}

/** Progress bar that fills once its track scrolls into view (observe the track, not the zero-width fill). */
function GrowBar({ pct, track, fill }: { pct: number; track: CSSProperties; fill: CSSProperties }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.8 });
    const reduce = useReducedMotion();
    return (
        <span ref={ref} style={track}>
            <motion.span
                style={fill}
                initial={reduce ? false : { width: "0%" }}
                animate={reduce || inView ? { width: `${pct}%` } : { width: "0%" }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
            />
        </span>
    );
}

/* ---------- hero ---------- */

function Hero() {
    const reduce = useReducedMotion();
    const rise = (i: number) => (reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: EASE, delay: 0.05 + i * 0.1 } });
    const pill: CSSProperties = { display: "flex", alignItems: "center", gap: 16, padding: "10px 10px 10px 30px", borderRadius: 999, color: "#ffffff", fontSize: 19, fontWeight: 600 };
    const knob: CSSProperties = { width: 44, height: 44, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" };
    const glass: CSSProperties = { position: "absolute", zIndex: 2, width: 220, borderRadius: 20, background: "rgba(255,255,255,0.9)", border: "1px solid #ffffff", boxShadow: "0 24px 48px rgba(28,72,48,0.16), 0 4px 12px rgba(28,72,48,0.08)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", display: "flex", boxSizing: "border-box" };

    return (
        <section style={{ position: "relative", padding: "104px 24px 96px", overflowX: "clip" }}>
            <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24 }}>
                <motion.h1 {...rise(0)} style={{ margin: 0, fontSize: "clamp(48px, 5.6vw, 80px)", lineHeight: 1.04, fontWeight: 600, letterSpacing: "-0.045em", color: "#0c0c10" }}>
                    <span style={{ whiteSpace: "nowrap" }}>Diamond and Gem Inventory</span>
                    <br />
                    <span style={{ color: "#6b6b75" }}>Software</span>
                </motion.h1>
                <motion.p {...rise(1)} style={{ margin: 0, maxWidth: 720, fontSize: 24, lineHeight: 1.45, letterSpacing: "-0.01em", color: "#6b6b75" }}>
                    Manage diamond and gemstone stock, memos, and orders <span style={{ color: "#111114" }}>in one place.</span>
                </motion.p>
                <motion.div {...rise(2)} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20, marginTop: 12 }}>
                    <a href="/contact?tab=demo" className="cl-btn" style={{ ...pill, background: "linear-gradient(90deg, #245c3e 0%, #317a51 55%, #3f9463 100%)", boxShadow: "0 0 0 5px #ffffff, 0 0 0 6px #cfe8d0, 0 12px 28px rgba(44,111,75,0.3)" }}>
                        <span style={{ color: "#ffffff" }}>Book a Demo</span>
                        <span style={knob}>
                            <Arrow size={18} stroke="#245c3e" width={2.2} />
                        </span>
                    </a>
                    <a href="#features" className="cl-btn" style={{ ...pill, background: "#111827", boxShadow: "0 0 0 5px #ffffff, 0 0 0 6px #e0e0e8, 0 12px 28px rgba(0,0,0,0.2)" }}>
                        <span style={{ color: "#ffffff" }}>Explore Features</span>
                        <span style={knob}>
                            <Arrow size={18} stroke="#111827" width={2.2} />
                        </span>
                    </a>
                </motion.div>
                <motion.ul {...rise(3)} aria-label="Built for" style={{ listStyle: "none", margin: "14px 0 0", padding: 0, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px 28px" }}>
                    {AUDIENCE.map((a) => (
                        <li key={a} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 500, color: "#3a403d" }}>
                            <span style={{ width: 20, height: 20, borderRadius: 999, background: "#e3f1e7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Icon size={11} stroke="#245c3e" width={3}>
                                    <path d="m5 12 5 5L20 7" />
                                </Icon>
                            </span>
                            {a}
                        </li>
                    ))}
                </motion.ul>
            </div>

            {/* product frame */}
            <motion.div
                style={{ position: "relative", maxWidth: 1140, margin: "72px auto 0" }}
                initial={reduce ? false : { opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
            >
                <div style={{ padding: 16, borderRadius: 24, background: "linear-gradient(180deg, #e9ebea, #f3f4f4)", border: "1px solid #e3e6e5", boxShadow: "0 30px 60px rgba(16,24,20,0.14)" }}>
                    <div style={{ background: "#ffffff", borderRadius: 12, overflow: "hidden" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: "1px solid #eef0f4" }}>
                            <span style={{ width: 11, height: 11, borderRadius: 999, background: "#ff5f57" }} />
                            <span style={{ width: 11, height: 11, borderRadius: 999, background: "#febc2e" }} />
                            <span style={{ width: 11, height: 11, borderRadius: 999, background: "#28c840" }} />
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={DIAMOND_SHOT} alt="Carat Logic Diamond Inventory screen listing stones with shape, colour, clarity, lab and status" style={{ display: "block", width: "100%", height: "auto" }} />
                    </div>
                </div>
                <div className="cl-bob" aria-hidden="true" style={{ ...glass, left: -56, top: 120, padding: 16, flexDirection: "column", gap: 10, transform: "rotate(-4deg)" }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#5b6360" }}>Stock by type</span>
                    <span style={{ display: "flex", height: 8, borderRadius: 999, overflow: "hidden" }}>
                        <span style={{ width: "52%", background: "#317a51" }} />
                        <span style={{ width: "30%", background: "#7fc391" }} />
                        <span style={{ width: "18%", background: "#c9d6cf" }} />
                    </span>
                    <span style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#5f6663" }}>
                        <span>Diamonds</span>
                        <span>Gems</span>
                        <span>Parcels</span>
                    </span>
                </div>
                <div className="cl-bob2" aria-hidden="true" style={{ ...glass, right: -48, top: 260, padding: "14px 16px", alignItems: "center", gap: 12, transform: "rotate(4deg)" }}>
                    <span style={{ flex: "none", width: 36, height: 36, borderRadius: 10, background: "#317a51", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 14px rgba(44,111,75,0.35)" }}>
                        <Icon size={18} stroke="#ffffff" width={2.2}>
                            <path d="m22 2-7 20-4-9-9-4z" />
                            <path d="M22 2 11 13" />
                        </Icon>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: "#5b6360" }}>Memo returned</span>
                        <span style={{ fontSize: 17, fontWeight: 700, color: "#0c0c10" }}>Back to stock</span>
                    </span>
                </div>
            </motion.div>
        </section>
    );
}

/* ---------- one inventory: feature cards ---------- */

const CARDS: { span: "cl-top" | "cl-wide"; title: string; desc: string; icon: ReactNode }[] = [
    { span: "cl-top", title: "Find the Right Stone Faster", desc: "Search diamond and gem stock by specifications, certificate, price and availability.", icon: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /><path d="M8.5 9.5h5l1 1.5-3.5 3.5L7.5 11z" /></>) },
    { span: "cl-top", title: "Keep Sales and Memos Moving", desc: "Move from quotation to memo or invoice, then record returns and payments.", icon: (<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6" /><path d="M9 17h4" /></>) },
    { span: "cl-top", title: "Share Stock With Buyers", desc: "Share branded stone links while keeping internal costs and supplier details private.", icon: (<><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></>) },
    { span: "cl-wide", title: "Know What’s in Stock and Outstanding", desc: "Review stock value, memo exposure and outstanding receivables in one view.", icon: (<><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-6" /></>) },
    { span: "cl-wide", title: "Control Team Access", desc: "Set team roles and manage who can view or update inventory details.", icon: (<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><rect x="9" y="10" width="6" height="5" rx="1" /><path d="M10.5 10V8.5a1.5 1.5 0 0 1 3 0V10" /></>) },
];

const dotSm: CSSProperties = { width: 4, height: 4, borderRadius: 999, background: "#d3d8d6" };

function OneInventory() {
    return (
        <section id="features" style={{ padding: "112px 24px 120px", background: "#ffffff" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 48 }}>
                <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                    <Reveal as="span" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111114", border: "2px solid transparent", background: "linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(90deg, #2c6f4b, #7fc88f, #36823a, #317a51) border-box" }}>
                        Carat Logic Inventory
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 style={{ margin: 0, fontSize: "clamp(40px, 4.2vw, 60px)", lineHeight: 1.05, fontWeight: 600, letterSpacing: "-0.045em", color: "#0c0c10" }}>More Control Over Every Stone, Sale and Payment</h2>
                    </Reveal>
                    <Reveal delay={0.1} style={{ maxWidth: 760 }}>
                        <p style={{ margin: 0, fontSize: 19, lineHeight: 1.55, color: "#5f6663" }}>
                            Manage diamond and gemstone inventory, track memos, and follow sales through invoices and payments—all in one workspace.
                        </p>
                    </Reveal>
                </div>
                <Stagger className="cl-feat" stagger={0.08}>
                    {CARDS.map((c) => (
                        <StaggerItem key={c.title} className={c.span} style={{ display: "flex" }}>
                            <article className="cl-card" style={{ flex: 1, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 40, minHeight: 240, padding: 28, borderRadius: 22, background: "#ffffff", border: "1px solid #e6e9e8", boxShadow: "0 1px 2px rgba(16,24,20,0.04), 0 14px 32px rgba(16,24,20,0.06)", boxSizing: "border-box" }}>
                                <span style={{ width: 54, height: 54, borderRadius: 14, background: "#f5f6f6", border: "1px solid #e6e9e8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Icon size={24} stroke="#317a51" width={2}>
                                        {c.icon}
                                    </Icon>
                                </span>
                                <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 520 }}>
                                    <h3 style={{ margin: 0, fontSize: 22, lineHeight: 1.25, fontWeight: 600, letterSpacing: "-0.02em", color: "#0c0c10" }}>{c.title}</h3>
                                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#5f6663" }}>{c.desc}</p>
                                </div>
                                <span aria-hidden="true" style={{ position: "absolute", right: 22, bottom: 22, display: "flex", gap: 6 }}>
                                    <span style={dotSm} />
                                    <span style={dotSm} />
                                    <span style={{ ...dotSm, background: "#317a51" }} />
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

function TextColumn({ block }: { block: Block }) {
    const n = block.bullets.length;
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <Reveal as="span" style={{ alignSelf: "flex-start", padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(49,122,81,0.35)", background: "#eef6f0", fontSize: 13, fontWeight: 600, color: "#245c3e" }}>
                {block.tag}
            </Reveal>
            <Reveal delay={0.05}>
                <h2 style={{ margin: 0, fontSize: "clamp(34px, 3.4vw, 48px)", lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.035em", color: "#0c0c10" }}>{block.title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "#5f6663" }}>{block.intro}</p>
            </Reveal>
            <Stagger style={{ display: "flex", flexDirection: "column", marginTop: 12 }} stagger={0.12}>
                {block.bullets.map((b, i) => (
                    <StaggerItem key={b.title} style={{ display: "flex", gap: 18, padding: i === n - 1 ? "4px 0 6px 22px" : "4px 0 26px 22px", borderLeft: `2px solid ${i === 0 ? "#317a51" : "#dfe7e2"}` }}>
                        <span style={{ flex: "none", width: 44, height: 44, borderRadius: 12, background: i === 0 ? "#e3f1e7" : "#f1f5f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon size={22} stroke="#2c6f4b" width={2}>
                                {b.icon}
                            </Icon>
                        </span>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <h3 style={{ margin: 0, fontSize: 21, fontWeight: 600, color: "#0c0c10" }}>{b.title}</h3>
                            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#5f6663" }}>{b.desc}</p>
                        </div>
                    </StaggerItem>
                ))}
            </Stagger>
            <a href={block.href} className="cl-tl" style={{ alignSelf: "flex-start", marginTop: 8 }}>
                View Details <span aria-hidden="true">→</span>
            </a>
        </div>
    );
}

function ScreenFrame({ src, alt }: { src: string; alt: string }) {
    return (
        <div style={{ borderRadius: 18, padding: 8, background: "#ffffff", border: "1px solid #e3e6e5", boxShadow: "0 24px 50px rgba(16,24,20,0.14)" }}>
            <div style={{ height: 440, borderRadius: 12, overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={alt} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "left top" }} />
            </div>
        </div>
    );
}

function TallyCard() {
    return (
        <div style={{ ...visCard, padding: 22, gap: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 17, fontWeight: 600, color: "#0c0c10" }}>Inventory Tally</span>
                    <span style={{ fontSize: 13, color: "#6b736f" }}>Main warehouse · in progress</span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 999, background: "#eef6f0", color: "#245c3e", fontSize: 12, fontWeight: 600 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#245c3e" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                        <path d="M4 7V5a1 1 0 0 1 1-1h2" />
                        <path d="M17 4h2a1 1 0 0 1 1 1v2" />
                        <path d="M20 17v2a1 1 0 0 1-1 1h-2" />
                        <path d="M7 20H5a1 1 0 0 1-1-1v-2" />
                        <path d="M8 8v8M11 8v8M14 8v8M17 8v8" />
                    </svg>
                    Barcode / RFID
                </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 10 }}>
                {TALLY.map((t) => (
                    <div key={t.label} style={{ padding: 14, borderRadius: 14, background: "#f6f7f7", display: "flex", flexDirection: "column", gap: 4 }}>
                        <span style={{ fontSize: 12, color: "#5f6663" }}>{t.label}</span>
                        <span style={t.numStyle}>{t.value}</span>
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#5f6663" }}>
                    <span>Scan progress</span>
                    <span style={{ fontWeight: 600, color: "#0c0c10" }}>94%</span>
                </span>
                <GrowBar pct={94} track={{ height: 8, borderRadius: 999, background: "#e7ece9", overflow: "hidden", display: "flex" }} fill={{ background: "#317a51", borderRadius: 999 }} />
            </div>
            <div style={{ border: "1px solid #eceeed", borderRadius: 12, overflow: "hidden", fontSize: 13 }}>
                {TALLY_ROWS.map((r) => (
                    <div key={r.id + r.status} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 10, alignItems: "center", padding: "11px 14px", borderTop: "1px solid #f0f2f1" }}>
                        <span style={{ fontWeight: 600, color: "#1d2320" }}>{r.id}</span>
                        <span style={{ color: "#5f6663" }}>{r.loc}</span>
                        <span style={r.style}>{r.status}</span>
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
                {["⇄ Transfer", "Merge parcels", "Split parcel"].map((l) => (
                    <span key={l} style={{ padding: "7px 12px", borderRadius: 10, border: "1px solid #e3e6e5", fontSize: 12, fontWeight: 600, color: "#3a403d" }}>
                        {l}
                    </span>
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
        <div style={{ ...visCard, padding: 22, gap: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ display: "flex", gap: 6 }}>
                        <span style={{ padding: "3px 9px", borderRadius: 999, background: "#111827", color: "#ffffff", fontSize: 11, fontWeight: 600 }}>Memo Out</span>
                        <span style={{ padding: "3px 9px", borderRadius: 999, background: "#f1f3f2", color: "#3a403d", fontSize: 11, fontWeight: 600 }}>Memo In</span>
                    </span>
                    <span style={{ fontSize: 17, fontWeight: 600, color: "#0c0c10", marginTop: 6 }}>MO-2291 · Shah Diamonds</span>
                </span>
                <span style={{ padding: "6px 12px", borderRadius: 999, background: "#fdf0d8", color: "#8a5300", fontSize: 12, fontWeight: 600 }}>Due in 4 days</span>
            </div>
            {/* timeline */}
            <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 0, position: "relative" }}>
                <span aria-hidden="true" style={{ position: "absolute", left: "12%", right: "12%", top: 11, height: 2, background: "#dfe5e1" }}>
                    <motion.span
                        style={{ position: "absolute", left: 0, top: 0, bottom: 0, background: "#317a51" }}
                        initial={reduce ? false : { width: "0%" }}
                        animate={reduce || inView ? { width: "66%" } : { width: "0%" }}
                        transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
                    />
                </span>
                {MEMO_STEPS.map((m) => (
                    <span key={m.label} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" }}>
                        <span style={m.dot} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#1d2320" }}>{m.label}</span>
                    </span>
                ))}
            </div>
            <div style={{ border: "1px solid #eceeed", borderRadius: 12, overflow: "hidden", fontSize: 13 }}>
                {MEMO_ROWS.map((r) => (
                    <div key={r.id} style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr auto", gap: 10, alignItems: "center", padding: "12px 14px", borderTop: "1px solid #f0f2f1" }}>
                        <span style={{ fontWeight: 600, color: "#1d2320" }}>{r.id}</span>
                        <span style={{ color: "#5f6663" }}>{r.desc}</span>
                        <span style={r.style}>{r.status}</span>
                    </div>
                ))}
            </div>
            <span style={{ alignSelf: "flex-end", display: "flex", alignItems: "center", gap: 10, padding: "6px 6px 6px 16px", borderRadius: 999, background: "linear-gradient(90deg, #245c3e, #317a51 55%, #3f9463)", color: "#ffffff", fontSize: 13, fontWeight: 600 }}>
                Move approved to invoice{" "}
                <span style={{ width: 28, height: 28, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Arrow size={13} stroke="#245c3e" width={2.4} />
                </span>
            </span>
        </div>
    );
}

function OrdersCard() {
    const eyebrow: CSSProperties = { fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b736f" };
    return (
        <div style={{ ...visCard, padding: "26px 22px", gap: 22 }}>
            <span style={eyebrow}>Sales flow</span>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {FLOW.map((f) => (
                    <span key={f.label} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                        <span style={f.style}>{f.label}</span>
                        {f.wire && <span className="cl-wire" aria-hidden="true" style={{ width: 34, height: 2, backgroundImage: "repeating-linear-gradient(90deg, #317a51 0 6px, rgba(0,0,0,0) 6px 11px)", backgroundSize: "22px 2px" }} />}
                    </span>
                ))}
            </div>
            <span style={eyebrow}>Documents</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 10 }}>
                {DOCS.map((d) => (
                    <span key={d} style={{ display: "flex", alignItems: "center", gap: 10, padding: 12, borderRadius: 12, border: "1px solid #e6e9e8", fontSize: 13, fontWeight: 600, color: "#1d2320" }}>
                        <span style={{ flex: "none", width: 28, height: 28, borderRadius: 8, background: "#eef6f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon size={14} stroke="#317a51" width={2.2}>
                                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                                <path d="M14 3v5h5" />
                            </Icon>
                        </span>
                        {d}
                    </span>
                ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 10 }}>
                <span style={{ padding: 14, borderRadius: 12, background: "#f6f7f7", display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#0c0c10" }}>Received stones</span>
                    <span style={{ fontSize: 12, lineHeight: 1.45, color: "#5f6663" }}>Purchase order → active inventory</span>
                </span>
                <span style={{ padding: 14, borderRadius: 12, background: "#f6f7f7", display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#0c0c10" }}>Direct expenses</span>
                    <span style={{ fontSize: 12, lineHeight: 1.45, color: "#5f6663" }}>Recorded against stones to keep cost basis</span>
                </span>
            </div>
        </div>
    );
}

function Visual({ k }: { k: BlockKey }) {
    switch (k) {
        case "diamond":
            return (
                <>
                    <ScreenFrame src={DIAMOND_SHOT} alt="Carat Logic Diamond Inventory screen" />
                    <Callout pos={{ left: -28, bottom: 56 }} bg="#317a51" label="Certificate" value="Attached to stone">
                        <circle cx="12" cy="9" r="5" />
                        <path d="m9 13-2 8 5-3 5 3-2-8" />
                    </Callout>
                    <Callout pos={{ right: -24, top: 64 }} bg="#111827" label="CSV import" value="Diamond records added">
                        <path d="M12 15V3" />
                        <path d="m7 8 5-5 5 5" />
                        <path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
                    </Callout>
                </>
            );
        case "gem":
            return (
                <>
                    <ScreenFrame src={GEM_SHOT} alt="Carat Logic Gem Inventory screen" />
                    <Callout pos={{ right: -24, bottom: 60 }} bg="#317a51" label="Matched layout" value="Earring pair">
                        <path d="M12 2 2 7l10 5 10-5z" />
                        <path d="m2 12 10 5 10-5" />
                        <path d="m2 17 10 5 10-5" />
                    </Callout>
                    <Callout pos={{ left: -28, top: 70 }} bg="#111827" label="Report & media" value="Photos · video">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <circle cx="9" cy="10" r="2" />
                        <path d="m21 16-5-5-8 8" />
                    </Callout>
                </>
            );
        case "control":
            return (
                <>
                    <TallyCard />
                    <Callout pos={{ left: -28, bottom: -18 }} bg="#317a51" label="Production complete" value="Moved to inventory">
                        <path d="M3 21V10l6 4V10l6 4V6l6 4v11z" />
                        <path d="M3 21h18" />
                    </Callout>
                </>
            );
        case "memo":
            return (
                <>
                    <MemoCard />
                    <Callout pos={{ right: -24, top: -18 }} bg="#111827" label="Partial return" value="Back to stock">
                        <path d="M9 14 4 9l5-5" />
                        <path d="M4 9h11a5 5 0 0 1 0 10h-3" />
                    </Callout>
                </>
            );
        case "orders":
            return (
                <>
                    <OrdersCard />
                    <Callout pos={{ left: -28, bottom: -18 }} bg="#317a51" label="Payment" value="Recorded on invoice">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <path d="M2 10h20" />
                    </Callout>
                </>
            );
    }
}

function FeatureRows() {
    return (
        <section style={{ padding: "120px 24px", background: "#ffffff" }}>
            <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", flexDirection: "column", gap: 140 }}>
                {BLOCKS.map((b, i) => (
                    <div key={b.key} className={i % 2 === 1 ? "cl-prod rev" : "cl-prod"}>
                        <TextColumn block={b} />
                        <Reveal className="cl-vis" style={visPanel} y={40} delay={0.1}>
                            <Visual k={b.key} />
                        </Reveal>
                    </div>
                ))}
            </div>
        </section>
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
                            <h2 style={{ margin: 0, fontSize: 48, lineHeight: 1.05, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>Frequently Asked Questions</h2>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p style={{ margin: 0, maxWidth: 400, fontSize: 17, lineHeight: 1.6, color: "#5f6663" }}>Answers about Carat Logic Inventory, the stock it manages and how it fits your workflows.</p>
                        </Reveal>
                        <Reveal delay={0.15} style={{ alignSelf: "flex-start", marginTop: 8 }}>
                            <a href="/contact?tab=demo" style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 6px 6px 20px", borderRadius: 999, background: "#111827", color: "#ffffff", fontSize: 15, fontWeight: 600 }}>
                                <span style={{ color: "#ffffff" }}>Book a Demo</span>
                                <span style={{ width: 34, height: 34, borderRadius: 999, background: "#317a51", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Arrow size={14} stroke="#ffffff" width={2.4} />
                                </span>
                            </a>
                        </Reveal>
                    </div>
                    <Stagger style={{ display: "flex", flexDirection: "column", gap: 12 }} stagger={0.06}>
                        {QA.map(([q, a], i) => (
                            <FaqItem key={q} q={q} a={a} id={`${baseId}-inv-faq-${i}`} open={i === open} onToggle={() => setOpen(i === open ? -1 : i)} />
                        ))}
                    </Stagger>
                </div>
            </section>
        </div>
    );
}

export function InventoryDesktop() {
    return (
        <div className="pg-inv">
            <Hero />
            <OneInventory />
            <FeatureRows />
            <Faq />
        </div>
    );
}
