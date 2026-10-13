"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/** Shared easing for all v2 section entrances. */
export const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
    children: ReactNode;
    style?: CSSProperties;
    className?: string;
    /** Delay in seconds. */
    delay?: number;
    /** Vertical offset in px the element rises from. */
    y?: number;
    as?: "div" | "section" | "li" | "span" | "header" | "article";
};

/** Fades + rises an element in once when it scrolls into view. */
export function Reveal({ children, style, className, delay = 0, y = 24, as = "div" }: RevealProps) {
    const reduce = useReducedMotion();
    const M = motion[as];
    return (
        <M
            className={className}
            style={style}
            initial={reduce ? false : { opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: EASE, delay }}
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
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
            viewport={{ once: true, amount: 0.2 }}
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
