import type { IntegrationContent } from "../types";

/** Copy from NivodaIntegrationPage.dc.html / NivodaIntegrationPageMobile.dc.html (verbatim). */
export const nivodaContent: IntegrationContent = {
    key: "int-nivoda",
    metaTitle: "Nivoda Integration for Diamond Inventory | Carat Logic",
    title: "Connect Carat Logic with Nivoda",
    intro: "List stock on Nivoda and keep marketplace updates flowing back into your Carat Logic inventory. Connect your inventory workflow with the marketplace activity your team needs to manage.",
    sections: [
        {
            id: "connected",
            toc: "Workflow overview",
            title: "Keep your Nivoda listings connected to your inventory",
            paragraphs: [
                "Managing stock across an inventory system and a marketplace can mean checking both to stay up to date. Carat Logic connects your inventory with Nivoda, so your team can list stock on the marketplace and bring updates back into its inventory workflow.",
            ],
        },
        {
            id: "what",
            toc: "What the integration does",
            title: "What the Nivoda integration helps you do",
            paragraphs: [],
            blocks: [
                { type: "h3", text: "List stock on Nivoda" },
                { type: "p", text: "Connect Carat Logic inventory with your Nivoda marketplace workflow. Share stock from Carat Logic for listing on Nivoda." },
                { type: "h3", text: "Keep updates flowing back" },
                { type: "p", text: "Bring marketplace updates back into your Carat Logic inventory. Your team can review those updates alongside the stock it manages." },
                { type: "h3", text: "Connect marketplace activity with inventory work" },
                { type: "p", text: "Carat Logic helps your team manage diamond and gemstone stock. Connecting Nivoda gives your team a link between inventory management and marketplace activity." },
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
                        { strong: "Manage stock in Carat Logic.", text: "Keep inventory records in the system your team uses to manage stock." },
                        { strong: "Connect your Nivoda workflow.", text: "Set up the marketplace connection with the Carat Logic team." },
                        { strong: "List stock on Nivoda.", text: "Share stock through the connected workflow." },
                        { strong: "Receive updates in Carat Logic.", text: "Keep marketplace updates flowing back into your inventory." },
                    ],
                },
            ],
        },
        {
            id: "who",
            toc: "Who it’s for",
            title: "For teams listing stock on Nivoda",
            paragraphs: [
                "Nivoda is an online marketplace for diamonds and gemstones, connecting buyers with suppliers. Carat Logic connects that marketplace workflow with the inventory your team manages.",
            ],
        },
    ],
    faq: [
        [
            "What does the Nivoda integration do?",
            "It lets your team list stock on Nivoda and keep marketplace updates flowing back into your Carat Logic inventory.",
        ],
        [
            "What is Nivoda?",
            "Nivoda is an online diamond and gemstone marketplace where buyers can source from multiple suppliers.",
        ],
        [
            "Do marketplace updates come back into Carat Logic?",
            "Yes. The integration is designed to keep updates flowing back into your Carat Logic inventory.",
        ],
        [
            "How do I get started?",
            "Book a Carat Logic demo to discuss your inventory workflow and confirm the setup for your Nivoda connection.",
        ],
    ],
    cta: { title: "See Carat Logic in a demo" },
};
