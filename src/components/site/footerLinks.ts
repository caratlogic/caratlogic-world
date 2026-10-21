import { ROUTES } from "./Header";

export type FooterColumn = {
    title: string;
    links: { label: string; href: string }[];
    /** Shows the "© 2026 Carat Logic" line under this column (desktop design). */
    copy?: boolean;
};

/** Footer link columns from the design. "Privacy Policy" is left out until that page exists. */
export const FOOTER_COLUMNS: FooterColumn[] = [
    {
        title: "Products",
        links: [
            { label: "Carat Logic Inventory", href: ROUTES.inventory },
            { label: "Carat Logic KYC", href: ROUTES.kyc },
            { label: "Pricing", href: ROUTES.pricing },
        ],
    },
    {
        title: "Inventory Features",
        links: [
            { label: "Diamond Inventory", href: ROUTES.diamond },
            { label: "Gem Inventory", href: ROUTES.gem },
            { label: "Financial Operations", href: ROUTES.finance },
            { label: "Manufacturing", href: ROUTES.manufacturing },
            { label: "Business Contacts & Partners", href: ROUTES.contacts },
        ],
    },
    {
        title: "KYC Features",
        copy: true,
        links: [
            { label: "Custom KYC Forms", href: ROUTES.kycForms },
            { label: "Business Contact Onboarding", href: ROUTES.kycOnboarding },
            { label: "Document Collection", href: ROUTES.kycDocuments },
            { label: "Review & Status Tracking", href: ROUTES.kycReview },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Blogs", href: ROUTES.blogs },
            { label: "Product Guides", href: ROUTES.guides },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "Contact Us", href: ROUTES.contact },
            { label: "Book a Demo", href: ROUTES.demo },
        ],
    },
];
