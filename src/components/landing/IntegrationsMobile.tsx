"use client";

import { useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useAnimationFrame, useInView, useReducedMotion, type Variants } from "motion/react";
import { EASE, Reveal } from "./motion";
import "./integrations-mobile.css";

/* Diagram artboard: 350 × 440, hub at (175, 220). Positions are converted to % so the stage can shrink on narrow phones. */
const W = 350;
const H = 440;
const HX = 175;
const HY = 220;

type NodeData = { x: number; y: number; mono: string; label: string; slug: string; category: string; title: string; desc: string; req?: boolean };

const NODES: NodeData[] = [
    { x: 60, y: 58, mono: "RN", label: "RapNet", slug: "rapnet", category: "Diamond Marketplace", title: "Rapaport Trade / RapNet", desc: "Send stock to Rapaport Trade / RapNet and bring marketplace updates back into Carat Logic." },
    { x: 175, y: 58, mono: "VDB", label: "VDB", slug: "vdb", category: "Diamond Marketplace", title: "VDB", desc: "Share stock with VDB and receive marketplace activity back into your inventory." },
    { x: 290, y: 58, mono: "NV", label: "Nivoda", slug: "nivoda", category: "Diamond Marketplace", title: "Nivoda", desc: "List stock on Nivoda and keep updates flowing back into your Carat Logic inventory." },
    { x: 105, y: 140, mono: "IDX", label: "IDEX", slug: "idex", category: "Diamond Marketplace", title: "IDEX", desc: "Send stock to IDEX and receive trading updates back into Carat Logic." },
    { x: 245, y: 140, mono: "+", label: "More", slug: "request", category: "Diamond Marketplace", title: "More Marketplaces", desc: "Trade on another marketplace? Tell us which one and we’ll discuss the connection in your demo.", req: true },
    { x: 75, y: 362, mono: "PP", label: "Peppol", slug: "peppol", category: "E-Invoicing · Europe", title: "Peppol", desc: "Send e-invoices to European trading partners and receive their incoming e-invoices directly in Carat Logic." },
    { x: 175, y: 362, mono: "GST", label: "GST", slug: "gst-e-invoicing", category: "E-Invoicing · India", title: "GST E-Invoicing", desc: "Send invoices for GST e-invoice registration and receive the registered details back on your invoice." },
    { x: 275, y: 362, mono: "+", label: "Request", slug: "request", category: "E-Invoicing", title: "Request a Connection", desc: "Need another e-invoicing or billing system? Let us know which connections matter to your business.", req: true },
];

/* Connector from each node to the hub: straight when vertically aligned, otherwise an S-curve. */
const LINES = NODES.map(({ x, y }) => {
    if (x === HX) return `M ${x} ${y} L ${HX} ${HY}`;
    const my = (y + HY) / 2;
    return `M ${x} ${y} C ${x} ${my} ${HX} ${my} ${HX} ${HY}`;
});

/* No integration pages exist yet, so the detail card links to the enquiry form. */
const NODE_HREF = "/contact?tab=query";

/*
 * Two-way data flow (design used SMIL animateMotion; here driven per frame). Each motion path runs node → hub
 * (same d as that node's connector) and carries two pulses, all with dur 2.6s:
 *  - out: green "Sent from Carat Logic" pulse, hub → node (design: keyPoints="1;0")
 *  - in:  dark "Received into Carat Logic" pulse, node → hub
 * begin < 0 = phase offset, copied from the design. The two "request" nodes have no pulses.
 */
const DUR = 2.6;
const FLOWS = [
    { d: "M 60 58 C 60 139 175 139 175 220", out: 0, in: -1.3 },
    { d: "M 175 58 L 175 220", out: -0.4, in: -1.7 },
    { d: "M 290 58 C 290 139 175 139 175 220", out: -0.8, in: -2.1 },
    { d: "M 105 140 C 105 180 175 180 175 220", out: -1.2, in: -2.5 },
    { d: "M 75 362 C 75 291 175 291 175 220", out: -1.6, in: -2.9 },
    { d: "M 175 362 L 175 220", out: -2.0, in: -3.3 },
];
const DOTS = FLOWS.flatMap((f, i) => [
    { path: i, begin: f.out, outbound: true },
    { path: i, begin: f.in, outbound: false },
]);

const STAGE_VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

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

