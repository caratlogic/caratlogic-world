import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { FeatureDocDesktop } from "@/components/pages/feature-doc/FeatureDocDesktop";
import { FeatureDocMobile } from "@/components/pages/feature-doc/FeatureDocMobile";
import { rapnetContent } from "@/components/pages/integration/content/rapaport-trade-rapnet";

export const metadata: Metadata = {
    title: rapnetContent.metaTitle,
    description: rapnetContent.intro,
};

export default function Page() {
    return <Responsive desktop={<FeatureDocDesktop content={rapnetContent} />} mobile={<FeatureDocMobile content={rapnetContent} />} />;
}
