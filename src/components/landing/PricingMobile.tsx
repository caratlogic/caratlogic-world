"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState, type CSSProperties } from "react";
import { EASE, Reveal, Stagger, itemVariants } from "./motion";
import "./pricing-mobile.css";

const MAXU = 7;

type PlanInput = {
    name: string;
    short: string;
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
        short: "Standard",
        price: "€150",
        users: 3,
        desc: "For a small team managing diamond or gemstone inventory.",
        features: ["1 inventory module of your choice", "Up to 3 active users", "1 free API key", "All 9 core platform features", "Custom roles and permissions", "Unlimited stones and documents"],
    },
    {
        name: "Premium Package",
        short: "Premium",
        price: "€200",
        users: 7,
        desc: "For teams that need more users on one inventory module.",
        features: ["1 inventory module of your choice", "Up to 7 active users", "1 free API key", "All 9 core platform features", "Custom roles and permissions", "Unlimited stones and documents"],
    },
    {
        name: "Enterprise Package",
        short: "Enterprise",
        price: "€250",
        users: 7,
        featured: true,
        tag: "Inventory + KYC",
        desc: "For teams that need every platform feature, with customer and supplier KYC included.",
        features: ["1 inventory module of your choice", "Up to 7 active users", "1 free API key", "All 17 platform features", "KYC application included", "Unlimited stones and documents"],
    },
];

const MODULES = ["Gem Inventory", "Natural Diamond Inventory", "Lab Grown Diamond Inventory"];

const ADDONS = [
    { name: "Extra inventory module", price: "+€50", desc: "Every package includes one inventory module. Add any of the other modules for €50 per module, per month.", tags: MODULES },
    { name: "Extra API key", price: "+€25", desc: "Every package includes 1 free API key. Each additional API key is €25 per key, per month.", tags: [] },
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
        gap: 22,
        padding: "28px 22px 22px",
        borderRadius: 24,
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
        padding: "6px 6px 6px 22px",
        borderRadius: 999,
        fontSize: 16,
        fontWeight: 600,
        boxSizing: "border-box",
        ...(featured
            ? { background: "linear-gradient(90deg, #245c3e 0%, #317a51 55%, #3f9463 100%)", boxShadow: "0 0 0 4px #ffffff, 0 0 0 5px #cfe3d6, 0 12px 26px rgba(44,111,75,0.3)" }
            : { background: "#111827", boxShadow: "0 0 0 4px #ffffff, 0 0 0 5px #dfe3e1, 0 12px 24px rgba(17,24,39,0.18)" }),
    };
}

