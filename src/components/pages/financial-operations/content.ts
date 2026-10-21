import type { FeatureDocContent } from "../feature-doc/types";

export const financialOpsContent: FeatureDocContent = {
    key: "fin",
    title: "Financial Operations Software for Diamond and Gem Businesses",
    intro: "Manage sales documents, memos, payments, customer balances, purchases and inventory expenses in connected workflows. Carat Logic helps diamond and gemstone teams follow transactions from quotation and stock movement through to payment and cost tracking.",
    sections: [
        {
            id: "sales",
            toc: "Sales transactions and documents",
            title: "Manage sales transactions and documents",
            paragraphs: [
                "Create quotations, proforma invoices, sales invoices and credit notes for diamond and gemstone transactions. Add stock items, discounts, terms and tax calculations, then generate branded PDFs with your business details.",
                "Customers can also view and download invoices through an online link. When a quotation is accepted, convert it into a memo or invoice without entering the transaction details again.",
            ],
        },
        {
            id: "memos",
            toc: "Memo Out and Memo In",
            title: "Track goods sent to and received from customers",
            paragraphs: [
                "Use Memo Out when a customer or broker wants to inspect goods before buying. Record the memo, track which stones are still out and process partial returns. When the buyer approves the remaining goods, convert them into an invoice.",
                "Memo In helps track goods received from suppliers on approval. Record return deadlines, send goods back or convert accepted items into a purchase. This keeps supplier goods and customer goods on memo visible as separate parts of the trading workflow.",
            ],
        },
        {
            id: "payments",
            toc: "Payments and allocation",
            title: "Record payments and allocate them to invoices",
            paragraphs: [
                "Record incoming customer payments and outgoing supplier payments, including bank transfers, cash, cards, cheques and other payment methods. If one customer payment covers several invoices, allocate it across the relevant outstanding balances.",
                "Generate branded payment receipts and keep the allocation connected to the invoices it settles. This gives sales and accounts teams a clearer view of what has been paid and what remains due.",
            ],
        },
        {
            id: "wallets",
            toc: "Customer wallets",
            title: "Manage customer deposits and wallet balances",
            paragraphs: [
                "Customer wallets keep deposits, credits and refunds associated with a customer account. Apply available wallet balances to invoices, and review the debit and credit history when checking how the balance changed.",
            ],
            callout: "For example, a customer deposit can be recorded before an order is finalised, then applied to the invoice when the sale is completed.",
        },
        {
            id: "purchases",
            toc: "Purchase management",
            title: "Connect purchases with incoming inventory",
            paragraphs: [
                "Create purchase orders for diamonds, gemstones or rough parcels. When the goods are received, create their inventory records from the purchase rather than entering the stock details again.",
                "Include landed costs such as customs, freight and insurance in the purchase cost. This gives the business a fuller cost basis for the goods it has acquired.",
            ],
        },
        {
            id: "expenses",
            toc: "Expense management",
            title: "Allocate expenses to stones and parcels",
            paragraphs: [
                "Assign direct expenses to the relevant stone or parcel, including certification, recutting or polishing, and shipping costs. Carat Logic adds these costs to the item’s cost basis, helping the team review its investment and calculate gross profit when the item is sold.",
            ],
        },
    ],
    example: { toc: "Example workflow", title: "From buyer enquiry to payment", text: "A buyer asks for a selection of stones, so the sales team prepares a quotation. The buyer requests some items on memo and returns the stones they do not want. The approved items are converted into an invoice, and the buyer’s payment is recorded against it. If the payment covers more than one invoice, the team can allocate it across those balances." },
    faq: [
        ["What financial operations can Carat Logic manage?", "Carat Logic supports quotations, invoices, credit notes, memos, payment recording, customer wallets, purchase orders and item expense allocation for diamond and gemstone businesses."],
        ["Can Carat Logic create invoices and credit notes?", "Yes. Teams can create sales invoices and credit notes, generate branded PDFs and provide customers with an online invoice link."],
        ["Can I track goods sent to customers and goods received from suppliers on memo?", "Yes. Memo Out tracks goods sent to customers or brokers, while Memo In tracks goods received from suppliers on approval. Both workflows support returns and follow-up actions."],
        ["Can one payment be allocated across several invoices?", "Yes. A customer payment can be split across multiple outstanding invoices and recorded against the balances it settles."],
        ["Can purchase and expense costs be linked to inventory?", "Yes. Received purchases can create inventory records, and costs such as freight, certification, polishing or shipping can be assigned to a stone or parcel."],
    ],
};
