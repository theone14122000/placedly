'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ClipboardList, Stethoscope, Wallet, type LucideIcon } from 'lucide-react';
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
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('[data-domain-step]');
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number(entry.target.getAttribute('data-domain-step'));
          if (!Number.isNaN(idx)) setActiveStep(idx);
        });
      },
      { threshold: 0.5, rootMargin: '-44% 0px -44% 0px' },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

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

        <div className="placedly-domains-list">
          {industries.map((ind, i) => {
            const depth = Math.min(Math.max(0, activeStep - i), 4);
            return (
              <article
                key={ind.serial}
                data-domain-step={i}
                className={`placedly-domain-row${activeStep === i ? ' is-active' : ''}`}
                style={{
                  ['--accent' as string]: ind.accent,
                  zIndex: i + 1,
                  transform: depth > 0
                    ? `translateY(${-depth * 14}px) scale(${1 - depth * 0.045})`
                    : undefined,
                }}
              >
                <div className="placedly-domain-media">
                  <img src={ind.img} alt={ind.name} className="placedly-domain-img" loading="lazy" />
                  <span className="placedly-domain-serial">{ind.serial}</span>
                </div>
                <div className="placedly-domain-content">
                  <span className="placedly-domain-tag">
                    <span className="placedly-domain-tag-icon">
                      <ind.Icon size={14} strokeWidth={2.5} />
                    </span>
                    {ind.tag}
                  </span>
                  <h3 className="placedly-domain-name">{ind.name}</h3>
                  <p className="placedly-domain-details">{ind.details}</p>
                  <div className="placedly-domain-chips">
                    {ind.companies.map((c) => (
                      <span key={c}>{c}</span>
                    ))}
                  </div>
                  <div className="placedly-domain-footer">
                    <div className="placedly-domain-stat">
                      <strong>{ind.stat}</strong>
                      <span>{ind.statLabel}</span>
                    </div>
                    <Link href={ind.href} className="placedly-domain-cta">
                      {ind.linkText}
                      <ArrowUpRight size={16} strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
