"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { EASE, Reveal, Stagger, itemVariants } from "./motion";
import "./pricing.css";

const MAXU = 7;

type PlanInput = {
    name: string;
    price: string;
    users: number;
    desc: string;
    features: string[];
    featured?: boolean;
    tag?: string;
};

const PLANS: PlanInput[] = [
    {
        name: "Standard Package",
        price: "€150",
        users: 3,
        desc: "For a small team managing diamond or gemstone inventory.",
        features: ["Gem or Diamond module", "Up to 3 active users", "All 9 core platform features", "Custom roles and permissions", "Unlimited stones and documents"],
    },
    {
        name: "Premium Package",
        price: "€200",
        users: 7,
        desc: "For teams that need more users on one inventory module.",
        features: ["Gem or Diamond module", "Up to 7 active users", "All 9 core platform features", "Custom roles and permissions", "Unlimited stones and documents"],
    },
    {
        name: "Enterprise Package",
        price: "€250",
        users: 7,
        featured: true,
        tag: "Inventory + KYC",
        desc: "For teams managing both diamonds and gemstones, with customer and supplier KYC included.",
        features: ["Gem and Diamond modules", "Up to 7 active users", "All 17 platform features", "KYC application included", "Unlimited stones and documents"],
    },
];

function dotStyle(i: number, users: number): CSSProperties {
    const on = i <= users;
    const last = i === users;
    const base: CSSProperties = { position: "relative", zIndex: 1, boxSizing: "border-box", borderRadius: 999 };
    if (last) return { ...base, width: 22, height: 22, background: "#ffffff", border: "3px solid #317a51" };
    return { ...base, width: 12, height: 12, background: on ? "#317a51" : "#d3d8d6" };
}

function cardStyle(featured: boolean): CSSProperties {
    return {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 26,
        padding: "32px 30px",
        borderRadius: 26,
        background: "#ffffff",
        boxSizing: "border-box",
        ...(featured
            ? { border: "1px solid #cfe3d6", boxShadow: "0 0 0 6px #edf5f0, 0 30px 60px rgba(16,24,20,0.12)" }
            : { border: "1px solid #e6e9e8", boxShadow: "0 0 0 6px #f3f4f4, 0 16px 36px rgba(16,24,20,0.06)" }),
    };
}

function btnStyle(featured: boolean): CSSProperties {
    return {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
        minHeight: 54,
        padding: "6px 6px 6px 24px",
        borderRadius: 999,
        fontSize: 17,
        fontWeight: 600,
        boxSizing: "border-box",
        ...(featured
            ? { background: "linear-gradient(90deg, #245c3e 0%, #317a51 55%, #3f9463 100%)", boxShadow: "0 0 0 4px #ffffff, 0 0 0 5px #cfe3d6, 0 12px 26px rgba(44,111,75,0.3)" }
            : { background: "#111827", boxShadow: "0 0 0 4px #ffffff, 0 0 0 5px #dfe3e1, 0 12px 24px rgba(17,24,39,0.18)" }),
    };
}

function ArrowRight({ stroke }: { stroke: string }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
        </svg>
    );
}

