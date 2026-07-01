/* eslint-disable @next/next/no-img-element */
export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import {
  Target,
  DollarSign,
  Handshake,
  Globe,
  Building2,
  TrendingUp,
  Rocket,
  Plane,
  Trophy,
  Sparkles,
  ArrowRight,
  Quote,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { getCmsMap, parseCmsJson } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'About Us — Placedly',
  description:
    "Learn about Placedly — Delhi NCR's career placement and global education consultancy.",
};

const ICON_MAP: Record<string, LucideIcon> = {
  Target,
  DollarSign,
  Handshake,
  Globe,
  Building2,
  TrendingUp,
};

const DEFAULT_VALUES = [
  {
    Icon: Target,
    color: '#2145fb',
    bg: '#eff6ff',
    title: 'Personalised, Always',
    desc: 'No two careers are the same. Every candidate gets a bespoke roadmap built around their skills, goals, and target industry — not a generic playbook.',
  },
  {
    Icon: DollarSign,
    color: '#16a34a',
    bg: '#f0fdf4',
    title: 'Zero Upfront',
    desc: 'We believe in putting our money where our mouth is. Career Assistance Fee of 12% is charged only after you receive your offer letter. Our success is tied directly to yours.',
  },
  {
    Icon: Handshake,
    color: '#f97316',
    bg: '#fff7ed',
    title: 'End-to-End Partnership',
    desc: 'From CV rebuild to day 90 in your new role — we stay with you through every step, including salary negotiation and joining support.',
  },
  {
    Icon: Globe,
    color: '#0891b2',
    bg: '#ecfeff',
    title: 'Global Reach',
    desc: '140+ university partners across UK, France, Germany, and Dubai. We make international education accessible, transparent, and stress-free.',
  },
  {
    Icon: Building2,
    color: '#7c3aed',
    bg: '#faf5ff',
    title: 'Direct Employer Access',
    desc: 'Our 50+ hiring partner network means your profile goes directly to decision-makers — not into a black-hole job board.',
  },
  {
    Icon: TrendingUp,
    color: '#ef4444',
    bg: '#fef2f2',
    title: 'Measurable Outcomes',
    desc: 'Average 40% salary hike. 300+ careers transformed. First interview call within 1–2 weeks. Results you can count on.',
  },
];

const DEFAULT_TIMELINE = [
  {
    year: '2022',
    title: 'Placedly Founded',
    desc: 'Started in Delhi NCR with a single mission: make career growth transparent and accessible to every professional.',
  },
  {
    year: '2023',
    title: '100 Placements Milestone',
    desc: 'Crossed 100 successful placements and launched our flagship Career Assistance Programme (CAP).',
  },
  {
    year: '2024',
    title: 'Study Abroad Division',
    desc: 'Launched global education services with 140+ university partnerships across UK, France, Germany, and Dubai.',
  },
  {
    year: '2025',
    title: '300+ Careers Transformed',
    desc: 'Expanded to 50+ hiring partners and achieved an average 40% salary hike for placed professionals.',
  },
  {
    year: '2026',
    title: 'Scaling Pan-India',
    desc: 'Growing beyond Delhi NCR to serve professionals in Bangalore, Mumbai, Hyderabad, and Chennai.',
  },
];

const DEFAULT_STATS = [
  { num: '300+', label: 'Professionals Placed' },
  { num: '50+', label: 'Hiring Partners' },
  { num: '40%', label: 'Avg. Salary Hike' },
  { num: '₹0', label: 'Upfront Cost' },
];

type AbCmsData = {
  stats?: Array<{ num?: string; label?: string }>;
  values?: Array<{ icon?: string; title?: string; desc?: string }>;
  timeline?: Array<{ year?: string; title?: string; desc?: string }>;
  founder?: { name?: string; role?: string; bio?: string; quote?: string };
};

type CssVars = CSSProperties & {
  '--ab-color'?: string;
  '--ab-bg'?: string;
  '--ab-delay'?: string;
};

