import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { ProductGuidesDesktop } from "@/components/pages/product-guides/ProductGuidesDesktop";
import { ProductGuidesMobile } from "@/components/pages/product-guides/ProductGuidesMobile";

export const metadata: Metadata = {
    title: "Product Guides | Carat Logic",
    description:
        "Step-by-step guides for setting up and using Carat Logic Inventory and Carat Logic KYC — stock, memos, orders, invoices, users and KYC reviews.",
};

export default function Page() {
    return <Responsive desktop={<ProductGuidesDesktop />} mobile={<ProductGuidesMobile />} />;
}
