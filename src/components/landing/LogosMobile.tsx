"use client";

import { Reveal } from "./motion";
import "./logos-mobile.css";

const NAMES = ["Shapiro Gems", "Antwerp Gems", "Gem World", "Infinity Gems", "Dalila Diamonds"];

/** The design lists the five names twice per row (10 logos). */
const LOGOS = [...NAMES, ...NAMES].map((name, i) => ({ name, id: i }));

/**
 * Two identical rows; the second is aria-hidden and makes the -50% marquee loop seamless.
 * One row is ~1,400px wide, well beyond the <768px viewports this renders in, so no extra repeats are needed.
 */
const ROWS = [{ hidden: false }, { hidden: true }];

const stripMask = "linear-gradient(90deg, rgba(0,0,0,0) 0%, #000000 8%, #000000 92%, rgba(0,0,0,0) 100%)";

export function LogosMobile() {
    return (
        <section className="lp-logos-m" style={{ color: "#111114", background: "#ffffff", padding: "36px 0 44px", boxSizing: "border-box" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
                <Reveal y={14}>
                    <p style={{ margin: 0, padding: "0 24px", textAlign: "center", fontSize: 14, lineHeight: 1.45, fontWeight: 500, color: "#111114" }}>
                        Trusted by diamond and gemstone businesses worldwide
                    </p>
                </Reveal>

                <Reveal
                    className="cl-strip"
                    delay={0.1}
                    y={14}
                    style={{ position: "relative", width: "100%", overflow: "hidden", WebkitMaskImage: stripMask, maskImage: stripMask }}
                >
                    <div className="cl-track" style={{ display: "flex", width: "max-content" }}>
                        {ROWS.map((row, r) => (
                            <div key={r} aria-hidden={row.hidden} style={{ display: "flex", alignItems: "center", gap: 36, paddingRight: 36 }}>
                                {LOGOS.map((l) => (
                                    <span key={l.id} className="cl-logo" style={{ display: "flex", alignItems: "center", gap: 8, height: 36, color: "#2b302e" }}>
                                        <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>{l.name}</span>
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
