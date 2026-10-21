"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useAnimationFrame, useInView, useReducedMotion } from "motion/react";
import { EASE, Reveal, Stagger, StaggerItem, REVEAL_VIEWPORT } from "./motion";
import "./section2.css";


const RIBBON_PATH =
    "M 200 162 C 280 160, 300 110, 380 110 C 460 110, 500 190, 560 190 C 650 190, 660 70, 600 70 C 540 70, 545 185, 640 185 C 720 185, 760 120, 840 118 C 920 116, 960 175, 1030 172 C 1090 170, 1120 120, 1240 118";

const card: CSSProperties = {
    width: "100%",
    background: "#ffffff",
    border: "1px solid #e6ebe8",
    borderRadius: 14,
    boxShadow: "0 14px 30px rgba(28,72,48,0.12)",
    padding: 12,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    fontSize: 12,
};
const cardHead: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center" };
const cardTitle: CSSProperties = { fontWeight: 600, fontSize: 13, color: "#0c0c10" };
const muted: CSSProperties = { color: "#6b736f" };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: "1px solid #f0f2f1" };
const rowC: CSSProperties = { ...row, alignItems: "center" };
const stack: CSSProperties = { display: "flex", flexDirection: "column" };
const strong: CSSProperties = { fontWeight: 600, color: "#2b302e" };
const sub: CSSProperties = { color: "#6b736f", fontSize: 11 };

function Pill({ bg, color, children }: { bg: string; color: string; children: ReactNode }) {
    return <span style={{ padding: "2px 8px", borderRadius: 999, background: bg, color, fontWeight: 600, fontSize: 11 }}>{children}</span>;
}

