import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Accepts both the legacy contact form payload
 *   { name, email, company, phone, inquiryType, message }
 * and the new Contact page payloads:
 *   demo:  { type: "demo",  name, email, company, phone, inquiryType: "Demo request", interests[], businessType, teamSize, message? }
 *   query: { type: "query", name, email, company, phone, inquiryType: "Query: <topic>", topic, message }
 */

const MAX_LEN = 5000;
const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/;

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

/** Coerce an unknown JSON value to a trimmed, length-capped string. */
function str(value: unknown): string {
    if (typeof value !== "string") return "";
    return value.trim().slice(0, MAX_LEN);
}

/** Single-line plain text for mail headers: strips control chars (CR/LF header injection) and angle brackets. */
function headerText(value: string): string {
    return value.replace(/[\u0000-\u001f\u007f<>]+/g, " ").replace(/\s+/g, " ").trim().slice(0, 200);
}

const td = "padding: 12px 0; border-bottom: 1px solid #f1f5f9;";
const labelTd = `${td} color: #64748b; font-size: 14px; width: 140px;`;
const valueTd = `${td} color: #111827; font-weight: 600; font-size: 14px;`;

function row(label: string, value: string): string {
    if (!value) return "";
    return `<tr>
                            <td style="${labelTd}">${escapeHtml(label)}</td>
                            <td style="${valueTd}">${escapeHtml(value)}</td>
                        </tr>`;
}

export async function POST(request: NextRequest) {
    let body: Record<string, unknown>;
    try {
        const parsed: unknown = await request.json();
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("bad body");
        body = parsed as Record<string, unknown>;
    } catch {
        return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const name = str(body.name);
    const email = str(body.email);
    const company = str(body.company);
    const phone = str(body.phone);
    const message = str(body.message);
    const topic = str(body.topic);
    const businessType = str(body.businessType);
    const teamSize = str(body.teamSize);
    const interests = Array.isArray(body.interests) ? body.interests.map(str).filter(Boolean).slice(0, 10).join(", ") : str(body.interests);
    const isDemo = body.type === "demo";
    const inquiryType = str(body.inquiryType) || (isDemo ? "Demo request" : topic ? `Query: ${topic}` : "");

    if (!name || !email) {
        return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
        return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    // message is optional for demo requests; required for queries and the legacy form
    if (!isDemo && !message) {
        return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const safeEmail = escapeHtml(email);
        const htmlBody = `
            <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #111827; padding: 32px; border-radius: 16px 16px 0 0;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 22px;">${isDemo ? "New Demo Request" : "New Contact Form Submission"}</h1>
                </div>
                <div style="background: #ffffff; padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 16px 16px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        ${row("Name", name)}
                        <tr>
                            <td style="${labelTd}">Email</td>
                            <td style="${valueTd}">
                                <a href="mailto:${safeEmail}" style="color: #2E7D32; text-decoration: none;">${safeEmail}</a>
                            </td>
                        </tr>
                        ${row("Company", company)}
                        ${row("Phone", phone)}
                        ${inquiryType ? `<tr>
                            <td style="${labelTd}">Inquiry Type</td>
                            <td style="${td}">
                                <span style="background: #e8f5e9; color: #2E7D32; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600;">${escapeHtml(inquiryType)}</span>
                            </td>
                        </tr>` : ""}
                        ${row("Interested in", interests)}
                        ${row("Business type", businessType)}
                        ${row("Team size", teamSize)}
                        ${isDemo ? "" : row("Topic", topic)}
                    </table>
                    ${message ? `<div style="margin-top: 24px; padding: 20px; background: #f8fafc; border-radius: 12px;">
                        <p style="color: #64748b; font-size: 13px; margin: 0 0 8px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">${isDemo ? "What they’d like to see" : "Message"}</p>
                        <p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
                    </div>` : ""}
                </div>
            </div>
        `;

        await transporter.sendMail({
            from: `"Carat Logic Website" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL_TO,
            replyTo: email,
            subject: headerText(`${inquiryType || "Contact Form"} — ${name}`),
            html: htmlBody,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to send message. Please try again later." },
            { status: 500 }
        );
    }
}