const ABOUT_STYLES = `
.ab-page {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background:
    radial-gradient(circle at 8% 6%, rgba(33, 69, 251, 0.08), transparent 30%),
    radial-gradient(circle at 90% 20%, rgba(249, 115, 22, 0.10), transparent 34%),
    linear-gradient(180deg, #ffffff 0%, #fbfcff 100%);
}

.ab-page::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -4;
  pointer-events: none;
  opacity: 0.34;
  background-image:
    linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(circle at 50% 18%, #000 0%, transparent 72%);
  -webkit-mask-image: radial-gradient(circle at 50% 18%, #000 0%, transparent 72%);
}

.ab-section {
  position: relative;
  padding: 80px 0;
}

.ab-section--hero {
  padding: calc(56px + 68px) 0 0;
}

.ab-section--alt {
  background:
    radial-gradient(circle at 15% 20%, rgba(33, 69, 251, 0.045), transparent 34%),
    radial-gradient(circle at 88% 80%, rgba(249, 115, 22, 0.055), transparent 36%),
    rgba(248, 250, 252, 0.58);
}

.ab-orb {
  position: absolute;
  z-index: -1;
  border-radius: 999px;
  filter: blur(42px);
  pointer-events: none;
  opacity: 0.26;
  animation: abFloat 9s ease-in-out infinite;
}

.ab-orb--blue {
  width: 330px;
  height: 330px;
  top: 5%;
  right: -120px;
  background: #2145fb;
}

.ab-orb--orange {
  width: 300px;
  height: 300px;
  bottom: 8%;
  left: -110px;
  background: #f97316;
  animation-delay: -3s;
}

.ab-container {
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.ab-reveal {
  opacity: 0;
  animation: abReveal 850ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--ab-delay, 0ms);
}

.ab-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: #2145fb;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.9px;
  text-transform: uppercase;
}

.ab-eyebrow::before {
  content: '';
  width: 22px;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, #2145fb, #f97316);
  box-shadow: 0 0 18px rgba(33, 69, 251, 0.28);
}

.ab-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  color: #94a3b8;
  font-size: 13px;
}

.ab-breadcrumb a {
  color: #94a3b8;
  text-decoration: none;
  transition: color 180ms ease;
}

.ab-breadcrumb a:hover {
  color: #2145fb;
}

.ab-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(320px, 0.75fr);
  gap: clamp(40px, 6vw, 84px);
  align-items: center;
}

.ab-hero-copy {
  max-width: 760px;
}

.ab-hero-title {
  margin: 0 0 20px;
  color: #0b0d20;
  font-size: clamp(2.35rem, 5vw, 4.55rem);
  font-weight: 950;
  line-height: 1.04;
  letter-spacing: -0.065em;
}

.ab-gradient-text {
  background: linear-gradient(90deg, #f97316, #2145fb, #f97316);
  background-size: 220% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: abTextShine 5s linear infinite;
}

.ab-hero-sub {
  max-width: 545px;
  margin: 0 0 32px;
  color: #64748b;
  font-size: 16px;
  line-height: 1.75;
}

.ab-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 48px;
}

.ab-btn {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 48px;
  padding: 0 28px;
  border-radius: 999px;
  font-family: Poppins, sans-serif;
  font-size: 14px;
  font-weight: 750;
  text-decoration: none;
  transition: transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease;
}

.ab-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-120%) skewX(-18deg);
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.34), transparent);
  transition: transform 700ms ease;
}

.ab-btn:hover {
  transform: translateY(-3px);
}

.ab-btn:hover::after {
  transform: translateX(120%) skewX(-18deg);
}

.ab-btn--primary {
  color: #fff;
  background: linear-gradient(135deg, #2145fb, #4866ff);
  box-shadow: 0 16px 34px rgba(33, 69, 251, 0.24);
}

.ab-btn--orange {
  color: #fff;
  background: linear-gradient(135deg, #f97316, #ea580c);
  box-shadow: 0 16px 34px rgba(249, 115, 22, 0.28);
}

.ab-btn--ghost {
  color: #374151;
  border: 1.5px solid #e2e8f0;
  background: rgba(255, 255, 255, 0.68);
  backdrop-filter: blur(12px);
}

.ab-hero-visual {
  position: relative;
  min-height: 480px;
  perspective: 1200px;
}

.ab-hero-card {
  position: absolute;
  inset: 20px 0 auto auto;
  width: min(100%, 390px);
  min-height: 430px;
  border-radius: 34px;
  padding: 16px;
  background:
    linear-gradient(145deg, rgba(255,255,255,.92), rgba(255,255,255,.62)),
    radial-gradient(circle at 20% 0%, rgba(33,69,251,.18), transparent 38%);
  border: 1px solid rgba(226, 232, 240, 0.82);
  box-shadow:
    0 34px 90px rgba(15, 23, 42, 0.13),
    inset 0 1px 0 rgba(255,255,255,.9);
  backdrop-filter: blur(18px);
  transform: rotateY(-9deg) rotateX(4deg);
  animation: abCardFloat 6s ease-in-out infinite;
}

.ab-hero-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(33,69,251,.55), transparent, rgba(249,115,22,.42));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.ab-hero-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 4px 14px;
}

.ab-window-dots {
  display: flex;
  gap: 6px;
}

.ab-window-dots span {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #cbd5e1;
}

.ab-window-dots span:nth-child(1) { background: #ef4444; }
.ab-window-dots span:nth-child(2) { background: #f59e0b; }
.ab-window-dots span:nth-child(3) { background: #22c55e; }

.ab-hero-card-label {
  color: #64748b;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.ab-hero-img {
  overflow: hidden;
  height: 255px;
  border-radius: 26px;
  background: #e2e8f0;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.9);
}

.ab-hero-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.04);
}

.ab-hero-mini-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 14px;
}

.ab-hero-mini {
  padding: 14px;
  border-radius: 20px;
  background: rgba(255,255,255,.78);
  border: 1px solid rgba(226,232,240,.8);
  box-shadow: 0 14px 30px rgba(15,23,42,.06);
}

.ab-hero-mini strong {
  display: block;
  margin-bottom: 4px;
  color: #0f172a;
  font-size: 22px;
  font-weight: 950;
  letter-spacing: -0.04em;
}

.ab-hero-mini span {
  color: #94a3b8;
  font-size: 11px;
  font-weight: 700;
}

.ab-floating-proof {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 18px;
  background: rgba(255,255,255,.82);
  border: 1px solid rgba(226,232,240,.9);
  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.12);
  backdrop-filter: blur(14px);
  animation: abFloat 7s ease-in-out infinite;
}

.ab-floating-proof--one {
  left: 0;
  bottom: 70px;
}

.ab-floating-proof--two {
  right: -8px;
  top: 78px;
  animation-delay: -2.5s;
}

.ab-floating-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 14px;
}

.ab-floating-proof strong {
  display: block;
  color: #0b0d20;
  font-size: 18px;
  font-weight: 950;
  line-height: 1;
}

.ab-floating-proof span {
  display: block;
  margin-top: 3px;
  color: #94a3b8;
  font-size: 11px;
}

.ab-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  overflow: hidden;
  border: 1px solid #eef0f6;
  border-radius: 28px;
  background: rgba(255,255,255,.72);
  box-shadow: 0 22px 60px rgba(15,23,42,.08);
  backdrop-filter: blur(16px);
}

.ab-stat {
  position: relative;
  padding: 30px 16px;
  text-align: center;
}

.ab-stat:not(:last-child) {
  border-right: 1px solid #eef0f6;
}

.ab-stat::before {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-110%);
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.82), transparent);
  animation: abShimmer 5.5s ease-in-out infinite;
  animation-delay: var(--ab-delay, 0ms);
}

.ab-stat-num {
  position: relative;
  margin-bottom: 7px;
  color: #0b0d20;
  font-size: clamp(1.8rem, 3vw, 2.45rem);
  font-weight: 950;
  line-height: 1;
  letter-spacing: -0.05em;
}

.ab-stat-label {
  position: relative;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 650;
}

.ab-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(44px, 6vw, 72px);
  align-items: center;
}

.ab-section-title {
  margin: 0 0 20px;
  color: #0b0d20;
  font-size: clamp(1.85rem, 3.4vw, 2.75rem);
  font-weight: 950;
  line-height: 1.1;
  letter-spacing: -0.055em;
}

.ab-copy {
  margin: 0 0 16px;
  color: #64748b;
  font-size: 15px;
  line-height: 1.78;
}

.ab-copy--dark {
  color: #374151;
}

.ab-mission-visual {
  position: relative;
  height: 500px;
  perspective: 1200px;
}

.ab-img-card {
  position: absolute;
  overflow: hidden;
  border-radius: 24px;
  box-shadow: 0 24px 58px rgba(15,23,42,.14);
  transition: transform 420ms cubic-bezier(0.22,1,0.36,1), box-shadow 420ms ease;
}

.ab-img-card:hover {
  transform: translateY(-10px) rotateX(3deg) rotateY(-3deg) scale(1.015);
  box-shadow: 0 34px 76px rgba(15,23,42,.18);
}

.ab-img-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 700ms ease;
}

.ab-img-card:hover img {
  transform: scale(1.07);
}

.ab-img-card--primary {
  top: 0;
  left: 0;
  width: 72%;
  height: 310px;
}

.ab-img-card--secondary {
  right: 0;
  bottom: 0;
  width: 62%;
  height: 250px;
  border: 5px solid #fff;
}

.ab-values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.ab-value-card {
  position: relative;
  overflow: hidden;
  min-height: 255px;
  padding: 30px;
  border-radius: 24px;
  background:
    linear-gradient(180deg, rgba(255,255,255,.94), rgba(255,255,255,.72));
  border: 1px solid rgba(226,232,240,.92);
  box-shadow:
    0 1px 4px rgba(15,23,42,.04),
    0 18px 44px rgba(15,23,42,.055);
  transform-style: preserve-3d;
  transition:
    transform 420ms cubic-bezier(0.22,1,0.36,1),
    box-shadow 420ms ease,
    border-color 420ms ease;
}

.ab-value-card::before {
  content: '';
  position: absolute;
  inset: -45%;
  transform: translateX(-115%) rotate(14deg);
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.86), transparent);
  transition: transform 900ms ease;
}

.ab-value-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 18% 12%, var(--ab-bg), transparent 44%);
  opacity: .72;
  pointer-events: none;
}

.ab-value-card:hover {
  transform: translateY(-12px) rotateX(4deg) rotateY(-4deg);
  border-color: color-mix(in srgb, var(--ab-color) 32%, #e2e8f0);
  box-shadow: 0 30px 70px rgba(15,23,42,.12), 0 16px 36px color-mix(in srgb, var(--ab-color) 14%, transparent);
}

.ab-value-card:hover::before {
  transform: translateX(115%) rotate(14deg);
}

.ab-value-icon {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: 18px;
  border-radius: 16px;
  color: var(--ab-color);
  background: var(--ab-bg);
  box-shadow: 0 12px 26px color-mix(in srgb, var(--ab-color) 17%, transparent);
}

.ab-value-title {
  position: relative;
  z-index: 1;
  margin-bottom: 10px;
  color: #0f172a;
  font-size: 16px;
  font-weight: 850;
}

.ab-value-desc {
  position: relative;
  z-index: 1;
  color: #64748b;
  font-size: 14px;
  line-height: 1.68;
}

.ab-timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ab-timeline::before {
  content: '';
  position: absolute;
  left: 18px;
  top: 20px;
  bottom: 20px;
  width: 2px;
  border-radius: 999px;
  background: linear-gradient(180deg, #2145fb, #f97316);
  opacity: .26;
}

.ab-timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 18px;
}

.ab-timeline-node {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  color: #fff;
  background: linear-gradient(135deg, #2145fb, #4866ff);
  border: 4px solid #eff6ff;
  box-shadow: 0 0 0 0 rgba(33,69,251,.35);
  animation: abPulse 2.8s ease-in-out infinite;
  animation-delay: var(--ab-delay, 0ms);
  font-size: 13px;
  font-weight: 850;
}

.ab-timeline-card {
  padding: 20px 22px;
  border-radius: 22px;
  background: rgba(255,255,255,.78);
  border: 1px solid rgba(226,232,240,.9);
  box-shadow: 0 14px 34px rgba(15,23,42,.055);
  backdrop-filter: blur(12px);
  transition: transform 260ms ease, box-shadow 260ms ease;
}

.ab-timeline-card:hover {
  transform: translateX(8px);
  box-shadow: 0 22px 46px rgba(15,23,42,.09);
}

.ab-timeline-year {
  margin-bottom: 4px;
  color: #2145fb;
  font-size: 11px;
  font-weight: 850;
  letter-spacing: .06em;
  text-transform: uppercase;
}

.ab-timeline-title {
  margin-bottom: 6px;
  color: #0f172a;
  font-size: 15px;
  font-weight: 850;
}

.ab-timeline-desc {
  color: #64748b;
  font-size: 14px;
  line-height: 1.65;
}

.ab-founder-card {
  position: relative;
  overflow: hidden;
  display: flex;
  gap: 52px;
  align-items: center;
  max-width: 920px;
  margin: 0 auto;
  padding: clamp(32px, 5vw, 56px);
  border-radius: 32px;
  background:
    linear-gradient(135deg, rgba(255,255,255,.94), rgba(255,255,255,.72)),
    radial-gradient(circle at 0% 0%, rgba(33,69,251,.09), transparent 38%);
  border: 1px solid rgba(226,232,240,.92);
  box-shadow: 0 28px 76px rgba(15,23,42,.10);
  backdrop-filter: blur(18px);
}

.ab-founder-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(33,69,251,.38), transparent, rgba(249,115,22,.36));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.ab-founder-img {
  position: relative;
  overflow: hidden;
  flex: 0 0 auto;
  width: 205px;
  height: 255px;
  border-radius: 24px;
  box-shadow: 0 22px 46px rgba(15,23,42,.16);
  transform: rotate(-2deg);
}

.ab-founder-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.ab-founder-name {
  margin-bottom: 4px;
  color: #0b0d20;
  font-size: 24px;
  font-weight: 900;
  letter-spacing: -0.03em;
}

.ab-founder-role {
  margin-bottom: 22px;
  color: #2145fb;
  font-size: 14px;
  font-weight: 750;
}

.ab-quote {
  position: relative;
  margin-top: 26px;
  padding: 20px 22px 20px 54px;
  border-radius: 18px;
  background: linear-gradient(135deg, #f8faff, #fff7ed);
  border-left: 4px solid #2145fb;
  color: #374151;
  font-size: 14px;
  font-style: italic;
  line-height: 1.72;
  box-shadow: 0 12px 28px rgba(15,23,42,.045);
}

.ab-quote svg {
  position: absolute;
  left: 20px;
  top: 20px;
  color: #2145fb;
  opacity: .55;
}

.ab-dark-cta {
  position: relative;
  overflow: hidden;
  padding: clamp(54px, 7vw, 82px) clamp(24px, 6vw, 72px);
  border-radius: 34px;
  text-align: center;
  background:
    radial-gradient(circle at 25% 30%, rgba(33,69,251,.25), transparent 34%),
    radial-gradient(circle at 80% 80%, rgba(249,115,22,.22), transparent 36%),
    linear-gradient(135deg, #070918, #11142d 48%, #080a18);
  box-shadow: 0 34px 90px rgba(11,13,32,.34);
}

.ab-dark-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-120%) skewX(-18deg);
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.11), transparent);
  animation: abShimmer 6s ease-in-out infinite;
}

.ab-dark-cta h2 {
  position: relative;
  margin: 0 0 14px;
  color: #fff;
  font-size: clamp(1.8rem, 3.4vw, 2.75rem);
  font-weight: 950;
  line-height: 1.12;
  letter-spacing: -0.055em;
}

.ab-dark-cta p {
  position: relative;
  max-width: 520px;
  margin: 0 auto 34px;
  color: rgba(255,255,255,.66);
  font-size: 15px;
  line-height: 1.72;
}

.ab-center {
  text-align: center;
  margin-bottom: 48px;
}

@keyframes abReveal {
  from {
    opacity: 0;
    transform: translateY(28px);
    filter: blur(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes abFloat {
  0%, 100% { transform: translate3d(0,0,0); }
  50% { transform: translate3d(14px,-18px,0); }
}

@keyframes abCardFloat {
  0%, 100% { transform: rotateY(-9deg) rotateX(4deg) translateY(0); }
  50% { transform: rotateY(-5deg) rotateX(6deg) translateY(-12px); }
}

@keyframes abTextShine {
  0% { background-position: 0% 50%; }
  100% { background-position: 220% 50%; }
}

@keyframes abShimmer {
  0% { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
  18% { opacity: 1; }
  48%, 100% { transform: translateX(120%) skewX(-18deg); opacity: 0; }
}

@keyframes abPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(33,69,251,.34); }
  50% { box-shadow: 0 0 0 12px rgba(33,69,251,0); }
}

@media (max-width: 980px) {
  .ab-hero-grid,
  .ab-two-col {
    grid-template-columns: 1fr;
  }

  .ab-hero-visual {
    min-height: 430px;
  }

  .ab-hero-card {
    position: relative;
    inset: auto;
    margin: 0 auto;
  }

  .ab-values-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .ab-founder-card {
    align-items: flex-start;
  }
}

@media (max-width: 720px) {
  .ab-container {
    width: min(100% - 28px, 1180px);
  }

  .ab-section {
    padding: 62px 0;
  }

  .ab-section--hero {
    padding-top: calc(48px + 64px);
  }

  .ab-stats,
  .ab-values-grid {
    grid-template-columns: 1fr;
  }

  .ab-stat:not(:last-child) {
    border-right: 0;
    border-bottom: 1px solid #eef0f6;
  }

  .ab-mission-visual {
    height: 430px;
  }

  .ab-img-card--primary {
    width: 82%;
    height: 270px;
  }

  .ab-img-card--secondary {
    width: 72%;
    height: 220px;
  }

  .ab-floating-proof--one {
    left: 6px;
    bottom: 58px;
  }

  .ab-floating-proof--two {
    right: 4px;
    top: 42px;
  }

  .ab-founder-card {
    flex-direction: column;
    gap: 28px;
  }

  .ab-founder-img {
    width: 100%;
    max-width: 240px;
    height: 280px;
  }
}

@media (max-width: 520px) {
  .ab-hero-visual {
    min-height: 380px;
  }

  .ab-hero-card {
    min-height: auto;
    border-radius: 28px;
  }

  .ab-hero-img {
    height: 210px;
  }

  .ab-hero-mini-grid {
    grid-template-columns: 1fr;
  }

  .ab-floating-proof {
    display: none;
  }

  .ab-actions {
    flex-direction: column;
  }

  .ab-btn {
    justify-content: center;
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ab-reveal,
  .ab-orb,
  .ab-hero-card,
  .ab-stat::before,
  .ab-dark-cta::before,
  .ab-timeline-node {
    animation: none !important;
  }

  .ab-value-card,
  .ab-img-card,
  .ab-btn,
  .ab-timeline-card {
    transition: none !important;
  }
}
`;