function Step({ n, padTop, title, text, active, children }: { n: number; padTop: number; title: string; text: string; active?: boolean; children: ReactNode }) {
    return (
        <StaggerItem style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div style={{ height: 230, display: "flex", alignItems: "flex-start", paddingTop: padTop, boxSizing: "border-box" }}>{children}</div>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span
                    style={{
                        flex: "none",
                        width: 26,
                        height: 26,
                        borderRadius: 999,
                        background: active ? "#317a51" : "#eef4f0",
                        color: active ? "#ffffff" : "#245c3e",
                        fontSize: 12,
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {n}
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#0c0c10", lineHeight: 1.3 }}>{title}</h3>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "#5f6663" }}>{text}</p>
                </div>
            </div>
        </StaggerItem>
    );
}

const benefitCard: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    borderRadius: 22,
    padding: "36px 32px",
    minHeight: 230,
    boxSizing: "border-box",
    background: "#ffffff",
    border: "1px solid #e3ebe6",
    boxShadow: "0 18px 40px rgba(16,40,28,0.07)",
    color: "#111114",
    display: "flex",
    flexDirection: "column",
    gap: 14,
};

const BENEFITS: { title: string; text: string; icon: ReactNode }[] = [
    {
        title: "Be Ready When Buyers Ask",
        text: "Find available stones and their details when an enquiry comes in.",
        icon: (
            <>
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
            </>
        ),
    },
    {
        title: "Keep Your Memos Under Control",
        text: "Know what’s out on memo and which transactions need your attention.",
        icon: (
            <>
                <path d="m22 2-7 20-4-9-9-4z" />
                <path d="M22 2 11 13" />
            </>
        ),
    },
    {
        title: "Keep Outstanding Payments Visible",
        text: "See what’s been paid and what’s still owed as you plan your next move.",
        icon: (
            <>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 10h18" />
                <path d="M7 15h4" />
            </>
        ),
    },
];

/** Pulse phase offsets in ms (design: begin 0s, -2s, -4s on a 6s loop). */
const PULSE_OFFSETS = [0, 2000, 4000];
const PULSE_DUR = 6000;

export function Section2() {
    const reduce = useReducedMotion();
    const graphicRef = useRef<HTMLDivElement>(null);
    const ribRef = useRef<SVGPathElement>(null);
    const pulseRefs = useRef<(SVGCircleElement | null)[]>([]);
    // Observe the wrapper, not the clipped SVG: a fully clipped element never registers as in view.
    const graphicInView = useInView(graphicRef, { once: true, amount: 0.3 });

    // Data pulses travel along the tube at constant speed (same as SVG animateMotion's paced mode).
    useAnimationFrame((t) => {
        const path = ribRef.current;
        if (reduce || !path) return;
        const len = path.getTotalLength();
        PULSE_OFFSETS.forEach((off, i) => {
            const c = pulseRefs.current[i];
            if (!c) return;
            const pt = path.getPointAtLength((((t + off) % PULSE_DUR) / PULSE_DUR) * len);
            c.setAttribute("cx", String(pt.x));
            c.setAttribute("cy", String(pt.y));
        });
    });
    const hidden = "inset(-50% 110% -50% -10%)";
    const shown = "inset(-50% -10% -50% -10%)";

    return (
        <section className="lp-section2" style={{ color: "#111114", background: "#ffffff", padding: "120px 24px 120px", boxSizing: "border-box" }}>
            {/* heading */}
            <Reveal style={{ maxWidth: 980, margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", gap: 18 }}>
                <h2 style={{ margin: 0, fontSize: "clamp(34px, 4.4vw, 60px)", lineHeight: 1.06, fontWeight: 600, letterSpacing: "-0.035em", color: "#0c0c10" }}>
                    Stop Chasing Stock Updates, Memos and Payments.
                </h2>
                <p style={{ margin: "0 auto", maxWidth: 760, fontSize: "clamp(17px, 1.5vw, 20px)", lineHeight: 1.55, color: "#5f6663" }}>
                    Carat Logic brings your inventory, business contacts and transactions together&mdash;so you know what&rsquo;s available, what&rsquo;s out on memo and what&rsquo;s owed.
                </p>
            </Reveal>

            {/* connected graphic */}
            <div ref={graphicRef} style={{ position: "relative", maxWidth: 1200, margin: "88px auto 0" }}>
                <motion.svg
                    className="cl-ribbon"
                    aria-hidden="true"
                    viewBox="0 0 1200 250"
                    preserveAspectRatio="none"
                    style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 250, overflow: "visible", pointerEvents: "none" }}
                    initial={reduce ? false : { clipPath: hidden, opacity: 0 }}
                    animate={reduce || graphicInView ? { clipPath: shown, opacity: 1 } : { clipPath: hidden, opacity: 0 }}
                    transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
                >
                    <defs>
                        <linearGradient id="lps2Tube" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#dcefe0" />
                            <stop offset="0.35" stopColor="#a7d7b2" />
                            <stop offset="0.7" stopColor="#5fae7a" />
                            <stop offset="1" stopColor="#2c6f4b" />
                        </linearGradient>
                        <filter id="lps2Soft" x="-10%" y="-50%" width="120%" height="200%">
                            <feGaussianBlur stdDeviation="8" />
                        </filter>
                    </defs>
                    {/* incoming strands: information arriving from different places */}
                    <path d="M -40 60 C 60 60, 110 150, 200 160" fill="none" stroke="#cfe6d5" strokeWidth="7" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                    <path d="M -40 240 C 60 240, 120 180, 200 165" fill="none" stroke="#cfe6d5" strokeWidth="7" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                    <path d="M -40 160 C 40 160, 120 165, 200 162" fill="none" stroke="#bfe0c9" strokeWidth="9" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                    {/* main tube */}
                    <path d={RIBBON_PATH} fill="none" stroke="rgba(44,111,75,0.22)" strokeWidth="30" strokeLinecap="round" filter="url(#lps2Soft)" transform="translate(0 12)" vectorEffect="non-scaling-stroke" />
                    <path ref={ribRef} d={RIBBON_PATH} fill="none" stroke="url(#lps2Tube)" strokeWidth="28" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                    <path d={RIBBON_PATH} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="7" strokeLinecap="round" transform="translate(0 -6)" vectorEffect="non-scaling-stroke" />
                    {/* data pulses travelling along the tube */}
                    {PULSE_OFFSETS.map((off, i) => (
                        <circle
                            key={off}
                            ref={(el) => {
                                pulseRefs.current[i] = el;
                            }}
                            className="cl-pulse"
                            r="5"
                            cx="200"
                            cy="162"
                            fill="#ffffff"
                        />
                    ))}
                </motion.svg>

                <Stagger className="cl-steps" style={{ position: "relative" }} stagger={0.1}>
                    {/* 1 Inventory */}
                    <Step n={1} padTop={64} title="Organise Your Inventory" text="Keep stone details, prices and availability organised so you can find what a buyer needs.">
                        <div style={card}>
                            <div style={cardHead}>
                                <span style={cardTitle}>Inventory</span>
                                <Pill bg="#e3f1e7" color="#245c3e">Available</Pill>
                            </div>
                            <div style={row}>
                                <span style={{ color: "#2b302e" }}>RD 1.02ct · F · VS1</span>
                                <span style={{ fontWeight: 600 }}>$6,840</span>
                            </div>
                            <div style={row}>
                                <span style={{ color: "#2b302e" }}>OV 0.90ct · G · VVS2</span>
                                <span style={{ fontWeight: 600 }}>$4,120</span>
                            </div>
                            <div style={row}>
                                <span style={{ color: "#2b302e" }}>PR 1.51ct · E · SI1</span>
                                <span style={{ fontWeight: 600 }}>$9,310</span>
                            </div>
                        </div>
                    </Step>

                    {/* 2 KYC */}
                    <Step n={2} padTop={6} title="Onboard Your Customers & Suppliers" text="Collect business details, KYC forms and supporting documents, then track review and approval.">
                        <div style={card}>
                            <div style={cardHead}>
                                <span style={cardTitle}>KYC review</span>
                                <span style={muted}>3 open</span>
                            </div>
                            <div style={rowC}>
                                <span style={stack}>
                                    <span style={strong}>Shah Diamonds</span>
                                    <span style={sub}>Customer</span>
                                </span>
                                <Pill bg="#e3f1e7" color="#245c3e">Approved</Pill>
                            </div>
                            <div style={rowC}>
                                <span style={stack}>
                                    <span style={strong}>Gemline LLP</span>
                                    <span style={sub}>Supplier</span>
                                </span>
                                <Pill bg="#fdf0d8" color="#8a5300">In review</Pill>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 5, paddingTop: 6, borderTop: "1px solid #f0f2f1" }}>
                                <span style={{ display: "flex", justifyContent: "space-between", color: "#6b736f", fontSize: 11 }}>
                                    <span>Documents</span>
                                    <span>4 / 5</span>
                                </span>
                                <span style={{ height: 5, borderRadius: 999, background: "#e7efe9", display: "flex" }}>
                                    <motion.span
                                        style={{ width: "80%", borderRadius: 999, background: "#317a51", transformOrigin: "0 50%" }}
                                        initial={reduce ? false : { scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={REVEAL_VIEWPORT}
                                        transition={{ duration: 1, ease: EASE, delay: 0.5 }}
                                    />
                                </span>
                            </div>
                        </div>
                    </Step>

                    {/* 3 Memos */}
                    <Step n={3} padTop={52} title="Track Your Memos" text="See which stones are out on memo and follow their status.">
                        <div style={card}>
                            <div style={cardHead}>
                                <span style={cardTitle}>Memos</span>
                                <span style={muted}>Out on memo</span>
                            </div>
                            <div style={rowC}>
                                <span style={stack}>
                                    <span style={strong}>#M-1042</span>
                                    <span style={sub}>8 stones · 12.40 ct</span>
                                </span>
                                <Pill bg="#e6eefc" color="#1f4fa8">Out</Pill>
                            </div>
                            <div style={rowC}>
                                <span style={stack}>
                                    <span style={strong}>#M-1039</span>
                                    <span style={sub}>3 stones · 4.15 ct</span>
                                </span>
                                <Pill bg="#fdf0d8" color="#8a5300">Due soon</Pill>
                            </div>
                        </div>
                    </Step>

                    {/* 4 Orders */}
                    <Step n={4} padTop={0} title="Manage Your Orders & Sales" text="Keep orders and sales organised alongside your stock and business contacts.">
                        <div style={card}>
                            <div style={cardHead}>
                                <span style={cardTitle}>Orders &amp; sales</span>
                                <span style={muted}>This week</span>
                            </div>
                            <div style={rowC}>
                                <span style={{ color: "#2b302e", fontWeight: 600 }}>#SO-2320</span>
                                <Pill bg="#e3f1e7" color="#245c3e">Shipped</Pill>
                            </div>
                            <div style={rowC}>
                                <span style={{ color: "#2b302e", fontWeight: 600 }}>#SO-2321</span>
                                <Pill bg="#e6eefc" color="#1f4fa8">Packed</Pill>
                            </div>
                            <div style={rowC}>
                                <span style={{ color: "#2b302e", fontWeight: 600 }}>#SO-2322</span>
                                <Pill bg="#f0f2f1" color="#4a514e">Confirmed</Pill>
                            </div>
                        </div>
                    </Step>

                    {/* 5 Financial overview */}
                    <Step n={5} padTop={40} active title={"See What’s Owed"} text="Monitor payments, outstanding invoices and key business figures from your dashboard.">
                        <div style={{ ...card, boxShadow: "0 14px 30px rgba(28,72,48,0.14), 0 0 0 4px rgba(49,122,81,0.12)", gap: 10 }}>
                            <div style={cardHead}>
                                <span style={cardTitle}>Receivables</span>
                                <span style={{ width: 22, height: 22, borderRadius: 999, background: "#317a51", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="m5 12 5 5L20 7" />
                                    </svg>
                                </span>
                            </div>
                            <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", color: "#0c0c10", lineHeight: 1 }}>$2.8M</span>
                            <motion.span
                                style={{ display: "flex", height: 8, borderRadius: 999, overflow: "hidden", gap: 2, transformOrigin: "0 50%" }}
                                initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
                                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                                viewport={REVEAL_VIEWPORT}
                                transition={{ duration: 1.1, ease: EASE, delay: 0.6 }}
                            >
                                <span style={{ width: "58%", background: "#317a51" }} />
                                <span style={{ width: "30%", background: "#e0a53a" }} />
                                <span style={{ width: "12%", background: "#c9d3ce" }} />
                            </motion.span>
                            <span style={{ display: "flex", gap: 10, flexWrap: "wrap", color: "#4a514e", fontSize: 11 }}>
                                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                    <span style={{ width: 7, height: 7, borderRadius: 2, background: "#317a51" }} />
                                    Paid
                                </span>
                                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                    <span style={{ width: 7, height: 7, borderRadius: 2, background: "#e0a53a" }} />
                                    Outstanding
                                </span>
                                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                    <span style={{ width: 7, height: 7, borderRadius: 2, background: "#c9d3ce" }} />
                                    Overdue
                                </span>
                            </span>
                        </div>
                    </Step>
                </Stagger>
            </div>

            {/* benefit cards */}
            <Stagger className="cl-cards" style={{ maxWidth: 1200, margin: "104px auto 0" }} stagger={0.1}>
                {BENEFITS.map((b) => (
                    <StaggerItem key={b.title} style={benefitCard}>
                        <span style={{ width: 44, height: 44, borderRadius: 12, background: "#eef6f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#245c3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                {b.icon}
                            </svg>
                        </span>
                        <h3 style={{ margin: "8px 0 0", fontSize: 26, lineHeight: 1.15, fontWeight: 600, letterSpacing: "-0.02em", color: "#0c0c10" }}>{b.title}</h3>
                        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#5f6663" }}>{b.text}</p>
                        <span
                            aria-hidden="true"
                            style={{ position: "absolute", left: 32, right: 32, bottom: 18, height: 2, background: "repeating-linear-gradient(90deg, rgba(36,92,62,0.22) 0 6px, rgba(36,92,62,0) 6px 12px)" }}
                        />
                    </StaggerItem>
                ))}
            </Stagger>
        </section>
    );
}
