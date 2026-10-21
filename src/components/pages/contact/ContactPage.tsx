"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, type CSSProperties, type FormEvent } from "react";
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/landing/motion";
import "./contact.css";

type Mode = "demo" | "query";
type Interest = "inv" | "kyc";

const TABS: [Mode, string][] = [
    ["demo", "Book a demo"],
    ["query", "Send a query"],
];
const INTERESTS: [Interest, string, string][] = [
    ["inv", "Inventory", "Inventory"],
    ["kyc", "KYC", "KYC"],
];
const BUSINESS_TYPES = ["Diamond dealer", "Gemstone trader", "Wholesaler", "Manufacturer", "Jewellery business", "Other"];
const TEAM_SIZES = ["1–3 users", "4–7 users", "More than 7 users"];
const TOPICS = ["General question", "Pricing and packages", "Inventory", "KYC", "Integrations", "Support"];
const BULLETS = ["A walkthrough focused on what you trade", "Inventory, KYC or both", "Help choosing the right package"];

const modeFromParam = (tab: string | null): Mode => (tab === "query" ? "query" : "demo");

const muted: CSSProperties = { fontWeight: 400, color: "#8a908d" };

function CheckIcon({ size = 12, width = 3 }: { size?: number; width?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#245c3e" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m5 12 5 5L20 7"></path>
        </svg>
    );
}

function ArrowUpRight() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8a908d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17 17 7"></path>
            <path d="M8 7h9v9"></path>
        </svg>
    );
}

