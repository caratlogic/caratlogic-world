"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";
import { EASE, Reveal, Stagger, itemVariants, REVEAL_VIEWPORT } from "@/components/landing/motion";
import "./kyc-documents-mobile.css";

type Sec = { id: string; h2: string; body: ReactNode };

const SECTIONS: Sec[] = [
    {
        id: "m-request",
        h2: "Request the documents each onboarding needs",
        body: <p>Add document-upload fields to your KYC forms and choose whether each document is required or optional. You can also specify accepted file formats. Depending on your process, requests might include company registration records, business licences or proof of address.</p>,
    },
    {
        id: "m-submission",
        h2: "Keep documents with the form submission",
        body: <p>Contacts can upload documents alongside their KYC responses. Keeping the files with the submission helps your team review the documents in context with the information provided in the form.</p>,
    },
    {
        id: "m-expiry",
        h2: "Track document details and expiry",
        body: <p>Record expiry dates for documents that have them, such as licences or certificates. This helps your team see which documents may need follow-up as part of an ongoing KYC process.</p>,
    },
    {
        id: "m-followup",
        h2: "Follow up on incomplete or expiring documents",
        body: <p>Carat Logic KYC supports reminders for incomplete forms and documents nearing expiry. If information or a specific document is missing, your team can request the additional details needed to continue the review.</p>,
    },
    {
        id: "m-review",
        h2: "Review documents before recording an outcome",
        body: (
            <>
                <p>Review submitted information and documents as part of the KYC process. Your team can check whether requested items are present and readable, then ask for a replacement or more information when needed. A document upload or reminder does not verify a document by itself; your team remains responsible for reviewing it.</p>
                <div style={{ display: "flex", gap: 14, padding: "14px 16px", borderRadius: 14, background: "#f6f7f7", border: "1px solid #eceeed" }}>
                    <span style={{ flex: "none", width: 4, borderRadius: 999, background: "#317a51" }} />
                    <p style={{ fontSize: 15, color: "#2b302e" }}>
                        <strong style={{ color: "#0c0c10" }}>Example:</strong> When onboarding a supplier, your team could request a business licence and record its expiry date. If the form is incomplete or the licence is nearing expiry, a reminder can prompt follow-up. Your team reviews any updated document before recording the KYC outcome.
                    </p>
                </div>
            </>
        ),
    },
];

const QA: [string, string][] = [
    ["What documents can contacts upload through Carat Logic KYC?", "You can add document-upload fields to KYC forms. Examples include business registration records, business licences and proof of address, depending on your process."],
    ["Can I make a document request required or optional?", "Yes. You can configure document fields as required or optional in the form."],
    ["Can Carat Logic KYC track document expiry dates?", "Yes. Expiry dates can be recorded for submitted documents, helping your team identify when follow-up may be needed."],
    ["Does Carat Logic KYC remind teams about incomplete forms or expiring documents?", "Carat Logic KYC supports reminders for incomplete forms and documents nearing expiry."],
    ["Does uploading a document automatically verify it?", "No. Uploading collects the document for review. Your team reviews it and decides whether further information or a replacement is needed."],
];

