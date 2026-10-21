import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { ManufacturingDesktop } from "@/components/pages/manufacturing/ManufacturingDesktop";
import { ManufacturingMobile } from "@/components/pages/manufacturing/ManufacturingMobile";

export const metadata: Metadata = {
    title: "Diamond and Gemstone Manufacturing Tracking | Carat Logic",
    description: "Manage each production lot from rough intake through processing, quality checks and certification. Carat Logic helps diamond and gemstone teams follow work in progress, monitor yield and move completed stones into inventory.",
};

export default function Page() {
    return <Responsive desktop={<ManufacturingDesktop />} mobile={<ManufacturingMobile />} />;
}
