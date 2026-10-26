"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { useId, useState } from "react";
import { EASE, REVEAL_VIEWPORT } from "@/components/landing/motion";
import { BLOG_POSTS, filterPosts } from "./posts";
import "./blogs.css";

const gridVariants: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 0 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2, ease: EASE } },
};

export function BlogsDesktop() {
    const reduce = useReducedMotion();
    const [query, setQuery] = useState("");
    const posts = filterPosts(BLOG_POSTS, query);
    const searchId = useId();

    return (
        <div className="pg-blogs" style={{ color: "#111114", background: "#ffffff" }}>
            {/* ============ TITLE ============ */}
            <section style={{ padding: "96px 24px 64px", textAlign: "center" }}>
                <motion.h1
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE }}
                    style={{ margin: 0, fontSize: 68, lineHeight: 1.04, fontWeight: 600, letterSpacing: "-0.045em", color: "#0c0c10" }}
                >
                    Blogs
                </motion.h1>

                {/* search (not in the artboard): filters the posts below by title / excerpt */}
                <motion.form
                    role="search"
                    onSubmit={(e) => e.preventDefault()}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
                    style={{ position: "relative", maxWidth: 480, margin: "32px auto 0" }}
                >
                    <label htmlFor={searchId} className="cl-sr">
                        Search blogs
                    </label>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b736f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                    </svg>
                    <input id={searchId} type="search" className="cl-in" placeholder="Search blogs" value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" style={{ paddingLeft: 46 }} />
                </motion.form>
            </section>

            {/* ============ POSTS ============ */}
            <section style={{ padding: "0 24px 120px" }}>
                <motion.div
                    className="cl-blog"
                    variants={gridVariants}
                    initial={reduce ? false : "hidden"}
                    whileInView="show"
                    viewport={REVEAL_VIEWPORT}
                    style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}
                >
                    <AnimatePresence mode="popLayout">
                        {posts.map((p) => (
                            <motion.a
                                key={p.t}
                                href={p.href}
                                className="cl-post"
                                layout={!reduce}
                                variants={cardVariants}
                                exit={reduce ? undefined : "exit"}
                                transition={{ layout: { duration: 0.45, ease: EASE } }}
                                style={{ display: "flex", flexDirection: "column", gap: 18 }}
                            >
                                <span style={{ display: "block", aspectRatio: "16 / 10", borderRadius: 20, overflow: "hidden", background: "#f4f5f5", border: "1px solid #eceeed" }}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={p.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "left top", display: "block" }} />
                                </span>
                                <span style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    <span style={{ fontSize: 14, color: "#6b736f" }}>
                                        {p.d} · {p.r}
                                    </span>
                                    <span className="cl-pt" style={{ fontSize: 22, lineHeight: 1.3, fontWeight: 600, letterSpacing: "-0.02em", color: "#0c0c10" }}>
                                        {p.t}
                                    </span>
                                    <span style={{ fontSize: 16, lineHeight: 1.6, color: "#5f6663" }}>{p.e}</span>
                                </span>
                            </motion.a>
                        ))}
                    </AnimatePresence>
                </motion.div>
                <AnimatePresence>
                    {posts.length === 0 && (
                        <motion.p
                            key="empty"
                            role="status"
                            initial={reduce ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            style={{ margin: "0 auto", maxWidth: 1200, textAlign: "center", fontSize: 17, lineHeight: 1.6, color: "#5f6663" }}
                        >
                            No posts match “{query.trim()}”.
                        </motion.p>
                    )}
                </AnimatePresence>
            </section>
        </div>
    );
}
