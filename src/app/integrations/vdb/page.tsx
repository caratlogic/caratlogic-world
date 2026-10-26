import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { FeatureDocDesktop } from "@/components/pages/feature-doc/FeatureDocDesktop";
import { FeatureDocMobile } from "@/components/pages/feature-doc/FeatureDocMobile";
import { vdbContent } from "@/components/pages/integration/content/vdb";

export const metadata: Metadata = {
    title: vdbContent.metaTitle,
    description: vdbContent.intro,
};

export default function Page() {
    return <Responsive desktop={<FeatureDocDesktop content={vdbContent} />} mobile={<FeatureDocMobile content={vdbContent} />} />;
}
