'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Building2, ClipboardList, Stethoscope, Wallet, type LucideIcon } from 'lucide-react';
import GenZBlobs from './GenZBlobs';

type Industry = {
  serial: string;
  name: string;
  Icon: LucideIcon;
  details: string;
  href: string;
  linkText: string;
  accent: string;
  grad: string;
  tag: string;
  companies: string[];
  stat: string;
  statLabel: string;
  img: string;
};

const industries: Industry[] = [
  {
    serial: '001',
    name: 'US Healthcare Claims & Operations',
    Icon: Stethoscope,
    details:
      'CPT/ICD-10, denial management, AR follow-up, adjudication, COB — direct hiring connects at Optum, EXL, Access Healthcare, Conifer Health & WNS across India.',
    href: '/cap',
    linkText: 'View Healthcare Roles',
    accent: '#2563eb',
    grad: 'linear-gradient(135deg,#60a5fa,#2145fb)',
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
    accent: '#7c3aed',
    grad: 'linear-gradient(135deg,#a78bfa,#7c3aed)',
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
    accent: '#f97316',
    grad: 'linear-gradient(135deg,#fdba74,#f97316)',
    tag: 'Finance & BPO/KPO',
    companies: ['Genpact', 'WNS', 'Mphasis', 'HCL BPO', 'EXL'],
    stat: '90+',
    statLabel: 'Finance Pros Placed',
    img: 'https://images.unsplash.com/photo-1754531976828-69e42ce4e0d9?w=800&h=480&fit=crop&q=80',
  },
];

export default function Industries() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="placedly-genz-section placedly-domains-section" id="domains">
      <GenZBlobs />
      <div className="placedly-genz-wrap">
        <motion.div
          className="placedly-genz-header"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="placedly-genz-eyebrow">Our Focus Areas</p>
          <h2 className="placedly-genz-title">
            Domains Where We Place Talent — And Know It Deeply
          </h2>
        </motion.div>

        <div className="placedly-domains-grid">
          {industries.map((ind, i) => (
            <motion.article
              key={ind.serial}
              className="placedly-genz-glass placedly-domain-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={prefersReducedMotion ? undefined : { y: -8, scale: 1.01, rotate: -0.5 }}
            >
              <div className="placedly-domain-img-wrap">
                <img src={ind.img} alt={ind.name} className="placedly-domain-img" loading="lazy" />
                <div className="placedly-domain-overlay" />
                <span className="placedly-domain-serial">{ind.serial}</span>
                <span className="placedly-domain-badge" style={{ color: ind.accent, borderColor: `${ind.accent}44`, background: `${ind.accent}14` }}>
                  <ind.Icon size={12} strokeWidth={2.5} />
                  {ind.tag}
                </span>
              </div>
              <div className="placedly-domain-body">
                <div className="placedly-domain-body-top">
                  <span className="placedly-domain-icon" style={{ background: ind.grad }}>
                    <ind.Icon size={16} strokeWidth={2.25} color="#fff" />
                  </span>
                  <div>
                    <h3 className="placedly-domain-name">{ind.name}</h3>
                    <p className="placedly-domain-details">{ind.details}</p>
                  </div>
                </div>
                <div className="placedly-domain-stat">
                  <strong style={{ color: ind.accent }}>{ind.stat}</strong>
                  <span>{ind.statLabel}</span>
                </div>
                <div className="placedly-domain-chips">
                  {ind.companies.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
                <Link href={ind.href} className="placedly-genz-link">
                  {ind.linkText}
                  <ArrowUpRight size={15} strokeWidth={2.5} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
