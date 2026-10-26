import type { Metadata } from "next";
import { IntegrationsIndex } from "@/components/pages/integrations-index/IntegrationsIndex";

export const metadata: Metadata = {
    title: "Integrations: Diamond Marketplaces and E-Invoicing | Carat Logic",
    description:
        "Connect Carat Logic Inventory with Rapaport Trade / RapNet, VDB, Nivoda, IDEX, Peppol, KSeF and GST e-invoicing. Send stock and invoices out and bring updates back in.",
};

export default function Page() {
    return <IntegrationsIndex />;
}
