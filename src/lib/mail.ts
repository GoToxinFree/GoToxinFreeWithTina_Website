import { createTransport } from 'nodemailer';

const transport = createTransport(process.env.EMAIL_SERVER);

const siteUrl = process.env.AUTH_URL || 'https://gotoxinfreewithtina.com';
const senderName = 'Dr. Supriti Das | Go Toxin Free';
const senderEmail = process.env.EMAIL_FROM || 'drsupriti@gotoxinfreewithtina.com';

export async function sendWelcomeEmail(to: string) {
  const html = `
    <div style="display: none; max-height: 0px; overflow: hidden;">
      Welcome! I'm glad to have you with us on this journey to a cleaner, safer home.
    </div>
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #334155; line-height: 1.6;">
      <div style="padding: 20px 0; border-bottom: 2px solid #004e64; margin-bottom: 30px;">
        <h2 style="color: #004e64; margin: 0; font-size: 22px;">Welcome to Go Toxin Free</h2>
      </div>
      
      <p>Hi there,</p>
      
      <p>
        Thank you so much for joining my community! I’m Dr. Supriti Das, and I’m thrilled to have you here.
      </p>
      
      <p>
        You are now officially subscribed to <strong>Go Toxin Free With Tina</strong>. My goal is to share research-backed insights and practical guides to help you remove hidden toxins from your daily life.
      </p>
      
      <div style="background: #f8fafc; padding: 25px; border-radius: 12px; margin: 30px 0; border: 1px solid #e2e8f0;">
        <p style="margin-top: 0; font-weight: 600; color: #004e64;">What to expect:</p>
        <ul style="padding-left: 20px;">
          <li>In-depth research on household product safety.</li>
          <li>Actionable tips for a cleaner environment.</li>
          <li>Early access to my latest blog posts and guides.</li>
        </ul>
      </div>

      <p>
        I recommend starting with some of our most read articles on the blog:
      </p>

      <div style="text-align: center; margin: 40px 0;">
        <a href="${siteUrl}/blog" style="background: #004e64; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
          Explore the Blog
        </a>
      </div>

      <p style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        Best regards,<br />
        <strong>Dr. Supriti Das (Ph.D.)</strong><br />
        <span style="color: #64748b; font-size: 14px;">Go Toxin Free With Tina</span>
      </p>
      
      <div style="margin-top: 50px; text-align: center; font-size: 12px; color: #94a3b8;">
        <p>Go Toxin Free With Tina | Research & Advocacy</p>
        <p>
          You received this email because you subscribed at <a href="${siteUrl}" style="color: #94a3b8;">gotoxinfreewithtina.com</a>.
          <br />
          <a href="${siteUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(to)}" style="color: #94a3b8; text-decoration: underline;">Unsubscribe</a>
        </p>
      </div>
    </div>
  `;

  return transport.sendMail({
    from: `"${senderName}" <${senderEmail}>`,
    to,
    subject: 'Welcome to the Go Toxin Free community!',
    html,
  });
}

