import type { CSSProperties } from "react";
import type { Client } from "./clients";

const SIZES = {
    lg: { tile: 56, radius: 14, font: 22, gap: 14 },
    md: { tile: 44, radius: 12, font: 18, gap: 12 },
    sm: { tile: 38, radius: 10, font: 16, gap: 10 },
} as const;

/**
 * One client in a "Trusted by" marquee: square logo tile + name, linking to the client's site.
 * `hidden` copies (the marquee's duplicated loop) are removed from the tab order and accessibility tree.
 */
export function ClientChip({ client, size = "lg", hidden = false, className = "cl-logo", style }: { client: Client; size?: keyof typeof SIZES; hidden?: boolean; className?: string; style?: CSSProperties }) {
    const s = SIZES[size];
    return (
        <a
            href={client.website}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            aria-hidden={hidden || undefined}
            tabIndex={hidden ? -1 : undefined}
            title={client.name}
            style={{ display: "flex", alignItems: "center", gap: s.gap, color: "#2b302e", textDecoration: "none", flex: "none", ...style }}
        >
            <span
                style={{
                    flex: "none",
                    width: s.tile,
                    height: s.tile,
                    borderRadius: s.radius,
                    overflow: "hidden",
                    background: client.darkLogo ? "#0c0f1e" : "#ffffff",
                    border: client.darkLogo ? "1px solid transparent" : "1px solid #e6e9e8",
                    boxShadow: "0 4px 12px rgba(16,24,20,0.06)",
                    boxSizing: "border-box",
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={client.logo} alt={hidden ? "" : `${client.name} logo`} width={s.tile} height={s.tile} decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
            </span>
            <span style={{ fontSize: s.font, fontWeight: 700, letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>{client.name}</span>
        </a>
    );
}
