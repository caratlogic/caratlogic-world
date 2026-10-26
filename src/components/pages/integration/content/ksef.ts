import type { IntegrationContent } from "../types";

/** Copy from KsefIntegrationPage.dc.html / KsefIntegrationPageMobile.dc.html (verbatim). */
export const ksefContent: IntegrationContent = {
    key: "int-ksef",
    metaTitle: "KSeF E-Invoicing Integration for Poland | Carat Logic",
    title: "Connect Carat Logic with KSeF",
    intro: "Issue and receive structured e-invoices through Poland’s National e-Invoicing System (KSeF). Keep electronic invoice exchange connected to your invoicing workflow in Carat Logic.",
    sections: [
        {
            id: "connected",
            toc: "Workflow overview",
            title: "Connect your invoices with Poland’s national system",
            paragraphs: [
                "KSeF is Poland’s system for issuing, sending, receiving and storing structured invoices. Carat Logic connects your invoice workflow with KSeF, so your team can exchange structured e-invoices through the system and manage them in Carat Logic.",
            ],
        },
        {
            id: "what",
            toc: "What the integration does",
            title: "What the KSeF integration helps you do",
            paragraphs: [],
            blocks: [
                { type: "h3", text: "Issue structured e-invoices" },
                { type: "p", text: "Send structured e-invoices through KSeF from your Carat Logic workflow." },
                { type: "h3", text: "Receive incoming e-invoices" },
                { type: "p", text: "Receive structured invoices through KSeF and manage them in Carat Logic." },
                { type: "h3", text: "Keep invoice exchange connected to your business" },
                { type: "p", text: "Handle invoice exchange alongside the financial workflows your team uses to manage diamond and gemstone transactions." },
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
                        { strong: "Prepare an invoice in Carat Logic." },
                        { strong: "Issue it through the KSeF connection." },
                        { strong: "Receive incoming e-invoices through KSeF." },
                        { strong: "Manage your invoice workflow in Carat Logic." },
                    ],
                },
            ],
        },
        {
            id: "who",
            toc: "Who it’s for",
            title: "For businesses exchanging e-invoices in Poland",
            paragraphs: [
                "Connect Carat Logic with Poland’s National e-Invoicing System to issue and receive structured e-invoices as part of your business workflow.",
            ],
        },
    ],
    faq: [
        [
            "What is KSeF?",
            "KSeF stands for Krajowy System e-Faktur, Poland’s National e-Invoicing System. It supports the issuing, sending, receiving and storage of structured invoices.",
        ],
        [
            "What does the Carat Logic KSeF integration do?",
            "It connects Carat Logic with KSeF so your business can issue and receive structured e-invoices through the system.",
        ],
        [
            "Does KSeF apply to every business?",
            "Applicability depends on current Polish rules and the circumstances of the business. Check the official KSeF guidance or consult a qualified tax professional about your requirements.",
        ],
        [
            "How do I get started?",
            "Book a Carat Logic demo to discuss your invoicing workflow and the setup for your KSeF connection.",
        ],
    ],
    cta: { title: "See Carat Logic in a demo" },
};
