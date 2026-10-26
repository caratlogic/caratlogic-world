import type { ReactNode } from "react";

/*
 * Minimal Markdown renderer for the blog posts (no dependency). Supports exactly what the posts use:
 *   ## / ### headings, paragraphs, "- " bullet lists, "1. " numbered lists, **bold**, *italic*, [text](url).
 * Anything else renders as plain paragraph text.
 */

export type MdHeading = { id: string; text: string; level: 2 | 3 };

export type MdBlock =
    | { type: "h2" | "h3"; id: string; text: string }
    | { type: "p"; text: string }
    | { type: "ul" | "ol"; items: string[] };

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[’']/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/** Strip inline markers, e.g. for heading anchors and the table of contents. */
export function plainText(md: string): string {
    return md.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/\*\*|\*/g, "");
}

export function parseMarkdown(src: string): MdBlock[] {
    const blocks: MdBlock[] = [];
    const used = new Map<string, number>();
    const uniqueId = (text: string) => {
        const base = slugify(plainText(text)) || "section";
        const n = used.get(base) ?? 0;
        used.set(base, n + 1);
        return n ? `${base}-${n + 1}` : base;
    };

    let para: string[] = [];
    let list: { type: "ul" | "ol"; items: string[] } | null = null;
    const flushPara = () => {
        if (para.length) blocks.push({ type: "p", text: para.join(" ") });
        para = [];
    };
    const flushList = () => {
        if (list) blocks.push(list);
        list = null;
    };

    for (const raw of src.split(/\r?\n/)) {
        const line = raw.trim();
        if (!line) {
            flushPara();
            flushList();
            continue;
        }
        const h = /^(#{2,3})\s+(.*)$/.exec(line);
        if (h) {
            flushPara();
            flushList();
            const text = h[2].trim();
            blocks.push({ type: h[1].length === 2 ? "h2" : "h3", id: uniqueId(text), text });
            continue;
        }
        const ul = /^[-*+]\s+(.*)$/.exec(line);
        const ol = /^\d+\.\s+(.*)$/.exec(line);
        if (ul || ol) {
            flushPara();
            const type = ul ? "ul" : "ol";
            if (!list || list.type !== type) {
                flushList();
                list = { type, items: [] };
            }
            list.items.push((ul ?? ol)![1].trim());
            continue;
        }
        if (list) {
            // continuation line of the previous list item
            list.items[list.items.length - 1] += ` ${line}`;
            continue;
        }
        para.push(line);
    }
    flushPara();
    flushList();
    return blocks;
}

export function headingsOf(blocks: MdBlock[]): MdHeading[] {
    return blocks.flatMap((b) => (b.type === "h2" || b.type === "h3" ? [{ id: b.id, text: plainText(b.text), level: b.type === "h2" ? 2 : 3 } as MdHeading] : []));
}

/** Inline formatting: [text](url), **bold**, *italic*. External links open in a new tab. */
export function renderInline(text: string, linkClass?: string): ReactNode[] {
    const out: ReactNode[] = [];
    const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
    let last = 0;
    let m: RegExpExecArray | null;
    let k = 0;
    while ((m = re.exec(text))) {
        if (m.index > last) out.push(text.slice(last, m.index));
        if (m[1] !== undefined) {
            const href = m[2];
            const external = /^https?:\/\//.test(href);
            out.push(
                <a key={k++} href={href} className={linkClass} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {renderInline(m[1], linkClass)}
                </a>,
            );
        } else if (m[3] !== undefined) {
            out.push(<strong key={k++}>{renderInline(m[3], linkClass)}</strong>);
        } else {
            out.push(<em key={k++}>{m[4]}</em>);
        }
        last = re.lastIndex;
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
}