function PlanCard({ plan }: { plan: PlanInput }) {
    const reduce = useReducedMotion();
    const featured = !!plan.featured;
    const pct = ((plan.users - 1) / (MAXU - 1)) * 100;
    const dots = Array.from({ length: MAXU }, (_, k) => k + 1);
    const trackRef = useRef<HTMLDivElement>(null);
    const trackInView = useInView(trackRef, { once: true, amount: 0.6 });

    return (
        <motion.article style={cardStyle(featured)} variants={itemVariants}>
            {featured && (
                <span style={{ position: "absolute", top: -16, right: 28, padding: "8px 16px", borderRadius: 999, background: "linear-gradient(90deg, #245c3e, #317a51 55%, #3f9463)", color: "#ffffff", fontSize: 13, fontWeight: 700, boxShadow: "0 8px 18px rgba(44,111,75,0.3)" }}>{plan.tag}</span>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 500, color: "#4f5753" }}>{plan.name}</h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontSize: 48, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10", lineHeight: 1.05 }}>{plan.price}</span>
                    <span style={{ fontSize: 16, color: "#5f6663" }}>/ month</span>
                </div>
                <p style={{ margin: "4px 0 0", fontSize: 15, lineHeight: 1.5, color: "#5f6663", minHeight: 68 }}>{plan.desc}</p>
            </div>

            {/* user capacity track */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div ref={trackRef} role="img" aria-label={`Up to ${plan.users} of ${MAXU} active users`} style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", height: 22 }}>
                    <span style={{ position: "absolute", left: 8, right: 8, top: 9, height: 4, borderRadius: 999, background: "#e3e6e5" }} />
                    <motion.span
                        style={{ position: "absolute", left: 8, top: 9, height: 4, borderRadius: 999, background: "#317a51", width: `calc((100% - 16px) * ${pct / 100})`, transformOrigin: "left center" }}
                        initial={reduce ? false : { scaleX: 0 }}
                        animate={reduce || trackInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
                    />
                    {dots.map((i) => (
                        <span key={i} style={dotStyle(i, plan.users)} />
                    ))}
                </div>
                <span style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 10, background: "linear-gradient(90deg, #245c3e, #317a51 60%, #3f9463)", color: "#ffffff", fontSize: 14, fontWeight: 600 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="9" cy="8" r="3.5" />
                        <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
                        <path d="M16 4.5a3.5 3.5 0 0 1 0 7" />
                        <path d="M21.5 20a6.5 6.5 0 0 0-4-6" />
                    </svg>
                    {`Up to ${plan.users} active users`}
                </span>
            </div>

            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                {plan.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15, lineHeight: 1.45, color: "#2b302e" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#317a51" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", marginTop: 1 }}>
                            <path d="m5 12 5 5L20 7" />
                        </svg>
                        <span>{f}</span>
                    </li>
                ))}
            </ul>

            <a className="cl-btn" href="/contact" style={btnStyle(featured)}>
                <span style={{ color: "#ffffff" }}>Book a Demo</span>
                <span style={{ width: 42, height: 42, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ArrowRight stroke={featured ? "#245c3e" : "#111827"} />
                </span>
            </a>
        </motion.article>
    );
}

export function Pricing() {
    return (
        <section className="v2-pricing" style={{ color: "#111114", background: "#fafafa", padding: "112px 24px 120px", boxSizing: "border-box" }}>
            <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", flexDirection: "column", gap: 64 }}>
                {/* heading */}
                <Reveal style={{ maxWidth: 820, margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 999, fontSize: 14, fontWeight: 600, color: "#111114", border: "2px solid transparent", background: "linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(90deg, #2c6f4b, #7fc88f, #36823a, #317a51) border-box" }}>
                        Pricing
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#111114" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="m9 6 6 6-6 6" />
                        </svg>
                    </span>
                    <h2 style={{ margin: 0, fontSize: "clamp(36px, 4.8vw, 66px)", lineHeight: 1.04, fontWeight: 600, letterSpacing: "-0.045em", color: "#0c0c10" }}>
                        Simple Pricing. <span style={{ color: "#6b6b75" }}>Choose What Your Business Needs.</span>
                    </h2>
                    <p style={{ margin: 0, maxWidth: 620, fontSize: "clamp(17px, 1.6vw, 20px)", lineHeight: 1.55, color: "#5f6663" }}>
                        Choose Gem or Diamond inventory for your team, or get both modules and KYC with Enterprise.
                    </p>
                </Reveal>

                {/* plans */}
                <Stagger className="cl-plans" stagger={0.12}>
                    {PLANS.map((p) => (
                        <PlanCard key={p.name} plan={p} />
                    ))}
                </Stagger>

                {/* bottom: unlimited + help */}
                <Stagger className="cl-bottom" stagger={0.1}>
                    <motion.div variants={itemVariants} style={{ display: "flex", gap: 18, alignItems: "flex-start", padding: 32, borderRadius: 24, background: "#ffffff", border: "1px solid #e6e9e8", boxSizing: "border-box" }}>
                        <span style={{ flex: "none", width: 52, height: 52, borderRadius: 16, background: "#111827", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M6 9a3 3 0 1 0 0 6c3 0 9-6 12-6a3 3 0 1 1 0 6c-3 0-9-6-12-6z" />
                            </svg>
                        </span>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <h3 style={{ margin: 0, fontSize: 22, lineHeight: 1.25, fontWeight: 600, letterSpacing: "-0.02em", color: "#0c0c10" }}>Unlimited Stones and Documents Across Every Package.</h3>
                            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#5f6663" }}>Choose your package based on the inventory modules, user capacity and onboarding tools your business needs.</p>
                        </div>
                    </motion.div>
                    <motion.div variants={itemVariants} style={{ display: "flex", flexDirection: "column", gap: 18, justifyContent: "space-between", padding: 32, borderRadius: 24, background: "#111827", color: "#ffffff", boxSizing: "border-box" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <h3 style={{ margin: 0, fontSize: 22, lineHeight: 1.25, fontWeight: 600, letterSpacing: "-0.02em", color: "#ffffff" }}>Need Help Choosing?</h3>
                            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.78)" }}>
                                Tell us what you trade, how many users need access and whether you need KYC. Explore the right package for your business in a product demo.
                            </p>
                        </div>
                        <a className="cl-btn" href="/contact" style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 14, padding: "6px 6px 6px 22px", borderRadius: 999, background: "#ffffff", color: "#111827", fontSize: 16, fontWeight: 700 }}>
                            <span style={{ color: "#111827" }}>Book a Demo</span>
                            <span style={{ width: 38, height: 38, borderRadius: 999, background: "#317a51", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <ArrowRight stroke="#ffffff" />
                            </span>
                        </a>
                    </motion.div>
                </Stagger>
            </div>
        </section>
    );
}
