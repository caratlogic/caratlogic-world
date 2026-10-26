"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Reveal, Stagger, itemVariants } from "@/components/landing/motion";
import { INTEGRATIONS, REQUEST_INTEGRATION_HREF, type Integration } from "@/components/site/integrations";
import "./integrations-index.css";

/*
 * /integrations — index of every integration page. There is no artboard for it, so it is composed from
 * the site's existing pieces: the feature-page header and dark demo card (feature-doc template) and the
 * integration hub's node tiles, category chips and two-way icon.
 */

const GROUPS: { id: Integration["group"]; kicker: string; title: string; intro: string }[] = [
    { id: "marketplace", kicker: "Diamond marketplaces", title: "Share stock where buyers search", intro: "Send stock out to the marketplaces you trade on and bring their updates back into your Carat Logic inventory." },
    { id: "e-invoicing", kicker: "E-invoicing", title: "Exchange e-invoices with your trading partners", intro: "Send structured e-invoices through national and cross-border networks and receive incoming invoices straight into Carat Logic." },
];

function Arrow({ stroke = "#111827", size = 14, width = 2.4 }: { stroke?: string; size?: number; width?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
        </svg>
    );
}

function SyncIcon() {
    return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 7h12l-3-3" />
            <path d="M17 17H5l3 3" />
        </svg>
    );
}

/** Card for one integration: monogram tile ⇄ Carat Logic tile (as in the hub's hover card), name, summary, link. */
function IntegrationCard({ item }: { item: Integration }) {
    return (
        <motion.div variants={itemVariants} style={{ display: "flex" }}>
            <Link href={item.href} className="cl-card" aria-label={`${item.name} integration`}>
                <span className="cl-card-art">
                    <span className="cl-chip">{item.category}</span>
                    <span className="cl-tile cl-mono">{item.mono}</span>
                    <span aria-hidden="true" className="cl-dash" />
                    <span aria-hidden="true" className="cl-sync">
                        <SyncIcon />
                    </span>
                    <span aria-hidden="true" className="cl-dash" />
                    <span className="cl-tile" style={{ padding: 7 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/design/a0624d387c799bef34880b03ced88e69.webp" alt="" style={{ width: "100%", height: "auto", display: "block" }} />
                    </span>
                </span>
                <span className="cl-card-body">
                    <span className="cl-card-title">{item.name}</span>
                    <span className="cl-card-desc">{item.desc}</span>
                </span>
                <span className="cl-card-foot">
                    <span>View integration</span>
                    <span className="cl-go">
                        <Arrow />
                    </span>
                </span>
            </Link>
        </motion.div>
    );
}

export function IntegrationsIndex() {
    const reduce = useReducedMotion();
    return (
        <div className="pg-intidx" style={{ color: "#111114", background: "#ffffff" }}>
            {/* ============ PAGE HEADER (feature-page style) ============ */}
            <section className="cl-head">
                <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
                    <Reveal>
                        <span className="cl-kicker">Integrations</span>
                    </Reveal>
                    <Reveal delay={0.04}>
                        <h1 className="cl-h1">Connect Carat Logic with Your Marketplaces and E-Invoicing</h1>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <p className="cl-lead">Send data out from Carat Logic Inventory and receive it back in. Share stock and invoices with marketplaces and e-invoicing networks, and bring updates and incoming e-invoices straight into your workflow.</p>
                    </Reveal>
                    <Reveal delay={0.16} style={{ marginTop: 8 }}>
                        <motion.a href="/contact?tab=demo" className="cl-btn cl-btn-green" whileHover={reduce ? undefined : "hover"}>
                            <span style={{ color: "#ffffff" }}>Book a demo</span>
                            <motion.span variants={{ hover: { x: 3 } }} className="cl-btn-knob">
                                <Arrow stroke="#245c3e" size={17} width={2.2} />
                            </motion.span>
                        </motion.a>
                    </Reveal>
                </div>
            </section>

            {/* ============ INTEGRATION GROUPS ============ */}
            <div className="cl-wrap">
                {GROUPS.map((g) => (
                    <section key={g.id} className="cl-group" aria-labelledby={`intidx-${g.id}`}>
                        <Reveal className="cl-group-head">
                            <span className="cl-kicker">{g.kicker}</span>
                            <h2 id={`intidx-${g.id}`} className="cl-h2">
                                {g.title}
                            </h2>
                            <p className="cl-group-intro">{g.intro}</p>
                        </Reveal>
                        {/* one row per group on desktop: the grid gets as many columns as the group has cards */}
                        <Stagger className="cl-grid" stagger={0.06} style={{ "--cols": INTEGRATIONS.filter((i) => i.group === g.id).length } as CSSProperties}>
                            {INTEGRATIONS.filter((i) => i.group === g.id).map((item) => (
                                <IntegrationCard key={item.slug} item={item} />
                            ))}
                        </Stagger>
                    </section>
                ))}

                {/* request a connection */}
                <Reveal as="section" className="cl-request">
                    <span className="cl-tile cl-mono cl-plus" aria-hidden="true">
                        +
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 220 }}>
                        <span className="cl-card-title">Need another connection?</span>
                        <span className="cl-card-desc">Trade on another marketplace or use a different e-invoicing or billing system? Tell us which connections matter to your business.</span>
                    </span>
                    <Link href={REQUEST_INTEGRATION_HREF} className="cl-btn cl-btn-outline">
                        Request a connection
                        <Arrow stroke="#245c3e" />
                    </Link>
                </Reveal>

                {/* ============ DEMO CARD (feature-page style) ============ */}
                <Reveal as="section" className="cl-cta">
                    <h2 className="cl-cta-title">See how these integrations fit your workflow</h2>
                    <motion.a href="/contact?tab=demo" className="cl-btn cl-btn-white" whileHover={reduce ? undefined : "hover"}>
                        <span style={{ color: "#111827" }}>Book a demo</span>
                        <motion.span variants={{ hover: { x: 3 } }} className="cl-btn-knob cl-btn-knob-green">
                            <Arrow stroke="#ffffff" size={16} />
                        </motion.span>
                    </motion.a>
                </Reveal>
            </div>
        </div>
    );
}
