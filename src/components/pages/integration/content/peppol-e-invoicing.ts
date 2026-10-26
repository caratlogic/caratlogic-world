import type { IntegrationContent } from "../types";

/** Copy from PeppolIntegrationPage.dc.html / PeppolIntegrationPageMobile.dc.html (verbatim). */
export const peppolContent: IntegrationContent = {
    key: "int-peppol-e-invoicing",
    metaTitle: "Peppol E-Invoicing Integration | Carat Logic",
    title: "Send and receive Peppol e-invoices in Carat Logic",
    intro: "Send e-invoices to your European trading partners and receive their incoming e-invoices directly in Carat Logic. Keep invoice exchange connected to your team’s financial workflow.",
    sections: [
        {
            id: "connected",
            toc: "Workflow overview",
            title: "Connect outgoing and incoming e-invoices",
            paragraphs: [
                "Sending and receiving invoices across different systems can add extra steps to a trading team’s workflow. With the Peppol connection, Carat Logic supports sending e-invoices to European trading partners and receiving incoming e-invoices directly into Carat Logic.",
            ],
        },
        {
            id: "what",
            toc: "What the integration does",
            title: "What the Peppol integration helps you do",
            paragraphs: [],
            blocks: [
                { type: "h3", text: "Send e-invoices to trading partners" },
                { type: "p", text: "Send e-invoices from Carat Logic to European business partners through Peppol. Keep invoice exchange connected to your existing workflow." },
                { type: "h3", text: "Receive incoming e-invoices in Carat Logic" },
                { type: "p", text: "Receive e-invoices from your trading partners directly in Carat Logic, giving your team a clear place to handle incoming invoice activity." },
                { type: "h3", text: "Keep invoice exchange connected to your operations" },
                { type: "p", text: "Manage invoices as part of your Carat Logic workflow for diamond and gemstone business transactions." },
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
                        { strong: "Prepare an e-invoice in Carat Logic.", text: "Create the invoice for your trading partner." },
                        { strong: "Send it through Peppol.", text: "Exchange the e-invoice with your partner through the connected network." },
                        { strong: "Receive incoming e-invoices.", text: "Invoices sent to your business through Peppol arrive directly in Carat Logic." },
                    ],
                },
            ],
        },
        {
            id: "peppol",
            toc: "What is Peppol?",
            title: "What is Peppol?",
            paragraphs: [
                "Peppol is a framework for exchanging business documents, including e-invoices, between connected organisations. E-invoices use structured data that can be processed by business systems; they are more than a PDF sent by email.",
            ],
        },
        {
            id: "who",
            toc: "Who it’s for",
            title: "For diamond and gemstone businesses working with European partners",
            paragraphs: [
                "Carat Logic connects Peppol e-invoicing with the financial workflows used by diamond and gemstone businesses. Send invoices to trading partners and receive their incoming e-invoices directly in Carat Logic.",
            ],
        },
    ],
    faq: [
        [
            "What is Peppol e-invoicing?",
            "Peppol supports the standardised exchange of business documents, including e-invoices, between organisations using compatible systems.",
        ],
        [
            "Can I send e-invoices to European trading partners through Carat Logic?",
            "Yes. The Peppol integration lets you send e-invoices to European trading partners through Carat Logic.",
        ],
        [
            "Can incoming e-invoices be received in Carat Logic?",
            "Yes. Incoming e-invoices can be received directly in Carat Logic.",
        ],
        [
            "Is an emailed PDF the same as a Peppol e-invoice?",
            "No. A Peppol e-invoice uses structured data designed for electronic processing. A PDF sent by email does not, by itself, provide that structured exchange.",
        ],
        [
            "How do I get started?",
            "Book a Carat Logic demo to discuss your invoicing workflow and the setup for your Peppol connection.",
        ],
    ],
    cta: { title: "See Carat Logic in a demo" },
};
