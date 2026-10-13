"use client";

import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { EASE, Reveal, itemVariants } from "./motion";
import "./demo.css";

type ProductKey = "inv" | "kyc";
type Step = { title: string; text: string; img?: string; alt?: string };

const OVERVIEW = "/design/c6a0c46d2279b4f4a50c7f3c24e7654e.png";
const GEM = "/design/e5a1514f91ab1fcbfab688c2326f4ede.png";
const DIA = "/design/4ab4f19bef96cbb04e1be7acf468e253.png";

const STEPS: Record<ProductKey, Step[]> = {
    kyc: [
        { title: "Assign a form", text: "Choose a KYC form and send it to a customer or supplier by email." },
        { title: "Contact completes the submission", text: "The contact verifies access, fills in their details, uploads documents and can save progress to finish later." },
        { title: "Review its status", text: "Follow the submission through review, approval and renewal." },
    ],
    inv: [
        { title: "Find a stone", text: "Search by stock ID, shape or carat to find the stone a buyer is asking about.", img: DIA, alt: "Diamond inventory list" },
        { title: "Check its status", text: "See whether it’s in stock, out on memo or sold.", img: GEM, alt: "Gem inventory list with stock status" },
        { title: "Review a memo", text: "See what’s out on memo, with stones and carats for each memo.", img: OVERVIEW, alt: "Business overview showing memo exposure" },
        { title: "See outstanding payments", text: "Check receivables and what’s still owed from the business overview.", img: OVERVIEW, alt: "Business overview showing receivables outstanding" },
    ],
};

const PRODUCTS: { key: ProductKey; label: string; sub: string; meta: string }[] = [
    { key: "inv", label: "Carat Logic Inventory", sub: "Stock, memos, orders and payments", meta: "4-step walkthrough" },
    { key: "kyc", label: "Carat Logic KYC", sub: "Forms, documents, review and renewal", meta: "3-step walkthrough" },
];

const chip = (bg: string, fg: string): CSSProperties => ({ display: "inline-block", padding: "3px 9px", borderRadius: 999, fontSize: 11, fontWeight: 600, background: bg, color: fg });

const STATUS: Record<string, CSSProperties> = {
    Approved: chip("#e3f1e7", "#245c3e"),
    "In review": chip("#e6eefc", "#1f4fa8"),
    "Docs pending": chip("#fdf0d8", "#8a5300"),
    "Form sent": chip("#f0f2f1", "#3a403d"),
    "Renewal due": chip("#fde7e7", "#a12c2c"),
};

const KYC_ROWS = [
    ["Shah Diamonds", "Customer", "KYC v3", "Approved"],
    ["Gemline LLP", "Supplier", "KYC v3", "In review"],
    ["Aurum Jewels", "Customer", "KYC v2", "Docs pending"],
    ["Orion Jewellers", "Customer", "KYC v3", "Form sent"],
    ["Navkar Gems", "Supplier", "KYC v3", "Renewal due"],
] as const;

const STEP_MS = 4000;

const pickGroup: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

function chipBtn(on: boolean): CSSProperties {
    return {
        minHeight: 44,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 18px 8px 10px",
        borderRadius: 999,
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: 15,
        fontWeight: 600,
        ...(on ? { background: "#ffffff", color: "#0f2a1d", border: "1px solid #ffffff" } : { background: "transparent", color: "#ffffff", border: "1px solid rgba(255,255,255,0.4)" }),
    };
}

function tick(on: boolean): CSSProperties {
    return {
        width: 22,
        height: 22,
        borderRadius: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 700,
        ...(on ? { background: "#317a51", color: "#ffffff" } : { background: "rgba(255,255,255,0.12)", color: "transparent" }),
    };
}

const stepBadge: CSSProperties = { width: 22, height: 22, borderRadius: 999, background: "#111827", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 };
const fieldLabel: CSSProperties = { fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)" };

function PlayIcon({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#245c3e" aria-hidden="true">
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
        </svg>
    );
}

