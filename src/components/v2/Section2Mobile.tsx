"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { EASE, Reveal, Stagger, StaggerItem } from "./motion";
import "./section2-mobile.css";

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

function Step({ n, title, text, active, children }: { n: number; title: string; text: string; active?: boolean; children: ReactNode }) {
    return (
        <Reveal y={20} style={{ position: "relative", display: "flex", gap: 16 }}>
            <span
                style={{
                    position: "relative",
                    zIndex: 2,
                    flex: "none",
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    background: active ? "#317a51" : "#ffffff",
                    border: "2px solid #317a51",
                    color: active ? "#ffffff" : "#245c3e",
                    fontSize: 13,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxSizing: "border-box",
                    boxShadow: "0 0 0 5px #ffffff",
                }}
            >
                {n}
            </span>
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 14, paddingBottom: 36 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 4 }}>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#0c0c10", lineHeight: 1.3 }}>{title}</h3>
                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: "#5f6663" }}>{text}</p>
                </div>
                {children}
            </div>
        </Reveal>
    );
}

/** KYC card; the documents bar fills once the card is in view (observed on the card, not the scaleX(0) bar). */
function KycCard() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    return (
        <div ref={ref} style={card}>
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
                        animate={reduce || inView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 1, ease: EASE, delay: 0.3 }}
                    />
                </span>
            </div>
        </div>
    );
}

/** Receivables card; the split bar wipes in once the card is in view (observed on the card, not the clipped bar). */
function ReceivablesCard() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    return (
        <div ref={ref} style={{ ...card, boxShadow: "0 14px 30px rgba(28,72,48,0.14), 0 0 0 4px rgba(49,122,81,0.12)", gap: 10 }}>
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
                style={{ display: "flex", height: 8, borderRadius: 999, overflow: "hidden", gap: 2 }}
                initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
                animate={reduce || inView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
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
    );
}

const benefitCard: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    borderRadius: 22,
    padding: "26px 22px 34px",
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

/** Tube draws downwards via clip-path (negative insets keep the pulses' ring visible); pulses are not distorted. */
const TUBE_HIDDEN = "inset(-12px -12px 100% -12px)";
const TUBE_SHOWN = "inset(-12px -12px -2% -12px)";

export function Section2Mobile() {
    const reduce = useReducedMotion();
    const flowRef = useRef<HTMLDivElement>(null);
    // Observe the flow wrapper, not the fully clipped tube: a clipped element never registers as in view.
    const flowInView = useInView(flowRef, { once: true, amount: 0.1 });

    return (
        <section className="v2-section2-m" style={{ boxSizing: "border-box", color: "#111114", background: "#ffffff", padding: "64px 20px 72px" }}>
            {/* heading */}
            <Reveal style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 14 }}>
                <h2 style={{ margin: 0, fontSize: 32, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.035em", color: "#0c0c10" }}>
                    Stop Chasing Stock Updates, Memos and Payments.
                </h2>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#5f6663" }}>
                    Carat Logic brings your inventory, business contacts and transactions together&mdash;so you know what&rsquo;s available, what&rsquo;s out on memo and what&rsquo;s owed.
                </p>
            </Reveal>

            {/* vertical connected flow */}
            <div ref={flowRef} style={{ position: "relative", marginTop: 48 }}>
                <motion.div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        left: 13,
                        top: 16,
                        bottom: 60,
                        width: 6,
                        borderRadius: 999,
                        background: "linear-gradient(180deg, #dcefe0 0%, #a7d7b2 35%, #5fae7a 70%, #2c6f4b 100%)",
                    }}
                    initial={reduce ? false : { clipPath: TUBE_HIDDEN }}
                    animate={reduce || flowInView ? { clipPath: TUBE_SHOWN } : { clipPath: TUBE_HIDDEN }}
                    transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
                >
                    <span className="cl-pulse" style={{ position: "absolute", left: -1, width: 8, height: 8, borderRadius: 999, background: "#ffffff", boxShadow: "0 0 0 2px rgba(49,122,81,0.35)" }} />
                    <span className="cl-pulse2" style={{ position: "absolute", left: -1, width: 8, height: 8, borderRadius: 999, background: "#ffffff", boxShadow: "0 0 0 2px rgba(49,122,81,0.35)" }} />
                </motion.div>

                {/* 1 Inventory */}
                <Step n={1} title="Organise Your Inventory" text="Keep stone details, prices and availability organised so you can find what a buyer needs.">
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
                <Step n={2} title="Onboard Your Customers & Suppliers" text="Collect business details, KYC forms and supporting documents, then track review and approval.">
                    <KycCard />
                </Step>

                {/* 3 Memos */}
                <Step n={3} title="Track Your Memos" text="See which stones are out on memo and follow their status.">
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
                <Step n={4} title="Manage Your Orders & Sales" text="Keep orders and sales organised alongside your stock and business contacts.">
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
                <Step n={5} active title={"See What’s Owed"} text="Monitor payments, outstanding invoices and key business figures from your dashboard.">
                    <ReceivablesCard />
                </Step>
            </div>

            {/* benefit cards */}
            <Stagger style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 64 }} stagger={0.1}>
                {BENEFITS.map((b) => (
                    <StaggerItem key={b.title} style={benefitCard}>
                        <span style={{ width: 44, height: 44, borderRadius: 12, background: "#eef6f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#245c3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                {b.icon}
                            </svg>
                        </span>
                        <h3 style={{ margin: "8px 0 0", fontSize: 21, lineHeight: 1.2, fontWeight: 600, letterSpacing: "-0.02em", color: "#0c0c10" }}>{b.title}</h3>
                        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#5f6663" }}>{b.text}</p>
                        <span
                            aria-hidden="true"
                            style={{ position: "absolute", left: 22, right: 22, bottom: 16, height: 2, background: "repeating-linear-gradient(90deg, rgba(36,92,62,0.22) 0 6px, rgba(36,92,62,0) 6px 12px)" }}
                        />
                    </StaggerItem>
                ))}
            </Stagger>
        </section>
    );
}
