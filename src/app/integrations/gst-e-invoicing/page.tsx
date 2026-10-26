import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { FeatureDocDesktop } from "@/components/pages/feature-doc/FeatureDocDesktop";
import { FeatureDocMobile } from "@/components/pages/feature-doc/FeatureDocMobile";
import { gstContent } from "@/components/pages/integration/content/gst-e-invoicing";

export const metadata: Metadata = {
    title: gstContent.metaTitle,
    description: gstContent.intro,
};

export default function Page() {
    return <Responsive desktop={<FeatureDocDesktop content={gstContent} />} mobile={<FeatureDocMobile content={gstContent} />} />;
}
