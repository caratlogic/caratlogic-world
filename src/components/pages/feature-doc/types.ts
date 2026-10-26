/** Content for the shared "feature doc" artboard (FinancialOps / Manufacturing / Contacts pages, and the integration pages). */

/** Extra body content after a section's paragraphs (used by the integration pages). */
export type DocBlock =
    | { type: "h3"; text: string }
    | { type: "p"; text: string }
    /** Numbered step cards (`.cl-steps`): bold lead-in followed by optional plain text. */
    | { type: "steps"; items: { strong: string; text?: string }[] };

export type DocSection = {
    id: string;
    /** Label in the desktop "On this page" nav. */
    toc: string;
    title: string;
    paragraphs: string[];
    /** Optional h3 / paragraph / step-list blocks rendered after the paragraphs. */
    blocks?: DocBlock[];
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