export function Demo() {
    const reduce = useReducedMotion();
    const [product, setProduct] = useState<ProductKey>("inv");
    const [chapter, setChapter] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [interestInv, setInterestInv] = useState(true);
    const [interestKyc, setInterestKyc] = useState(false);
    const [sent, setSent] = useState(false);

    const steps = STEPS[product];
    const stepCount = steps.length;
    const cur = steps[Math.min(chapter, stepCount - 1)];
    const productName = product === "kyc" ? "KYC" : "Inventory";
    const interestText = interestInv && interestKyc ? "Inventory and KYC" : interestKyc ? "KYC" : "Inventory";

    // Auto-advance the walkthrough every 4s while playing; stop and rewind after the last step.
    useEffect(() => {
        if (!playing) return;
        const t = window.setTimeout(() => {
            if (chapter + 1 >= stepCount) {
                setPlaying(false);
                setChapter(0);
            } else {
                setChapter(chapter + 1);
            }
        }, STEP_MS);
        return () => window.clearTimeout(t);
    }, [playing, chapter, stepCount]);

    const pickProduct = (key: ProductKey) => {
        setProduct(key);
        setChapter(0);
        setPlaying(false);
        if (key === "inv") setInterestInv(true);
        else setInterestKyc(true);
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: wire to /api
        setSent(true);
    };

    const fade = { duration: reduce ? 0 : 0.35, ease: EASE };
    const layoutTransition = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 420, damping: 38 };
    const posterKey = product === "kyc" ? "kyc" : cur.img || OVERVIEW;

    return (
        <section className="v2-demo" style={{ color: "#111114", background: "#ffffff", padding: "120px 24px", boxSizing: "border-box" }}>
            <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", flexDirection: "column", gap: 40 }}>
                {/* heading */}
                <div className="cl-head">
                    <Reveal style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <span style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "#eef6f0", border: "1px solid rgba(49,122,81,0.3)", fontSize: 13, fontWeight: 600, color: "#245c3e" }}>
                            <PlayIcon size={14} />
                            Product walkthrough
                        </span>
                        <h2 style={{ margin: 0, fontSize: "clamp(34px, 4.4vw, 60px)", lineHeight: 1.04, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>See How Carat Logic Fits Your Business.</h2>
                    </Reveal>
                    <Reveal delay={0.1} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                        <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55, color: "#5f6663" }}>Explore the software through a short walkthrough, then book a demo to discuss the tasks and requirements that matter to your team.</p>
                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 600, color: "#3a403d" }}>
                            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <span style={stepBadge}>1</span>Pick a product
                            </span>
                            <span style={{ width: 20, height: 1, background: "#c9d3ce" }} aria-hidden="true" />
                            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <span style={stepBadge}>2</span>Watch — no sign-up
                            </span>
                            <span style={{ width: 20, height: 1, background: "#c9d3ce" }} aria-hidden="true" />
                            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <span style={{ ...stepBadge, background: "#317a51" }}>3</span>Book a demo
                            </span>
                        </div>
                    </Reveal>
                </div>

                {/* product selector cards */}
                <motion.div className="cl-pick" role="tablist" aria-label="Choose a product" variants={pickGroup} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                    {PRODUCTS.map((p) => {
                        const on = p.key === product;
                        return (
                            <motion.button
                                key={p.key}
                                type="button"
                                role="tab"
                                aria-selected={on}
                                className="cl-card"
                                onClick={() => pickProduct(p.key)}
                                variants={itemVariants}
                                whileTap={reduce ? undefined : { scale: 0.985 }}
                                style={{
                                    minHeight: 92,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 16,
                                    padding: "18px 20px",
                                    borderRadius: 22,
                                    cursor: "pointer",
                                    fontFamily: "inherit",
                                    textAlign: "left",
                                    ...(on ? { background: "#111827", color: "#ffffff", border: "1px solid #111827", boxShadow: "0 18px 36px rgba(17,24,39,0.22)" } : { background: "#ffffff", color: "#0c0c10", border: "1px solid #e0e7e3" }),
                                }}
                            >
                                <span style={{ flex: "none", width: 52, height: 52, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", background: on ? "#317a51" : "#eef6f0" }}>
                                    {p.key === "inv" ? (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={on ? "#ffffff" : "#245c3e"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M6 3h12l4 6-10 12L2 9z" />
                                            <path d="M2 9h20" />
                                            <path d="M12 21 8 9l4-6 4 6-4 12" />
                                        </svg>
                                    ) : (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={on ? "#ffffff" : "#245c3e"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                            <path d="m9 12 2 2 4-4" />
                                        </svg>
                                    )}
                                </span>
                                <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, textAlign: "left" }}>
                                    <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>{p.label}</span>
                                    <span style={{ fontSize: 14, color: on ? "rgba(255,255,255,0.72)" : "#5f6663" }}>{p.sub}</span>
                                </span>
                                <span style={{ flex: "none", padding: "6px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600, ...(on ? { background: "rgba(143,224,165,0.18)", color: "#8fe0a5" } : { background: "#f1f5f2", color: "#4f5753" }) }}>{p.meta}</span>
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* stage */}
                <Reveal style={{ borderRadius: 32, padding: 28, background: "#f5f6f6", border: "1px solid #e7e9e8", boxSizing: "border-box" }}>
                    <div className="cl-stage">
                        {/* playlist */}
                        <div className="cl-list" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2c6f4b", padding: "4px 4px 6px" }}>
                                {productName} walkthrough · {stepCount} steps
                            </span>
                            {steps.map((st, i) => {
                                const on = i === chapter;
                                const done = i < chapter;
                                return (
                                    <motion.button
                                        key={`${product}-${i}`}
                                        type="button"
                                        onClick={() => setChapter(i)}
                                        aria-pressed={on}
                                        style={{ position: "relative", display: "flex", flexDirection: "column", gap: 10, width: "100%", padding: 16, borderRadius: 18, cursor: "pointer", fontFamily: "inherit", textAlign: "left", background: "transparent", border: "1px solid transparent" }}
                                    >
                                        {/* active card surface — slides between chapters */}
                                        {on && (
                                            <motion.span
                                                layoutId="v2-demo-chapter"
                                                aria-hidden="true"
                                                transition={layoutTransition}
                                                style={{ position: "absolute", inset: -1, borderRadius: 18, background: "#ffffff", border: "1px solid #cfe2d5", boxShadow: "0 14px 30px rgba(16,40,28,0.1)", boxSizing: "border-box" }}
                                            />
                                        )}
                                        <span style={{ position: "relative", display: "flex", gap: 14, alignItems: "flex-start" }}>
                                            <span
                                                style={{
                                                    flex: "none",
                                                    width: 30,
                                                    height: 30,
                                                    borderRadius: 999,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: 13,
                                                    fontWeight: 700,
                                                    ...(on ? { background: "#317a51", color: "#ffffff" } : done ? { background: "#cfe8d6", color: "#245c3e" } : { background: "#ffffff", color: "#4f5753", border: "1px solid #d6dfda", boxSizing: "border-box" }),
                                                }}
                                            >
                                                {done ? "✓" : String(i + 1)}
                                            </span>
                                            <span style={{ display: "flex", flexDirection: "column", gap: 6, textAlign: "left" }}>
                                                <span style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3, color: "#0c0c10" }}>{st.title}</span>
                                                <AnimatePresence initial={false}>
                                                    {on && (
                                                        <motion.span
                                                            key="text"
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: "auto" }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={fade}
                                                            style={{ display: "block", overflow: "hidden", fontSize: 14, lineHeight: 1.5, color: "#4f5753" }}
                                                        >
                                                            {st.text}
                                                        </motion.span>
                                                    )}
                                                </AnimatePresence>
                                            </span>
                                        </span>
                                        {on && (
                                            <span style={{ position: "relative", display: "block", height: 4, borderRadius: 999, background: "#e3ece6", overflow: "hidden", marginTop: 4 }}>
                                                {playing ? (
                                                    <motion.span
                                                        key={`fill-${product}-${chapter}`}
                                                        initial={{ width: "0%" }}
                                                        animate={{ width: "100%" }}
                                                        transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                                                        style={{ display: "block", height: "100%", borderRadius: 999, background: "#317a51" }}
                                                    />
                                                ) : (
                                                    <span style={{ display: "block", height: "100%", borderRadius: 999, background: "#317a51", width: "100%" }} />
                                                )}
                                            </span>
                                        )}
                                    </motion.button>
                                );
                            })}
                            <span style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 8, padding: "12px 4px 0", fontSize: 13, color: "#4f5753" }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2c6f4b" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="m5 12 5 5L20 7" />
                                </svg>
                                Watch the whole walkthrough — no form needed.
                            </span>
                        </div>

                        {/* player */}
                        <div style={{ display: "flex", flexDirection: "column", borderRadius: 20, overflow: "hidden", background: "#ffffff", boxShadow: "0 1px 0 rgba(255,255,255,0.8) inset, 0 30px 60px rgba(16,40,28,0.18)", border: "1px solid #dfe8e2" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: "1px solid #eef1ef", background: "#fbfcfb" }}>
                                <span style={{ display: "flex", gap: 7 }} aria-hidden="true">
                                    <span style={{ width: 11, height: 11, borderRadius: 999, background: "#ff5f57" }} />
                                    <span style={{ width: 11, height: 11, borderRadius: 999, background: "#febc2e" }} />
                                    <span style={{ width: 11, height: 11, borderRadius: 999, background: "#28c840" }} />
                                </span>
                                <span style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                                    <span style={{ padding: "5px 14px", borderRadius: 8, background: "#f0f3f1", fontSize: 12, fontWeight: 500, color: "#4f5753" }}>Carat Logic · {productName}</span>
                                </span>
                                <span style={{ fontSize: 12, fontWeight: 600, color: "#2c6f4b" }}>
                                    Step {chapter + 1}/{stepCount}
                                </span>
                            </div>

                            <div style={{ position: "relative", aspectRatio: "16 / 10", background: "#f7f9f8", overflow: "hidden" }}>
                                <AnimatePresence initial={false}>
                                    <motion.div key={posterKey} initial={{ opacity: 0, scale: 1.015 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.45, ease: EASE }} style={{ position: "absolute", inset: 0 }}>
                                        {product !== "kyc" ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img src={cur.img || OVERVIEW} alt={cur.alt || ""} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "left top" }} />
                                        ) : (
                                            <div style={{ height: "100%", display: "flex", fontSize: 12 }}>
                                                <div style={{ width: "22%", background: "#ffffff", borderRight: "1px solid #e6ebe8", padding: "16px 12px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 6 }}>
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src="/design/a0624d387c799bef34880b03ced88e69.webp" alt="" style={{ height: 22, width: "auto", alignSelf: "flex-start", marginBottom: 12 }} />
                                                    <span style={{ color: "#5f6663", padding: "6px 8px" }}>Dashboard</span>
                                                    <span style={{ color: "#ffffff", background: "#2f7a50", borderRadius: 8, padding: "6px 8px", fontWeight: 600 }}>KYC Submissions</span>
                                                    <span style={{ color: "#5f6663", padding: "6px 8px" }}>Form Builder</span>
                                                    <span style={{ color: "#5f6663", padding: "6px 8px" }}>Business Contacts</span>
                                                    <span style={{ color: "#5f6663", padding: "6px 8px" }}>Renewals</span>
                                                </div>
                                                <div style={{ flex: 1, padding: "18px 20px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 12 }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                        <span style={{ fontSize: 16, fontWeight: 600, color: "#0c0c10" }}>KYC Submissions</span>
                                                        <span style={{ padding: "7px 12px", borderRadius: 8, background: "#2f7a50", color: "#ffffff", fontWeight: 600 }}>+ Assign Form</span>
                                                    </div>
                                                    <div style={{ background: "#ffffff", border: "1px solid #e6ebe8", borderRadius: 12, overflow: "hidden" }}>
                                                        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.9fr 0.8fr 1fr", gap: 8, padding: "10px 14px", background: "#f3f6f4", fontWeight: 600, color: "#4a514e" }}>
                                                            <span>Business contact</span>
                                                            <span>Type</span>
                                                            <span>Form</span>
                                                            <span>Status</span>
                                                        </div>
                                                        {KYC_ROWS.map(([name, type, form, status], i) => (
                                                            <motion.div
                                                                key={name}
                                                                initial={reduce ? false : { opacity: 0, y: 8 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ duration: 0.4, ease: EASE, delay: 0.15 + i * 0.06 }}
                                                                style={{ display: "grid", gridTemplateColumns: "1.5fr 0.9fr 0.8fr 1fr", gap: 8, padding: "11px 14px", borderTop: "1px solid #eef1ef", alignItems: "center" }}
                                                            >
                                                                <span style={{ fontWeight: 600, color: "#1d2320" }}>{name}</span>
                                                                <span style={{ color: "#5f6663" }}>{type}</span>
                                                                <span style={{ color: "#1f4fa8" }}>{form}</span>
                                                                <span>
                                                                    <span style={STATUS[status]}>{status}</span>
                                                                </span>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>

                                <AnimatePresence initial={false}>
                                    {!playing ? (
                                        <motion.div
                                            key="idle"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={fade}
                                            style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 60% at 50% 50%, rgba(10,12,14,0.3) 0%, rgba(10,12,14,0.5) 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}
                                        >
                                            <motion.button
                                                type="button"
                                                className="cl-pulse"
                                                onClick={() => setPlaying(true)}
                                                aria-label={`Play the ${productName} walkthrough`}
                                                whileHover={reduce ? undefined : { scale: 1.06 }}
                                                whileTap={reduce ? undefined : { scale: 0.95 }}
                                                style={{ width: 92, height: 92, borderRadius: 999, border: "none", cursor: "pointer", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}
                                            >
                                                <PlayIcon size={32} />
                                            </motion.button>
                                            <span style={{ padding: "8px 16px", borderRadius: 999, background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.35)", color: "#ffffff", fontSize: 14, fontWeight: 600 }}>Watch the {productName} walkthrough</span>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fade}>
                                            <AnimatePresence mode="wait" initial={false}>
                                                <motion.div
                                                    key={`cap-${product}-${chapter}`}
                                                    initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: reduce ? 0 : -6 }}
                                                    transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
                                                    style={{ position: "absolute", left: 18, bottom: 18, maxWidth: "70%", padding: "14px 18px", borderRadius: 16, background: "rgba(12,12,16,0.86)", color: "#ffffff", display: "flex", flexDirection: "column", gap: 4, boxShadow: "0 12px 30px rgba(0,0,0,0.25)" }}
                                                >
                                                    <span style={{ fontSize: 12, fontWeight: 600, color: "#8fe0a5" }}>
                                                        Step {chapter + 1} · {cur.title}
                                                    </span>
                                                    <span style={{ fontSize: 14, lineHeight: 1.45, color: "rgba(255,255,255,0.88)" }}>{cur.text}</span>
                                                </motion.div>
                                            </AnimatePresence>
                                            <button type="button" onClick={() => setPlaying((v) => !v)} aria-label="Pause walkthrough" style={{ position: "absolute", right: 18, bottom: 18, width: 44, height: 44, borderRadius: 999, border: "none", cursor: "pointer", background: "rgba(12,12,16,0.86)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
                                                    <rect x="6" y="5" width="4" height="14" rx="1" />
                                                    <rect x="14" y="5" width="4" height="14" rx="1" />
                                                </svg>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* demo bar */}
                <Reveal style={{ position: "relative", overflow: "hidden", borderRadius: 32, padding: 40, boxSizing: "border-box", background: "#111827", color: "#ffffff" }}>
                    <AnimatePresence mode="wait" initial={false}>
                        {!sent ? (
                            <motion.form
                                key="form"
                                onSubmit={onSubmit}
                                initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: reduce ? 0 : -12 }}
                                transition={fade}
                                style={{ display: "flex", flexDirection: "column", gap: 26 }}
                            >
                                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 20 }}>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 560 }}>
                                        <h3 style={{ margin: 0, fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.03em", color: "#ffffff" }}>Ready for a Closer Look?</h3>
                                        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "rgba(255,255,255,0.8)" }}>Choose Inventory, KYC or both, and bring your questions to a product demo.</p>
                                    </div>
                                    <fieldset style={{ border: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
                                        <legend style={{ padding: 0, margin: "0 0 10px", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>I’m interested in</legend>
                                        <button type="button" className="cl-chip" aria-pressed={interestInv} onClick={() => setInterestInv((v) => !v)} style={chipBtn(interestInv)}>
                                            <span style={tick(interestInv)}>✓</span>Inventory
                                        </button>
                                        <button type="button" className="cl-chip" aria-pressed={interestKyc} onClick={() => setInterestKyc((v) => !v)} style={chipBtn(interestKyc)}>
                                            <span style={tick(interestKyc)}>✓</span>KYC
                                        </button>
                                    </fieldset>
                                </div>
                                <div className="cl-form">
                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                        <label htmlFor="cl-name" style={fieldLabel}>
                                            Name
                                        </label>
                                        <input id="cl-name" className="cl-in" type="text" name="name" autoComplete="name" required placeholder="Your full name" />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                        <label htmlFor="cl-email" style={fieldLabel}>
                                            Work email
                                        </label>
                                        <input id="cl-email" className="cl-in" type="email" name="email" autoComplete="email" required placeholder="you@company.com" />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                        <label htmlFor="cl-company" style={fieldLabel}>
                                            Company <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>(optional)</span>
                                        </label>
                                        <input id="cl-company" className="cl-in" type="text" name="company" autoComplete="organization" placeholder="Your company" />
                                    </div>
                                    <motion.button
                                        type="submit"
                                        whileHover={reduce ? undefined : { y: -2 }}
                                        whileTap={reduce ? undefined : { scale: 0.97 }}
                                        style={{ minHeight: 52, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "6px 6px 6px 24px", border: "none", borderRadius: 999, cursor: "pointer", background: "#ffffff", color: "#111827", font: "inherit", fontSize: 17, fontWeight: 700, whiteSpace: "nowrap", boxShadow: "0 12px 26px rgba(0,0,0,0.25)" }}
                                    >
                                        <span>Book a Demo</span>
                                        <span style={{ width: 40, height: 40, borderRadius: 999, background: "#317a51", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                <path d="M5 12h14" />
                                                <path d="m13 6 6 6-6 6" />
                                            </svg>
                                        </span>
                                    </motion.button>
                                </div>
                                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>We’ll use your details only to arrange your demo.</span>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="sent"
                                role="status"
                                initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: reduce ? 0 : -12 }}
                                transition={fade}
                                style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                                    <motion.span
                                        initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ type: "spring", stiffness: 380, damping: 22, delay: 0.1 }}
                                        style={{ flex: "none", width: 56, height: 56, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}
                                    >
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#245c3e" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <motion.path d="m5 12 5 5L20 7" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, ease: EASE, delay: 0.25 }} />
                                        </svg>
                                    </motion.span>
                                    <span style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                        <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", color: "#ffffff" }}>Thanks — we’ll be in touch.</span>
                                        <span style={{ fontSize: 16, color: "rgba(255,255,255,0.8)" }}>We’ll contact you to schedule your {interestText} demo.</span>
                                    </span>
                                </div>
                                <button type="button" onClick={() => setSent(false)} style={{ minHeight: 46, padding: "10px 20px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.4)", background: "transparent", font: "inherit", fontSize: 15, fontWeight: 600, color: "#ffffff", cursor: "pointer" }}>
                                    Send another request
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Reveal>
            </div>
        </section>
    );
}
