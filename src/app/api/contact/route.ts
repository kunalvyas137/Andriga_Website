import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const { name, email, company, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email and message are required." },
                { status: 400 }
            );
        }

        const { error } = await resend.emails.send({
            from: "Andriga Contact Form <contact@andriga.com>",
            to: ["contact@andriga.com"],
            replyTo: email,
            subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
                    <h2 style="color: #7c3aed; margin-bottom: 24px;">New Contact Form Submission</h2>

                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; width: 120px; vertical-align: top;"><strong>Name</strong></td>
                            <td style="padding: 8px 0;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; vertical-align: top;"><strong>Email</strong></td>
                            <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
                        </tr>
                        ${company ? `
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; vertical-align: top;"><strong>Company</strong></td>
                            <td style="padding: 8px 0;">${company}</td>
                        </tr>` : ""}
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; vertical-align: top;"><strong>Message</strong></td>
                            <td style="padding: 8px 0; white-space: pre-line;">${message}</td>
                        </tr>
                    </table>

                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
                    <p style="color: #9ca3af; font-size: 12px;">
                        Sent via the contact form at andriga.com.<br/>
                        Reply directly to this email to respond to ${name}.
                    </p>
                </div>
            `,
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Contact API error:", err);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
