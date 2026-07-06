'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowUp, Mail, MessageCircle, MapPin, Sparkles } from 'lucide-react';

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
const ORANGE_DEEPER = '#c2410c';
const ORANGE_SOFT   = 'rgba(249,115,22,0.15)';
const ORANGE_BORDER = 'rgba(249,115,22,0.35)';
const GEOM_FONT     = `"Outfit","Poppins","Inter","Manrope","Geist","Plus Jakarta Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif`;

type Cms = Record<string, string>;

/* ── Animated counter ── */
function AnimCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = Math.ceil(target / 40);
        const id = setInterval(() => {
          start = Math.min(start + step, target);
          setVal(start);
          if (start >= target) clearInterval(id);
        }, 35);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Particle dot (decorative) ── */
function Particle({ x, y, delay, size }: { x: string; y: string; delay: number; size: number }) {
  return (
    <span
      aria-hidden
      style={{
        position: 'absolute',
        left: x, top: y,
        width: size, height: size,
        borderRadius: '50%',
        background: `rgba(249,115,22,${0.15 + Math.random() * 0.2})`,
        animation: `fp-float ${3 + Math.random() * 3}s ease-in-out ${delay}s infinite alternate`,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

const PARTICLES = [
  { x: '8%',  y: '18%', delay: 0,    size: 5  },
  { x: '22%', y: '72%', delay: 0.6,  size: 4  },
  { x: '45%', y: '14%', delay: 1.1,  size: 6  },
  { x: '65%', y: '80%', delay: 0.3,  size: 3  },
  { x: '78%', y: '30%', delay: 1.7,  size: 5  },
  { x: '90%', y: '60%', delay: 0.9,  size: 4  },
  { x: '55%', y: '50%', delay: 1.4,  size: 3  },
  { x: '35%', y: '88%', delay: 0.5,  size: 5  },
];

export default function Footer({ cms = {} }: { cms?: Cms }) {
  const ctaText   = cms['hp:footerCtaText']   ?? 'Get Started';
  const tagline   = cms['hp:footerTagline']   ?? 'Career growth & global education, designed around your outcome — not our revenue.';
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

  /* stats for the banner strip */
  const STATS = [
    { num: 40,   suffix: '+',  label: 'Companies' },
    { num: 1000, suffix: '+',  label: 'Placed'    },
    { num: 20,   suffix: '+',  label: 'Countries' },
    { num: 10,   suffix: '+',  label: 'Years Exp' },
  ];

  return (
    <footer className="placedly-footer">

      {/* ══════════════════════════════════════════════
          DECORATIVE PARTICLES
      ══════════════════════════════════════════════ */}
      {PARTICLES.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* ══════════════════════════════════════════════
          GLOWING BLOBS
      ══════════════════════════════════════════════ */}
      <span aria-hidden className="pf-blob pf-blob--tl" />
      <span aria-hidden className="pf-blob pf-blob--br" />
      <span aria-hidden className="pf-blob pf-blob--c"  />

      <div className="placedly-footer-wrap">

        {/* ══════════════════════════════════════════
            HERO BANNER — orange gradient strip
        ══════════════════════════════════════════ */}
        <div className="pf-banner">
          <div className="pf-banner-shine" aria-hidden />
          <div className="pf-banner-content">
            <div className="pf-banner-left">
              <span className="pf-banner-kicker">
                <Sparkles size={12} strokeWidth={2.5} aria-hidden />
                Zero upfront. Results first.
              </span>
              <h2 className="pf-banner-title">
                We only get paid after<br />
                <em>you get placed.</em>
              </h2>
            </div>
            <Link href="/contact" className="pf-banner-cta">
              {ctaText}
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            STATS ROW
        ══════════════════════════════════════════ */}
        <div className="pf-stats-row">
          {STATS.map((s, i) => (
            <div key={i} className="pf-stat">
              <strong className="pf-stat-value">
                <AnimCounter target={s.num} suffix={s.suffix} />
              </strong>
              <span className="pf-stat-label">{s.label}</span>
              {i < STATS.length - 1 && (
                <span aria-hidden className="pf-stat-divider" />
              )}
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════
            MAIN GRID
        ══════════════════════════════════════════ */}
        <div className="pf-grid">

          {/* Col 1 — Brand */}
          <div className="pf-col pf-col--brand">
            <Link href="/" className="pf-brand">
              <span className="pf-brand-mark">P</span>
              <span className="pf-brand-text">Placedly</span>
            </Link>
            <p className="pf-tagline">{tagline}</p>
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

          {/* Col 2 — Navigate */}
          <div className="pf-col">
            <h4 className="pf-col-title">Navigate</h4>
            <ul className="pf-list">
              {[
                { href: '/',            label: 'Home'          },
                { href: '/about-us',    label: 'About Us'      },
                { href: '/cap',         label: 'CAP'           },
                { href: '/study-visa',  label: 'Study Abroad'  },
                { href: '/services',    label: 'Services'      },
                { href: '/contact',     label: 'Contact'       },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="pf-link">
                    <span className="pf-link-dot" aria-hidden />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div className="pf-col">
            <h4 className="pf-col-title">Get in touch</h4>
            <ul className="pf-list pf-list--contact">
              <li>
                <a
                  href={`https://wa.me/${wa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pf-contact-item"
                >
                  <span className="pf-contact-icon">
                    <MessageCircle size={13} strokeWidth={2} />
                  </span>
                  <span>
                    <span className="pf-contact-label">WhatsApp</span>
                    <span className="pf-contact-meta">Chat with an advisor</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="pf-contact-item">
                  <span className="pf-contact-icon">
                    <Mail size={13} strokeWidth={2} />
                  </span>
                  <span>
                    <span className="pf-contact-label">Email</span>
                    <span className="pf-contact-meta">{email}</span>
                  </span>
                </a>
              </li>
              <li>
                <span className="pf-contact-item pf-contact-item--static">
                  <span className="pf-contact-icon">
                    <MapPin size={13} strokeWidth={2} />
                  </span>
                  <span>
                    <span className="pf-contact-label">Office</span>
                    <span className="pf-contact-meta">Delhi NCR, India</span>
                  </span>
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4 — CTA card */}
          <div className="pf-col pf-col--cta">
            <div className="pf-cta-card">
              <span className="pf-cta-card-glow" aria-hidden />
              <h4 className="pf-cta-card-title">Ready to begin?</h4>
              <p className="pf-cta-card-sub">
                Free consultation. Zero upfront.<br />Built around your outcome.
              </p>
              <Link href="/contact" className="pf-cta-card-btn">
                Book Free Call
                <ArrowUpRight size={12} strokeWidth={2.5} />
              </Link>
              <Link href="/cap" className="pf-cta-card-secondary">
                Learn about CAP →
              </Link>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            BOTTOM BAR
        ══════════════════════════════════════════ */}
        <div className="pf-bottom">
          <p className="pf-copyright">{copyright}</p>
          <div className="pf-bottom-right">
            <span className="pf-pulse" aria-hidden />
            <span className="pf-status">All systems operational</span>
            <a href="#Top" className="pf-scroll-top" aria-label="Back to top">
              <ArrowUp size={13} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          STYLES
      ══════════════════════════════════════════ */}
      <style>{`

        @keyframes fp-float {
          from { transform: translateY(0px) scale(1);   opacity: 0.6; }
          to   { transform: translateY(-14px) scale(1.2); opacity: 1;   }
        }

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
          /* ★ ORANGE gradient background */
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

        /* ── Blobs ── */
        .pf-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .pf-blob--tl {
          top: -10%; left: -8%;
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(253,186,116,0.35) 0%, transparent 70%);
          animation: fp-float 8s ease-in-out 0s infinite alternate;
        }
        .pf-blob--br {
          bottom: -15%; right: -8%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(124,26,0,0.5) 0%, transparent 70%);
          animation: fp-float 10s ease-in-out 1.5s infinite alternate;
        }
        .pf-blob--c {
          top: 30%; left: 38%;
          width: 600px; height: 300px;
          background: radial-gradient(ellipse, rgba(249,115,22,0.20) 0%, transparent 70%);
          animation: fp-float 12s ease-in-out 0.8s infinite alternate;
        }

        /* ── Wrap ── */
        .placedly-footer-wrap {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px clamp(20px, 4vw, 40px) 0;
        }

        /* ════════════════════════════════════════
           BANNER
        ════════════════════════════════════════ */
        .pf-banner {
          position: relative;
          overflow: hidden;
          background: rgba(0,0,0,0.22);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 20px;
          padding: 28px 32px;
          margin-bottom: 32px;
          isolation: isolate;
        }
        .pf-banner-shine {
          position: absolute;
          top: 0; left: -60%;
          width: 40%; height: 100%;
          background: linear-gradient(115deg,
            transparent, rgba(255,255,255,0.10), transparent);
          transform: skewX(-20deg);
          animation: pf-shine 5s ease-in-out 1s infinite;
          pointer-events: none;
        }
        @keyframes pf-shine {
          0%   { left: -60%; }
          100% { left: 140%;  }
        }
        .pf-banner-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .pf-banner-kicker {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em !important;
          color: rgba(255,255,255,0.75);
          margin-bottom: 8px;
        }
        .pf-banner-title {
          font-size: clamp(1.3rem, 2.8vw, 2rem);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.03em !important;
          color: #ffffff;
          margin: 0;
        }
        .pf-banner-title em {
          font-style: normal;
          color: #fdba74;
          font-weight: 900;
        }
        .pf-banner-cta {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 14px 26px;
          background: #ffffff !important;
          color: ${ORANGE_DARK} !important;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 800;
          text-decoration: none !important;
          letter-spacing: -0.01em !important;
          white-space: nowrap;
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }
        .pf-banner-cta:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 14px 32px rgba(0,0,0,0.25);
          filter: brightness(0.96);
        }
        .pf-banner-cta:active {
          transform: translateY(0) scale(0.98);
        }

        /* ════════════════════════════════════════
           STATS ROW
        ════════════════════════════════════════ */
        .pf-stats-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          background: rgba(0,0,0,0.18);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;
          padding: 10px 8px;
          margin-bottom: 40px;
          flex-wrap: nowrap;
          overflow: hidden;
        }
        .pf-stat {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          flex: 1;
          padding: 6px 12px;
          cursor: default;
          border-radius: 999px;
          transition: background 0.2s ease;
        }
        .pf-stat:hover {
          background: rgba(255,255,255,0.08);
        }
        .pf-stat-value {
          font-size: clamp(15px, 2vw, 20px) !important;
          font-weight: 900 !important;
          letter-spacing: -0.03em !important;
          color: #ffffff !important;
          line-height: 1.1;
        }
        .pf-stat-label {
          font-size: 10px !important;
          font-weight: 600 !important;
          letter-spacing: 0.04em !important;
          color: rgba(255,255,255,0.65) !important;
          text-transform: uppercase;
        }
        .pf-stat-divider {
          position: absolute;
          right: 0; top: 20%;
          height: 60%; width: 1px;
          background: rgba(255,255,255,0.18);
          border-radius: 1px;
        }

        /* ════════════════════════════════════════
           MAIN GRID
        ════════════════════════════════════════ */
        .pf-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1.2fr 1.2fr;
          gap: clamp(24px, 4vw, 56px);
          align-items: start;
          padding-bottom: 36px;
        }

        /* ── Brand ── */
        .pf-brand {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none !important;
          color: #ffffff !important;
          margin-bottom: 14px;
        }
        .pf-brand-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px; height: 30px;
          border-radius: 9px;
          background: rgba(255,255,255,0.20);
          border: 1px solid rgba(255,255,255,0.30);
          color: #ffffff;
          font-size: 15px;
          font-weight: 900;
          letter-spacing: -0.02em !important;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .pf-brand:hover .pf-brand-mark {
          background: rgba(255,255,255,0.32);
          transform: rotate(-4deg) scale(1.06);
        }
        .pf-brand-text {
          font-size: 17px;
          font-weight: 800;
          letter-spacing: -0.025em !important;
        }
        .pf-tagline {
          font-size: 12.5px;
          line-height: 1.6;
          color: rgba(255,255,255,0.65);
          margin: 0 0 18px;
          max-width: 270px;
        }
        .pf-socials {
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .pf-social {
          width: 32px; height: 32px;
          border-radius: 9px;
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
          transform: translateY(-3px) rotate(-4deg);
        }

        /* ── Nav column ── */
        .pf-col-title {
          font-size: 10px !important;
          font-weight: 700 !important;
          letter-spacing: 0.15em !important;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin: 0 0 14px;
        }
        .pf-list {
          list-style: none;
          margin: 0; padding: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .pf-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 0;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.72) !important;
          text-decoration: none !important;
          transition: color 0.2s ease, transform 0.2s ease, gap 0.2s ease;
        }
        .pf-link:hover {
          color: #ffffff !important;
          transform: translateX(4px);
          gap: 10px;
        }
        .pf-link-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: rgba(255,255,255,0.35);
          flex-shrink: 0;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .pf-link:hover .pf-link-dot {
          background: #fdba74;
          transform: scale(1.5);
        }

        /* ── Contact column ── */
        .pf-list--contact { gap: 4px; }
        .pf-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 8px 10px;
          border-radius: 10px;
          text-decoration: none !important;
          transition: background 0.2s ease, transform 0.2s ease;
          cursor: pointer;
        }
        .pf-contact-item:hover {
          background: rgba(255,255,255,0.10);
          transform: translateX(3px);
        }
        .pf-contact-item--static { cursor: default; }
        .pf-contact-item--static:hover { transform: none; }
        .pf-contact-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px; height: 26px;
          border-radius: 7px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.16);
          color: rgba(255,255,255,0.85) !important;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .pf-contact-label {
          display: block;
          font-size: 12.5px;
          font-weight: 700;
          color: #ffffff !important;
          line-height: 1.2;
        }
        .pf-contact-meta {
          display: block;
          font-size: 11px;
          color: rgba(255,255,255,0.55) !important;
          line-height: 1.4;
          margin-top: 1px;
        }

        /* ── CTA card ── */
        .pf-cta-card {
          position: relative;
          overflow: hidden;
          background: rgba(0,0,0,0.22);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 16px;
          padding: 20px;
          isolation: isolate;
        }
        .pf-cta-card-glow {
          position: absolute;
          top: -30px; right: -30px;
          width: 120px; height: 120px;
          background: radial-gradient(circle, rgba(253,186,116,0.3) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .pf-cta-card-title {
          position: relative; z-index: 1;
          font-size: 15px !important;
          font-weight: 800 !important;
          color: #ffffff !important;
          margin: 0 0 7px;
        }
        .pf-cta-card-sub {
          position: relative; z-index: 1;
          font-size: 11.5px !important;
          line-height: 1.5;
          color: rgba(255,255,255,0.62) !important;
          margin: 0 0 16px;
        }
        .pf-cta-card-btn {
          position: relative; z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 10px 18px;
          background: #ffffff !important;
          color: ${ORANGE_DARK} !important;
          border-radius: 999px;
          font-size: 12.5px;
          font-weight: 800;
          text-decoration: none !important;
          letter-spacing: -0.01em !important;
          white-space: nowrap;
          box-shadow: 0 6px 18px rgba(0,0,0,0.20);
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
          margin-bottom: 10px;
          width: 100%;
          justify-content: center;
        }
        .pf-cta-card-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(0,0,0,0.28);
          filter: brightness(0.96);
        }
        .pf-cta-card-secondary {
          position: relative; z-index: 1;
          display: block;
          text-align: center;
          font-size: 11.5px;
          font-weight: 600;
          color: rgba(255,255,255,0.60) !important;
          text-decoration: none !important;
          transition: color 0.2s ease;
          letter-spacing: -0.005em !important;
        }
        .pf-cta-card-secondary:hover {
          color: #fdba74 !important;
        }

        /* ════════════════════════════════════════
           BOTTOM BAR
        ════════════════════════════════════════ */
        .pf-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 18px 0;
          border-top: 1px solid rgba(255,255,255,0.12);
          flex-wrap: wrap;
        }
        .pf-copyright {
          font-size: 11.5px !important;
          color: rgba(255,255,255,0.45) !important;
          margin: 0;
        }
        .pf-bottom-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .pf-pulse {
          display: inline-block;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 0 0 rgba(74,222,128,0.5);
          animation: pf-pulse 2.4s ease-out infinite;
        }
        @keyframes pf-pulse {
          0%   { box-shadow: 0 0 0 0   rgba(74,222,128,0.5); }
          70%  { box-shadow: 0 0 0 7px rgba(74,222,128,0);   }
          100% { box-shadow: 0 0 0 0   rgba(74,222,128,0);   }
        }
        .pf-status {
          font-size: 11px !important;
          font-weight: 600 !important;
          color: rgba(255,255,255,0.55) !important;
        }
        .pf-scroll-top {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px; height: 32px;
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
        @media (max-width: 1024px) {
          .pf-grid {
            grid-template-columns: 1fr 1fr;
            gap: 28px 36px;
          }
          .pf-col--cta { grid-column: span 2; }
          .pf-cta-card {
            display: flex;
            align-items: center;
            gap: 24px;
            flex-wrap: wrap;
          }
          .pf-cta-card-title,
          .pf-cta-card-sub { margin-bottom: 0; flex: 1; min-width: 200px; }
          .pf-cta-card-btn { width: auto; margin-bottom: 0; }
          .pf-cta-card-secondary { display: none; }
        }
        @media (max-width: 768px) {
          .placedly-footer-wrap { padding-top: 36px; }
          .pf-banner { padding: 22px 20px; }
          .pf-banner-title { font-size: 1.3rem; }
          .pf-stats-row {
            border-radius: 16px;
            padding: 8px 4px;
            flex-wrap: nowrap;
          }
          .pf-stat { padding: 4px 8px; }
          .pf-stat-value { font-size: 15px !important; }
          .pf-stat-label { font-size: 9px !important; }
          .pf-grid {
            grid-template-columns: 1fr;
            gap: 22px;
          }
          .pf-col--cta { grid-column: span 1; }
          .pf-cta-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .pf-cta-card-btn { width: 100%; margin-bottom: 0; }
          .pf-cta-card-secondary { display: block; }
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
          .pf-banner-content { flex-direction: column; align-items: flex-start; }
          .pf-banner-cta { width: 100%; justify-content: center; }
          .pf-stats-row { border-radius: 12px; }
          .pf-stat-value { font-size: 13px !important; }
          .pf-stat-label { font-size: 8px !important; }
        }
      `}</style>
    </footer>
  );
}