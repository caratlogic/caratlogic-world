import type { IntegrationContent } from "../types";

/** Copy from GstIntegrationPage.dc.html / GstIntegrationPageMobile.dc.html (verbatim). */
export const gstContent: IntegrationContent = {
    key: "int-gst-e-invoicing",
    metaTitle: "GST E-Invoicing Integration for India | Carat Logic",
    title: "Register GST e-invoices from Carat Logic",
    intro: "Send invoices for GST e-invoice registration and receive the registered details back on your invoice. Keep the registration step connected to your invoicing workflow in Carat Logic.",
    sections: [
        {
            id: "connected",
            toc: "Workflow overview",
            title: "Connect invoice registration with your workflow",
            paragraphs: [
                "Under India’s GST e-invoicing system, details of applicable invoices are reported to an Invoice Registration Portal (IRP). The portal returns registration details, including an Invoice Reference Number (IRN) and QR code.",
                "Carat Logic connects this registration step to your invoice workflow. Send an invoice for registration and receive the registered details back on the invoice.",
            ],
        },
        {
            id: "what",
            toc: "What the integration does",
            title: "What the GST e-invoicing integration helps you do",
            paragraphs: [],
            blocks: [
                { type: "h3", text: "Send invoices for registration" },
                { type: "p", text: "Submit invoice details from Carat Logic for GST e-invoice registration through the connected workflow." },
                { type: "h3", text: "Receive registration details back" },
                { type: "p", text: "Bring the registration response back to the invoice in Carat Logic. This can include the IRN and QR code returned through the e-invoicing process." },
                { type: "h3", text: "Keep invoice records together" },
                { type: "p", text: "Keep the invoice and its registration details connected in Carat Logic, so your team can refer to them while managing its invoicing workflow." },
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
                        { strong: "Prepare the invoice in Carat Logic." },
                        { strong: "Send its details for GST e-invoice registration." },
                        { strong: "Receive the registration response.", text: "The IRP returns the relevant registered details, such as the IRN and QR code." },
                        { strong: "Keep the details with the invoice in Carat Logic." },
                    ],
                },
            ],
        },
        {
            id: "who",
            toc: "Who it’s for",
            title: "For businesses using GST e-invoicing in India",
            paragraphs: [
                "This integration supports the GST e-invoice registration workflow for Carat Logic users. E-invoicing applies to specified taxpayers and documents under current GST rules, so confirm that it applies to your business before using the process.",
            ],
        },
    ],
    faq: [
        [
            "What is GST e-invoicing?",
            "GST e-invoicing involves reporting details of applicable GST documents to an Invoice Registration Portal and obtaining an IRN. The invoice is prepared in the business’s own billing or accounting system; the portal registers the reported details.",
        ],
        [
            "What details are returned after registration?",
            "The IRP returns an IRN and a QR code for a successfully registered invoice. Carat Logic’s integration returns registered details to the invoice.",
        ],
        [
            "Does the integration determine whether my business must use e-invoicing?",
            "No. Applicability depends on current GST rules and your business circumstances. Confirm your requirements with a qualified tax professional or the GST portal.",
        ],
        [
            "How do I get started?",
            "Book a Carat Logic demo to discuss your invoice workflow and the setup for GST e-invoicing.",
        ],
    ],
    cta: { title: "See Carat Logic in a demo" },
};
