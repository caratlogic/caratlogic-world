"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
    EnvelopeSimple,
    Phone,
    MapPin,
    ArrowUpRight,
    PaperPlaneTilt,
    CheckCircle,
    Buildings,
    User,
    ChatDots,
} from "@phosphor-icons/react";
import { Footer } from "@/components/layouts/Footer";

const contactInfo = [
    {
        icon: EnvelopeSimple,
        label: "Email Us",
        value: "hello@caratlogic.com",
        href: "mailto:hello@caratlogic.com",
    },
    {
        icon: Phone,
        label: "Call Us",
        value: "+32 499 71 27 25 ",
        href: "tel:+32499712725",
    },
    {
        icon: MapPin,
        label: "Visit Us",
        value: "Diamond District, Antwerp, Belgium",
        href: "#",
    },
];

const inquiryTypes = [
    "Book a Demo",
    "Pricing Inquiry",
    "Technical Support",
    "Partnership",
    "General Question",
];

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        inquiryType: "",
        message: "",
    });
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        setFormState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formState),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMessage(
                    data.error || "Something went wrong. Please try again.",
                );
                return;
            }

            setIsSubmitted(true);
        } catch {
            setErrorMessage(
                "Network error. Please check your connection and try again.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen w-full relative bg-white">
            {/* Hero Section */}
            <section className="w-full pt-40 pb-16 md:pt-48 md:pb-20 px-6 relative overflow-hidden">
                {/* Subtle background glow */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2E7D32]/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-[1240px] mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2E7D32]/5 border border-[#2E7D32]/10 mb-6">
                            <ChatDots
                                weight="fill"
                                className="text-[#2E7D32] text-sm"
                            />
                            <span className="text-[#2E7D32] text-sm font-semibold tracking-wide">
                                Get in Touch
                            </span>
                        </div>
                        <h1 className="text-[36px] sm:text-[48px] md:text-[56px] font-extrabold text-[#111827] leading-[1.1] tracking-tight mb-5">
                            Let&apos;s Talk About
                            <br />
                            <span className="text-[#2E7D32]">
                                Your Business
                            </span>
                        </h1>
                        <p className="text-slate-500 text-[16px] md:text-[18px] leading-relaxed max-w-lg">
                            Whether you&apos;re ready to transform your diamond
                            operations or just exploring options, our team is
                            here to help.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="w-full px-6 pb-24 md:pb-32">
                <div className="max-w-[1240px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="lg:col-span-3"
                        >
                            {!isSubmitted ? (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    {/* Name & Email Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="relative">
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                Full Name
                                            </label>
                                            <div
                                                className={`flex items-center gap-3 rounded-xl border bg-white px-4 py-3.5 transition-all duration-200 ${
                                                    focusedField === "name"
                                                        ? "border-[#2E7D32] shadow-[0_0_0_3px_rgba(46,125,50,0.08)]"
                                                        : "border-slate-200 hover:border-slate-300"
                                                }`}
                                            >
                                                <User
                                                    className={`text-lg transition-colors duration-200 ${
                                                        focusedField === "name"
                                                            ? "text-[#2E7D32]"
                                                            : "text-slate-400"
                                                    }`}
                                                />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formState.name}
                                                    onChange={handleChange}
                                                    onFocus={() =>
                                                        setFocusedField("name")
                                                    }
                                                    onBlur={() =>
                                                        setFocusedField(null)
                                                    }
                                                    placeholder="John Doe"
                                                    className="w-full bg-transparent text-[15px] text-slate-800 placeholder:text-slate-400 outline-none"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                Work Email
                                            </label>
                                            <div
                                                className={`flex items-center gap-3 rounded-xl border bg-white px-4 py-3.5 transition-all duration-200 ${
                                                    focusedField === "email"
                                                        ? "border-[#2E7D32] shadow-[0_0_0_3px_rgba(46,125,50,0.08)]"
                                                        : "border-slate-200 hover:border-slate-300"
                                                }`}
                                            >
                                                <EnvelopeSimple
                                                    className={`text-lg transition-colors duration-200 ${
                                                        focusedField === "email"
                                                            ? "text-[#2E7D32]"
                                                            : "text-slate-400"
                                                    }`}
                                                />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formState.email}
                                                    onChange={handleChange}
                                                    onFocus={() =>
                                                        setFocusedField("email")
                                                    }
                                                    onBlur={() =>
                                                        setFocusedField(null)
                                                    }
                                                    placeholder="john@company.com"
                                                    className="w-full bg-transparent text-[15px] text-slate-800 placeholder:text-slate-400 outline-none"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Company & Phone Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="relative">
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                Company
                                            </label>
                                            <div
                                                className={`flex items-center gap-3 rounded-xl border bg-white px-4 py-3.5 transition-all duration-200 ${
                                                    focusedField === "company"
                                                        ? "border-[#2E7D32] shadow-[0_0_0_3px_rgba(46,125,50,0.08)]"
                                                        : "border-slate-200 hover:border-slate-300"
                                                }`}
                                            >
                                                <Buildings
                                                    className={`text-lg transition-colors duration-200 ${
                                                        focusedField ===
                                                        "company"
                                                            ? "text-[#2E7D32]"
                                                            : "text-slate-400"
                                                    }`}
                                                />
                                                <input
                                                    type="text"
                                                    name="company"
                                                    value={formState.company}
                                                    onChange={handleChange}
                                                    onFocus={() =>
                                                        setFocusedField(
                                                            "company",
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        setFocusedField(null)
                                                    }
                                                    placeholder="Company name"
                                                    className="w-full bg-transparent text-[15px] text-slate-800 placeholder:text-slate-400 outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                Phone
                                            </label>
                                            <div
                                                className={`flex items-center gap-3 rounded-xl border bg-white px-4 py-3.5 transition-all duration-200 ${
                                                    focusedField === "phone"
                                                        ? "border-[#2E7D32] shadow-[0_0_0_3px_rgba(46,125,50,0.08)]"
                                                        : "border-slate-200 hover:border-slate-300"
                                                }`}
                                            >
                                                <Phone
                                                    className={`text-lg transition-colors duration-200 ${
                                                        focusedField === "phone"
                                                            ? "text-[#2E7D32]"
                                                            : "text-slate-400"
                                                    }`}
                                                />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formState.phone}
                                                    onChange={handleChange}
                                                    onFocus={() =>
                                                        setFocusedField("phone")
                                                    }
                                                    onBlur={() =>
                                                        setFocusedField(null)
                                                    }
                                                    placeholder="+1 (555) 000-0000"
                                                    className="w-full bg-transparent text-[15px] text-slate-800 placeholder:text-slate-400 outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Inquiry Type */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                                            What can we help you with?
                                        </label>
                                        <div className="flex flex-wrap gap-2.5">
                                            {inquiryTypes.map((type) => (
                                                <motion.button
                                                    key={type}
                                                    type="button"
                                                    whileHover={{ scale: 1.03 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    onClick={() =>
                                                        setFormState(
                                                            (prev) => ({
                                                                ...prev,
                                                                inquiryType:
                                                                    type,
                                                            }),
                                                        )
                                                    }
                                                    className={`px-4 py-2.5 rounded-full text-[14px] font-medium border transition-all duration-200 cursor-pointer ${
                                                        formState.inquiryType ===
                                                        type
                                                            ? "bg-[#2E7D32] text-white border-[#2E7D32] shadow-[0_4px_12px_-2px_rgba(46,125,50,0.3)]"
                                                            : "bg-white text-slate-600 border-slate-200 hover:border-[#2E7D32]/30 hover:text-[#2E7D32]"
                                                    }`}
                                                >
                                                    {type}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Message
                                        </label>
                                        <div
                                            className={`rounded-xl border bg-white px-4 py-3.5 transition-all duration-200 ${
                                                focusedField === "message"
                                                    ? "border-[#2E7D32] shadow-[0_0_0_3px_rgba(46,125,50,0.08)]"
                                                    : "border-slate-200 hover:border-slate-300"
                                            }`}
                                        >
                                            <textarea
                                                name="message"
                                                value={formState.message}
                                                onChange={handleChange}
                                                onFocus={() =>
                                                    setFocusedField("message")
                                                }
                                                onBlur={() =>
                                                    setFocusedField(null)
                                                }
                                                placeholder="Tell us about your diamond business and how we can help..."
                                                rows={5}
                                                className="w-full bg-transparent text-[15px] text-slate-800 placeholder:text-slate-400 outline-none resize-none"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    {errorMessage && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium"
                                        >
                                            <span>{errorMessage}</span>
                                        </motion.div>
                                    )}

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={
                                            isSubmitting ? {} : { scale: 1.01 }
                                        }
                                        whileTap={
                                            isSubmitting ? {} : { scale: 0.98 }
                                        }
                                        className={`group w-full sm:w-auto flex items-center justify-center gap-3 bg-[#111827] text-white pl-8 pr-3 py-3.5 rounded-full font-semibold text-[15px] transition-all shadow-lg cursor-pointer ${isSubmitting ? "opacity-70" : "hover:bg-[#1F2937] hover:shadow-xl"}`}
                                    >
                                        <span>
                                            {isSubmitting
                                                ? "Sending..."
                                                : "Send Message"}
                                        </span>
                                        <div
                                            className={`flex items-center justify-center w-9 h-9 rounded-full bg-white text-[#111827] transition-transform duration-300 ${isSubmitting ? "animate-spin" : "group-hover:rotate-45"}`}
                                        >
                                            <PaperPlaneTilt
                                                weight="bold"
                                                className="w-4 h-4"
                                            />
                                        </div>
                                    </motion.button>
                                </form>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-2xl border border-slate-100 bg-slate-50/50"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 15,
                                            delay: 0.1,
                                        }}
                                    >
                                        <CheckCircle
                                            weight="fill"
                                            className="text-[#2E7D32] text-6xl mb-5"
                                        />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-[#111827] mb-3">
                                        Message Sent Successfully
                                    </h3>
                                    <p className="text-slate-500 text-[15px] max-w-sm leading-relaxed">
                                        Thank you for reaching out. Our team
                                        will get back to you within 24 hours.
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setFormState({
                                                name: "",
                                                email: "",
                                                company: "",
                                                phone: "",
                                                inquiryType: "",
                                                message: "",
                                            });
                                        }}
                                        className="mt-8 px-6 py-3 rounded-full text-sm font-semibold text-[#2E7D32] border border-[#2E7D32]/20 hover:bg-[#2E7D32]/5 transition-colors cursor-pointer"
                                    >
                                        Send Another Message
                                    </motion.button>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="lg:col-span-2 flex flex-col gap-5"
                        >
                            {/* Contact Info Cards */}
                            {contactInfo.map((item, index) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.35 + index * 0.1,
                                    }}
                                    whileHover={{ y: -2 }}
                                    className="group flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-white hover:border-[#2E7D32]/15 hover:shadow-lg hover:shadow-[#2E7D32]/5 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#2E7D32]/5 text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-all duration-300">
                                        <item.icon
                                            weight="fill"
                                            className="text-xl"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-slate-800 mb-1">
                                            {item.label}
                                        </p>
                                        <p className="text-[14px] text-slate-500 group-hover:text-[#2E7D32] transition-colors">
                                            {item.value}
                                        </p>
                                    </div>
                                    <ArrowUpRight className="text-slate-300 group-hover:text-[#2E7D32] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 mt-1" />
                                </motion.a>
                            ))}

                            {/* Quick CTA Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.65 }}
                                className="p-6 rounded-2xl bg-[#111827] text-white mt-2 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#2E7D32]/15 blur-[80px] rounded-full pointer-events-none" />
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold mb-2">
                                        Ready to get started?
                                    </h3>
                                    <p className="text-slate-400 text-[14px] leading-relaxed mb-5">
                                        Schedule a personalized demo and see how
                                        Carat Logic transforms diamond
                                        operations.
                                    </p>
                                    <motion.a
                                        href="#demo"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="group inline-flex items-center gap-3 bg-[#2E7D32] text-white pl-5 pr-2 py-2 rounded-full font-semibold text-[14px] hover:bg-[#236026] transition-all shadow-[0_8px_20px_-6px_rgba(46,125,50,0.4)]"
                                    >
                                        <span>Book a Demo</span>
                                        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-45">
                                            <ArrowUpRight
                                                weight="bold"
                                                className="w-3.5 h-3.5"
                                            />
                                        </div>
                                    </motion.a>
                                </div>
                            </motion.div>

                            {/* Response Time Note */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.75 }}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100"
                            >
                                <div className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
                                <p className="text-[13px] text-slate-500 font-medium">
                                    Average response time: under 4 hours
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
