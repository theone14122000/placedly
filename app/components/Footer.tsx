'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import GenZBlobs from './GenZBlobs';

const IgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const TwIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LiIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const FbIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

type Cms = Record<string, string>;

export default function Footer({ cms = {} }: { cms?: Cms }) {
  const desc =
    cms['hp:footerDesc'] ??
    "India's career growth and study abroad consultancy. Career Assistance Programme: 12% Success Share, post-placement only. Study Abroad: UK · France · Germany · Dubai. Zero upfront. We grow when you grow.";
  const ctaText = cms['hp:footerCtaText'] ?? 'Grow Careers. Grow Global.';
  const instagram = cms['hp:footerInstagram'] ?? 'https://www.instagram.com/';
  const twitter = cms['hp:footerTwitter'] ?? 'https://twitter.com/';
  const linkedin = cms['hp:footerLinkedin'] ?? 'https://linkedin.com/';
  const facebook = cms['hp:footerFacebook'] ?? 'https://www.facebook.com/';
  const email = cms['hp:footerEmail'] ?? 'hello@placedly.in';
  const wa = cms['hp:footerWa'] ?? cms['hp:waNumber'] ?? '919876543210';
  const copyright =
    cms['hp:footerCopyright'] ??
    '© 2026 Placedly · Career Assistance Programme · Study Abroad Consultancy · India · CAP Fee: 12% of Annual CTC · Career Assistance Fee — Not a Placement Fee · Collected post-offer letter only · All engagements governed by signed Candidate Service Agreement';

  const socials = [
    { href: instagram, label: 'Instagram', Icon: IgIcon },
    { href: twitter, label: 'Twitter / X', Icon: TwIcon },
    { href: linkedin, label: 'LinkedIn', Icon: LiIcon },
    { href: facebook, label: 'Facebook', Icon: FbIcon },
  ];

  return (
    <footer className="placedly-footer">
      <GenZBlobs />

      <div className="placedly-genz-wrap placedly-footer-wrap">
        <motion.div
          className="placedly-genz-glass placedly-footer-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <div className="placedly-footer-grid">
            <div className="placedly-footer-brand">
              <Link href="/" className="placedly-footer-logo">
                <img loading="lazy" src="/logo-dark.png" alt="Placedly" />
              </Link>

              <div className="placedly-footer-socials">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="placedly-footer-social"
                    aria-label={label}
                  >
                    <Icon />
                  </a>
                ))}
              </div>

              <p className="placedly-footer-desc">{desc}</p>

              <Link href="#contact" className="placedly-footer-cta">
                {ctaText}
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </Link>
            </div>

            <div className="placedly-footer-col">
              <h3 className="placedly-footer-heading">Useful Links</h3>
              <nav className="placedly-footer-links">
                <Link href="/">Home</Link>
                <Link href="#services">Services</Link>
                <Link href="/about-us">About Us</Link>
                <Link href="#vacancies">Vacancies</Link>
                <Link href="/cap">CAP Programme</Link>
                <Link href="/study-visa">Study Visa</Link>
              </nav>
            </div>

            <div className="placedly-footer-col">
              <h3 className="placedly-footer-heading">Get in Touch</h3>
              <nav className="placedly-footer-links">
                <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                </a>
                <a href={`mailto:${email}`}>{email}</a>
                <Link href="/terms">Terms &amp; Services</Link>
                <Link href="/privacy">Privacy Policy</Link>
              </nav>
            </div>
          </div>
        </motion.div>

        <div className="placedly-footer-bottom">
          <p className="placedly-footer-copy">{copyright}</p>
          <a href="#Top" className="placedly-footer-top" aria-label="Scroll to top">
            <ArrowUp size={18} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
