"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "./motion";
import "./hero-mobile.css";

const PHONE_SHOT = "/design/dd0c33c162c5ffcd836fd0c11b18e95c.png";

function Arrow({ stroke }: { stroke: string }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
        </svg>
    );
}

/** The two pill CTAs used by the sticky action bar and the mobile menu footer. */
export function MobileCtas({ elevated = true }: { elevated?: boolean }) {
    const base = { flex: 1, minHeight: 52, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "5px 5px 5px 18px", borderRadius: 999, color: "#ffffff", fontSize: 15, fontWeight: 600 } as const;
    const knob = { flex: "none", width: 40, height: 40, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" } as const;
    return (
        <>
            <a href="/contact" style={{ ...base, background: "#111827", ...(elevated ? { boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)" } : {}) }}>
                <span style={{ color: "#ffffff", whiteSpace: "nowrap" }}>Get started</span>
                <span style={knob}>
                    <Arrow stroke="#111827" />
                </span>
            </a>
            <a href="/contact?tab=demo" style={{ ...base, background: "linear-gradient(90deg, #245c3e 0%, #317a51 55%, #3f9463 100%)", ...(elevated ? { boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 18px rgba(44,111,75,0.3)" } : {}) }}>
                <span style={{ color: "#ffffff", whiteSpace: "nowrap" }}>Book a demo</span>
                <span style={knob}>
                    <Arrow stroke="#245c3e" />
                </span>
            </a>
        </>
    );
}

/** Sticky bottom action bar from the mobile hero design; stays pinned while scrolling on phones. */
export function MobileActionBar() {
    const reduce = useReducedMotion();
    return (
        <motion.div
            className="lp-actionbar"
            initial={reduce ? false : { y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
            style={{ position: "fixed", left: 12, right: 12, bottom: 18, zIndex: 40, padding: 8, borderRadius: 999, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", border: "1px solid #e3e6e5", boxShadow: "0 18px 40px rgba(16,24,20,0.16), 0 2px 6px rgba(16,24,20,0.06)", display: "flex", gap: 8, boxSizing: "border-box" }}
        >
            <MobileCtas />
        </motion.div>
    );
}

export function HeroMobile() {
    const reduce = useReducedMotion();
    const rise = (i: number) =>
        reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: EASE, delay: 0.1 + i * 0.1 } };
    const fade = (i: number) =>
        reduce ? {} : { initial: { opacity: 0, filter: "blur(6px)" }, animate: { opacity: 1, filter: "blur(0px)" }, transition: { duration: 0.8, ease: EASE, delay: 0.7 + i * 0.15 } };

    return (
        <div className="lp-hero-m">
            <section style={{ position: "relative", margin: "0 8px", padding: "44px 16px 0", boxSizing: "border-box" }}>
                <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 760, borderRadius: "24px 24px 0 0", background: "#ffffff" }} />

                <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 18 }}>
                    <motion.a {...rise(0)} href="/inventory" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600, color: "#111114", border: "1.5px solid transparent", background: "linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(90deg, #2c6f4b, #7fc88f, #36823a, #317a51) border-box" }}>
                        Cloud-based diamond &amp; gem inventory software
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111114" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="m9 6 6 6-6 6" />
                        </svg>
                    </motion.a>
                    <motion.h1 {...rise(1)} style={{ margin: "4px 0 0", fontSize: 40, lineHeight: 1.06, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>
                        Diamond and Gem Inventory, Sales &amp; KYC. <span style={{ color: "#6b6b75" }}>All in One Place.</span>
                    </motion.h1>
                    <motion.p {...rise(2)} style={{ margin: 0, fontSize: 17, lineHeight: 1.5, color: "#6b6b75" }}>
                        Track every stone, manage memos and orders, monitor payments, and onboard customers and suppliers with <span style={{ color: "#111114" }}>customizable KYC workflows.</span>
                    </motion.p>
                </div>

                {/* phone mockup with mobile dashboard */}
                <div style={{ position: "relative", margin: "48px auto 0", width: 272 }}>
                    <motion.div
                        {...(reduce ? {} : { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, ease: EASE, delay: 0.4 } })}
                        style={{ height: 520, padding: "10px 10px 0", borderRadius: "46px 46px 0 0", background: "linear-gradient(160deg, #2a2e2c 0%, #0c0f0e 100%)", boxShadow: "inset 0 0 0 2px #3a3f3c, 0 30px 60px rgba(16,24,20,0.22)", boxSizing: "border-box" }}
                    >
                        <div style={{ position: "relative", height: "100%", borderRadius: "36px 36px 0 0", overflow: "hidden", background: "#ffffff" }}>
                            <div style={{ position: "relative", height: 38, display: "flex", alignItems: "center", justifyContent: "center", background: "#ffffff" }}>
                                <span aria-hidden="true" style={{ width: 84, height: 22, borderRadius: 999, background: "#0c0f0e" }} />
                            </div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={PHONE_SHOT} alt="Carat Logic Business Overview on mobile, showing net worth, capital position and partner exposure" style={{ display: "block", width: "calc(100% + 4px)", marginLeft: -2, height: "auto" }} />
                        </div>
                    </motion.div>

                    {/* floating chips */}
                    <motion.div {...fade(0)} className="cl-bob" aria-hidden="true" style={{ position: "absolute", left: -48, top: 96, width: 150, padding: "10px 12px", borderRadius: 16, background: "rgba(255,255,255,0.94)", border: "1px solid #e6e9e8", boxShadow: "0 18px 36px rgba(16,24,20,0.16)", display: "flex", flexDirection: "column", gap: 6, transform: "rotate(-4deg)", boxSizing: "border-box" }}>
                        <span style={{ fontSize: 11, fontWeight: 500, color: "#5b6360" }}>Total owned at cost</span>
                        <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: "#0c0c10", lineHeight: 1 }}>$2.1M</span>
                        <span style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 22 }}>
                            {[
                                ["40%", "#d3eadb"],
                                ["55%", "#a7d7b2"],
                                ["48%", "#7fc391"],
                                ["75%", "#5fae7a"],
                                ["100%", "#317a51"],
                            ].map(([h, c]) => (
                                <span key={c} style={{ flex: 1, height: h, borderRadius: 3, background: c }} />
                            ))}
                        </span>
                    </motion.div>
                    <motion.div {...fade(1)} className="cl-bob2" aria-hidden="true" style={{ position: "absolute", right: -44, top: 250, width: 156, padding: "10px 12px", borderRadius: 16, background: "rgba(255,255,255,0.94)", border: "1px solid #e6e9e8", boxShadow: "0 18px 36px rgba(16,24,20,0.16)", display: "flex", alignItems: "center", gap: 10, transform: "rotate(4deg)", boxSizing: "border-box" }}>
                        <span style={{ flex: "none", width: 30, height: 30, borderRadius: 9, background: "#317a51", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m22 2-7 20-4-9-9-4z" />
                                <path d="M22 2 11 13" />
                            </svg>
                        </span>
                        <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <span style={{ fontSize: 11, color: "#5b6360" }}>Out on memo</span>
                            <span style={{ fontSize: 16, fontWeight: 700, color: "#0c0c10" }}>$1.2M</span>
                        </span>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
