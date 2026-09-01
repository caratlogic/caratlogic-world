"use client";

import { motion } from "motion/react";
import { PricingPlans } from "@/components/layouts/PricingPlans";
import { Footer } from "@/components/layouts/Footer";

export default function PricingPage() {
    return (
        <div className="min-h-screen w-full relative bg-white">
            {/* Hero */}
            <section className="w-full pt-36 pb-10 sm:pt-40 md:pt-48 md:pb-16 px-5 sm:px-6 relative overflow-hidden">
                <div className="max-w-[1240px] mx-auto w-full text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block rounded-full border border-primary/20 bg-primary/[0.09] px-3.5 sm:px-4 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-primary"
                    >
                        Inventory management for the gem &amp; diamond trade
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.08 }}
                        className="mt-5 text-slate-900 text-[1.75rem] sm:text-3xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] md:leading-[1.08]"
                    >
                        Simple pricing. Every feature included.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.16 }}
                        className="mt-3.5 sm:mt-4 text-slate-500 text-[15px] sm:text-lg md:text-xl font-medium max-w-2xl mx-auto"
                    >
                        Choose your stone program and your team size &mdash; the platform itself is never cut down.
                    </motion.p>
                </div>
            </section>

            <PricingPlans />

            <div className="h-16 md:h-28 lg:h-32" />

            <Footer />
        </div>
    );
}
