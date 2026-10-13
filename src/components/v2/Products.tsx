"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE, Reveal, Stagger, StaggerItem } from "./motion";
import "./products.css";

/* ---------- shared styles ---------- */

const badge: CSSProperties = { alignSelf: "flex-start", padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(49,122,81,0.35)", background: "#eef6f0", fontSize: 13, fontWeight: 600, color: "#245c3e" };
const h2: CSSProperties = { margin: 0, fontSize: "clamp(32px, 3.6vw, 48px)", lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.03em", color: "#0c0c10" };
const lead: CSSProperties = { margin: 0, fontSize: 17, lineHeight: 1.6, color: "#5f6663" };
const detailsLink: CSSProperties = { alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 8, marginTop: 8, fontSize: 16, fontWeight: 600, color: "#245c3e", borderBottom: "1px solid rgba(36,92,62,0.4)", paddingBottom: 3 };
const panel: CSSProperties = { position: "relative", borderRadius: 28, padding: 28, background: "#f4f5f5", border: "1px solid #e7e9e8", boxSizing: "border-box" };
const frame: CSSProperties = { borderRadius: 18, padding: 8, background: "#ffffff", border: "1px solid #e3e6e5", boxShadow: "0 24px 50px rgba(16,24,20,0.14)" };
const callout: CSSProperties = { position: "absolute", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 14, background: "#ffffff", color: "#0c0c10", boxShadow: "0 16px 36px rgba(16,40,28,0.18)", border: "1px solid #e3e9e5" };
const calloutIcon = (bg: string): CSSProperties => ({ width: 32, height: 32, borderRadius: 9, background: bg, display: "flex", alignItems: "center", justifyContent: "center" });

const STATUS: Record<string, [string, string]> = {
    "In stock": ["#e3f1e7", "#245c3e"],
    Available: ["#e3f1e7", "#245c3e"],
    "On memo": ["#fdf0d8", "#8a5300"],
    Sold: ["#fde7e7", "#a12c2c"],
    Approved: ["#e3f1e7", "#245c3e"],
    "In review": ["#e6eefc", "#1f4fa8"],
    "Docs pending": ["#fdf0d8", "#8a5300"],
    "Renewal due": ["#fde7e7", "#a12c2c"],
    Invited: ["#f0f2f1", "#3a403d"],
};
function chip(s: string): CSSProperties {
    const [bg, fg] = STATUS[s] ?? STATUS.Invited;
    return { display: "inline-block", padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, background: bg, color: fg };
}

function Icon({ size, stroke, width, children }: { size: number; stroke: string; width: number; children: ReactNode }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {children}
        </svg>
    );
}

/* ---------- feature list ---------- */

type Feature = { icon: ReactNode; title: string; desc: string };

function FeatureList({ items }: { items: Feature[] }) {
    return (
        <Stagger style={{ display: "flex", flexDirection: "column", marginTop: 12 }} stagger={0.12}>
            {items.map((f, i) => {
                const first = i === 0;
                const last = i === items.length - 1;
                return (
                    <StaggerItem key={f.title} style={{ display: "flex", gap: 18, padding: last ? "4px 0 6px 22px" : "4px 0 26px 22px", borderLeft: `2px solid ${first ? "#317a51" : "#dfe7e2"}` }}>
                        <span style={{ flex: "none", width: 44, height: 44, borderRadius: 12, background: first ? "#e3f1e7" : "#f1f5f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon size={22} stroke="#2c6f4b" width={2}>
                                {f.icon}
                            </Icon>
                        </span>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <h3 style={{ margin: 0, fontSize: 21, fontWeight: 600, color: "#0c0c10" }}>{f.title}</h3>
                            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#5f6663" }}>{f.desc}</p>
                        </div>
                    </StaggerItem>
                );
            })}
        </Stagger>
    );
}

function TextColumn({ tag, title, intro, features }: { tag: string; title: string; intro: string; features: Feature[] }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <Reveal as="span" style={badge}>
                {tag}
            </Reveal>
            <Reveal delay={0.05}>
                <h2 style={h2}>{title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
                <p style={lead}>{intro}</p>
            </Reveal>
            <FeatureList items={features} />
            <a href="#" style={detailsLink}>
                View Details <span aria-hidden="true">→</span>
            </a>
        </div>
    );
}

const INVENTORY_FEATURES: Feature[] = [
    {
        icon: (
            <>
                <path d="M6 3h12l4 6-10 12L2 9z" />
                <path d="M2 9h20" />
            </>
        ),
        title: "Know What’s Available to Sell",
        desc: "Keep stone details, pricing and stock status together. Check what’s available, out on memo or sold when a buyer enquires.",
    },
    {
        icon: (
            <>
                <path d="m22 2-7 20-4-9-9-4z" />
                <path d="M22 2 11 13" />
            </>
        ),
        title: "Keep Memos and Orders Organised",
        desc: "Track stones sent on memo, manage orders and sales, and keep customer and supplier records close at hand.",
    },
    {
        icon: (
            <>
                <path d="M3 3v18h18" />
                <path d="m7 15 4-4 3 3 6-6" />
            </>
        ),
        title: "See Where Your Money Stands",
        desc: "Monitor invoices, payments and outstanding balances. Use the business dashboard to review stock value, receivables and payables.",
    },
];

const KYC_FEATURES: Feature[] = [
    {
        icon: (
            <>
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path d="M8 8h8" />
                <path d="M8 12h8" />
                <path d="M8 16h5" />
            </>
        ),
        title: "Build Forms Around Your Requirements",
        desc: "Create custom, multi-page KYC forms with the fields and document requests your business needs. Manage published versions as your requirements change.",
    },
    {
        icon: (
            <>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
            </>
        ),
        title: "Send Forms and Collect Documents",
        desc: "Assign forms to business contacts and send email invitations. Contacts can verify access, complete their details, upload documents and return to finish saved progress.",
    },
    {
        icon: (
            <>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
            </>
        ),
        title: "Keep Reviews and Renewals Moving",
        desc: "Follow each submission through your review and approval workflow. Use reminders to follow up on incomplete forms and track renewal requests.",
    },
];

/* ---------- inventory slider ---------- */

const SLIDES = [
    { label: "Business Overview", src: "/design/c6a0c46d2279b4f4a50c7f3c24e7654e.png", alt: "Carat Logic Business Overview dashboard" },
    { label: "Gem Inventory", src: "/design/e5a1514f91ab1fcbfab688c2326f4ede.png", alt: "Carat Logic Gem Inventory screen listing gemstones with shape, gem type, carat and stock type" },
    { label: "Diamond Inventory", src: "/design/4ab4f19bef96cbb04e1be7acf468e253.png", alt: "Carat Logic Diamond Inventory screen listing natural diamonds with shape, colour, stock type and status" },
];

const OVERVIEW_CALLOUTS = [
    { pos: { left: -26, top: 150 }, bg: "#e3f1e7", stroke: "#245c3e", icon: (<><path d="M6 3h12l4 6-10 12L2 9z" /><path d="M2 9h20" /></>), label: "Stock value at cost", value: "$2.1M" },
    { pos: { right: -24, top: 230 }, bg: "#e6eefc", stroke: "#1f4fa8", icon: (<><path d="m22 2-7 20-4-9-9-4z" /><path d="M22 2 11 13" /></>), label: "Stock on memo", value: "$1.2M" },
    { pos: { left: 60, bottom: -22 }, bg: "#fdf0d8", stroke: "#8a5300", icon: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /></>), label: "Outstanding balances", value: "$2.8M" },
];

function InventorySlider({ autoplay = true }: { autoplay?: boolean }) {
    const reduce = useReducedMotion();
    const [slide, setSlide] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (!autoplay || paused) return;
        const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
        return () => clearInterval(t);
    }, [autoplay, paused]);

    const fast = reduce ? { duration: 0 } : { duration: 0.45, ease: EASE };

    return (
        <Reveal delay={0.1} style={{ ...panel, display: "flex", flexDirection: "column", gap: 18 }}>
            <div role="tablist" aria-label="Inventory screens" style={{ display: "flex", gap: 6, padding: 5, borderRadius: 999, background: "#ffffff", border: "1px solid #e3e6e5", alignSelf: "center", flexWrap: "wrap", justifyContent: "center" }}>
                {SLIDES.map((s, i) => {
                    const on = i === slide;
                    return (
                        <button
                            key={s.label}
                            type="button"
                            role="tab"
                            aria-selected={on}
                            onClick={() => {
                                setSlide(i);
                                setPaused(true);
                            }}
                            style={{ position: "relative", minHeight: 36, padding: "8px 16px", borderRadius: 999, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, background: "transparent", color: on ? "#ffffff" : "#3a403d", transition: reduce ? undefined : "color .3s ease" }}
                        >
                            {on && <motion.span layoutId="v2-products-tab" aria-hidden="true" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }} style={{ position: "absolute", inset: 0, borderRadius: 999, background: "#111827" }} />}
                            <span style={{ position: "relative" }}>{s.label}</span>
                        </button>
                    );
                })}
            </div>

            <div style={{ position: "relative", ...frame }}>
                <div style={{ height: 400, borderRadius: 12, overflow: "hidden", background: "#ffffff", position: "relative" }}>
                    <AnimatePresence initial={false}>
                        <motion.img
                            key={slide}
                            src={SLIDES[slide].src}
                            alt={SLIDES[slide].alt}
                            initial={{ opacity: 0, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={fast}
                            style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "left top", transformOrigin: "left top" }}
                        />
                    </AnimatePresence>
                </div>
            </div>

            {/* callouts (overview slide) */}
            <AnimatePresence>
                {slide === 0 &&
                    OVERVIEW_CALLOUTS.map((c, i) => (
                        <motion.div
                            key={c.label}
                            className="cl-call"
                            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.96 }}
                            transition={reduce ? { duration: 0 } : { duration: 0.4, ease: EASE, delay: 0.08 * i }}
                            style={{ ...callout, ...c.pos }}
                        >
                            <span style={calloutIcon(c.bg)}>
                                <Icon size={16} stroke={c.stroke} width={2.2}>
                                    {c.icon}
                                </Icon>
                            </span>
                            <span style={{ display: "flex", flexDirection: "column" }}>
                                <span style={{ fontSize: 12, color: "#5f6663" }}>{c.label}</span>
                                <span style={{ fontSize: 17, fontWeight: 700 }}>{c.value}</span>
                            </span>
                        </motion.div>
                    ))}
            </AnimatePresence>

            <div style={{ display: "flex", justifyContent: "center", gap: 8 }} aria-hidden="true">
                {SLIDES.map((s, i) => {
                    const on = i === slide;
                    return <motion.span key={s.label} initial={false} animate={{ width: on ? 24 : 8, backgroundColor: on ? "#111827" : "#c9cfcc" }} transition={fast} style={{ height: 8, borderRadius: 999 }} />;
                })}
            </div>
        </Reveal>
    );
}

