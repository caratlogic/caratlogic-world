"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE, Reveal } from "@/components/landing/motion";
import { GUIDES } from "./guides";
import "./product-guides-mobile.css";

function Arrow({ stroke }: { stroke: string }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
        </svg>
    );
}

export function ProductGuidesMobile() {
    const reduce = useReducedMotion();

    return (
        <div className="pg-guides-m" style={{ position: "relative", overflowX: "clip", boxSizing: "border-box", color: "#111114", background: "#ffffff" }}>
            {/* page header */}
            <section style={{ padding: "48px 20px 0", textAlign: "center" }}>
                <motion.h1
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    style={{ margin: 0, fontSize: 40, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}
                >
                    Product Guides
                </motion.h1>
                <div style={{ height: 110 }} />
            </section>

            {/* action bar: sits over the bottom of the hero on first load, then stays pinned to the bottom of the screen while scrolling */}
            <motion.div
                initial={reduce ? false : { y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
                style={{ position: "sticky", top: "calc(100vh - 86px)", margin: "-86px 12px 18px", zIndex: 10, padding: 8, borderRadius: 999, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", border: "1px solid #e3e6e5", boxShadow: "0 18px 40px rgba(16,24,20,0.16), 0 2px 6px rgba(16,24,20,0.06)", display: "flex", gap: 8, boxSizing: "border-box" }}
            >
                <a href="/contact" className="cl-btn" style={{ flex: 1, minHeight: 52, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "5px 5px 5px 18px", borderRadius: 999, background: "#111827", color: "#ffffff", fontSize: 15, fontWeight: 600, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)" }}>
                    <span style={{ color: "#ffffff", whiteSpace: "nowrap" }}>Get started</span>
                    <span style={{ flex: "none", width: 40, height: 40, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Arrow stroke="#111827" />
                    </span>
                </a>
                <a href="/contact?tab=demo" className="cl-btn" style={{ flex: 1, minHeight: 52, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "5px 5px 5px 18px", borderRadius: 999, background: "linear-gradient(90deg, #245c3e 0%, #317a51 55%, #3f9463 100%)", color: "#ffffff", fontSize: 15, fontWeight: 600, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 18px rgba(44,111,75,0.3)" }}>
                    <span style={{ color: "#ffffff", whiteSpace: "nowrap" }}>Book a demo</span>
                    <span style={{ flex: "none", width: 40, height: 40, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Arrow stroke="#245c3e" />
                    </span>
                </a>
            </motion.div>

            {/* posts */}
            <section style={{ padding: "8px 16px 64px", display: "flex", flexDirection: "column", gap: 36 }}>
                {GUIDES.map((p) => (
                    <Reveal key={p.t} y={20}>
                        <a href="#" className="cl-post" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            <span style={{ display: "block", aspectRatio: "16 / 10", borderRadius: 18, overflow: "hidden", background: "#f4f5f5", border: "1px solid #eceeed" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={p.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "left top", display: "block" }} />
                            </span>
                            <span style={{ display: "flex", flexDirection: "column", gap: 8, padding: "0 2px" }}>
                                <span style={{ fontSize: 13, color: "#6b736f" }}>
                                    {p.d} · {p.r}
                                </span>
                                <span style={{ fontSize: 19, lineHeight: 1.3, fontWeight: 600, letterSpacing: "-0.02em", color: "#0c0c10" }}>{p.t}</span>
                                <span style={{ fontSize: 15, lineHeight: 1.6, color: "#5f6663" }}>{p.e}</span>
                            </span>
                        </a>
                    </Reveal>
                ))}
            </section>
        </div>
    );
}
