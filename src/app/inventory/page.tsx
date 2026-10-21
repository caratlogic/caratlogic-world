import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { InventoryDesktop } from "@/components/pages/inventory/InventoryDesktop";
import { InventoryMobile } from "@/components/pages/inventory/InventoryMobile";

export const metadata: Metadata = {
    title: "Diamond and Gem Inventory Software | Carat Logic",
    description: "Manage diamond and gemstone stock, memos, and orders in one place.",
};

export default function Page() {
    return <Responsive desktop={<InventoryDesktop />} mobile={<InventoryMobile />} />;
}
