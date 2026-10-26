import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { FeatureDocDesktop } from "@/components/pages/feature-doc/FeatureDocDesktop";
import { FeatureDocMobile } from "@/components/pages/feature-doc/FeatureDocMobile";
import { ksefContent } from "@/components/pages/integration/content/ksef";

export const metadata: Metadata = {
    title: ksefContent.metaTitle,
    description: ksefContent.intro,
};

export default function Page() {
    return <Responsive desktop={<FeatureDocDesktop content={ksefContent} />} mobile={<FeatureDocMobile content={ksefContent} />} />;
}