const captionStyle: CSSProperties = { position: "absolute", left: 0, right: 0, textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8a908d" };
const dashLine: CSSProperties = { width: 36, height: 2, backgroundImage: "repeating-linear-gradient(90deg, #317a51 0 6px, rgba(0,0,0,0) 6px 11px)" };
const legendPill: CSSProperties = { display: "inline-flex", alignItems: "center", gap: 9, padding: "9px 14px", borderRadius: 999, background: "#ffffff", border: "1px solid #e6e9e8", fontSize: 13, fontWeight: 600, color: "#1d2320" };
const tile: CSSProperties = { width: 52, height: 52, borderRadius: 16, background: "#ffffff", border: "1px solid #e3e6e5", boxShadow: "0 8px 18px rgba(16,24,20,0.1)", display: "flex", alignItems: "center", justifyContent: "center" };

export function IntegrationsMobile() {
    const reduce = useReducedMotion();
    const [sel, setSel] = useState(0);
    const stageRef = useRef<HTMLDivElement>(null);
    const pathRefs = useRef<(SVGPathElement | null)[]>([]);
    const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
    // Observe the stage wrapper (it always has size), not the zero-length paths inside it.
    const entered = useInView(stageRef, STAGE_VIEWPORT);
    const visible = useInView(stageRef);

    // Pulses travel along each path at constant speed, like animateMotion's paced / linear keyPoints mode.
    useAnimationFrame((t) => {
        if (reduce || !visible) return;
        const s = t / 1000;
        DOTS.forEach((dot, i) => {
            const path = pathRefs.current[dot.path];
            const c = dotRefs.current[i];
            if (!path || !c) return;
            const p = ((((s - dot.begin) % DUR) + DUR) % DUR) / DUR;
            const pt = path.getPointAtLength((dot.outbound ? 1 - p : p) * path.getTotalLength());
            c.setAttribute("cx", String(pt.x));
            c.setAttribute("cy", String(pt.y));
        });
    });

    const r = NODES[sel];
    const cta = r.req ? "Tell us what you need" : "View details";
    const stageState = reduce || entered ? "show" : "hidden";

    return (
        <section className="lp-integrations-m" style={{ width: "100%", color: "#111114", background: "#fafafa", padding: "64px 20px 72px", boxSizing: "border-box" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {/* heading */}
                <Reveal style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                    <h2 style={{ margin: 0, fontSize: 32, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>Your Marketplaces and E-Invoicing. Connected Both Ways.</h2>
                    <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "#5f6663" }}>Send data out from Carat Logic Inventory and receive it back in. Share stock and invoices with marketplaces and e-invoicing networks, and bring updates and incoming e-invoices straight into your workflow.</p>
                </Reveal>

                {/* vertical hub diagram */}
                <motion.div ref={stageRef} style={{ position: "relative", width: "100%", maxWidth: W, aspectRatio: `${W} / ${H}`, margin: "0 auto" }} initial={reduce ? false : "hidden"} animate={stageState}>
                    <svg aria-hidden="true" viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
                        <g fill="none" stroke="#e2e5e4" strokeWidth="2.5" strokeLinecap="round">
                            {LINES.map((d, i) => (
                                <motion.path key={i} d={d} variants={lineVariants} custom={i} />
                            ))}
                        </g>
                        {/* invisible motion paths the dots follow */}
                        <g fill="none" stroke="none">
                            {FLOWS.map((f, i) => (
                                <path
                                    key={i}
                                    d={f.d}
                                    ref={(el) => {
                                        pathRefs.current[i] = el;
                                    }}
                                />
                            ))}
                        </g>
                        {!reduce && (
                            <motion.g variants={fadeVariants} custom={1.0}>
                                {DOTS.map((dot, i) => (
                                    <circle
                                        key={i}
                                        r="4"
                                        fill={dot.outbound ? "#317a51" : "#111827"}
                                        stroke={dot.outbound ? undefined : "#ffffff"}
                                        strokeWidth={dot.outbound ? undefined : 1.2}
                                        ref={(el) => {
                                            dotRefs.current[i] = el;
                                        }}
                                    />
                                ))}
                            </motion.g>
                        )}
                    </svg>

                    {/* group captions */}
                    <motion.span variants={fadeVariants} custom={0.1} style={{ ...captionStyle, top: -4 }}>
                        Diamond marketplaces
                    </motion.span>
                    <motion.span variants={fadeVariants} custom={0.1} style={{ ...captionStyle, bottom: -2 }}>
                        E-invoicing
                    </motion.span>

                    {/* centre hub */}
                    <motion.div className="cl-hub" variants={hubVariants} style={{ position: "absolute", left: `${(HX / W) * 100}%`, top: `${(HY / H) * 100}%`, x: "-50%", y: "-50%", width: 84, height: 84, borderRadius: 24, background: "#ffffff", border: "1px solid #dfe8e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/design/0fc523af826128299a3c79d997fe5e16.png" alt="Carat Logic" style={{ width: "58%", height: "auto", display: "block" }} />
                        <span aria-hidden="true" style={{ position: "absolute", bottom: -12, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 5, padding: "4px 9px", borderRadius: 999, background: "#111827", color: "#ffffff", fontSize: 10, fontWeight: 600, whiteSpace: "nowrap" }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M7 7h12l-3-3" />
                                <path d="M17 17H5l3 3" />
                            </svg>
                            Two-way sync
                        </span>
                    </motion.div>

                    {/* nodes */}
                    {NODES.map((n, i) => {
                        const on = i === sel;
                        return (
                            <motion.button
                                key={`${n.slug}-${i}`}
                                type="button"
                                className="cl-node"
                                aria-label={`${n.title} integration details`}
                                aria-pressed={on}
                                onClick={() => setSel(i)}
                                variants={nodeVariants}
                                custom={i}
                                style={{
                                    position: "absolute",
                                    zIndex: 2,
                                    left: `${(n.x / W) * 100}%`,
                                    top: `${(n.y / H) * 100}%`,
                                    transform: `translate(-50%, -50%)${on ? " scale(1.08)" : ""}`,
                                    width: 52,
                                    height: 52,
                                    padding: 0,
                                    cursor: "pointer",
                                    fontFamily: "inherit",
                                    borderRadius: 15,
                                    background: "#ffffff",
                                    border: n.req ? "1px dashed #c9d6cf" : on ? "1.5px solid #317a51" : "1px solid #e6e9e8",
                                    boxShadow: `${on ? "0 0 0 4px rgba(49,122,81,0.15), " : ""}0 8px 20px rgba(16,24,20,0.08)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <span style={{ fontSize: n.mono === "+" ? 20 : 13, fontWeight: 700, letterSpacing: "-0.02em", color: n.req ? "#317a51" : "#111827" }}>{n.mono}</span>
                                <span style={{ position: "absolute", top: "calc(100% + 7px)", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", fontSize: 11, fontWeight: 600, color: "#3a403d" }}>{n.label}</span>
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* two-way legend */}
                <Reveal style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <span style={legendPill}>
                        <span aria-hidden="true" style={{ width: 9, height: 9, borderRadius: 999, background: "#317a51" }} />
                        Sent from Carat Logic
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#317a51" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12h14" />
                            <path d="m13 6 6 6-6 6" />
                        </svg>
                    </span>
                    <span style={legendPill}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M19 12H5" />
                            <path d="m11 6-6 6 6 6" />
                        </svg>
                        Received into Carat Logic
                        <span aria-hidden="true" style={{ width: 9, height: 9, borderRadius: 999, background: "#111827" }} />
                    </span>
                </Reveal>

                {/* detail card for the tapped node */}
                <Reveal style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 12, color: "#6b736f" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#317a51" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M9 11V6a2 2 0 0 1 4 0v5" />
                            <path d="M13 10a2 2 0 0 1 4 0v2a7 7 0 0 1-7 7H9a5 5 0 0 1-4-2l-2-3a2 2 0 0 1 3-2l3 2" />
                        </svg>
                        Tap a connection to see details
                    </span>
                    <a href={NODE_HREF} role="status" style={{ display: "block", borderRadius: 22, background: "#ffffff", border: "1px solid #e6e9e8", boxShadow: "0 18px 40px rgba(16,24,20,0.1)", overflow: "hidden", color: "#111114" }}>
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                                key={sel}
                                initial={{ opacity: 0, y: reduce ? 0 : 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: reduce ? 0 : -4 }}
                                transition={{ duration: reduce ? 0 : 0.2, ease: EASE }}
                                style={{ display: "block" }}
                            >
                                <span style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", height: 108, backgroundColor: "#f6f7f7", backgroundImage: "radial-gradient(#d9dddb 1px, rgba(0,0,0,0) 1px)", backgroundSize: "14px 14px", borderBottom: "1px solid #eceeed" }}>
                                    <span style={{ position: "absolute", left: 12, top: 12, padding: "4px 9px", borderRadius: 999, background: "#ffffff", border: "1px solid #e3e6e5", fontSize: 11, fontWeight: 600, color: "#3a403d" }}>{r.category}</span>
                                    <span style={{ ...tile, fontSize: 15, fontWeight: 700, color: "#111827" }}>{r.mono}</span>
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
                                </span>
                                <span style={{ display: "flex", flexDirection: "column", gap: 6, padding: "18px 20px 4px" }}>
                                    <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", color: "#0c0c10" }}>{r.title}</span>
                                    <span style={{ fontSize: 14, lineHeight: 1.55, color: "#5f6663" }}>{r.desc}</span>
                                </span>
                                <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px 18px" }}>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{cta}</span>
                                    <span style={{ width: 34, height: 34, borderRadius: 999, background: "#f1f3f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M5 12h14" />
                                            <path d="m13 6 6 6-6 6" />
                                        </svg>
                                    </span>
                                </span>
                            </motion.span>
                        </AnimatePresence>
                    </a>
                </Reveal>

                <Reveal>
                    <a href="/contact?tab=query" style={{ minHeight: 52, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 14, background: "linear-gradient(180deg, #1f2937 0%, #111827 100%)", color: "#ffffff", fontSize: 15, fontWeight: 600, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 10px 24px rgba(17,24,39,0.25)" }}>
                        <span style={{ color: "#ffffff" }}>Explore all integrations</span>
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