function FaqItem({ q, a, open, onToggle, id }: { q: string; a: string; open: boolean; onToggle: () => void; id: string }) {
    const reduce = useReducedMotion();
    const t = reduce ? { duration: 0 } : { duration: 0.35, ease: EASE };

    return (
        <motion.div
            variants={itemVariants}
            style={{
                borderRadius: 16,
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
                style={{ width: "100%", minHeight: 60, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "15px 16px 15px 18px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
            >
                <span style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.4, color: "#0c0c10" }}>{q}</span>
                <motion.span
                    initial={false}
                    animate={{ backgroundColor: open ? "#111827" : "#f1f3f2" }}
                    transition={reduce ? { duration: 0 } : { duration: 0.2 }}
                    style={{ flex: "none", width: 30, height: 30, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                    <motion.svg
                        width="13"
                        height="13"
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
                        <p style={{ padding: "0 18px 18px", fontSize: 14, lineHeight: 1.65, color: "#5f6663" }}>{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function KycDocumentsMobile() {
    const reduce = useReducedMotion();
    const [open, setOpen] = useState(0);

    const secIn = {
        initial: reduce ? false : { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6, ease: EASE },
    } as const;

    return (
        <div className="pg-kycdoc-m" style={{ position: "relative", overflowX: "clip", boxSizing: "border-box", color: "#111114", background: "#ffffff" }}>
            {/* page header */}
            <section style={{ padding: "48px 20px 0", textAlign: "center" }}>
                <Reveal y={18}>
                    <h1 style={{ margin: 0, fontSize: 34, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>Collect and Follow Up on KYC Documents</h1>
                </Reveal>
                <Reveal y={18} delay={0.08}>
                    <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.6, color: "#5f6663" }}>Request business documents as part of KYC onboarding, track what has been submitted and follow up when information is incomplete or documents are nearing expiry. Carat Logic KYC supports jewellery, diamond and gemstone businesses working with customers, suppliers, brokers and partners.</p>
                </Reveal>
                <div style={{ height: 120 }} />
            </section>

            {/* action bar: sits over the bottom of the hero on first load, then stays pinned to the bottom of the screen while scrolling */}
            <motion.div
                style={{ position: "sticky", top: "calc(100vh - 86px)", margin: "-86px 12px 18px", zIndex: 10, padding: 8, borderRadius: 999, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", border: "1px solid #e3e6e5", boxShadow: "0 18px 40px rgba(16,24,20,0.16), 0 2px 6px rgba(16,24,20,0.06)", display: "flex", gap: 8, boxSizing: "border-box" }}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
            >
                <a href="/contact" className="cl-bar" style={{ flex: 1, minHeight: 52, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "5px 5px 5px 18px", borderRadius: 999, background: "#111827", color: "#ffffff", fontSize: 15, fontWeight: 600, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)" }}>
                    <span style={{ color: "#ffffff", whiteSpace: "nowrap" }}>Get started</span>
                    <span style={{ flex: "none", width: 40, height: 40, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12h14" />
                            <path d="m13 6 6 6-6 6" />
                        </svg>
                    </span>
                </a>
                <a href="/contact?tab=demo" className="cl-bar" style={{ flex: 1, minHeight: 52, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "5px 5px 5px 18px", borderRadius: 999, background: "linear-gradient(90deg, #245c3e 0%, #317a51 55%, #3f9463 100%)", color: "#ffffff", fontSize: 15, fontWeight: 600, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 18px rgba(44,111,75,0.3)" }}>
                    <span style={{ color: "#ffffff", whiteSpace: "nowrap" }}>Book a demo</span>
                    <span style={{ flex: "none", width: 40, height: 40, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#245c3e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12h14" />
                            <path d="m13 6 6 6-6 6" />
                        </svg>
                    </span>
                </a>
            </motion.div>

            {/* content */}
            <div style={{ padding: "8px 20px 64px" }}>
                {SECTIONS.map((s, i) => (
                    <motion.section
                        key={s.id}
                        id={s.id}
                        className="cl-m"
                        style={
                            i === 0
                                ? { display: "flex", flexDirection: "column", gap: 16, padding: "40px 0 0" }
                                : { display: "flex", flexDirection: "column", gap: 16, padding: "40px 0 0", marginTop: 40, borderTop: "1px solid #eceeed" }
                        }
                        {...secIn}
                    >
                        <h2>{s.h2}</h2>
                        {s.body}
                    </motion.section>
                ))}
                <motion.section id="m-faqs" className="cl-m" style={{ marginTop: 40, paddingTop: 40, borderTop: "1px solid #eceeed", display: "flex", flexDirection: "column", gap: 18 }} {...secIn}>
                    <h2>Frequently asked questions</h2>
                    <Stagger style={{ display: "flex", flexDirection: "column", gap: 10 }} stagger={0.06}>
                        {QA.map(([q, a], i) => (
                            <FaqItem key={q} q={q} a={a} id={`m-kycdoc-faq-${i}`} open={i === open} onToggle={() => setOpen(i === open ? -1 : i)} />
                        ))}
                    </Stagger>
                </motion.section>
                <motion.section
                    className="cl-m"
                    style={{ marginTop: 40, padding: "24px 20px", borderRadius: 20, background: "#111827" }}
                    initial={reduce ? false : { opacity: 0, y: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={REVEAL_VIEWPORT}
                    transition={{ duration: 0.6, ease: EASE }}
                >
                    <h2 style={{ color: "#ffffff", fontSize: 23 }}>See how Carat Logic KYC supports document collection and review</h2>
                </motion.section>
            </div>
        </div>
    );
}
