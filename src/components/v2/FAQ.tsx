"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { EASE, Reveal, Stagger, itemVariants } from "./motion";
import "./faq.css";

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
                borderRadius: 18,
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
                style={{ width: "100%", minHeight: 68, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, padding: "18px 22px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
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
                        <p style={{ margin: 0, padding: "0 22px 22px", maxWidth: 600, fontSize: 15, lineHeight: 1.65, color: "#5f6663" }}>{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQ() {
    const [open, setOpen] = useState(0);
    const baseId = useId();
    const reduce = useReducedMotion();

    return (
        <div className="v2-faq" style={{ color: "#111114", background: "#ffffff", padding: "40px 12px", boxSizing: "border-box" }}>
            <section style={{ maxWidth: 1180, margin: "0 auto", borderRadius: 32, background: "#f6f7f7", border: "1px solid #eceeed", overflow: "hidden", boxSizing: "border-box" }}>
                <div className="cl-faq" style={{ padding: "88px 40px 0" }}>
                    {/* left */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                        <Reveal>
                            <h2 style={{ margin: 0, fontSize: "clamp(34px, 4vw, 54px)", lineHeight: 1.05, fontWeight: 600, letterSpacing: "-0.04em", color: "#0c0c10" }}>Frequently Asked Questions</h2>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <p style={{ margin: 0, maxWidth: 440, fontSize: 18, lineHeight: 1.6, color: "#5f6663" }}>
                                Find answers about Carat Logic’s diamond inventory software, customer and supplier KYC, integrations and pricing.
                            </p>
                        </Reveal>

                        <Reveal delay={0.16} style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 440, padding: "20px 22px", borderRadius: 18, background: "#ffffff", border: "1px solid #e6e9e8" }}>
                            <span style={{ fontSize: 16, fontWeight: 600, color: "#0c0c10" }}>Have a Question About Your Business?</span>
                            <span style={{ fontSize: 14, lineHeight: 1.55, color: "#5f6663" }}>See the workflows that matter to your team in a product demo.</span>
                            <a href="/contact" style={{ alignSelf: "flex-start", marginTop: 4, display: "flex", alignItems: "center", gap: 12, padding: "5px 5px 5px 18px", borderRadius: 999, background: "#111827", color: "#ffffff", fontSize: 15, fontWeight: 600 }}>
                                <span style={{ color: "#ffffff" }}>Book a Demo</span>
                                <span style={{ width: 32, height: 32, borderRadius: 999, background: "#317a51", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M5 12h14" />
                                        <path d="m13 6 6 6-6 6" />
                                    </svg>
                                </span>
                            </a>
                        </Reveal>

                        {/* phone */}
                        <motion.div
                            className="cl-phonewrap"
                            style={{ display: "flex", justifyContent: "center", marginTop: 18 }}
                            initial={reduce ? false : { opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                        >
                            <div style={{ width: 312, height: 470, padding: "12px 12px 0", borderRadius: "52px 52px 0 0", background: "linear-gradient(160deg, #2a2e2c 0%, #0c0f0e 100%)", boxShadow: "inset 0 0 0 2px #3a3f3c, 0 30px 60px rgba(16,24,20,0.25)", boxSizing: "border-box", position: "relative" }}>
                                <span aria-hidden="true" style={{ position: "absolute", left: -3, top: 120, width: 3, height: 54, borderRadius: "2px 0 0 2px", background: "#2a2e2c" }} />
                                <span aria-hidden="true" style={{ position: "absolute", right: -3, top: 150, width: 3, height: 80, borderRadius: "0 2px 2px 0", background: "#2a2e2c" }} />
                                <div style={{ position: "relative", height: "100%", borderRadius: "40px 40px 0 0", overflow: "hidden", background: "#ffffff" }}>
                                    <div style={{ position: "relative", height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 26px", fontSize: 13, fontWeight: 600, color: "#0c0c10", background: "#ffffff" }}>
                                        <span>9:41</span>
                                        <span aria-hidden="true" style={{ position: "absolute", left: "50%", top: 10, transform: "translateX(-50%)", width: 96, height: 26, borderRadius: 999, background: "#0c0f0e" }} />
                                        <span aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                            <svg width="16" height="11" viewBox="0 0 16 11" fill="#0c0c10">
                                                <rect x="0" y="7" width="3" height="4" rx="1" />
                                                <rect x="4.3" y="5" width="3" height="6" rx="1" />
                                                <rect x="8.6" y="2.5" width="3" height="8.5" rx="1" />
                                                <rect x="12.9" y="0" width="3" height="11" rx="1" />
                                            </svg>
                                            <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
                                                <rect x="0.5" y="0.5" width="18" height="10" rx="3" stroke="#0c0c10" />
                                                <rect x="2" y="2" width="13" height="7" rx="1.6" fill="#0c0c10" />
                                                <rect x="19.5" y="3.5" width="1.8" height="4" rx="0.9" fill="#0c0c10" />
                                            </svg>
                                        </span>
                                    </div>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/design/dd0c33c162c5ffcd836fd0c11b18e95c.png"
                                        alt="Carat Logic Business Overview on mobile, showing net worth, capital position and partner exposure"
                                        style={{ display: "block", width: "calc(100% + 4px)", marginLeft: -2, height: "auto" }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* right: accordion */}
                    <Stagger style={{ display: "flex", flexDirection: "column", gap: 14, paddingBottom: 88 }} stagger={0.06}>
                        {QA.map(([q, a], i) => (
                            <FaqItem key={q} q={q} a={a} id={`${baseId}-${i}`} open={i === open} onToggle={() => setOpen(i === open ? -1 : i)} />
                        ))}
                    </Stagger>
                </div>
            </section>
        </div>
    );
}
