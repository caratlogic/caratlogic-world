import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { DiamondInventoryDesktop } from "@/components/pages/diamond-inventory/DiamondInventoryDesktop";
import { DiamondInventoryMobile } from "@/components/pages/diamond-inventory/DiamondInventoryMobile";

export const metadata: Metadata = {
    title: "Diamond Inventory Management Software | Carat Logic",
    description:
        "Manage natural and lab-grown diamonds, parcels, pairs and rough lots in one inventory system. Carat Logic connects diamond specifications, custom columns, certificates, pricing, stock locations, production and sales workflows.",
};

export default function Page() {
    return <Responsive desktop={<DiamondInventoryDesktop />} mobile={<DiamondInventoryMobile />} />;
}
