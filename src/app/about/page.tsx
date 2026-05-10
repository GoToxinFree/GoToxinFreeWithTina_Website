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
          <h1>Hi, I&apos;m Dr. Supriti Das (Ph.D.)</h1>
          <p>Global Environmental Researcher & Advocate for Toxin-Free Living</p>
        </div>
      </section>

      <main className="container about-main">
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
        
        <div className="about-content" style={{ marginBottom: '5rem' }}>
          <div className="about-image-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ownerImage} alt="Dr. Supriti Das, founder of Go Toxin Free" />
          </div>
          
          <div className={"about-text-content"}>
            <h2>Bridging Science and Safety</h2>
            <p>
              I am <strong>Dr. Supriti Das (Ph.D.)</strong>, a global environmental researcher dedicated to decoding the complex relationship between our environment and human health. Over the years, my work has spanned elite academic institutions and international research programs, focusing on assessing environmental risks and building a safer, more resilient world.
            </p>
            <p>
              My journey into environmental advocacy began during my doctoral research at the <strong>Indian Institute of Technology (IIT), Hyderabad</strong>. My Ph.D. focused on the Mercury geochemical cycle and human health risk assessment, research that was recognized with the <strong>"Ramky Best Ph.D. Award"</strong> for its contribution to environmental excellence.
            </p>

            <p>
              Throughout my career, I have leveraged Artificial Intelligence, Remote Sensing, and GIS to identify and mitigate toxic exposures. My experience includes conducting high-level research at <strong>The University of Tokyo</strong> (under the Moonshot R&D Program), serving in government engineering roles, and teaching environmental science to the next generation of researchers. 
            </p>
            <p>
              <strong>Go Toxin Free With Tina</strong> was born from a simple realization: while scientific journals are filled with warnings about unregulated synthetic chemicals in our homes, that information rarely reaches the families who need it most. I created this platform to translate years of academic research, ranging from the <strong>Minamata Convention on Mercury</strong> to the latest AI-driven toxicity studies, into actionable guides for your everyday life.
            </p>

          </div>
        </div>

        {/* Methodology Section */}
        <div style={{ paddingTop: '4rem', borderTop: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '2.25rem', color: 'var(--primary)', textAlign: 'center', marginBottom: '1.5rem', fontWeight: 800 }}>The Scientist&apos;s Approach</h2>
          <p className={"about-intro-text"} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            In a world of &quot;greenwashing&quot; and marketing hype, I apply the same rigorous methodology used in the laboratories of Tokyo and IIT to every product review on this site.
          </p>

          <div className={"about-methodology-grid"}>
            <div className={"about-method-card"}>
              <div className={"about-method-icon"}>
                <BookOpen size={24} />
              </div>
              <h3>1. Peer-Reviewed Foundation</h3>
              <p>Every insight is rooted in the latest scientific literature. I cross-reference findings from journals like <em>The Lancet</em> and <em>PubMed</em>, ensuring we rely on replicated, empirical evidence rather than anecdotal claims.</p>
            </div>

            <div className={"about-method-card"}>
              <div className={"about-method-icon"}>
                <Search size={24} />
              </div>
              <h3>2. AI-Enhanced Toxicity Analysis</h3>
              <p>Leveraging my background in AI and environmental risk assessment, I analyze chemical profiles against global databases (EWG, EPA, and Minamata Convention standards) to identify even trace-level health risks.</p>
            </div>

            <div className={"about-method-card"}>
              <div className={"about-method-icon"}>
                <FlaskConical size={24} />
              </div>
              <h3>3. Independent Verification</h3>
              <p>I prioritize materials that meet gold-standard third-party certifications like MADE SAFE®, GOTS, and OEKO-TEX®. If a certification doesn&apos;t meet my scientific standards, I won&apos;t recommend the product.</p>
            </div>

            <div className={"about-method-card"}>
              <div className={"about-method-icon"}>
                <ShieldCheck size={24} />
              </div>
              <h3>4. Absolute Independence</h3>
              <p>My research is entirely self-funded and objective. I do not accept brand sponsorships to alter reviews. My allegiance is to the data and your family&apos;s safety—never to a corporate bottom line.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
