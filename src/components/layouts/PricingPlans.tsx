"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { CheckCircle, ArrowUpRight, Minus } from "@phosphor-icons/react";

/**
 * Feature rows mirror the IMS permissions defined in
 * identity-service-backend/src/utils/permission-constants.ts (imsFeatures).
 * Keep this list in step with that file — it is what the platform actually gates on.
 */

const CONTACT_URL = "/contact";
const PLAN_NAMES = ["Standard", "Premium", "Enterprise"] as const;

type Mark = "included" | "optional" | "absent";
type Cell = { kind: "mark"; mark: Mark } | { kind: "text"; text: string };
type Row = { name: string; description: string; cells: [Cell, Cell, Cell] };
type Group = { title: string; rows: Row[]; scope?: boolean };

const mk = (mark: Mark): Cell => ({ kind: "mark", mark });
const tx = (text: string): Cell => ({ kind: "text", text });

const GROUPS: Group[] = [
  {
    title: "Plan scope",
    scope: true,
    rows: [
      {
        name: "Inventory modules",
        description: "Which stone programs run inside your company.",
        cells: [tx("Gem or Diamond"), tx("Gem or Diamond"), tx("Gem + Diamond")],
      },
      {
        name: "Active users",
        description: "Named people who can sign in, each with their own role.",
        cells: [tx("3"), tx("7"), tx("7")],
      },
      {
        name: "KYC application",
        description: "Customer & supplier onboarding, sharing the same login.",
        cells: [mk("absent"), mk("absent"), mk("included")],
      },
    ],
  },
  {
    title: "Gem Module",
    rows: [
    { name: "Gem Inventory Management", description: "Manage and track your complete gem inventory.", cells: [mk("optional"), mk("optional"), mk("included")] },
    { name: "Gem Settings", description: "Manage gem attributes such as type, color, shape, and more.", cells: [mk("optional"), mk("optional"), mk("included")] },
    { name: "Gem Barcode Settings", description: "Configure barcode settings for gems.", cells: [mk("optional"), mk("optional"), mk("included")] },
    { name: "Gem Manufacturing", description: "Manage gem manufacturing processes, lots, and production stages.", cells: [mk("optional"), mk("optional"), mk("included")] },
    ],
  },
  {
    title: "Diamond Module",
    rows: [
    { name: "Diamond Inventory Management", description: "Manage and track your complete diamond inventory.", cells: [mk("optional"), mk("optional"), mk("included")] },
    { name: "Diamond Settings", description: "Manage diamond attributes such as shape, color, polish, and more.", cells: [mk("optional"), mk("optional"), mk("included")] },
    { name: "Diamond Barcode Settings", description: "Configure barcode settings for diamonds.", cells: [mk("optional"), mk("optional"), mk("included")] },
    { name: "Diamond Manufacturing", description: "Manage diamond manufacturing processes, lots, and production stages.", cells: [mk("optional"), mk("optional"), mk("included")] },
    ],
  },
  {
    title: "Core Platform — in every plan",
    rows: [
    { name: "Business Contacts", description: "Manage customers, partners, suppliers, and other business contacts.", cells: [mk("included"), mk("included"), mk("included")] },
    { name: "Sales Management", description: "Access and manage invoices, quotations, and consignments.", cells: [mk("included"), mk("included"), mk("included")] },
    { name: "Payments", description: "Record and track payments made against invoices.", cells: [mk("included"), mk("included"), mk("included")] },
    { name: "Customer Wallets", description: "Log manual debits and credits for each customer account.", cells: [mk("included"), mk("included"), mk("included")] },
    { name: "Email Template Configuration", description: "Configure and update the email templates used by the system.", cells: [mk("included"), mk("included"), mk("included")] },
    { name: "Purchase Management", description: "Create and manage purchase orders, suppliers, and purchase statuses.", cells: [mk("included"), mk("included"), mk("included")] },
    { name: "Warehouse Management", description: "Manage inventory, stock movements, and warehouse operations in real time.", cells: [mk("included"), mk("included"), mk("included")] },
    { name: "Email Notifications", description: "Toggle automatic customer emails for invoices and memo out events.", cells: [mk("included"), mk("included"), mk("included")] },
    { name: "Log Management", description: "Choose which features record an audit trail, and review or delete recorded logs.", cells: [mk("included"), mk("included"), mk("included")] },
    ],
  },
];

