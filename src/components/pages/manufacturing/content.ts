import type { FeatureDocContent } from "../feature-doc/types";

export const manufacturingContent: FeatureDocContent = {
    key: "mfg",
    title: "Track Diamond and Gemstone Manufacturing from Rough to Polished",
    intro: "Manage each production lot from rough intake through processing, quality checks and certification. Carat Logic helps diamond and gemstone teams follow work in progress, monitor yield and move completed stones into inventory.",
    sections: [
        {
            id: "overview",
            toc: "Manufacturing, all in one view",
            title: "Manufacturing, all in one view",
            paragraphs: [
                "See active lots, carats in the pipeline, recorded carat loss and lots ready for inventory from one dashboard. Search by rough number, supplier or origin, then filter by stage to find the work your team needs to review.",
                "Custom fields let you capture the lot information that matters to your workflow. Keep rough details and production updates together as each lot moves through the process.",
            ],
        },
        {
            id: "lots",
            toc: "Follow each lot",
            title: "Follow each lot from rough to polished",
            paragraphs: [
                "Track the manufacturing journey through rough intake, sorting, preforming or sawing, cutting, treatment, polishing, grading and quality checks, certification, and finished inventory.",
                "Record the people, contractors or machines involved at each stage, along with turnaround time, processing costs and relevant production notes. This gives your team a clearer view of where each lot stands and what work remains.",
            ],
        },
        {
            id: "yield",
            toc: "Yield, loss and costs",
            title: "Understand yield, loss and production costs",
            paragraphs: [
                "Compare rough input with polished output to understand yield and weight loss across a lot. Keep processing costs with the production record so teams can review the costs associated with finished stones and maintain landed production cost information when goods are ready for inventory.",
            ],
        },
        {
            id: "workflows",
            toc: "Diamond and gemstone workflows",
            title: "Manage diamond and gemstone workflows",
            paragraphs: [
                "Use Carat Logic to track both diamond and gemstone manufacturing. Capture details relevant to each type of rough and its processing path, while keeping lot progress organized in a consistent workflow.",
            ],
        },
        {
            id: "finished",
            toc: "Finished stones to inventory",
            title: "Move finished stones into inventory",
            paragraphs: [
                "When production is complete, move the resulting stones into active diamond or gemstone inventory with their production details and costs. This helps connect manufacturing records with the stock teams manage next.",
            ],
        },
    ],
    example: { toc: "Example", title: "From rough parcel to finished stock", text: "A team receives a rough gemstone parcel and records its carat weight, piece count, origin and purchase details. As the parcel is sorted, cut, polished and checked, the team updates its stage and production information. Once the stones are ready, the team can review the output and recorded loss, complete certification details where needed, and move the finished stones into gemstone inventory." },
    faq: [
        ["What is rough-to-polished manufacturing tracking?", "Rough-to-polished tracking follows a diamond or gemstone lot from its initial intake through production stages and quality checks to finished inventory. It helps teams see lot progress, production details and output in one workflow."],
        ["Which manufacturing stages can Carat Logic track?", "Carat Logic can track rough intake, sorting, preforming or sawing, cutting, treatment, polishing, grading and quality checks, certification, and finished inventory."],
        ["Can I track diamond and gemstone manufacturing?", "Yes. Carat Logic supports manufacturing workflows for both diamonds and gemstones, with fields teams can use to record relevant lot and production details."],
        ["How can I monitor yield and carat loss?", "Record rough input and polished output for a lot to review its yield and weight loss. Carat Logic also shows total carat loss and carats in the pipeline on the manufacturing dashboard."],
        ["Can completed stones move into inventory?", "Yes. Completed stones can be moved into active diamond or gemstone inventory with their production details and landed production cost information."],
    ],
};
