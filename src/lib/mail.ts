import { createTransport } from 'nodemailer';

const transport = createTransport(process.env.EMAIL_SERVER);

const siteUrl = process.env.AUTH_URL || 'https://gotoxinfreewithtina.com';

export async function sendWelcomeEmail(to: string) {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
      <div style="background: #004e64; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Welcome to Go Toxin Free!</h1>
      </div>
      <div style="padding: 40px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; line-height: 1.6;">Hi there,</p>
        <p style="font-size: 16px; line-height: 1.6;">
          Thank you for joining our community! You are now subscribed to <strong>Go Toxin Free With Tina</strong>.
        </p>
        <p style="font-size: 16px; line-height: 1.6;">
          You'll be the first to receive my latest research findings, product safety guides, and actionable steps to create a cleaner, safer home for your family.
        </p>
        <div style="margin: 30px 0; text-align: center;">
          <a href="${siteUrl}/blog" style="background: #00a6ce; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
            Explore the Articles
          </a>
        </div>
        <p style="font-size: 14px; color: #64748b; margin-top: 40px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
          Best regards,<br />
          <strong>Dr. Supriti Das (Ph.D.)</strong><br />
          Go Toxin Free With Tina
        </p>
      </div>
    </div>
  `;

  return transport.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Welcome to Go Toxin Free With Tina!',
    html,
  });
}

export async function sendNewPostNotification(to: string[], post: { title: string, excerpt?: string | null, slug: string, imageUrl?: string | null }) {
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
      <div style="background: #004e64; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">New Research Published</h1>
      </div>
      <div style="padding: 40px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
        ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}" style="width: 100%; border-radius: 8px; margin-bottom: 20px;" />` : ''}
        <h2 style="color: #004e64; margin-top: 0;">${post.title}</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #475569;">
          ${post.excerpt || 'A new article has been published on Go Toxin Free. Dive into the latest research and learn how to protect your home.'}
        </p>
        <div style="margin: 30px 0;">
          <a href="${postUrl}" style="background: #00a6ce; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
            Read the Full Article
          </a>
        </div>
        <p style="font-size: 12px; color: #94a3b8; margin-top: 40px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
          You are receiving this because you subscribed to Go Toxin Free With Tina. <br/>
          <a href="${siteUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent('{{EMAIL}}')}" style="color: #94a3b8;">Unsubscribe</a>
        </p>
      </div>
    </div>
  `;

  const results = [];
  console.log(`[Mail] Starting notification broadcast for post: ${post.title} to ${to.length} subscribers.`);

  for (const email of to) {
    try {
      // Ensure image URL is absolute if it exists
      let finalImageUrl = post.imageUrl;
      if (finalImageUrl && !finalImageUrl.startsWith('http')) {
        finalImageUrl = `${siteUrl}${finalImageUrl.startsWith('/') ? '' : '/'}${finalImageUrl}`;
      }

      const personalHtml = html
        .replace('{{EMAIL}}', encodeURIComponent(email))
        .replace(post.imageUrl || '', finalImageUrl || '');

      await transport.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `New Research: ${post.title}`,
        html: personalHtml,
      });
      console.log(`[Mail] Successfully sent to ${email}`);
      results.push({ email, success: true });
    } catch (error: any) {
      console.error(`[Mail] Failed to send to ${email}:`, error.message);
      results.push({ email, success: false });
    }
  }
  return results;
}

export async function sendNewsletterSummary(to: string[], posts: { title: string, excerpt?: string | null, slug: string }[]) {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
      <div style="background: #004e64; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Your Research Summary</h1>
      </div>
      <div style="padding: 40px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; line-height: 1.6;">Hello,</p>
        <p style="font-size: 16px; line-height: 1.6;">
          Here is a summary of the latest research and guides from <strong>Go Toxin Free With Tina</strong> to help you stay informed.
        </p>
        
        <div style="margin: 30px 0;">
          ${posts.map(post => `
            <div style="margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px solid #f1f5f9;">
              <h3 style="color: #004e64; margin-bottom: 5px;">${post.title}</h3>
              <p style="font-size: 14px; color: #475569; margin-top: 0;">${post.excerpt || 'Latest research update.'}</p>
              <a href="${siteUrl}/blog/${post.slug}" style="color: #00a6ce; font-weight: bold; text-decoration: none; font-size: 14px;">Read More &rarr;</a>
            </div>
          `).join('')}
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="${siteUrl}/blog" style="background: #00a6ce; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
            Visit the Blog
          </a>
        </div>

        <p style="font-size: 12px; color: #94a3b8; margin-top: 40px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
          You are receiving this because you subscribed to Go Toxin Free With Tina. <br/>
          <a href="${siteUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent('{{EMAIL}}')}" style="color: #94a3b8;">Unsubscribe</a>
        </p>
      </div>
    </div>
  `;

  const results = [];
  for (const email of to) {
    try {
      await transport.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Research Summary: Toxin-Free Living Updates',
        html: html.replace('{{EMAIL}}', email),
      });
      results.push({ email, success: true });
    } catch (error) {
      results.push({ email, success: false });
    }
  }
  return results;
}
