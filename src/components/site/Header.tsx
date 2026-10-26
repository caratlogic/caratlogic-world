"use client";

import { useEffect, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { EASE } from "@/components/landing/motion";
import { MobileCtas } from "@/components/landing/HeroMobile";
import { INTEGRATIONS, INTEGRATIONS_INDEX_HREF } from "./integrations";
import "./header.css";

const LOGO = "/design/a0624d387c799bef34880b03ced88e69.webp";
const GEM = "/design/e5a1514f91ab1fcbfab688c2326f4ede.png";
const DIA = "/design/4ab4f19bef96cbb04e1be7acf468e253.png";
const OVR = "/design/c6a0c46d2279b4f4a50c7f3c24e7654e.png";

/** Site routes the header links to. */
export const ROUTES = {
    inventory: "/inventory",
    kyc: "/kyc",
    pricing: "/pricing",
    contact: "/contact",
    demo: "/contact?tab=demo",
    blogs: "/blogs",
    guides: "/product-guides",
    faq: "/#faq",
    diamond: "/features/diamond-inventory",
    gem: "/features/gem-inventory",
    finance: "/features/financial-operations",
    manufacturing: "/features/manufacturing",
    contacts: "/features/business-contacts",
    kycForms: "/features/kyc-forms",
    kycOnboarding: "/features/kyc-onboarding",
    kycDocuments: "/features/kyc-documents",
    kycReview: "/features/kyc-review",
    integrations: INTEGRATIONS_INDEX_HREF,
} as const;

/** Integration pages, in the order the design lists them (Features menu, mobile menu). */
export const INTEGRATION_LINKS: { label: string; href: string }[] = INTEGRATIONS.map((i) => ({ label: i.name, href: i.href }));

type MenuKey = "products" | "features" | "resources";
type LinkItem = { label: string; href: string; desc?: string; head?: boolean };

const L = (label: string, href: string, desc?: string): LinkItem => ({ label, href, desc });

const TABS: { key: string; label: string; href?: string; menu?: MenuKey }[] = [
    { key: "products", label: "Products", menu: "products" },
    { key: "features", label: "Features", menu: "features" },
    { key: "resources", label: "Resources", menu: "resources" },
    { key: "pricing", label: "Pricing", href: ROUTES.pricing },
    { key: "contact", label: "Contact Us", href: ROUTES.contact },
];

const kickerStyle: CSSProperties = { fontSize: 12, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#6b736f" };
const allLinkStyle: CSSProperties = { alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 12, fontSize: 14, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#0c0c10" };
const cropStyle = (pos: string): CSSProperties => ({ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: pos });

function Arrow({ size = 18, stroke = "#0c0c10", width = 2 }: { size?: number; stroke?: string; width?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
        </svg>
    );
}

/** Columns + content fade/rise in a short stagger each time a panel opens or switches. */
const colVariants = {
    hidden: { opacity: 0, y: 10 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE, delay: 0.04 + i * 0.05 } }),
};

function Col({ i, children, style, className }: { i: number; children: ReactNode; style?: CSSProperties; className?: string }) {
    return (
        <motion.div custom={i} variants={colVariants} initial="hidden" animate="show" style={style} className={className}>
            {children}
        </motion.div>
    );
}

/* ---------------------------------------------------------------- Products menu (Nav design) */

const PRODUCT_COLS: { title: string; links: LinkItem[] }[] = [
    { title: "Products", links: [L("Carat Logic Inventory", ROUTES.inventory, "Stock, memos, orders and payments"), L("Carat Logic KYC", ROUTES.kyc, "Forms, documents, review and renewal")] },
    { title: "Articles", links: [L("Inventory guides", ROUTES.blogs), L("KYC & compliance", ROUTES.blogs), L("Industry insights", ROUTES.blogs), L("Product updates", ROUTES.blogs)] },
    { title: "More", links: [L("Pricing", ROUTES.pricing), L("Book a Demo", ROUTES.demo)] },
];

const KYC_ROWS: [string, string, string, string][] = [
    ["S", "Shah Diamonds", "#e3f1e7|#245c3e", "Approved"],
    ["G", "Gemline LLP", "#e6eefc|#1f4fa8", "In review"],
    ["A", "Aurum Jewels", "#fdf0d8|#8a5300", "Docs pending"],
    ["N", "Navkar Gems", "#fde7e7|#a12c2c", "Renewal due"],
    ["O", "Orion Jewellers", "#f0f2f1|#3a403d", "Form sent"],
    ["M", "Meridian Stones", "#e3f1e7|#245c3e", "Approved"],
];

/** The KYC Submissions mini-screen drawn in the Products menu's second card. */
function KycCardScreen() {
    const chip: CSSProperties = { padding: "2px 7px", borderRadius: 999, border: "1px solid #dfe3e1", color: "#3a403d", fontSize: 8.5 };
    return (
        <span aria-label="KYC Submissions screen" role="img" style={{ display: "flex", flexDirection: "column", height: "100%", background: "#ffffff", padding: "12px 10px", boxSizing: "border-box", gap: 8 }}>
            <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#0c0c10" }}>KYC Submissions</span>
                <span style={{ padding: "3px 7px", borderRadius: 6, background: "#2f7a50", color: "#ffffff", fontSize: 8.5, fontWeight: 700 }}>+ Assign</span>
            </span>
            <span style={{ display: "flex", gap: 4 }}>
                <span style={{ padding: "2px 7px", borderRadius: 999, background: "#2f7a50", color: "#fff", fontSize: 8.5, fontWeight: 600 }}>All</span>
                <span style={chip}>In review</span>
                <span style={chip}>Approved</span>
            </span>
            <span style={{ display: "flex", flexDirection: "column", border: "1px solid #e6e9e8", borderRadius: 8, overflow: "hidden" }}>
                {KYC_ROWS.map(([initial, name, colors, status]) => {
                    const [bg, fg] = colors.split("|");
                    return (
                        <span key={name} style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 8px", borderTop: "1px solid #f0f2f1" }}>
                            <span style={{ width: 18, height: 18, borderRadius: 999, background: "#e3f1e7", color: "#245c3e", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{initial}</span>
                            <span style={{ flex: 1, fontSize: 10, fontWeight: 600, color: "#1d2320" }}>{name}</span>
                            <span style={{ padding: "2px 6px", borderRadius: 999, background: bg, color: fg, fontSize: 8.5, fontWeight: 700 }}>{status}</span>
                        </span>
                    );
                })}
            </span>
        </span>
    );
}

function ProductsPanel() {
    const cardLabel: CSSProperties = { display: "flex", alignItems: "center", gap: 12, fontSize: 14, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#0c0c10" };
    const cardFrame: CSSProperties = { display: "block", aspectRatio: "4 / 5", borderRadius: 16, overflow: "hidden", background: "#eef1ef", border: "1px solid #e3e6e5" };
    return (
        <div className="cl-mega" style={{ maxWidth: 1280, margin: "0 auto", padding: "44px 24px 48px", boxSizing: "border-box" }}>
            {/* link columns */}
            <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
                <span style={kickerStyle}>Our products</span>
                <div className="cl-cols">
                    {PRODUCT_COLS.map((c, i) => (
                        <Col key={c.title} i={i} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0c0c10" }}>{c.title}</span>
                            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                                {c.links.map((l) => (
                                    <li key={l.label}>
                                        <Link className="cl-lk" href={l.href} style={{ display: "flex", flexDirection: "column", gap: 3, fontSize: 16 }}>
                                            <span className="cl-lt" style={{ display: "flex", alignItems: "center", gap: 8 }}>{l.label}</span>
                                            {l.desc && <span style={{ fontSize: 13, lineHeight: 1.45, color: "#7a827e" }}>{l.desc}</span>}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                    ))}
                </div>
                <Link href={ROUTES.pricing} style={allLinkStyle}>
                    Compare packages
                    <Arrow />
                </Link>
            </div>

            {/* feature cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 20 }}>
                <Col i={3}>
                    <Link className="cl-card" href={ROUTES.inventory} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        <span style={cardFrame}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={DIA} alt="Diamond inventory screen" style={cropStyle("22% top")} />
                        </span>
                        <span style={cardLabel}>
                            Inventory
                            <Arrow />
                        </span>
                    </Link>
                </Col>
                <Col i={4}>
                    <Link className="cl-card" href={ROUTES.kyc} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        <span style={cardFrame}>
                            <KycCardScreen />
                        </span>
                        <span style={cardLabel}>
                            KYC
                            <Arrow />
                        </span>
                    </Link>
                </Col>
            </div>
        </div>
    );
}

/* ---------------------------------------------------------------- Features menu (NavFeatures design) */

const FEATURE_GROUPS: { kicker: string; product: string; all?: string; allLabel?: string; links: LinkItem[] }[] = [
    {
        kicker: "Inventory features",
        product: "Carat Logic Inventory",
        all: ROUTES.inventory,
        links: [L("Diamond Inventory", ROUTES.diamond), L("Gem Inventory", ROUTES.gem), L("Financial Operations", ROUTES.finance), L("Manufacturing", ROUTES.manufacturing), L("Business Contacts & Partners", ROUTES.contacts)],
    },
    {
        kicker: "Marketplaces & e-invoicing",
        product: "Integrations",
        all: ROUTES.integrations,
        allLabel: "View all integrations",
        links: INTEGRATION_LINKS.map((l) => L(l.label, l.href)),
    },
    {
        kicker: "KYC features",
        product: "Carat Logic KYC",
        all: ROUTES.kyc,
        links: [L("Custom KYC Forms", ROUTES.kycForms), L("Business Contact Onboarding", ROUTES.kycOnboarding), L("Document Collection", ROUTES.kycDocuments), L("Review & Status Tracking", ROUTES.kycReview)],
    },
];

function FeaturesPanel() {
    const linkStyle: CSSProperties = { display: "flex", alignItems: "center", minHeight: 40, padding: "8px 10px", borderRadius: 10, fontSize: 15, lineHeight: 1.3, fontWeight: 500, color: "#1d2320" };
    return (
        <div className="cl-feat2" style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px 36px", boxSizing: "border-box" }}>
            <div className="cl-feat2-grid">
                {FEATURE_GROUPS.map((g, i) => (
                    <Col key={g.kicker} i={i} className={i > 0 ? "cl-feat2-sep" : undefined}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                            <div style={{ paddingBottom: 14, borderBottom: "1px solid #eceeed" }}>
                                <span style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                    <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6b736f" }}>{g.kicker}</span>
                                    <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", color: "#0c0c10" }}>{g.product}</span>
                                </span>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "2px 10px" }}>
                                {g.links.map((l) => (
                                    <Link key={l.label} className="cl-lk cl-feat-link" href={l.href} style={linkStyle}>
                                        {l.label}
                                    </Link>
                                ))}
                                {g.all && (
                                    <Link href={g.all} style={{ ...linkStyle, gap: 8, fontWeight: 600, color: "#245c3e", whiteSpace: "nowrap" }}>
                                        {g.allLabel ?? "Explore all features"} <span aria-hidden="true">→</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </Col>
                ))}
            </div>
            <Col i={3} style={{ marginTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "16px 20px", borderRadius: 16, background: "#f6f7f7" }}>
                <span style={{ fontSize: 14, color: "#3a403d" }}>Get both products and all features with the Enterprise package.</span>
                <span style={{ display: "flex", gap: 22 }}>
                    <Link href={ROUTES.pricing} style={{ fontSize: 14, fontWeight: 600, color: "#245c3e" }}>
                        Compare packages →
                    </Link>
                </span>
            </Col>
        </div>
    );
}

/* ---------------------------------------------------------------- Resources menu (NavResources design) */

const LEARN = [
    {
        title: "Product Walkthrough",
        desc: "Watch Inventory and KYC in action, step by step.",
        href: ROUTES.guides,
        dark: true,
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
            </svg>
        ),
    },
    {
        title: "FAQs",
        desc: "Quick answers on features, KYC and pricing.",
        href: ROUTES.faq,
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#245c3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.3" />
                <path d="M12 17h.01" />
            </svg>
        ),
    },
    {
        title: "Integrations",
        desc: "Marketplaces and e-invoicing connections.",
        href: ROUTES.integrations,
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#245c3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 7H6a4 4 0 0 0 0 8h3" />
                <path d="M15 7h3a4 4 0 0 1 0 8h-3" />
                <path d="M8 11h8" />
            </svg>
        ),
    },
];

// The design's article rows are placeholders; these are the first posts from the Blogs page.
const ARTICLES = [
    { tag: "Inventory guide", title: "How to Organise Diamond Stock by 4Cs, Certificates and Location", meta: "Oct 14, 2026 · 5 min read", img: DIA, pos: "25% top" },
    { tag: "Inventory guide", title: "A Simple Guide to Memo Management for Gem Traders", meta: "Oct 8, 2026 · 4 min read", img: GEM, pos: "35% top" },
    { tag: "KYC & compliance", title: "What to Collect in a Supplier KYC Form", meta: "Sep 30, 2026 · 6 min read", img: OVR, pos: "60% top" },
];

const CHIPS = ["Inventory guides", "KYC & compliance", "Industry insights", "Product updates"];

function ResourcesPanel() {
    return (
        <div className="cl-res" style={{ maxWidth: 1280, margin: "0 auto", padding: "44px 24px 48px", boxSizing: "border-box" }}>
            {/* col 1: learn */}
            <Col i={0} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <span style={kickerStyle}>Learn the platform</span>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                    {LEARN.map((it, i) => (
                        <li key={it.title}>
                            <Link className="cl-lk cl-res-row" href={it.href} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: 12, borderRadius: 14, ...(i === 0 ? { background: "#f6f7f7" } : {}) }}>
                                <span style={{ flex: "none", width: 40, height: 40, borderRadius: 12, background: it.dark ? "#111827" : "#eef6f0", display: "flex", alignItems: "center", justifyContent: "center" }}>{it.icon}</span>
                                <span style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                    <span style={{ fontSize: 16, fontWeight: 600, color: "#0c0c10" }}>{it.title}</span>
                                    <span style={{ fontSize: 13, lineHeight: 1.45, color: "#6b736f" }}>{it.desc}</span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Col>

            {/* col 2: blogs & articles */}
            <Col i={1} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <span style={kickerStyle}>Blogs &amp; articles</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {ARTICLES.map((a) => (
                        <Link key={a.title} className="cl-art" href={ROUTES.blogs} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                            <span style={{ flex: "none", width: 96, height: 72, borderRadius: 12, overflow: "hidden", background: "#eef1ef", border: "1px solid #e3e6e5" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={a.img} alt="" style={cropStyle(a.pos)} />
                            </span>
                            <span style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2c6f4b" }}>{a.tag}</span>
                                <span className="cl-at" style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.35, color: "#0c0c10", transition: "color .15s ease" }}>{a.title}</span>
                                <span style={{ fontSize: 12, color: "#7a827e" }}>{a.meta}</span>
                            </span>
                        </Link>
                    ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {CHIPS.map((c) => (
                        <Link key={c} className="cl-chip" href={ROUTES.blogs} style={{ padding: "6px 12px", borderRadius: 999, border: "1px solid #e3e6e5", fontSize: 13, color: "#3a403d" }}>
                            {c}
                        </Link>
                    ))}
                </div>
                <Link href={ROUTES.blogs} style={allLinkStyle}>
                    View all articles
                    <Arrow />
                </Link>
            </Col>

            {/* col 3: featured walkthrough */}
            <Col i={2} className="cl-feat" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span style={kickerStyle}>Featured</span>
                <Link className="cl-vid" href={ROUTES.guides} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <span style={{ position: "relative", display: "block", aspectRatio: "16 / 10", borderRadius: 18, overflow: "hidden", background: "#eef1ef", border: "1px solid #e3e6e5" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={OVR} alt="Carat Logic business overview dashboard" style={cropStyle("left top")} />
                        <span style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,12,14,0) 40%, rgba(10,12,14,0.55) 100%)" }} />
                        <span style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 64, height: 64, borderRadius: 999, background: "#ffffff", boxShadow: "0 0 0 8px rgba(255,255,255,0.3), 0 12px 28px rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#245c3e" aria-hidden="true">
                                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
                            </svg>
                        </span>
                        <span style={{ position: "absolute", left: 16, bottom: 14, padding: "5px 10px", borderRadius: 999, background: "rgba(255,255,255,0.92)", fontSize: 12, fontWeight: 600, color: "#0c0c10" }}>Inventory · KYC</span>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", color: "#0c0c10" }}>See how Carat Logic fits your business</span>
                        <span style={{ fontSize: 14, lineHeight: 1.5, color: "#5f6663" }}>A short product walkthrough of stock, memos, payments and KYC.</span>
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#0c0c10" }}>
                        Watch walkthrough
                        <Arrow />
                    </span>
                </Link>
            </Col>
        </div>
    );
}

/* ---------------------------------------------------------------- Mobile menu (MenuMobile design) */

type MobileItem = { key: string; label: string; href?: string; links?: LinkItem[] };

/** A `head` entry renders as a small sub-heading inside an open section (design's H(...) rows). */
const H = (label: string): LinkItem => ({ label, href: "", head: true });

const MOBILE_ITEMS: MobileItem[] = [
    { key: "products", label: "Products", links: [L("Carat Logic Inventory", ROUTES.inventory, "Stock, memos, orders and payments"), L("Carat Logic KYC", ROUTES.kyc, "Forms, documents, review and renewal")] },
    {
        key: "features",
        label: "Features",
        links: [
            H("Carat Logic Inventory"),
            L("Diamond Inventory", ROUTES.diamond),
            L("Gem Inventory", ROUTES.gem),
            L("Financial Operations", ROUTES.finance),
            L("Manufacturing", ROUTES.manufacturing),
            L("Business Contacts & Partners", ROUTES.contacts),
            H("Integrations"),
            ...INTEGRATION_LINKS.map((l) => L(l.label, l.href)),
            L("All integrations", ROUTES.integrations),
            H("Carat Logic KYC"),
            L("Custom KYC Forms", ROUTES.kycForms),
            L("Business Contact Onboarding", ROUTES.kycOnboarding),
            L("Document Collection", ROUTES.kycDocuments),
            L("Review & Status Tracking", ROUTES.kycReview),
        ],
    },
    { key: "resources", label: "Resources", links: [L("Blogs", ROUTES.blogs), L("Product Guides", ROUTES.guides)] },
    { key: "pricing", label: "Pricing", href: ROUTES.pricing },
    { key: "contact", label: "Contact Us", href: ROUTES.contact },
];

function MobileMenu({ onClose }: { onClose: () => void }) {
    const reduce = useReducedMotion();
    const [section, setSection] = useState<string | null>("products");

    return (
        <motion.div
            className="cl-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ position: "fixed", inset: 0, zIndex: 60, height: "100dvh", boxSizing: "border-box", color: "#111114", background: "#ffffff", flexDirection: "column" }}
        >
            {/* header */}
            <div style={{ flex: "none", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid #eceeed" }}>
                <Link href="/" aria-label="Carat Logic home" style={{ display: "flex" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={LOGO} alt="Carat Logic" style={{ height: 38, width: "auto", display: "block" }} />
                </Link>
                <motion.button
                    type="button"
                    className="cl-x"
                    aria-label="Close menu"
                    onClick={onClose}
                    initial={reduce ? false : { rotate: -90, scale: 0.6 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 420, damping: 26 }}
                    style={{ width: 44, height: 44, borderRadius: 999, border: "none", background: "#111827", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                        <path d="M6 6l12 12" />
                        <path d="M18 6 6 18" />
                    </svg>
                </motion.button>
            </div>

            {/* menu */}
            <nav aria-label="Main" style={{ flex: 1, overflowY: "auto", padding: "8px 20px 20px" }}>
                {MOBILE_ITEMS.map((it, i) => {
                    const on = section === it.key;
                    const panelId = `site-mm-${it.key}`;
                    return (
                        <motion.div
                            key={it.key}
                            initial={reduce ? false : { opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, ease: EASE, delay: 0.06 + i * 0.05 }}
                            style={{ borderBottom: "1px solid #eceeed" }}
                        >
                            {it.links ? (
                                <>
                                    <button
                                        type="button"
                                        className="cl-acc"
                                        aria-expanded={on}
                                        aria-controls={panelId}
                                        onClick={() => setSection(on ? null : it.key)}
                                        style={{ width: "100%", minHeight: 60, display: "flex", alignItems: "center", justifyContent: "space-between", padding: 0, border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
                                    >
                                        <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", color: on ? "#245c3e" : "#0c0c10", transition: "color .2s ease" }}>{it.label}</span>
                                        <span style={{ width: 32, height: 32, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", background: on ? "#111827" : "#f1f3f2", transition: "background-color .2s ease" }}>
                                            <motion.svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={on ? "#ffffff" : "#111827"} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" animate={{ rotate: on ? 180 : 0 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                                                <path d="m6 9 6 6 6-6" />
                                            </motion.svg>
                                        </span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {on && (
                                            <motion.div
                                                id={panelId}
                                                key="links"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
                                                style={{ overflow: "hidden" }}
                                            >
                                                <ul style={{ listStyle: "none", margin: 0, padding: "0 0 16px", display: "flex", flexDirection: "column", gap: 4 }}>
                                                    {it.links.map((l) =>
                                                        l.head ? (
                                                            <li key={`h-${l.label}`}>
                                                                <span style={{ display: "block", padding: "10px 4px 2px", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6b736f" }}>{l.label}</span>
                                                            </li>
                                                        ) : (
                                                        <li key={l.label}>
                                                            <Link href={l.href} style={{ display: "flex", flexDirection: "column", gap: 2, padding: "10px 12px", borderRadius: 12, background: "#f6f7f7" }}>
                                                                <span style={{ fontSize: 15, fontWeight: 600, color: "#0c0c10" }}>{l.label}</span>
                                                                {l.desc && <span style={{ fontSize: 12, lineHeight: 1.4, color: "#6b736f" }}>{l.desc}</span>}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </>
                            ) : (
                                <Link href={it.href ?? "/"} style={{ minHeight: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", color: "#0c0c10" }}>{it.label}</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8a908d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="m9 6 6 6-6 6" />
                                    </svg>
                                </Link>
                            )}
                        </motion.div>
                    );
                })}

                {/* contact */}
                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: EASE, delay: 0.34 }}
                    style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}
                >
                    <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6b736f" }}>Talk to us</span>
                    <a href="mailto:hello@caratlogic.com" style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: "#111114" }}>
                        <span style={{ width: 36, height: 36, borderRadius: 10, background: "#eef6f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#317a51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <rect x="3" y="5" width="18" height="14" rx="2" />
                                <path d="m3 7 9 6 9-6" />
                            </svg>
                        </span>
                        hello@caratlogic.com
                    </a>
                    <a href="tel:+32499712725" style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: "#111114" }}>
                        <span style={{ width: 36, height: 36, borderRadius: 10, background: "#eef6f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#317a51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                            </svg>
                        </span>
                        +32 499 71 27 25
                    </a>
                </motion.div>
            </nav>

            {/* bottom actions */}
            <motion.div
                initial={reduce ? false : { y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.15 }}
                style={{ flex: "none", padding: "12px 16px 22px", borderTop: "1px solid #eceeed", display: "flex", gap: 8, background: "#ffffff" }}
            >
                <MobileCtas elevated={false} />
            </motion.div>
        </motion.div>
    );
}

/* ---------------------------------------------------------------- Announcement bar (from the previous site header) */

function AnnouncementBar({ show }: { show: boolean }) {
    const reduce = useReducedMotion();
    return (
        <motion.div
            initial={false}
            animate={{ height: show ? 44 : 0, opacity: show ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="cl-announce"
            aria-hidden={!show}
            style={{ overflow: "hidden", background: "#2c6f4b", color: "#ffffff" }}
        >
            <div style={{ height: 44, display: "flex", alignItems: "center", overflow: "hidden", whiteSpace: "nowrap" }}>
                <motion.div
                    style={{ display: "flex", alignItems: "center", gap: 32, minWidth: "max-content", paddingRight: 32 }}
                    animate={reduce ? undefined : { x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                >
                    {[0, 1, 2, 3].map((i) => (
                        <span key={i} aria-hidden={i > 0 || undefined} style={{ fontSize: 14 }}>
                            Unlock the power of real-time multi-location diamond inventory control -{" "}
                            <Link href={ROUTES.contact} tabIndex={show && i === 0 ? undefined : -1} style={{ marginLeft: 4, color: "#ffffff", textDecoration: "underline", textUnderlineOffset: 4 }}>
                                Discover more
                            </Link>
                        </span>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}

/* ---------------------------------------------------------------- Header */

/**
 * Site header, rendered once in the root layout: the announcement bar (shown only while the page
 * is scrolled to the very top) above the navigation bar. It is fixed, so <HeaderSpacer /> reserves
 * its full height in the page flow — content never jumps when the announcement collapses.
 */
export function Header() {
    const reduce = useReducedMotion();
    const [open, setOpen] = useState<MenuKey | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [atTop, setAtTop] = useState(true);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (y) => setAtTop(y <= 10));

    useEffect(() => {
        if (!open && !mobileOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(null);
                setMobileOpen(false);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, mobileOpen]);

    // Lock page scroll behind the full-screen mobile menu.
    useEffect(() => {
        if (!mobileOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [mobileOpen]);

    // Following any link inside the header closes whichever menu is open.
    const closeOnLink = (e: MouseEvent) => {
        if ((e.target as Element).closest("a")) {
            setOpen(null);
            setMobileOpen(false);
        }
    };

    const solid = !atTop || open !== null;
    const ringEdge = solid ? "#dfe3e1" : "#dfe7e1";

    return (
        <motion.header
            className="site-header"
            onMouseLeave={() => setOpen(null)}
            onClickCapture={closeOnLink}
            initial={false}
            animate={{ borderBottomColor: solid ? "#eceeed" : "rgba(236,238,237,0)" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "#ffffff", borderBottomWidth: 1, borderBottomStyle: "solid" }}
        >
            <AnnouncementBar show={atTop && !mobileOpen} />

            <div style={{ position: "relative" }}>
                <div className="cl-bar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, maxWidth: 1280, margin: "0 auto", boxSizing: "border-box" }}>
                    <Link href="/" aria-label="Carat Logic home" style={{ display: "flex", alignItems: "center" }} onMouseEnter={() => setOpen(null)}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="cl-logo" src={LOGO} alt="Carat Logic" style={{ width: "auto", display: "block" }} />
                    </Link>

                    <nav className="cl-links" aria-label="Main" style={{ alignItems: "center", gap: 6 }}>
                        {TABS.map((t) => {
                            const on = t.menu !== undefined && open === t.menu;
                            const tabStyle: CSSProperties = { position: "relative", display: "flex", alignItems: "center", gap: 6, minHeight: 44, padding: "10px 14px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 500, color: "#111114", boxSizing: "border-box" };
                            if (!t.menu) {
                                return (
                                    <Link key={t.key} href={t.href ?? "/"} style={tabStyle} onMouseEnter={() => setOpen(null)}>
                                        {t.label}
                                    </Link>
                                );
                            }
                            const menu = t.menu;
                            return (
                                <button key={t.key} type="button" aria-expanded={on} aria-haspopup="true" onClick={(e) => {
                                        // A mouse already opened the menu on hover, so a click must not toggle it shut;
                                        // keyboard and touch clicks toggle.
                                        const pointer = (e.nativeEvent as PointerEvent).pointerType;
                                        setOpen(pointer === "mouse" ? menu : on ? null : menu);
                                    }} onMouseEnter={() => setOpen(menu)} style={tabStyle}>
                                    {t.label}
                                    <motion.svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" animate={{ rotate: on ? 180 : 0 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                                        <path d="m6 9 6 6 6-6" />
                                    </motion.svg>
                                    {on && (
                                        <motion.span
                                            layoutId="site-nav-underline"
                                            aria-hidden="true"
                                            transition={{ type: "spring", stiffness: 500, damping: 38 }}
                                            style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, background: "#317a51" }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    <Link
                        href={ROUTES.contact}
                        className="cl-cta"
                        onMouseEnter={() => setOpen(null)}
                        style={{ alignItems: "center", gap: 12, background: "#111827", color: "#ffffff", fontWeight: 600, fontSize: 16, padding: "8px 8px 8px 22px", borderRadius: 999, boxShadow: `0 0 0 4px #ffffff, 0 0 0 5px ${ringEdge}, 0 8px 20px rgba(0,0,0,0.18)`, transition: "box-shadow .25s ease" }}
                    >
                        <span style={{ color: "#ffffff" }}>Get Started</span>
                        <motion.span whileHover={reduce ? undefined : { x: 3 }} style={{ width: 32, height: 32, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Arrow size={16} stroke="#111827" width={2.2} />
                        </motion.span>
                    </Link>

                    <button
                        type="button"
                        className="cl-burger"
                        aria-label="Open menu"
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen(true)}
                        style={{ width: 44, height: 44, borderRadius: 999, border: "1px solid #e3e6e5", background: "#ffffff", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111114" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                            <path d="M4 7h16" />
                            <path d="M4 12h16" />
                            <path d="M4 17h16" />
                        </svg>
                    </button>
                </div>

                {/* desktop mega menu panel */}
                <AnimatePresence>
                    {open && (
                        <motion.div
                            key="panel"
                            className="cl-panel"
                            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, clipPath: "inset(0 0 100% 0)" }}
                            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, clipPath: "inset(0 0 100% 0)" }}
                            transition={{ duration: 0.32, ease: EASE }}
                            style={{ position: "absolute", left: 0, right: 0, top: "100%", zIndex: 20, background: "#ffffff", borderTop: "1px solid #eceeed", boxShadow: "0 30px 60px rgba(16,24,20,0.12)" }}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div key={open} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                                    {open === "products" && <ProductsPanel />}
                                    {open === "features" && <FeaturesPanel />}
                                    {open === "resources" && <ResourcesPanel />}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* mobile menu */}
            <AnimatePresence>{mobileOpen && <MobileMenu key="mobile-menu" onClose={() => setMobileOpen(false)} />}</AnimatePresence>
        </motion.header>
    );
}

/** Reserves the fixed header's full height (announcement + bar) at the top of every page. */
export function HeaderSpacer() {
    return <div aria-hidden="true" className="site-header-spacer" />;
}
