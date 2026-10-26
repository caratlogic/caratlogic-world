import type { IntegrationContent } from "../types";

/** Copy from RapnetIntegrationPage.dc.html / RapnetIntegrationPageMobile.dc.html (verbatim). */
export const rapnetContent: IntegrationContent = {
    key: "int-rapaport-trade-rapnet",
    metaTitle: "Rapaport Trade (RapNet) Integration | Carat Logic",
    title: "Connect Carat Logic with Rapaport Trade",
    intro: "Manage your natural diamond inventory in Carat Logic and connect it with your Rapaport Trade (formerly RapNet) marketplace workflow. Send stock to the marketplace and bring marketplace updates back into Carat Logic.",
    sections: [
        {
            id: "connected",
            toc: "Workflow overview",
            title: "Keep your marketplace workflow connected to your inventory",
            paragraphs: [
                "When inventory and marketplace activity sit in separate workflows, teams can spend time checking information in more than one place. Carat Logic connects your natural diamond inventory with Rapaport Trade, helping your team manage stock and marketplace activity as part of its inventory workflow.",
            ],
        },
        {
            id: "what",
            toc: "What the integration does",
            title: "What the integration helps you do",
            paragraphs: [],
            blocks: [
                { type: "h3", text: "Send stock to Rapaport Trade" },
                { type: "p", text: "Connect Carat Logic inventory with your Rapaport Trade marketplace workflow. Your team can manage diamond stock in Carat Logic and send stock to the marketplace from there." },
                { type: "h3", text: "Bring marketplace updates back into Carat Logic" },
                { type: "p", text: "Keep marketplace activity connected to your inventory records. Updates from Rapaport Trade can flow back into Carat Logic, giving your team a clearer view of stock across its workflow." },
                { type: "h3", text: "Review Rap pricing alongside inventory" },
                { type: "p", text: "For teams using Rapaport Trade, Carat Logic also provides Rap price list lookup and calculates a diamond’s Back %—its discount or premium relative to Rap—along with its total valuation. This gives your team pricing context when reviewing inventory or preparing a price for a buyer." },
            ],
        },
        {
            id: "how",
            toc: "How it works",
            title: "How it works",
            paragraphs: [],
            blocks: [
                {
                    type: "steps",
                    items: [
                        { strong: "Manage diamond inventory in Carat Logic.", text: "Keep your natural diamond stock and its records in your inventory workflow." },
                        { strong: "Connect your marketplace workflow.", text: "Set up the Rapaport Trade connection with the Carat Logic team." },
                        { strong: "Send stock and receive updates.", text: "Share stock with Rapaport Trade and bring marketplace updates back into Carat Logic." },
                        { strong: "Review inventory and pricing context.", text: "Use Rap price lookup and valuation details when reviewing stock." },
                    ],
                },
            ],
        },
        {
            id: "who",
            toc: "Who it’s for",
            title: "Built for diamond businesses using Rapaport Trade",
            paragraphs: [
                "The integration is designed for diamond dealers, suppliers and manufacturers who manage natural diamond stock in Carat Logic and use Rapaport Trade to connect with marketplace buyers and sellers.",
                "Keep inventory management and marketplace activity linked as your team sources, prices and sells diamonds.",
            ],
        },
    ],
    faq: [
        [
            "Is RapNet the same as Rapaport Trade?",
            "Yes. RapNet has officially transitioned to the Rapaport Trade name. The marketplace’s trading and sourcing capabilities continue under the new brand.",
        ],
        [
            "What does the Carat Logic integration do?",
            "Carat Logic can send stock to Rapaport Trade and bring marketplace updates back into Carat Logic.",
        ],
        [
            "Can I review Rap pricing in Carat Logic?",
            "Yes. Carat Logic provides Rap price list lookup and calculates Back % and total valuation for diamond inventory.",
        ],
        [
            "Is this integration for natural diamonds?",
            "This integration page is for natural diamond marketplace workflows. Rapaport Trade describes its platform as focused on the natural diamond industry.",
        ],
        [
            "How do I connect my account?",
            "Book a Carat Logic demo to discuss your inventory workflow and the setup requirements for your Rapaport Trade account.",
        ],
    ],
    cta: { title: "See Carat Logic in a demo" },
};
