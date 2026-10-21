import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { GemInventoryDesktop } from "@/components/pages/gem-inventory/GemInventoryDesktop";
import { GemInventoryMobile } from "@/components/pages/gem-inventory/GemInventoryMobile";

export const metadata: Metadata = {
    title: "Gemstone Inventory Management Software | Carat Logic",
    description:
        "Manage individual gemstones, parcels, matched pairs and sets in one inventory system. Keep gemological details, certificates, pricing, images, stock locations and client presentations connected to each stone.",
};

export default function Page() {
    return <Responsive desktop={<GemInventoryDesktop />} mobile={<GemInventoryMobile />} />;
}
