"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { EASE } from "./motion";
import "./navbar.css";

const LOGO = "/design/a0624d387c799bef34880b03ced88e69.webp";
const GEM = "/design/e5a1514f91ab1fcbfab688c2326f4ede.png";
const DIA = "/design/4ab4f19bef96cbb04e1be7acf468e253.png";
const OVR = "/design/c6a0c46d2279b4f4a50c7f3c24e7654e.png";

type MenuKey = "products" | "features" | "resources";
type LinkItem = { label: string; desc?: string; isNew?: boolean; href?: string };
type Card = { img: string; alt: string; label: string; pos: string };
type Mega = { kicker: string; allLabel: string; cols: { title: string; links: LinkItem[] }[]; cards: Card[] };

const L = (label: string, desc?: string, href?: string): LinkItem => ({ label, desc, href });

const MENUS: Record<"products" | "features", Mega> = {
    products: {
        kicker: "Our products",
        allLabel: "Compare packages",
        cols: [
            { title: "Products", links: [L("Carat Logic Inventory", "Stock, memos, orders and payments"), L("Carat Logic KYC", "Forms, documents, review and renewal")] },
            { title: "Inventory", links: [L("Diamond Inventory"), L("Gem Inventory"), L("Memo Management"), L("Orders & Invoicing")] },
            { title: "More", links: [L("Integrations"), L("Pricing", undefined, "/pricing"), L("Book a Demo")] },
        ],
        cards: [
            { img: DIA, alt: "Diamond inventory screen", label: "Inventory", pos: "22% top" },
            { img: OVR, alt: "Business overview dashboard", label: "Dashboard", pos: "30% top" },
        ],
    },
    features: {
        kicker: "Platform features",
        allLabel: "Explore all features",
        cols: [
            { title: "Inventory", links: [L("Stone Search & Filters"), L("Multi-Location Stock"), L("Pricing Control")] },
            { title: "Sales & Memos", links: [L("Quotations"), L("Memo Alerts"), L("Invoicing")] },
            { title: "Buyers & Reporting", links: [L("WhatsApp Sharing"), L("Client Portal"), L("Financial Reports"), L("Roles & Permissions")] },
        ],
        cards: [
            { img: OVR, alt: "Business overview dashboard", label: "Reporting", pos: "35% top" },
            { img: GEM, alt: "Gem inventory screen", label: "Stone search", pos: "30% top" },
        ],
    },
};

