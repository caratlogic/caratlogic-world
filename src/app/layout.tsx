import type { Metadata } from "next";
import {
    Geist,
    Geist_Mono,
    Plus_Jakarta_Sans,
    Figtree,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layouts/Header";

// Removed figtree

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
    variable: "--font-sans",
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
    title: "CaratLogic | Diamond ERP & Inventory Software for the Trade ",
    description:
        "Cloud-based diamond ERP software for wholesalers, jewelry manufacturers & gemstone traders. Manage inventory, memos, sales & WhatsApp — all in one platform.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn("font-sans scroll-smooth", plusJakartaSans.variable)}
        >
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} antialiased`}
            >
                <Header />
                {children}
            </body>
        </html>
    );
}
