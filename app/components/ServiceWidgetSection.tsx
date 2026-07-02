'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import {
  Target,
  TrendingUp,
  Globe2,
  ArrowRight,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

/* ────────────────────────────────────────────────────────────
   Shared theme tokens — identical gradient used across the site
──────────────────────────────────────────────────────────── */

const HEADING_GRADIENT =
  'linear-gradient(270deg, #2563eb 0%, #4f46e5 20%, #f97316 45%, #f43f5e 65%, #9333ea 85%, #2563eb 100%)';

const headingGradientStyle: React.CSSProperties = {
  backgroundImage: HEADING_GRADIENT,
  backgroundSize: '200% 200%',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
};

type Accent = { from: string; to: string; soft: string; border: string };

function makeAccent(from: string, to: string): Accent {
  return { from, to, soft: `${from}14`, border: `${from}30` };
}

type Service = {
  id: string;
  label: string;
  Icon: LucideIcon;
  title: string;
  description: string;
  meta: string;
  cta: string;
  href: string;
  accent: Accent;
};

const SERVICES: Service[] = [
  {
    id: 'placement',
    label: 'Placement Services',
    Icon: Target,
    title: 'Placement Services',
    description:
      'Get placed in BPO, KPO, LPO, IT or MNC roles across India. Zero upfront. Offer first.',
    meta: 'Zero Upfront · Offer First',
    cta: 'Apply Now',
    href: '/cap/apply',
    accent: makeAccent('#2563eb', '#4f46e5'),
  },
  {
    id: 'career',
    label: 'Career Assistance',
    Icon: TrendingUp,
    title: 'Career Assistance',
    description:
      'Transform your profile — CV to offer letter, end to end. Success-share fee. Only on confirmed offer.',
    meta: 'Success-Fee Only',
    cta: 'Enrol Now',
    href: '/cap',
    accent: makeAccent('#f97316', '#f43f5e'),
  },
  {
    id: 'study',
    label: 'Study Abroad',
    Icon: Globe2,
    title: 'Study Abroad',
    description:
      'UK • Germany • France • Dubai. End-to-end international education advisory. Free counselling.',
    meta: 'Free Counselling',
    cta: 'Get Started',
    href: '/study-visa',
    accent: makeAccent('#9333ea', '#2563eb'),
  },
];

