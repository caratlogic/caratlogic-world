import { Navbar } from "@/components/v2/Navbar";
import { Responsive } from "@/components/v2/Responsive";
import { HeroDesktop } from "@/components/v2/HeroDesktop";
import { HeroMobile, MobileActionBar } from "@/components/v2/HeroMobile";
import { Logos } from "@/components/v2/Logos";
import { LogosMobile } from "@/components/v2/LogosMobile";
import { Section2 } from "@/components/v2/Section2";
import { Section2Mobile } from "@/components/v2/Section2Mobile";
import { Reviews } from "@/components/v2/Reviews";
import { ReviewsMobile } from "@/components/v2/ReviewsMobile";
import { Platform } from "@/components/v2/Platform";
import { PlatformMobile } from "@/components/v2/PlatformMobile";
import { Products } from "@/components/v2/Products";
import { ProductsMobile } from "@/components/v2/ProductsMobile";
import { Demo } from "@/components/v2/Demo";
import { DemoMobile } from "@/components/v2/DemoMobile";
import { Integrations } from "@/components/v2/Integrations";
import { IntegrationsMobile } from "@/components/v2/IntegrationsMobile";
import { Pricing } from "@/components/v2/Pricing";
import { PricingMobile } from "@/components/v2/PricingMobile";
import { FAQ } from "@/components/v2/FAQ";
import { FAQMobile } from "@/components/v2/FAQMobile";
import { Footer } from "@/components/v2/Footer";
import { FooterMobile } from "@/components/v2/FooterMobile";

/** Each section renders its desktop (1440) or mobile (390) artboard; the switch is at 768px. */
export default function V2Home() {
    return (
        <main style={{ background: "#ffffff" }}>
            <Navbar />
            <Responsive desktop={<HeroDesktop />} mobile={<HeroMobile />} />
            <Responsive desktop={<Logos />} mobile={<LogosMobile />} />
            <Responsive desktop={<Section2 />} mobile={<Section2Mobile />} />
            <Responsive desktop={<Reviews />} mobile={<ReviewsMobile />} />
            <Responsive desktop={<Platform />} mobile={<PlatformMobile />} />
            <Responsive desktop={<Products />} mobile={<ProductsMobile />} />
            <Responsive desktop={<Demo />} mobile={<DemoMobile />} />
            <Responsive desktop={<Integrations />} mobile={<IntegrationsMobile />} />
            <Responsive desktop={<Pricing />} mobile={<PricingMobile />} />
            <Responsive desktop={<FAQ />} mobile={<FAQMobile />} />
            <Responsive desktop={<Footer />} mobile={<FooterMobile />} />
            <MobileActionBar />
        </main>
    );
}
