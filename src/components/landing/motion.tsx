"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/** Shared easing for UI interactions (menus, tabs, accordions). */
export const EASE = [0.22, 1, 0.36, 1] as const;

/*
 * Scroll-in reveals, following motion.dev's scroll-triggered pattern: `whileInView` with
 * `viewport={{ once: true }}` (one pooled IntersectionObserver) animating opacity only, so content
 * fades in where it already sits and never moves while the page is being scrolled.
 */
export const REVEAL_EASE = [0.25, 0.1, 0.25, 1] as const;
export const REVEAL_VIEWPORT = { once: true, amount: 0, margin: "0px 0px -10% 0px" } as const;
const REVEAL_DURATION = 0.6;

type RevealProps = {
    children: ReactNode;
    style?: CSSProperties;
    className?: string;
    /** Delay in seconds. */
    delay?: number;
    /** @deprecated Reveals are opacity-only; kept so existing call sites still type-check. */
    y?: number;
    as?: "div" | "section" | "li" | "span" | "header" | "article";
};

/** Fades an element in once when it scrolls into view. */
export function Reveal({ children, style, className, delay = 0, as = "div" }: RevealProps) {
    const reduce = useReducedMotion();
    const M = motion[as];
    return (
        <M
            className={className}
            style={style}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: REVEAL_DURATION, ease: REVEAL_EASE, delay }}
        >
            {children}
        </M>
    );
}

const groupVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

export const itemVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: REVEAL_DURATION, ease: REVEAL_EASE } },
};

/** Container that staggers its <StaggerItem> children in when scrolled into view. */
export function Stagger({ children, style, className, stagger = 0.08 }: { children: ReactNode; style?: CSSProperties; className?: string; stagger?: number }) {
    const reduce = useReducedMotion();
    return (
        <motion.div
            className={className}
            style={style}
            variants={stagger === 0.08 ? groupVariants : { hidden: {}, show: { transition: { staggerChildren: stagger } } }}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={REVEAL_VIEWPORT}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, style, className }: { children: ReactNode; style?: CSSProperties; className?: string }) {
    return (
        <motion.div className={className} style={style} variants={itemVariants}>
            {children}
        </motion.div>
    );
}
