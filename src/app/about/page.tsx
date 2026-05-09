import Link from 'next/link';
import { ArrowLeft, BookOpen, FlaskConical, Search, ShieldCheck } from 'lucide-react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import { prisma } from '@/lib/prisma';


export default async function About() {
  const user = await prisma.user.findFirst();
  const ownerImage = user?.image || "/owner.jpeg";

  return (
    <div className="main">
      <Header />

      <section className="about-hero">
        <div className="container">
          <h1>Hi, I&apos;m Dr. Tina (Ph.D)</h1>
          <p>Advocate, researcher, and your guide to navigating a chemical-heavy world safely.</p>
        </div>
      </section>

      <main className="container about-main">
        <Link href="/" className="btn-ghost" style={{ marginBottom: '2rem', marginLeft: '-0.75rem' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <div className="about-content" style={{ marginBottom: '5rem' }}>
          <div className="about-image-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ownerImage} alt="Tina, founder of Go Toxin Free" />
          </div>
          
          <div className={"about-text-content"}>
            <h2>My Journey to Toxin-Free Living</h2>
            <p>
              A few years ago, I started experiencing unexplained allergies and fatigue. After countless doctor visits and personal research, I discovered the shocking truth: our daily environment—from our couches to our cleaning supplies—is filled with unregulated, synthetic chemicals.
            </p>
            <p>
              I decided to take control of my environment. I began reading ingredient labels, researching chemical impacts, and swapping out toxic products for natural, safe alternatives. The difference in my health was astounding.
            </p>
            <p>
              <strong>Go Toxin Free With Tina</strong> was born out of a desire to share this research with you. Navigating ingredient lists and scientific studies can be overwhelming. My goal is to simplify this process, providing you with clear, evidence-based insights so you can make informed decisions for yourself and your family.
            </p>
            <p>
              Together, we can create safer homes and advocate for a healthier planet.
            </p>
          </div>
        </div>

        {/* Methodology Section Merged */}
        <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--primary)', textAlign: 'center', marginBottom: '1rem' }}>My Research Methodology</h2>
          <p className={"about-intro-text"}>
            As a researcher, I know that navigating the world of &quot;green&quot; and &quot;natural&quot; products is filled with greenwashing. Marketing claims mean nothing without empirical evidence. My process is designed to cut through the noise and deliver actionable, scientifically sound advice for a toxin-free life.
          </p>

          <div className={"about-methodology-grid"}>
            <div className={"about-method-card"}>
              <div className={"about-method-icon"}>
                <BookOpen size={24} />
              </div>
              <h3>1. Scientific Literature Review</h3>
              <p>I rely on peer-reviewed studies published in reputable medical and environmental science journals (e.g., PubMed, The Lancet). I do not base conclusions on isolated, non-replicated studies or brand-sponsored research.</p>
            </div>

            <div className={"about-method-card"}>
              <div className={"about-method-icon"}>
                <Search size={24} />
              </div>
              <h3>2. Ingredient Deep-Dives</h3>
              <p>Every product recommended is subjected to a strict ingredient analysis. I cross-reference chemical compounds with databases like the EWG (Environmental Working Group) and the EPA&apos;s list of chemicals of concern.</p>
            </div>

            <div className={"about-method-card"}>
              <div className={"about-method-icon"}>
                <FlaskConical size={24} />
              </div>
              <h3>3. Independent Verification</h3>
              <p>I prioritize products and materials that hold respected third-party certifications, such as MADE SAFE®, GOTS (Global Organic Textile Standard), and OEKO-TEX®, ensuring objective safety standards are met.</p>
            </div>

            <div className={"about-method-card"}>
              <div className={"about-method-icon"}>
                <ShieldCheck size={24} />
              </div>
              <h3>4. Zero Brand Interference</h3>
              <p>My research is completely independent. I do not accept payment from brands to alter reviews or hide the presence of toxins. If a formulation changes, the review is updated immediately.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
