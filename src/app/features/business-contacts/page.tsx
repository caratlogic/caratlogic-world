import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { BusinessContactsDesktop } from "@/components/pages/business-contacts/BusinessContactsDesktop";
import { BusinessContactsMobile } from "@/components/pages/business-contacts/BusinessContactsMobile";

export const metadata: Metadata = {
    title: "Business Contacts, Partners and Shared Stock | Carat Logic",
    description: "Keep customer, supplier, broker and partner records connected with the warehouses, exhibitions and diamond or gemstone stock your team manages—including co-owned stock.",
};

export default function Page() {
    return <Responsive desktop={<BusinessContactsDesktop />} mobile={<BusinessContactsMobile />} />;
}
