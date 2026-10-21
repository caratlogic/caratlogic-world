"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE, Stagger, itemVariants } from "@/components/landing/motion";
import "./kyc-onboarding-mobile.css";

/* ---------- content (verbatim from KycOnboardingPageMobile.dc.html) ---------- */

const H1 = "Business Contact Onboarding for Jewellery, Diamond and Gem Businesses";
const INTRO =
    "Keep customer, supplier, broker and partner details organized, then connect each business contact to the right KYC form. Carat Logic KYC supports onboarding for B2B, B2C and manufacturing teams.";
const CTA_TITLE = "See how Carat Logic KYC supports business onboarding";

type Section = { id: string; title: string; body: string; note?: string };

const SECTIONS: Section[] = [
    {
        id: "m-find",
        title: "Find the business before adding a new record",
        body: "Search for an existing contact by company name and, where useful, by contact person or email. If the business is already listed, continue with that record. If it is new, choose Add Business Contact. Checking first helps your team avoid duplicate records.",
    },
    {
        id: "m-details",
        title: "Keep company and contact details together",
        body: "Create a business record with the company name and the details of the person your team works with, including their name, primary email and mobile number. Add address and website details where available. Relevant business or commercial information, such as VAT details and currency, can also be recorded.",
    },
    {
        id: "m-classify",
        title: "Classify the relationship and set its KYC status",
        body: "Choose the contact type that fits the relationship, such as customer, supplier, broker or partner. Set the appropriate KYC status and add referral details or notes when useful. This gives your team context for the relationship and its onboarding progress.",
    },
    {
        id: "m-assign",
        title: "Connect the contact to the right KYC form",
        body: "After saving the business contact, assign the relevant published KYC form and version. Confirm the recipient details, then send the form by email when needed. The contact record gives your team a place to manage the relationship; the KYC form collects information for review.",
    },
    {
        id: "m-review",
        title: "Continue from submission to review",
        body: "Once the contact submits the form, your team can review the information and follow up if anything else is needed.",
        note: "Saving a contact or sending a form does not complete KYC; your team reviews the submission before recording an outcome.",
    },
];

const QA: [string, string][] = [
    ["What is a business contact in Carat Logic KYC?", "A business contact is a record for a company your team works with, together with details for the person you communicate with."],
    ["Which business relationships can I record?", "Carat Logic KYC supports contact records for customers, suppliers, brokers and partners."],
    ["What information can a business contact record include?", "A record can include company and contact-person details, contact type and KYC status. Depending on your workflow, it can also include address, website, VAT or currency details, additional contact information, referral details and notes."],
    ["Should I check for an existing contact before adding one?", "Yes. Search by company name and, if useful, by contact person or email. Use the existing record when you find the right business."],
    ["Does saving a business contact complete KYC?", "No. Saving creates the contact record. KYC continues when the contact submits the assigned form and your team reviews the information."],
];

const ID = "m-kyconb";

/* ---------- pieces ---------- */

function Arrow({ stroke }: { stroke: string }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
        </svg>
    );
}

const sectionStyle = (first: boolean) =>
    ({
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: "40px 0 0",
        ...(first ? {} : { marginTop: 40, borderTop: "1px solid #eceeed" }),
    }) as const;

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
                boxShadow: open ? "0 14px 30px rgba(16,24,20,0.07)" : "0 14px 30px rgba(16,24,20,0)",
                transition: "border-color .2s ease, box-shadow .25s ease",
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
                        animate={{ stroke: open ? "#ffffff" : "#111827" }}
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

/* ---------- page ---------- */

