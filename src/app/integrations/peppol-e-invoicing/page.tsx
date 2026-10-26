import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { FeatureDocDesktop } from "@/components/pages/feature-doc/FeatureDocDesktop";
import { FeatureDocMobile } from "@/components/pages/feature-doc/FeatureDocMobile";
import { peppolContent } from "@/components/pages/integration/content/peppol-e-invoicing";

export const metadata: Metadata = {
    title: peppolContent.metaTitle,
    description: peppolContent.intro,
};

export default function Page() {
    return <Responsive desktop={<FeatureDocDesktop content={peppolContent} />} mobile={<FeatureDocMobile content={peppolContent} />} />;
}
