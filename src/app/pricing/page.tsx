import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { PricingPageDesktop } from "@/components/pages/pricing/PricingPageDesktop";
import { PricingPageMobile } from "@/components/pages/pricing/PricingPageMobile";

export const metadata: Metadata = {
    title: "Pricing | Carat Logic",
    description:
        "Book a free demo first. After the walkthrough, our team can help arrange access to the ₹0 trial so you can explore Carat Logic before choosing a paid package.",
};

export default function Page() {
    return <Responsive desktop={<PricingPageDesktop />} mobile={<PricingPageMobile />} />;
}