function PlanCard({ plan }: { plan: PlanInput }) {
    const reduce = useReducedMotion();
    const featured = !!plan.featured;
    const pct = ((plan.users - 1) / (MAXU - 1)) * 100;
    const dots = Array.from({ length: MAXU }, (_, k) => k + 1);
    const trackRef = useRef<HTMLDivElement>(null);
    const trackInView = useInView(trackRef, { once: true, amount: 0.6 });

    return (
        <article style={cardStyle(featured)}>
            {featured && (
                <span style={{ position: "absolute", top: -15, right: 20, padding: "7px 14px", borderRadius: 999, background: "linear-gradient(90deg, #245c3e, #317a51 55%, #3f9463)", color: "#ffffff", fontSize: 13, fontWeight: 700, boxShadow: "0 8px 18px rgba(44,111,75,0.3)" }}>{plan.tag}</span>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 500, color: "#4f5753" }}>{plan.name}</h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontSize: 44, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10", lineHeight: 1.05 }}>{plan.price}</span>
                    <span style={{ fontSize: 16, color: "#5f6663" }}>/ month</span>
                </div>
                <p style={{ margin: "4px 0 0", fontSize: 15, lineHeight: 1.5, color: "#5f6663" }}>{plan.desc}</p>
            </div>

            {/* user capacity track */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div ref={trackRef} role="img" aria-label={`Up to ${plan.users} of ${MAXU} active users`} style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", height: 22 }}>
                    <span style={{ position: "absolute", left: 8, right: 8, top: 9, height: 4, borderRadius: 999, background: "#e3e6e5" }} />
                    <motion.span
                        style={{ position: "absolute", left: 8, top: 9, height: 4, borderRadius: 999, background: "#317a51", width: `calc((100% - 16px) * ${pct / 100})`, transformOrigin: "left center" }}
                        initial={reduce ? false : { scaleX: 0 }}
                        animate={reduce || trackInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
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

            <a className="cl-btn" href="/contact?tab=demo" style={btnStyle(featured)}>
                <span style={{ color: "#ffffff" }}>Book a Demo</span>
                <span style={{ width: 42, height: 42, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={featured ? "#245c3e" : "#111827"} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14" />
                        <path d="m13 6 6 6-6 6" />
                    </svg>
                </span>
            </a>
        </article>
    );
}

export function PricingMobile() {
    const [sel, setSel] = useState(2);
    const reduce = useReducedMotion();
    const plan = PLANS[sel];

    return (
        <section className="lp-pricing-m" style={{ color: "#111114", background: "#fafafa", padding: "64px 20px 72px", boxSizing: "border-box" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {/* heading */}
                <Reveal style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600, color: "#111114", border: "2px solid transparent", background: "linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(90deg, #2c6f4b, #7fc88f, #36823a, #317a51) border-box" }}>
                        Pricing
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#111114" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="m9 6 6 6-6 6" />
                        </svg>
                    </span>
                    <h2 style={{ margin: 0, fontSize: 34, lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.045em", color: "#0c0c10" }}>
                        Simple Pricing. <span style={{ color: "#6b6b75" }}>Choose What Your Business Needs.</span>
                    </h2>
                    <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#5f6663" }}>Every package includes one inventory module and 1 free API key. Add more modules for €50 or API keys for €25 a month.</p>
                </Reveal>

                {/* package switcher */}
                <Reveal delay={0.08} y={16}>
                    <div role="tablist" aria-label="Choose a package" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 4, padding: 5, borderRadius: 999, background: "#ffffff", border: "1px solid #e3e6e5", boxShadow: "0 6px 16px rgba(16,24,20,0.05)" }}>
                        {PLANS.map((p, i) => {
                            const on = i === sel;
                            return (
                                <button
                                    key={p.short}
                                    type="button"
                                    role="tab"
                                    id={`m-pricing-tab-${i}`}
                                    aria-selected={on}
                                    aria-controls="m-pricing-panel"
                                    onClick={() => setSel(i)}
                                    style={{ position: "relative", minHeight: 52, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1, border: "none", borderRadius: 999, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, background: "transparent", color: on ? "#ffffff" : "#3a403d", transition: "color .2s ease" }}
                                >
                                    {on && (
                                        <motion.span
                                            layoutId="m-pricing-pill"
                                            aria-hidden="true"
                                            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                                            style={{ position: "absolute", inset: 0, borderRadius: 999, background: "#111827", boxShadow: "0 6px 14px rgba(17,24,39,0.2)" }}
                                        />
                                    )}
                                    <span style={{ position: "relative" }}>{p.short}</span>
                                    <span style={{ position: "relative", fontSize: 11, fontWeight: 500, color: on ? "rgba(255,255,255,0.7)" : "#6b736f", transition: "color .2s ease" }}>{p.price}</span>
                                </button>
                            );
                        })}
                    </div>
                </Reveal>

                <div className="cl-plans" id="m-pricing-panel" role="tabpanel" aria-labelledby={`m-pricing-tab-${sel}`}>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={plan.name}
                            initial={reduce ? false : { opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -10 }}
                            transition={{ duration: 0.35, ease: EASE }}
                        >
                            <PlanCard plan={plan} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* add-ons */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <Reveal y={14}>
                        <h3 style={{ margin: 0, fontSize: 22, lineHeight: 1.2, fontWeight: 600, letterSpacing: "-0.02em", color: "#0c0c10", textAlign: "center" }}>Add-ons for any package</h3>
                    </Reveal>
                    <Stagger className="cl-bottom" stagger={0.1}>
                        {ADDONS.map((a) => (
                            <motion.div key={a.name} variants={itemVariants} style={{ display: "flex", flexDirection: "column", gap: 8, padding: 22, borderRadius: 22, background: "#ffffff", border: "1px solid #e6e9e8", boxSizing: "border-box" }}>
                                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                                    <h4 style={{ margin: 0, fontSize: 17, lineHeight: 1.25, fontWeight: 600, letterSpacing: "-0.02em", color: "#0c0c10" }}>{a.name}</h4>
                                    <span style={{ flex: "none", fontSize: 22, fontWeight: 600, letterSpacing: "-0.03em", color: "#0c0c10" }}>
                                        {a.price}
                                        <span style={{ fontSize: 13, fontWeight: 400, letterSpacing: 0, color: "#5f6663" }}> / month</span>
                                    </span>
                                </div>
                                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#5f6663" }}>{a.desc}</p>
                                {a.tags.length > 0 && (
                                    <ul aria-label="Available inventory modules" style={{ listStyle: "none", margin: "4px 0 0", padding: 0, display: "flex", flexWrap: "wrap", gap: 6 }}>
                                        {a.tags.map((t) => (
                                            <li key={t} style={{ padding: "5px 10px", borderRadius: 999, background: "#edf5f0", fontSize: 13, fontWeight: 500, color: "#245c3e" }}>
                                                {t}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </motion.div>
                        ))}
                    </Stagger>
                </div>

                {/* bottom: unlimited + help */}
                <Stagger className="cl-bottom" stagger={0.1}>
                    <motion.div variants={itemVariants} style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start", padding: 22, borderRadius: 22, background: "#ffffff", border: "1px solid #e6e9e8", boxSizing: "border-box" }}>
                        <span style={{ flex: "none", width: 44, height: 44, borderRadius: 14, background: "#111827", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M6 9a3 3 0 1 0 0 6c3 0 9-6 12-6a3 3 0 1 1 0 6c-3 0-9-6-12-6z" />
                            </svg>
                        </span>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <h3 style={{ margin: 0, fontSize: 20, lineHeight: 1.25, fontWeight: 600, letterSpacing: "-0.02em", color: "#0c0c10" }}>Unlimited Stones and Documents Across Every Package.</h3>
                            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#5f6663" }}>Choose your package based on user capacity and onboarding tools, then add the inventory modules and API keys your business needs.</p>
                        </div>
                    </motion.div>
                    <motion.div variants={itemVariants} style={{ display: "flex", flexDirection: "column", gap: 18, justifyContent: "space-between", padding: "24px 22px", borderRadius: 22, background: "#111827", color: "#ffffff", boxSizing: "border-box" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <h3 style={{ margin: 0, fontSize: 20, lineHeight: 1.25, fontWeight: 600, letterSpacing: "-0.02em", color: "#ffffff" }}>Need Help Choosing?</h3>
                            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.78)" }}>
                                Tell us what you trade, how many users need access and whether you need KYC. Explore the right package for your business in a product demo.
                            </p>
                        </div>
                    </motion.div>
                </Stagger>
            </div>
        </section>
    );
}