export function KycOnboardingMobile() {
    const reduce = useReducedMotion();
    const [open, setOpen] = useState(0);

    const heroIn = (delay: number) =>
        ({
            initial: reduce ? false : { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, ease: EASE, delay },
        }) as const;
    const secIn = {
        initial: reduce ? false : { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.6, ease: EASE },
    } as const;

    return (
        <div className="pg-kyconb-m" style={{ position: "relative", overflowX: "clip", boxSizing: "border-box", color: "#111114", background: "#ffffff" }}>
            {/* page header */}
            <section style={{ padding: "48px 20px 0", textAlign: "center" }}>
                <motion.h1 {...heroIn(0)} style={{ margin: 0, fontSize: 34, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>
                    {H1}
                </motion.h1>
                <motion.p {...heroIn(0.08)} style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.6, color: "#5f6663" }}>
                    {INTRO}
                </motion.p>
                <div style={{ height: 120 }} />
            </section>

            {/* action bar: sits over the bottom of the hero on first load, then stays pinned to the bottom of the screen while scrolling */}
            <motion.div
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
                style={{ position: "sticky", top: "calc(100vh - 86px)", margin: "-86px 12px 18px", zIndex: 10, padding: 8, borderRadius: 999, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", border: "1px solid #e3e6e5", boxShadow: "0 18px 40px rgba(16,24,20,0.16), 0 2px 6px rgba(16,24,20,0.06)", display: "flex", gap: 8, boxSizing: "border-box" }}
            >
                <a
                    href="/contact"
                    className="cl-btn"
                    style={{ flex: 1, minHeight: 52, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "5px 5px 5px 18px", borderRadius: 999, background: "#111827", color: "#ffffff", fontSize: 15, fontWeight: 600, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)" }}
                >
                    <span style={{ color: "#ffffff", whiteSpace: "nowrap" }}>Get started</span>
                    <span style={{ flex: "none", width: 40, height: 40, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Arrow stroke="#111827" />
                    </span>
                </a>
                <a
                    href="/contact?tab=demo"
                    className="cl-btn"
                    style={{ flex: 1, minHeight: 52, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "5px 5px 5px 18px", borderRadius: 999, background: "linear-gradient(90deg, #245c3e 0%, #317a51 55%, #3f9463 100%)", color: "#ffffff", fontSize: 15, fontWeight: 600, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 18px rgba(44,111,75,0.3)" }}
                >
                    <span style={{ color: "#ffffff", whiteSpace: "nowrap" }}>Book a demo</span>
                    <span style={{ flex: "none", width: 40, height: 40, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Arrow stroke="#245c3e" />
                    </span>
                </a>
            </motion.div>

            {/* content */}
            <div style={{ padding: "8px 20px 64px" }}>
                {SECTIONS.map((s, i) => (
                    <motion.section key={s.id} id={s.id} className="cl-m" style={sectionStyle(i === 0)} {...secIn}>
                        <h2>{s.title}</h2>
                        <p>{s.body}</p>
                        {s.note && (
                            <div style={{ display: "flex", gap: 14, padding: "14px 16px", borderRadius: 14, background: "#f6f7f7", border: "1px solid #eceeed" }}>
                                <span style={{ flex: "none", width: 4, borderRadius: 999, background: "#317a51" }} />
                                <p style={{ fontSize: 15, color: "#2b302e" }}>{s.note}</p>
                            </div>
                        )}
                    </motion.section>
                ))}

                <section id="m-faqs" className="cl-m" style={{ marginTop: 40, paddingTop: 40, borderTop: "1px solid #eceeed", display: "flex", flexDirection: "column", gap: 18 }}>
                    <motion.h2 {...secIn}>Frequently asked questions</motion.h2>
                    <Stagger style={{ display: "flex", flexDirection: "column", gap: 10 }} stagger={0.06}>
                        {QA.map(([q, a], i) => (
                            <FaqItem key={q} q={q} a={a} id={`${ID}-faq-${i}`} open={i === open} onToggle={() => setOpen(i === open ? -1 : i)} />
                        ))}
                    </Stagger>
                </section>

                <motion.section className="cl-m" style={{ marginTop: 40, padding: "24px 20px", borderRadius: 20, background: "#111827" }} {...secIn}>
                    <h2 style={{ color: "#ffffff", fontSize: 23 }}>{CTA_TITLE}</h2>
                </motion.section>
            </div>
        </div>
    );
}
