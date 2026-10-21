import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { BlogsDesktop } from "@/components/pages/blogs/BlogsDesktop";
import { BlogsMobile } from "@/components/pages/blogs/BlogsMobile";

export const metadata: Metadata = {
    title: "Blogs | Carat Logic",
    description:
        "Articles on diamond and gemstone inventory, memo management, KYC, invoicing and running a trading team with Carat Logic.",
};

export default function Page() {
    return <Responsive desktop={<BlogsDesktop />} mobile={<BlogsMobile />} />;
}
