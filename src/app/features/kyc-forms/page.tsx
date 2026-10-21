import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { KycFormsDesktop } from "@/components/pages/kyc-forms/KycFormsDesktop";
import { KycFormsMobile } from "@/components/pages/kyc-forms/KycFormsMobile";

export const metadata: Metadata = {
    title: "Custom KYC Forms | Carat Logic",
    description:
        "Create multi-page KYC forms with the questions and document requests your process needs. Carat Logic KYC helps B2B, B2C and manufacturing teams tailor onboarding for customers, suppliers, brokers and partners.",
};

export default function Page() {
    return <Responsive desktop={<KycFormsDesktop />} mobile={<KycFormsMobile />} />;
}