/* ---------- KYC visual ---------- */

const KYC: [string, string, string, string][] = [
    ["Shah Diamonds", "Customer", "v3", "Approved"],
    ["Gemline LLP", "Supplier", "v3", "In review"],
    ["Aurum Jewels", "Customer", "v2", "Docs pending"],
    ["Navkar Gems", "Supplier", "v3", "Renewal due"],
    ["Orion Jewellers", "Customer", "v3", "Invited"],
    ["Meridian Stones", "Supplier", "v3", "Approved"],
];

const kycGrid: CSSProperties = { display: "grid", gridTemplateColumns: "1.5fr 0.9fr 0.8fr 1fr", gap: 8 };
const filterPill: CSSProperties = { padding: "5px 12px", borderRadius: 999, border: "1px solid #dfe3e1", color: "#3a403d" };

function KycVisual() {
    return (
        <Reveal delay={0.1} style={panel}>
            <div style={frame}>
                <div style={{ borderRadius: 12, overflow: "hidden", background: "#ffffff", fontSize: 12, color: "#1d2320", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid #eef1ef" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/design/a0624d387c799bef34880b03ced88e69.webp" alt="" style={{ height: 20, width: "auto" }} />
                            <span style={{ fontSize: 14, fontWeight: 600, color: "#0c0c10" }}>KYC Submissions</span>
                        </span>
                        <span style={{ padding: "6px 12px", borderRadius: 8, background: "#2f7a50", color: "#ffffff", fontWeight: 600 }}>+ New Form</span>
                    </div>
                    <div style={{ display: "flex", gap: 8, padding: "10px 16px", flexWrap: "wrap" }}>
                        <span style={{ padding: "5px 12px", borderRadius: 999, background: "#2f7a50", color: "#ffffff", fontWeight: 600 }}>All</span>
                        <span style={filterPill}>In review</span>
                        <span style={filterPill}>Approved</span>
                        <span style={filterPill}>Renewals</span>
                    </div>
                    <Stagger stagger={0.07} style={{ margin: "0 16px 16px", border: "1px solid #e6e9e8", borderRadius: 10, overflow: "hidden" }}>
                        <div style={{ ...kycGrid, padding: "9px 12px", background: "#f4f6f5", fontWeight: 600, color: "#4a514e" }}>
                            <span>Business contact</span>
                            <span>Type</span>
                            <span>Form</span>
                            <span>Status</span>
                        </div>
                        {KYC.map(([name, type, v, status]) => (
                            <StaggerItem key={name} style={{ ...kycGrid, padding: "10px 12px", borderTop: "1px solid #eef1ef", alignItems: "center" }}>
                                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ width: 24, height: 24, borderRadius: 999, background: "#e3f1e7", color: "#245c3e", fontWeight: 700, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>{name.charAt(0)}</span>
                                    <span style={{ color: "#1d2320", fontWeight: 600 }}>{name}</span>
                                </span>
                                <span style={{ color: "#5f6663" }}>{type}</span>
                                <span style={{ color: "#1f4fa8" }}>KYC {v}</span>
                                <span>
                                    <span style={chip(status)}>{status}</span>
                                </span>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </div>

            {/* callouts */}
            <Reveal className="cl-call" delay={0.35} y={12} style={{ ...callout, right: -26, top: 70 }}>
                <span style={calloutIcon("#e3f1e7")}>
                    <Icon size={16} stroke="#245c3e" width={2.2}>
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                    </Icon>
                </span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: 12, color: "#5f6663" }}>Reminder sent</span>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>Aurum Jewels</span>
                </span>
            </Reveal>
            <Reveal className="cl-call" delay={0.45} y={12} style={{ position: "absolute", left: -30, bottom: -34, width: 250, flexDirection: "column", gap: 10, padding: "14px 16px", borderRadius: 16, background: "#ffffff", color: "#0c0c10", boxShadow: "0 16px 36px rgba(16,40,28,0.18)", border: "1px solid #e3e9e5", fontSize: 12 }}>
                <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>Upload documents</span>
                    <span style={{ color: "#5f6663" }}>Page 2 of 4</span>
                </span>
                <span style={{ display: "flex", height: 5, borderRadius: 999, background: "#e7efe9" }}>
                    <span style={{ width: "50%", borderRadius: 999, background: "#317a51" }} />
                </span>
                <span style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Business registration</span>
                    <span style={{ color: "#245c3e", fontWeight: 700 }}>✓</span>
                </span>
                <span style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Owner ID proof</span>
                    <span style={{ color: "#245c3e", fontWeight: 700 }}>✓</span>
                </span>
                <span style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Bank reference letter</span>
                    <span style={{ color: "#8a5300", fontWeight: 600 }}>Pending</span>
                </span>
            </Reveal>
            <Reveal className="cl-call" delay={0.55} y={12} style={{ ...callout, right: 36, bottom: -22 }}>
                <span style={calloutIcon("#fdf0d8")}>
                    <Icon size={16} stroke="#8a5300" width={2.2}>
                        <path d="M21 12a9 9 0 1 1-3-6.7" />
                        <path d="M21 3v6h-6" />
                    </Icon>
                </span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: 12, color: "#5f6663" }}>Renewal due</span>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>Navkar Gems</span>
                </span>
            </Reveal>
        </Reveal>
    );
}

/* ---------- section ---------- */

export function Products({ autoplay = true }: { autoplay?: boolean }) {
    return (
        <section className="v2-products" style={{ padding: "120px 24px" }}>
            <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", flexDirection: "column", gap: 140 }}>
                {/* ================= INVENTORY ================= */}
                <div className="cl-prod">
                    <TextColumn
                        tag="Carat Logic Inventory"
                        title="Manage Your Stock, Memos and Sales in One Place."
                        intro="Keep diamond and gemstone records, business contacts and transactions organised, with a clear view of your stock and outstanding payments."
                        features={INVENTORY_FEATURES}
                    />
                    <InventorySlider autoplay={autoplay} />
                </div>

                {/* ================= KYC ================= */}
                <div className="cl-prod cl-prod-rev">
                    <KycVisual />
                    <TextColumn
                        tag="Carat Logic KYC"
                        title="Manage KYC From First Request to Approval."
                        intro="Create forms, collect documents and track customer and supplier onboarding through review, approval and renewal."
                        features={KYC_FEATURES}
                    />
                </div>
            </div>
        </section>
    );
}
