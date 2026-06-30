'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Share2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import HeroMobileBrief from './HeroMobileBrief';
import HeroGradientBg from './HeroGradientBg';
import HeroBgVideo from './HeroBgVideo';
import HiringPartnersMarquee from './HiringPartnersMarquee';

type HeroCms = { [k: string]: string };

/** Static portrait URLs — loose zig-zag spacing like reference hero */
const SCATTER_AVATARS = [
  {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face',
    top: '0%',
    left: '0%',
    size: 46,
    badge: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face',
    top: '2%',
    left: '72%',
    size: 44,
    badge: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face',
    top: '38%',
    left: '6%',
    size: 50,
    badge: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face',
    top: '70%',
    left: '0%',
    size: 44,
    badge: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face',
    top: '66%',
    left: '74%',
    size: 48,
    badge: true,
  },
] as const;

const HERO_CARD_AVATARS = {
  left: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face',
  right: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
} as const;

export default function Hero({ cms = {} }: { cms?: HeroCms }) {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.96, 0.86]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.02]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 22]);

  const offerRole = cms['hp:heroOfferRole'] ?? 'Senior Claims Analyst';
  const admitProgramme = cms['hp:heroAdmitProgramme'] ?? "MSc International Business · Fall '25";

  return (
    <section id="Top" className="placedly-lift-hero" ref={heroRef}>
      <motion.div className="placedly-hero-desktop-gradient" aria-hidden style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}>
        <HeroGradientBg />
        <HeroBgVideo />
      </motion.div>
      <div className="placedly-hero-desktop-only">
        <motion.div className="placedly-lift-hero-copy" style={{ y: copyY }}>
        <motion.h1
          className="placedly-lift-hero-title"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          Grow your career,
          <br />
          through people you trust.
        </motion.h1>

        <motion.p
          className="placedly-lift-hero-sub"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          {cms['hp:heroSubline'] ??
            'Career Placement & Global Education Consultancy — Delhi NCR.'}
        </motion.p>

        <motion.div
          className="placedly-lift-hero-ctas"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
        >
          <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link href="/study-visa" className="placedly-lift-hero-btn">
              {cms['hp:heroSecondaryCtaText'] ?? 'Study Abroad'}
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="placedly-lift-hero-stage"
        style={{ y: stageY }}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.28 }}
      >
        <motion.div
          className="placedly-lift-network"
          animate={{ y: [0, -6, 0], x: [0, 2, 0], scale: [1, 1.004, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="placedly-lift-card placedly-lift-card--left"
            animate={{ y: [0, -8, 0] }}
            whileHover={{ scale: 1.015, y: -6, rotate: -1 }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="placedly-lift-card-profile">
              <img
                src={HERO_CARD_AVATARS.left}
                alt=""
                className="placedly-lift-avatar placedly-lift-avatar--photo"
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
              />
              <div className="placedly-lift-card-identity">
                <p className="placedly-lift-name">
                  {cms['hp:heroOfferName'] ?? 'Priya'}
                </p>
                <p className="placedly-lift-role">CAP · India careers</p>
              </div>
            </div>
            <p className="placedly-lift-card-line">
              Targeting <strong>{offerRole}</strong>
            </p>
          </motion.div>

          <div className="placedly-lift-connect" aria-hidden>
            <div className="placedly-lift-scatter">
              {SCATTER_AVATARS.map((person, i) => (
                <div
                  key={person.src}
                  className="placedly-lift-scatter-avatar-wrap"
                  style={{
                    top: person.top,
                    left: person.left,
                    width: person.size,
                    height: person.size,
                    zIndex: i + 1,
                  }}
                >
                  <img
                    src={person.src}
                    alt=""
                    className="placedly-lift-scatter-avatar"
                    width={person.size}
                    height={person.size}
                    loading="lazy"
                    decoding="async"
                  />
                  {person.badge && (
                    <span className="placedly-lift-scatter-badge">
                      <Share2 size={11} strokeWidth={2.5} />
                    </span>
                  )}
                </div>
              ))}

              <div className="placedly-lift-glass-pill placedly-lift-glass-pill--share">
                <span className="placedly-lift-glass-pill-icon">
                  <Share2 size={14} strokeWidth={2.25} />
                </span>
                <span className="placedly-lift-glass-pill-text">
                  <strong>Shared</strong>
                  <span>CAP roadmap</span>
                </span>
              </div>

              <div className="placedly-lift-glass-pill placedly-lift-glass-pill--rec">
                <span className="placedly-lift-glass-pill-icon">
                  <Sparkles size={14} strokeWidth={2.25} />
                </span>
                <span className="placedly-lift-glass-pill-text">
                  <strong>Recommended</strong>
                  <span>Admit path</span>
                </span>
              </div>
            </div>
          </div>

          <motion.div
            className="placedly-lift-card placedly-lift-card--right"
            animate={{ y: [0, 8, 0] }}
            whileHover={{ scale: 1.015, y: 4, rotate: 1 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          >
            <div className="placedly-lift-card-profile">
              <img
                src={HERO_CARD_AVATARS.right}
                alt=""
                className="placedly-lift-avatar placedly-lift-avatar--photo"
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
              />
              <div className="placedly-lift-card-identity">
                <p className="placedly-lift-name">
                  {cms['hp:heroAdmitName'] ?? 'Arjun'}
                </p>
                <p className="placedly-lift-role">Study abroad track</p>
              </div>
            </div>
            <p className="placedly-lift-card-line">
              Interested in <strong>{admitProgramme.split('·')[0]?.trim() ?? 'UK Masters'}</strong>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
      </div>

      <HeroMobileBrief cms={cms} />

      <HiringPartnersMarquee cms={cms} />
    </section>
  );
}
