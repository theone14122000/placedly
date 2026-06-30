'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, CircleUserRound } from 'lucide-react';
import { megaMenuColumns } from '../lib/navServices';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About Us' },
  { href: '/vacancies', label: 'Vacancies' },
];

const columnEase = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const shellRef = useRef<HTMLDivElement>(null);

  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!servicesOpen) return;

    const onPointer = (event: MouseEvent) => {
      if (shellRef.current && !shellRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setServicesOpen(false);
    };

    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [servicesOpen]);

  const handleLink = () => {
    setServicesOpen(false);
  };

  const toggleServices = () => setServicesOpen((value) => !value);

  return (
    <header
      className={`placedly-navbar${scrolled ? ' is-scrolled' : ''}${isHome ? ' is-home' : ''}${servicesOpen ? ' is-services-open' : ''}`}
    >
      <div className="placedly-navbar-shell" ref={shellRef}>
        <div className="placedly-navbar-inner">
          <div className="placedly-nav-start">
            <Link href="/" className="placedly-nav-brand" onClick={handleLink}>
              <span className="placedly-nav-wordmark">placedly</span>
            </Link>

            <nav className="placedly-nav-links" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="placedly-nav-item"
                  onClick={handleLink}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="placedly-nav-right">
            <Link href="/login" className="nav-login-link" onClick={handleLink}>
              Sign in
            </Link>
            <Link href="/cap/apply" className="placedly-nav-cta" onClick={handleLink}>
              Apply for CAP
            </Link>

            <Link href="/cap/apply" className="placedly-nav-liftoff-pill" onClick={handleLink}>
              Apply for CAP
            </Link>

            <button
              type="button"
              className={`placedly-nav-services-trigger${servicesOpen ? ' is-open' : ''}`}
              onClick={toggleServices}
              aria-label="Browse all services"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              <ChevronDown size={20} strokeWidth={2.25} aria-hidden />
            </button>

            <Link href="/login" className="placedly-nav-profile" onClick={handleLink} aria-label="Sign in">
              <CircleUserRound size={20} strokeWidth={1.75} aria-hidden />
            </Link>
          </div>
        </div>

        <AnimatePresence>
          {servicesOpen && (
            <>
              <motion.button
                type="button"
                className="placedly-nav-mega-backdrop"
                aria-label="Close services menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                onClick={() => setServicesOpen(false)}
              />
              <motion.div
                className="placedly-nav-mega"
                role="dialog"
                aria-label="All Placedly services"
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.985 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="placedly-nav-mega-columns">
                  {megaMenuColumns.map((column, columnIndex) => (
                    <motion.div
                      key={column.id}
                      className="placedly-nav-mega-col"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: 0.04 + columnIndex * 0.05, ease: columnEase }}
                    >
                      <div className="placedly-nav-mega-col-head">
                        <span className="placedly-nav-mega-col-icon" aria-hidden>
                          <column.Icon size={18} strokeWidth={1.85} />
                        </span>
                        <h3 className="placedly-nav-mega-col-title">{column.title}</h3>
                      </div>
                      <ul className="placedly-nav-mega-links">
                        {column.links.map((link, linkIndex) => (
                          <motion.li
                            key={link.href + link.label}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.24,
                              delay: 0.08 + columnIndex * 0.06 + linkIndex * 0.03,
                            }}
                          >
                            <Link href={link.href} className="placedly-nav-mega-link" onClick={handleLink}>
                              <span className="placedly-nav-mega-link-dot" aria-hidden />
                              {link.label}
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                <div className="placedly-nav-mega-quick">
                  <Link href="/about-us" className="placedly-nav-mega-quick-link" onClick={handleLink}>
                    About Us
                  </Link>
                  <Link href="/vacancies" className="placedly-nav-mega-quick-link" onClick={handleLink}>
                    Vacancies
                  </Link>
                </div>

                <div className="placedly-nav-mega-footer">
                  <Link href="/services" className="placedly-nav-mega-all" onClick={handleLink}>
                    View all services
                    <ArrowRight size={15} strokeWidth={2.25} aria-hidden />
                  </Link>
                  <Link href="/#utility-tools" className="placedly-nav-mega-tools" onClick={handleLink}>
                    Try AI utility tools
                    <ArrowRight size={15} strokeWidth={2.25} aria-hidden />
                  </Link>
                  <Link href="/cap/apply" className="placedly-nav-mega-apply" onClick={handleLink}>
                    Apply for CAP
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
