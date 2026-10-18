"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE, itemVariants, Reveal, Stagger } from "./motion";
import "./reviews-mobile.css";

const ACCENT = "#317a51";

/** Placeholder cards — to be filled from Trustpilot. */
const CARDS = [{ initial: "A" }, { initial: "B" }, { initial: "C" }];

const BIG_STARS = [0, 1, 2, 3, 4].map((i) => (i < 4 ? "#317a51" : "#c9d6cf"));

export function ReviewsMobile() {
    const reduce = useReducedMotion();
    const swipeRef = useRef<HTMLDivElement>(null);
    // Index of the card snapped at the left edge; drives the pager dots.
    const [active, setActive] = useState(0);

    const onScroll = () => {
        const el = swipeRef.current;
        if (!el) return;
        const cards = Array.from(el.querySelectorAll("article"));
        if (!cards.length) return;
        const max = el.scrollWidth - el.clientWidth;
        // At the scroll end the last card may never reach the left edge, so treat the end as the last card.
        if (max > 0 && el.scrollLeft >= max - 2) {
            setActive(cards.length - 1);
            return;
        }
        const left = el.getBoundingClientRect().left;
        let best = 0;
        let bestDist = Infinity;
        cards.forEach((c, i) => {
            const d = Math.abs(c.getBoundingClientRect().left - left - 20);
            if (d < bestDist) {
                bestDist = d;
                best = i;
            }
        });
        setActive(best);
    };

    return (
        <section className="v2-reviews-m" style={{ boxSizing: "border-box", color: "#111114", background: "#f6f7f7", padding: "64px 0 64px" }}>
            {/* heading */}
            <Reveal style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#2c6f4b" }}>Reviews on Trustpilot</span>
                <h2 style={{ margin: 0, fontSize: 32, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.035em", color: "#0c0c10" }}>What Our Customers Say About Carat Logic</h2>
            </Reveal>

            {/* rating summary */}
            <Reveal
                delay={0.08}
                style={{ margin: "24px 20px 0", padding: 18, borderRadius: 18, background: "#ffffff", border: "1px solid #e3e9e5", display: "flex", alignItems: "center", gap: 14 }}
            >
                <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", color: "#0c0c10", lineHeight: 1 }}>[X.X]</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ display: "flex", gap: 3 }} role="img" aria-label="Star rating placeholder">
                        {BIG_STARS.map((bg, i) => (
                            <span key={i} style={{ width: 22, height: 22, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", background: bg }}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
                                    <path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                                </svg>
                            </span>
                        ))}
                    </span>
                    <span style={{ fontSize: 13, lineHeight: 1.4, color: "#4f5753" }}>Rated [X.X] out of 5 · [N] reviews on Trustpilot</span>
                </div>
            </Reveal>

            {/* swipeable review cards (filled from Trustpilot) */}
            <div ref={swipeRef} className="cl-swipe" style={{ marginTop: 20 }} onScroll={onScroll}>
                <Stagger className="cl-swipe-inner" stagger={0.1}>
                    {CARDS.map((c) => (
                        <motion.article
                            key={c.initial}
                            variants={itemVariants}
                            style={{
                                flex: "none",
                                width: 300,
                                background: "#ffffff",
                                border: "1px solid #e3e9e5",
                                borderRadius: 20,
                                padding: 22,
                                boxSizing: "border-box",
                                display: "flex",
                                flexDirection: "column",
                                gap: 14,
                                minHeight: 300,
                                boxShadow: "0 10px 24px rgba(16,24,20,0.06)",
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ display: "flex", gap: 3 }} role="img" aria-label="Star rating placeholder">
                                    {[0, 1, 2, 3, 4].map((s) => (
                                        <span key={s} style={{ width: 18, height: 18, borderRadius: 5, background: ACCENT }} />
                                    ))}
                                </span>
                                <span style={{ fontSize: 12, fontWeight: 600, color: "#2c6f4b", display: "flex", alignItems: "center", gap: 4 }}>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2c6f4b" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        <path d="m9 12 2 2 4-4" />
                                    </svg>
                                    Verified
                                </span>
                            </div>
                            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, lineHeight: 1.3, color: "#0c0c10" }}>[Review title from Trustpilot]</h3>
                            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#4f5753", flex: 1 }}>
                                [Review text pulled from Trustpilot — trimmed to about four lines with a &ldquo;Read more&rdquo; link.]
                            </p>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 14, borderTop: "1px solid #edf1ee" }}>
                                <span style={{ width: 36, height: 36, borderRadius: 999, background: "#e3f1e7", color: "#245c3e", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {c.initial}
                                </span>
                                <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    <span style={{ fontSize: 14, fontWeight: 600, color: "#0c0c10" }}>[Reviewer name]</span>
                                    <span style={{ fontSize: 12, color: "#5f6663" }}>[Company · Country] · [Date]</span>
                                </span>
                            </div>
                        </motion.article>
                    ))}
                </Stagger>
            </div>

            {/* swipe hint + dots */}
            <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <span style={{ display: "flex", gap: 6 }} aria-hidden="true">
                    {CARDS.map((c, i) => (
                        <motion.span
                            key={c.initial}
                            initial={false}
                            animate={{ width: i === active ? 22 : 7, backgroundColor: i === active ? "#317a51" : "#c9d6cf" }}
                            transition={reduce ? { duration: 0 } : { duration: 0.35, ease: EASE }}
                            style={{ height: 7, borderRadius: 999 }}
                        />
                    ))}
                </span>
                <span style={{ fontSize: 12, color: "#6b736f" }}>Swipe for more</span>
            </div>

            {/* actions */}
            <Reveal style={{ margin: "28px 20px 0", display: "flex", flexDirection: "column", gap: 10 }}>
                <a
                    href="#"
                    style={{ minHeight: 52, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, borderRadius: 999, background: "#111827", color: "#ffffff", fontSize: 15, fontWeight: 600 }}
                >
                    <span style={{ color: "#ffffff" }}>Read all reviews on Trustpilot</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M7 17 17 7" />
                        <path d="M8 7h9v9" />
                    </svg>
                </a>
                <a
                    href="#"
                    style={{ minHeight: 52, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 999, border: "1px solid #cfdcd4", background: "#ffffff", color: "#111827", fontSize: 15, fontWeight: 600 }}
                >
                    Write a review
                </a>
            </Reveal>
        </section>
    );
}
