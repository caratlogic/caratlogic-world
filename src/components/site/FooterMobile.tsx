"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import Link from "next/link";
import { EASE, Reveal, Stagger, itemVariants } from "@/components/landing/motion";
import { FOOTER_COLUMNS } from "./footerLinks";
import "./footer-mobile.css";

function ArrowUpRight({ stroke }: { stroke: string }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
        </svg>
    );
}

export function FooterMobile() {
    const [open, setOpen] = useState(0);
    const reduce = useReducedMotion();
    const t = reduce ? { duration: 0 } : { duration: 0.3, ease: EASE };

    return (
        <footer className="site-footer-m" style={{ background: "#000000", color: "#ffffff", padding: "52px 20px 116px", boxSizing: "border-box" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {/* brand */}
                <Reveal style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <Link href="/" aria-label="Carat Logic home" style={{ alignSelf: "flex-start" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/design/a0624d387c799bef34880b03ced88e69.webp" alt="Carat Logic" style={{ height: 48, width: "auto", display: "block" }} />
                    </Link>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>Inventory management and KYC software for diamond and gemstone businesses.</p>
                </Reveal>

                {/* contact */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <Reveal y={16} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", color: "#ffffff" }}>Have questions? Let’s talk.</span>
                        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>We usually reply within one business day.</span>
                    </Reveal>
                    <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }} stagger={0.08}>
                        <motion.a variants={itemVariants} href="mailto:hello@caratlogic.com" style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16, borderRadius: 18, background: "#ffffff", color: "#111827" }}>
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <span style={{ width: 38, height: 38, borderRadius: 12, background: "#317a51", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <rect x="3" y="5" width="18" height="14" rx="2" />
                                        <path d="m3 7 9 6 9-6" />
                                    </svg>
                                </span>
                                <ArrowUpRight stroke="#111827" />
                            </span>
                            <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                                <span style={{ fontSize: 16, fontWeight: 600, color: "#0c0c10" }}>Email us</span>
                                <span style={{ fontSize: 12, color: "#5f6663", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>hello@caratlogic.com</span>
                            </span>
                        </motion.a>
                        <motion.a variants={itemVariants} href="tel:+32499712725" style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16, borderRadius: 18, background: "#1a1d1c", border: "1px solid rgba(255,255,255,0.14)", color: "#ffffff" }}>
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <span style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(95,207,134,0.16)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5fcf86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                                    </svg>
                                </span>
                                <ArrowUpRight stroke="#ffffff" />
                            </span>
                            <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                                <span style={{ fontSize: 16, fontWeight: 600, color: "#ffffff" }}>Call us</span>
                                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>+32 499 71 27 25</span>
                            </span>
                        </motion.a>
                    </Stagger>
                </div>

                {/* link groups as accordion */}
                <Stagger style={{ display: "flex", flexDirection: "column", borderTop: "1px solid rgba(255,255,255,0.14)" }} stagger={0.06}>
                    {FOOTER_COLUMNS.map((col, i) => {
                        const on = i === open;
                        const id = `m-foot-${i}`;
                        return (
                            <motion.nav key={col.title} aria-label={col.title} variants={itemVariants} style={{ borderBottom: "1px solid rgba(255,255,255,0.14)" }}>
                                <button
                                    type="button"
                                    className="cl-acc"
                                    id={`${id}-btn`}
                                    aria-expanded={on}
                                    aria-controls={`${id}-panel`}
                                    onClick={() => setOpen(on ? -1 : i)}
                                    style={{ width: "100%", minHeight: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
                                >
                                    <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#ffffff" }}>{col.title}</span>
                                    <motion.svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#ffffff"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                        style={{ flex: "none" }}
                                        initial={false}
                                        animate={{ rotate: on ? 180 : 0 }}
                                        transition={reduce ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
                                    >
                                        <path d="m6 9 6 6 6-6" />
                                    </motion.svg>
                                </button>
                                <AnimatePresence initial={false}>
                                    {on && (
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
                                            <ul style={{ listStyle: "none", margin: 0, padding: "0 2px 16px", display: "flex", flexDirection: "column" }}>
                                                {col.links.map((l) => (
                                                    <li key={l.label}>
                                                        <Link href={l.href} style={{ display: "flex", alignItems: "center", minHeight: 40, fontSize: 15, color: "rgba(255,255,255,0.8)" }}>
                                                            {l.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.nav>
                        );
                    })}
                </Stagger>

                {/* bottom */}
                <Reveal y={12} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <span style={{ fontSize: 12, letterSpacing: "0.04em", color: "rgba(255,255,255,0.5)" }}>© 2026 Carat Logic</span>
                </Reveal>
            </div>
        </footer>
    );
}