/* ────────────────────────────────────────────────────────────
   Tilt-hover card
──────────────────────────────────────────────────────────── */

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const springX = useSpring(mx, { stiffness: 180, damping: 20 });
  const springY = useSpring(my, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(springY, [0, 1], [7, -7]);
  const rotateY = useTransform(springX, [0, 1], [-7, 7]);
  const glowX = useTransform(springX, [0, 1], ['0%', '100%']);
  const glowY = useTransform(springY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const resetTilt = () => {
    mx.set(0.5);
    my.set(0.5);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={resetTilt}
      style={{
        perspective: 1200,
      }}
      className="service-card-outer"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="service-card"
      >
        {/* cursor-follow glow */}
        <motion.div
          aria-hidden
          className="service-card-glow"
          style={{
            left: glowX,
            top: glowY,
            background: `radial-gradient(circle, ${service.accent.from}35 0%, transparent 65%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* number watermark */}
        <span className="service-card-num" style={{ color: service.accent.from }}>
          0{index + 1}
        </span>

        <div className="service-card-body">
          <motion.span
            className="service-card-icon"
            style={{
              background: `linear-gradient(135deg, ${service.accent.from}, ${service.accent.to})`,
              boxShadow: `0 10px 26px ${service.accent.soft}`,
            }}
            animate={hovered ? { rotate: [0, -8, 8, 0], scale: 1.06 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <service.Icon size={22} strokeWidth={2.2} color="#fff" />
          </motion.span>

          <span
            className="service-card-meta"
            style={{ color: service.accent.from, background: service.accent.soft }}
          >
            {service.meta}
          </span>

          <h3 className="service-card-title">{service.title}</h3>
          <p className="service-card-desc">{service.description}</p>

          <Link href={service.href} className="service-card-cta" style={{
            background: `linear-gradient(135deg, ${service.accent.from}, ${service.accent.to})`,
            boxShadow: `0 10px 24px ${service.accent.soft}`,
          }}>
            <span className="service-card-cta-shine" aria-hidden />
            <span style={{ position: 'relative', zIndex: 1 }}>{service.cta}</span>
            <ArrowRight size={16} strokeWidth={2.4} className="service-card-cta-arrow" />
          </Link>
        </div>

        {/* bottom accent line */}
        <span
          className="service-card-edge"
          style={{ backgroundImage: `linear-gradient(90deg, ${service.accent.from}, ${service.accent.to})` }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   Component
════════════════════════════════════════════════════════════ */

export default function ServiceWidgetSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section
      id="service-widget"
      style={{
        position: 'relative',
        padding: 'clamp(56px, 8vw, 96px) clamp(16px, 5vw, 24px) clamp(72px, 9vw, 120px)',
        overflow: 'hidden',
        background:
          'linear-gradient(180deg, #fafafa 0%, #f5f5fa 55%, #eef0f7 100%)',
      }}
    >
      {/* ambient blobs — static gradient family, ties into the footer transition below */}
      <div
        aria-hidden
        className="service-blob service-blob--a"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="service-blob service-blob--b"
        style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.12) 0%, transparent 70%)' }}
      />

      {/* faint dot-grid texture for depth */}
      <div className="service-grid-texture" aria-hidden />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1180px', margin: '0 auto' }}>
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 56px)' }}
        >
          <p
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: '#6366f1',
              marginBottom: '14px',
            }}
          >
            <Sparkles size={14} strokeWidth={2.25} aria-hidden />
            Choose Your Path
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.9rem, 4.2vw, 3rem)',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              ...headingGradientStyle,
            }}
          >
            What Are You Looking For?
          </h2>
        </motion.div>

        {/* ── Cards ── */}
        <div className="service-grid">
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              onMouseEnter={() => setActiveId(service.id)}
              onMouseLeave={() => setActiveId(null)}
              className={`service-grid-item${activeId && activeId !== service.id ? ' is-dimmed' : ''}`}
            >
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>

        {/* ── Reassurance strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="service-footer-note"
        >
          Not sure which path fits you?{' '}
          <Link href="/#faq" className="service-footer-note-link">
            Talk to an advisor
          </Link>{' '}
          — it&apos;s free, and takes 2 minutes.
        </motion.div>
      </div>

      <style>{`
        .service-blob {
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          filter: blur(110px);
          pointer-events: none;
          z-index: 0;
        }
        .service-blob--a { top: -14%; left: -10%; }
        .service-blob--b { bottom: -16%; right: -10%; }

        .service-grid-texture {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(15,23,42,0.05) 1px, transparent 1px);
          background-size: 26px 26px;
          -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 72%);
          mask-image: radial-gradient(ellipse at center, black 0%, transparent 72%);
          z-index: 0;
          pointer-events: none;
        }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        .service-grid-item {
          transition: opacity 0.35s ease, filter 0.35s ease;
        }
        .service-grid-item.is-dimmed {
          opacity: 0.55;
          filter: saturate(0.7);
        }

        .service-card-outer {
          height: 100%;
        }
        .service-card {
          position: relative;
          height: 100%;
          background: #fff;
          border-radius: 24px;
          border: 1px solid rgba(15, 23, 42, 0.07);
          box-shadow: 0 10px 32px rgba(15, 23, 42, 0.06);
          overflow: hidden;
          transition: box-shadow 0.3s ease;
          will-change: transform;
        }
        .service-card:hover {
          box-shadow: 0 24px 50px rgba(15, 23, 42, 0.12);
        }

        .service-card-glow {
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 0;
        }

        .service-card-num {
          position: absolute;
          top: 14px;
          right: 20px;
          font-size: 44px;
          font-weight: 800;
          opacity: 0.08;
          line-height: 1;
          z-index: 0;
          user-select: none;
        }

        .service-card-body {
          position: relative;
          z-index: 1;
          padding: 30px 26px 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transform: translateZ(24px);
        }

        .service-card-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 16px;
          flex-shrink: 0;
        }

        .service-card-meta {
          display: inline-flex;
          align-self: flex-start;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 999px;
        }

        .service-card-title {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.3;
        }

        .service-card-desc {
          font-size: 14px;
          line-height: 1.65;
          color: #5b6472;
          flex: 1;
        }

        .service-card-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          align-self: flex-start;
          margin-top: 6px;
          padding: 11px 20px;
          border-radius: 999px;
          color: #fff;
          font-weight: 700;
          font-size: 13.5px;
          overflow: hidden;
          isolation: isolate;
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease, filter 0.25s ease;
        }
        .service-card-cta:hover {
          transform: translateY(-2px);
          filter: brightness(1.06);
        }
        .service-card-cta-shine {
          position: absolute;
          top: 0;
          left: -130%;
          width: 55%;
          height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.5), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
          z-index: 0;
        }
        .service-card-cta:hover .service-card-cta-shine {
          left: 140%;
        }
        .service-card-cta-arrow {
          position: relative;
          z-index: 1;
          transition: transform 0.25s ease;
        }
        .service-card-cta:hover .service-card-cta-arrow {
          transform: translateX(3px);
        }

        .service-card-edge {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 4px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .service-card:hover .service-card-edge {
          transform: scaleX(1);
        }

        .service-footer-note {
          text-align: center;
          margin-top: 40px;
          font-size: 14px;
          color: #64748b;
        }
        .service-footer-note-link {
          font-weight: 700;
          color: #4f46e5;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s ease;
        }
        .service-footer-note-link:hover {
          color: #2563eb;
        }

        @media (max-width: 900px) {
          .service-grid {
            grid-template-columns: 1fr;
          }
          .service-blob {
            width: 320px;
            height: 320px;
          }
        }
      `}</style>
    </section>
  );
}