const linkCard: CSSProperties = { display: "flex", alignItems: "center", gap: 16, minHeight: 44, padding: "18px 20px", borderRadius: 18, background: "#ffffff", border: "1px solid #e6e9e8", boxShadow: "0 1px 2px rgba(16,24,20,0.04)" };
const linkIcon: CSSProperties = { flex: "none", width: 46, height: 46, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" };

export function ContactPage() {
    const reduce = useReducedMotion();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const tabParam = searchParams.get("tab");

    const [mode, setMode] = useState<Mode>(() => modeFromParam(tabParam));
    // keep the tab in sync when the URL changes from outside (e.g. header "Book a demo" link)
    const [prevParam, setPrevParam] = useState(tabParam);
    if (tabParam !== prevParam) {
        setPrevParam(tabParam);
        setMode(modeFromParam(tabParam));
    }

    const [ints, setInts] = useState<Record<Interest, boolean>>({ inv: true, kyc: false });
    const [form, setForm] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        businessType: BUSINESS_TYPES[0],
        teamSize: TEAM_SIZES[0],
        notes: "",
        topic: TOPICS[0],
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
    const [error, setError] = useState<string | null>(null);
    const [sentMode, setSentMode] = useState<Mode>("demo");

    const isDemo = mode === "demo";
    const sending = status === "sending";
    const t = reduce ? { duration: 0 } : { duration: 0.3, ease: EASE };

    const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const pickTab = (m: Mode) => {
        if (m === mode) return;
        setMode(m);
        setError(null);
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", m);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const which = ints.inv && ints.kyc ? "Inventory and KYC" : ints.kyc ? "KYC" : "Inventory";

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (sending) return;
        setStatus("sending");
        setError(null);

        const base = { name: form.name.trim(), email: form.email.trim(), company: form.company.trim(), phone: form.phone.trim() };
        const payload = isDemo
            ? {
                  ...base,
                  type: "demo",
                  inquiryType: "Demo request",
                  interests: INTERESTS.filter(([k]) => ints[k]).map(([, , label]) => label),
                  businessType: form.businessType,
                  teamSize: form.teamSize,
                  message: form.notes.trim(),
              }
            : {
                  ...base,
                  type: "query",
                  inquiryType: `Query: ${form.topic}`,
                  topic: form.topic,
                  message: form.message.trim(),
              };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data: { error?: string } = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
            setSentMode(mode);
            setStatus("sent");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
            setStatus("idle");
        }
    };

    const reset = () => {
        setForm((f) => ({ ...f, notes: "", message: "" }));
        setStatus("idle");
    };

    const submitStyle: CSSProperties = {
        minHeight: 54,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "7px 7px 7px 24px",
        border: "none",
        borderRadius: 999,
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: 16,
        fontWeight: 600,
        color: "#ffffff",
        transition: "background .2s ease, box-shadow .2s ease",
        ...(isDemo
            ? { background: "linear-gradient(90deg, #245c3e 0%, #317a51 55%, #3f9463 100%)", boxShadow: "0 0 0 4px #ffffff, 0 0 0 5px #cfe8d0, 0 12px 26px rgba(44,111,75,0.3)" }
            : { background: "#111827", boxShadow: "0 0 0 4px #ffffff, 0 0 0 5px #dfe3e1, 0 12px 24px rgba(17,24,39,0.18)" }),
    };

    const swap = {
        initial: reduce ? false : ({ opacity: 0, y: 8 } as const),
        animate: { opacity: 1, y: 0 },
        exit: reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8 },
        transition: t,
    };
    const fieldsSwap = {
        initial: reduce ? false : ({ opacity: 0, height: 0 } as const),
        animate: { opacity: 1, height: "auto" },
        exit: reduce ? { opacity: 0, height: 0, transition: { duration: 0 } } : { opacity: 0, height: 0 },
        transition: reduce ? { duration: 0 } : { duration: 0.35, ease: EASE },
        // pad so the 4px focus ring isn't clipped while overflow is hidden
        style: { overflow: "hidden", margin: -4, padding: 4 } as CSSProperties,
    };

    return (
        <div className="pg-contact">
            <section className="pgc-section">
                <div className="cl-contact" style={{ maxWidth: 1200, margin: "0 auto" }}>
                    {/* left */}
                    <Stagger style={{ display: "flex", flexDirection: "column", gap: 22, paddingTop: 8 }}>
                        <StaggerItem>
                            <h1 className="pgc-h1">Contact Us</h1>
                        </StaggerItem>
                        <StaggerItem>
                            <p className="pgc-lead">Book a demo to see Carat Logic with your workflows, or send us a question about Inventory, KYC or pricing.</p>
                        </StaggerItem>
                        <StaggerItem>
                            <ul style={{ listStyle: "none", margin: "6px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                                {BULLETS.map((b) => (
                                    <li key={b} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "#2b302e" }}>
                                        <span style={{ flex: "none", width: 22, height: 22, borderRadius: 999, background: "#e3f1e7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <CheckIcon />
                                        </span>
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </StaggerItem>
                        <StaggerItem style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
                            <a href="mailto:hello@caratlogic.com" className="pgc-link" style={linkCard}>
                                <span style={{ ...linkIcon, background: "#317a51" }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                                        <path d="m3 7 9 6 9-6"></path>
                                    </svg>
                                </span>
                                <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                                    <span style={{ fontSize: 13, color: "#6b736f" }}>Email us</span>
                                    <span className="pgc-link-value" style={{ fontSize: 17, fontWeight: 600, color: "#0c0c10" }}>hello@caratlogic.com</span>
                                </span>
                                <ArrowUpRight />
                            </a>
                            <a href="tel:+32499712725" className="pgc-link" style={linkCard}>
                                <span style={{ ...linkIcon, background: "#111827" }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"></path>
                                    </svg>
                                </span>
                                <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                                    <span style={{ fontSize: 13, color: "#6b736f" }}>Call us</span>
                                    <span className="pgc-link-value" style={{ fontSize: 17, fontWeight: 600, color: "#0c0c10" }}>+32 499 71 27 25</span>
                                </span>
                                <ArrowUpRight />
                            </a>
                        </StaggerItem>
                    </Stagger>

                    {/* right: form card */}
                    <Reveal delay={0.1} className="pgc-card-outer">
                        <div className="pgc-card">
                            <AnimatePresence mode="wait" initial={false}>
                                {status !== "sent" ? (
                                    <motion.div key="form" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={t}>
                                        {/* tabs */}
                                        <div role="tablist" aria-label="What can we help with?" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 4, padding: 5, borderRadius: 999, background: "#f3f5f4", border: "1px solid #e6e9e8" }}>
                                            {TABS.map(([key, label]) => {
                                                const on = key === mode;
                                                return (
                                                    <button
                                                        key={key}
                                                        type="button"
                                                        role="tab"
                                                        id={`cf-tab-${key}`}
                                                        aria-selected={on}
                                                        aria-controls="cf-panel"
                                                        className="cl-tab"
                                                        onClick={() => pickTab(key)}
                                                        style={{ position: "relative", minHeight: 46, border: "none", borderRadius: 999, cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 600, background: "transparent", color: on ? "#ffffff" : "#3a403d", transition: "color .2s ease" }}
                                                    >
                                                        {on && (
                                                            <motion.span
                                                                layoutId="pgc-tab-pill"
                                                                aria-hidden="true"
                                                                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                                                                style={{ position: "absolute", inset: 0, borderRadius: 999, background: "#111827", boxShadow: "0 6px 14px rgba(17,24,39,0.18)" }}
                                                            />
                                                        )}
                                                        <span style={{ position: "relative" }}>{label}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <form
                                            id="cf-panel"
                                            role="tabpanel"
                                            aria-labelledby={`cf-tab-${mode}`}
                                            onSubmit={submit}
                                            style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 18 }}
                                        >
                                            <AnimatePresence mode="wait" initial={false}>
                                                <motion.div key={mode} {...swap} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                                    <h2 className="pgc-form-title">{isDemo ? "Book a demo" : "Send us a query"}</h2>
                                                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#5f6663" }}>
                                                        {isDemo ? "Tell us a little about your business and we’ll arrange a walkthrough." : "Ask about features, pricing or support and our team will reply by email."}
                                                    </p>
                                                </motion.div>
                                            </AnimatePresence>

                                            <div className="cl-fg">
                                                <div className="cl-field">
                                                    <label htmlFor="cf-name">Full name</label>
                                                    <input id="cf-name" className="cl-in" type="text" required autoComplete="name" placeholder="Your name" value={form.name} onChange={set("name")} />
                                                </div>
                                                <div className="cl-field">
                                                    <label htmlFor="cf-email">Work email</label>
                                                    <input id="cf-email" className="cl-in" type="email" required autoComplete="email" placeholder="you@company.com" value={form.email} onChange={set("email")} />
                                                </div>
                                                <div className="cl-field">
                                                    <label htmlFor="cf-company">Company</label>
                                                    <input id="cf-company" className="cl-in" type="text" autoComplete="organization" placeholder="Company name" value={form.company} onChange={set("company")} />
                                                </div>
                                                <div className="cl-field">
                                                    <label htmlFor="cf-phone">
                                                        Phone <span style={muted}>(optional)</span>
                                                    </label>
                                                    <input id="cf-phone" className="cl-in" type="tel" autoComplete="tel" placeholder="+32 ..." value={form.phone} onChange={set("phone")} />
                                                </div>
                                            </div>

                                            <AnimatePresence mode="wait" initial={false}>
                                                {isDemo ? (
                                                    <motion.div key="demo-fields" {...fieldsSwap}>
                                                        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                                                            <fieldset style={{ border: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                                                                <legend style={{ padding: 0, margin: "0 0 10px", fontSize: 14, fontWeight: 600, color: "#1d2320" }}>I’m interested in</legend>
                                                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                                                    {INTERESTS.map(([key, label]) => {
                                                                        const on = ints[key];
                                                                        return (
                                                                            <button
                                                                                key={key}
                                                                                type="button"
                                                                                className="cl-chip"
                                                                                aria-pressed={on}
                                                                                onClick={() => setInts((s) => ({ ...s, [key]: !s[key] }))}
                                                                                style={{
                                                                                    minHeight: 44,
                                                                                    display: "flex",
                                                                                    alignItems: "center",
                                                                                    gap: 8,
                                                                                    padding: "8px 18px 8px 10px",
                                                                                    borderRadius: 999,
                                                                                    cursor: "pointer",
                                                                                    fontFamily: "inherit",
                                                                                    fontSize: 15,
                                                                                    fontWeight: 600,
                                                                                    transition: "background .2s ease, color .2s ease, border-color .2s ease",
                                                                                    ...(on
                                                                                        ? { background: "#eef6f0", color: "#245c3e", border: "1px solid #9fcfb0" }
                                                                                        : { background: "#ffffff", color: "#3a403d", border: "1px solid #dfe5e1" }),
                                                                                }}
                                                                            >
                                                                                <span
                                                                                    aria-hidden="true"
                                                                                    style={{
                                                                                        width: 22,
                                                                                        height: 22,
                                                                                        borderRadius: 999,
                                                                                        display: "flex",
                                                                                        alignItems: "center",
                                                                                        justifyContent: "center",
                                                                                        fontSize: 12,
                                                                                        fontWeight: 700,
                                                                                        transition: "background .2s ease, color .2s ease",
                                                                                        ...(on ? { background: "#317a51", color: "#ffffff" } : { background: "#f1f3f2", color: "transparent" }),
                                                                                    }}
                                                                                >
                                                                                    ✓
                                                                                </span>
                                                                                {label}
                                                                            </button>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </fieldset>
                                                            <div className="cl-fg">
                                                                <div className="cl-field">
                                                                    <label htmlFor="cf-type">Business type</label>
                                                                    <select id="cf-type" className="cl-in" value={form.businessType} onChange={set("businessType")}>
                                                                        {BUSINESS_TYPES.map((o) => (
                                                                            <option key={o}>{o}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="cl-field">
                                                                    <label htmlFor="cf-users">Team size</label>
                                                                    <select id="cf-users" className="cl-in" value={form.teamSize} onChange={set("teamSize")}>
                                                                        {TEAM_SIZES.map((o) => (
                                                                            <option key={o}>{o}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="cl-field">
                                                                <label htmlFor="cf-notes">
                                                                    What would you like to see? <span style={muted}>(optional)</span>
                                                                </label>
                                                                <textarea
                                                                    id="cf-notes"
                                                                    className="cl-in"
                                                                    placeholder="Tell us about your stock, memos, KYC process or anything you’d like the demo to cover"
                                                                    value={form.notes}
                                                                    onChange={set("notes")}
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div key="query-fields" {...fieldsSwap}>
                                                        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                                                            <div className="cl-field">
                                                                <label htmlFor="cf-topic">Topic</label>
                                                                <select id="cf-topic" className="cl-in" value={form.topic} onChange={set("topic")}>
                                                                    {TOPICS.map((o) => (
                                                                        <option key={o}>{o}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="cl-field">
                                                                <label htmlFor="cf-msg">Your message</label>
                                                                <textarea id="cf-msg" className="cl-in" required placeholder="How can we help?" style={{ minHeight: 160 }} value={form.message} onChange={set("message")}></textarea>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            <AnimatePresence initial={false}>
                                                {error && (
                                                    <motion.p
                                                        key="err"
                                                        role="alert"
                                                        initial={reduce ? false : { opacity: 0, y: -4 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={t}
                                                        style={{ margin: 0, padding: "12px 16px", borderRadius: 12, background: "#fdf1f0", border: "1px solid #f3c9c4", fontSize: 14, lineHeight: 1.5, color: "#a12d22" }}
                                                    >
                                                        {error}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>

                                            <div className="pgc-actions" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, marginTop: 4 }}>
                                                <span style={{ fontSize: 12.5, lineHeight: 1.5, color: "#6b736f", maxWidth: 320 }}>We’ll only use your details to respond to your request.</span>
                                                <button type="submit" className="cl-btn" disabled={sending} aria-busy={sending} style={submitStyle}>
                                                    <span>{sending ? "Sending…" : isDemo ? "Request a demo" : "Send message"}</span>
                                                    <span style={{ flex: "none", width: 40, height: 40, borderRadius: 999, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        <motion.svg
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke={isDemo ? "#245c3e" : "#111827"}
                                                            strokeWidth="2.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            aria-hidden="true"
                                                            animate={sending && !reduce ? { x: [0, 4, 0] } : { x: 0 }}
                                                            transition={sending && !reduce ? { duration: 0.9, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
                                                        >
                                                            <path d="M5 12h14"></path>
                                                            <path d="m13 6 6 6-6 6"></path>
                                                        </motion.svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </form>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="sent"
                                        role="status"
                                        className="pgc-sent"
                                        initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={t}
                                        style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 16, padding: 24 }}
                                    >
                                        <motion.span
                                            initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 18, delay: 0.1 }}
                                            style={{ width: 72, height: 72, borderRadius: 999, background: "#e3f1e7", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 10px #f1f8f3" }}
                                        >
                                            <CheckIcon size={32} width={2.6} />
                                        </motion.span>
                                        <h2 style={{ margin: "8px 0 0", fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", color: "#0c0c10" }}>
                                            {sentMode === "demo" ? "Thanks — your demo request is in." : "Thanks — we’ve got your message."}
                                        </h2>
                                        <p style={{ margin: 0, maxWidth: 380, fontSize: 16, lineHeight: 1.6, color: "#5f6663" }}>
                                            {sentMode === "demo" ? `We’ll contact you to schedule your ${which} demo.` : "Our team will reply to your email as soon as possible."}
                                        </p>
                                        <button
                                            type="button"
                                            className="cl-btn"
                                            onClick={reset}
                                            style={{ marginTop: 8, minHeight: 46, padding: "10px 20px", borderRadius: 999, border: "1px solid #dfe5e1", background: "#ffffff", font: "inherit", fontSize: 15, fontWeight: 600, color: "#111827", cursor: "pointer" }}
                                        >
                                            Send another request
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
