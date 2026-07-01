'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
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

/* ─── Gradient Text Helper ─── */
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

/* ─── Single Industry Card ─── */
function IndustryCard({
  ind,
  index,
  isActive,
  onClick,
}: {
  ind: Industry;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <motion.article
      ref={cardRef}
      onClick={onClick}
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
        layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      style={{
        position: 'relative',
        flexShrink: 0,
        width: isActive ? 'clamp(340px, 46vw, 520px)' : 'clamp(220px, 26vw, 300px)',
        borderRadius: '24px',
        overflow: 'hidden',
        background: '#fff',
        border: `1px solid ${isActive ? `${ACCENT.from}30` : 'rgba(15,23,42,0.06)'}`,
        boxShadow: isActive
          ? `0 24px 60px rgba(37,99,235,0.14)`
          : '0 8px 28px rgba(15,23,42,0.06)',
        cursor: isActive ? 'default' : 'pointer',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease',
        minHeight: '480px',
      }}
    >
      {/* Gradient border glow */}
      <motion.span
        aria-hidden
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '24px',
          padding: '1.5px',
          background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})`,
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Media — full top image */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: isActive ? '220px' : '180px',
          transition: 'height 0.5s cubic-bezier(0.22,1,0.36,1)',
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
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
          }}
        >
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

        {/* Icon badge bottom-left of image */}
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

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(18px, 2.5vw, 28px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          flex: 1,
        }}
      >
        <h3
          style={{
            fontSize: isActive ? 'clamp(1.1rem, 2vw, 1.4rem)' : '1rem',
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
            color: '#0f172a',
            margin: 0,
            transition: 'font-size 0.4s ease',
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

        {/* Expanded details — only visible when active */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              key="details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <p
                style={{
                  fontSize: '13.5px',
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
                  marginTop: '12px',
                }}
              >
                {ind.companies.map((c) => (
                  <span
                    key={c}
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 600,
                      color: '#334155',
                      padding: '5px 10px',
                      borderRadius: '999px',
                      background: 'rgba(37,99,235,0.05)',
                      border: '1px solid rgba(37,99,235,0.12)',
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed teaser — visible when inactive */}
        <AnimatePresence>
          {!isActive && (
            <motion.p
              key="teaser"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                fontSize: '12.5px',
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

        {/* Footer */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '14px',
            borderTop: '1px solid rgba(15,23,42,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <strong
              style={{
                fontSize: isActive ? '1.4rem' : '1.1rem',
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
            <span style={{ fontSize: '11px', color: '#8b95a5', fontWeight: 600 }}>
              {ind.statLabel}
            </span>
          </div>

          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.85, x: 10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                whileHover="hover"
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
                    padding: '10px 18px',
                    borderRadius: '999px',
                    background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})`,
                    boxShadow: `0 8px 22px ${ACCENT.from}35`,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {ind.linkText}
                  <motion.span
                    variants={{ rest: { x: 0 }, hover: { x: 3 } }}
                    style={{ display: 'inline-flex' }}
                  >
                    <ArrowUpRight size={14} strokeWidth={2.6} />
                  </motion.span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand hint for inactive cards */}
          <AnimatePresence>
            {!isActive && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: ACCENT.from,
                  opacity: 0.7,
                }}
              >
                Tap to expand →
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Dot Indicator ─── */
function DotIndicator({
  total,
  active,
  onDotClick,
}: {
  total: number;
  active: number;
  onDotClick: (i: number) => void;
}) {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          aria-label={`Go to card ${i + 1}`}
          style={{
            width: i === active ? '28px' : '8px',
            height: '8px',
            borderRadius: '999px',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            background:
              i === active
                ? `linear-gradient(90deg, ${ACCENT.from}, ${ACCENT.to})`
                : 'rgba(15,23,42,0.15)',
            transition: 'width 0.4s cubic-bezier(0.22,1,0.36,1), background 0.3s ease',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Section ─── */
export default function Industries() {
  const [activeIndex, setActiveIndex] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);

  const prev = () => setActiveIndex((i) => Math.max(i - 1, 0));
  const next = () => setActiveIndex((i) => Math.min(i + 1, industries.length - 1));

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
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(36px, 5vw, 56px)',
          }}
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

        {/* ── Row of Cards ── */}
        <div
          ref={rowRef}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 'clamp(14px, 2vw, 20px)',
            alignItems: 'stretch',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: '8px',
          }}
        >
          {industries.map((ind, i) => (
            <IndustryCard
              key={ind.serial}
              ind={ind}
              index={i}
              isActive={i === activeIndex}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>

        {/* ── Controls ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            marginTop: 'clamp(28px, 4vw, 44px)',
          }}
        >
          {/* Prev */}
          <motion.button
            onClick={prev}
            disabled={activeIndex === 0}
            whileHover={{ scale: activeIndex === 0 ? 1 : 1.08 }}
            whileTap={{ scale: activeIndex === 0 ? 1 : 0.94 }}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: `1.5px solid ${activeIndex === 0 ? 'rgba(15,23,42,0.1)' : `${ACCENT.from}50`}`,
              background: activeIndex === 0 ? 'rgba(15,23,42,0.03)' : '#fff',
              color: activeIndex === 0 ? 'rgba(15,23,42,0.3)' : ACCENT.from,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: activeIndex === 0 ? 'not-allowed' : 'pointer',
              boxShadow:
                activeIndex === 0
                  ? 'none'
                  : `0 4px 14px ${ACCENT.from}20`,
              transition: 'all 0.3s ease',
            }}
          >
            <ArrowLeft size={18} strokeWidth={2.2} />
          </motion.button>

          {/* Dots */}
          <DotIndicator
            total={industries.length}
            active={activeIndex}
            onDotClick={setActiveIndex}
          />

          {/* Next */}
          <motion.button
            onClick={next}
            disabled={activeIndex === industries.length - 1}
            whileHover={{ scale: activeIndex === industries.length - 1 ? 1 : 1.08 }}
            whileTap={{ scale: activeIndex === industries.length - 1 ? 1 : 0.94 }}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: `1.5px solid ${
                activeIndex === industries.length - 1
                  ? 'rgba(15,23,42,0.1)'
                  : `${ACCENT.from}50`
              }`,
              background:
                activeIndex === industries.length - 1 ? 'rgba(15,23,42,0.03)' : '#fff',
              color:
                activeIndex === industries.length - 1
                  ? 'rgba(15,23,42,0.3)'
                  : ACCENT.from,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor:
                activeIndex === industries.length - 1 ? 'not-allowed' : 'pointer',
              boxShadow:
                activeIndex === industries.length - 1
                  ? 'none'
                  : `0 4px 14px ${ACCENT.from}20`,
              transition: 'all 0.3s ease',
            }}
          >
            <ArrowRight size={18} strokeWidth={2.2} />
          </motion.button>
        </motion.div>
      </div>

      <style>{`
        /* Hide scrollbar */
        #domains [style*="overflow-x"] {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        #domains [style*="overflow-x"]::-webkit-scrollbar {
          display: none;
        }

        /* Image zoom on card hover */
        .industry-img {
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        article:hover .industry-img {
          transform: scale(1.05);
        }

        /* Mobile: all cards same width, horizontal scroll */
        @media (max-width: 700px) {
          #domains article {
            width: clamp(280px, 80vw, 340px) !important;
            min-height: 420px !important;
            scroll-snap-align: start;
          }
        }
      `}</style>
    </section>
  );
}