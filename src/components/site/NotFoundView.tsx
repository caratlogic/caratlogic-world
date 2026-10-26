"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/components/landing/motion";
import "./not-found.css";

/*
 * 404 page in the home hero's visual language: gradient-bordered pill, two-tone headline, the hero's
 * faceted diamond on a glass tile (with the same gentle bob), and the hero's dark / green pill buttons.
 */

const ACCENT = "#317A51";

const QUICK_LINKS = [
    { label: "Carat Logic Inventory", href: "/inventory" },
    { label: "Carat Logic KYC", href: "/kyc" },
    { label: "Integrations", href: "/integrations" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blogs", href: "/blogs" },
];

function Arrow({ stroke }: { stroke: string }) {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
        </svg>
    );
}

export function NotFoundView() {
    const reduce = useReducedMotion();
    const rise = (i: number) => (reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, ease: EASE, delay: 0.05 + i * 0.08 } });

    return (
        <section className="site-404">
            <div aria-hidden="true" className="site-404-glow" />
            <div className="site-404-inner">
                {/* faceted diamond on a glass tile (from the hero's floating card) */}
                <motion.div {...rise(0)} className="site-404-gem-wrap" aria-hidden="true">
                    <div className="site-404-gem">
                        <svg width="78" height="72" viewBox="0 0 72 66">
                            <polygon points="16,2 56,2 70,22 2,22" fill="#7fc391" />
                            <polygon points="16,2 26,22 2,22" fill="#a7d7b2" />
                            <polygon points="56,2 70,22 46,22" fill="#5fae7a" />
                            <polygon points="26,22 36,2 46,22" fill="#bfe0c9" />
                            <polygon points="2,22 26,22 36,64" fill="#3f9463" />
                            <polygon points="26,22 46,22 36,64" fill={ACCENT} />
                            <polygon points="46,22 70,22 36,64" fill="#245c3e" />
                        </svg>
                    </div>
                </motion.div>

                <motion.span {...rise(1)} className="site-404-pill">
                    Error 404
                </motion.span>

                <motion.h1 {...rise(2)} className="site-404-title">
                    This Page Isn&rsquo;t in Our Inventory. <span style={{ color: "#6b6b75" }}>Let&rsquo;s Get You Back on Track.</span>
                </motion.h1>

                <motion.p {...rise(3)} className="site-404-lead">
                    The page you&rsquo;re looking for may have moved, or the link may be out of date. Head back home or explore the rest of Carat Logic below.
                </motion.p>

                <motion.div {...rise(4)} className="site-404-actions">
                    <Link href="/" className="site-404-btn site-404-btn-dark">
                        <span style={{ color: "#ffffff" }}>Back to home</span>
                        <span className="site-404-knob">
                            <Arrow stroke="#111827" />
                        </span>
                    </Link>
                    <Link href="/contact" className="site-404-btn site-404-btn-green">
                        <span style={{ color: "#ffffff" }}>Contact us</span>
                        <span className="site-404-knob">
                            <Arrow stroke="#245c3e" />
                        </span>
                    </Link>
                </motion.div>

                <motion.nav {...rise(5)} aria-label="Popular pages" className="site-404-links">
                    <span className="site-404-links-label">Popular pages</span>
                    <span className="site-404-chips">
                        {QUICK_LINKS.map((l) => (
                            <Link key={l.href} href={l.href} className="site-404-chip">
                                {l.label}
                            </Link>
                        ))}
                    </span>
                </motion.nav>
            </div>
        </section>
    );
}
