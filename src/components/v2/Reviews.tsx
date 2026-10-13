"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE, Reveal, Stagger, StaggerItem } from "./motion";
import "./reviews.css";

const ACCENT = "#317A51";

/** Placeholder cards — to be filled from Trustpilot. */
const CARDS = [{ initial: "A" }, { initial: "B" }, { initial: "C" }];
const PAGES = 3;

function Star() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
            <path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
        </svg>
    );
}

export function Reviews() {
    const reduce = useReducedMotion();
    const [page, setPage] = useState(0);
    // 0 = not yet paged (initial entrance handled by <Stagger>), 1 = next, -1 = previous
    const [dir, setDir] = useState(0);

    const go = (d: 1 | -1) => {
        setDir(d);
        setPage((p) => (p + d + PAGES) % PAGES);
    };

    return (
        <section className="v2-reviews" style={{ color: "#111114", background: "#f6f7f7", padding: "112px 24px 120px", boxSizing: "border-box" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 48 }}>
                {/* heading row */}
                <Reveal style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 680 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#2c6f4b" }}>Reviews on Trustpilot</span>
                        <h2 style={{ margin: 0, fontSize: "clamp(32px, 4vw, 54px)", lineHeight: 1.06, fontWeight: 600, letterSpacing: "-0.035em", color: "#0c0c10" }}>
                            What Our Customers Say About Carat Logic
                        </h2>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                        <button
                            type="button"
                            aria-label="Previous reviews"
                            onClick={() => go(-1)}
                            style={{ width: 48, height: 48, borderRadius: 999, border: "1px solid #d6dfda", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M19 12H5" />
                                <path d="m11 6-6 6 6 6" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            aria-label="Next reviews"
                            onClick={() => go(1)}
                            style={{ width: 48, height: 48, borderRadius: 999, border: "none", background: "#111827", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M5 12h14" />
                                <path d="m13 6 6 6-6 6" />
                            </svg>
                        </button>
                    </div>
                </Reveal>

                {/* rating summary bar */}
                <Reveal
                    delay={0.08}
                    style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20, background: "#ffffff", border: "1px solid #e3e9e5", borderRadius: 18, padding: "20px 24px", boxSizing: "border-box" }}
                >
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 18 }}>
                        <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.03em", color: "#0c0c10", lineHeight: 1 }}>[X.X]</span>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <span style={{ display: "flex", gap: 4 }} role="img" aria-label="Star rating placeholder">
                                {[ACCENT, ACCENT, ACCENT, ACCENT, "#c9d6cf"].map((bg, i) => (
                                    <span key={i} style={{ width: 26, height: 26, borderRadius: 6, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Star />
                                    </span>
                                ))}
                            </span>
                            <span style={{ fontSize: 14, color: "#4f5753" }}>Rated [X.X] out of 5 · based on [N] reviews on Trustpilot</span>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                        <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 999, border: "1px solid #cfdcd4", background: "#ffffff", fontSize: 15, fontWeight: 600, color: "#111827" }}>
                            Write a review
                        </a>
                        <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 20px", borderRadius: 999, background: "#111827", fontSize: 15, fontWeight: 600, color: "#ffffff" }}>
                            <span style={{ color: "#ffffff" }}>Read all reviews on Trustpilot</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M7 17 17 7" />
                                <path d="M8 7h9v9" />
                            </svg>
                        </a>
                    </div>
                </Reveal>

                {/* review cards (filled from Trustpilot) */}
                <Stagger className="cl-rev" stagger={0.1}>
                    {CARDS.map((c, i) => (
                        <StaggerItem key={c.initial} style={{ display: "grid" }}>
                            <motion.article
                                key={page}
                                initial={dir === 0 || reduce ? false : { opacity: 0, x: dir * 28 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
                                style={{
                                    background: "#ffffff",
                                    border: "1px solid #e3e9e5",
                                    borderRadius: 20,
                                    padding: 28,
                                    boxSizing: "border-box",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 18,
                                    minHeight: 320,
                                    boxShadow: "0 10px 30px rgba(28,72,48,0.06)",
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ display: "flex", gap: 3 }} role="img" aria-label="Star rating placeholder">
                                        {[0, 1, 2, 3, 4].map((s) => (
                                            <span key={s} style={{ width: 20, height: 20, borderRadius: 5, background: ACCENT }} />
                                        ))}
                                    </span>
                                    <span style={{ fontSize: 12, fontWeight: 600, color: "#2c6f4b", display: "flex", alignItems: "center", gap: 5 }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2c6f4b" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                            <path d="m9 12 2 2 4-4" />
                                        </svg>
                                        Verified
                                    </span>
                                </div>
                                <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600, lineHeight: 1.3, color: "#0c0c10" }}>[Review title from Trustpilot]</h3>
                                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#4f5753", flex: 1 }}>
                                    [Review text pulled from Trustpilot — shown in full or trimmed to about three lines with a &ldquo;Read more&rdquo; link to the original review.]
                                </p>
                                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 18, borderTop: "1px solid #edf1ee" }}>
                                    <span style={{ width: 40, height: 40, borderRadius: 999, background: "#e3f1e7", color: "#245c3e", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        {c.initial}
                                    </span>
                                    <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                        <span style={{ fontSize: 15, fontWeight: 600, color: "#0c0c10" }}>[Reviewer name]</span>
                                        <span style={{ fontSize: 13, color: "#5f6663" }}>[Company · Country] · [Date]</span>
                                    </span>
                                </div>
                            </motion.article>
                        </StaggerItem>
                    ))}
                </Stagger>

                {/* pager dots */}
                <div style={{ display: "flex", justifyContent: "center", gap: 8 }} aria-hidden="true">
                    {Array.from({ length: PAGES }, (_, i) => (
                        <motion.span
                            key={i}
                            initial={false}
                            animate={{ width: i === page ? 24 : 8, backgroundColor: i === page ? ACCENT : "#c9d6cf" }}
                            transition={reduce ? { duration: 0 } : { duration: 0.35, ease: EASE }}
                            style={{ height: 8, borderRadius: 999 }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
