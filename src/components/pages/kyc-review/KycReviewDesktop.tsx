"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { EASE, Reveal, Stagger, itemVariants, REVEAL_VIEWPORT } from "@/components/landing/motion";
import "./kyc-review.css";

type Sec = { id: string; toc: string; h2: string; body: ReactNode };

const SECTIONS: Sec[] = [
    {
        id: "status",
        toc: "Submission status",
        h2: "See the status of each submission",
        body: <p>Track KYC progress through statuses such as In Progress, Submitted, Under Review, Approved, Rejected and Expired. Your team can see which submissions need attention and which have reached a decision.</p>,
    },
    {
        id: "review",
        toc: "Review information and documents",
        h2: "Review information and documents",
        body: <p>When a contact submits a KYC form, your team can review the submitted information and supporting documents. Record the review outcome and any follow-up notes with the submission so the next action is clear.</p>,
    },
    {
        id: "missing",
        toc: "Request missing information",
        h2: "Request missing information",
        body: <p>If a submission is incomplete or needs clarification, ask the contact for the specific information or document required. This gives them a clear next step and helps your team continue the review when the response arrives.</p>,
    },
    {
        id: "emails",
        toc: "Email updates",
        h2: "Keep email updates consistent",
        body: <p>Use KYC email templates for key steps, including invitations, submission updates, requests for additional information and decisions. The templates can be edited and previewed so messages reflect your communication style.</p>,
    },
    {
        id: "decision",
        toc: "Your team decides",
        h2: "Keep the decision with your team",
        body: <p>Carat Logic KYC organizes submissions, status updates and follow-up. Your team reviews the information and records the outcome; submitting a form does not automatically approve a business.</p>,
    },
];

const TOC = [...SECTIONS.map((s) => ({ id: s.id, label: s.toc })), { id: "faqs", label: "FAQs" }];

const QA: [string, string][] = [
    ["Which KYC statuses can my team track?", "Statuses include In Progress, Submitted, Under Review, Approved, Rejected and Expired."],
    ["Can we request more information after reviewing a submission?", "Yes. Your team can ask the contact for specific missing information or documents and continue the review after they respond."],
    ["Can contacts receive email updates about their KYC submission?", "Carat Logic KYC includes email templates for invitations, submission updates, requests for additional information and decisions. The message content can be edited and previewed."],
    ["Does Carat Logic KYC automatically approve a submission?", "No. Your team reviews submitted information and records the KYC outcome."],
];

/** Offset (px) below the fixed site header at which a section counts as "current". */
const SPY_OFFSET = 160;

function useActiveSection(ids: string[]) {
    const [active, setActive] = useState(ids[0]);
    useEffect(() => {
        let raf = 0;
        const update = () => {
            raf = 0;
            let current = ids[0];
            for (const id of ids) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top - SPY_OFFSET <= 0) current = id;
            }
            // At the very bottom of the page, highlight the last entry.
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = ids[ids.length - 1];
            setActive(current);
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [ids]);
    return active;
}

const TOC_IDS = TOC.map((t) => t.id);

