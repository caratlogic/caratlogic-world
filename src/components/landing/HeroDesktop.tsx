"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { EASE } from "./motion";
import "./hero.css";

const ACCENT = "#317A51";

/*
 * Above-the-fold fit: the client wants the title on exactly two lines and the top of the dashboard
 * screenshot peeking into the first screen. The first line is ~18.5em wide, so the title scales with
 * the available width (viewport minus the section's 12px margins and 24px padding), capped at 68px.
 * The space above the title and above the screenshot shrinks on shorter screens (design values at ≥900px tall).
 */
const TITLE_SIZE = "min(68px, calc((100vw - 72px) / 18.8))";
const HERO_TOP_SPACE = "clamp(16px, calc(100vh - 804px), 96px)";
const FRAME_GAP = "clamp(24px, calc(100vh - 828px), 72px)";

const chipBase: CSSProperties = {
    position: "absolute",
    zIndex: 3,
    boxSizing: "border-box",
    borderRadius: 20,
    background: "rgba(255,255,255,0.82)",
    border: "1px solid rgba(255,255,255,0.95)",
    boxShadow:
        "0 1px 0 rgba(255,255,255,0.9) inset, 0 24px 48px rgba(28,72,48,0.16), 0 4px 12px rgba(28,72,48,0.08)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
};

function ArrowRight({ size, stroke }: { size: number; stroke: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
        </svg>
    );
}

/** Scales the product frame from 0.84 → 1 as it scrolls into view (matches design). */
function useFrameScale() {
    const ref = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    // 0 when the frame's top hits 85% of the viewport, 1 when it reaches 20%.
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.2"] });
    const eased = useTransform(scrollYProgress, (p) => 1 - Math.pow(1 - p, 2));
    const scale = useTransform(eased, [0, 1], [0.84, 1]);
    return { ref, scale: reduce ? 1 : scale };
}

