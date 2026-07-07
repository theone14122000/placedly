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
const ORANGE      = '#f97316';
const ORANGE_DARK = '#ea580c';
const GEOM_FONT   = `"Outfit","Poppins","Inter","Manrope","Geist","Plus Jakarta Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif`;

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

  const LINK_GROUPS = [
    {
      label: 'Company',
      links: [
        { href: '/about-us', label: 'About Us' },
        { href: '/careers',  label: 'Careers' },
        { href: '/blog',     label: 'Blog' },
        { href: '/contact',  label: 'Contact' },
      ],
    },
    {
      label: 'Services',
      links: [
        { href: '/cap',            label: 'CAP' },
        { href: '/study-visa',     label: 'Study Abroad' },
        { href: '/recruiters',     label: 'For Recruiters' },
        { href: '/candidates',     label: 'For Candidates' },
        { href: '/vacancies',      label: 'Vacancies' },
      ],
    },
    {
      label: 'Legal',
      links: [
        { href: '/privacy-policy', label: 'Privacy Policy' },
        { href: '/terms',          label: 'Terms of Service' },
        { href: '/refund-policy',  label: 'Refund Policy' },
      ],
    },
  ];

  return (
    <footer className="placedly-footer">

      <div className="placedly-footer-wrap">

        {/* ══════════════════════════════════════
            TOP ROW — brand + socials
        ══════════════════════════════════════ */}
        <div className="pf-top">
          <div className="pf-brand-block">
            <Link href="/" className="pf-brand">
              <span className="pf-brand-mark">P</span>
              <span className="pf-brand-text">Placedly</span>
            </Link>
            <p className="pf-tagline">{tagline}</p>
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

        {/* ══════════════════════════════════════
            LINK GROUPS — thin, wraps inline
        ══════════════════════════════════════ */}
        <div className="pf-linkgroups">
          {LINK_GROUPS.map((group) => (
            <div key={group.label} className="pf-linkgroup">
              <span className="pf-linkgroup-label">{group.label}</span>
              <div className="pf-linkgroup-links">
                {group.links.map(({ href, label }) => (
                  <Link key={label} href={href} className="pf-link">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Contact chips folded into the same row */}
          <div className="pf-linkgroup">
            <span className="pf-linkgroup-label">Get in touch</span>
            <div className="pf-linkgroup-links">
              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pf-link pf-link--icon"
              >
                <MessageCircle size={12} strokeWidth={2} />
                WhatsApp
              </a>
              <a href={`mailto:${email}`} className="pf-link pf-link--icon">
                <Mail size={12} strokeWidth={2} />
                Email
              </a>
              <span className="pf-link pf-link--icon pf-link--static">
                <MapPin size={12} strokeWidth={2} />
                Delhi NCR
              </span>
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
          background: linear-gradient(180deg, #111113 0%, #0a0a0b 100%) !important;
          color: #ffffff !important;
          border-top: 1px solid rgba(255,255,255,0.06) !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: 100% !important;
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
          gap: 24px;
          padding-bottom: 20px;
          flex-wrap: wrap;
        }

        /* ── Brand ── */
        .pf-brand-block {
          flex: 1 1 240px;
          min-width: 200px;
        }
        .pf-brand {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none !important;
          color: #ffffff !important;
          margin-bottom: 6px;
        }
        .pf-brand-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px; height: 26px;
          border-radius: 7px;
          background: rgba(249,115,22,0.14);
          border: 1px solid rgba(249,115,22,0.30);
          color: ${ORANGE};
          font-size: 13px;
          font-weight: 900;
          letter-spacing: -0.02em !important;
          transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
        }
        .pf-brand:hover .pf-brand-mark {
          background: rgba(249,115,22,0.24);
          border-color: rgba(249,115,22,0.5);
          transform: rotate(-4deg) scale(1.08);
        }
        .pf-brand-text {
          font-size: 15.5px;
          font-weight: 800;
          letter-spacing: -0.025em !important;
        }
        .pf-tagline {
          font-size: 12px;
          line-height: 1.55;
          color: rgba(255,255,255,0.42);
          margin: 0;
          max-width: 280px;
        }

        /* ── Socials ── */
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
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.10) !important;
          color: rgba(255,255,255,0.55) !important;
          text-decoration: none !important;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
        }
        .pf-social:hover {
          background: rgba(249,115,22,0.12) !important;
          border-color: rgba(249,115,22,0.35) !important;
          color: ${ORANGE} !important;
          transform: translateY(-2px);
        }

        /* ════════════════════════════════════════
           LINK GROUPS — thin, wraps horizontally
        ════════════════════════════════════════ */
        .pf-linkgroups {
          display: flex;
          flex-wrap: wrap;
          gap: 18px 40px;
          padding: 18px 0 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .pf-linkgroup {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 140px;
          flex: 1 1 auto;
        }
        .pf-linkgroup-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.32);
        }
        .pf-linkgroup-links {
          display: flex;
          flex-wrap: wrap;
          gap: 6px 14px;
        }
        .pf-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12.5px;
          font-weight: 500;
          color: rgba(255,255,255,0.68) !important;
          text-decoration: none !important;
          white-space: nowrap;
          transition: color 0.2s ease;
        }
        .pf-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: -2px;
          width: 0;
          height: 1px;
          background: ${ORANGE};
          transition: width 0.25s ease;
        }
        .pf-link:hover {
          color: #ffffff !important;
        }
        .pf-link:hover::after {
          width: 100%;
        }
        .pf-link--icon svg { color: rgba(255,255,255,0.4); transition: color 0.2s ease; }
        .pf-link--icon:hover svg { color: ${ORANGE}; }
        .pf-link--static { cursor: default; }
        .pf-link--static::after { display: none; }

        /* ════════════════════════════════════════
           BOTTOM BAR
        ════════════════════════════════════════ */
        .pf-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 14px 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          flex-wrap: wrap;
        }
        .pf-copyright {
          font-size: 11px !important;
          color: rgba(255,255,255,0.32) !important;
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
          background: rgba(249,115,22,0.12) !important;
          border: 1px solid rgba(249,115,22,0.35) !important;
          color: ${ORANGE} !important;
          border-radius: 999px;
          font-size: 11.5px;
          font-weight: 700;
          text-decoration: none !important;
          letter-spacing: -0.01em !important;
          white-space: nowrap;
          transition: background 0.2s ease, transform 0.2s ease, color 0.2s ease;
        }
        .pf-mini-cta:hover {
          background: ${ORANGE} !important;
          color: #ffffff !important;
          transform: translateY(-2px);
        }
        .pf-scroll-top {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px; height: 28px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.10) !important;
          color: rgba(255,255,255,0.55) !important;
          text-decoration: none !important;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
        }
        .pf-scroll-top:hover {
          background: rgba(249,115,22,0.12) !important;
          border-color: rgba(249,115,22,0.35) !important;
          color: ${ORANGE} !important;
          transform: translateY(-3px);
        }

        /* ════════════════════════════════════════
           RESPONSIVE
        ════════════════════════════════════════ */
        @media (max-width: 768px) {
          .placedly-footer-wrap { padding-top: 22px; }
          .pf-top {
            flex-direction: column;
            gap: 14px;
            padding-bottom: 16px;
          }
          .pf-socials { align-self: flex-start; }
          .pf-linkgroups {
            flex-direction: column;
            gap: 16px;
            padding: 16px 0 18px;
          }
          .pf-linkgroup { min-width: 0; }
          .pf-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .pf-bottom-right {
            width: 100%;
            justify-content: space-between;
          }
        }
        @media (max-width: 420px) {
          .pf-linkgroup-links { gap: 6px 12px; }
          .pf-link { font-size: 12px; }
        }
      `}</style>
    </footer>
  );
}