"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type CSSProperties } from "react";
import { EASE, Reveal, Stagger, itemVariants } from "@/components/landing/motion";
import { DocBlocks } from "./DocBlocks";
import type { FeatureDocContent } from "./types";
import "./feature-doc-mobile.css";

const secStyle = (first: boolean): CSSProperties =>
    first
        ? { display: "flex", flexDirection: "column", gap: 16, padding: "40px 0 0" }
        : { display: "flex", flexDirection: "column", gap: 16, padding: "40px 0 0", marginTop: 40, borderTop: "1px solid #eceeed" };

const Arrow = ({ stroke }: { stroke: string }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
    </svg>
);

const barBtn: CSSProperties = { flex: 1, minHeight: 52, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "5px 5px 5px 18px", borderRadius: 999, color: "#ffffff", fontSize: 15, fontWeight: 600 };
const barIcon: CSSProperties = { flex: "none", width: 40, height: 40, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" };

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
                boxShadow: open ? "0 14px 30px rgba(16,24,20,0.07)" : undefined,
                transition: "border-color .2s ease, box-shadow .2s ease",
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

export function FeatureDocMobile({ content }: { content: FeatureDocContent }) {
    const { key, title, intro, sections, example, faq, cta } = content;
    const reduce = useReducedMotion();
    const [open, setOpen] = useState(0);

    return (
        <div className="pg-fdoc-m" style={{ position: "relative", overflowX: "clip", boxSizing: "border-box", color: "#111114", background: "#ffffff" }}>
            {/* page header */}
            <section style={{ padding: "48px 20px 0", textAlign: "center" }}>
                <Reveal>
                    <h1 style={{ margin: 0, fontSize: 34, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>{title}</h1>
                </Reveal>
                <Reveal delay={0.08}>
                    <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.6, color: "#5f6663" }}>{intro}</p>
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
                <a href="/contact" className="cl-bar" style={{ ...barBtn, background: "#111827", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)" }}>
                    <span style={{ color: "#ffffff", whiteSpace: "nowrap" }}>Get started</span>
                    <span style={barIcon}>
                        <Arrow stroke="#111827" />
                    </span>
                </a>
                <a href="/contact?tab=demo" className="cl-bar" style={{ ...barBtn, background: "linear-gradient(90deg, #245c3e 0%, #317a51 55%, #3f9463 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 18px rgba(44,111,75,0.3)" }}>
                    <span style={{ color: "#ffffff", whiteSpace: "nowrap" }}>Book a demo</span>
                    <span style={barIcon}>
                        <Arrow stroke="#245c3e" />
                    </span>
                </a>
            </motion.div>

            {/* content */}
            <div style={{ padding: "8px 20px 64px" }}>
                {sections.map((s, i) => (
                    <section key={s.id} id={`m-${s.id}`} className="cl-m" style={secStyle(i === 0)}>
                        <Reveal style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <h2>{s.title}</h2>
                            {s.paragraphs.map((p) => (
                                <p key={p}>{p}</p>
                            ))}
                            {s.blocks && <DocBlocks blocks={s.blocks} />}
                            {s.callout && (
                                <div style={{ display: "flex", gap: 14, padding: "14px 16px", borderRadius: 14, background: "#f6f7f7", border: "1px solid #eceeed" }}>
                                    <span style={{ flex: "none", width: 4, borderRadius: 999, background: "#317a51" }} />
                                    <p style={{ fontSize: 15, color: "#2b302e" }}>{s.callout}</p>
                                </div>
                            )}
                        </Reveal>
                    </section>
                ))}
                {example && (
                    <section id="m-example" style={{ marginTop: 40 }}>
                        <Reveal className="cl-m" style={{ display: "flex", flexDirection: "column", gap: 14, padding: "24px 20px", borderRadius: 20, background: "#111827" }}>
                            <span style={{ alignSelf: "flex-start", padding: "4px 10px", borderRadius: 999, background: "rgba(143,224,165,0.16)", color: "#8fe0a5", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Example</span>
                            <h2 style={{ color: "#ffffff", fontSize: 23 }}>{example.title}</h2>
                            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15 }}>{example.text}</p>
                        </Reveal>
                    </section>
                )}
                <section id="m-faqs" className="cl-m" style={{ marginTop: 40, paddingTop: 40, borderTop: "1px solid #eceeed", display: "flex", flexDirection: "column", gap: 18 }}>
                    <Reveal>
                        <h2>Frequently asked questions</h2>
                    </Reveal>
                    <Stagger style={{ display: "flex", flexDirection: "column", gap: 10 }} stagger={0.06}>
                        {faq.map(([q, a], i) => (
                            <FaqItem key={q} q={q} a={a} id={`m-pg-fdoc-${key}-faq-${i}`} open={i === open} onToggle={() => setOpen(i === open ? -1 : i)} />
                        ))}
                    </Stagger>
                </section>
                {cta && (
                    <Reveal as="section" className="cl-m" style={{ marginTop: 40, padding: "24px 20px", borderRadius: 20, background: "#111827" }}>
                        <h2 style={{ color: "#ffffff", fontSize: 23 }}>{cta.title}</h2>
                    </Reveal>
                )}
            </div>
        </div>
    );
}
