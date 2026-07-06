'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ClipboardList,
  Stethoscope,
  Wallet,
  type LucideIcon,
} from 'lucide-react';

type Industry = {
  serial: string;
  name: string;
  Icon: LucideIcon;
  details: string;
  href: string;
  linkText: string;
  tag: string;
  companies: string[];
  stat: string;
  statLabel: string;
  img: string;
};

/* ★ CHANGED: Orange theme (matches navbar buttons + wordmark) ★ */
const ACCENT = { from: '#f97316', mid: '#fb923c', to: '#ea580c' };

/* Modern geometric sans-serif stack */
const GEOM_FONT_STACK = `"Inter", "Manrope", "Geist", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`;

const industries: Industry[] = [
  {
    serial: '001',
    name: 'US Healthcare Claims & Operations',
    Icon: Stethoscope,
    details:
      'CPT/ICD-10, denial management, AR follow-up, adjudication, COB — direct hiring connects at Optum, EXL, Access Healthcare, Conifer Health & WNS across India.',
    href: '/cap',
    linkText: 'View Healthcare Roles',
    tag: 'Healthcare BPO',
    companies: ['Optum', 'EXL Services', 'Access Healthcare', 'Conifer Health', 'WNS'],
    stat: '120+',
    statLabel: 'Professionals Placed',
    img: 'https://images.unsplash.com/flagged/photo-1576485436509-a7d286952b65?w=800&h=480&fit=crop&q=80',
  },
  {
    serial: '002',
    name: 'Insurance & Underwriting Operations',
    Icon: ClipboardList,
    details:
      "Lloyd's market, XIS submissions, bureau & non-bureau processing, RFT compliance, Marine, Motor, Property & AHI — specialist profiles, high-value MNC roles.",
    href: '/cap',
    linkText: 'View Insurance Roles',
    tag: 'Insurance Ops',
    companies: ["Lloyd's Market", 'XIS', 'Marine & Motor', 'AHI'],
    stat: '90+',
    statLabel: 'Specialists Placed',
    img: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&h=480&fit=crop&q=80',
  },
  {
    serial: '003',
    name: 'Finance, Accounts & BPO/KPO',
    Icon: Wallet,
    details:
      'AP/AR, reconciliation, MIS, GL accounting — BPO operations professionals targeting AM-level roles at MNC captives and GCC units in NCR.',
    href: '/cap',
    linkText: 'View Finance & BPO Roles',
    tag: 'Finance & BPO/KPO',
    companies: ['Genpact', 'WNS', 'Mphasis', 'HCL BPO', 'EXL'],
    stat: '90+',
    statLabel: 'Finance Pros Placed',
    img: 'https://images.unsplash.com/photo-1754531976828-69e42ce4e0d9?w=800&h=480&fit=crop&q=80',
  },
];

