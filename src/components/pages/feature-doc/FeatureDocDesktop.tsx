"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type CSSProperties } from "react";
import { EASE, Reveal, Stagger, itemVariants } from "@/components/landing/motion";
import { DocBlocks } from "./DocBlocks";
import type { FeatureDocContent } from "./types";
import "./feature-doc.css";

/** Fixed site header height + the design's 24px sticky offset. */
const STICKY_TOP = 112;

const secStyle = (first: boolean): CSSProperties =>
    first
        ? { display: "flex", flexDirection: "column", gap: 18, paddingTop: 0 }
        : { display: "flex", flexDirection: "column", gap: 18, paddingTop: 56, borderTop: "1px solid #eceeed", marginTop: 56 };

const Arrow = ({ stroke, size, width }: { stroke: string; size: number; width: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
    </svg>
);

/** Highlights the section currently under the sticky offset. */
function useScrollSpy(idsKey: string) {
    const [active, setActive] = useState(idsKey.split("|")[0]);
    useEffect(() => {
        const ids = idsKey.split("|");
        let raf = 0;
        const update = () => {
            raf = 0;
            let cur = ids[0];
            for (const id of ids) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top - STICKY_TOP - 40 <= 0) cur = id;
            }
            setActive(cur);
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };
        raf = requestAnimationFrame(update);
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [idsKey]);
    return [active, setActive] as const;
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

export function FeatureDocDesktop({ content }: { content: FeatureDocContent }) {
    const { key, title, intro, sections, example, faq, cta } = content;
    const reduce = useReducedMotion();
    const [open, setOpen] = useState(0);

    const toc: [string, string][] = [...sections.map((s) => [s.id, s.toc] as [string, string]), ...(example ? [["example", example.toc] as [string, string]] : []), ["faqs", "FAQs"]];
    const [active, setActive] = useScrollSpy(toc.map(([id]) => id).join("|"));

    return (
        <div className="pg-fdoc" style={{ color: "#111114", background: "#ffffff" }}>
            {/* ============ PAGE HEADER ============ */}
            <section style={{ padding: "96px 24px 96px" }}>
                <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
                        <Reveal as="div">
                            <h1 style={{ margin: 0, fontSize: 56, lineHeight: 1.06, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>{title}</h1>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <p style={{ margin: 0, fontSize: 19, lineHeight: 1.6, color: "#5f6663" }}>{intro}</p>
                        </Reveal>
                        <Reveal delay={0.16} style={{ alignSelf: "center", marginTop: 8 }}>
                            <motion.a
                                href="/contact?tab=demo"
                                className="cl-btn"
                                whileHover={reduce ? undefined : "hover"}
                                style={{ display: "flex", alignItems: "center", gap: 14, padding: "8px 8px 8px 26px", borderRadius: 999, background: "linear-gradient(90deg, #245c3e 0%, #317a51 55%, #3f9463 100%)", color: "#ffffff", fontSize: 17, fontWeight: 600, boxShadow: "0 0 0 5px #ffffff, 0 0 0 6px #cfe8d0, 0 12px 28px rgba(44,111,75,0.3)" }}
                            >
                                <span style={{ color: "#ffffff" }}>Book a demo</span>
                                <motion.span variants={{ hover: { x: 3 } }} style={{ width: 40, height: 40, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Arrow stroke="#245c3e" size={17} width={2.2} />
                                </motion.span>
                            </motion.a>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ MAIN CONTENT ============ */}
            <div style={{ padding: "0 24px 104px" }}>
                <div className="cl-dbody" style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <aside className="cl-tocwrap" style={{ position: "sticky", top: STICKY_TOP }}>
                        <Reveal y={12}>
                            <span style={{ display: "block", padding: "0 16px 12px", fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b736f" }}>On this page</span>
                            <nav className="cl-toc" aria-label="On this page" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                {toc.map(([id, label]) => {
                                    const on = id === active;
                                    return (
                                        <a key={id} href={`#${id}`} className={on ? "on" : undefined} aria-current={on ? "location" : undefined} onClick={() => setActive(id)}>
                                            {on && (
                                                <motion.span
                                                    layoutId={`pg-fdoc-${key}-toc`}
                                                    aria-hidden="true"
                                                    className="cl-tocpill"
                                                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                                                />
                                            )}
                                            <span style={{ position: "relative" }}>{label}</span>
                                        </a>
                                    );
                                })}
                            </nav>
                        </Reveal>
                    </aside>
                    <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
                        {sections.map((s, i) => (
                            <section key={s.id} id={s.id} className="cl-sec" style={secStyle(i === 0)}>
                                <Reveal style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                                    <h2>{s.title}</h2>
                                    {s.paragraphs.map((p) => (
                                        <p key={p}>{p}</p>
                                    ))}
                                    {s.blocks && <DocBlocks blocks={s.blocks} />}
                                    {s.callout && (
                                        <div style={{ display: "flex", gap: 14, padding: "18px 20px", borderRadius: 16, background: "#f6f7f7", border: "1px solid #eceeed" }}>
                                            <span style={{ flex: "none", width: 4, borderRadius: 999, background: "#317a51" }} />
                                            <p style={{ fontSize: 16, color: "#2b302e" }}>{s.callout}</p>
                                        </div>
                                    )}
                                </Reveal>
                            </section>
                        ))}
                        {example && (
                            <section id="example" style={{ marginTop: 56 }}>
                                <Reveal className="cl-sec" style={{ display: "flex", flexDirection: "column", gap: 16, padding: 32, borderRadius: 22, background: "#111827", color: "#ffffff" }}>
                                    <span style={{ alignSelf: "flex-start", padding: "5px 12px", borderRadius: 999, background: "rgba(143,224,165,0.16)", color: "#8fe0a5", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Example</span>
                                    <h2 style={{ color: "#ffffff", fontSize: 28 }}>{example.title}</h2>
                                    <p style={{ color: "rgba(255,255,255,0.8)" }}>{example.text}</p>
                                </Reveal>
                            </section>
                        )}
                        <section id="faqs" className="cl-sec" style={{ marginTop: 56, paddingTop: 56, borderTop: "1px solid #eceeed", display: "flex", flexDirection: "column", gap: 22 }}>
                            <Reveal>
                                <h2>Frequently asked questions</h2>
                            </Reveal>
                            <Stagger style={{ display: "flex", flexDirection: "column", gap: 12 }} stagger={0.06}>
                                {faq.map(([q, a], i) => (
                                    <FaqItem key={q} q={q} a={a} id={`pg-fdoc-${key}-faq-${i}`} open={i === open} onToggle={() => setOpen(i === open ? -1 : i)} />
                                ))}
                            </Stagger>
                        </section>
                        {cta && (
                            <Reveal as="section" className="cl-sec" style={{ marginTop: 56, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28, padding: 32, borderRadius: 22, background: "#111827" }}>
                                <h2 style={{ color: "#ffffff", fontSize: 26, maxWidth: 460 }}>{cta.title}</h2>
                                <motion.a
                                    href="/contact?tab=demo"
                                    className="cl-btn"
                                    whileHover={reduce ? undefined : "hover"}
                                    style={{ flex: "none", display: "flex", alignItems: "center", gap: 14, padding: "7px 7px 7px 24px", borderRadius: 999, background: "#ffffff", color: "#111827", fontSize: 16, fontWeight: 600 }}
                                >
                                    <span style={{ color: "#111827" }}>Book a demo</span>
                                    <motion.span variants={{ hover: { x: 3 } }} style={{ width: 38, height: 38, borderRadius: 999, background: "#317a51", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Arrow stroke="#ffffff" size={16} width={2.4} />
                                    </motion.span>
                                </motion.a>
                            </Reveal>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
