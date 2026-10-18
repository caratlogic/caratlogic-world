"use client";

import { Reveal, Stagger, StaggerItem } from "./motion";
import { ICONS, ROWS } from "./Platform";
import "./platform-mobile.css";

const dot = { width: 4, height: 4, borderRadius: 999, background: "#d3d8d6" };

export function PlatformMobile() {
    return (
        <section className="v2-platform-m" style={{ padding: "64px 20px 72px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {/* centred heading */}
                <Reveal style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600, color: "#111114", border: "2px solid transparent", background: "linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(90deg, #2c6f4b, #7fc88f, #36823a, #317a51) border-box" }}>
                        The Carat Logic Platform
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111114" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="m9 6 6 6-6 6" />
                        </svg>
                    </span>
                    <h2 style={{ margin: 0, fontSize: 32, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.045em", color: "#0c0c10" }}>More Control Over Every Stone, Sale and Payment.</h2>
                    <p style={{ margin: 0, maxWidth: 760, fontSize: 16, lineHeight: 1.55, color: "#5f6663" }}>Find available stock, manage transactions, stay connected with buyers and monitor your business—all within Carat Logic.</p>
                </Reveal>

                {/* stacked cards */}
                <Stagger className="cl-feat">
                    {ROWS.map(([span, icon, title, desc]) => (
                        // The motion wrapper animates in; the article keeps the CSS hover transform.
                        <StaggerItem key={title}>
                            <article className={`cl-fc ${span}`} style={{ position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 28, padding: "24px 22px 30px", borderRadius: 20, background: "#ffffff", border: "1px solid #e6e9e8", boxShadow: "0 1px 2px rgba(16,24,20,0.04), 0 14px 32px rgba(16,24,20,0.06)", boxSizing: "border-box" }}>
                                <span style={{ width: 48, height: 48, borderRadius: 13, background: "#f5f6f6", border: "1px solid #e6e9e8", display: "flex", alignItems: "center", justifyContent: "center" }}>{ICONS[icon]}</span>
                                <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 520 }}>
                                    <h3 style={{ margin: 0, fontSize: 20, lineHeight: 1.25, fontWeight: 600, letterSpacing: "-0.02em", color: "#0c0c10" }}>{title}</h3>
                                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#5f6663" }}>{desc}</p>
                                </div>
                                <span aria-hidden="true" style={{ position: "absolute", right: 20, top: 24, display: "flex", gap: 6 }}>
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
