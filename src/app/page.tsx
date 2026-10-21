import { Responsive } from "@/components/landing/Responsive";
import { HeroDesktop } from "@/components/landing/HeroDesktop";
import { HeroMobile, MobileActionBar } from "@/components/landing/HeroMobile";
import { Logos } from "@/components/landing/Logos";
import { LogosMobile } from "@/components/landing/LogosMobile";
import { Section2 } from "@/components/landing/Section2";
import { Section2Mobile } from "@/components/landing/Section2Mobile";
import { Platform } from "@/components/landing/Platform";
import { PlatformMobile } from "@/components/landing/PlatformMobile";
import { Products } from "@/components/landing/Products";
import { ProductsMobile } from "@/components/landing/ProductsMobile";
import { Integrations } from "@/components/landing/Integrations";
import { IntegrationsMobile } from "@/components/landing/IntegrationsMobile";
import { Pricing } from "@/components/landing/Pricing";
import { PricingMobile } from "@/components/landing/PricingMobile";
import { FAQ } from "@/components/landing/FAQ";
import { FAQMobile } from "@/components/landing/FAQMobile";

/**
 * Home. The site header and footer come from the root layout; each section shows its desktop
 * or mobile design (switch at 768px).
 */
export default function Home() {
    return (
        <div className="w-full relative bg-white">
            <Responsive desktop={<HeroDesktop />} mobile={<HeroMobile />} />
            <Responsive desktop={<Logos />} mobile={<LogosMobile />} />
            <Responsive desktop={<Section2 />} mobile={<Section2Mobile />} />
            <div id="features" className="scroll-mt-32">
                <Responsive desktop={<Platform />} mobile={<PlatformMobile />} />
            </div>
            <Responsive desktop={<Products />} mobile={<ProductsMobile />} />
            <div id="integrations" className="scroll-mt-32">
                <Responsive desktop={<Integrations />} mobile={<IntegrationsMobile />} />
            </div>
            <Responsive desktop={<Pricing />} mobile={<PricingMobile />} />
            <div id="faq" className="scroll-mt-32">
                <Responsive desktop={<FAQ />} mobile={<FAQMobile />} />
            </div>

            {/* Mobile hero's sticky action bar (the mobile footer leaves room for it) */}
            <MobileActionBar />
        </div>
    );
}
