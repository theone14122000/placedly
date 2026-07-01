'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
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

/* ---------- gradient text helper ---------- */

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

/* ---------- single industry card ---------- */

function IndustryCard({ ind, index }: { ind: Industry; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="industry-card"
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '380px 1fr',
        borderRadius: '28px',
        overflow: 'hidden',
        background: '#fff',
        border: '1px solid rgba(15,23,42,0.06)',
        boxShadow: '0 12px 40px rgba(15,23,42,0.06)',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* animated gradient border glow on hover */}
      <motion.span
        aria-hidden
        className="industry-card-glow"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '28px',
          padding: '1.5px',
          background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})`,
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Media */}
      <div
        className="industry-media"
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '260px',
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
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(200deg, transparent 30%, rgba(10,14,25,0.55) 100%), linear-gradient(100deg, ${ACCENT.from}33 0%, transparent 55%)`,
          }}
        />

        {/* Serial number — big ghost gradient numeral */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span
            style={{
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              padding: '7px 12px',
              borderRadius: '999px',
              color: '#fff',
              background: 'rgba(255,255,255,0.14)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.25)',
            }}
          >
            {ind.serial}
          </span>
        </div>

        <div
          style={{
            position: 'absolute',
            right: '-6px',
            bottom: '-22px',
            fontSize: '96px',
            fontWeight: 900,
            lineHeight: 1,
            backgroundImage: `linear-gradient(160deg, rgba(255,255,255,0.5), rgba(255,255,255,0.05))`,
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

      {/* Content */}
      <div
        className="industry-content"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(24px, 3vw, 40px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              flexShrink: 0,
              background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})`,
              color: '#fff',
              boxShadow: `0 6px 16px ${ACCENT.from}33`,
            }}
          >
            <ind.Icon size={16} strokeWidth={2.4} />
          </span>
          <span
            style={{
              fontSize: '12.5px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            <GradientText>{ind.tag}</GradientText>
          </span>
        </div>

        <h3
          style={{
            fontSize: 'clamp(1.25rem, 2vw, 1.6rem)',
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
            color: '#0f172a',
            margin: 0,
          }}
        >
          {ind.name}
        </h3>

        {/* shimmer divider */}
        <div
          aria-hidden
          style={{
            position: 'relative',
            height: '2px',
            width: '52px',
            borderRadius: '2px',
            overflow: 'hidden',
            background: 'rgba(15,23,42,0.08)',
          }}
        >
          <motion.span
            initial={{ x: '-100%' }}
            whileInView={{ x: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.08 + 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(90deg, ${ACCENT.from}, ${ACCENT.to})`,
            }}
          />
        </div>

        <p
          style={{
            fontSize: '14.5px',
            lineHeight: 1.7,
            color: '#5b6472',
            margin: 0,
            maxWidth: '640px',
          }}
        >
          {ind.details}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '2px' }}>
          {ind.companies.map((c) => (
            <span
              key={c}
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#334155',
                padding: '6px 12px',
                borderRadius: '999px',
                background: 'rgba(37,99,235,0.05)',
                border: '1px solid rgba(37,99,235,0.12)',
              }}
            >
              {c}
            </span>
          ))}
        </div>

        <div
          style={{
            marginTop: 'auto',
            paddingTop: '18px',
            borderTop: '1px solid rgba(15,23,42,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <strong
              style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                backgroundImage: `linear-gradient(90deg, ${ACCENT.from}, ${ACCENT.to})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {ind.stat}
            </strong>
            <span style={{ fontSize: '11.5px', color: '#8b95a5', fontWeight: 600 }}>
              {ind.statLabel}
            </span>
          </div>

          <motion.div whileHover="hover" initial="rest" animate="rest">
            <Link
              href={ind.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13.5px',
                fontWeight: 700,
                color: '#fff',
                padding: '11px 20px',
                borderRadius: '999px',
                background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})`,
                boxShadow: `0 10px 24px ${ACCENT.from}30`,
                textDecoration: 'none',
              }}
            >
              {ind.linkText}
              <motion.span
                variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                transition={{ duration: 0.25 }}
                style={{ display: 'inline-flex' }}
              >
                <ArrowUpRight size={15} strokeWidth={2.6} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------- section ---------- */

export default function Industries() {
  return (
    <section
      id="domains"
      style={{
        position: 'relative',
        padding: 'clamp(64px, 9vw, 120px) clamp(16px, 5vw, 24px)',
        overflow: 'hidden',
        background: '#fbfbfd',
      }}
    >
      {/* ambient blue/orange blobs */}
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

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '980px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 64px)' }}
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
              marginBottom: '16px',
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

        {/* Single-column card list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 3vw, 32px)' }}>
          {industries.map((ind, i) => (
            <IndustryCard key={ind.serial} ind={ind} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .industry-card:hover .industry-card-glow {
          opacity: 1;
          transition: opacity 0.4s ease;
        }
        .industry-card:hover {
          box-shadow: 0 24px 60px rgba(37,99,235,0.12) !important;
        }
        .industry-card:hover .industry-media img {
          transform: scale(1.06);
        }
        .industry-media img {
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }

        @media (max-width: 860px) {
          .industry-card {
            grid-template-columns: 1fr !important;
          }
          .industry-media {
            min-height: 200px !important;
          }
        }

        @media (max-width: 480px) {
          .industry-content {
            padding: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}