'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, CircleUserRound } from 'lucide-react';
import { megaMenuColumns } from '../lib/navServices';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About Us' },
  { href: '/vacancies', label: 'Vacancies' },
];

const columnEase = [0.22, 1, 0.36, 1] as const;
const ORANGE = '#f97316';
const ORANGE_DARK = '#ea580c';
const ORANGE_LIGHT = '#fb923c';

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

  const handleLink = () => setServicesOpen(false);
  const toggleServices = () => setServicesOpen((value) => !value);

  return (
    <header
      className={`placedly-navbar${scrolled ? ' is-scrolled' : ''}${isHome ? ' is-home' : ''}${servicesOpen ? ' is-services-open' : ''}`}
    >
      <style>{`
        .placedly-nav-wordmark,
        .placedly-nav-wordmark:visited,
        .placedly-nav-wordmark:hover,
        .placedly-nav-wordmark:focus,
        .placedly-nav-wordmark:active {
          background-image: linear-gradient(135deg, #f97316, #ea580c) !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          color: transparent !important;
          display: inline-block;
        }

        /* ★★★ FIX: Chevron button — ALWAYS orange circle ★★★
           The orange background is now UNCONDITIONAL.
           It does NOT depend on .is-scrolled or .is-home.
           We use a more specific selector + !important to win
           against any global stylesheet rule. */
        .placedly-navbar .placedly-nav-services-trigger,
        .placedly-navbar .placedly-nav-services-trigger.is-open,
        .placedly-navbar.is-home .placedly-nav-services-trigger,
        .placedly-navbar.is-home .placedly-nav-services-trigger.is-open,
        .placedly-navbar.is-scrolled .placedly-nav-services-trigger,
        .placedly-navbar:not(.is-scrolled) .placedly-nav-services-trigger,
        .placedly-navbar:not(.is-home) .placedly-nav-services-trigger,
        .placedly-navbar.is-services-open .placedly-nav-services-trigger {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 38px !important;
          height: 38px !important;
          border-radius: 50% !important;
          border: 1px solid rgba(255, 255, 255, 0.18) !important;
          background: linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_DARK} 100%) !important;
          color: #110303 !important;
          cursor: pointer !important;
          flex-shrink: 0 !important;
          box-shadow:
            0 4px 12px rgba(249, 115, 22, 0.32),
            inset 0 1px 0 rgba(255, 255, 255, 0.20) !important;
          transition:
            background 0.2s ease,
            transform 0.2s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.25s cubic-bezier(0.22, 1, 0.36, 1) !important;
        }

        /* Hover state — slightly lighter orange + deeper glow */
        .placedly-navbar .placedly-nav-services-trigger:hover,
        .placedly-navbar.is-home .placedly-nav-services-trigger:hover,
        .placedly-navbar.is-scrolled .placedly-nav-services-trigger:hover {
          background: linear-gradient(135deg, ${ORANGE_LIGHT} 0%, ${ORANGE} 100%) !important;
          box-shadow:
            0 6px 18px rgba(249, 115, 22, 0.42),
            inset 0 1px 0 rgba(255, 255, 255, 0.28) !important;
        }

        /* Active / pressed */
        .placedly-navbar .placedly-nav-services-trigger:active {
          transform: scale(0.94) !important;
        }

        /* Open state — darker orange + icon rotated */
        .placedly-navbar .placedly-nav-services-trigger.is-open {
          background: linear-gradient(135deg, ${ORANGE_DARK} 0%, #c2410c 100%) !important;
        }
        .placedly-navbar .placedly-nav-services-trigger.is-open svg {
          transform: rotate(180deg) !important;
        }

        /* Icon rotation always animates */
        .placedly-navbar .placedly-nav-services-trigger svg {
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1) !important;
        }

        /* Focus ring */
        .placedly-navbar .placedly-nav-services-trigger:focus-visible {
          outline: 2px solid ${ORANGE_LIGHT} !important;
          outline-offset: 2px !important;
        }

        /* Profile icon (unchanged) */
        .placedly-nav-profile {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 38px !important;
          height: 38px !important;
          border-radius: 12px !important;
          border: 1px solid rgba(15, 23, 42, 0.10) !important;
          background: rgba(15, 23, 42, 0.06) !important;
          color: #0b0d20 !important;
          flex-shrink: 0 !important;
          cursor: pointer !important;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease !important;
        }
        .placedly-nav-profile:hover {
          background: rgba(15, 23, 42, 0.10) !important;
          color: #000 !important;
        }
        .placedly-nav-profile:active { transform: scale(0.96) !important; }
        .placedly-nav-profile:focus-visible {
          outline: 2px solid #f97316 !important;
          outline-offset: 2px !important;
        }
      `}</style>

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

            <Link
              href="/login"
              className="placedly-nav-profile"
              onClick={handleLink}
              aria-label="Sign in"
            >
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
                            transition={{ duration: 0.24, delay: 0.08 + columnIndex * 0.06 + linkIndex * 0.03 }}
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
                  <Link href="/about-us" className="placedly-nav-mega-quick-link" onClick={handleLink}>About Us</Link>
                  <Link href="/vacancies" className="placedly-nav-mega-quick-link" onClick={handleLink}>Vacancies</Link>
                </div>

                <div className="placedly-nav-mega-footer">
                  <Link href="/services" className="placedly-nav-mega-all" onClick={handleLink}>View all services</Link>
                  <Link href="/#utility-tools" className="placedly-nav-mega-tools" onClick={handleLink}>Try AI utility tools</Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}