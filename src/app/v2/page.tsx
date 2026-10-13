import { Navbar } from "@/components/v2/Navbar";
import { HeroDesktop } from "@/components/v2/HeroDesktop";
import { Logos } from "@/components/v2/Logos";
import { Section2 } from "@/components/v2/Section2";
import { Reviews } from "@/components/v2/Reviews";
import { Platform } from "@/components/v2/Platform";
import { Products } from "@/components/v2/Products";
import { Demo } from "@/components/v2/Demo";
import { Integrations } from "@/components/v2/Integrations";
import { Pricing } from "@/components/v2/Pricing";
import { FAQ } from "@/components/v2/FAQ";
import { Footer } from "@/components/v2/Footer";

export default function V2Home() {
    return (
        <main style={{ background: "#fafafa" }}>
            <Navbar />
            <HeroDesktop />
            <Logos />
            <Section2 />
            <Reviews />
            <Platform />
            <Products />
            <Demo />
            <Integrations />
            <Pricing />
            <FAQ />
            <Footer />
        </main>
    );
}
