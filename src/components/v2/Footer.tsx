"use client";

import { motion } from "motion/react";
import { Reveal, Stagger, itemVariants } from "./motion";
import "./footer.css";

const COLS: { title: string; links: string[] }[] = [
    { title: "Products", links: ["Carat Logic Inventory", "Carat Logic KYC", "Pricing"] },
    { title: "Features", links: ["Inventory Management", "Memo Tracking", "Quotations & Invoicing", "WhatsApp Sharing", "Client Portal", "Financial Reporting"] },
    { title: "Company", links: ["About Us", "Contact Us", "Book a Demo"] },
    { title: "Solutions", links: ["Diamond Dealers", "Gemstone Traders", "Wholesalers", "Jewellery Manufacturers"] },
    { title: "Resources", links: ["Product Walkthrough", "FAQs", "Integrations", "Blogs"] },
];

const HREFS: Record<string, string> = {
    Pricing: "/pricing",
    "Contact Us": "/contact",
    "Book a Demo": "/contact",
};

export function Footer() {
    return (
        <footer className="v2-footer" style={{ background: "#000000", color: "#ffffff", padding: "72px 24px 48px", boxSizing: "border-box" }}>
            <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", flexDirection: "column", gap: 56 }}>
                <Stagger className="cl-foot" stagger={0.07}>
                    {/* brand */}
                    <motion.div className="cl-brand" variants={itemVariants} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                        <a href="#" aria-label="Carat Logic home" style={{ alignSelf: "flex-start" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/design/a0624d387c799bef34880b03ced88e69.webp" alt="Carat Logic" style={{ height: 56, width: "auto", display: "block" }} />
                        </a>
                        <p style={{ margin: 0, maxWidth: 300, fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                            Inventory management and KYC software for diamond and gemstone businesses.
                        </p>
                        <span style={{ marginTop: 8, fontSize: 20, fontWeight: 600, color: "#ffffff" }}>Have questions? Let’s talk.</span>
                        <a href="mailto:hello@caratlogic.com" style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 16, color: "#ffffff" }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5fcf86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <rect x="3" y="5" width="18" height="14" rx="2" />
                                <path d="m3 7 9 6 9-6" />
                            </svg>
                            hello@caratlogic.com
                        </a>
                        <a href="tel:+32499712725" style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 16, color: "#ffffff" }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5fcf86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                            </svg>
                            +32 499 71 27 25
                        </a>
                    </motion.div>

                    {COLS.map((col) => (
                        <motion.nav key={col.title} aria-label={col.title} variants={itemVariants} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                            <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#ffffff" }}>{col.title}</span>
                            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                                {col.links.map((l) => (
                                    <li key={l}>
                                        <a href={HREFS[l] ?? "#"} style={{ fontSize: 15, color: "rgba(255,255,255,0.82)" }}>
                                            {l}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.nav>
                    ))}
                </Stagger>

                {/* bottom bar */}
                <Reveal y={12} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 18, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.18)" }}>
                    <span style={{ fontSize: 22, fontWeight: 500, color: "#ffffff" }}>© 2026 CARAT LOGIC</span>
                    <div className="cl-legal">
                        <a href="#" style={{ fontSize: 14, color: "rgba(255,255,255,0.72)" }}>Privacy Policy</a>
                        <a href="#" style={{ fontSize: 14, color: "rgba(255,255,255,0.72)" }}>Terms of Service</a>
                        <a href="#" style={{ fontSize: 14, color: "rgba(255,255,255,0.72)" }}>Security</a>
                    </div>
                </Reveal>
            </div>
        </footer>
    );
}