export async function sendNewPostNotification(to: string[], post: { title: string, excerpt?: string | null, slug: string, imageUrl?: string | null }) {
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  
  const html = `
    <div style="display: none; max-height: 0px; overflow: hidden;">
      ${post.excerpt || 'New research update from Dr. Supriti Das.'}
    </div>
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #334155; line-height: 1.6;">
      <div style="padding: 20px 0; border-bottom: 2px solid #004e64; margin-bottom: 30px;">
        <h2 style="color: #004e64; margin: 0; font-size: 20px;">New Research Update</h2>
      </div>

      <p>Hello,</p>
      
      <p>
        I have just published a new article that I believe will be helpful for your journey toward a safer, toxin-free home:
      </p>

      <div style="margin: 30px 0; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: white;">
        ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}" style="width: 100%; max-height: 300px; object-fit: cover;" />` : ''}
        <div style="padding: 25px;">
          <h3 style="margin-top: 0; color: #004e64; font-size: 20px;">${post.title}</h3>
          <p style="color: #475569; font-size: 15px;">
            ${post.excerpt || 'Dive into my latest research findings and learn actionable steps for a cleaner lifestyle.'}
          </p>
          <div style="margin-top: 25px;">
            <a href="${postUrl}" style="background: #004e64; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
              Read Full Article
            </a>
          </div>
        </div>
      </div>

      <p>
        I hope you find this research useful. As always, feel free to leave your thoughts or questions in the comments section of the post.
      </p>

      <p style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        Stay safe,<br />
        <strong>Dr. Supriti Das</strong>
      </p>

      <div style="margin-top: 50px; text-align: center; font-size: 12px; color: #94a3b8;">
        <p>
          You are receiving this update because you subscribed to Go Toxin Free With Tina.
          <br />
          <a href="${siteUrl}/api/newsletter/unsubscribe?email={{EMAIL}}" style="color: #94a3b8; text-decoration: underline;">Unsubscribe</a>
        </p>
      </div>
    </div>
  `;

  const results = [];
  console.log(`[Mail] Starting notification broadcast for post: ${post.title} to ${to.length} subscribers.`);

  for (const email of to) {
    try {
      const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
      
      let finalImageUrl = post.imageUrl;
      if (finalImageUrl && !finalImageUrl.startsWith('http')) {
        finalImageUrl = `${siteUrl}${finalImageUrl.startsWith('/') ? '' : '/'}${finalImageUrl}`;
      }

      const personalHtml = html
        .replace('{{EMAIL}}', encodeURIComponent(email))
        .replace(post.imageUrl || '___IMG___', finalImageUrl || '___IMG___');

      await transport.sendMail({
        from: `"${senderName}" <${senderEmail}>`,
        to: email,
        subject: `Update: ${post.title}`,
        html: personalHtml,
        headers: {
          'List-Unsubscribe': `<${unsubscribeUrl}>`,
          'X-Auto-Response-Suppress': 'OOF, AutoReply'
        }
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
    <div style="display: none; max-height: 0px; overflow: hidden;">
      Your latest toxin-free living research summary is here.
    </div>
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #334155; line-height: 1.6;">
      <div style="padding: 20px 0; border-bottom: 2px solid #004e64; margin-bottom: 30px;">
        <h2 style="color: #004e64; margin: 0; font-size: 20px;">Research Summary</h2>
      </div>

      <p>Hello,</p>
      <p>Here is a summary of our most recent articles to help you stay informed on environmental health and safe living:</p>
      
      <div style="margin: 30px 0;">
        ${posts.map(post => `
          <div style="margin-bottom: 25px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px; background: #fcfcfc;">
            <h3 style="color: #004e64; margin-top: 0; font-size: 18px;">${post.title}</h3>
            <p style="font-size: 14px; color: #475569; margin-bottom: 15px;">${post.excerpt || 'Latest research update.'}</p>
            <a href="${siteUrl}/blog/${post.slug}" style="color: #004e64; font-weight: bold; text-decoration: underline; font-size: 14px;">Read the Full Guide &rarr;</a>
          </div>
        `).join('')}
      </div>

      <p>I hope these guides provide valuable insights for your home. As always, thank you for being part of this community.</p>

      <p style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        Warmly,<br />
        <strong>Dr. Supriti Das</strong>
      </p>

      <div style="margin-top: 50px; text-align: center; font-size: 12px; color: #94a3b8;">
        <p>
          Sent from Go Toxin Free With Tina.
          <br />
          <a href="${siteUrl}/api/newsletter/unsubscribe?email={{EMAIL}}" style="color: #94a3b8; text-decoration: underline;">Unsubscribe</a>
        </p>
      </div>
    </div>
  `;

  const results = [];
  for (const email of to) {
    try {
      const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;

      await transport.sendMail({
        from: `"${senderName}" <${senderEmail}>`,
        to: email,
        subject: 'Your Toxin-Free Living Summary',
        html: html.replace('{{EMAIL}}', encodeURIComponent(email)),
        headers: {
          'List-Unsubscribe': `<${unsubscribeUrl}>`,
          'X-Auto-Response-Suppress': 'OOF, AutoReply'
        }
      });
      results.push({ email, success: true });
    } catch (error) {
      results.push({ email, success: false });
    }
  }
  return results;
}
