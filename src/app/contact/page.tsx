import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactPage } from "@/components/pages/contact/ContactPage";

export const metadata: Metadata = {
    title: "Contact Us | Carat Logic",
    description: "Book a demo to see Carat Logic with your workflows, or send us a question about Inventory, KYC or pricing.",
};

export default function Page() {
    return (
        <Suspense fallback={null}>
            <ContactPage />
        </Suspense>
    );
}
