'use client';

import Link from 'next/link';
import { ArrowUpRight, ArrowUp } from 'lucide-react';

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

const ORANGE = '#f97316';
const ORANGE_DARK = '#ea580c';
const ORANGE_SOFT = 'rgba(249, 115, 22, 0.12)';
const ORANGE_BORDER = 'rgba(249, 115, 22, 0.30)';

type Cms = Record<string, string>;

const GEOM_FONT_STACK = `"Outfit", "Poppins", "Inter", "Manrope", "Geist", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`;

export default function Footer({ cms = {} }: { cms?: Cms }) {
  const ctaText    = cms['hp:footerCtaText']   ?? 'Get Started';
  const tagline    = cms['hp:footerTagline']   ?? 'Career growth & global education, designed around your outcome — not our revenue.';
  const instagram = cms['hp:footerInstagram'] ?? 'https://www.instagram.com/';
  const twitter   = cms['hp:footerTwitter']   ?? 'https://twitter.com/';
  const linkedin  = cms['hp:footerLinkedin']  ?? 'https://linkedin.com/';
  const facebook  = cms['hp:footerFacebook']  ?? 'https://www.facebook.com/';
  const email     = cms['hp:footerEmail']     ?? 'hello@placedly.in';
  const wa        = cms['hp:footerWa']        ?? cms['hp:waNumber'] ?? '919876543210';
  const copyright = cms['hp:footerCopyright'] ?? '© 2026 Placedly · Delhi NCR · All rights reserved';

  const socials = [
    { href: instagram, label: 'Instagram', Icon: IgIcon },
    { href: twitter,   label: 'Twitter / X', Icon: TwIcon },
    { href: linkedin,  label: 'LinkedIn',  Icon: LiIcon },
    { href: facebook,  label: 'Facebook',  Icon: FbIcon },
  ];

  return (
    <footer className="placedly-footer">
      <div className="placedly-footer-wrap">
        {/* ══════════ TOP: brand + 3-column grid ══════════ */}
        <div className="placedly-footer-top">
          <div className="placedly-footer-grid">

            {/* Column 1 — brand */}
            <div className="placedly-footer-brand-col">
              <Link href="/" className="placedly-footer-brand">
                <span className="placedly-footer-brand-mark">P</span>
                <span className="placedly-footer-brand-text">Placedly</span>
              </Link>
              <p className="placedly-footer-tagline">{tagline}</p>
              <div className="placedly-footer-socials">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="placedly-footer-social"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 — navigation */}
            <div className="placedly-footer-col">
              <h4 className="placedly-footer-col-title">Navigate</h4>
              <ul className="placedly-footer-list">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about-us">About Us</Link></li>
                <li><Link href="/cap">CAP</Link></li>
                <li><Link href="/study-visa">Study Abroad</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Column 3 — contact */}
            <div className="placedly-footer-col">
              <h4 className="placedly-footer-col-title">Get in touch</h4>
              <ul className="placedly-footer-list">
                <li>
                  <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="placedly-footer-contact">
                    <span className="placedly-footer-contact-label">WhatsApp</span>
                    <span className="placedly-footer-contact-meta">Chat with an advisor</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${email}`} className="placedly-footer-contact">
                    <span className="placedly-footer-contact-label">Email</span>
                    <span className="placedly-footer-contact-meta">{email}</span>
                  </a>
                </li>
                <li>
                  <span className="placedly-footer-contact">
                    <span className="placedly-footer-contact-label">Office</span>
                    <span className="placedly-footer-contact-meta">Delhi NCR, India</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 4 — CTA card */}
            <div className="placedly-footer-cta-col">
              <h4 className="placedly-footer-cta-title">Ready to begin?</h4>
              <p className="placedly-footer-cta-sub">Free consultation. Zero upfront. Built around your outcome.</p>
              <Link href="/contact" className="placedly-footer-cta-btn">
                {ctaText}
            <ArrowUpRight size={12} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* ══════════ BOTTOM: copyright + scroll-to-top ══════════ */}
        <div className="placedly-footer-bottom">
          <p className="placedly-footer-copyright">{copyright}</p>

          <div className="placedly-footer-bottom-right">
            <span className="placedly-footer-pulse" aria-hidden />
            <span className="placedly-footer-status">All systems operational</span>
            <a href="#Top" className="placedly-footer-top" aria-label="Scroll to top">
              <ArrowUp size={13} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        /* ============================================================
           FONT — Modern Geometric Sans-Serif
           FORCED with !important
         ============================================================ */
        .placedly-footer,
        .placedly-footer *,
        .placedly-footer a, .placedly-footer span, .placedly-footer p, .placedly-footer strong, .placedly-footer h4 {
          font-family: ${GEOM_FONT_STACK} !important;
          font-feature-settings: "ss01", "cv11", "cv02" !important;
          font-optical-sizing: auto !important;
          letter-spacing: -0.011em !important;
          box-sizing: border-box;
        }

        /* ============================================================
           FOOTER — dark gradient, no shadow
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

        .placedly-footer-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px clamp(20px, 4vw, 40px) 0;
        }

        /* ============================================================
           TOP — 4-column grid (brand / nav / contact / CTA)
           Cleaner than the old single-line layout
         ============================================================ */
        .placedly-footer-top {
          padding-bottom: 28px;
        }
        .placedly-footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1.2fr 1.2fr;
          gap: clamp(24px, 4vw, 56px);
          align-items: start;
        }

        /* ── Brand column ── */
        .placedly-footer-brand {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none !important;
          color: #ffffff !important;
          margin-bottom: 14px;
        }
        .placedly-footer-brand-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_DARK} 100%);
          color: #ffffff;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .placedly-footer-brand-text {
          font-size: 16px;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .placedly-footer-tagline {
          font-size: 12.5px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.55);
          margin: 0 0 16px;
          max-width: 280px;
        }
        .placedly-footer-socials {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .placedly-footer-social {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          color: rgba(255, 255, 255, 0.65) !important;
          text-decoration: none !important;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .placedly-footer-social:hover {
          background: ${ORANGE_SOFT} !important;
          border-color: ${ORANGE_BORDER} !important;
          color: ${ORANGE} !important;
          transform: translateY(-2px);
        }

        /* ── Nav / contact columns ── */
        .placedly-footer-col-title {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
          margin: 0 0 14px;
        }
        .placedly-footer-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .placedly-footer-list li a,
        .placedly-footer-list li {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 5px 0;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .placedly-footer-list li a:hover {
          color: #ffffff;
          transform: translateX(3px);
        }
        /* Animated underline on hover for nav links */
        .placedly-footer-list li a::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: ${ORANGE};
          transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .placedly-footer-list li a:hover::after {
          width: 18px;
        }

        /* Contact items have label + meta stacked */
        .placedly-footer-contact-label {
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          line-height: 1.2;
        }
        .placedly-footer-contact-meta {
          font-size: 11.5px;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.4;
          margin-top: 1px;
        }
        .placedly-footer-contact {
          display: flex;
          flex-direction: column;
          padding: 5px 0 !important;
        }
        .placedly-footer-contact:hover .placedly-footer-contact-label { color: ${ORANGE}; }

        /* ── CTA column ── */
        .placedly-footer-cta-col {
          padding: 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          position: relative;
          overflow: hidden;
        }
        .placedly-footer-cta-col::before {
          content: '';
          position: absolute;
          top: -40px;
          right: -40px;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, ${ORANGE_SOFT} 0%, transparent 70%);
          pointer-events: none;
        }
        .placedly-footer-cta-title {
          font-size: 14px;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 6px;
          position: relative;
        }
        .placedly-footer-cta-sub {
          font-size: 11.5px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.6);
          margin: 0 0 14px;
          position: relative;
        }
        .placedly-footer-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 9px 16px;
          background: linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_DARK} 100%) !important;
          color: #ffffff !important;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none !important;
          border: 1px solid ${ORANGE_DARK} !important;
          letter-spacing: -0.005em;
          white-space: nowrap;
          box-shadow: 0 6px 16px rgba(249, 115, 22, 0.30);
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }
        .placedly-footer-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(249, 115, 22, 0.40);
          filter: brightness(1.05);
        }

        /* ============================================================
           BOTTOM — thin strip with copyright + status + scroll-top
         ============================================================ */
        .placedly-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 16px 0;
          margin-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
        }
        .placedly-footer-copyright {
          font-size: 11.5px;
          color: rgba(255, 255, 255, 0.45);
          margin: 0;
        }
        .placedly-footer-bottom-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .placedly-footer-pulse {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5);
          animation: placedly-pulse 2.4s ease-out infinite;
        }
        @keyframes placedly-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5); }
          70%  { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
        .placedly-footer-status {
          font-size: 11px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.55);
          letter-spacing: 0.01em;
        }
        .placedly-footer-top {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.10) !important;
          color: rgba(255, 255, 255, 0.7) !important;
          text-decoration: none !important;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .placedly-footer-top:hover {
          background: ${ORANGE_SOFT} !important;
          color: ${ORANGE} !important;
          border-color: ${ORANGE_BORDER} !important;
          transform: translateY(-2px);
        }

        /* ============================================================
           RESPONSIVE
         ============================================================ */
        @media (max-width: 900px) {
          .placedly-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 28px 32px;
          }
          .placedly-footer-cta-col {
            grid-column: span 2;
          }
        }
        @media (max-width: 640px) {
          .placedly-footer-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .placedly-footer-cta-col {
            grid-column: span 1;
          }
          .placedly-footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .placedly-footer-bottom-right {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </footer>
  );
}