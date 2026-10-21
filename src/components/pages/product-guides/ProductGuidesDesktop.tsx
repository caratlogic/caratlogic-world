"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE, Stagger, itemVariants } from "@/components/landing/motion";
import { GUIDES } from "./guides";
import "./product-guides.css";

export function ProductGuidesDesktop() {
    const reduce = useReducedMotion();

    return (
        <div className="pg-guides" style={{ color: "#111114", background: "#ffffff" }}>
            {/* ============ TITLE ============ */}
            <section style={{ padding: "96px 24px 64px", textAlign: "center" }}>
                <motion.h1
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE }}
                    style={{ margin: 0, fontSize: 68, lineHeight: 1.04, fontWeight: 600, letterSpacing: "-0.045em", color: "#0c0c10" }}
                >
                    Product Guides
                </motion.h1>
            </section>

            {/* ============ POSTS ============ */}
            <section style={{ padding: "0 24px 120px" }}>
                <Stagger className="cl-blog" style={{ maxWidth: 1200, margin: "0 auto" }}>
                    {GUIDES.map((p) => (
                        <motion.a key={p.t} href="#" className="cl-post" variants={itemVariants} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
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
                </Stagger>
            </section>
        </div>
    );
}
