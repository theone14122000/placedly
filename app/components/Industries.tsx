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

const ACCENT = { from: '#2563eb', mid: '#7c8ff0', to: '#fb923c' };

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

/* ─── Gradient Text ─── */
function GradientText({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={{
        backgroundImage: `linear-gradient(90deg, ${ACCENT.from} 0%, ${ACCENT.mid} 50%, ${ACCENT.to} 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

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

  /*
   * Width logic:
   *  - Nothing hovered  → all equal (flex: 1)
   *  - This card hovered → flex: 2  (takes ~2× the space)
   *  - Other card hovered → flex: 0.6 (shrinks gracefully)
   */
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
      style={{
        /* flex-based expansion — no fixed widths needed */
        flexGrow,
        flexShrink: 1,
        flexBasis: 0,
        minWidth: 0,           /* allow shrinking below content width */
        transition: 'flex-grow 0.45s cubic-bezier(0.22,1,0.36,1)',

        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        background: '#fff',
        border: `1px solid ${isHovered ? `${ACCENT.from}30` : 'rgba(15,23,42,0.06)'}`,
        boxShadow: isHovered
          ? `0 24px 60px rgba(37,99,235,0.14)`
          : '0 8px 28px rgba(15,23,42,0.06)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
        minHeight: '480px',
      }}
    >
      {/* ── Gradient border glow on hover ── */}
      <motion.span
        aria-hidden
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '24px',
          padding: '1.5px',
          background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* ── Image ── */}
      <div
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

        {/* Dark overlay */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, transparent 20%, rgba(10,14,25,0.65) 100%), linear-gradient(100deg, ${ACCENT.from}44 0%, transparent 60%)`,
          }}
        />

        {/* Serial badge */}
        <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
          <span
            style={{
              fontSize: '11.5px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              padding: '5px 11px',
              borderRadius: '999px',
              color: '#fff',
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.28)',
            }}
          >
            {ind.serial}
          </span>
        </div>

        {/* Icon + tag badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})`,
              color: '#fff',
              boxShadow: `0 6px 16px ${ACCENT.from}55`,
              flexShrink: 0,
            }}
          >
            <ind.Icon size={15} strokeWidth={2.4} />
          </span>
          <span
            style={{
              fontSize: '11.5px',
              fontWeight: 700,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color: '#fff',
              textShadow: '0 1px 4px rgba(0,0,0,0.4)',
              /* hide tag label when card is narrow */
              opacity: anyHovered && !isHovered ? 0 : 1,
              transition: 'opacity 0.3s ease',
            }}
          >
            {ind.tag}
          </span>
        </div>

        {/* Ghost numeral */}
        <div
          style={{
            position: 'absolute',
            right: '-4px',
            bottom: '-18px',
            fontSize: '88px',
            fontWeight: 900,
            lineHeight: 1,
            backgroundImage: `linear-gradient(160deg, rgba(255,255,255,0.45), rgba(255,255,255,0.04))`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {ind.serial}
        </div>
      </div>

      {/* ── Content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(18px, 2.5vw, 26px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          flex: 1,
          overflow: 'hidden',   /* clip content that overflows narrow card */
        }}
      >
        {/* Title */}
        <h3
          style={{
            fontSize: isHovered ? 'clamp(1.05rem, 1.8vw, 1.35rem)' : '0.95rem',
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
            color: '#0f172a',
            margin: 0,
            transition: 'font-size 0.4s ease',
            /* prevent wrapping on narrow cards */
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: isHovered ? 3 : 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {ind.name}
        </h3>

        {/* Shimmer divider */}
        <div
          aria-hidden
          style={{
            position: 'relative',
            height: '2px',
            width: '44px',
            borderRadius: '2px',
            overflow: 'hidden',
            background: 'rgba(15,23,42,0.08)',
            flexShrink: 0,
          }}
        >
          <motion.span
            initial={{ x: '-100%' }}
            whileInView={{ x: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(90deg, ${ACCENT.from}, ${ACCENT.to})`,
            }}
          />
        </div>

        {/* ── Expanded content (hover only) ── */}
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
              <p
                style={{
                  fontSize: '13px',
                  lineHeight: 1.7,
                  color: '#5b6472',
                  margin: 0,
                }}
              >
                {ind.details}
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginTop: '10px',
                }}
              >
                {ind.companies.map((c) => (
                  <span
                    key={c}
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 600,
                      color: '#334155',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      background: 'rgba(37,99,235,0.05)',
                      border: '1px solid rgba(37,99,235,0.12)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Teaser (not hovered) ── */}
        <AnimatePresence>
          {!isHovered && (
            <motion.p
              key="teaser"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: '12px',
                lineHeight: 1.6,
                color: '#8b95a5',
                margin: 0,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {ind.details}
            </motion.p>
          )}
        </AnimatePresence>

        {/* ── Footer ── */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '12px',
            borderTop: '1px solid rgba(15,23,42,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          {/* Stat */}
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2, flexShrink: 0 }}>
            <strong
              style={{
                fontSize: isHovered ? '1.35rem' : '1.05rem',
                fontWeight: 800,
                backgroundImage: `linear-gradient(90deg, ${ACCENT.from}, ${ACCENT.to})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                transition: 'font-size 0.4s ease',
              }}
            >
              {ind.stat}
            </strong>
            <span style={{ fontSize: '11px', color: '#8b95a5', fontWeight: 600, whiteSpace: 'nowrap' }}>
              {ind.statLabel}
            </span>
          </div>

          {/* CTA — only on hovered card */}
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
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: '#fff',
                    padding: '9px 16px',
                    borderRadius: '999px',
                    background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})`,
                    boxShadow: `0 8px 22px ${ACCENT.from}35`,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
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
    <section
      id="domains"
      style={{
        position: 'relative',
        padding: 'clamp(64px, 9vw, 120px) 0',
        overflow: 'hidden',
        background: '#fbfbfd',
      }}
    >
      {/* Ambient blobs */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-14%',
          left: '-10%',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ACCENT.from}22 0%, transparent 70%)`,
          filter: 'blur(100px)',
          zIndex: 0,
        }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '-16%',
          right: '-8%',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ACCENT.to}22 0%, transparent 70%)`,
          filter: 'blur(110px)',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(16px, 5vw, 40px)',
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 56px)' }}
        >
          <p
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginBottom: '14px',
            }}
          >
            <span
              style={{
                width: '18px',
                height: '2px',
                background: `linear-gradient(90deg, ${ACCENT.from}, ${ACCENT.to})`,
                borderRadius: '2px',
              }}
            />
            <GradientText>Our Focus Areas</GradientText>
            <span
              style={{
                width: '18px',
                height: '2px',
                background: `linear-gradient(90deg, ${ACCENT.to}, ${ACCENT.from})`,
                borderRadius: '2px',
              }}
            />
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: 0,
              color: '#0f172a',
            }}
          >
            Domains Where We Place Talent —{' '}
            <GradientText>And Know It Deeply</GradientText>
          </h2>
        </motion.div>

        {/* ── Card Row ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 'clamp(12px, 1.8vw, 18px)',
            alignItems: 'stretch',
          }}
        >
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
        /* Mobile — stack vertically, equal width */
        @media (max-width: 700px) {
          #domains > div > div:last-child {
            flex-direction: column !important;
          }
          #domains article {
            min-height: 380px !important;
          }
        }
      `}</style>
    </section>
  );
}