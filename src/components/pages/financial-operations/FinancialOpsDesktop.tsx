"use client";

import { FeatureDocDesktop } from "../feature-doc/FeatureDocDesktop";
import { financialOpsContent } from "./content";

export function FinancialOpsDesktop() {
    return <FeatureDocDesktop content={financialOpsContent} />;
}
