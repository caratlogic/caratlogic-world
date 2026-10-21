/** Guides from ProductGuidesPage.dc.html / ProductGuidesPageMobile.dc.html (no guide pages yet → href "#"). */
export type Guide = { t: string; e: string; d: string; r: string; img: string };

const IMG_A = "/design/4ab4f19bef96cbb04e1be7acf468e253.png";
const IMG_B = "/design/e5a1514f91ab1fcbfab688c2326f4ede.png";
const IMG_C = "/design/c6a0c46d2279b4f4a50c7f3c24e7654e.png";

export const GUIDES: Guide[] = [
    { t: "Getting Started with Carat Logic Inventory", e: "Set up your company, users and first stones in a few steps.", d: "Carat Logic Inventory", r: "6 min read", img: IMG_A },
    { t: "Adding and Importing Diamond Stock", e: "Add stones one by one or import your existing stock from a spreadsheet.", d: "Carat Logic Inventory", r: "5 min read", img: IMG_B },
    { t: "Setting Up Gem Inventory Fields", e: "Record species, origin, treatment and certificates for each gemstone.", d: "Carat Logic Inventory", r: "4 min read", img: IMG_C },
    { t: "Creating and Returning Memos", e: "Issue a memo to a client, track it and close it when stones come back.", d: "Carat Logic Inventory", r: "4 min read", img: IMG_A },
    { t: "Creating Orders and Invoices", e: "Turn a quotation into an order, then raise the invoice and record payment.", d: "Carat Logic Inventory", r: "5 min read", img: IMG_B },
    { t: "Managing Users, Roles and Permissions", e: "Invite your team and control what each person can see and change.", d: "Carat Logic Inventory", r: "3 min read", img: IMG_C },
    { t: "Building a Custom KYC Form", e: "Choose the fields and documents you need for customers and suppliers.", d: "Carat Logic KYC", r: "5 min read", img: IMG_A },
    { t: "Inviting a Business Contact to Complete KYC", e: "Send a KYC invitation and follow the submission through to review.", d: "Carat Logic KYC", r: "4 min read", img: IMG_B },
    { t: "Reviewing KYC Submissions and Setting Status", e: "Check details and documents, request more information and record the outcome.", d: "Carat Logic KYC", r: "4 min read", img: IMG_C },
];
