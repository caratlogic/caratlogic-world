"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, GraphIcon } from "@phosphor-icons/react";
import { BentoGrid } from "../components/layouts/BentoGrid";
import { FeaturesSection } from "../components/layouts/FeaturesSection";

import { ZigZagFeatures } from "../components/layouts/ZigZagFeatures";
import { Testimonials } from "../components/layouts/Testimonials";
import { PricingSection } from "../components/layouts/PricingSection";
import { Footer } from "../components/layouts/Footer";
import { FAQSection } from "../components/layouts/FAQSection";
import { ArrowsClockwise, ShieldCheck } from "@phosphor-icons/react";
import { CTASection } from "@/components/layouts/CTASection";
export default function Home() {
    return (
        <div className="min-h-screen w-full relative">
            <CTASection />

            {/* Bento Grid Section */}
            <BentoGrid />

            {/* modern sections inspired by references */}
            <ZigZagFeatures />
            <FeaturesSection />
            {/* <Testimonials /> */}
            {/* <PricingSection /> */}
            <FAQSection />
            <Footer />
        </div>
    );
}
