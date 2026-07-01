export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { Target, DollarSign, Handshake, Globe, Building2, TrendingUp, Rocket, Plane, Trophy, Sparkles, ArrowRight, Star, Zap, Award } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { getCmsMap, parseCmsJson } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'About Us — Placedly',
  description: 'Learn about Placedly — Delhi NCR\'s career placement and global education consultancy.',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Target, DollarSign, Handshake, Globe, Building2, TrendingUp
};

const DEFAULT_VALUES = [
  { Icon: Target, color: '#2145fb', bg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', title: 'Personalised, Always', desc: 'No two careers are the same. Every candidate gets a bespoke roadmap built around their skills, goals, and target industry — not a generic playbook.' },
  { Icon: DollarSign, color: '#16a34a', bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', title: 'Zero Upfront', desc: 'We believe in putting our money where our mouth is. Career Assistance Fee of 12% is charged only after you receive your offer letter.' },
  { Icon: Handshake, color: '#f97316', bg: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)', title: 'End-to-End Partnership', desc: 'From CV rebuild to day 90 in your new role — we stay with you through every step, including salary negotiation and joining support.' },
  { Icon: Globe, color: '#0891b2', bg: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)', title: 'Global Reach', desc: '140+ university partners across UK, France, Germany, and Dubai. We make international education accessible and stress-free.' },
  { Icon: Building2, color: '#7c3aed', bg: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', title: 'Direct Employer Access', desc: 'Our 50+ hiring partner network means your profile goes directly to decision-makers — not into a black-hole job board.' },
  { Icon: TrendingUp, color: '#ef4444', bg: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', title: 'Measurable Outcomes', desc: 'Average 40% salary hike. 300+ careers transformed. First interview call within 1–2 weeks. Results you can count on.' },
];

const DEFAULT_TIMELINE = [
  { year: '2022', title: 'Placedly Founded', desc: 'Started in Delhi NCR with a single mission: make career growth transparent and accessible to every professional.' },
  { year: '2023', title: '100 Placements Milestone', desc: 'Crossed 100 successful placements and launched our flagship Career Assistance Programme (CAP).' },
  { year: '2024', title: 'Study Abroad Division', desc: 'Launched global education services with 140+ university partnerships across UK, France, Germany, and Dubai.' },
  { year: '2025', title: '300+ Careers Transformed', desc: 'Expanded to 50+ hiring partners and achieved an average 40% salary hike for placed professionals.' },
  { year: '2026', title: 'Scaling Pan-India', desc: 'Growing beyond Delhi NCR to serve professionals in Bangalore, Mumbai, Hyderabad, and Chennai.' },
];

const DEFAULT_STATS = [
  { num: '300+', label: 'Professionals Placed', icon: 'trophy' },
  { num: '50+', label: 'Hiring Partners', icon: 'building' },
  { num: '40%', label: 'Avg. Salary Hike', icon: 'trending' },
  { num: '₹0', label: 'Upfront Cost', icon: 'dollar' },
];

type AbCmsData = {
  stats?: Array<{ num?: string; label?: string }>;
  values?: Array<{ icon?: string; title?: string; desc?: string }>;
  timeline?: Array<{ year?: string; title?: string; desc?: string }>;
  founder?: { name?: string; role?: string; bio?: string; quote?: string };
};

export default async function AboutUsPage() {
  const cmsMap = await getCmsMap('ab:');
  const abCms = parseCmsJson<AbCmsData>(cmsMap, 'ab:data', {});

  const stats = (abCms.stats && abCms.stats.length > 0)
    ? abCms.stats.map(s => ({ num: s.num ?? '', label: s.label ?? '', icon: 'trophy' }))
    : DEFAULT_STATS;

  const values = (abCms.values && abCms.values.length > 0)
    ? abCms.values.map((v, i) => {
        const def = DEFAULT_VALUES[i] ?? DEFAULT_VALUES[0];
        const IconComp = (v.icon && ICON_MAP[v.icon]) ? ICON_MAP[v.icon] : def.Icon;
        return { Icon: IconComp, color: def.color, bg: def.bg, title: v.title ?? def.title, desc: v.desc ?? def.desc };
      })
    : DEFAULT_VALUES;

  const timeline = (abCms.timeline && abCms.timeline.length > 0)
    ? abCms.timeline.map(t => ({ year: t.year ?? '', title: t.title ?? '', desc: t.desc ?? '' }))
    : DEFAULT_TIMELINE;

  return (
    <PageLayout>
      <style>{`
        /* ═══════════════════════════════════════════════════════════════
           KEYFRAME ANIMATIONS
           ═══════════════════════════════════════════════════════════════ */
        @keyframes ab-fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ab-fadeInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes ab-fadeInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes ab-scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes ab-slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ab-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes ab-shimmerBorder {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes ab-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%      { transform: translateY(-12px) rotate(1deg); }
          66%      { transform: translateY(-6px) rotate(-1deg); }
        }
        @keyframes ab-floatSlow {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes ab-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.05); opacity: 0.9; }
        }
        @keyframes ab-pulseRing {
          0%   { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes ab-rotateGlow {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes ab-morphBlob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25%      { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50%      { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }
          75%      { border-radius: 60% 30% 60% 40% / 70% 40% 50% 60%; }
        }
        @keyframes ab-gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes ab-typewriter {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes ab-blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes ab-counterUp {
          from { opacity: 0; transform: translateY(20px) scale(0.5); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ab-sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50%      { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        @keyframes ab-drawLine {
          from { height: 0; }
          to   { height: 100%; }
        }
        @keyframes ab-ripple {
          0%   { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes ab-slideInStagger {
          from { opacity: 0; transform: translateY(30px) rotateX(10deg); }
          to   { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }
        @keyframes ab-glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(33,69,251,0.15); }
          50%      { box-shadow: 0 0 40px rgba(33,69,251,0.3); }
        }
        @keyframes ab-marqueeLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes ab-bounceIn {
          0%   { opacity: 0; transform: scale(0.3) translateY(40px); }
          50%  { transform: scale(1.05) translateY(-10px); }
          70%  { transform: scale(0.95) translateY(3px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes ab-textGlow {
          0%, 100% { text-shadow: 0 0 10px rgba(33,69,251,0.3); }
          50%      { text-shadow: 0 0 20px rgba(33,69,251,0.6), 0 0 40px rgba(33,69,251,0.3); }
        }
        @keyframes ab-orbitSpin {
          from { transform: rotate(0deg) translateX(160px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(160px) rotate(-360deg); }
        }
        @keyframes ab-gridPattern {
          0%   { opacity: 0.03; }
          50%  { opacity: 0.06; }
          100% { opacity: 0.03; }
        }
        @keyframes ab-borderFlow {
          0%   { border-image-source: linear-gradient(0deg, #2145fb, #f97316, #2145fb); }
          100% { border-image-source: linear-gradient(360deg, #2145fb, #f97316, #2145fb); }
        }

        /* ═══════════════════════════════════════════════════════════════
           HERO SECTION
           ═══════════════════════════════════════════════════════════════ */
        .ab-hero-section {
          position: relative;
          padding: calc(56px + 68px) 0 0;
          overflow: hidden;
          background: linear-gradient(175deg, #fafbff 0%, #ffffff 40%, #f8f9ff 100%);
        }
        .ab-hero-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 800px;
          height: 800px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(33,69,251,0.04) 0%, transparent 70%);
          animation: ab-morphBlob 20s ease-in-out infinite;
          pointer-events: none;
        }
        .ab-hero-section::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -15%;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(249,115,22,0.03) 0%, transparent 70%);
          animation: ab-morphBlob 25s ease-in-out infinite reverse;
          pointer-events: none;
        }
        .ab-hero-grid-bg {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(33,69,251,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(33,69,251,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: ab-gridPattern 8s ease-in-out infinite;
          pointer-events: none;
        }
        .ab-hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: 760px;
        }
        .ab-hero-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #94a3b8;
          margin-bottom: 24px;
          animation: ab-fadeInUp 0.6s ease-out both;
          animation-delay: 0.1s;
        }
        .ab-hero-breadcrumb a {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .ab-hero-breadcrumb a:hover { color: #2145fb; }
        .ab-hero-label {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          animation: ab-fadeInUp 0.6s ease-out both;
          animation-delay: 0.2s;
        }
        .ab-hero-label-line {
          width: 24px;
          height: 3px;
          border-radius: 999px;
          background: linear-gradient(90deg, #2145fb, #6366f1);
          position: relative;
          overflow: hidden;
        }
        .ab-hero-label-line::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          background-size: 200% 100%;
          animation: ab-shimmer 2s infinite;
        }
        .ab-hero-label-text {
          font-size: 11px;
          font-weight: 700;
          color: #2145fb;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          background: linear-gradient(135deg, #2145fb, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ab-hero-h1 {
          font-size: clamp(2.2rem, 4.5vw, 3.8rem);
          font-weight: 900;
          color: #0b0d20;
          line-height: 1.08;
          letter-spacing: -1.5px;
          margin-bottom: 20px;
          animation: ab-fadeInUp 0.8s ease-out both;
          animation-delay: 0.3s;
          perspective: 800px;
        }
        .ab-hero-h1 .ab-h1-line {
          display: block;
          transform-origin: left center;
        }
        .ab-hero-h1 .ab-h1-line:nth-child(1) {
          animation: ab-fadeInLeft 0.7s ease-out both;
          animation-delay: 0.4s;
        }
        .ab-hero-h1 .ab-h1-line:nth-child(2) {
          animation: ab-fadeInLeft 0.7s ease-out both;
          animation-delay: 0.55s;
        }
        .ab-hero-h1 .ab-h1-accent {
          background: linear-gradient(135deg, #f97316 0%, #fb923c 50%, #f97316 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: ab-gradientShift 4s ease-in-out infinite, ab-fadeInLeft 0.7s ease-out both;
          animation-delay: 0s, 0.7s;
          position: relative;
        }
        .ab-hero-desc {
          font-size: 16px;
          color: #64748b;
          line-height: 1.75;
          max-width: 520px;
          margin-bottom: 32px;
          animation: ab-fadeInUp 0.7s ease-out both;
          animation-delay: 0.5s;
        }
        .ab-hero-btns {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 48px;
          animation: ab-fadeInUp 0.7s ease-out both;
          animation-delay: 0.6s;
        }
        .ab-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #2145fb 0%, #1a38d0 100%);
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          font-family: Poppins, sans-serif;
          padding: 14px 30px;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(33,69,251,0.3), 0 0 0 0 rgba(33,69,251,0.2);
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          overflow: hidden;
        }
        .ab-btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 200% 100%;
          animation: ab-shimmer 3s infinite;
        }
        .ab-btn-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 30px rgba(33,69,251,0.4), 0 0 0 4px rgba(33,69,251,0.1);
        }
        .ab-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #374151;
          font-weight: 500;
          font-size: 14px;
          font-family: Poppins, sans-serif;
          padding: 14px 30px;
          border-radius: 999px;
          text-decoration: none;
          border: 1.5px solid #e2e8f0;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .ab-btn-secondary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(33,69,251,0.05), rgba(99,102,241,0.05));
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .ab-btn-secondary:hover {
          border-color: #2145fb;
          color: #2145fb;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(33,69,251,0.1);
        }
        .ab-btn-secondary:hover::before { opacity: 1; }

        /* ═══════════════════════════════════════════════════════════════
           STATS STRIP — 3D Cards
           ═══════════════════════════════════════════════════════════════ */
        .ab-stats-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 16px;
          perspective: 1000px;
        }
        .ab-stat-card {
          text-align: center;
          padding: 32px 20px;
          position: relative;
          background: #fff;
          border-radius: 20px;
          border: 1px solid #eef0f6;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          transition: all 0.5s cubic-bezier(0.4,0,0.2,1);
          animation: ab-bounceIn 0.7s ease-out both;
          transform-style: preserve-3d;
          cursor: default;
          overflow: hidden;
        }
        .ab-stat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(135deg, transparent 30%, rgba(33,69,251,0.03) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .ab-stat-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.6s ease;
        }
        .ab-stat-card:hover::after { left: 100%; }
        .ab-stat-card:hover::before { opacity: 1; }
        .ab-stat-card:nth-child(1) { animation-delay: 0.7s; }
        .ab-stat-card:nth-child(2) { animation-delay: 0.85s; }
        .ab-stat-card:nth-child(3) { animation-delay: 1.0s; }
        .ab-stat-card:nth-child(4) { animation-delay: 1.15s; }
        .ab-stat-card:hover {
          transform: translateY(-8px) rotateX(5deg) rotateY(-3deg) scale(1.02);
          box-shadow: 0 20px 40px rgba(33,69,251,0.12);
          border-color: rgba(33,69,251,0.2);
        }
        .ab-stat-num {
          font-size: 2rem;
          font-weight: 900;
          color: #0b0d20;
          line-height: 1;
          margin-bottom: 6px;
          letter-spacing: -0.5px;
          background: linear-gradient(135deg, #0b0d20, #2145fb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: all 0.3s ease;
        }
        .ab-stat-card:hover .ab-stat-num {
          background: linear-gradient(135deg, #2145fb, #f97316);
          -webkit-background-clip: text;
          background-clip: text;
        }
        .ab-stat-label {
          font-size: 12px;
          color: #94a3b8;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        .ab-stat-card:hover .ab-stat-label { color: #64748b; }
        .ab-stat-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2145fb;
          margin: 0 auto 12px;
          opacity: 0;
          transition: all 0.3s ease;
          animation: ab-pulse 2s infinite;
        }
        .ab-stat-card:hover .ab-stat-dot { opacity: 1; }

        /* ═══════════════════════════════════════════════════════════════
           MISSION SECTION
           ═══════════════════════════════════════════════════════════════ */
        .ab-mission-section {
          padding: 100px 0;
          position: relative;
          overflow: hidden;
        }
        .ab-mission-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #2145fb, transparent);
          opacity: 0.2;
        }
        .ab-mission-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .ab-mission-text {
          animation: ab-fadeInLeft 0.8s ease-out both;
        }
        .ab-section-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #2145fb, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ab-section-label-line {
          width: 24px;
          height: 3px;
          border-radius: 999px;
          background: linear-gradient(90deg, #2145fb, #6366f1);
          position: relative;
          overflow: hidden;
        }
        .ab-section-label-line::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          background-size: 200% 100%;
          animation: ab-shimmer 2.5s infinite;
        }
        .ab-mission-h2 {
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 900;
          color: #0b0d20;
          line-height: 1.15;
          letter-spacing: -0.6px;
          margin-bottom: 20px;
        }
        .ab-mission-h2 .ab-accent { color: #2145fb; }
        .ab-mission-p {
          font-size: 15px;
          color: #64748b;
          line-height: 1.75;
          margin-bottom: 16px;
        }
        .ab-mission-p-bold {
          font-size: 15px;
          color: #374151;
          line-height: 1.75;
          margin-bottom: 32px;
        }
        .ab-mission-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #2145fb 0%, #1a38d0 100%);
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          font-family: Poppins, sans-serif;
          padding: 14px 30px;
          border-radius: 999px;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(33,69,251,0.25);
        }
        .ab-mission-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          background-size: 200% 100%;
          animation: ab-shimmer 3s infinite;
        }
        .ab-mission-cta:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 30px rgba(33,69,251,0.4);
        }

        /* Mission Image Area — 3D floating */
        .ab-mission-visual {
          position: relative;
          height: 520px;
          perspective: 1200px;
          animation: ab-fadeInRight 0.8s ease-out both;
          animation-delay: 0.3s;
        }
        .ab-mission-img-main {
          position: absolute;
          top: 0;
          left: 0;
          width: 72%;
          height: 310px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 24px 56px rgba(0,0,0,0.14);
          animation: ab-float 6s ease-in-out infinite;
          transform-style: preserve-3d;
          transition: transform 0.5s ease;
        }
        .ab-mission-img-main::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(33,69,251,0.05), transparent 50%);
          pointer-events: none;
        }
        .ab-mission-img-main:hover {
          transform: rotateY(-5deg) rotateX(3deg) scale(1.02);
          box-shadow: 0 30px 60px rgba(0,0,0,0.18);
        }
        .ab-mission-img-main img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .ab-mission-img-main:hover img { transform: scale(1.05); }
        .ab-mission-img-secondary {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 60%;
          height: 250px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 24px 56px rgba(0,0,0,0.14);
          border: 5px solid #fff;
          animation: ab-float 7s ease-in-out infinite reverse;
          animation-delay: 1s;
          transform-style: preserve-3d;
          transition: transform 0.5s ease;
        }
        .ab-mission-img-secondary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent, rgba(249,115,22,0.05));
          pointer-events: none;
        }
        .ab-mission-img-secondary:hover {
          transform: rotateY(5deg) rotateX(-3deg) scale(1.02);
          box-shadow: 0 30px 60px rgba(0,0,0,0.18);
        }
        .ab-mission-img-secondary img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .ab-mission-img-secondary:hover img { transform: scale(1.05); }

        /* Floating badges */
        .ab-float-badge {
          position: absolute;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 12px 36px rgba(0,0,0,0.12);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          border: 1px solid #eef0f6;
          z-index: 10;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          animation: ab-floatSlow 4s ease-in-out infinite;
          backdrop-filter: blur(10px);
          cursor: default;
        }
        .ab-float-badge:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 16px 40px rgba(0,0,0,0.16);
        }
        .ab-float-badge-left {
          bottom: 165px;
          left: -24px;
          animation-delay: 0.5s;
        }
        .ab-float-badge-right {
          top: 50px;
          right: -24px;
          animation-delay: 1.5s;
        }
        .ab-badge-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
        }
        .ab-badge-icon::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 14px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .ab-float-badge:hover .ab-badge-icon::after { opacity: 1; }
        .ab-badge-num {
          font-size: 20px;
          font-weight: 900;
          color: #0b0d20;
          line-height: 1;
        }
        .ab-badge-label {
          font-size: 11px;
          color: #94a3b8;
          margin-top: 3px;
        }

        /* ═══════════════════════════════════════════════════════════════
           VALUES SECTION
           ═══════════════════════════════════════════════════════════════ */
        .ab-values-section {
          padding: 100px 0;
          position: relative;
          background: linear-gradient(180deg, #f8faff 0%, #ffffff 50%, #f8faff 100%);
          overflow: hidden;
        }
        .ab-values-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(33,69,251,0.15), transparent);
        }
        .ab-values-header {
          text-align: center;
          margin-bottom: 56px;
          animation: ab-fadeInUp 0.7s ease-out both;
        }
        .ab-values-h2 {
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 900;
          color: #0b0d20;
          line-height: 1.15;
          letter-spacing: -0.6px;
        }
        .ab-values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          perspective: 1200px;
        }
        .ab-value-card {
          background: #fff;
          border-radius: 20px;
          padding: 32px;
          border: 1px solid #eef0f6;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: all 0.5s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          animation: ab-slideInStagger 0.6s ease-out both;
          cursor: default;
        }
        .ab-value-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, transparent, rgba(33,69,251,0.03), transparent, rgba(249,115,22,0.02), transparent);
          opacity: 0;
          transition: opacity 0.5s ease;
          animation: ab-rotateGlow 10s linear infinite;
        }
        .ab-value-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: -150%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          transition: left 0.8s ease;
        }
        .ab-value-card:hover::after { left: 150%; }
        .ab-value-card:hover::before { opacity: 1; }
        .ab-value-card:nth-child(1) { animation-delay: 0.1s; }
        .ab-value-card:nth-child(2) { animation-delay: 0.2s; }
        .ab-value-card:nth-child(3) { animation-delay: 0.3s; }
        .ab-value-card:nth-child(4) { animation-delay: 0.4s; }
        .ab-value-card:nth-child(5) { animation-delay: 0.5s; }
        .ab-value-card:nth-child(6) { animation-delay: 0.6s; }
        .ab-value-card:hover {
          transform: translateY(-10px) rotateX(3deg) rotateY(-2deg) scale(1.02);
          box-shadow: 0 24px 48px rgba(33,69,251,0.1), 0 0 0 1px rgba(33,69,251,0.1);
          border-color: rgba(33,69,251,0.15);
        }
        .ab-value-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          position: relative;
          transition: all 0.4s ease;
        }
        .ab-value-card:hover .ab-value-icon-wrap {
          transform: scale(1.1) rotate(-5deg);
        }
        .ab-value-icon-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 14px;
          box-shadow: 0 0 0 0 currentColor;
          opacity: 0;
          transition: all 0.4s ease;
        }
        .ab-value-card:hover .ab-value-icon-wrap::after {
          box-shadow: 0 0 20px currentColor;
          opacity: 0.15;
        }
        .ab-value-title {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
          transition: color 0.3s ease;
          position: relative;
          z-index: 1;
        }
        .ab-value-card:hover .ab-value-title { color: #2145fb; }
        .ab-value-desc {
          font-size: 14px;
          color: #64748b;
          line-height: 1.7;
          position: relative;
          z-index: 1;
        }

        /* ═══════════════════════════════════════════════════════════════
           TIMELINE SECTION
           ═══════════════════════════════════════════════════════════════ */
        .ab-timeline-section {
          padding: 100px 0;
          position: relative;
          overflow: hidden;
        }
        .ab-timeline-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(33,69,251,0.15), transparent);
        }
        .ab-timeline-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .ab-timeline-left {
          animation: ab-fadeInLeft 0.7s ease-out both;
          position: sticky;
          top: 120px;
        }
        .ab-timeline-right {
          display: flex;
          flex-direction: column;
          animation: ab-fadeInRight 0.7s ease-out both;
          animation-delay: 0.2s;
        }
        .ab-timeline-item {
          display: flex;
          gap: 24px;
          align-items: stretch;
          animation: ab-slideInStagger 0.6s ease-out both;
          transition: all 0.3s ease;
        }
        .ab-timeline-item:nth-child(1) { animation-delay: 0.3s; }
        .ab-timeline-item:nth-child(2) { animation-delay: 0.45s; }
        .ab-timeline-item:nth-child(3) { animation-delay: 0.6s; }
        .ab-timeline-item:nth-child(4) { animation-delay: 0.75s; }
        .ab-timeline-item:nth-child(5) { animation-delay: 0.9s; }
        .ab-timeline-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }
        .ab-timeline-dot {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2145fb, #6366f1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          border: 4px solid #eff6ff;
          flex-shrink: 0;
          position: relative;
          transition: all 0.4s ease;
          box-shadow: 0 4px 16px rgba(33,69,251,0.25);
        }
        .ab-timeline-dot::after {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid rgba(33,69,251,0.15);
          opacity: 0;
          transition: all 0.3s ease;
        }
        .ab-timeline-item:hover .ab-timeline-dot {
          transform: scale(1.15);
          box-shadow: 0 6px 24px rgba(33,69,251,0.35);
        }
        .ab-timeline-item:hover .ab-timeline-dot::after { opacity: 1; }
        .ab-timeline-line {
          width: 2px;
          flex: 1;
          margin-top: 6px;
          position: relative;
          overflow: hidden;
        }
        .ab-timeline-line::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #2145fb, #eef0f6);
          opacity: 0.3;
        }
        .ab-timeline-line::after {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 30px;
          background: linear-gradient(180deg, transparent, #2145fb, transparent);
          animation: ab-drawLine 3s infinite;
          opacity: 0.5;
        }
        .ab-timeline-content {
          padding-bottom: 28px;
          transition: all 0.3s ease;
        }
        .ab-timeline-item:hover .ab-timeline-content {
          transform: translateX(4px);
        }
        .ab-timeline-year {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          margin-bottom: 4px;
          background: linear-gradient(135deg, #2145fb, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ab-timeline-title {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
          transition: color 0.3s ease;
        }
        .ab-timeline-item:hover .ab-timeline-title { color: #2145fb; }
        .ab-timeline-desc {
          font-size: 14px;
          color: #64748b;
          line-height: 1.7;
        }

        /* ═══════════════════════════════════════════════════════════════
           LEADERSHIP SECTION
           ═══════════════════════════════════════════════════════════════ */
        .ab-leadership-section {
          padding: 100px 0;
          position: relative;
          background: linear-gradient(180deg, #f8faff 0%, #ffffff 50%, #f8faff 100%);
          overflow: hidden;
        }
        .ab-leadership-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(33,69,251,0.15), transparent);
        }
        .ab-leadership-header {
          text-align: center;
          margin-bottom: 48px;
          animation: ab-fadeInUp 0.7s ease-out both;
        }
        .ab-founder-card {
          background: #fff;
          border: 1px solid #eef0f6;
          border-radius: 28px;
          padding: 52px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          display: flex;
          gap: 52px;
          align-items: flex-start;
          max-width: 880px;
          margin: 0 auto;
          animation: ab-fadeInUp 0.8s ease-out both;
          animation-delay: 0.2s;
          transition: all 0.5s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
        }
        .ab-founder-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 28px;
          background: linear-gradient(135deg, rgba(33,69,251,0.02), transparent, rgba(249,115,22,0.02));
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .ab-founder-card::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 30px;
          background: linear-gradient(135deg, #2145fb, #f97316, #2145fb);
          background-size: 400% 400%;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.5s ease;
          animation: ab-shimmerBorder 6s ease infinite;
        }
        .ab-founder-card:hover::before { opacity: 1; }
        .ab-founder-card:hover::after { opacity: 0.3; }
        .ab-founder-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 48px rgba(33,69,251,0.08);
        }
        .ab-founder-img {
          width: 190px;
          height: 230px;
          border-radius: 20px;
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 0 12px 32px rgba(0,0,0,0.12);
          position: relative;
          transition: all 0.5s ease;
        }
        .ab-founder-img::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 60%, rgba(33,69,251,0.1));
          pointer-events: none;
        }
        .ab-founder-card:hover .ab-founder-img {
          transform: scale(1.03) rotate(-1deg);
          box-shadow: 0 16px 40px rgba(0,0,0,0.16);
        }
        .ab-founder-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: transform 0.6s ease;
        }
        .ab-founder-card:hover .ab-founder-img img { transform: scale(1.05); }
        .ab-founder-name {
          font-size: 24px;
          font-weight: 800;
          color: #0b0d20;
          margin-bottom: 4px;
        }
        .ab-founder-role {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #2145fb, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ab-founder-bio {
          font-size: 15px;
          color: #64748b;
          line-height: 1.75;
          margin-bottom: 24px;
        }
        .ab-founder-quote {
          background: linear-gradient(135deg, #f8faff, #eff6ff);
          border-left: 4px solid;
          border-image: linear-gradient(180deg, #2145fb, #6366f1) 1;
          padding: 20px 24px;
          border-radius: 0 14px 14px 0;
          font-size: 14px;
          color: #374151;
          font-style: italic;
          line-height: 1.75;
          position: relative;
        }
        .ab-founder-quote::before {
          content: '"';
          position: absolute;
          top: 8px;
          left: 12px;
          font-size: 40px;
          font-style: normal;
          color: rgba(33,69,251,0.1);
          font-weight: 900;
          line-height: 1;
        }

        /* ═══════════════════════════════════════════════════════════════
           CTA SECTION
           ═══════════════════════════════════════════════════════════════ */
        .ab-cta-section {
          padding: 80px 0;
        }
        .ab-cta-card {
          background: linear-gradient(135deg, #0b0d20 0%, #131640 50%, #0b0d20 100%);
          background-size: 200% 200%;
          animation: ab-gradientShift 8s ease infinite;
          border-radius: 28px;
          padding: 80px 64px;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: all 0.5s ease;
        }
        .ab-cta-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.15), transparent),
            radial-gradient(2px 2px at 40% 70%, rgba(255,255,255,0.1), transparent),
            radial-gradient(2px 2px at 60% 20%, rgba(255,255,255,0.12), transparent),
            radial-gradient(2px 2px at 80% 50%, rgba(255,255,255,0.08), transparent),
            radial-gradient(2px 2px at 10% 80%, rgba(255,255,255,0.1), transparent),
            radial-gradient(2px 2px at 70% 90%, rgba(255,255,255,0.12), transparent),
            radial-gradient(2px 2px at 30% 50%, rgba(255,255,255,0.08), transparent),
            radial-gradient(2px 2px at 90% 10%, rgba(255,255,255,0.15), transparent);
          pointer-events: none;
          animation: ab-sparkle 4s ease-in-out infinite;
        }
        .ab-cta-card::after {
          content: '';
          position: absolute;
          top: -100px;
          left: -100px;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(33,69,251,0.15), transparent 70%);
          animation: ab-float 8s ease-in-out infinite;
          pointer-events: none;
        }
        .ab-cta-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.1;
        }
        .ab-cta-orb-1 {
          bottom: -50px;
          right: -50px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, #f97316, transparent);
          animation: ab-pulse 4s infinite;
        }
        .ab-cta-orb-2 {
          top: 20%;
          right: 20%;
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, #6366f1, transparent);
          animation: ab-float 5s ease-in-out infinite;
        }
        .ab-cta-h2 {
          font-size: clamp(1.6rem, 3vw, 2.6rem);
          font-weight: 900;
          color: #ffffff;
          line-height: 1.2;
          letter-spacing: -0.5px;
          margin-bottom: 16px;
          position: relative;
          z-index: 2;
          animation: ab-textGlow 4s ease-in-out infinite;
        }
        .ab-cta-p {
          font-size: 15px;
          color: rgba(255,255,255,0.6);
          margin-bottom: 36px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 2;
          line-height: 1.7;
        }
        .ab-cta-btns {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 2;
        }
        .ab-cta-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #f97316, #fb923c);
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          font-family: Poppins, sans-serif;
          padding: 16px 36px;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 6px 24px rgba(249,115,22,0.4);
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          overflow: hidden;
        }
        .ab-cta-btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          background-size: 200% 100%;
          animation: ab-shimmer 2.5s infinite;
        }
        .ab-cta-btn-primary:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 10px 36px rgba(249,115,22,0.5);
        }
        .ab-cta-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.05);
          color: #fff;
          font-weight: 500;
          font-size: 14px;
          font-family: Poppins, sans-serif;
          padding: 16px 36px;
          border-radius: 999px;
          text-decoration: none;
          border: 1.5px solid rgba(255,255,255,0.2);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        .ab-cta-btn-secondary:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.4);
          transform: translateY(-3px);
        }

        /* ═══════════════════════════════════════════════════════════════
           TRUST MARQUEE (between sections)
           ═══════════════════════════════════════════════════════════════ */
        .ab-trust-marquee {
          padding: 20px 0;
          overflow: hidden;
          background: linear-gradient(90deg, #f8faff, #eff6ff, #f8faff);
          border-top: 1px solid rgba(33,69,251,0.05);
          border-bottom: 1px solid rgba(33,69,251,0.05);
        }
        .ab-trust-track {
          display: flex;
          animation: ab-marqueeLeft 25s linear infinite;
          width: max-content;
        }
        .ab-trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 40px;
          font-size: 13px;
          font-weight: 600;
          color: #94a3b8;
          white-space: nowrap;
        }
        .ab-trust-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #2145fb;
          opacity: 0.4;
        }

        /* ═══════════════════════════════════════════════════════════════
           RESPONSIVE
           ═══════════════════════════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .ab-mission-grid,
          .ab-timeline-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .ab-values-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .ab-stats-strip {
            grid-template-columns: repeat(2, 1fr);
          }
          .ab-founder-card {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 36px;
          }
          .ab-founder-quote {
            text-align: left;
          }
          .ab-timeline-left {
            position: static;
          }
        }
        @media (max-width: 640px) {
          .ab-values-grid {
            grid-template-columns: 1fr;
          }
          .ab-stats-strip {
            grid-template-columns: repeat(2, 1fr);
          }
          .ab-mission-visual {
            height: 380px;
          }
          .ab-mission-img-main {
            width: 80%;
            height: 220px;
          }
          .ab-mission-img-secondary {
            width: 65%;
            height: 180px;
          }
          .ab-cta-card {
            padding: 48px 24px;
          }
          .ab-hero-h1 {
            letter-spacing: -0.8px;
          }
          .ab-float-badge-left {
            left: -8px;
            bottom: 130px;
          }
          .ab-float-badge-right {
            right: -8px;
            top: 30px;
          }
        }
      `}</style>

      {/* ══════════════════════════════════════════════
           HERO SECTION
           ══════════════════════════════════════════════ */}
      <section className="ab-hero-section inner-section">
        <div className="ab-hero-grid-bg" />
        <div className="container">
          <div className="ab-hero-content">
            <nav className="ab-hero-breadcrumb">
              <a href="/">Home</a>
              <span>›</span>
              <span style={{ color: '#374151' }}>About Us</span>
            </nav>
            <div className="ab-hero-label">
              <div className="ab-hero-label-line" />
              <span className="ab-hero-label-text">
                <Sparkles size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                Our Story
              </span>
            </div>
            <h1 className="ab-hero-h1">
              <span className="ab-h1-line">We&apos;re Not Just a</span>
              <span className="ab-h1-line">Placement Agency.</span>
              <span className="ab-h1-accent">We&apos;re Career Partners.</span>
            </h1>
            <p className="ab-hero-desc">
              Born in Delhi NCR. Built for every professional who deserves better — a better role, a better salary, and a career that actually reflects their potential.
            </p>
            <div className="ab-hero-btns">
              <a href="/contact" className="ab-btn-primary">
                <Rocket size={15} /> Start Your Journey
              </a>
              <a href="#our-story" className="ab-btn-secondary">
                Read Our Story ↓
              </a>
            </div>
          </div>

          {/* Stats strip — 3D cards */}
          <div className="ab-stats-strip">
            {stats.map((s) => (
              <div key={s.num} className="ab-stat-card">
                <div className="ab-stat-dot" />
                <div className="ab-stat-num">{s.num}</div>
                <div className="ab-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
           TRUST MARQUEE
           ══════════════════════════════════════════════ */}
      <div className="ab-trust-marquee">
        <div className="ab-trust-track">
          {[
            'Career Assistance Programme',
            'Zero Upfront Fee',
            '12% Success Share',
            '300+ Careers Transformed',
            '50+ Hiring Partners',
            '140+ Universities',
            'Study Abroad Services',
            'Average 40% Salary Hike',
            'Career Assistance Programme',
            'Zero Upfront Fee',
            '12% Success Share',
            '300+ Careers Transformed',
            '50+ Hiring Partners',
            '140+ Universities',
            'Study Abroad Services',
            'Average 40% Salary Hike',
          ].map((text, i) => (
            <div key={i} className="ab-trust-item">
              <div className="ab-trust-dot" />
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
           MISSION SECTION
           ══════════════════════════════════════════════ */}
      <section className="ab-mission-section inner-section" id="our-story">
        <div className="container">
          <div className="ab-mission-grid">
            <div className="ab-mission-text">
              <div className="ab-section-label">
                <div className="ab-section-label-line" />
                Our Mission
              </div>
              <h2 className="ab-mission-h2">
                Making Career Growth <span className="ab-accent">Accessible</span> for Everyone
              </h2>
              <p className="ab-mission-p">
                Placedly was founded with one deeply held belief: exceptional careers shouldn&apos;t be a privilege reserved for people with the right connections. Every professional deserves expert guidance, real employer access, and a fair shot at the role they want.
              </p>
              <p className="ab-mission-p-bold">
                We operate on a simple model: <strong>zero upfront, success-share only.</strong> Career Assistance Fee of 12% of CTC — collected only after you receive your offer letter. If we don&apos;t place you, you don&apos;t pay.
              </p>
              <a href="/contact" className="ab-mission-cta">
                Talk to Our Team <ArrowRight size={15} />
              </a>
            </div>
            <div className="ab-mission-visual">
              <div className="ab-mission-img-main">
                <img src="/img/team.png" alt="Placedly Team" />
              </div>
              <div className="ab-mission-img-secondary">
                <img src="/img/aboutt us consultancy.png" alt="Consultancy" />
              </div>
              <div className="ab-float-badge ab-float-badge-left">
                <div className="ab-badge-icon" style={{ background: '#eff6ff' }}>
                  <Trophy size={19} color="#2145fb" />
                </div>
                <div>
                  <div className="ab-badge-num">300+</div>
                  <div className="ab-badge-label">Careers Transformed</div>
                </div>
              </div>
              <div className="ab-float-badge ab-float-badge-right">
                <div className="ab-badge-icon" style={{ background: '#f0fdf4' }}>
                  <Handshake size={19} color="#16a34a" />
                </div>
                <div>
                  <div className="ab-badge-num">50+</div>
                  <div className="ab-badge-label">Hiring Partners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
           VALUES SECTION
           ══════════════════════════════════════════════ */}
      <section className="ab-values-section inner-section alt">
        <div className="container">
          <div className="ab-values-header">
            <div className="ab-section-label" style={{ justifyContent: 'center' }}>
              <div className="ab-section-label-line" />
              What We Stand For
            </div>
            <h2 className="ab-values-h2">
              The Principles That <span style={{ color: '#2145fb' }}>Drive Us</span>
            </h2>
          </div>
          <div className="ab-values-grid">
            {values.map((v) => (
              <div key={v.title} className="ab-value-card">
                <div className="ab-value-icon-wrap" style={{ background: v.bg, color: v.color }}>
                  <v.Icon size={22} color={v.color} />
                </div>
                <div className="ab-value-title">{v.title}</div>
                <div className="ab-value-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
           TIMELINE SECTION
           ══════════════════════════════════════════════ */}
      <section className="ab-timeline-section inner-section">
        <div className="container">
          <div className="ab-timeline-grid">
            <div className="ab-timeline-left">
              <div className="ab-section-label">
                <div className="ab-section-label-line" />
                Our Journey
              </div>
              <h2 className="ab-mission-h2">
                From Startup to <span className="ab-accent">300+ Placements</span>
              </h2>
              <p className="ab-mission-p">
                Every milestone was earned the hard way — one candidate at a time, one employer relationship at a time.
              </p>
            </div>
            <div className="ab-timeline-right">
              {timeline.map((item, i) => (
                <div key={item.year} className="ab-timeline-item">
                  <div className="ab-timeline-marker">
                    <div className="ab-timeline-dot">{i + 1}</div>
                    {i < timeline.length - 1 && <div className="ab-timeline-line" />}
                  </div>
                  <div className="ab-timeline-content" style={{ paddingBottom: i < timeline.length - 1 ? '28px' : 0 }}>
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

      {/* ══════════════════════════════════════════════
           LEADERSHIP SECTION
           ══════════════════════════════════════════════ */}
      <section className="ab-leadership-section inner-section alt">
        <div className="container">
          <div className="ab-leadership-header">
            <div className="ab-section-label" style={{ justifyContent: 'center' }}>
              <div className="ab-section-label-line" />
              Leadership
            </div>
            <h2 className="ab-values-h2">
              The Person Behind <span style={{ color: '#2145fb' }}>Placedly</span>
            </h2>
          </div>
          <div className="ab-founder-card">
            <div className="ab-founder-img">
              <img src="/img/at founder part.png" alt="Founder" />
            </div>
            <div>
              <div className="ab-founder-name">Our Founder</div>
              <div className="ab-founder-role">Founder &amp; CEO, Placedly</div>
              <p className="ab-founder-bio">
                With a deep background in talent acquisition and career consulting across Delhi NCR&apos;s top MNCs, our founder built Placedly with a frustration-turned-mission: too many talented professionals were being left behind by a system that favoured connections over competence.
              </p>
              <div className="ab-founder-quote">
                &ldquo;Your next job shouldn&apos;t depend on who you know. It should depend on how well we prepare you.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
           CTA SECTION
           ══════════════════════════════════════════════ */}
      <section className="ab-cta-section inner-section">
        <div className="container">
          <div className="ab-cta-card">
            <div className="ab-cta-orb ab-cta-orb-1" />
            <div className="ab-cta-orb ab-cta-orb-2" />
            <h2 className="ab-cta-h2">Ready to Write Your Success Story?</h2>
            <p className="ab-cta-p">Join 300+ professionals who trusted Placedly to transform their career. Zero upfront — you only pay after you&apos;re placed.</p>
            <div className="ab-cta-btns">
              <a href="/contact" className="ab-cta-btn-primary">
                <Rocket size={15} /> Get Placed Now
              </a>
              <a href="/study-visa" className="ab-cta-btn-secondary">
                <Plane size={15} /> Study Abroad
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}