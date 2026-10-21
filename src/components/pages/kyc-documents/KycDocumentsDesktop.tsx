"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { EASE, Reveal, Stagger, itemVariants, REVEAL_VIEWPORT } from "@/components/landing/motion";
import "./kyc-documents.css";

type Sec = { id: string; toc: string; h2: string; body: ReactNode };

const SECTIONS: Sec[] = [
    {
        id: "request",
        toc: "Request documents",
        h2: "Request the documents each onboarding needs",
        body: <p>Add document-upload fields to your KYC forms and choose whether each document is required or optional. You can also specify accepted file formats. Depending on your process, requests might include company registration records, business licences or proof of address.</p>,
    },
    {
        id: "submission",
        toc: "Documents with submissions",
        h2: "Keep documents with the form submission",
        body: <p>Contacts can upload documents alongside their KYC responses. Keeping the files with the submission helps your team review the documents in context with the information provided in the form.</p>,
    },
    {
        id: "expiry",
        toc: "Document details and expiry",
        h2: "Track document details and expiry",
        body: <p>Record expiry dates for documents that have them, such as licences or certificates. This helps your team see which documents may need follow-up as part of an ongoing KYC process.</p>,
    },
    {
        id: "followup",
        toc: "Follow-up and reminders",
        h2: "Follow up on incomplete or expiring documents",
        body: <p>Carat Logic KYC supports reminders for incomplete forms and documents nearing expiry. If information or a specific document is missing, your team can request the additional details needed to continue the review.</p>,
    },
    {
        id: "review",
        toc: "Review before an outcome",
        h2: "Review documents before recording an outcome",
        body: (
            <>
                <p>Review submitted information and documents as part of the KYC process. Your team can check whether requested items are present and readable, then ask for a replacement or more information when needed. A document upload or reminder does not verify a document by itself; your team remains responsible for reviewing it.</p>
                <div style={{ display: "flex", gap: 14, padding: "18px 20px", borderRadius: 16, background: "#f6f7f7", border: "1px solid #eceeed" }}>
                    <span style={{ flex: "none", width: 4, borderRadius: 999, background: "#317a51" }} />
                    <p style={{ fontSize: 16, color: "#2b302e" }}>
                        <strong style={{ color: "#0c0c10" }}>Example:</strong> When onboarding a supplier, your team could request a business licence and record its expiry date. If the form is incomplete or the licence is nearing expiry, a reminder can prompt follow-up. Your team reviews any updated document before recording the KYC outcome.
                    </p>
                </div>
            </>
        ),
    },
];

const TOC = [...SECTIONS.map((s) => ({ id: s.id, label: s.toc })), { id: "faqs", label: "FAQs" }];

const QA: [string, string][] = [
    ["What documents can contacts upload through Carat Logic KYC?", "You can add document-upload fields to KYC forms. Examples include business registration records, business licences and proof of address, depending on your process."],
    ["Can I make a document request required or optional?", "Yes. You can configure document fields as required or optional in the form."],
    ["Can Carat Logic KYC track document expiry dates?", "Yes. Expiry dates can be recorded for submitted documents, helping your team identify when follow-up may be needed."],
    ["Does Carat Logic KYC remind teams about incomplete forms or expiring documents?", "Carat Logic KYC supports reminders for incomplete forms and documents nearing expiry."],
    ["Does uploading a document automatically verify it?", "No. Uploading collects the document for review. Your team reviews it and decides whether further information or a replacement is needed."],
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

export function KycDocumentsDesktop() {
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
        <div className="pg-kycdoc" style={{ color: "#111114", background: "#ffffff" }}>
            {/* ============ PAGE HEADER ============ */}
            <section style={{ padding: "96px 24px 96px" }}>
                <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
                        <Reveal>
                            <h1 style={{ margin: 0, fontSize: 56, lineHeight: 1.06, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>Collect and Follow Up on KYC Documents</h1>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <p style={{ margin: 0, fontSize: 19, lineHeight: 1.6, color: "#5f6663" }}>Request business documents as part of KYC onboarding, track what has been submitted and follow up when information is incomplete or documents are nearing expiry. Carat Logic KYC supports jewellery, diamond and gemstone businesses working with customers, suppliers, brokers and partners.</p>
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
                                                    layoutId="pgKycdocTocPill"
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
                                    <FaqItem key={q} q={q} a={a} id={`kycdoc-faq-${i}`} open={i === open} onToggle={() => setOpen(i === open ? -1 : i)} />
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
                            <h2 style={{ color: "#ffffff", fontSize: 26, maxWidth: 460 }}>See how Carat Logic KYC supports document collection and review</h2>
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
