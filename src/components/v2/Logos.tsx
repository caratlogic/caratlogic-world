"use client";

import { Reveal } from "./motion";
import "./logos.css";

const NAMES = ["Shapiro Gems", "Antwerp Gems", "Gem World", "Infinity Gems", "Dalila Diamonds"];

/** The design lists the five names twice per row (10 logos). */
const LOGOS = [...NAMES, ...NAMES].map((name, i) => ({ name, id: i }));

/**
 * One set of 10 logos is ~2,250px wide (incl. gaps), narrower than wide or zoomed-out screens, which left
 * an empty gap as the strip scrolled. Each marquee half repeats the set so it covers viewports up to
 * ~6,700px, and the duration scales with the repeats to keep the design's speed (36s per set).
 */
const SET_REPEATS = 3;
const MARQUEE_SECONDS = 36 * SET_REPEATS;

/** Two identical rows; the second is aria-hidden and makes the -50% marquee loop seamless. */
const ROWS = [{ hidden: false }, { hidden: true }];

const stripMask = "linear-gradient(90deg, rgba(0,0,0,0) 0%, #000000 12%, #000000 88%, rgba(0,0,0,0) 100%)";

export function Logos() {
    return (
        <section className="v2-logos" style={{ color: "#111114", background: "#ffffff", padding: "56px 0 72px", boxSizing: "border-box" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
                <Reveal y={16}>
                    <p style={{ margin: 0, padding: "0 24px", textAlign: "center", fontSize: 17, fontWeight: 500, color: "#111114" }}>
                        Trusted by diamond and gemstone businesses worldwide
                    </p>
                </Reveal>

                <Reveal
                    className="cl-strip"
                    delay={0.1}
                    y={16}
                    style={{ position: "relative", width: "100%", overflow: "hidden", WebkitMaskImage: stripMask, maskImage: stripMask }}
                >
                    <div className="cl-track" style={{ display: "flex", width: "max-content", animationDuration: `${MARQUEE_SECONDS}s` }}>
                        {ROWS.map((row, r) => (
                            <div key={r} aria-hidden={row.hidden} style={{ display: "flex", alignItems: "center", gap: 72, paddingRight: 72 }}>
                                {Array.from({ length: SET_REPEATS }, (_, k) => LOGOS.map((l) => ({ ...l, key: `${k}-${l.id}`, repeat: k > 0 }))).flat().map((l) => (
                                    <span key={l.key} className="cl-logo" aria-hidden={l.repeat || undefined} style={{ display: "flex", alignItems: "center", gap: 12, height: 48, color: "#2b302e" }}>
                                        <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>{l.name}</span>
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
