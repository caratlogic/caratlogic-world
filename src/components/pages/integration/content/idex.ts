import type { IntegrationContent } from "../types";

/** Copy from IdexIntegrationPage.dc.html / IdexIntegrationPageMobile.dc.html (verbatim). */
export const idexContent: IntegrationContent = {
    key: "int-idex",
    metaTitle: "IDEX Online Integration for Diamond Inventory | Carat Logic",
    title: "Connect Carat Logic with IDEX",
    intro: "Send stock to IDEX and receive trading updates back into Carat Logic. Keep your inventory workflow connected to the marketplace activity your team manages.",
    sections: [
        {
            id: "connected",
            toc: "Workflow overview",
            title: "Connect your inventory with IDEX trading",
            paragraphs: [
                "When your team lists stock on IDEX, it helps to keep trading activity connected to the inventory records you manage. Carat Logic links your inventory workflow with IDEX, so stock can be sent to the platform and trading updates can flow back into Carat Logic.",
            ],
        },
        {
            id: "what",
            toc: "What the integration does",
            title: "What the IDEX integration helps you do",
            paragraphs: [],
            blocks: [
                { type: "h3", text: "Send stock to IDEX" },
                { type: "p", text: "Connect your Carat Logic inventory with your IDEX trading workflow. Share stock from Carat Logic for listing on IDEX." },
                { type: "h3", text: "Receive trading updates in Carat Logic" },
                { type: "p", text: "Keep trading updates flowing back into your inventory. Your team can review marketplace activity alongside the stock records it manages." },
                { type: "h3", text: "Keep inventory and trading activity connected" },
                { type: "p", text: "Manage your stock in Carat Logic while using IDEX to connect with diamond buyers and sellers. The integration links the two workflows." },
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
                        { strong: "Manage stock in Carat Logic.", text: "Keep your inventory records in the system your team uses to manage stock." },
                        { strong: "Connect your IDEX workflow.", text: "Set up the connection with the Carat Logic team." },
                        { strong: "Send stock to IDEX.", text: "Share stock through the connected workflow." },
                        { strong: "Receive trading updates.", text: "Keep updates flowing back into your Carat Logic inventory." },
                    ],
                },
            ],
        },
        {
            id: "who",
            toc: "Who it’s for",
            title: "For diamond businesses trading through IDEX",
            paragraphs: [
                "IDEX is an online diamond-trading platform for professional diamond traders and jewellery retailers. It lets members search diamond listings, post stock and contact sellers.",
                "Carat Logic connects your IDEX trading workflow with the inventory your team manages.",
            ],
        },
    ],
    faq: [
        [
            "What does the IDEX integration do?",
            "It lets your team send stock to IDEX and receive trading updates back into Carat Logic.",
        ],
        [
            "What is IDEX?",
            "IDEX Online is a diamond-trading platform where industry professionals can search listings, post diamonds and connect with sellers.",
        ],
        [
            "Do trading updates come back into Carat Logic?",
            "Yes. The connection is designed to bring trading updates back into your Carat Logic inventory workflow.",
        ],
        [
            "How do I get started?",
            "Book a Carat Logic demo to discuss your inventory workflow and confirm the setup for your IDEX connection.",
        ],
    ],
    cta: { title: "See Carat Logic in a demo" },
};