const plans = [
    {
        name: "Standard",
        price: 150,
        description: "One stone program for a small desk.",
        features: [
            "Gem **or** Diamond module",
            "Up to **3** active users",
            "All 9 core platform features",
            "Custom roles & permissions",
            "Unlimited stones & documents",
        ],
        highlighted: false,
    },
    {
        name: "Premium",
        price: 200,
        description: "One stone program for a full team.",
        features: [
            "Gem **or** Diamond module",
            "Up to **7** active users",
            "All 9 core platform features",
            "Custom roles & permissions",
            "Unlimited stones & documents",
        ],
        highlighted: false,
    },
    {
        name: "Enterprise",
        price: 250,
        description: "Both stone programs, plus compliance.",
        features: [
            "Gem **and** Diamond modules",
            "Up to **7** active users",
            "All 17 platform features",
            "**KYC application** included",
            "Unlimited stones & documents",
        ],
        highlighted: true,
    },
];

const kycHighlights = [
    { title: "Build your own KYC forms", body: "Supplier, partner, broker or customer questionnaires with 15 question types." },
    { title: "Ready-made supplier template", body: "An eight-page questionnaire covering licences, financials, supply chain and RJC compliance." },
    { title: "Email invites, no login", body: "Contacts complete the form in a secure browser portal with a one-time emailed passcode." },
    { title: "Secure document upload", body: "Licences, certificates and incorporation papers go straight into private encrypted storage." },
    { title: "Ten-stage review workflow", body: "Move each submission to Approved, Conditionally Approved, Rejected or More Info Required." },
    { title: "Automated chase & renewal", body: "Unfinished KYC is chased on your cadence; documents raise expiry alerts before they lapse." },
];

/** Renders **bold** segments inside a feature label. */
function RichLabel({ text }: { text: string }) {
    return (
        <>
            {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
                i % 2 === 1 ? (
                    <strong key={i} className="font-extrabold text-slate-900">{part}</strong>
                ) : (
                    <React.Fragment key={i}>{part}</React.Fragment>
                )
            )}
        </>
    );
}

function MarkIcon({ mark }: { mark: Mark }) {
    if (mark === "included") return <CheckCircle weight="fill" className="text-primary text-xl" />;
    if (mark === "optional") return <CheckCircle weight="regular" className="text-primary/70 text-xl" />;
    return <Minus weight="bold" className="text-slate-300 text-base" />;
}

function CellContent({ cell }: { cell: Cell }) {
    return cell.kind === "mark" ? (
        <MarkIcon mark={cell.mark} />
    ) : (
        <span className="text-[13.5px] font-extrabold text-slate-900">{cell.text}</span>
    );
}

