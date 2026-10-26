import type { FeatureDocContent } from "@/components/pages/feature-doc/types";

/** Integration pages share the feature-doc artboard; they add the page's <title> from the design. */
export type IntegrationContent = FeatureDocContent & {
    /** `<title>` from the artboard, used for route metadata. */
    metaTitle: string;
};
