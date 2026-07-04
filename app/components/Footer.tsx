'use client';

import Link from 'next/link';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

const IgIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const TwIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LiIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const FbIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

type Cms = Record<string, string>;

export default function Footer({ cms = {} }: { cms?: Cms }) {
  const ctaText    = cms['hp:footerCtaText']   ?? 'Get Started';
  const instagram = cms['hp:footerInstagram'] ?? 'https://www.instagram.com/';
  const twitter   = cms['hp:footerTwitter']   ?? 'https://twitter.com/';
  const linkedin  = cms['hp:footerLinkedin']  ?? 'https://linkedin.com/';
  const facebook  = cms['hp:footerFacebook']  ?? 'https://www.facebook.com/';
  const email     = cms['hp:footerEmail']     ?? 'hello@placedly.in';
  const wa        = cms['hp:footerWa']        ?? cms['hp:waNumber'] ?? '919876543210';

  const socials = [
    { href: instagram, label: 'Instagram', Icon: IgIcon },
    { href: twitter,   label: 'Twitter / X', Icon: TwIcon },
    { href: linkedin,  label: 'LinkedIn',  Icon: LiIcon },
    { href: facebook,  label: 'Facebook',  Icon: FbIcon },
  ];

  return (
    <footer className="placedly-footer">
      <div className="placedly-footer-wrap">
        <div className="placedly-footer-row">
          <Link href="/" className="placedly-footer-brand">
            Placedly
          </Link>

          <span className="placedly-footer-divider" aria-hidden />

          <Link href="/">Home</Link>
          <Link href="/about-us">About</Link>
          <Link href="/cap">CAP</Link>
          <Link href="/study-visa">Study Abroad</Link>
          <Link href="/services">Services</Link>
          <Link href="/stories">Stories</Link>
          <Link href="/contact">Contact</Link>

          <span className="placedly-footer-divider" aria-hidden />

          <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="placedly-footer-social">
            <IgIcon />
          </a>
          <a href={twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="placedly-footer-social">
            <TwIcon />
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="placedly-footer-social">
            <LiIcon />
          </a>
          <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="placedly-footer-social">
            <FbIcon />
          </a>

          <span className="placedly-footer-divider" aria-hidden />

          <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="placedly-footer-contact">
            WhatsApp
          </a>
          <a href={`mailto:${email}`} className="placedly-footer-contact">
            {email}
          </a>

          <Link href="/contact" className="placedly-footer-cta">
            {ctaText}
            <ArrowUpRight size={12} strokeWidth={2.5} />
          </Link>

          <a href="#Top" className="placedly-footer-top" aria-label="Scroll to top">
            <ArrowUp size={13} strokeWidth={2.5} />
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
        .placedly-footer a, .placedly-footer span, .placedly-footer strong {
          font-family: "Outfit", "Poppins", "Inter", "Manrope", "Geist", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif !important;
          font-feature-settings: "ss01", "cv11", "cv02" !important;
          font-optical-sizing: auto !important;
          letter-spacing: -0.011em !important;
        }

        /* ============================================================
           FOOTER — dark blue, thin
         ============================================================ */
        .placedly-footer {
          position: relative !important;
          background: linear-gradient(180deg, #0a1530 0%, #0f1d3d 100%) !important;
          color: #ffffff !important;
          border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: 100% !important;
        }

        .placedly-footer * { color: inherit; }

        .placedly-footer-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 12px clamp(20px, 4vw, 40px);
        }

        /* ============================================================
           SINGLE ROW — all elements in one horizontal line
           Wraps gracefully on small screens
         ============================================================ */
        .placedly-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
        }

        /* Subtle vertical separator between sections */
        .placedly-footer-divider {
          width: 1px;
          height: 16px;
          background: rgba(255, 255, 255, 0.12);
          flex-shrink: 0;
        }

        /* Brand */
        .placedly-footer-brand {
          font-weight: 700 !important;
          font-size: 14.5px !important;
          letter-spacing: -0.02em !important;
          color: #ffffff !important;
          text-decoration: none !important;
          flex-shrink: 0;
        }

        /* Default link style (nav links) */
        .placedly-footer-row > a:not(.placedly-footer-brand):not(.placedly-footer-social):not(.placedly-footer-cta):not(.placedly-footer-top) {
          font-size: 12.5px !important;
          font-weight: 500 !important;
          color: rgba(255, 255, 255, 0.6) !important;
          text-decoration: none !important;
          transition: color 0.15s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .placedly-footer-row > a:not(.placedly-footer-brand):not(.placedly-footer-social):not(.placedly-footer-cta):not(.placedly-footer-top):hover {
          color: #ffffff !important;
        }

        /* Social icons */
        .placedly-footer-social {
          width: 28px;
          height: 28px;
          border-radius: 7px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          color: rgba(255, 255, 255, 0.6) !important;
          text-decoration: none !important;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
          flex-shrink: 0;
        }
        .placedly-footer-social:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          color: #ffffff !important;
          transform: translateY(-1px);
        }

        /* Contact links (WhatsApp, email) */
        .placedly-footer-contact {
          font-size: 11.5px !important;
          font-weight: 500 !important;
          color: rgba(255, 255, 255, 0.6) !important;
          text-decoration: none !important;
          transition: color 0.15s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .placedly-footer-contact:hover {
          color: #ffffff !important;
        }

        /* CTA button */
        .placedly-footer-cta {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 14px;
          background: #2563eb !important;
          color: #ffffff !important;
          border-radius: 999px;
          font-size: 12px !important;
          font-weight: 600 !important;
          text-decoration: none !important;
          border: 1px solid #2563eb !important;
          letter-spacing: -0.005em !important;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .placedly-footer-cta:hover {
          background: #1d4ed8 !important;
          transform: translateY(-1px);
        }

        /* Scroll-top button */
        .placedly-footer-top {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.10) !important;
          color: rgba(255, 255, 255, 0.7) !important;
          text-decoration: none !important;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
          flex-shrink: 0;
        }
        .placedly-footer-top:hover {
          background: #2563eb !important;
          color: #ffffff !important;
          border-color: #2563eb !important;
          transform: translateY(-1px);
        }

        /* ============================================================
           RESPONSIVE — scroll horizontally on tiny screens
         ============================================================ */
        @media (max-width: 900px) {
          .placedly-footer-row {
            gap: 10px;
          }
        }
        @media (max-width: 720px) {
          .placedly-footer-row {
            flex-wrap: nowrap;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding-bottom: 4px;
          }
          .placedly-footer-row::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </footer>
  );
}