import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { KycDesktop } from "@/components/pages/kyc/KycDesktop";
import { KycMobile } from "@/components/pages/kyc/KycMobile";

export const metadata: Metadata = {
    title: "KYC Management Software | Carat Logic",
    description: "Manage forms, documents and reviews for B2B, B2C and manufacturing teams across the jewellery, diamond and gemstone industries.",
};

export default function Page() {
    return <Responsive desktop={<KycDesktop />} mobile={<KycMobile />} />;
}
