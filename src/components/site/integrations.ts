/** Every integration the site has a page for, in the design's order (hub, Features menu, /integrations). */
export type Integration = {
    slug: string;
    href: string;
    name: string;
    /** Short monogram used on the hub nodes and cards. */
    mono: string;
    group: "marketplace" | "e-invoicing";
    category: string;
    desc: string;
};

export const INTEGRATIONS: Integration[] = [
    { slug: "rapnet", href: "/integrations/rapaport-trade-rapnet", name: "Rapaport Trade / RapNet", mono: "RN", group: "marketplace", category: "Diamond Marketplace", desc: "Send stock to Rapaport Trade / RapNet and bring marketplace updates back into Carat Logic." },
    { slug: "vdb", href: "/integrations/vdb", name: "VDB", mono: "VDB", group: "marketplace", category: "Diamond Marketplace", desc: "Share stock with VDB and receive marketplace activity back into your inventory." },
    { slug: "nivoda", href: "/integrations/nivoda", name: "Nivoda", mono: "NV", group: "marketplace", category: "Diamond Marketplace", desc: "List stock on Nivoda and keep updates flowing back into your Carat Logic inventory." },
    { slug: "idex", href: "/integrations/idex", name: "IDEX", mono: "IDX", group: "marketplace", category: "Diamond Marketplace", desc: "Send stock to IDEX and receive trading updates back into Carat Logic." },
    { slug: "peppol", href: "/integrations/peppol-e-invoicing", name: "Peppol", mono: "PP", group: "e-invoicing", category: "E-Invoicing · Europe", desc: "Send e-invoices to European trading partners and receive their incoming e-invoices directly in Carat Logic." },
    { slug: "ksef", href: "/integrations/ksef", name: "KSeF", mono: "KSeF", group: "e-invoicing", category: "E-Invoicing · Poland", desc: "Send e-invoices through Poland’s National e-Invoicing System (KSeF) and receive incoming invoices from your Polish trading partners." },
    { slug: "gst-e-invoicing", href: "/integrations/gst-e-invoicing", name: "GST E-Invoicing", mono: "GST", group: "e-invoicing", category: "E-Invoicing · India", desc: "Send invoices for GST e-invoice registration and receive the registered details back on your invoice." },
];

export const INTEGRATIONS_INDEX_HREF = "/integrations";
export const REQUEST_INTEGRATION_HREF = "/contact?tab=query";

/** Route for a hub node's slug; unknown slugs ("request") go to the enquiry form. */
export function integrationHref(slug: string): string {
    return INTEGRATIONS.find((i) => i.slug === slug)?.href ?? REQUEST_INTEGRATION_HREF;
}
