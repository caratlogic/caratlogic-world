"use client";

import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { EASE, Reveal, Stagger, itemVariants } from "./motion";
import "./integrations.css";

type NodeOpts = { size?: number; color?: string; dashed?: boolean };
type NodeData = { x: number; y: number; mono: string; label: string; slug: string; category: string; title: string; desc: string; opts: NodeOpts };

const NODES: NodeData[] = [
    { x: 90, y: 70, mono: "RN", label: "Rapaport / RapNet", slug: "rapnet", category: "Diamond Marketplace", title: "Rapaport Trade / RapNet", desc: "Connect Carat Logic with Rapaport Trade for your natural diamond marketplace workflows.", opts: { size: 6.6 } },
    { x: 270, y: 70, mono: "VDB", label: "VDB", slug: "vdb", category: "Diamond Marketplace", title: "VDB", desc: "Connect with Virtual Diamond Boutique’s marketplace for diamonds, gemstones and jewellery.", opts: {} },
    { x: 140, y: 190, mono: "NV", label: "Nivoda", slug: "nivoda", category: "Diamond Marketplace", title: "Nivoda", desc: "Bring a connection to Nivoda’s diamond and gemstone marketplace into your Carat Logic inventory workflow.", opts: { size: 6.6 } },
    { x: 90, y: 310, mono: "IDX", label: "IDEX", slug: "idex", category: "Diamond Marketplace", title: "IDEX", desc: "Connect your Carat Logic inventory workflow with the IDEX diamond trading platform.", opts: { size: 6.6 } },
    { x: 270, y: 310, mono: "+", label: "More marketplaces", slug: "request", category: "Diamond Marketplace", title: "More Marketplaces", desc: "Trade on another marketplace? Tell us which one and we’ll discuss the connection in your demo.", opts: { color: "#317a51", dashed: true } },
    { x: 730, y: 70, mono: "PP", label: "Peppol", slug: "peppol", category: "E-Invoicing · Europe", title: "Peppol", desc: "Support structured electronic invoice exchange with participating European trading partners.", opts: {} },
    { x: 860, y: 190, mono: "GST", label: "GST E-Invoicing", slug: "gst-e-invoicing", category: "E-Invoicing · India", title: "GST E-Invoicing", desc: "Support GST e-invoice registration through an integrated billing workflow for applicable Indian transactions.", opts: { size: 6.6 } },
    { x: 730, y: 310, mono: "+", label: "Request a connection", slug: "request", category: "E-Invoicing", title: "Request a Connection", desc: "Need another e-invoicing or billing system? Let us know which connections matter to your business.", opts: { color: "#317a51", dashed: true } },
];

const PATHS = [
    { id: "l1", d: "M 90 70 L 270 70" },
    { id: "l2", d: "M 270 70 C 350 70 360 190 440 190" },
    { id: "l3", d: "M 140 190 L 440 190" },
    { id: "l4", d: "M 90 310 L 270 310" },
    { id: "l5", d: "M 270 310 C 350 310 360 190 440 190" },
    { id: "r1", d: "M 560 190 C 640 190 650 70 730 70" },
    { id: "r2", d: "M 560 190 L 860 190" },
    { id: "r3", d: "M 560 190 C 640 190 650 310 730 310" },
];

