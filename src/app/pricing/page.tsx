import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { PricingPageDesktop } from "@/components/pages/pricing/PricingPageDesktop";
import { PricingPageMobile } from "@/components/pages/pricing/PricingPageMobile";

export const metadata: Metadata = {
    title: "Pricing | Carat Logic",
    description:
        "Compare Carat Logic packages for diamond and gemstone businesses: Standard (€150), Premium (€200) and Enterprise (€250) per month, with optional inventory modules and API keys.",
};

export default function Page() {
    return <Responsive desktop={<PricingPageDesktop />} mobile={<PricingPageMobile />} />;
}
