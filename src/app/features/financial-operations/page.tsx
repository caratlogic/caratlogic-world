import type { Metadata } from "next";
import { Responsive } from "@/components/landing/Responsive";
import { FinancialOpsDesktop } from "@/components/pages/financial-operations/FinancialOpsDesktop";
import { FinancialOpsMobile } from "@/components/pages/financial-operations/FinancialOpsMobile";

export const metadata: Metadata = {
    title: "Financial Operations Software | Carat Logic",
    description: "Manage sales documents, memos, payments, customer balances, purchases and inventory expenses in connected workflows. Carat Logic helps diamond and gemstone teams follow transactions from quotation and stock movement through to payment and cost tracking.",
};

export default function Page() {
    return <Responsive desktop={<FinancialOpsDesktop />} mobile={<FinancialOpsMobile />} />;
}
