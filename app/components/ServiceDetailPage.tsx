'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronDown, ArrowUpRight } from 'lucide-react';
import PageLayout from './PageLayout';

export type ServiceStat    = { value: string; label: string };
export type ServiceFeature = { title: string; desc: string };
export type ServiceStep    = { title: string; desc: string };
export type ServiceFaq     = { q: string; a: string };

export type ServiceDetailConfig = {
  breadcrumb: string;
  tag: string;
  title: string;
  subtitle: string;
  stats: ServiceStat[];
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  overviewHeading: string;
  overviewBody: string;
  featuresHeading: string;
  features: ServiceFeature[];
  processHeading: string;
  process: ServiceStep[];
  faqs: ServiceFaq[];
  finalHeading: string;
  finalSub: string;
  finalCtaLabel: string;
  finalCtaHref: string;
};

export default function ServiceDetailPage({ config: c }: { config: ServiceDetailConfig }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="svcpg-hero">
        <div className="svcpg-container">
          <nav className="svcpg-breadcrumb">
            <Link href="/">Home</Link><span aria-hidden>›</span>
            <span className="is-current">{c.breadcrumb}</span>
          </nav>
          <div className="svcpg-tag"><span className="svcpg-tag-dot" />{c.tag}</div>
          <h1 className="svcpg-title">{c.title}</h1>
          <p className="svcpg-subtitle">{c.subtitle}</p>

          <div className="svcpg-stats">
            {c.stats.map((s, i) => (
              <div key={i} className="svcpg-stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="svcpg-hero-ctas">
            <Link href={c.ctaPrimaryHref} className="svcpg-cta-primary">
              {c.ctaPrimaryLabel}<ArrowUpRight size={15} />
            </Link>
            {c.ctaSecondaryLabel && c.ctaSecondaryHref && (
              <Link href={c.ctaSecondaryHref} className="svcpg-cta-ghost">{c.ctaSecondaryLabel}</Link>
            )}
          </div>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="svcpg-section">
        <div className="svcpg-container svcpg-container--narrow">
          <h2 className="svcpg-heading">{c.overviewHeading}</h2>
          <p className="svcpg-overview-body">{c.overviewBody}</p>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="svcpg-section svcpg-section--tint">
        <div className="svcpg-container">
          <h2 className="svcpg-heading svcpg-heading--center">{c.featuresHeading}</h2>
          <div className="svcpg-features-grid">
            {c.features.map((f, i) => (
              <div key={i} className="svcpg-feature-card">
                <div className="svcpg-feature-icon"><CheckCircle2 size={18} /></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="svcpg-section">
        <div className="svcpg-container">
          <h2 className="svcpg-heading svcpg-heading--center">{c.processHeading}</h2>
          <div className="svcpg-process">
            {c.process.map((step, i) => (
              <div key={i} className="svcpg-process-step">
                <div className="svcpg-process-num">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="svcpg-section svcpg-section--tint">
        <div className="svcpg-container svcpg-container--narrow">
          <h2 className="svcpg-heading svcpg-heading--center">Frequently Asked Questions</h2>
          <div className="svcpg-faq-list">
            {c.faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className={`svcpg-faq-item${isOpen ? ' is-open' : ''}`}>
                  <button className="svcpg-faq-q" onClick={() => setOpenFaq(isOpen ? null : i)} aria-expanded={isOpen}>
                    {f.q}
                    <ChevronDown size={16} className="svcpg-faq-chevron" />
                  </button>
                  {isOpen && <div className="svcpg-faq-a">{f.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="svcpg-section">
        <div className="svcpg-container svcpg-container--narrow">
          <div className="svcpg-final-cta">
            <h2>{c.finalHeading}</h2>
            <p>{c.finalSub}</p>
            <Link href={c.finalCtaHref} className="svcpg-cta-primary">
              {c.finalCtaLabel}<ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .svcpg-hero, .svcpg-hero *,
        .svcpg-section, .svcpg-section * {
          font-family: "Inter","Manrope","Plus Jakarta Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif !important;
          box-sizing: border-box;
        }
        .svcpg-container { max-width: 1080px; margin: 0 auto; padding: 0 16px; }
        .svcpg-container--narrow { max-width: 720px; }

        /* Hero */
        .svcpg-hero { background: #ffffff; padding: 96px 0 40px; }
        .svcpg-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 12.5px; font-weight: 500; color: #737373;
          margin-bottom: 18px; flex-wrap: wrap;
        }
        .svcpg-breadcrumb a { color: #737373; text-decoration: none; transition: color .2s; }
        .svcpg-breadcrumb a:hover { color: #f97316; }
        .svcpg-breadcrumb .is-current { color: #000000; font-weight: 700; }

        .svcpg-tag {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 6px 14px; background: rgba(249,115,22,0.08);
          border: 1px solid rgba(249,115,22,0.30); border-radius: 999px;
          font-size: 12px; font-weight: 700; color: #ea580c; margin-bottom: 16px;
        }
        .svcpg-tag-dot { width: 6px; height: 6px; border-radius: 50%; background: #f97316; }

        .svcpg-title {
          font-size: 28px; font-weight: 900; color: #000000;
          line-height: 1.15; letter-spacing: -0.02em; margin: 0 0 14px;
        }
        .svcpg-subtitle {
          font-size: 14.5px; color: #404040; line-height: 1.65;
          max-width: 600px; margin: 0 0 26px;
        }

        .svcpg-stats {
          display: flex; flex-wrap: wrap; gap: 10px;
          margin-bottom: 26px;
        }
        .svcpg-stat {
          display: flex; flex-direction: column; gap: 2px;
          padding: 10px 16px; background: #fafafa;
          border: 1px solid rgba(0,0,0,0.08); border-radius: 12px;
          min-width: 100px;
        }
        .svcpg-stat strong { font-size: 17px; font-weight: 800; color: #000000; letter-spacing: -0.02em; }
        .svcpg-stat span { font-size: 10.5px; font-weight: 600; color: #737373; text-transform: uppercase; letter-spacing: 0.03em; }

        .svcpg-hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; }
        .svcpg-cta-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 24px; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: #ffffff; font-weight: 700; font-size: 14px; border-radius: 999px;
          text-decoration: none; box-shadow: 0 4px 14px rgba(249,115,22,0.28);
          transition: transform .2s, box-shadow .2s, filter .2s;
        }
        .svcpg-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(249,115,22,0.38); filter: brightness(1.05); }
        .svcpg-cta-ghost {
          display: inline-flex; align-items: center; padding: 13px 24px;
          background: #ffffff; color: #000000; font-weight: 700; font-size: 14px;
          border: 1.5px solid rgba(0,0,0,0.14); border-radius: 999px; text-decoration: none;
          transition: border-color .2s, background .2s;
        }
        .svcpg-cta-ghost:hover { border-color: rgba(249,115,22,0.4); background: rgba(249,115,22,0.06); }

        /* Sections */
        .svcpg-section { background: #ffffff; padding: 40px 0; }
        .svcpg-section--tint { background: #fafafa; }
        .svcpg-heading { font-size: 22px; font-weight: 800; color: #000000; letter-spacing: -0.02em; line-height: 1.3; margin: 0 0 14px; }
        .svcpg-heading--center { text-align: center; margin-bottom: 28px; }
        .svcpg-overview-body { font-size: 14.5px; color: #404040; line-height: 1.75; margin: 0; }

        /* Features */
        .svcpg-features-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        .svcpg-feature-card {
          background: #ffffff; border: 1.5px solid rgba(0,0,0,0.10); border-radius: 14px;
          padding: 18px; transition: border-color .2s, box-shadow .2s, transform .2s;
        }
        .svcpg-feature-card:hover { border-color: rgba(249,115,22,0.35); box-shadow: 0 10px 24px rgba(249,115,22,0.10); transform: translateY(-2px); }
        .svcpg-feature-icon {
          width: 34px; height: 34px; border-radius: 9px;
          background: rgba(249,115,22,0.08); border: 1px solid rgba(249,115,22,0.2);
          color: #ea580c; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;
        }
        .svcpg-feature-card h3 { font-size: 14.5px; font-weight: 800; color: #000000; margin: 0 0 6px; }
        .svcpg-feature-card p { font-size: 13px; color: #404040; line-height: 1.6; margin: 0; }

        /* Process */
        .svcpg-process { display: flex; flex-direction: column; gap: 20px; }
        .svcpg-process-step { display: flex; gap: 16px; align-items: flex-start; }
        .svcpg-process-num {
          flex-shrink: 0; font-size: 13px; font-weight: 800; color: #ea580c;
          background: rgba(249,115,22,0.08); border: 1px solid rgba(249,115,22,0.25);
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .svcpg-process-step h3 { font-size: 14.5px; font-weight: 800; color: #000000; margin: 0 0 4px; }
        .svcpg-process-step p { font-size: 13px; color: #404040; line-height: 1.6; margin: 0; }

        /* FAQ */
        .svcpg-faq-list { display: flex; flex-direction: column; gap: 10px; }
        .svcpg-faq-item {
          background: #ffffff; border: 1.5px solid rgba(0,0,0,0.10); border-radius: 12px;
          overflow: hidden; transition: border-color .2s;
        }
        .svcpg-faq-item.is-open { border-color: rgba(249,115,22,0.35); }
        .svcpg-faq-q {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          gap: 12px; padding: 14px 16px; background: none; border: none; cursor: pointer;
          font-size: 13.5px; font-weight: 700; color: #000000; text-align: left;
        }
        .svcpg-faq-chevron { flex-shrink: 0; color: #ea580c; transition: transform .25s ease; }
        .svcpg-faq-item.is-open .svcpg-faq-chevron { transform: rotate(180deg); }
        .svcpg-faq-a { padding: 0 16px 16px; font-size: 13px; color: #404040; line-height: 1.65; }

        /* Final CTA */
        .svcpg-final-cta {
          text-align: center; padding: 32px 20px;
          background: rgba(249,115,22,0.05); border: 1px solid rgba(249,115,22,0.20);
          border-radius: 18px;
        }
        .svcpg-final-cta h2 { font-size: 20px; font-weight: 800; color: #000000; margin: 0 0 8px; }
        .svcpg-final-cta p { font-size: 13.5px; color: #404040; margin: 0 0 20px; }

        /* Responsive — mobile-first */
        @media (min-width: 480px) { .svcpg-title { font-size: 32px; } }
        @media (min-width: 640px) {
          .svcpg-hero { padding: 104px 0 48px; }
          .svcpg-container { padding: 0 24px; }
          .svcpg-title { font-size: clamp(2rem, 4vw, 2.6rem); }
          .svcpg-section { padding: 56px 0; }
          .svcpg-heading { font-size: 26px; }
          .svcpg-features-grid { grid-template-columns: 1fr 1fr; }
          .svcpg-process { flex-direction: row; flex-wrap: wrap; }
          .svcpg-process-step { flex: 1 1 calc(50% - 20px); }
        }
        @media (min-width: 960px) {
          .svcpg-features-grid { grid-template-columns: repeat(4, 1fr); }
          .svcpg-process-step { flex: 1 1 calc(25% - 20px); flex-direction: column; }
        }
      `}</style>
    </PageLayout>
  );
}