const TABS: { key: string; label: string; href?: string; menu?: MenuKey }[] = [
    { key: "products", label: "Products", menu: "products" },
    { key: "features", label: "Features", menu: "features" },
    { key: "resources", label: "Resources", menu: "resources" },
    { key: "pricing", label: "Pricing", href: "/pricing" },
    { key: "contact", label: "Contact Us", href: "/contact" },
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

function MegaPanel({ menu }: { menu: Mega }) {
    return (
        <div className="cl-mega" style={{ maxWidth: 1280, margin: "0 auto", padding: "44px 24px 48px", boxSizing: "border-box" }}>
            {/* link columns */}
            <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
                <span style={kickerStyle}>{menu.kicker}</span>
                <div className="cl-cols">
                    {menu.cols.map((c, i) => (
                        <Col key={c.title} i={i} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0c0c10" }}>{c.title}</span>
                            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                                {c.links.map((l) => (
                                    <li key={l.label}>
                                        <a className="cl-lk" href={l.href ?? "#"} style={{ display: "flex", flexDirection: "column", gap: 3, fontSize: 16 }}>
                                            <span className="cl-lt" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                {l.label}
                                                {l.isNew && <span style={{ padding: "2px 7px", borderRadius: 999, background: "#e3f1e7", color: "#245c3e", fontSize: 11, fontWeight: 700 }}>NEW</span>}
                                            </span>
                                            {l.desc && <span style={{ fontSize: 13, lineHeight: 1.45, color: "#7a827e" }}>{l.desc}</span>}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                    ))}
                </div>
                <a href="#" style={allLinkStyle}>
                    {menu.allLabel}
                    <Arrow />
                </a>
            </div>

            {/* feature cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 20 }}>
                {menu.cards.map((k, i) => (
                    <Col key={k.label} i={i + 3}>
                        <a className="cl-card" href="#" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            <span style={{ display: "block", aspectRatio: "4 / 5", borderRadius: 16, overflow: "hidden", background: "#eef1ef", border: "1px solid #e3e6e5" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={k.img} alt={k.alt} style={cropStyle(k.pos)} />
                            </span>
                            <span style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#0c0c10" }}>
                                {k.label}
                                <Arrow />
                            </span>
                        </a>
                    </Col>
                ))}
            </div>
        </div>
    );
}

const LEARN = [
    {
        title: "Product Walkthrough",
        desc: "Watch Inventory and KYC in action, step by step.",
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
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#245c3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 7H6a4 4 0 0 0 0 8h3" />
                <path d="M15 7h3a4 4 0 0 1 0 8h-3" />
                <path d="M8 11h8" />
            </svg>
        ),
    },
    {
        title: "About Us",
        desc: "The team and story behind Carat Logic.",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#245c3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 21h18" />
                <path d="M5 21V7l7-4 7 4v14" />
                <path d="M9 21v-5h6v5" />
                <path d="M9 10h.01" />
                <path d="M15 10h.01" />
            </svg>
        ),
    },
];

const ARTICLES = [
    { tag: "Inventory guide", title: "[Article title — e.g. Tracking stones out on memo]", meta: "[Date] · [X] min read", img: DIA, pos: "25% top" },
    { tag: "KYC & compliance", title: "[Article title — e.g. Onboarding suppliers with KYC forms]", meta: "[Date] · [X] min read", img: GEM, pos: "35% top" },
    { tag: "Industry insights", title: "[Article title — e.g. Selling on diamond marketplaces]", meta: "[Date] · [X] min read", img: OVR, pos: "60% top" },
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
                            <a className="cl-lk cl-res-row" href="#" style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: 12, borderRadius: 14, ...(i === 0 ? { background: "#f6f7f7" } : {}) }}>
                                <span style={{ flex: "none", width: 40, height: 40, borderRadius: 12, background: it.dark ? "#111827" : "#eef6f0", display: "flex", alignItems: "center", justifyContent: "center" }}>{it.icon}</span>
                                <span style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                    <span style={{ fontSize: 16, fontWeight: 600, color: "#0c0c10" }}>{it.title}</span>
                                    <span style={{ fontSize: 13, lineHeight: 1.45, color: "#6b736f" }}>{it.desc}</span>
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </Col>

            {/* col 2: blogs & articles */}
            <Col i={1} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <span style={kickerStyle}>Blogs &amp; articles</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {ARTICLES.map((a) => (
                        <a key={a.tag} className="cl-art" href="#" style={{ display: "flex", gap: 14, alignItems: "center" }}>
                            <span style={{ flex: "none", width: 96, height: 72, borderRadius: 12, overflow: "hidden", background: "#eef1ef", border: "1px solid #e3e6e5" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={a.img} alt="" style={cropStyle(a.pos)} />
                            </span>
                            <span style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2c6f4b" }}>{a.tag}</span>
                                <span className="cl-at" style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.35, color: "#0c0c10", transition: "color .15s ease" }}>{a.title}</span>
                                <span style={{ fontSize: 12, color: "#7a827e" }}>{a.meta}</span>
                            </span>
                        </a>
                    ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {CHIPS.map((c) => (
                        <a key={c} className="cl-chip" href="#" style={{ padding: "6px 12px", borderRadius: 999, border: "1px solid #e3e6e5", fontSize: 13, color: "#3a403d" }}>
                            {c}
                        </a>
                    ))}
                </div>
                <a href="#" style={allLinkStyle}>
                    View all articles
                    <Arrow />
                </a>
            </Col>

            {/* col 3: featured walkthrough */}
            <Col i={2} className="cl-feat" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span style={kickerStyle}>Featured</span>
                <a className="cl-vid" href="#" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
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
                </a>
            </Col>
        </div>
    );
}

export function Navbar() {
    const reduce = useReducedMotion();
    const [open, setOpen] = useState<MenuKey | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

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

    // At the top of the page the bar blends into the hero (#fafafa); once scrolled
    // or with a menu open it becomes the white bar from the navigation design.
    const solid = scrolled || open !== null || mobileOpen;
    const ringBase = solid ? "#ffffff" : "#fafafa";
    const ringEdge = solid ? "#dfe3e1" : "#dfe7e1";

    return (
        <motion.header
            className="v2-nav"
            onMouseLeave={() => setOpen(null)}
            initial={false}
            animate={{
                backgroundColor: solid ? "#ffffff" : "#fafafa",
                borderBottomColor: solid ? "#eceeed" : "rgba(236,238,237,0)",
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ position: "sticky", top: 0, zIndex: 50, borderBottomWidth: 1, borderBottomStyle: "solid" }}
        >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, maxWidth: 1280, margin: "0 auto", padding: "18px 24px", boxSizing: "border-box" }}>
                <a href="/v2" aria-label="Carat Logic home" style={{ display: "flex", alignItems: "center" }} onMouseEnter={() => setOpen(null)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={LOGO} alt="Carat Logic" style={{ height: 48, width: "auto", display: "block" }} />
                </a>

                <nav className="cl-links" aria-label="Main" style={{ alignItems: "center", gap: 6 }}>
                    {TABS.map((t) => {
                        const on = t.menu !== undefined && open === t.menu;
                        const tabStyle: CSSProperties = { position: "relative", display: "flex", alignItems: "center", gap: 6, minHeight: 44, padding: "10px 14px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 500, color: "#111114", boxSizing: "border-box" };
                        const underline = on && (
                            <motion.span
                                layoutId="v2-nav-underline"
                                aria-hidden="true"
                                transition={{ type: "spring", stiffness: 500, damping: 38 }}
                                style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, background: "#317a51" }}
                            />
                        );
                        if (!t.menu) {
                            return (
                                <a key={t.key} href={t.href} style={tabStyle} onMouseEnter={() => setOpen(null)}>
                                    {t.label}
                                </a>
                            );
                        }
                        const menu = t.menu;
                        return (
                            <button
                                key={t.key}
                                type="button"
                                aria-expanded={on}
                                aria-haspopup="true"
                                onClick={() => setOpen(on ? null : menu)}
                                onMouseEnter={() => setOpen(menu)}
                                style={tabStyle}
                            >
                                {t.label}
                                <motion.svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" animate={{ rotate: on ? 180 : 0 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                                    <path d="m6 9 6 6 6-6" />
                                </motion.svg>
                                {underline}
                            </button>
                        );
                    })}
                </nav>

                <a
                    href="#"
                    className="cl-cta"
                    onMouseEnter={() => setOpen(null)}
                    style={{ alignItems: "center", gap: 12, background: "#111827", color: "#ffffff", fontWeight: 600, fontSize: 16, padding: "8px 8px 8px 22px", borderRadius: 999, boxShadow: `0 0 0 4px ${ringBase}, 0 0 0 5px ${ringEdge}, 0 8px 20px rgba(0,0,0,0.18)`, transition: "box-shadow .25s ease" }}
                >
                    <span style={{ color: "#ffffff" }}>Get Started</span>
                    <motion.span whileHover={reduce ? undefined : { x: 3 }} style={{ width: 32, height: 32, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Arrow size={16} stroke="#111827" width={2.2} />
                    </motion.span>
                </a>

                <button
                    type="button"
                    className="cl-burger"
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    aria-expanded={mobileOpen}
                    onClick={() => setMobileOpen((v) => !v)}
                    style={{ width: 44, height: 44, alignItems: "center", justifyContent: "center", border: "1px solid #e3e6e5", borderRadius: 12, background: "#ffffff", cursor: "pointer" }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111114" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <motion.path initial={false} d={mobileOpen ? "M6 6L18 18" : "M4 7L20 7"} animate={{ d: mobileOpen ? "M6 6L18 18" : "M4 7L20 7" }} />
                        <motion.path animate={{ opacity: mobileOpen ? 0 : 1 }} d="M4 12h16" />
                        <motion.path initial={false} d={mobileOpen ? "M6 18L18 6" : "M4 17L20 17"} animate={{ d: mobileOpen ? "M6 18L18 6" : "M4 17L20 17" }} />
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
                                {open === "resources" ? <ResourcesPanel /> : <MegaPanel menu={MENUS[open]} />}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.nav
                        key="mobile"
                        className="cl-mobile"
                        aria-label="Mobile"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        style={{ overflow: "hidden", borderTop: "1px solid #eceeed", background: "#ffffff" }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", padding: "12px 24px 24px", gap: 4 }}>
                            {TABS.map((t, i) => (
                                <motion.a
                                    key={t.key}
                                    href={t.href ?? "#"}
                                    onClick={() => setMobileOpen(false)}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 + i * 0.04, duration: 0.3, ease: EASE }}
                                    style={{ display: "flex", alignItems: "center", minHeight: 44, fontSize: 18, fontWeight: 500, color: "#111114", borderBottom: "1px solid #f0f2f1" }}
                                >
                                    {t.label}
                                </motion.a>
                            ))}
                            <a href="#" style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, background: "#111827", color: "#ffffff", fontWeight: 600, fontSize: 16, padding: "8px 8px 8px 22px", borderRadius: 999 }}>
                                <span style={{ color: "#ffffff" }}>Get Started</span>
                                <span style={{ width: 32, height: 32, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Arrow size={16} stroke="#111827" width={2.2} />
                                </span>
                            </a>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
