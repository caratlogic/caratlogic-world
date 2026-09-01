import React from "react";
import Link from "next/link";
import { ArrowRight, EnvelopeSimple, Globe, ShareNetwork, UsersThree } from "@phosphor-icons/react";
import { motion } from "motion/react";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="w-full relative bg-white dark:bg-[#141e15]">
            {/* Dark CTA Section */}
            <div className="bg-[#0f172a] relative py-24 md:py-32 px-6 overflow-hidden flex items-center justify-center">
                {/* Abstract Ambient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#2E7D32]/20 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="max-w-xl mx-auto flex flex-col items-center gap-10 text-center relative z-20 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-5"
                    >
                        <h2 className="text-white text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
                            Don&apos;t Wait - Start Free Today
                        </h2>
                        <p className="text-slate-300 text-base md:text-lg font-medium max-w-md mx-auto leading-relaxed">
                            Experience the premium diamond management SaaS platform trusted by global jewelers.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full max-w-md"
                    >
                        <form className="flex flex-col sm:flex-row w-full gap-3" onSubmit={(e) => e.preventDefault()}>
                            <div className="flex flex-1 items-stretch rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 focus-within:border-[#2E7D32] transition-colors overflow-hidden shadow-inner">
                                <EnvelopeSimple className="self-center ml-4 text-slate-400 text-xl" />
                                <input
                                    className="w-full border-none bg-transparent text-white focus:ring-0 placeholder:text-slate-500 text-[15px] py-4 px-3 outline-none"
                                    placeholder="Enter your work email"
                                    type="email"
                                    required
                                />
                            </div>
                            <button className="bg-[#2E7D32] hover:bg-[#236026] text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_8px_20px_-6px_rgba(46,125,50,0.4)] hover:shadow-[0_12px_25px_-8px_rgba(46,125,50,0.5)] active:scale-95 whitespace-nowrap flex items-center justify-center gap-2 group">
                                Start Trial
                                <ArrowRight weight="bold" className="text-sm group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                        <p className="text-slate-400 text-sm mt-6 font-medium">14-day free trial. No credit card required.</p>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Light Section */}
            <div className="max-w-[1240px] mx-auto px-6 lg:px-12 pt-16 pb-12 relative z-10 border-t border-slate-100 dark:border-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

                    {/* Brand Column */}
                    <div className="sm:col-span-2 flex flex-col gap-6 lg:pr-8">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/logo-full.png"
                                alt="Carat Logic"
                                width={140}
                                height={40}
                            />
                        </Link>
                        <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed max-w-sm">
                            Centralizing inventory management, sales automation, and financial reporting for the global diamond and jewelry industry.
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-slate-400">
                            <a href="#" className="hover:text-primary hover:-translate-y-1 transition-all p-2 bg-slate-50 dark:bg-slate-800 rounded-full">
                                <Globe className="text-xl" />
                            </a>
                            <a href="#" className="hover:text-primary hover:-translate-y-1 transition-all p-2 bg-slate-50 dark:bg-slate-800 rounded-full">
                                <ShareNetwork className="text-xl" />
                            </a>
                            <a href="#" className="hover:text-primary hover:-translate-y-1 transition-all p-2 bg-slate-50 dark:bg-slate-800 rounded-full">
                                <UsersThree className="text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* Pages Column */}
                    <div className="flex flex-col gap-6 col-span-1">
                        <h3 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider">Pages</h3>
                        <nav className="flex flex-col gap-4">
                            <Link className="text-slate-500 dark:text-slate-400 hover:text-primary text-[15px] transition-colors" href="/">Home</Link>
                            <Link className="text-slate-500 dark:text-slate-400 hover:text-primary text-[15px] transition-colors" href="/#features">Features</Link>
                            <Link className="text-slate-500 dark:text-slate-400 hover:text-primary text-[15px] transition-colors" href="/pricing">Pricing</Link>
                            <Link className="text-slate-500 dark:text-slate-400 hover:text-primary text-[15px] transition-colors" href="/contact">Contact Us</Link>
                        </nav>
                    </div>

                    {/* Legal Column */}
                    <div className="flex flex-col gap-6 col-span-1">
                        <h3 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider">Legal</h3>
                        <nav className="flex flex-col gap-4">
                            <a className="text-slate-500 dark:text-slate-400 hover:text-primary text-[15px] transition-colors" href="#">Privacy Policy</a>
                            <a className="text-slate-500 dark:text-slate-400 hover:text-primary text-[15px] transition-colors" href="#">Terms of Service</a>
                            <a className="text-slate-500 dark:text-slate-400 hover:text-primary text-[15px] transition-colors" href="#">Security</a>
                        </nav>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-500 text-[14px]">© {new Date().getFullYear()} Carat Logic Inc. All rights reserved.</p>
                    <div className="flex items-center gap-8 text-slate-500 text-[14px]">
                        <span className="flex items-center gap-2 cursor-pointer hover:text-slate-800 transition-colors">
                            <Globe weight="bold" /> English (US)
                        </span>
                        <span>USD ($)</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
