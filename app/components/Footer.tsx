'use client';

import Link from 'next/link';
import { ArrowUpRight, ArrowUp, Mail, MessageCircle, MapPin, Phone } from 'lucide-react';

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
const ORANGE       = '#f97316';
const ORANGE_DARK  = '#c2410c';
const GEOM_FONT    = `"Outfit","Poppins","Inter","Manrope","Geist","Plus Jakarta Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif`;

type Cms = Record<string, string>;

export default function Footer({ cms = {} }: { cms?: Cms }) {
  const tagline   = cms['hp:footerTagline']   ?? 'Career growth & global education, designed around your outcome.';
  const instagram = cms['hp:footerInstagram'] ?? 'https://www.instagram.com/';
  const twitter   = cms['hp:footerTwitter']   ?? 'https://twitter.com/';
  const linkedin  = cms['hp:footerLinkedin']  ?? 'https://linkedin.com/';
  const facebook  = cms['hp:footerFacebook']  ?? 'https://www.facebook.com/';
  const email     = cms['hp:footerEmail']     ?? 'hello@placedly.in';
  const phone     = cms['hp:footerPhone']     ?? cms['hp:phoneNumber'] ?? '+91 98765 43210';
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

  const RESOURCE_LINKS = [
    { href: '/blog',            label: 'Blog'            },
    { href: '/faq',             label: 'FAQs'            },
    { href: '/success-stories', label: 'Success Stories' },
    { href: '/careers',         label: 'We\'re Hiring'   },
  ];

  const LEGAL_LINKS = [
    { href: '/privacy-policy',   label: 'Privacy Policy'   },
    { href: '/terms',            label: 'Terms of Service' },
    { href: '/refund-policy',    label: 'Refund Policy'    },
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
            <span className="pf-nav-heading">Explore</span>
            <div className="pf-nav-links">
              {NAV_LINKS.map(({ href, label }) => (
                <Link key={label} href={href} className="pf-link">
                  {label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Resources */}
          <nav className="pf-nav" aria-label="Resource links">
            <span className="pf-nav-heading">Resources</span>
            <div className="pf-nav-links">
              {RESOURCE_LINKS.map(({ href, label }) => (
                <Link key={label} href={href} className="pf-link">
                  {label}
                </Link>
              ))}
            </div>
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
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="pf-contact-chip">
                <Phone size={12} strokeWidth={2} />
                {phone}
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
          <nav className="pf-legal" aria-label="Legal links">
            {LEGAL_LINKS.map(({ href, label }, i) => (
              <span key={label} className="pf-legal-item">
                <Link href={href} className="pf-legal-link">{label}</Link>
                {i < LEGAL_LINKS.length - 1 && <span className="pf-legal-dot">·</span>}
              </span>
            ))}
          </nav>
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
            #fff7ed 0%,
            #ffedd5 45%,
            #fed7aa 100%
          ) !important;
          color: #1c1917 !important;
          border-top: 1px solid #fde3c7 !important;
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
          background: radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%);
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
          padding: 28px clamp(20px, 4vw, 40px) 0;
        }

        /* ════════════════════════════════════════
           TOP ROW
        ════════════════════════════════════════ */
        .pf-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 28px;
          padding-bottom: 20px;
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
          color: #1c1917 !important;
          margin-bottom: 8px;
        }
        .pf-brand-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px; height: 28px;
          border-radius: 8px;
          background: ${ORANGE};
          border: 1px solid ${ORANGE};
          color: #ffffff;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: -0.02em !important;
          transition: transform 0.2s ease, filter 0.2s ease;
        }
        .pf-brand:hover .pf-brand-mark {
          filter: brightness(1.08);
          transform: rotate(-4deg) scale(1.06);
        }
        .pf-brand-text {
          font-size: 16px;
          font-weight: 800;
          letter-spacing: -0.025em !important;
          color: #1c1917;
        }
        .pf-tagline {
          font-size: 12px;
          line-height: 1.55;
          color: #78716c;
          margin: 0;
          max-width: 240px;
        }

        /* ── Nav columns ── */
        .pf-nav {
          flex: 0 1 160px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 2px;
          min-width: 130px;
        }
        .pf-nav-heading {
          font-size: 10.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em !important;
          color: #b45309;
        }
        .pf-nav-links {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .pf-link {
          font-size: 13px;
          font-weight: 600;
          color: #57534e !important;
          text-decoration: none !important;
          transition: color 0.2s ease, transform 0.2s ease;
          white-space: nowrap;
          width: fit-content;
        }
        .pf-link:hover {
          color: ${ORANGE_DARK} !important;
          transform: translateX(2px);
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
          color: #78716c !important;
          text-decoration: none !important;
          background: #ffffff;
          border: 1px solid #fde3c7;
          padding: 5px 9px;
          border-radius: 999px;
          white-space: nowrap;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .pf-contact-chip:hover {
          background: #fff7ed;
          border-color: ${ORANGE};
          color: ${ORANGE_DARK} !important;
        }
        .pf-contact-chip--static { cursor: default; }
        .pf-contact-chip--static:hover {
          background: #ffffff;
          border-color: #fde3c7;
          color: #78716c !important;
        }

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
          background: #ffffff !important;
          border: 1px solid #fde3c7 !important;
          color: #a8a29e !important;
          text-decoration: none !important;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
        }
        .pf-social:hover {
          background: ${ORANGE} !important;
          border-color: ${ORANGE} !important;
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
          padding: 14px 0;
          border-top: 1px solid #fde3c7;
          flex-wrap: wrap;
        }
        .pf-copyright {
          font-size: 11px !important;
          color: #a8a29e !important;
          margin: 0;
        }
        .pf-legal {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .pf-legal-item {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .pf-legal-link {
          font-size: 11px;
          font-weight: 600;
          color: #78716c !important;
          text-decoration: none !important;
          transition: color 0.2s ease;
        }
        .pf-legal-link:hover {
          color: ${ORANGE_DARK} !important;
        }
        .pf-legal-dot {
          font-size: 11px;
          color: #d6d3d1;
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
          background: ${ORANGE} !important;
          color: #ffffff !important;
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
          filter: brightness(1.06);
        }
        .pf-scroll-top {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px; height: 30px;
          border-radius: 50%;
          background: #ffffff !important;
          border: 1px solid #fde3c7 !important;
          color: #a8a29e !important;
          text-decoration: none !important;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
        }
        .pf-scroll-top:hover {
          background: ${ORANGE} !important;
          border-color: ${ORANGE} !important;
          color: #ffffff !important;
          transform: translateY(-3px);
        }

        /* ════════════════════════════════════════
           RESPONSIVE
        ════════════════════════════════════════ */
        @media (max-width: 768px) {
          .placedly-footer-wrap { padding-top: 22px; }
          .pf-top {
            flex-direction: column;
            gap: 18px;
            padding-bottom: 16px;
          }
          .pf-brand-block,
          .pf-nav,
          .pf-contact-block {
            flex: 1 1 auto;
            width: 100%;
          }
          .pf-nav-links {
            flex-direction: row;
            flex-wrap: wrap;
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
            gap: 10px;
          }
          .pf-legal {
            flex-wrap: wrap;
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