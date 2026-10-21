import type { FeatureDocContent } from "../feature-doc/types";

export const businessContactsContent: FeatureDocContent = {
    key: "bc",
    title: "Manage Business Contacts, Partners and Shared Stock",
    intro: "Keep customer, supplier, broker and partner records connected with the warehouses, exhibitions and diamond or gemstone stock your team manages—including co-owned stock.",
    sections: [
        {
            id: "records",
            toc: "Business records",
            title: "Keep business records together",
            paragraphs: [
                "Carat Logic gives your team a central place for business contacts. Organize records by contact type and keep company details alongside the name and contact information of the person you work with. Add relevant business details, KYC status and commercial information to help your team understand each relationship.",
            ],
        },
        {
            id: "partners",
            toc: "Partner stock",
            title: "Know where partner stock is held",
            paragraphs: [
                "Organize stock locations as vaults, partner vaults or exhibitions. Warehouse records can show the company, location, contact person and status, helping your team see where stock is held and who it is associated with. Keep co-owned stock in view alongside the relevant partner relationship.",
            ],
        },
        {
            id: "exhibitions",
            toc: "Exhibitions",
            title: "Prepare for exhibitions",
            paragraphs: [
                "Create exhibition records with a name, status, location, date range, categories and total stock. Customise the columns shown in the exhibition list to make the information your team needs easier to review.",
            ],
        },
        {
            id: "merge",
            toc: "Merge and split stock",
            title: "Merge and split diamond or gemstone stock",
            paragraphs: [
                "Use separate operations for diamond and gemstone stock. Search by stock ID, review details such as shape or gem type, parcel or set, available carats and price, then merge selected stock records or split an individual record when needed. The history view helps your team review previous merge and split activity.",
            ],
        },
    ],
    faq: [
        ["What business contacts can I manage in Carat Logic?", "You can organize records for customers, suppliers, brokers and partners, with company and contact-person details."],
        ["Can Carat Logic track co-owned stock?", "Yes. Carat Logic helps teams keep co-owned stock visible alongside partner and storage information."],
        ["Can I manage both diamond and gemstone stock operations?", "Yes. The Merge & Split area has separate diamond and gemstone operations, with stock details relevant to each."],
        ["Can I track stock held in partner vaults or prepared for exhibitions?", "Yes. Warehouse records can include vault, partner vault and exhibition locations. Exhibition records can include their location, dates, categories, status and total stock."],
    ],
    cta: { title: "See how Carat Logic can support your business operations" },
};
