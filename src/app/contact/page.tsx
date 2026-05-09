"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import { sendContactEmail } from '@/app/actions/contact';
import { useActionState } from 'react';

export default function Contact() {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: unknown, formData: FormData) => {
      try {
        const result = await sendContactEmail(formData);
        return result;
      } catch {
        return { success: false, error: 'Failed to connect to the server. Please try again later.' };
      }
    },
    { success: false, error: '' }
  );

  return (
    <div className="main">
      <Header />

      {/* Toast Notification */}
      {state.success && (
        <div className="contact-toast" style={{ backgroundColor: '#10b981' }}>
          <CheckCircle size={20} />
          <span>Message sent successfully! I&apos;ll get back to you soon.</span>
        </div>
      )}

      {state.error && (
        <div className="contact-toast" style={{ backgroundColor: '#ef4444' }}>
          <AlertCircle size={20} />
          <span>{state.error}</span>
        </div>
      )}

      <section className="contact-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>Have questions about a product, or want to collaborate on research? I&apos;d love to hear from you.</p>
        </div>
      </section>

      <main className="container contact-main">
        <Link href="/" className="btn-ghost" style={{ marginBottom: '2rem', marginLeft: '-0.75rem' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="contact-layout">
          <div className="contact-info">
            <h2>Let&apos;s Connect</h2>
            <p>
              Navigating a toxin-free life is a community effort. Whether you&apos;re an individual looking for advice, a brand seeking rigorous testing, or a fellow researcher, please reach out.
            </p>

            <div className="contact-info-item">
              <Mail className="contact-info-icon" size={24} />
              <span>drsupriti@gotoxinfreewithtina.com</span>
            </div>
            <div className="contact-info-item">
              <Phone className="contact-info-icon" size={24} />
              <span>+81 80-6429-7228</span>
            </div>
            <div className="contact-info-item">
              <MapPin className="contact-info-icon" size={24} />
              <span>1-1-6-1406 UR Oyata , Adachi-ku, Tokyo, Japan, 120-0001</span>
            </div>
            <div className="contact-info-item" style={{ marginTop: '1rem' }}>
              <a href="https://jp.linkedin.com/in/supritidas" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'inherit', textDecoration: 'none' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-info-icon"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>

          <div className="contact-form">
            <form action={formAction}>
              <div className="contact-form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  placeholder="Your Name" 
                  required 
                  disabled={isPending}
                />
              </div>
              <div className="contact-form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  placeholder="your@email.com" 
                  required 
                  disabled={isPending}
                />
              </div>
              <div className="contact-form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows={5} 
                  placeholder="How can I help you?" 
                  required 
                  disabled={isPending}
                ></textarea>
              </div>
              <button 
                type="submit" 
                className={`btn-primary contact-submit-btn`}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Sending...
                  </>
                ) : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