function FaqItem({ q, a, open, onToggle, id }: { q: string; a: string; open: boolean; onToggle: () => void; id: string }) {
    const reduce = useReducedMotion();
    const t = reduce ? { duration: 0 } : { duration: 0.35, ease: EASE };

    return (
        <motion.div
            variants={itemVariants}
            style={{
                borderRadius: 18,
                background: "#ffffff",
                border: `1px solid ${open ? "#d5dcd8" : "#e6e9e8"}`,
                boxShadow: open ? "0 14px 30px rgba(16,24,20,0.07)" : undefined,
                transition: "border-color .2s ease, box-shadow .2s ease",
            }}
        >
            <button
                type="button"
                className="cl-q"
                onClick={onToggle}
                aria-expanded={open}
                aria-controls={`${id}-panel`}
                id={`${id}-btn`}
                style={{ width: "100%", minHeight: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, padding: "16px 20px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
            >
                <span style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.4, color: "#0c0c10" }}>{q}</span>
                <motion.span
                    initial={false}
                    animate={{ backgroundColor: open ? "#111827" : "#f1f3f2" }}
                    transition={reduce ? { duration: 0 } : { duration: 0.2 }}
                    style={{ flex: "none", width: 30, height: 30, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                    <motion.svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        aria-hidden="true"
                        initial={false}
                        animate={{ rotate: open ? 180 : 0, stroke: open ? "#ffffff" : "#111827" }}
                        transition={t}
                    >
                        <path d="M5 12h14" />
                        <motion.path
                            d="M12 5v14"
                            initial={false}
                            animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1 }}
                            transition={t}
                            style={{ transformOrigin: "center", transformBox: "fill-box" }}
                        />
                    </motion.svg>
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="panel"
                        id={`${id}-panel`}
                        role="region"
                        aria-labelledby={`${id}-btn`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={t}
                        style={{ overflow: "hidden" }}
                    >
                        <p style={{ margin: 0, padding: "0 20px 20px", fontSize: 16, lineHeight: 1.7, color: "#5f6663" }}>{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function KycReviewDesktop() {
    const reduce = useReducedMotion();
    const [open, setOpen] = useState(0);
    const active = useActiveSection(TOC_IDS);

    const secIn = {
        initial: reduce ? false : { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.7, ease: EASE },
    } as const;

    return (
        <div className="pg-kycrev" style={{ color: "#111114", background: "#ffffff" }}>
            {/* ============ PAGE HEADER ============ */}
            <section style={{ padding: "96px 24px 96px" }}>
                <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
                        <Reveal>
                            <h1 style={{ margin: 0, fontSize: 56, lineHeight: 1.06, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>Review KYC Submissions and Track Their Status</h1>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <p style={{ margin: 0, fontSize: 19, lineHeight: 1.6, color: "#5f6663" }}>See where each KYC submission stands, review the information and documents provided, and follow up when something is missing. Carat Logic KYC helps jewellery, diamond and gemstone businesses manage onboarding for customers, suppliers, brokers and partners.</p>
                        </Reveal>
                        <Reveal delay={0.16} style={{ alignSelf: "center", marginTop: 8 }}>
                            <a href="/contact?tab=demo" className="cl-btn" style={{ display: "flex", alignItems: "center", gap: 14, padding: "8px 8px 8px 26px", borderRadius: 999, background: "linear-gradient(90deg, #245c3e 0%, #317a51 55%, #3f9463 100%)", color: "#ffffff", fontSize: 17, fontWeight: 600, boxShadow: "0 0 0 5px #ffffff, 0 0 0 6px #cfe8d0, 0 12px 28px rgba(44,111,75,0.3)" }}>
                                <span style={{ color: "#ffffff" }}>Book a demo</span>
                                <span style={{ width: 40, height: 40, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#245c3e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M5 12h14" />
                                        <path d="m13 6 6 6-6 6" />
                                    </svg>
                                </span>
                            </a>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ MAIN CONTENT ============ */}
            <div style={{ padding: "0 24px 104px" }}>
                <div className="cl-dbody" style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <aside className="cl-tocwrap" style={{ position: "sticky", top: 120 }}>
                        <motion.div
                            initial={reduce ? false : { opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
                        >
                            <span style={{ display: "block", padding: "0 16px 12px", fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b736f" }}>On this page</span>
                            <nav className="cl-toc" aria-label="On this page" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                {TOC.map((t) => {
                                    const on = t.id === active;
                                    return (
                                        <a key={t.id} href={`#${t.id}`} className={on ? "on" : undefined} aria-current={on ? "location" : undefined}>
                                            {on && (
                                                <motion.span
                                                    layoutId="pgKycrevTocPill"
                                                    className="cl-tocpill"
                                                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                                                />
                                            )}
                                            <span style={{ position: "relative" }}>{t.label}</span>
                                        </a>
                                    );
                                })}
                            </nav>
                        </motion.div>
                    </aside>
                    <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
                        {SECTIONS.map((s, i) => (
                            <motion.section
                                key={s.id}
                                id={s.id}
                                className="cl-sec"
                                style={
                                    i === 0
                                        ? { display: "flex", flexDirection: "column", gap: 18, paddingTop: 0 }
                                        : { display: "flex", flexDirection: "column", gap: 18, paddingTop: 56, borderTop: "1px solid #eceeed", marginTop: 56 }
                                }
                                {...secIn}
                            >
                                <h2>{s.h2}</h2>
                                {s.body}
                            </motion.section>
                        ))}
                        <motion.section id="faqs" className="cl-sec" style={{ marginTop: 56, paddingTop: 56, borderTop: "1px solid #eceeed", display: "flex", flexDirection: "column", gap: 22 }} {...secIn}>
                            <h2>Frequently asked questions</h2>
                            <Stagger style={{ display: "flex", flexDirection: "column", gap: 12 }} stagger={0.06}>
                                {QA.map(([q, a], i) => (
                                    <FaqItem key={q} q={q} a={a} id={`kycrev-faq-${i}`} open={i === open} onToggle={() => setOpen(i === open ? -1 : i)} />
                                ))}
                            </Stagger>
                        </motion.section>
                        <motion.section
                            className="cl-sec"
                            style={{ marginTop: 56, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28, padding: 32, borderRadius: 22, background: "#111827" }}
                            initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={REVEAL_VIEWPORT}
                            transition={{ duration: 0.7, ease: EASE }}
                        >
                            <h2 style={{ color: "#ffffff", fontSize: 26, maxWidth: 460 }}>See how Carat Logic KYC supports review and follow-up</h2>
                            <a href="/contact?tab=demo" className="cl-btn" style={{ flex: "none", display: "flex", alignItems: "center", gap: 14, padding: "7px 7px 7px 24px", borderRadius: 999, background: "#ffffff", color: "#111827", fontSize: 16, fontWeight: 600 }}>
                                <span style={{ color: "#111827" }}>Book a demo</span>
                                <span style={{ width: 38, height: 38, borderRadius: 999, background: "#317a51", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M5 12h14" />
                                        <path d="m13 6 6 6-6 6" />
                                    </svg>
                                </span>
                            </a>
                        </motion.section>
                    </div>
                </div>
            </div>
        </div>
    );
}
