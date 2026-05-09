"use server";

import nodemailer from "nodemailer";

export async function sendContactEmail(formData: { name: string; email: string; message: string }) {
  try {
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      throw new Error('Name, email, and message are required');
    }

    // Reuse the existing EMAIL_SERVER connection string
    const transport = nodemailer.createTransport(process.env.EMAIL_SERVER);

    const adminEmail = process.env.ADMIN_EMAIL || "drsupriti@gotoxinfreewithtina.com";

    const mailOptions = {
      from: process.env.EMAIL_FROM || `"GoToxinFree Contact" <${adminEmail}>`,
      to: adminEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #004e64;">New Contact Query</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; border-left: 4px solid #004e64;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #999;">Sent from GoToxinFree Contact Form (via Server Action)</p>
        </div>
      `,
    };

    await transport.sendMail(mailOptions);

    return { success: true };
  } catch (error: any) {
    console.error('Contact Action Error:', error);
    return { success: false, error: error.message || 'Failed to send message' };
  }
}
