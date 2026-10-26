import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { FeatureDocDesktop } from "@/components/pages/feature-doc/FeatureDocDesktop";
import { FeatureDocMobile } from "@/components/pages/feature-doc/FeatureDocMobile";
import { idexContent } from "@/components/pages/integration/content/idex";

export const metadata: Metadata = {
    title: idexContent.metaTitle,
    description: idexContent.intro,
};

export default function Page() {
    return <Responsive desktop={<FeatureDocDesktop content={idexContent} />} mobile={<FeatureDocMobile content={idexContent} />} />;
}
