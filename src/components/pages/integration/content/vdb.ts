import type { IntegrationContent } from "../types";

/** Copy from VdbIntegrationPage.dc.html / VdbIntegrationPageMobile.dc.html (verbatim). */
export const vdbContent: IntegrationContent = {
    key: "int-vdb",
    metaTitle: "VDB Marketplace Integration for Inventory | Carat Logic",
    title: "Connect Carat Logic with VDB",
    intro: "Share stock with VDB and receive marketplace activity back in your Carat Logic inventory. Keep your stock and marketplace workflow connected as your team lists and manages inventory.",
    sections: [
        {
            id: "connected",
            toc: "Workflow overview",
            title: "Keep marketplace activity connected to your inventory",
            paragraphs: [
                "When your team shares stock through VDB, it helps to keep marketplace activity connected to the inventory records your team manages. Carat Logic links the two workflows, so stock can be shared with VDB and marketplace activity can flow back into your inventory.",
            ],
        },
        {
            id: "what",
            toc: "What the integration does",
            title: "What the VDB integration helps you do",
            paragraphs: [],
            blocks: [
                { type: "h3", text: "Share stock with VDB" },
                { type: "p", text: "Connect your Carat Logic inventory with your VDB marketplace workflow. Share stock from Carat Logic with VDB as part of the process your team uses to list inventory." },
                { type: "h3", text: "Receive marketplace activity in your inventory" },
                { type: "p", text: "Bring marketplace activity back into your Carat Logic inventory workflow. Your team can review updates alongside the stock records it manages." },
                { type: "h3", text: "Keep inventory operations together" },
                { type: "p", text: "Carat Logic gives your team a place to manage diamond and gemstone stock. Connecting VDB helps link that inventory workflow with marketplace activity." },
            ],
        },
        {
            id: "how",
            toc: "How it works",
            title: "How the connection works",
            paragraphs: [],
            blocks: [
                {
                    type: "steps",
                    items: [
                        { strong: "Manage stock in Carat Logic.", text: "Keep inventory records in the system your team uses to manage stock." },
                        { strong: "Share stock with VDB.", text: "Connect your Carat Logic inventory to your VDB marketplace workflow." },
                        { strong: "Receive marketplace activity back.", text: "Bring VDB activity into your inventory workflow in Carat Logic." },
                    ],
                },
            ],
        },
        {
            id: "who",
            toc: "Who it’s for",
            title: "For teams that sell through VDB",
            paragraphs: [
                "The integration is for diamond and jewellery businesses that manage stock in Carat Logic and use VDB to reach marketplace buyers. VDB’s marketplace serves trade buyers and sellers across diamonds, gemstones and jewellery.",
                "Keep your marketplace workflow connected to the inventory your team works with every day.",
            ],
        },
    ],
    faq: [
        [
            "What is VDB?",
            "VDB is a jewellery technology provider with a marketplace for buyers and sellers in the jewellery trade. The marketplace supports sourcing and listing inventory across diamonds, gemstones and jewellery.",
        ],
        [
            "What does the VDB integration do?",
            "It lets your team share stock with VDB and receive marketplace activity back into its Carat Logic inventory workflow.",
        ],
        [
            "Can I manage my inventory in Carat Logic and use VDB as my marketplace?",
            "Yes. Carat Logic manages your inventory, while the integration connects that workflow with VDB marketplace activity.",
        ],
        [
            "How do I get started?",
            "Book a Carat Logic demo to discuss your inventory workflow and confirm the connection setup for your VDB account.",
        ],
    ],
    cta: { title: "See Carat Logic in a demo" },
};