/* Stage choreography: connector lines draw in, then hub, then nodes, then the flowing dots. */
const lineVariants: Variants = {
    hidden: { pathLength: 0 },
    show: (i: number) => ({ pathLength: 1, transition: { duration: 0.9, ease: EASE, delay: 0.15 + i * 0.06 } }),
};
const hubVariants: Variants = {
    hidden: { opacity: 0, scale: 0.82 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};
const nodeVariants: Variants = {
    hidden: { opacity: 0 },
    show: (i: number) => ({ opacity: 1, transition: { duration: 0.5, ease: EASE, delay: 0.35 + i * 0.07 } }),
};
const fadeVariants: Variants = {
    hidden: { opacity: 0 },
    show: (delay: number) => ({ opacity: 1, transition: { duration: 0.6, ease: EASE, delay } }),
};

const captionStyle: CSSProperties = { position: "absolute", top: "-6%", transform: "translateX(-50%)", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8a908d" };
const dashLine: CSSProperties = { width: 40, height: 2, backgroundImage: "repeating-linear-gradient(90deg, #317a51 0 6px, rgba(0,0,0,0) 6px 11px)" };
const tile: CSSProperties = { width: 56, height: 56, borderRadius: 16, background: "#ffffff", border: "1px solid #e3e6e5", boxShadow: "0 8px 18px rgba(16,24,20,0.1)", display: "flex", alignItems: "center", justifyContent: "center" };

export function Integrations() {
    const reduce = useReducedMotion();
    const [hov, setHov] = useState(-1);
    const leave = () => setHov(-1);

    const pop = hov >= 0 ? NODES[hov] : null;
    let popWrap: CSSProperties = {};
    let below = true;
    if (pop) {
        below = pop.y < 190 || pop.y === 190;
        const tx = pop.x < 200 ? "-12%" : pop.x > 800 ? "-88%" : "-50%";
        const top = below ? `calc(${pop.y / 3.8}% + 52px)` : `calc(${pop.y / 3.8}% - 52px)`;
        const ty = below ? "0" : "-100%";
        popWrap = { position: "absolute", zIndex: 10, left: `${pop.x / 10}%`, top, transform: `translate(${tx}, ${ty})`, pointerEvents: "none" };
    }

    return (
        <section className="v2-integrations" style={{ color: "#111114", background: "#fafafa", padding: "104px 24px 112px", boxSizing: "border-box" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 56 }}>
                {/* heading */}
                <Reveal style={{ maxWidth: 780, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
                    <h2 style={{ margin: 0, fontSize: "clamp(34px, 4.4vw, 56px)", lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>Your Marketplaces and E-Invoicing. Connected.</h2>
                    <p style={{ margin: 0, maxWidth: 600, fontSize: 17, lineHeight: 1.6, color: "#5f6663" }}>Connect Carat Logic Inventory with diamond marketplaces and regional e-invoicing systems. Bring more of your trading and billing workflow together.</p>
                    <a href="#" style={{ marginTop: 6, display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 24px", borderRadius: 12, background: "linear-gradient(180deg, #1f2937 0%, #111827 100%)", color: "#ffffff", fontSize: 16, fontWeight: 600, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 10px 24px rgba(17,24,39,0.25)" }}>
                        <span style={{ color: "#ffffff" }}>Explore all integrations</span>
                    </a>
                </Reveal>

                {/* hub diagram */}
                <motion.div className="cl-stage" style={{ position: "relative", width: "100%", aspectRatio: "1000 / 380" }} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.3 }}>
                    <svg aria-hidden="true" viewBox="0 0 1000 380" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
                        <g fill="none" stroke="#e2e5e4" strokeWidth="3" strokeLinecap="round">
                            {PATHS.map((p, i) => (
                                <motion.path key={p.id} id={`v2-int-${p.id}`} d={p.d} variants={lineVariants} custom={i} />
                            ))}
                        </g>
                        {!reduce && (
                            <motion.g fill="#317a51" variants={fadeVariants} custom={1.0}>
                                <circle r="4">
                                    <animateMotion dur="3.2s" repeatCount="indefinite" path="M 90 70 L 270 70 C 350 70 360 190 440 190" />
                                </circle>
                                <circle r="4">
                                    <animateMotion dur="3.2s" begin="-1.6s" repeatCount="indefinite" path="M 90 310 L 270 310 C 350 310 360 190 440 190" />
                                </circle>
                                <circle r="4">
                                    <animateMotion dur="2.6s" begin="-0.8s" repeatCount="indefinite" path="M 140 190 L 440 190" />
                                </circle>
                                <circle r="4">
                                    <animateMotion dur="2.8s" repeatCount="indefinite" path="M 560 190 C 640 190 650 70 730 70" />
                                </circle>
                                <circle r="4">
                                    <animateMotion dur="2.8s" begin="-1.4s" repeatCount="indefinite" path="M 560 190 C 640 190 650 310 730 310" />
                                </circle>
                            </motion.g>
                        )}
                    </svg>

                    {/* centre hub */}
                    <motion.div className="cl-hub" variants={hubVariants} style={{ position: "absolute", left: "50%", top: "50%", x: "-50%", y: "-50%", width: "13%", aspectRatio: 1, borderRadius: "28%", background: "#ffffff", border: "1px solid #dfe8e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/design/0fc523af826128299a3c79d997fe5e16.png" alt="Carat Logic" style={{ width: "58%", height: "auto", display: "block" }} />
                    </motion.div>

                    {/* nodes */}
                    {NODES.map((n, i) => {
                        const on = i === hov;
                        const size = n.opts.size || 6.2;
                        const border = n.opts.dashed ? "1px dashed #c9d6cf" : `1px solid ${on ? "#317a51" : "#e6e9e8"}`;
                        return (
                            <motion.a
                                key={`${n.slug}-${i}`}
                                className="cl-node"
                                href={`#integration-${n.slug}`}
                                aria-label={`${n.label} integration`}
                                onMouseEnter={() => setHov(i)}
                                onMouseLeave={leave}
                                onFocus={() => setHov(i)}
                                onBlur={leave}
                                variants={nodeVariants}
                                custom={i}
                                style={{
                                    position: "absolute",
                                    zIndex: on ? 6 : 2,
                                    left: `${n.x / 10}%`,
                                    top: `${n.y / 3.8}%`,
                                    transform: "translate(-50%, -50%)",
                                    width: `${size}%`,
                                    aspectRatio: 1,
                                    borderRadius: "26%",
                                    background: "#ffffff",
                                    border,
                                    boxShadow: `${on ? "0 0 0 4px rgba(49,122,81,0.15), " : ""}0 10px 24px rgba(16,24,20,0.08)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", color: n.opts.color || "#111827" }}>{n.mono}</span>
                                <span style={{ position: "absolute", top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", fontSize: 13, fontWeight: 600, color: "#3a403d" }}>{n.label}</span>
                            </motion.a>
                        );
                    })}

                    {/* hover popover */}
                    <AnimatePresence>
                        {pop && (
                            <div key={hov} role="tooltip" style={popWrap}>
                                <motion.div
                                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: below ? -8 : 8, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: below ? -4 : 4, scale: 0.98 }}
                                    transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
                                    style={{ transformOrigin: below ? "50% 0%" : "50% 100%", width: 300, borderRadius: 22, background: "#ffffff", border: "1px solid #e6e9e8", boxShadow: "0 28px 56px rgba(16,24,20,0.18)", overflow: "hidden", textAlign: "left" }}
                                >
                                    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", height: 118, backgroundColor: "#f6f7f7", backgroundImage: "radial-gradient(#d9dddb 1px, rgba(0,0,0,0) 1px)", backgroundSize: "14px 14px", borderBottom: "1px solid #eceeed" }}>
                                        <span style={{ position: "absolute", left: 12, top: 12, padding: "4px 9px", borderRadius: 999, background: "#ffffff", border: "1px solid #e3e6e5", fontSize: 11, fontWeight: 600, color: "#3a403d" }}>{pop.category}</span>
                                        <span style={{ ...tile, fontSize: 16, fontWeight: 700, color: "#111827" }}>{pop.mono}</span>
                                        <span aria-hidden="true" style={dashLine} />
                                        <span aria-hidden="true" style={{ width: 22, height: 22, borderRadius: 999, background: "#317a51", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 4px #f6f7f7" }}>
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M7 7h12l-3-3" />
                                                <path d="M17 17H5l3 3" />
                                            </svg>
                                        </span>
                                        <span aria-hidden="true" style={dashLine} />
                                        <span style={{ ...tile, padding: 7, boxSizing: "border-box" }}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="/design/a0624d387c799bef34880b03ced88e69.webp" alt="" style={{ width: "100%", height: "auto", display: "block" }} />
                                        </span>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "18px 20px 6px" }}>
                                        <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", color: "#0c0c10" }}>{pop.title}</span>
                                        <span style={{ fontSize: 14, lineHeight: 1.55, color: "#5f6663" }}>{pop.desc}</span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px 18px" }}>
                                        <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>View details</span>
                                        <span style={{ width: 32, height: 32, borderRadius: 999, background: "#f1f3f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                <path d="M5 12h14" />
                                                <path d="m13 6 6 6-6 6" />
                                            </svg>
                                        </span>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* group captions */}
                    <motion.span variants={fadeVariants} custom={0.1} style={{ ...captionStyle, left: "18%" }}>
                        Diamond marketplaces
                    </motion.span>
                    <motion.span variants={fadeVariants} custom={0.1} style={{ ...captionStyle, left: "79.5%" }}>
                        E-invoicing
                    </motion.span>
                </motion.div>

                {/* mobile fallback */}
                <Stagger className="cl-chips" style={{ flexWrap: "wrap", justifyContent: "center", gap: 10 }} stagger={0.05}>
                    {NODES.map((n, i) => (
                        <motion.a key={`${n.slug}-${i}`} href={`#integration-${n.slug}`} variants={itemVariants} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 14, background: "#ffffff", border: "1px solid #e6e9e8", fontSize: 14, fontWeight: 600, color: "#111114" }}>
                            <span style={{ fontSize: 12, fontWeight: 700, color: "#245c3e" }}>{n.mono}</span>
                            {n.label}
                        </motion.a>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
