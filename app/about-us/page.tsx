export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import PageLayout from '../components/PageLayout';
import { getCmsMap, parseCmsJson } from '@/lib/cms';
import AboutUsExperience, { type AboutPayload } from './AboutUsExperience';

export const metadata: Metadata = {
  title: 'About Us — Placedly',
  description:
    "Learn about Placedly — Delhi NCR's career placement and global education consultancy.",
};

const DEFAULT_STATS: AboutPayload['stats'] = [
  { num: '300+', label: 'Professionals Placed' },
  { num: '50+', label: 'Hiring Partners' },
  { num: '40%', label: 'Avg. Salary Hike' },
  { num: '₹0', label: 'Upfront Cost' },
];

const DEFAULT_VALUES: AboutPayload['values'] = [
  {
    icon: 'Target',
    color: '#2145fb',
    bg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    title: 'Personalised, Always',
    desc: 'No two careers are the same. Every candidate gets a bespoke roadmap built around their skills, goals, and target industry — not a generic playbook.',
  },
  {
    icon: 'DollarSign',
    color: '#16a34a',
    bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    title: 'Zero Upfront',
    desc: 'We believe in putting our money where our mouth is. Career Assistance Fee of 12% is charged only after you receive your offer letter.',
  },
  {
    icon: 'Handshake',
    color: '#f97316',
    bg: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
    title: 'End-to-End Partnership',
    desc: 'From CV rebuild to day 90 in your new role — we stay with you through every step, including salary negotiation and joining support.',
  },
  {
    icon: 'Globe',
    color: '#0891b2',
    bg: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)',
    title: 'Global Reach',
    desc: '140+ university partners across UK, France, Germany, and Dubai. We make international education accessible, transparent, and stress-free.',
  },
  {
    icon: 'Building2',
    color: '#7c3aed',
    bg: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
    title: 'Direct Employer Access',
    desc: 'Our 50+ hiring partner network means your profile goes directly to decision-makers — not into a black-hole job board.',
  },
  {
    icon: 'TrendingUp',
    color: '#ef4444',
    bg: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
    title: 'Measurable Outcomes',
    desc: 'Average 40% salary hike. 300+ careers transformed. First interview call within 1–2 weeks. Results you can count on.',
  },
];

const DEFAULT_TIMELINE: AboutPayload['timeline'] = [
  {
    year: '2022',
    title: 'Placedly Founded',
    desc: 'Started in Delhi NCR with a single mission: make career growth transparent and accessible to every professional.',
  },
  {
    year: '2023',
    title: '100 Placements Milestone',
    desc: 'Crossed 100 successful placements and launched our flagship Career Assistance Programme.',
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

type AbCmsData = {
  stats?: Array<{ num?: string; label?: string }>;
  values?: Array<{ icon?: string; title?: string; desc?: string }>;
  timeline?: Array<{ year?: string; title?: string; desc?: string }>;
  founder?: {
    name?: string;
    role?: string;
    bio?: string;
    quote?: string;
  };
};

export default async function AboutUsPage() {
  const cmsMap = await getCmsMap('ab:');
  const abCms = parseCmsJson<AbCmsData>(cmsMap, 'ab:data', {});

  const stats =
    abCms.stats && abCms.stats.length > 0
      ? abCms.stats.map((s) => ({
          num: s.num ?? '',
          label: s.label ?? '',
        }))
      : DEFAULT_STATS;

  const values =
    abCms.values && abCms.values.length > 0
      ? abCms.values.map((v, i) => {
          const def = DEFAULT_VALUES[i] ?? DEFAULT_VALUES[0];

          return {
            icon: v.icon ?? def.icon,
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
      <AboutUsExperience
        stats={stats}
        values={values}
        timeline={timeline}
        founder={founder}
      />
    </PageLayout>
  );
}