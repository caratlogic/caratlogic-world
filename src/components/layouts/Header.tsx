"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import Image from "next/image";

export function Header() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [showMarquee, setShowMarquee] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const prevScrollY = useRef(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 10) {
            if (!isScrolled) setIsScrolled(true);
        } else {
            if (isScrolled) setIsScrolled(false);
        }

        if (latest <= 10) {
            if (!showMarquee) setShowMarquee(true);
        } else if (latest > prevScrollY.current && latest > 50) {
            if (showMarquee) setShowMarquee(false);
        } else if (latest < prevScrollY.current) {
            if (!showMarquee) setShowMarquee(true);
        }

        prevScrollY.current = latest;
    });

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Features", href: "/#features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center w-full"
                initial={{
                    backgroundColor: "rgba(255, 255, 255, 0)",
                    borderBottom: "1px solid rgba(229, 231, 235, 0)",
                }}
                animate={{
                    backgroundColor: isScrolled || mobileMenuOpen
                        ? "rgba(255, 255, 255, 1)"
                        : "rgba(255, 255, 255, 0)",
                    borderBottom: isScrolled || mobileMenuOpen
                        ? "1px solid rgba(229, 231, 235, 1)"
                        : "1px solid rgba(229, 231, 235, 0)",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                {/* Marquee Container */}
                <motion.div
                    initial={{ height: "auto", opacity: 1 }}
                    animate={{
                        height: showMarquee && !mobileMenuOpen ? "auto" : 0,
                        opacity: showMarquee && !mobileMenuOpen ? 1 : 0,
                    }}
                    transition={{
                        duration: 0.4,
                        delay: showMarquee ? 0.1 : 0,
                        ease: [0.32, 0.72, 0, 1],
                    }}
                    className="w-full bg-primary text-white flex items-center justify-center overflow-hidden"
                >
                    <div className="w-full flex overflow-hidden whitespace-nowrap py-3">
                        <motion.div
                            className="flex items-center gap-8 min-w-max pr-8"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: 25,
                            }}
                        >
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-8 text-[14px]"
                                >
                                    <span>
                                        Unlock the power of real-time
                                        multi-location diamond inventory control
                                        -{" "}
                                        <Link
                                            href="/contact"
                                            className="underline underline-offset-4 hover:text-gray-300 transition-colors ml-1"
                                        >
                                            Discover more
                                        </Link>
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Container for the content */}
                <div className="w-full max-w-[1440px] px-6 lg:px-12">
                    <div className="flex items-center justify-between h-16 md:h-24 transition-all duration-300">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-1 z-10">
                            <Image
                                src="/logo-full.png"
                                alt="Carat Logic"
                                width={140}
                                height={40}
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => {
                                        const hash = link.href.split("#")[1];
                                        if (hash) {
                                            e.preventDefault();
                                            setShowMarquee(false);
                                            requestAnimationFrame(() => {
                                                const el = document.getElementById(hash);
                                                if (el) {
                                                    el.scrollIntoView({ behavior: "smooth" });
                                                }
                                            });
                                        }
                                    }}
                                    className="text-[15px] font-medium text-[#111827] hover:text-[#2E7D32] transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Right side: CTA + Mobile toggle */}
                        <div className="flex items-center gap-3 z-10">
                            {/* CTA Button - desktop only */}
                            <Link href="/contact" className="hidden md:block">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group flex items-center gap-3 bg-[#111827] text-white pl-5 pr-1.5 py-1.5 rounded-full font-medium text-[15px] hover:bg-[#1F2937] transition-colors shadow-sm"
                                >
                                    <span>Book a Demo</span>
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#111827] transition-transform duration-300 group-hover:rotate-45">
                                        <ArrowUpRight
                                            weight="bold"
                                            className="w-[14px] h-[14px]"
                                        />
                                    </div>
                                </motion.div>
                            </Link>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 text-[#111827] transition-colors hover:bg-slate-200"
                            >
                                {mobileMenuOpen ? (
                                    <X weight="bold" className="w-5 h-5" />
                                ) : (
                                    <List weight="bold" className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                            className="w-full md:hidden overflow-hidden bg-white border-t border-slate-100"
                        >
                            <nav className="flex flex-col px-6 py-4 gap-1">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={(e) => {
                                                setMobileMenuOpen(false);
                                                const hash = link.href.split("#")[1];
                                                if (hash) {
                                                    e.preventDefault();
                                                    setShowMarquee(false);
                                                    requestAnimationFrame(() => {
                                                        const el = document.getElementById(hash);
                                                        if (el) {
                                                            el.scrollIntoView({ behavior: "smooth" });
                                                        }
                                                    });
                                                }
                                            }}
                                            className="flex items-center py-3 px-3 rounded-xl text-[16px] font-medium text-[#111827] hover:bg-slate-50 hover:text-[#2E7D32] transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: navLinks.length * 0.05 }}
                                    className="mt-2 px-3"
                                >
                                    <Link
                                        href="/contact"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="group flex items-center justify-center gap-2 bg-[#111827] text-white px-5 py-3 rounded-full font-medium text-[15px] hover:bg-[#1F2937] transition-colors shadow-sm"
                                    >
                                        <span>Book a Demo</span>
                                        <ArrowUpRight weight="bold" className="w-4 h-4" />
                                    </Link>
                                </motion.div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    );
}

export default Header;
