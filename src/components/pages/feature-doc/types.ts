/** Content for the shared "feature doc" artboard (FinancialOps / Manufacturing / Contacts pages). */
export type DocSection = {
    id: string;
    /** Label in the desktop "On this page" nav. */
    toc: string;
    title: string;
    paragraphs: string[];
    /** Optional green-rule callout rendered after the paragraphs. */
    callout?: string;
};

export type FeatureDocContent = {
    /** Unique key used for layoutIds / DOM ids. */
    key: string;
    title: string;
    intro: string;
    sections: DocSection[];
    /** Dark "Example" card. */
    example?: { toc: string; title: string; text: string };
    faq: [string, string][];
    /** Dark closing CTA card after the FAQs. */
    cta?: { title: string };
};
