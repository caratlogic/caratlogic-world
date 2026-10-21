"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/** Shared easing for UI interactions (menus, tabs, accordions). */
export const EASE = [0.22, 1, 0.36, 1] as const;

/*
 * Scroll-in reveals. Kept deliberately subtle: a short rise with a soft ease, started as soon as the
 * element's top edge is ~10% above the bottom of the screen. Large offsets with a late trigger made
 * whole blocks shoot upward faster than the page was being scrolled.
 */
export const REVEAL_Y = 10;
export const REVEAL_EASE = [0.25, 0.1, 0.25, 1] as const;
export const REVEAL_VIEWPORT = { once: true, amount: 0, margin: "0px 0px -10% 0px" } as const;
const REVEAL_DURATION = 0.8;

type RevealProps = {
    children: ReactNode;
    style?: CSSProperties;
    className?: string;
    /** Delay in seconds. */
    delay?: number;
    /** Vertical offset in px the element rises from (capped at REVEAL_Y). */
    y?: number;
    as?: "div" | "section" | "li" | "span" | "header" | "article";
};

/** Fades + rises an element in once when it scrolls into view. */
export function Reveal({ children, style, className, delay = 0, y = REVEAL_Y, as = "div" }: RevealProps) {
    const reduce = useReducedMotion();
    const M = motion[as];
    return (
        <M
            className={className}
            style={style}
            initial={reduce ? false : { opacity: 0, y: Math.min(y, REVEAL_Y) }}
            whileInView={{ opacity: 1, y: 0 }}
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
    hidden: { opacity: 0, y: REVEAL_Y },
    show: { opacity: 1, y: 0, transition: { duration: REVEAL_DURATION, ease: REVEAL_EASE } },
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
