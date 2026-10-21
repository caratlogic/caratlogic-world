import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { KycDocumentsDesktop } from "@/components/pages/kyc-documents/KycDocumentsDesktop";
import { KycDocumentsMobile } from "@/components/pages/kyc-documents/KycDocumentsMobile";

export const metadata: Metadata = {
    title: "KYC Document Collection | Carat Logic",
    description:
        "Request business documents as part of KYC onboarding, track what has been submitted and follow up when information is incomplete or documents are nearing expiry. Carat Logic KYC supports jewellery, diamond and gemstone businesses working with customers, suppliers, brokers and partners.",
};

export default function Page() {
    return <Responsive desktop={<KycDocumentsDesktop />} mobile={<KycDocumentsMobile />} />;
}
