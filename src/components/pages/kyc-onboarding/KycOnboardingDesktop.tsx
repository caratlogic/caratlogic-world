"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE, Stagger, itemVariants } from "@/components/landing/motion";
import "./kyc-onboarding.css";

/* ---------- content (verbatim from KycOnboardingPage.dc.html) ---------- */

const H1 = "Business Contact Onboarding for Jewellery, Diamond and Gem Businesses";
const INTRO =
    "Keep customer, supplier, broker and partner details organized, then connect each business contact to the right KYC form. Carat Logic KYC supports onboarding for B2B, B2C and manufacturing teams.";
const CTA_TITLE = "See how Carat Logic KYC supports business onboarding";

type Section = { id: string; toc: string; title: string; body: string; note?: string };

const SECTIONS: Section[] = [
    {
        id: "find",
        toc: "Find existing contacts",
        title: "Find the business before adding a new record",
        body: "Search for an existing contact by company name and, where useful, by contact person or email. If the business is already listed, continue with that record. If it is new, choose Add Business Contact. Checking first helps your team avoid duplicate records.",
    },
    {
        id: "details",
        toc: "Company and contact details",
        title: "Keep company and contact details together",
        body: "Create a business record with the company name and the details of the person your team works with, including their name, primary email and mobile number. Add address and website details where available. Relevant business or commercial information, such as VAT details and currency, can also be recorded.",
    },
    {
        id: "classify",
        toc: "Contact type and KYC status",
        title: "Classify the relationship and set its KYC status",
        body: "Choose the contact type that fits the relationship, such as customer, supplier, broker or partner. Set the appropriate KYC status and add referral details or notes when useful. This gives your team context for the relationship and its onboarding progress.",
    },
    {
        id: "assign",
        toc: "Assign a KYC form",
        title: "Connect the contact to the right KYC form",
        body: "After saving the business contact, assign the relevant published KYC form and version. Confirm the recipient details, then send the form by email when needed. The contact record gives your team a place to manage the relationship; the KYC form collects information for review.",
    },
    {
        id: "review",
        toc: "Submission and review",
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

const ID = "kyconb";
const TOC = [...SECTIONS.map((s) => ({ id: s.id, label: s.toc })), { id: "faqs", label: "FAQs" }];

/* ---------- pieces ---------- */

function Arrow({ size, stroke, width }: { size: number; stroke: string; width: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
        </svg>
    );
}

const sectionStyle = (first: boolean) =>
    ({
        display: "flex",
        flexDirection: "column",
        gap: 18,
        paddingTop: first ? 0 : 56,
        ...(first ? {} : { borderTop: "1px solid #eceeed", marginTop: 56 }),
    }) as const;

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
                        <p style={{ margin: 0, padding: "0 20px 20px", fontSize: 16, lineHeight: 1.7, color: "#5f6663" }}>{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/** Highlights the table-of-contents entry for the section currently under the fixed header. */
function useActiveSection(ids: string[], offset = 160) {
    const [active, setActive] = useState(ids[0]);
    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            let current = ids[0];
            for (const id of ids) {
                const el = document.getElementById(id);
                if (!el || el.offsetParent === null) continue;
                if (el.getBoundingClientRect().top <= offset) current = id;
            }
            setActive(current);
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [ids, offset]);
    return active;
}

const TOC_IDS = TOC.map((t) => t.id);

/* ---------- page ---------- */

export function KycOnboardingDesktop() {
    const reduce = useReducedMotion();
    const [open, setOpen] = useState(0);
    const active = useActiveSection(TOC_IDS);

    const heroIn = (delay: number) =>
        ({
            initial: reduce ? false : { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, ease: EASE, delay },
        }) as const;
    const secIn = {
        initial: reduce ? false : { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.7, ease: EASE },
    } as const;

    return (
        <div className="pg-kyconb" style={{ color: "#111114", background: "#ffffff" }}>
            {/* ============ PAGE HEADER ============ */}
            <section style={{ padding: "96px 24px 96px" }}>
                <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
                        <motion.h1 {...heroIn(0)} style={{ margin: 0, fontSize: 56, lineHeight: 1.06, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>
                            {H1}
                        </motion.h1>
                        <motion.p {...heroIn(0.08)} style={{ margin: 0, fontSize: 19, lineHeight: 1.6, color: "#5f6663" }}>
                            {INTRO}
                        </motion.p>
                        <motion.a
                            {...heroIn(0.16)}
                            href="/contact?tab=demo"
                            className="cl-btn"
                            style={{ alignSelf: "center", marginTop: 8, display: "flex", alignItems: "center", gap: 14, padding: "8px 8px 8px 26px", borderRadius: 999, background: "linear-gradient(90deg, #245c3e 0%, #317a51 55%, #3f9463 100%)", color: "#ffffff", fontSize: 17, fontWeight: 600, boxShadow: "0 0 0 5px #ffffff, 0 0 0 6px #cfe8d0, 0 12px 28px rgba(44,111,75,0.3)" }}
                        >
                            <span style={{ color: "#ffffff" }}>Book a demo</span>
                            <span style={{ width: 40, height: 40, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Arrow size={17} stroke="#245c3e" width={2.2} />
                            </span>
                        </motion.a>
                    </div>
                </div>
            </section>

            {/* ============ MAIN CONTENT ============ */}
            <div style={{ padding: "0 24px 104px" }}>
                <div className="cl-dbody" style={{ maxWidth: 1200, margin: "0 auto" }}>
                    {/* sticky top offset by the fixed site header (design: 24px below the viewport top) */}
                    <motion.aside className="cl-tocwrap" style={{ position: "sticky", top: 120 }} {...heroIn(0.24)}>
                        <span style={{ display: "block", padding: "0 16px 12px", fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b736f" }}>On this page</span>
                        <nav className="cl-toc" aria-label="On this page" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {TOC.map((t) => {
                                const on = t.id === active;
                                return (
                                    <a key={t.id} href={`#${t.id}`} className={on ? "on" : undefined} aria-current={on ? "location" : undefined}>
                                        {on && <motion.span layoutId={`${ID}-toc-pill`} className="cl-tocpill" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }} />}
                                        <span className="cl-toclabel">{t.label}</span>
                                    </a>
                                );
                            })}
                        </nav>
                    </motion.aside>

                    <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
                        {SECTIONS.map((s, i) => (
                            <motion.section key={s.id} id={s.id} className="cl-sec" style={sectionStyle(i === 0)} {...secIn}>
                                <h2>{s.title}</h2>
                                <p>{s.body}</p>
                                {s.note && (
                                    <div style={{ display: "flex", gap: 14, padding: "18px 20px", borderRadius: 16, background: "#f6f7f7", border: "1px solid #eceeed" }}>
                                        <span style={{ flex: "none", width: 4, borderRadius: 999, background: "#317a51" }} />
                                        <p style={{ fontSize: 16, color: "#2b302e" }}>{s.note}</p>
                                    </div>
                                )}
                            </motion.section>
                        ))}

                        <section id="faqs" className="cl-sec" style={{ marginTop: 56, paddingTop: 56, borderTop: "1px solid #eceeed", display: "flex", flexDirection: "column", gap: 22 }}>
                            <motion.h2 {...secIn}>Frequently asked questions</motion.h2>
                            <Stagger style={{ display: "flex", flexDirection: "column", gap: 12 }} stagger={0.06}>
                                {QA.map(([q, a], i) => (
                                    <FaqItem key={q} q={q} a={a} id={`${ID}-faq-${i}`} open={i === open} onToggle={() => setOpen(i === open ? -1 : i)} />
                                ))}
                            </Stagger>
                        </section>

                        <motion.section
                            className="cl-sec"
                            style={{ marginTop: 56, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28, padding: 32, borderRadius: 22, background: "#111827" }}
                            {...secIn}
                        >
                            <h2 style={{ color: "#ffffff", fontSize: 26, maxWidth: 460 }}>{CTA_TITLE}</h2>
                            <a
                                href="/contact?tab=demo"
                                className="cl-btn"
                                style={{ flex: "none", display: "flex", alignItems: "center", gap: 14, padding: "7px 7px 7px 24px", borderRadius: 999, background: "#ffffff", color: "#111827", fontSize: 16, fontWeight: 600 }}
                            >
                                <span style={{ color: "#111827" }}>Book a demo</span>
                                <span style={{ width: 38, height: 38, borderRadius: 999, background: "#317a51", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Arrow size={16} stroke="#ffffff" width={2.4} />
                                </span>
                            </a>
                        </motion.section>
                    </div>
                </div>
            </div>
        </div>
    );
}
