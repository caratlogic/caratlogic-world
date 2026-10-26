import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { FeatureDocDesktop } from "@/components/pages/feature-doc/FeatureDocDesktop";
import { FeatureDocMobile } from "@/components/pages/feature-doc/FeatureDocMobile";
import { nivodaContent } from "@/components/pages/integration/content/nivoda";

export const metadata: Metadata = {
    title: nivodaContent.metaTitle,
    description: nivodaContent.intro,
};

export default function Page() {
    return <Responsive desktop={<FeatureDocDesktop content={nivodaContent} />} mobile={<FeatureDocMobile content={nivodaContent} />} />;
}
