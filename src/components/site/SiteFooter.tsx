import { Responsive } from "@/components/landing/Responsive";
import { Footer } from "./Footer";
import { FooterMobile } from "./FooterMobile";

/** Site footer, rendered once in the root layout: desktop design ≥768px, mobile design below. */
export function SiteFooter() {
    return <Responsive desktop={<Footer />} mobile={<FooterMobile />} />;
}