export default async function AboutUsPage() {
  const cmsMap = await getCmsMap('ab:');
  const abCms = parseCmsJson<AbCmsData>(cmsMap, 'ab:data', {});

  const stats =
    abCms.stats && abCms.stats.length > 0
      ? abCms.stats.map((s) => ({ num: s.num ?? '', label: s.label ?? '' }))
      : DEFAULT_STATS;

  const values =
    abCms.values && abCms.values.length > 0
      ? abCms.values.map((v, i) => {
          const def = DEFAULT_VALUES[i] ?? DEFAULT_VALUES[0];
          const IconComp = v.icon && ICON_MAP[v.icon] ? ICON_MAP[v.icon] : def.Icon;

          return {
            Icon: IconComp,
            color: def.color,
            bg: def.bg,
            title: v.title ?? def.title,
            desc: v.desc ?? def.desc,
          };
        })
      : DEFAULT_VALUES;

  const timeline =
    abCms.timeline && abCms.timeline.length > 0
      ? abCms.timeline.map((t) => ({
          year: t.year ?? '',
          title: t.title ?? '',
          desc: t.desc ?? '',
        }))
      : DEFAULT_TIMELINE;

  const founder = {
    name: abCms.founder?.name ?? 'Our Founder',
    role: abCms.founder?.role ?? 'Founder & CEO, Placedly',
    bio:
      abCms.founder?.bio ??
      "With a deep background in talent acquisition and career consulting across Delhi NCR's top MNCs, our founder built Placedly with a frustration-turned-mission: too many talented professionals were being left behind by a system that favoured connections over competence.",
    quote:
      abCms.founder?.quote ??
      "Your next job shouldn't depend on who you know. It should depend on how well we prepare you.",
  };

  return (
    <PageLayout>
      <style dangerouslySetInnerHTML={{ __html: ABOUT_STYLES }} />

      <main className="ab-page">
        {/* ── Hero ── */}
        <section className="ab-section ab-section--hero">
          <span className="ab-orb ab-orb--blue" aria-hidden />
          <span className="ab-orb ab-orb--orange" aria-hidden />

          <div className="ab-container">
            <div className="ab-hero-grid">
              <div className="ab-hero-copy ab-reveal">
                <nav className="ab-breadcrumb" aria-label="Breadcrumb">
                  <a href="/">Home</a>
                  <span>›</span>
                  <span style={{ color: '#374151' }}>About Us</span>
                </nav>

                <div className="ab-eyebrow">
                  <Sparkles size={13} />
                  Our Story
                </div>

                <h1 className="ab-hero-title">
                  We&apos;re Not Just a
                  <br />
                  Placement Agency.
                  <br />
                  <span className="ab-gradient-text">We&apos;re Career Partners.</span>
                </h1>

                <p className="ab-hero-sub">
                  Born in Delhi NCR. Built for every professional who deserves
                  better — a better role, a better salary, and a career that
                  actually reflects their potential.
                </p>

                <div className="ab-actions">
                  <a href="/contact" className="ab-btn ab-btn--primary">
                    <Rocket size={16} />
                    Start Your Journey
                  </a>
                  <a href="#our-story" className="ab-btn ab-btn--ghost">
                    Read Our Story
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              <div className="ab-hero-visual ab-reveal" style={{ '--ab-delay': '120ms' } as CssVars}>
                <div className="ab-hero-card">
                  <div className="ab-hero-card-top">
                    <div className="ab-window-dots" aria-hidden>
                      <span />
                      <span />
                      <span />
                    </div>
                    <span className="ab-hero-card-label">Placedly impact</span>
                  </div>

                  <div className="ab-hero-img">
                    <img src="/img/team.png" alt="Placedly team" />
                  </div>

                  <div className="ab-hero-mini-grid">
                    <div className="ab-hero-mini">
                      <strong>300+</strong>
                      <span>Careers transformed</span>
                    </div>
                    <div className="ab-hero-mini">
                      <strong>₹0</strong>
                      <span>Upfront fee</span>
                    </div>
                  </div>
                </div>

                <div className="ab-floating-proof ab-floating-proof--one">
                  <div className="ab-floating-icon" style={{ background: '#eff6ff' }}>
                    <Trophy size={18} color="#2145fb" />
                  </div>
                  <div>
                    <strong>40%</strong>
                    <span>Avg. Salary Hike</span>
                  </div>
                </div>

                <div className="ab-floating-proof ab-floating-proof--two">
                  <div className="ab-floating-icon" style={{ background: '#f0fdf4' }}>
                    <Handshake size={18} color="#16a34a" />
                  </div>
                  <div>
                    <strong>50+</strong>
                    <span>Hiring Partners</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ab-stats ab-reveal" style={{ '--ab-delay': '220ms' } as CssVars}>
              {stats.map((s, i) => (
                <div
                  key={`${s.num}-${s.label}`}
                  className="ab-stat"
                  style={{ '--ab-delay': `${i * 170}ms` } as CssVars}
                >
                  <div className="ab-stat-num">{s.num}</div>
                  <div className="ab-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mission ── */}
        <section className="ab-section" id="our-story">
          <div className="ab-container">
            <div className="ab-two-col">
              <div className="ab-reveal">
                <div className="ab-eyebrow">Our Mission</div>

                <h2 className="ab-section-title">
                  Making Career Growth{' '}
                  <span style={{ color: '#2145fb' }}>Accessible</span> for Everyone
                </h2>

                <p className="ab-copy">
                  Placedly was founded with one deeply held belief: exceptional
                  careers shouldn&apos;t be a privilege reserved for people with
                  the right connections. Every professional deserves expert
                  guidance, real employer access, and a fair shot at the role
                  they want.
                </p>

                <p className="ab-copy ab-copy--dark">
                  We operate on a simple model:{' '}
                  <strong>zero upfront, success-share only.</strong> Career
                  Assistance Fee of 12% of CTC — collected only after you receive
                  your offer letter. If we don&apos;t place you, you don&apos;t pay.
                </p>

                <div style={{ marginTop: 30 }}>
                  <a href="/contact" className="ab-btn ab-btn--primary">
                    Talk to Our Team
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              <div className="ab-mission-visual ab-reveal" style={{ '--ab-delay': '120ms' } as CssVars}>
                <div className="ab-img-card ab-img-card--primary">
                  <img src="/img/team.png" alt="Placedly Team" />
                </div>

                <div className="ab-img-card ab-img-card--secondary">
                  <img src="/img/aboutt us consultancy.png" alt="Consultancy" />
                </div>

                <div className="ab-floating-proof ab-floating-proof--one">
                  <div className="ab-floating-icon" style={{ background: '#eff6ff' }}>
                    <Trophy size={18} color="#2145fb" />
                  </div>
                  <div>
                    <strong>300+</strong>
                    <span>Careers Transformed</span>
                  </div>
                </div>

                <div className="ab-floating-proof ab-floating-proof--two">
                  <div className="ab-floating-icon" style={{ background: '#f0fdf4' }}>
                    <Handshake size={18} color="#16a34a" />
                  </div>
                  <div>
                    <strong>50+</strong>
                    <span>Hiring Partners</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="ab-section ab-section--alt">
          <div className="ab-container">
            <div className="ab-center ab-reveal">
              <div className="ab-eyebrow">What We Stand For</div>
              <h2 className="ab-section-title">
                The Principles That{' '}
                <span style={{ color: '#2145fb' }}>Drive Us</span>
              </h2>
            </div>

            <div className="ab-values-grid">
              {values.map((v, index) => (
                <div
                  key={v.title}
                  className="ab-value-card ab-reveal"
                  style={
                    {
                      '--ab-color': v.color,
                      '--ab-bg': v.bg,
                      '--ab-delay': `${index * 80}ms`,
                    } as CssVars
                  }
                >
                  <div className="ab-value-icon">
                    <v.Icon size={22} />
                  </div>
                  <div className="ab-value-title">{v.title}</div>
                  <div className="ab-value-desc">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="ab-section">
          <div className="ab-container">
            <div className="ab-two-col" style={{ alignItems: 'start' }}>
              <div className="ab-reveal">
                <div className="ab-eyebrow">Our Journey</div>
                <h2 className="ab-section-title">
                  From Startup to{' '}
                  <span style={{ color: '#2145fb' }}>300+ Placements</span>
                </h2>
                <p className="ab-copy">
                  Every milestone was earned the hard way — one candidate at a
                  time, one employer relationship at a time.
                </p>
              </div>

              <div className="ab-timeline">
                {timeline.map((item, i) => (
                  <div
                    key={`${item.year}-${item.title}`}
                    className="ab-timeline-item ab-reveal"
                    style={{ '--ab-delay': `${i * 90}ms` } as CssVars}
                  >
                    <div
                      className="ab-timeline-node"
                      style={{ '--ab-delay': `${i * 180}ms` } as CssVars}
                    >
                      {i + 1}
                    </div>

                    <div className="ab-timeline-card">
                      <div className="ab-timeline-year">{item.year}</div>
                      <div className="ab-timeline-title">{item.title}</div>
                      <div className="ab-timeline-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Leadership ── */}
        <section className="ab-section ab-section--alt">
          <div className="ab-container">
            <div className="ab-center ab-reveal">
              <div className="ab-eyebrow">Leadership</div>
              <h2 className="ab-section-title">The Person Behind Placedly</h2>
            </div>

            <div className="ab-founder-card ab-reveal">
              <div className="ab-founder-img">
                <img src="/img/at founder part.png" alt="Founder" />
              </div>

              <div>
                <div className="ab-founder-name">{founder.name}</div>
                <div className="ab-founder-role">{founder.role}</div>

                <p className="ab-copy" style={{ marginBottom: 0 }}>
                  {founder.bio}
                </p>

                <div className="ab-quote">
                  <Quote size={20} />
                  &ldquo;{founder.quote}&rdquo;
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="ab-section">
          <div className="ab-container">
            <div className="ab-dark-cta ab-reveal">
              <h2>
                Ready to Write Your{' '}
                <span className="ab-gradient-text">Success Story?</span>
              </h2>
              <p>
                Join 300+ professionals who trusted Placedly to transform their
                career. Zero upfront — you only pay after you&apos;re placed.
              </p>

              <div className="ab-actions" style={{ justifyContent: 'center', marginBottom: 0 }}>
                <a href="/contact" className="ab-btn ab-btn--orange">
                  <Rocket size={16} />
                  Get Placed Now
                </a>
                <a href="/study-visa" className="ab-btn ab-btn--ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.24)', background: 'rgba(255,255,255,.06)' }}>
                  <Plane size={16} />
                  Study Abroad
                </a>
              </div>

              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 26,
                  color: 'rgba(255,255,255,.55)',
                  fontSize: 12,
                  fontWeight: 650,
                }}
              >
                <CheckCircle2 size={14} color="#22c55e" />
                Zero upfront. Advisor-led. Outcome-focused.
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}