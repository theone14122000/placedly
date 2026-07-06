'use client';

import Link from 'next/link';
import { ArrowUpRight, ArrowUp, Mail, MessageCircle, MapPin } from 'lucide-react';

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

/* ── Design tokens ── */
const ORANGE        = '#f97316';
const ORANGE_DARK   = '#ea580c';
const GEOM_FONT     = `"Outfit","Poppins","Inter","Manrope","Geist","Plus Jakarta Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif`;

type Cms = Record<string, string>;

export default function Footer({ cms = {} }: { cms?: Cms }) {
  const tagline   = cms['hp:footerTagline']   ?? 'Career growth & global education, designed around your outcome.';
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

  const NAV_LINKS = [
    { href: '/',            label: 'Home'          },
    { href: '/about-us',    label: 'About Us'      },
    { href: '/cap',         label: 'CAP'           },
    { href: '/study-visa',  label: 'Study Abroad'  },
    { href: '/services',    label: 'Services'      },
    { href: '/contact',     label: 'Contact'       },
  ];

  return (
    <footer className="placedly-footer">

      {/* single soft decorative blob to keep theme feel */}
      <span aria-hidden className="pf-blob" />

      <div className="placedly-footer-wrap">

        {/* ══════════════════════════════════════
            TOP ROW — brand / nav / contact+social
        ══════════════════════════════════════ */}
        <div className="pf-top">

          {/* Brand */}
          <div className="pf-brand-block">
            <Link href="/" className="pf-brand">
              <span className="pf-brand-mark">P</span>
              <span className="pf-brand-text">Placedly</span>
            </Link>
            <p className="pf-tagline">{tagline}</p>
          </div>

          {/* Nav */}
          <nav className="pf-nav" aria-label="Footer navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={label} href={href} className="pf-link">
                {label}
              </Link>
            ))}
          </nav>

          {/* Contact + socials */}
          <div className="pf-contact-block">
            <div className="pf-contact-inline">
              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pf-contact-chip"
              >
                <MessageCircle size={12} strokeWidth={2} />
                WhatsApp
              </a>
              <a href={`mailto:${email}`} className="pf-contact-chip">
                <Mail size={12} strokeWidth={2} />
                {email}
              </a>
              <span className="pf-contact-chip pf-contact-chip--static">
                <MapPin size={12} strokeWidth={2} />
                Delhi NCR
              </span>
            </div>
            <div className="pf-socials">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="pf-social"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            BOTTOM BAR
        ══════════════════════════════════════ */}
        <div className="pf-bottom">
          <p className="pf-copyright">{copyright}</p>
          <div className="pf-bottom-right">
            <Link href="/contact" className="pf-mini-cta">
              Get Started
              <ArrowUpRight size={12} strokeWidth={2.5} />
            </Link>
            <a href="#Top" className="pf-scroll-top" aria-label="Back to top">
              <ArrowUp size={13} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          STYLES
      ══════════════════════════════════════ */}
      <style>{`

        /* ── Base ── */
        .placedly-footer,
        .placedly-footer * {
          font-family: ${GEOM_FONT} !important;
          font-feature-settings: "ss01","cv11","cv02" !important;
          font-optical-sizing: auto !important;
          letter-spacing: -0.011em !important;
          box-sizing: border-box;
        }

        .placedly-footer {
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            160deg,
            #7c1a00 0%,
            #b83d00 20%,
            ${ORANGE_DARK} 45%,
            ${ORANGE} 70%,
            #fdba74 100%
          ) !important;
          color: #ffffff !important;
          border-top: none !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: 100% !important;
        }

        /* ── Single soft blob (kept for theme texture) ── */
        .pf-blob {
          position: absolute;
          top: -20%; right: -10%;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(253,186,116,0.25) 0%, transparent 70%);
          filter: blur(70px);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Wrap ── */
        .placedly-footer-wrap {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px clamp(20px, 4vw, 40px) 0;
        }

        /* ════════════════════════════════════════
           TOP ROW
        ════════════════════════════════════════ */
        .pf-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 32px;
          padding-bottom: 24px;
          flex-wrap: wrap;
        }

        /* ── Brand ── */
        .pf-brand-block {
          flex: 1 1 220px;
          min-width: 200px;
        }
        .pf-brand {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none !important;
          color: #ffffff !important;
          margin-bottom: 8px;
        }
        .pf-brand-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px; height: 28px;
          border-radius: 8px;
          background: rgba(255,255,255,0.20);
          border: 1px solid rgba(255,255,255,0.30);
          color: #ffffff;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: -0.02em !important;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .pf-brand:hover .pf-brand-mark {
          background: rgba(255,255,255,0.32);
          transform: rotate(-4deg) scale(1.06);
        }
        .pf-brand-text {
          font-size: 16px;
          font-weight: 800;
          letter-spacing: -0.025em !important;
        }
        .pf-tagline {
          font-size: 12px;
          line-height: 1.55;
          color: rgba(255,255,255,0.62);
          margin: 0;
          max-width: 260px;
        }

        /* ── Nav ── */
        .pf-nav {
          flex: 1 1 320px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px 18px;
          padding-top: 6px;
        }
        .pf-link {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.75) !important;
          text-decoration: none !important;
          transition: color 0.2s ease;
          white-space: nowrap;
        }
        .pf-link:hover {
          color: #ffffff !important;
        }

        /* ── Contact + socials ── */
        .pf-contact-block {
          flex: 1 1 260px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          min-width: 220px;
        }
        .pf-contact-inline {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 6px;
        }
        .pf-contact-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.72) !important;
          text-decoration: none !important;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          padding: 5px 9px;
          border-radius: 999px;
          white-space: nowrap;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .pf-contact-chip:hover {
          background: rgba(255,255,255,0.16);
          color: #ffffff !important;
        }
        .pf-contact-chip--static { cursor: default; }

        .pf-socials {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .pf-social {
          width: 28px; height: 28px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.10) !important;
          border: 1px solid rgba(255,255,255,0.16) !important;
          color: rgba(255,255,255,0.75) !important;
          text-decoration: none !important;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .pf-social:hover {
          background: rgba(255,255,255,0.22) !important;
          color: #ffffff !important;
          transform: translateY(-2px) rotate(-4deg);
        }

        /* ════════════════════════════════════════
           BOTTOM BAR
        ════════════════════════════════════════ */
        .pf-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 16px 0;
          border-top: 1px solid rgba(255,255,255,0.14);
          flex-wrap: wrap;
        }
        .pf-copyright {
          font-size: 11px !important;
          color: rgba(255,255,255,0.45) !important;
          margin: 0;
        }
        .pf-bottom-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .pf-mini-cta {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 7px 14px;
          background: #ffffff !important;
          color: ${ORANGE_DARK} !important;
          border-radius: 999px;
          font-size: 11.5px;
          font-weight: 800;
          text-decoration: none !important;
          letter-spacing: -0.01em !important;
          white-space: nowrap;
          transition: transform 0.2s ease, filter 0.2s ease;
        }
        .pf-mini-cta:hover {
          transform: translateY(-2px);
          filter: brightness(0.96);
        }
        .pf-scroll-top {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px; height: 30px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12) !important;
          border: 1px solid rgba(255,255,255,0.18) !important;
          color: rgba(255,255,255,0.80) !important;
          text-decoration: none !important;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .pf-scroll-top:hover {
          background: rgba(255,255,255,0.22) !important;
          color: #ffffff !important;
          transform: translateY(-3px);
        }

        /* ════════════════════════════════════════
           RESPONSIVE
        ════════════════════════════════════════ */
        @media (max-width: 768px) {
          .placedly-footer-wrap { padding-top: 24px; }
          .pf-top {
            flex-direction: column;
            gap: 20px;
            padding-bottom: 18px;
          }
          .pf-brand-block,
          .pf-nav,
          .pf-contact-block {
            flex: 1 1 auto;
            width: 100%;
          }
          .pf-nav {
            padding-top: 0;
            gap: 8px 16px;
          }
          .pf-contact-block {
            align-items: flex-start;
          }
          .pf-contact-inline {
            justify-content: flex-start;
          }
          .pf-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .pf-bottom-right {
            width: 100%;
            justify-content: space-between;
          }
        }
        @media (max-width: 420px) {
          .pf-contact-chip { font-size: 10.5px; padding: 4px 8px; }
        }
      `}</style>
    </footer>
  );
}