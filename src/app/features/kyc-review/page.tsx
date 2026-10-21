import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { KycReviewDesktop } from "@/components/pages/kyc-review/KycReviewDesktop";
import { KycReviewMobile } from "@/components/pages/kyc-review/KycReviewMobile";

export const metadata: Metadata = {
    title: "KYC Review & Status Tracking | Carat Logic",
    description:
        "See where each KYC submission stands, review the information and documents provided, and follow up when something is missing. Carat Logic KYC helps jewellery, diamond and gemstone businesses manage onboarding for customers, suppliers, brokers and partners.",
};

export default function Page() {
    return <Responsive desktop={<KycReviewDesktop />} mobile={<KycReviewMobile />} />;
}
