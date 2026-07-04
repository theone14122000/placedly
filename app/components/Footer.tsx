'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

const IgIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const TwIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LiIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const FbIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

type Cms = Record<string, string>;

export default function Footer({ cms = {} }: { cms?: Cms }) {
  const desc =
    cms['hp:footerDesc'] ??
    "India's career growth and study abroad consultancy. CAP: 12% Success Share, post-placement only. Study Abroad: UK · France · Germany · Dubai. Zero upfront. We grow when you grow.";
  const ctaText = cms['hp:footerCtaText'] ?? 'Start Your Journey';
  const instagram = cms['hp:footerInstagram'] ?? 'https://www.instagram.com/';
  const twitter = cms['hp:footerTwitter'] ?? 'https://twitter.com/';
  const linkedin = cms['hp:footerLinkedin'] ?? 'https://linkedin.com/';
  const facebook = cms['hp:footerFacebook'] ?? 'https://www.facebook.com/';
  const email = cms['hp:footerEmail'] ?? 'hello@placedly.in';
  const wa = cms['hp:footerWa'] ?? cms['hp:waNumber'] ?? '919876543210';
  const copyright =
    cms['hp:footerCopyright'] ??
    '© 2026 Placedly · CAP · Study Abroad · India · CAP Fee: 12% of Annual CTC · Post-offer letter only · All engagements governed by signed Candidate Service Agreement';

  const socials = [
    { href: instagram, label: 'Instagram', Icon: IgIcon },
    { href: twitter, label: 'Twitter / X', Icon: TwIcon },
    { href: linkedin, label: 'LinkedIn', Icon: LiIcon },
    { href: facebook, label: 'Facebook', Icon: FbIcon },
  ];

  return (
    <footer className="placedly-footer">
      <div className="placedly-footer-glow" aria-hidden />

      <div className="placedly-footer-wrap">
        {/* ── Top row: brand + socials + CTA ── */}
        <motion.div
          className="placedly-footer-top-row"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="placedly-footer-logo">
            <img loading="lazy" src="/logo-light.png" alt="Placedly" />
            <span>Placedly</span>
          </Link>

          <div className="placedly-footer-socials">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="placedly-footer-social"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>

          <Link href="/contact" className="placedly-footer-cta">
            {ctaText}
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </Link>
        </motion.div>

        {/* ── Main grid: link columns ── */}
        <motion.div
          className="placedly-footer-grid"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          <div className="placedly-footer-col">
            <h3 className="placedly-footer-heading">Company</h3>
            <nav className="placedly-footer-links">
              <Link href="/">Home</Link>
              <Link href="/about-us">About Us</Link>
              <Link href="/careers">Vacancies</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>

          <div className="placedly-footer-col">
            <h3 className="placedly-footer-heading">Programmes</h3>
            <nav className="placedly-footer-links">
              <Link href="/cap">CAP Programme</Link>
              <Link href="/study-visa">Study Visa</Link>
              <Link href="/services">Services</Link>
              <Link href="/stories">Success Stories</Link>
            </nav>
          </div>

          <div className="placedly-footer-col">
            <h3 className="placedly-footer-heading">Connect</h3>
            <nav className="placedly-footer-links">
              <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
              <a href={`mailto:${email}`}>{email}</a>
              <Link href="/terms">Terms &amp; Services</Link>
              <Link href="/privacy">Privacy Policy</Link>
            </nav>
          </div>

          <div className="placedly-footer-col placedly-footer-col--last">
            <h3 className="placedly-footer-heading">About</h3>
            <p className="placedly-footer-desc">{desc}</p>
          </div>
        </motion.div>

        {/* ── Bottom bar: copyright + scroll-top ── */}
        <div className="placedly-footer-bottom">
          <p className="placedly-footer-copy">{copyright}</p>
          <a href="#Top" className="placedly-footer-top" aria-label="Scroll to top">
            <ArrowUp size={14} strokeWidth={2.5} />
          </a>
        </div>
      </div>

      <style>{`
        /* ============================================================
           FONT — Modern Geometric Sans-Serif
           FORCED with !important
         ============================================================ */
        .placedly-footer,
        .placedly-footer *,
        .placedly-footer h1, .placedly-footer h2, .placedly-footer h3,
        .placedly-footer h4, .placedly-footer h5, .placedly-footer h6,
        .placedly-footer p, .placedly-footer span, .placedly-footer a,
        .placedly-footer button, .placedly-footer strong, .placedly-footer small {
          font-family: "Outfit", "Poppins", "Inter", "Manrope", "Geist", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif !important;
          font-feature-settings: "ss01", "cv11", "cv02" !important;
          font-optical-sizing: auto !important;
          letter-spacing: -0.011em !important;
        }

        /* ============================================================
           FOOTER — dark blue, thin
         ============================================================ */
        .placedly-footer {
          position: relative;
          background: linear-gradient(180deg, #0a1530 0%, #0f1d3d 100%);
          color: #ffffff;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          overflow: hidden;
        }

        .placedly-footer-glow {
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 60%;
          max-width: 800px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.4), transparent);
          pointer-events: none;
        }

        .placedly-footer-wrap {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(28px, 4vw, 40px) clamp(20px, 4vw, 40px) clamp(16px, 2.5vw, 20px);
        }

        /* ============================================================
           TOP ROW
         ============================================================ */
        .placedly-footer-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding-bottom: clamp(20px, 2.5vw, 28px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
        }

        .placedly-footer-logo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: #ffffff;
          font-weight: 700 !important;
          font-size: 14.5px !important;
          letter-spacing: -0.015em !important;
        }
        .placedly-footer-logo img {
          height: 22px;
          width: auto;
          display: block;
        }

        .placedly-footer-socials {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .placedly-footer-social {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .placedly-footer-social:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .placedly-footer-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          background: #2563eb;
          color: #ffffff;
          border-radius: 999px;
          font-size: 12.5px !important;
          font-weight: 600 !important;
          text-decoration: none;
          border: 1px solid #2563eb;
          letter-spacing: -0.005em !important;
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .placedly-footer-cta:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(37, 99, 235, 0.3);
        }

        /* ============================================================
           GRID
         ============================================================ */
        .placedly-footer-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          padding: clamp(24px, 3vw, 32px) 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .placedly-footer-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 0;
        }

        .placedly-footer-heading {
          font-size: 10.5px !important;
          font-weight: 700 !important;
          letter-spacing: 0.14em !important;
          text-transform: uppercase;
          color: #ffffff;
          margin: 0 0 6px;
        }

        .placedly-footer-links {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .placedly-footer-links a {
          display: inline-block;
          font-size: 12.5px !important;
          font-weight: 500 !important;
          color: rgba(255, 255, 255, 0.55);
          text-decoration: none;
          transition: color 0.15s ease, transform 0.15s ease;
          letter-spacing: -0.005em !important;
          width: fit-content;
        }
        .placedly-footer-links a:hover {
          color: #ffffff;
          transform: translateX(2px);
        }

        .placedly-footer-desc {
          font-size: 12px !important;
          font-weight: 400 !important;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
          letter-spacing: -0.005em !important;
        }

        /* ============================================================
           BOTTOM BAR
         ============================================================ */
        .placedly-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding-top: clamp(14px, 2vw, 18px);
          flex-wrap: wrap;
        }

        .placedly-footer-copy {
          font-size: 10.5px !important;
          font-weight: 500 !important;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.3);
          margin: 0;
          flex: 1;
          letter-spacing: -0.003em !important;
        }

        .placedly-footer-top {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          flex-shrink: 0;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .placedly-footer-top:hover {
          background: #2563eb;
          color: #ffffff;
          border-color: #2563eb;
          transform: translateY(-2px);
        }

        /* ============================================================
           RESPONSIVE
         ============================================================ */
        @media (max-width: 900px) {
          .placedly-footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }
        @media (max-width: 640px) {
          .placedly-footer-top-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }
          .placedly-footer-cta {
            width: 100%;
            justify-content: center;
          }
          .placedly-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .placedly-footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
        @media (max-width: 380px) {
          .placedly-footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}