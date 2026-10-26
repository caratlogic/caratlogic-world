"use client";

import { Reveal } from "./motion";
import { CLIENTS } from "@/components/site/clients";
import { ClientChip } from "@/components/site/ClientChip";
import "./logos.css";

/**
 * One set of the 9 client chips is ~2,900px wide (incl. gaps). Each marquee half repeats the set so it
 * covers very wide or zoomed-out screens without a gap, and the duration scales with the repeats so the
 * strip keeps a steady speed (~44s per set).
 */
const SET_REPEATS = 3;
const MARQUEE_SECONDS = 44 * SET_REPEATS;

/** Two identical rows; the second is aria-hidden and makes the -50% marquee loop seamless. */
const ROWS = [{ hidden: false }, { hidden: true }];

const stripMask = "linear-gradient(90deg, rgba(0,0,0,0) 0%, #000000 12%, #000000 88%, rgba(0,0,0,0) 100%)";

export function Logos() {
    return (
        <section className="lp-logos" style={{ color: "#111114", background: "#ffffff", padding: "56px 0 72px", boxSizing: "border-box" }}>
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
                                {Array.from({ length: SET_REPEATS }, (_, k) =>
                                    CLIENTS.map((c) => <ClientChip key={`${k}-${c.name}`} client={c} size="lg" hidden={row.hidden || k > 0} />),
                                )}
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