export function PricingPlans() {
    return (
        <div className="w-full">
            {/* ── Plans ───────────────────────────────────────────────── */}
            <section className="px-5 sm:px-6 lg:px-12 max-w-[1240px] mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8 items-stretch">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: idx * 0.12 }}
                            className="relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-8 lg:p-10 flex flex-col h-full"
                            style={{
                                background: plan.highlighted
                                    ? "linear-gradient(175deg, rgba(46,125,50,0.18) 0%, rgba(46,125,50,0.06) 40%, rgba(250,247,240,0.7) 100%)"
                                    : "linear-gradient(175deg, rgba(46,125,50,0.10) 0%, rgba(46,125,50,0.03) 40%, rgba(250,247,240,0.6) 100%)",
                                border: plan.highlighted
                                    ? "1.5px solid rgba(46,125,50,0.25)"
                                    : "1px solid rgba(46,125,50,0.10)",
                            }}
                        >
                            {plan.highlighted && (
                                <div className="absolute top-0 right-0 bg-primary text-white text-[9px] sm:text-[10px] font-bold px-3 sm:px-4 py-1.5 rounded-bl-2xl rounded-tr-3xl uppercase tracking-widest">
                                    Most complete
                                </div>
                            )}

                            <p className="text-slate-600 text-sm font-semibold tracking-wide mb-4 sm:mb-5">
                                {plan.name} Package
                            </p>

                            <div className="flex items-baseline gap-0.5 mb-3">
                                <span className="text-[2.25rem] sm:text-4xl lg:text-[2.75rem] font-black text-slate-900 tracking-tight">
                                    &euro;{plan.price}.00
                                </span>
                                <span className="text-slate-400 text-sm sm:text-base font-medium ml-1">/Month</span>
                            </div>

                            <p className="text-slate-500 text-sm leading-relaxed mb-6 sm:mb-8 font-medium">
                                {plan.description}
                            </p>

                            <div className="w-full h-px bg-slate-900/10 mb-6 sm:mb-8" />

                            <ul className="flex flex-col gap-3.5 sm:gap-4 mb-8 sm:mb-10 flex-grow">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <CheckCircle weight="fill" className="text-primary text-xl shrink-0" />
                                        <span className="text-slate-700 text-sm font-bold">
                                            <RichLabel text={feature} />
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={CONTACT_URL}
                                className={`relative z-10 w-full py-3.5 sm:py-4 px-6 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 mt-auto flex items-center justify-center gap-2 ${
                                    plan.highlighted
                                        ? "bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35"
                                        : "bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg"
                                }`}
                            >
                                Book a Demo
                                <ArrowUpRight weight="bold" className="text-base" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Comparison ──────────────────────────────────────────── */}
            <section className="px-5 sm:px-6 lg:px-12 max-w-[1240px] mx-auto w-full mt-16 md:mt-28 lg:mt-32">
                <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 mb-6 md:mb-7">
                    <h2 className="text-slate-900 text-2xl md:text-3xl font-extrabold tracking-tight">
                        What each plan includes
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] md:text-[12.5px] font-semibold text-slate-500">
                        <span className="flex items-center gap-1.5">
                            <CheckCircle weight="fill" className="text-primary text-lg" /> Included
                        </span>
                        <span className="flex items-center gap-1.5">
                            <CheckCircle weight="regular" className="text-primary/70 text-lg" /> In the module you choose
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Minus weight="bold" className="text-slate-300 text-base" /> Not included
                        </span>
                    </div>
                </div>

                {/* Desktop / tablet: full matrix */}
                <div className="hidden lg:block overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full border-collapse min-w-[760px]">
                        <caption className="sr-only">
                            CaratLogic feature comparison across the Standard, Premium and Enterprise plans
                        </caption>
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th scope="col" className="text-left px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                                    Feature
                                </th>
                                {plans.map((p) => (
                                    <th
                                        key={p.name}
                                        scope="col"
                                        className={`px-5 py-4 w-[150px] text-center text-[15px] font-extrabold ${
                                            p.highlighted ? "text-primary bg-primary/[0.07]" : "text-slate-900"
                                        }`}
                                    >
                                        {p.name}
                                        <span className="block text-xs font-semibold text-slate-500 mt-0.5">
                                            &euro;{p.price}/mo
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {GROUPS.map((group) => (
                                <React.Fragment key={group.title}>
                                    {!group.scope && (
                                        <tr className="border-y border-slate-200">
                                            <th
                                                scope="colgroup"
                                                colSpan={4}
                                                className="text-left px-5 py-3 text-[11.5px] font-extrabold uppercase tracking-[0.13em] text-primary"
                                            >
                                                {group.title}
                                                <span className="float-right text-xs font-semibold normal-case tracking-normal text-slate-400">
                                                    {group.rows.length} features
                                                </span>
                                            </th>
                                        </tr>
                                    )}
                                    {group.rows.map((row) => (
                                        <tr
                                            key={row.name}
                                            className={`border-b border-slate-100 last:border-b-0 ${group.scope ? "bg-slate-50/70" : ""}`}
                                        >
                                            <th scope="row" className="text-left font-normal px-5 py-4">
                                                <span className="block text-[15px] font-bold text-slate-900">{row.name}</span>
                                                <span className="block text-[13px] font-medium text-slate-500 mt-0.5 leading-snug">
                                                    {row.description}
                                                </span>
                                            </th>
                                            {row.cells.map((cell, i) => (
                                                <td
                                                    key={i}
                                                    className={`px-5 py-4 text-center ${i === 2 ? "bg-primary/[0.03]" : ""}`}
                                                >
                                                    <span className="inline-flex justify-center w-full">
                                                        <CellContent cell={cell} />
                                                    </span>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Phone + tablet: the same data, stacked — no sideways scrolling */}
                <div className="lg:hidden flex flex-col gap-7">
                    {GROUPS.map((group) => (
                        <div key={group.title}>
                            <div className="flex items-baseline justify-between gap-3 mb-3">
                                <h3 className="text-[11.5px] font-extrabold uppercase tracking-[0.13em] text-primary">
                                    {group.title}
                                </h3>
                                {!group.scope && (
                                    <span className="text-[11px] font-semibold text-slate-400">
                                        {group.rows.length} features
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2.5 sm:grid sm:grid-cols-2 sm:gap-3">
                                {group.rows.map((row) => (
                                    <div
                                        key={row.name}
                                        className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col"
                                    >
                                        <p className="text-[14.5px] font-bold text-slate-900">{row.name}</p>
                                        <p className="text-[12.5px] font-medium text-slate-500 mt-0.5 leading-snug">
                                            {row.description}
                                        </p>
                                        <div className="mt-auto pt-3 grid grid-cols-3 gap-1.5">
                                            {row.cells.map((cell, i) => (
                                                <div
                                                    key={i}
                                                    className={`flex flex-col items-center justify-start gap-1.5 rounded-xl py-2.5 px-1 min-h-[68px] ${
                                                        i === 2 ? "bg-primary/[0.07]" : "bg-slate-50"
                                                    }`}
                                                >
                                                    <span className="text-[9.5px] font-bold uppercase tracking-[0.08em] text-slate-400">
                                                        {PLAN_NAMES[i]}
                                                    </span>
                                                    {cell.kind === "mark" ? (
                                                        <MarkIcon mark={cell.mark} />
                                                    ) : (
                                                        <span className="text-[11.5px] font-extrabold text-slate-900 text-center leading-tight">
                                                            {cell.text}
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <p className="mt-4 text-[12.5px] font-medium text-slate-400 leading-relaxed">
                    Standard and Premium licence one stone program — gem or diamond. Enterprise runs both in the same
                    company. Every plan includes all nine core platform features, with no caps on stones, invoices,
                    documents or exports.
                </p>
            </section>

            {/* ── KYC ─────────────────────────────────────────────────── */}
            <section className="px-5 sm:px-6 lg:px-12 max-w-[1240px] mx-auto w-full mt-16 md:mt-28 lg:mt-32">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5 }}
                    className="rounded-3xl p-6 sm:p-8 md:p-12"
                    style={{
                        background:
                            "linear-gradient(175deg, rgba(46,125,50,0.13) 0%, rgba(46,125,50,0.04) 45%, rgba(250,247,240,0.65) 100%)",
                        border: "1px solid rgba(46,125,50,0.14)",
                    }}
                >
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
                        Included with Enterprise
                    </span>
                    <h2 className="text-slate-900 text-2xl md:text-3xl font-extrabold tracking-tight mt-2">
                        The KYC Application
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-[15px] font-medium leading-relaxed mt-3 max-w-3xl">
                        A separate compliance product that sits alongside the inventory system and shares the same
                        login. Design your own due-diligence questionnaires, invite counterparties by email to a
                        secure browser portal with no account to create, and move each submission through review to
                        approval — with chasing, renewal and document-expiry alerts running on their own.
                    </p>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 mt-7 md:mt-8">
                        {kycHighlights.map((k) => (
                            <li key={k.title} className="flex gap-3 items-start">
                                <CheckCircle weight="fill" className="text-primary text-xl shrink-0 mt-0.5" />
                                <span>
                                    <span className="block text-sm font-bold text-slate-900">{k.title}</span>
                                    <span className="block text-[12.5px] font-medium text-slate-500 mt-0.5 leading-relaxed">
                                        {k.body}
                                    </span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </section>
        </div>
    );
}
