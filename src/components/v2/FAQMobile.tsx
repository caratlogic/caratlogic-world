"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { EASE, Reveal, Stagger, itemVariants } from "./motion";
import "./faq-mobile.css";

const QA: [string, string][] = [
    ["What is Carat Logic, and who is it for?", "Carat Logic provides inventory management and KYC software for diamond and gemstone businesses. It helps dealers, wholesalers and trading teams organise stock, manage memos and sales, monitor payments, and handle customer and supplier onboarding."],
    ["What is the difference between Carat Logic Inventory and Carat Logic KYC?", "Carat Logic Inventory manages stone records, pricing, availability, memos, orders and payments. Carat Logic KYC manages onboarding forms, document collection, reviews, approvals and renewals. The Enterprise package includes both inventory modules and the KYC application."],
    ["Can I track stones out on memo and outstanding payments?", "Yes. Carat Logic Inventory lets you track stones sent on memo, follow their status and manage related orders and invoices. You can also review payments and outstanding balances to see which transactions need attention."],
    ["Can I customise KYC forms for customers and suppliers?", "Yes. Build multi-page KYC forms with the fields and document requests your business needs. Assign published forms to business contacts, send email invitations and track submissions through review and approval. Contacts can save their progress and return to complete the form."],
    ["Which marketplace and e-invoicing integrations does Carat Logic offer?", "Carat Logic offers connections with Rapaport Trade / RapNet, VDB, Nivoda and IDEX, alongside Peppol and Indian GST e-invoicing integrations. During your demo, we can discuss the connections you need, what each handles and the setup required for your business."],
    ["How much does Carat Logic cost, and which package should I choose?", "Standard costs €150 per month and includes either the Gem or Diamond module for up to 3 active users. Premium costs €200 per month and includes either module for up to 7 active users. Enterprise costs €250 per month and includes both modules, the KYC application and up to 7 active users. All packages include unlimited stones and documents."],
    ["Can I see Carat Logic before choosing a package?", "Yes. Book a demo to explore Inventory, KYC or both. Tell us what you trade, how many people need access and which integrations matter to your business, so the walkthrough focuses on your requirements."],
];

function FaqItem({ q, a, open, onToggle, id }: { q: string; a: string; open: boolean; onToggle: () => void; id: string }) {
    const reduce = useReducedMotion();
    const t = reduce ? { duration: 0 } : { duration: 0.35, ease: EASE };

    return (
        <motion.div
            className="cl-q"
            variants={itemVariants}
            style={{
                borderRadius: 16,
                background: "#ffffff",
                border: `1px solid ${open ? "#d5dcd8" : "#e6e9e8"}`,
                boxShadow: open ? "0 14px 30px rgba(16,24,20,0.07)" : undefined,
                transition: "border-color .2s ease",
            }}
        >
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                aria-controls={`${id}-panel`}
                id={`${id}-btn`}
                style={{ width: "100%", minHeight: 60, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "16px 16px 16px 18px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
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
                        <p style={{ margin: 0, padding: "0 18px 18px", fontSize: 14, lineHeight: 1.65, color: "#5f6663" }}>{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQMobile() {
    const [open, setOpen] = useState(0);

    return (
        <div className="v2-faq-m" style={{ color: "#111114", background: "#ffffff", padding: "24px 8px", boxSizing: "border-box" }}>
            <section style={{ borderRadius: 26, background: "#f6f7f7", border: "1px solid #eceeed", padding: "48px 14px 16px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 24 }}>
                <Reveal style={{ padding: "0 6px", display: "flex", flexDirection: "column", gap: 12 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#2c6f4b" }}>FAQ</span>
                    <h2 style={{ margin: 0, fontSize: 32, lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>Frequently Asked Questions</h2>
                    <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "#5f6663" }}>Find answers about Carat Logic’s diamond inventory software, customer and supplier KYC, integrations and pricing.</p>
                </Reveal>

                <Stagger style={{ display: "flex", flexDirection: "column", gap: 10 }} stagger={0.06}>
                    {QA.map(([q, a], i) => (
                        <FaqItem key={q} q={q} a={a} id={`m-faq-${i}`} open={i === open} onToggle={() => setOpen(i === open ? -1 : i)} />
                    ))}
                </Stagger>

                <Reveal y={16} style={{ display: "flex", flexDirection: "column", gap: 8, padding: "22px 20px 20px", borderRadius: 20, background: "#111827", color: "#ffffff" }}>
                    <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", color: "#ffffff" }}>Have a Question About Your Business?</span>
                    <span style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,0.75)" }}>See the workflows that matter to your team in a product demo.</span>
                </Reveal>
            </section>
        </div>
    );
}