export function HeroDesktop() {
    const { ref: frameRef, scale } = useFrameScale();
    const reduce = useReducedMotion();
    // Load-in: copy rises in sequence; chips fade/unblur only (their transform holds the tilt + bob).
    const rise = (i: number) =>
        reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: EASE, delay: 0.1 + i * 0.1 } };
    const fade = (i: number) =>
        reduce ? {} : { initial: { opacity: 0, filter: "blur(8px)" }, animate: { opacity: 1, filter: "blur(0px)" }, transition: { duration: 0.9, ease: EASE, delay: 0.6 + i * 0.12 } };

    return (
        <div className="cl-root">
            {/* HERO */}
            <section style={{ position: "relative", margin: "0 12px", overflowX: "clip", padding: `${HERO_TOP_SPACE} 24px 96px`, boxSizing: "border-box" }}>
                {/* hero background panel: ends partway down the product image */}
                <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 380, borderRadius: "28px 28px 0 0", background: "#ffffff" }} />

                {/* floating product chips */}
                {/* chips are placed within the design's 1440px artboard (1416 = 1440 - section margins), so they stay near the content on wide screens */}
                <div aria-hidden="true" style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: "100%", maxWidth: 1416, transform: "translateX(-50%)", pointerEvents: "none", zIndex: 3 }}>
                    <motion.div {...fade(0)} className="cl-float cl-bob" aria-hidden="true" style={{ ...chipBase, left: "3%", top: 360, width: 220, padding: 16, flexDirection: "column", gap: 12, transform: "rotate(-4deg)" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <span style={{ fontSize: 13, fontWeight: 500, color: "#5b6360" }}>Total owned at cost</span>
                            <span style={{ width: 28, height: 28, borderRadius: 8, background: "#e3f1e7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 3h12l4 6-10 12L2 9z" />
                                    <path d="M2 9h20" />
                                </svg>
                            </span>
                        </div>
                        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "#0c0c10", lineHeight: 1 }}>$2.1M</div>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 40 }}>
                            {[
                                ["35%", "#d3eadb"],
                                ["50%", "#bfe0c9"],
                                ["42%", "#a7d7b2"],
                                ["66%", "#7fc391"],
                                ["58%", "#5fae7a"],
                                ["82%", "#3f9463"],
                                ["100%", ACCENT],
                            ].map(([h, c]) => (
                                <span key={c} style={{ flex: 1, height: h, borderRadius: 4, background: c }} />
                            ))}
                        </div>
                        <div style={{ fontSize: 12, color: "#6b736f" }}>309 stock · 5,669.08 ct</div>
                    </motion.div>

                    <motion.div {...fade(1)} className="cl-float cl-bob2" aria-hidden="true" style={{ ...chipBase, right: "3%", top: 340, width: 230, padding: "14px 16px", flexDirection: "column", gap: 10, transform: "rotate(4deg)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ width: 36, height: 36, borderRadius: 10, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 14px rgba(44,111,75,0.35)" }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m22 2-7 20-4-9-9-4z" />
                                    <path d="M22 2 11 13" />
                                </svg>
                            </span>
                            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <span style={{ fontSize: 13, fontWeight: 500, color: "#5b6360" }}>Out on memo</span>
                                <span style={{ fontSize: 20, fontWeight: 700, color: "#0c0c10", letterSpacing: "-0.02em" }}>$1.2M</span>
                            </div>
                        </div>
                        <div style={{ height: 6, borderRadius: 999, background: "#e7efe9", overflow: "hidden", display: "flex" }}>
                            <span style={{ width: "64%", background: ACCENT, borderRadius: 999 }} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b736f" }}>
                            <span>64 memos</span>
                            <span>1,489.70 ct</span>
                        </div>
                    </motion.div>

                    <motion.div {...fade(2)} className="cl-float cl-bob2" aria-hidden="true" style={{ ...chipBase, left: "2.5%", top: 720, width: 116, height: 116, borderRadius: 28, alignItems: "center", justifyContent: "center", transform: "rotate(-10deg)" }}>
                        <svg width="72" height="66" viewBox="0 0 72 66">
                            <polygon points="16,2 56,2 70,22 2,22" fill="#7fc391" />
                            <polygon points="16,2 26,22 2,22" fill="#a7d7b2" />
                            <polygon points="56,2 70,22 46,22" fill="#5fae7a" />
                            <polygon points="26,22 36,2 46,22" fill="#bfe0c9" />
                            <polygon points="2,22 26,22 36,64" fill="#3f9463" />
                            <polygon points="26,22 46,22 36,64" fill={ACCENT} />
                            <polygon points="46,22 70,22 36,64" fill="#245c3e" />
                        </svg>
                    </motion.div>

                    <motion.div {...fade(3)} className="cl-float cl-bob" aria-hidden="true" style={{ ...chipBase, right: "2%", top: 760, width: 214, padding: "14px 16px", alignItems: "center", gap: 12, transform: "rotate(3deg)" }}>
                        <span style={{ width: 40, height: 40, borderRadius: 999, background: "#e3f1e7", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m5 12 5 5L20 7" />
                            </svg>
                        </span>
                        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: "#0c0c10" }}>Invoice paid</span>
                            <span style={{ fontSize: 12, color: "#6b736f" }}>Receivables updated</span>
                        </div>
                    </motion.div>
                </div>

                {/* copy */}
                <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24 }}>
                    <motion.a {...rise(0)} href="/inventory" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 999, fontSize: 15, fontWeight: 600, color: "#111114", border: "2px solid transparent", background: "linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(90deg, #2c6f4b, #7fc88f, #36823a, #317a51) border-box" }}>
                        Cloud-based diamond &amp; gem inventory software
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111114" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="m9 6 6 6-6 6" />
                        </svg>
                    </motion.a>
                    <motion.h1 {...rise(1)} style={{ margin: "8px 0 0", fontSize: TITLE_SIZE, lineHeight: 1.04, fontWeight: 600, letterSpacing: "-0.035em", color: "#0c0c10" }}>
                        <span style={{ display: "block", whiteSpace: "nowrap" }}>Diamond and Gem Inventory, Sales &amp; KYC.</span>{" "}
                        <span style={{ display: "block", whiteSpace: "nowrap", color: "#6b6b75" }}>All in One Place.</span>
                    </motion.h1>
                    <motion.p {...rise(2)} style={{ margin: 0, maxWidth: 860, fontSize: "clamp(18px, 1.9vw, 28px)", lineHeight: 1.45, color: "#6b6b75", letterSpacing: "-0.01em" }}>
                        Track every stone, manage memos and orders, monitor payments, and onboard customers and suppliers with{" "}
                        <span style={{ color: "#111114" }}>customizable KYC workflows.</span>
                    </motion.p>
                    <motion.div {...rise(3)} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20, marginTop: 16 }}>
                        <a href="/contact" style={{ display: "flex", alignItems: "center", gap: 16, background: "#111827", padding: "10px 10px 10px 32px", borderRadius: 999, fontSize: 20, fontWeight: 600, color: "#ffffff", boxShadow: "0 0 0 5px #ffffff, 0 0 0 6px #e0e0e8, 0 12px 28px rgba(0,0,0,0.2)" }}>
                            <span style={{ color: "#ffffff" }}>Get started free</span>
                            <span style={{ width: 44, height: 44, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <ArrowRight size={18} stroke="#111827" />
                            </span>
                        </a>
                        <a href="/contact?tab=demo" style={{ display: "flex", alignItems: "center", gap: 16, background: `linear-gradient(90deg, #245c3e 0%, ${ACCENT} 55%, #3f9463 100%)`, padding: "10px 10px 10px 32px", borderRadius: 999, fontSize: 20, fontWeight: 600, color: "#ffffff", boxShadow: "0 0 0 5px #ffffff, 0 0 0 6px #cfe8d0, 0 12px 28px rgba(44,111,75,0.3)" }}>
                            <span style={{ color: "#ffffff" }}>Book a demo</span>
                            <span style={{ width: 44, height: 44, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <ArrowRight size={18} stroke="#245c3e" />
                            </span>
                        </a>
                    </motion.div>
                </div>

                {/* product screenshot frame */}
                <motion.div ref={frameRef} style={{ position: "relative", zIndex: 2, maxWidth: 1180, margin: `${FRAME_GAP} auto 0`, scale, transformOrigin: "50% 0", willChange: "transform" }}>
                    <motion.div {...(reduce ? {} : { initial: { opacity: 0, y: 48 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, ease: EASE, delay: 0.45 } })} style={{ padding: 16, borderRadius: 24, background: "linear-gradient(180deg, #e9ebea, #f3f4f4)", border: "1px solid #e3e6e5", boxShadow: "0 30px 60px rgba(16,24,20,0.14)", boxSizing: "border-box" }}>
                        <div style={{ background: "#ffffff", borderRadius: 12, overflow: "hidden" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: "1px solid #eef0f4" }}>
                                <span style={{ width: 11, height: 11, borderRadius: 999, background: "#ff5f57" }} />
                                <span style={{ width: 11, height: 11, borderRadius: 999, background: "#febc2e" }} />
                                <span style={{ width: 11, height: 11, borderRadius: 999, background: "#28c840" }} />
                            </div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/design/dashboard.png" alt="Carat Logic Business Overview dashboard showing stock value, memo exposure, receivables and capital position" style={{ display: "block", width: "100%", height: "auto" }} />
                        </div>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
}
