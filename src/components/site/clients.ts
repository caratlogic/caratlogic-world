/**
 * Client list shown in the "Trusted by" logo marquees (home and pricing, desktop and mobile).
 * Source: caratlogic-clients.xlsx. Logos are trimmed, squared 192px WebP copies of the sheet's
 * logo URLs, stored in public/clients/. Add a client here and every marquee picks it up.
 */
export type Client = {
    name: string;
    website: string;
    logo: string;
    /** Logo artwork sits on a dark background (tile keeps it; no white frame). */
    darkLogo?: boolean;
};

export const CLIENTS: Client[] = [
    { name: "Flinstone Diamonds", website: "https://flinstonediamonds.com/", logo: "/clients/flinstone-diamonds.webp", darkLogo: true },
    { name: "M&M Gems", website: "https://www.mmgems.com/", logo: "/clients/mm-gems.webp" },
    { name: "Shapiro Gems", website: "https://www.shapirogems.com/", logo: "/clients/shapiro-gems.webp" },
    { name: "Gem World", website: "https://www.gem-world.net/", logo: "/clients/gem-world.webp" },
    { name: "Dalila Diamonds", website: "https://www.daliladiamonds.com/", logo: "/clients/dalila-diamonds.webp", darkLogo: true },
    { name: "Infinity Gems", website: "https://infinitygems.be/", logo: "/clients/infinity-gems.webp" },
    { name: "Antwerp Gems", website: "https://antwerpgems.com/", logo: "/clients/antwerp-gems.webp" },
    { name: "Napra Gems", website: "https://napragems.com/", logo: "/clients/napra-gems.webp" },
    { name: "PMM Trading", website: "https://www.pmmtradinginc.com/", logo: "/clients/pmm-trading.webp" },
];