/* ─── Industry Card ─── */
function IndustryCard({
  ind,
  index,
  isHovered,
  anyHovered,
  onMouseEnter,
  onMouseLeave,
}: {
  ind: Industry;
  index: number;
  isHovered: boolean;
  anyHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const flexGrow = !anyHovered ? 1 : isHovered ? 2 : 0.6;

  return (
    <motion.article
      ref={cardRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      layout
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
        layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
      className="placedly-industries-card"
      style={{
        flexGrow,
        flexShrink: 1,
        flexBasis: 0,
        minWidth: 0,
        transition: 'flex-grow 0.45s cubic-bezier(0.22,1,0.36,1)',
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        background: '#fff',
        /* CHANGED: orange-tint border on hover (was blue) */
        border: `1px solid ${isHovered ? `${ACCENT.from}30` : 'rgba(15,23,42,0.06)'}`,
        /* CHANGED: orange-tint shadow on hover (was blue) */
        boxShadow: isHovered
          ? `0 24px 60px rgba(249, 115, 22, 0.16)`
          : '0 8px 28px rgba(15,23,42,0.06)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
        minHeight: '480px',
      }}
    >
      {/* Border glow on hover */}
      <motion.span
        aria-hidden
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '24px',
          padding: '1.5px',
          background: ACCENT.from,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Image */}
      <div
        className="placedly-industries-media"
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: isHovered ? '220px' : '180px',
          transition: 'height 0.45s cubic-bezier(0.22,1,0.36,1)',
          flexShrink: 0,
        }}
      >
        <motion.img
          src={ind.img}
          alt={ind.name}
          loading="lazy"
          className="placedly-industries-img"
          style={{
            position: 'absolute',
            inset: '-6% 0',
            width: '100%',
            height: '112%',
            objectFit: 'cover',
            y: imgY,
            scale: isHovered ? 1.05 : 1,
            transition: 'scale 0.6s cubic-bezier(0.22,1,0.36,1)',
          }}
        />

        {/* Dark overlay — orange-tint instead of blue */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, transparent 20%, rgba(10,14,25,0.65) 100%), linear-gradient(100deg, ${ACCENT.from}55 0%, transparent 60%)`,
          }}
        />

        {/* Serial badge */}
        <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
          <span className="placedly-industries-serial">{ind.serial}</span>
        </div>

        {/* Icon + tag */}
        <div className="placedly-industries-tag-row">
          <span
            className="placedly-industries-icon"
            style={{
              /* CHANGED: orange icon background + orange shadow (was blue) */
              background: ACCENT.from,
              boxShadow: `0 6px 16px ${ACCENT.from}55`,
            }}
          >
            <ind.Icon size={15} strokeWidth={2.4} />
          </span>
          <span
            className="placedly-industries-tag"
            style={{
              opacity: anyHovered && !isHovered ? 0 : 1,
              transition: 'opacity 0.3s ease',
            }}
          >
            {ind.tag}
          </span>
        </div>

        {/* Ghost numeral */}
        <div
          aria-hidden
          className="placedly-industries-ghost-num"
        >
          {ind.serial}
        </div>
      </div>

      {/* Content */}
      <div className="placedly-industries-body">
        {/* Title */}
        <h3
          className="placedly-industries-title"
          style={{
            fontSize: isHovered ? 'clamp(1.05rem, 1.8vw, 1.35rem)' : '0.95rem',
            transition: 'font-size 0.4s ease',
          }}
        >
          {ind.name}
        </h3>

        {/* Divider */}
        <div
          aria-hidden
          className="placedly-industries-divider"
        >
          <motion.span
            initial={{ x: '-100%' }}
            whileInView={{ x: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="placedly-industries-divider-fill"
            style={{ background: ACCENT.from }}
          />
        </div>

        {/* Expanded content (hover only) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <p className="placedly-industries-desc">{ind.details}</p>
              <div className="placedly-industries-companies">
                {ind.companies.map((c) => (
                  <span key={c} className="placedly-industries-company-chip">
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Teaser (not hovered) */}
        <AnimatePresence>
          {!isHovered && (
            <motion.p
              key="teaser"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="placedly-industries-teaser"
            >
              {ind.details}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="placedly-industries-footer">
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2, flexShrink: 0 }}>
            <strong
              className="placedly-industries-stat"
              style={{
                fontSize: isHovered ? '1.35rem' : '1.05rem',
                /* CHANGED: orange stat text (was blue) */
                color: ACCENT.from,
                transition: 'font-size 0.4s ease',
              }}
            >
              {ind.stat}
            </strong>
            <span className="placedly-industries-stat-label">
              {ind.statLabel}
            </span>
          </div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, x: 8 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.85, x: 8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={ind.href}
                  className="placedly-industries-cta"
                  style={{
                    /* CHANGED: orange CTA button (was blue gradient) */
                    background: ACCENT.from,
                    boxShadow: `0 8px 22px ${ACCENT.from}40`,
                  }}
                >
                  {ind.linkText}
                  <ArrowUpRight size={13} strokeWidth={2.6} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Section ─── */
export default function Industries() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="domains" className="placedly-industries-section">
      {/* Ambient blobs — orange tinted */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        className="placedly-industries-blob placedly-industries-blob--tl"
        style={{ background: `radial-gradient(circle, ${ACCENT.from}28 0%, transparent 70%)` }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="placedly-industries-blob placedly-industries-blob--br"
        style={{ background: `radial-gradient(circle, ${ACCENT.to}28 0%, transparent 70%)` }}
      />

      <div className="placedly-industries-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="placedly-industries-header"
        >
          <p className="placedly-industries-eyebrow">
            <span className="placedly-industries-eyebrow-rule" style={{ background: ACCENT.from }} />
            <span className="placedly-industries-eyebrow-text" style={{ color: ACCENT.from }}>
              Our Focus Areas
            </span>
            <span className="placedly-industries-eyebrow-rule" style={{ background: ACCENT.from }} />
          </p>
          <h2 className="placedly-industries-title">
            Domains Where We Place Talent —{' '}
            <span style={{ color: ACCENT.from }}>And Know It Deeply</span>
          </h2>
        </motion.div>

        {/* Card Row */}
        <div className="placedly-industries-row">
          {industries.map((ind, i) => (
            <IndustryCard
              key={ind.serial}
              ind={ind}
              index={i}
              isHovered={hoveredIndex === i}
              anyHovered={hoveredIndex !== null}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>

      <style>{`
        /* ============================================================
           FONT — Modern Geometric Sans-Serif
           ============================================================ */
        .placedly-industries-section,
        .placedly-industries-section * {
          font-family: ${GEOM_FONT_STACK};
          font-feature-settings: "ss01", "cv11", "cv02";
          font-optical-sizing: auto;
          letter-spacing: -0.011em;
        }

        /* ============================================================
           SECTION
           ============================================================ */
        .placedly-industries-section {
          position: relative;
          padding: clamp(64px, 9vw, 120px) 0;
          overflow: hidden;
          background: #f8fafc;
        }

        .placedly-industries-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          z-index: 0;
          pointer-events: none;
        }
        .placedly-industries-blob--tl {
          top: -14%;
          left: -10%;
          width: 480px;
          height: 480px;
        }
        .placedly-industries-blob--br {
          bottom: -16%;
          right: -8%;
          width: 520px;
          height: 520px;
          filter: blur(110px);
        }

        .placedly-industries-container {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(16px, 5vw, 40px);
        }

        /* ============================================================
           HEADER
           ============================================================ */
        .placedly-industries-header {
          text-align: center;
          margin-bottom: clamp(36px, 5vw, 56px);
        }

        .placedly-industries-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 12.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          margin: 0 0 14px;
        }

        .placedly-industries-eyebrow-rule {
          width: 24px;
          height: 2px;
          border-radius: 2px;
        }

        .placedly-industries-eyebrow-text {
          font-weight: 700;
        }

        .placedly-industries-title {
          font-size: clamp(1.8rem, 4vw, 2.75rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin: 0;
          color: #0f172a;
        }

        /* ============================================================
           ROW
           ============================================================ */
        .placedly-industries-row {
          display: flex;
          flex-direction: row;
          gap: clamp(12px, 1.8vw, 18px);
          align-items: stretch;
        }

        /* ============================================================
           CARD DETAILS
           ============================================================ */
        .placedly-industries-serial {
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          padding: 5px 11px;
          border-radius: 999px;
          color: #fff;
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.28);
        }

        .placedly-industries-tag-row {
          position: absolute;
          bottom: 16px;
          left: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .placedly-industries-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 10px;
          color: #fff;
          flex-shrink: 0;
        }

        .placedly-industries-tag {
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #fff;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
        }

        .placedly-industries-ghost-num {
          position: absolute;
          right: -4px;
          bottom: -18px;
          font-size: 88px;
          font-weight: 900;
          line-height: 1;
          color: rgba(255, 255, 255, 0.15);
          user-select: none;
          pointer-events: none;
          letter-spacing: -0.04em;
        }

        /* ============================================================
           CARD BODY
           ============================================================ */
        .placedly-industries-body {
          position: relative;
          z-index: 1;
          padding: clamp(18px, 2.5vw, 26px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
          overflow: hidden;
        }

        .placedly-industries-title {
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.02em;
          color: #0f172a;
          margin: 0;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .placedly-industries-divider {
          position: relative;
          height: 2px;
          width: 44px;
          border-radius: 2px;
          overflow: hidden;
          background: rgba(15, 23, 42, 0.08);
          flex-shrink: 0;
        }

        .placedly-industries-divider-fill {
          position: absolute;
          inset: 0;
          display: block;
        }

        .placedly-industries-desc {
          font-size: 13.5px;
          line-height: 1.7;
          color: #475569;
          margin: 0;
        }

        .placedly-industries-teaser {
          font-size: 12.5px;
          line-height: 1.6;
          color: #64748b;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .placedly-industries-companies {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 10px;
        }

        /* CHANGED: orange-tint company chips (were blue-tint) */
        .placedly-industries-company-chip {
          font-size: 11.5px;
          font-weight: 600;
          color: #9a3412;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(249, 115, 22, 0.08);
          border: 1px solid rgba(249, 115, 22, 0.18);
          white-space: nowrap;
        }

        .placedly-industries-footer {
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid rgba(15, 23, 42, 0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .placedly-industries-stat {
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .placedly-industries-stat-label {
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
          white-space: nowrap;
        }

        .placedly-industries-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          font-weight: 700;
          color: #fff;
          padding: 9px 16px;
          border-radius: 999px;
          text-decoration: none;
          white-space: nowrap;
          transition: transform 0.25s ease, filter 0.25s ease;
        }
        .placedly-industries-cta:hover {
          transform: translateY(-2px);
          filter: brightness(1.08);
        }

        /* ============================================================
           RESPONSIVE
           ============================================================ */
        @media (max-width: 700px) {
          .placedly-industries-row {
            flex-direction: column;
          }
          .placedly-industries-card {
            min-height: 380px !important;
          }
          .placedly-industries-ghost-num {
            font-size: 64px;
          }
        }

        @media (min-width: 701px) and (max-width: 1024px) {
          .placedly-industries-card {
            min-height: 440px !important;
          }
        }
      `}</style>
    </section>
  );
}