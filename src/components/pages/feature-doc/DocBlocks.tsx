"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { REVEAL_VIEWPORT, itemVariants } from "@/components/landing/motion";
import type { DocBlock } from "./types";

const stepsVariants: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

/** h3 / paragraph / numbered-step blocks of a doc section (styled by the page's `.cl-sec` / `.cl-m` CSS). */
export function DocBlocks({ blocks }: { blocks: DocBlock[] }) {
    const reduce = useReducedMotion();
    return (
        <>
            {blocks.map((b, i) => {
                if (b.type === "h3") return <h3 key={i}>{b.text}</h3>;
                if (b.type === "p") return <p key={i}>{b.text}</p>;
                return (
                    <motion.ol key={i} className="cl-steps" variants={stepsVariants} initial={reduce ? false : "hidden"} whileInView="show" viewport={REVEAL_VIEWPORT}>
                        {b.items.map((it) => (
                            <motion.li key={it.strong} variants={itemVariants}>
                                <strong>{it.strong}</strong>
                                {it.text ? ` ${it.text}` : null}
                            </motion.li>
                        ))}
                    </motion.ol>
                );
            })}
        </>
    );
}
