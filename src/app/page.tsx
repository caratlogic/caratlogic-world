"use client";

import { Footer } from "../components/layouts/Footer";
import { Responsive } from "@/components/v2/Responsive";
import { HeroDesktop } from "@/components/v2/HeroDesktop";
import { HeroMobile, MobileActionBar } from "@/components/v2/HeroMobile";
import { Logos } from "@/components/v2/Logos";
import { LogosMobile } from "@/components/v2/LogosMobile";
import { Section2 } from "@/components/v2/Section2";
import { Section2Mobile } from "@/components/v2/Section2Mobile";
import { Platform } from "@/components/v2/Platform";
import { PlatformMobile } from "@/components/v2/PlatformMobile";
import { Products } from "@/components/v2/Products";
import { ProductsMobile } from "@/components/v2/ProductsMobile";
import { Integrations } from "@/components/v2/Integrations";
import { IntegrationsMobile } from "@/components/v2/IntegrationsMobile";
import { Pricing } from "@/components/v2/Pricing";
import { PricingMobile } from "@/components/v2/PricingMobile";
import { FAQ } from "@/components/v2/FAQ";
import { FAQMobile } from "@/components/v2/FAQMobile";

/**
 * Home: the site's existing Header (rendered in the root layout) and Footer around the v2
 * design sections. Each section shows its desktop or mobile artboard (switch at 768px).
 */
export default function Home() {
    return (
        <div className="min-h-screen w-full relative bg-white">
            {/* Space for the fixed Header: announcement marquee (~45px) + bar (64px, 96px from md) */}
            <div aria-hidden="true" className="h-[109px] md:h-[141px]" />

            <Responsive desktop={<HeroDesktop />} mobile={<HeroMobile />} />
            <Responsive desktop={<Logos />} mobile={<LogosMobile />} />
            <Responsive desktop={<Section2 />} mobile={<Section2Mobile />} />
            {/* Header/Footer "Features" links point at /#features */}
            <div id="features" className="scroll-mt-24">
                <Responsive desktop={<Platform />} mobile={<PlatformMobile />} />
            </div>
            <Responsive desktop={<Products />} mobile={<ProductsMobile />} />
            <Responsive desktop={<Integrations />} mobile={<IntegrationsMobile />} />
            <Responsive desktop={<Pricing />} mobile={<PricingMobile />} />
            <Responsive desktop={<FAQ />} mobile={<FAQMobile />} />
            <Footer />

            {/* Mobile hero's sticky action bar; the spacer keeps it from covering the footer's last row */}
            <MobileActionBar />
            <div aria-hidden="true" className="h-[92px] md:hidden" />
        </div>
    );
}
