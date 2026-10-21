"use client";

import type { ReactNode } from "react";
import { Reveal, Stagger, StaggerItem } from "./motion";
import "./platform.css";

const iconProps = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#317a51",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
};

export const ICONS: Record<number, ReactNode> = {
    1: (
        <svg {...iconProps}>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
            <path d="M8.5 9.5h5l1 1.5-3.5 3.5L7.5 11z" />
        </svg>
    ),
    2: (
        <svg {...iconProps}>
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <path d="M14 3v5h5" />
            <path d="M9 13h6" />
            <path d="M9 17h4" />
        </svg>
    ),
    3: (
        <svg {...iconProps}>
            <path d="M21 12a8.5 8.5 0 0 1-12.4 7.5L3 21l1.5-5.4A8.5 8.5 0 1 1 21 12z" />
            <path d="M8.5 12h.01" />
            <path d="M12 12h.01" />
            <path d="M15.5 12h.01" />
        </svg>
    ),
    4: (
        <svg {...iconProps}>
            <path d="M3 3v18h18" />
            <path d="M7 15l4-4 3 3 5-6" />
        </svg>
    ),
    5: (
        <svg {...iconProps}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <rect x="9" y="10" width="6" height="5" rx="1" />
            <path d="M10.5 10V8.5a1.5 1.5 0 0 1 3 0V10" />
        </svg>
    ),
};

export const ROWS: [string, number, string, string][] = [
    ["cl-top", 1, "Find the Right Stone Faster", "Search diamond and gemstone inventory by specifications, certification and availability. Track stock across locations and keep pricing close at hand."],
    ["cl-top", 2, "Keep Sales and Memos Moving", "Create quotations, apply customer-specific pricing and manage memos through to invoicing. Stay on top of memo due dates with automated alerts."],
    ["cl-top", 3, "Share Stock With Your Buyers", "Share live inventory through WhatsApp and your client portal. Control pricing visibility and keep track of customer follow-ups."],
    ["cl-wide", 4, "Know What’s Owed. See What’s Profitable.", "Review revenue, outstanding balances and inventory value from your dashboard. Track profitability per stone and export reports to support your next business decision."],
    ["cl-wide", 5, "Protect Your Data. Control Team Access.", "Manage who can view and update your business records with roles and permissions. Keep your data protected with encrypted cloud storage and automatic backups."],
];

const dot = { width: 4, height: 4, borderRadius: 999, background: "#d3d8d6" };

export function Platform() {
    return (
        <section className="lp-platform" style={{ padding: "112px 24px 120px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 48 }}>
                {/* centred heading */}
                <Reveal style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600, color: "#111114", border: "2px solid transparent", background: "linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(90deg, #2c6f4b, #7fc88f, #36823a, #317a51) border-box" }}>
                        The Carat Logic Platform
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111114" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="m9 6 6 6-6 6" />
                        </svg>
                    </span>
                    <h2 style={{ margin: 0, fontSize: "clamp(34px, 4.6vw, 60px)", lineHeight: 1.05, fontWeight: 600, letterSpacing: "-0.045em", color: "#0c0c10" }}>More Control Over Every Stone, Sale and Payment.</h2>
                    <p style={{ margin: 0, maxWidth: 760, fontSize: "clamp(17px, 1.5vw, 19px)", lineHeight: 1.55, color: "#5f6663" }}>Find available stock, manage transactions, stay connected with buyers and monitor your business—all within Carat Logic.</p>
                </Reveal>

                {/* 3 + 2 card grid */}
                <Stagger className="cl-feat">
                    {ROWS.map(([span, icon, title, desc]) => (
                        // The motion wrapper carries the grid span; the article keeps the CSS hover transform.
                        <StaggerItem key={title} className={span} style={{ display: "flex" }}>
                            <article className="cl-fc" style={{ flex: 1, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 40, minHeight: 260, padding: 28, borderRadius: 22, background: "#ffffff", border: "1px solid #e6e9e8", boxShadow: "0 1px 2px rgba(16,24,20,0.04), 0 14px 32px rgba(16,24,20,0.06)", boxSizing: "border-box" }}>
                                <span style={{ width: 54, height: 54, borderRadius: 14, background: "#f5f6f6", border: "1px solid #e6e9e8", display: "flex", alignItems: "center", justifyContent: "center" }}>{ICONS[icon]}</span>
                                <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 520 }}>
                                    <h3 style={{ margin: 0, fontSize: 22, lineHeight: 1.25, fontWeight: 600, letterSpacing: "-0.02em", color: "#0c0c10" }}>{title}</h3>
                                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#5f6663" }}>{desc}</p>
                                </div>
                                <span aria-hidden="true" style={{ position: "absolute", right: 22, bottom: 22, display: "flex", gap: 6 }}>
                                    <span style={dot} />
                                    <span style={dot} />
                                    <span style={{ ...dot, background: "#317a51" }} />
                                </span>
                            </article>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
