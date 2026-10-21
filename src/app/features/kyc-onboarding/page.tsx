import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { KycOnboardingDesktop } from "@/components/pages/kyc-onboarding/KycOnboardingDesktop";
import { KycOnboardingMobile } from "@/components/pages/kyc-onboarding/KycOnboardingMobile";

export const metadata: Metadata = {
    title: "Business Contact Onboarding | Carat Logic",
    description:
        "Keep customer, supplier, broker and partner details organized, then connect each business contact to the right KYC form. Carat Logic KYC supports onboarding for B2B, B2C and manufacturing teams.",
};

export default function Page() {
    return <Responsive desktop={<KycOnboardingDesktop />} mobile={<KycOnboardingMobile />} />;
}
