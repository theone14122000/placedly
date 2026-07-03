'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import {
  ArrowRight, ChevronDown, CircleUserRound, Menu, X, Sparkles,
} from 'lucide-react';
import { megaMenuColumns } from '../lib/navServices';

/* ============================================================
   DESIGN SYSTEM TOKENS
   ============================================================ */
const BRAND = ['#2563eb', '#7c8ff0', '#fb923c', '#f43f5e', '#a855f7'];
const EASE = [0.22, 1, 0.36, 1] as const;

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About Us' },
  { href: '/vacancies', label: 'Vacancies' },
];

export default function Navbar() {
  const pathname = usePathname();
  const shellRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onPointer = (event: MouseEvent) => {
      if (shellRef.current && !shellRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setServicesOpen(false); };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [servicesOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleLink = () => { setServicesOpen(false); setMobileOpen(false); };
  const toggleServices = () => setServicesOpen(v => !v);
  const toggleMobile = () => setMobileOpen(v => !v);
  const toggleMobileColumn = (id: string) => setMobileExpanded(v => (v === id ? null : id));

  // ✅ Text is ALWAYS dark — the bar itself is always a readable frosted surface,
  // regardless of what section is scrolled behind it. This fixes the invisible-text bug.
  const TEXT = '#0f172a';
  const MUTED = '#64748b';

  return (
    <>
      {/* ===== Scroll progress bar ===== */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 1100,
          transformOrigin: 'left', scaleX: scrollYProgress,
          background: 'linear-gradient(90deg,#2563eb,#7c8ff0,#fb923c,#f43f5e,#a855f7)',
        }}
      />

      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          transition: 'background .4s ease, box-shadow .4s ease, border-color .4s ease, backdrop-filter .4s ease',
          // ✅ Always a light frosted glass surface — never fully transparent,
          // so text contrast is guaranteed no matter what's behind it.
          background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.62)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: scrolled ? '1px solid rgba(15,23,42,0.07)' : '1px solid rgba(15,23,42,0.04)',
          boxShadow: scrolled ? '0 8px 30px rgba(15,23,42,0.08)' : '0 2px 12px rgba(15,23,42,0.03)',
        }}
      >
        <div ref={shellRef} style={{ position: 'relative' }}>
          <div style={{
            maxWidth: 1320, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)',
            height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            {/* ===== LEFT: Logo + desktop links ===== */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
              <Link href="/" onClick={handleLink} style={{ textDecoration: 'none' }}>
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  style={{
                    display: 'inline-block', fontSize: 24, fontWeight: 900, letterSpacing: '-0.02em',
                    backgroundImage: 'linear-gradient(270deg,#2563eb,#7c8ff0,#fb923c,#f43f5e,#a855f7,#2563eb)',
                    backgroundSize: '300% 300%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text', animation: 'navGradientShift 6s ease infinite',
                  }}
                >
                  placedly
                </motion.span>
              </Link>

              <nav aria-label="Main navigation" className="pd-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {navLinks.map(link => {
                  const active = pathname === link.href;
                  const isHovered = hovered === link.href;
                  const show = isHovered || (active && hovered === null);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={handleLink}
                      onMouseEnter={() => setHovered(link.href)}
                      onMouseLeave={() => setHovered(null)}
                      className="pd-nav-link"
                      style={{
                        position: 'relative', padding: '9px 16px', fontSize: 14, fontWeight: 600,
                        textDecoration: 'none', display: 'inline-block',
                      }}
                    >
                      {show && (
                        <motion.span
                          layoutId="navHoverPill"
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                          style={{
                            position: 'absolute', inset: 0, borderRadius: 999,
                            background: 'rgba(37,99,235,0.09)',
                            border: '1px solid rgba(37,99,235,0.14)',
                            zIndex: 0,
                          }}
                        />
                      )}
                      <span
                        style={{
                          position: 'relative', zIndex: 1,
                          color: active || isHovered ? 'transparent' : TEXT,
                          backgroundImage: active || isHovered ? 'linear-gradient(90deg,#2563eb,#7c8ff0)' : 'none',
                          WebkitBackgroundClip: active || isHovered ? 'text' : 'unset',
                          backgroundClip: active || isHovered ? 'text' : 'unset',
                          transition: 'color .2s ease',
                        }}
                      >
                        {link.label}
                      </span>
                      {/* animated underline */}
                      <motion.span
                        initial={false}
                        animate={{ scaleX: active ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        style={{
                          position: 'absolute', left: 16, right: 16, bottom: 3, height: 2, borderRadius: 999,
                          background: 'linear-gradient(90deg,#2563eb,#fb923c)', transformOrigin: 'left', zIndex: 1,
                        }}
                      />
                    </Link>
                  );
                })}

                {/* Services trigger (desktop) */}
                <button
                  type="button"
                  onClick={toggleServices}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  className="pd-services-trigger"
                  style={{
                    position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '9px 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                    background: servicesOpen ? 'rgba(37,99,235,0.1)' : 'rgba(15,23,42,0.035)',
                    color: servicesOpen ? '#2563eb' : TEXT,
                    border: servicesOpen ? '1px solid rgba(37,99,235,0.25)' : '1px solid rgba(15,23,42,0.07)',
                    borderRadius: 999, fontFamily: 'inherit', marginLeft: 6,
                    transition: 'background .25s ease, color .25s ease, border-color .25s ease',
                  }}
                >
                  Services
                  <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: EASE }} style={{ display: 'flex' }}>
                    <ChevronDown size={15} strokeWidth={2.25} />
                  </motion.span>
                </button>
              </nav>
            </div>

            {/* ===== RIGHT: CTAs (desktop) ===== */}
            <div className="pd-desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Link
                href="/login"
                onClick={handleLink}
                className="pd-signin-link"
                style={{
                  position: 'relative', fontSize: 14, fontWeight: 700, padding: '10px 18px',
                  color: TEXT, textDecoration: 'none',
                }}
              >
                Sign in
                <span className="pd-signin-underline" />
              </Link>

              <motion.div whileHover={{ y: -3 }} whileTap={{ y: 0, scale: 0.98 }}>
                <Link
                  href="/cap/apply"
                  onClick={handleLink}
                  className="pd-cta-shine"
                  style={{
                    position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none',
                    background: 'linear-gradient(135deg,#2563eb,#7c8ff0)', color: '#fff', overflow: 'hidden',
                    fontWeight: 700, fontSize: 14, padding: '11px 24px', borderRadius: 999,
                    boxShadow: '0 8px 22px rgba(37,99,235,0.35)', fontFamily: 'inherit',
                  }}
                >
                  <span className="pd-cta-shine-sweep" aria-hidden />
                  <span style={{ position: 'relative', zIndex: 1 }}>Apply for CAP</span>
                  <motion.span
                    style={{ position: 'relative', zIndex: 1, display: 'flex' }}
                    animate={{ x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowRight size={14} />
                  </motion.span>
                </Link>
              </motion.div>

              <Link
                href="/login"
                onClick={handleLink}
                aria-label="Sign in"
                className="pd-avatar-btn"
                style={{
                  width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: TEXT, border: '1.5px solid #e2e8f0', background: 'rgba(255,255,255,0.6)',
                }}
              >
                <CircleUserRound size={19} strokeWidth={1.75} />
              </Link>
            </div>

            {/* ===== Mobile hamburger ===== */}
            <button
              type="button"
              className="pd-mobile-toggle"
              onClick={toggleMobile}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              style={{
                display: 'none', width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
                background: 'rgba(15,23,42,0.05)', border: '1px solid rgba(15,23,42,0.06)', cursor: 'pointer',
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', color: TEXT }}
                >
                  {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          {/* ================= DESKTOP MEGA MENU ================= */}
          <AnimatePresence>
            {servicesOpen && (
              <>
                <motion.button
                  type="button"
                  aria-label="Close services menu"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  onClick={() => setServicesOpen(false)}
                  style={{
                    position: 'fixed', inset: 0, top: 72, background: 'rgba(15,23,42,0.25)',
                    backdropFilter: 'blur(2px)', border: 'none', cursor: 'default', zIndex: -1,
                  }}
                />
                <motion.div
                  role="dialog" aria-label="All Placedly services"
                  initial={{ opacity: 0, y: -12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.985 }}
                  transition={{ duration: 0.34, ease: EASE }}
                  style={{
                    position: 'absolute', top: '100%', left: 0, right: 0, margin: '12px auto 0',
                    maxWidth: 1200, width: 'calc(100% - 32px)', background: '#ffffff',
                    borderRadius: 24, border: '1px solid rgba(15,23,42,0.06)',
                    boxShadow: '0 30px 80px rgba(15,23,42,0.16)', padding: 32, overflow: 'hidden',
                  }}
                >
                  <div style={{
                    display: 'grid', gridTemplateColumns: `repeat(${Math.min(megaMenuColumns.length, 4)}, 1fr)`,
                    gap: 20, marginBottom: 24,
                  }}>
                    {megaMenuColumns.map((column, columnIndex) => {
                      const color = BRAND[columnIndex % BRAND.length];
                      return (
                        <motion.div
                          key={column.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.04 + columnIndex * 0.05, ease: EASE }}
                          whileHover={{ y: -4 }}
                          className="pd-mega-col"
                          style={{
                            position: 'relative', padding: '20px 18px', borderRadius: 18,
                            border: '1px solid rgba(15,23,42,0.06)', overflow: 'hidden',
                          }}
                        >
                          <div style={{
                            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                            background: `linear-gradient(90deg, ${color}, ${BRAND[(columnIndex + 1) % BRAND.length]})`,
                          }} />
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                            <span style={{
                              width: 36, height: 36, borderRadius: 10, background: `${color}18`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                            }}>
                              <column.Icon size={17} strokeWidth={1.85} color={color} />
                            </span>
                            <h3 style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.01em' }}>
                              {column.title}
                            </h3>
                          </div>
                          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {column.links.map((link, linkIndex) => (
                              <motion.li
                                key={link.href + link.label}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.24, delay: 0.08 + columnIndex * 0.06 + linkIndex * 0.03 }}
                              >
                                <Link
                                  href={link.href}
                                  onClick={handleLink}
                                  className="pd-mega-link"
                                  style={{
                                    display: 'flex', alignItems: 'center', gap: 8, padding: '7px 6px', borderRadius: 8,
                                    fontSize: 13, color: '#5b6472', textDecoration: 'none', fontWeight: 500,
                                    transition: 'color .2s ease, transform .2s ease',
                                  }}
                                >
                                  <span className="pd-mega-dot" style={{
                                    width: 5, height: 5, borderRadius: '50%', background: '#cbd5e1',
                                    flexShrink: 0, transition: 'background .2s ease',
                                  }} />
                                  {link.label}
                                </Link>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div style={{ display: 'flex', gap: 16, marginBottom: 20, paddingTop: 16, borderTop: '1px solid rgba(15,23,42,0.06)' }}>
                    <Link href="/about-us" onClick={handleLink} style={{ fontSize: 13, fontWeight: 600, color: MUTED, textDecoration: 'none' }}>About Us</Link>
                    <Link href="/vacancies" onClick={handleLink} style={{ fontSize: 13, fontWeight: 600, color: MUTED, textDecoration: 'none' }}>Vacancies</Link>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                    <Link
                      href="/services" onClick={handleLink}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13.5, fontWeight: 700,
                        color: '#2563eb', textDecoration: 'none',
                      }}
                    >
                      View all services <ArrowRight size={14} />
                    </Link>
                    <Link
                      href="/#utility-tools" onClick={handleLink}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13.5, fontWeight: 700,
                        color: '#a855f7', textDecoration: 'none',
                      }}
                    >
                      <Sparkles size={13} /> Try AI utility tools <ArrowRight size={14} />
                    </Link>
                    <motion.div whileHover={{ y: -2 }} style={{ marginLeft: 'auto' }}>
                      <Link
                        href="/cap/apply" onClick={handleLink}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none',
                          background: 'linear-gradient(135deg,#fb923c,#f43f5e)', color: '#fff',
                          fontWeight: 700, fontSize: 13.5, padding: '11px 22px', borderRadius: 999,
                          boxShadow: '0 8px 22px rgba(251,146,60,0.3)',
                        }}
                      >
                        Apply for CAP
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(6,9,18,0.55)', zIndex: 1050, backdropFilter: 'blur(4px)' }}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(400px, 92vw)', zIndex: 1060,
                background: '#ffffff', boxShadow: '-20px 0 60px rgba(15,23,42,0.2)',
                display: 'flex', flexDirection: 'column', overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
                filter: 'blur(60px)', pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', bottom: -60, left: -60, width: 240, height: 240, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)',
                filter: 'blur(60px)', pointerEvents: 'none',
              }} />

              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '20px 24px', borderBottom: '1px solid rgba(15,23,42,0.06)', position: 'relative', zIndex: 1,
              }}>
                <span style={{
                  fontSize: 20, fontWeight: 900,
                  backgroundImage: 'linear-gradient(270deg,#2563eb,#7c8ff0,#fb923c,#f43f5e,#a855f7,#2563eb)',
                  backgroundSize: '300% 300%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text', animation: 'navGradientShift 6s ease infinite',
                }}>
                  placedly
                </span>
                <button
                  type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu"
                  style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(15,23,42,0.05)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <X size={19} color="#0f172a" />
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', position: 'relative', zIndex: 1 }}>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 8 }}>
                  {navLinks.map((link, i) => {
                    const active = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.05 + i * 0.05, ease: EASE }}
                      >
                        <Link
                          href={link.href} onClick={handleLink}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 10, padding: '13px 12px', borderRadius: 12,
                            fontSize: 16, fontWeight: 700, textDecoration: 'none',
                            color: active ? '#2563eb' : '#0f172a',
                            background: active ? 'rgba(37,99,235,0.07)' : 'transparent',
                          }}
                        >
                          {active && <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#2563eb' }} />}
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <motion.div
                  initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.2, ease: EASE }}
                  style={{ borderTop: '1px solid rgba(15,23,42,0.06)', marginTop: 12, paddingTop: 12 }}
                >
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0 12px', marginBottom: 8 }}>
                    Services
                  </div>
                  {megaMenuColumns.map((column, columnIndex) => {
                    const color = BRAND[columnIndex % BRAND.length];
                    const expanded = mobileExpanded === column.id;
                    return (
                      <div key={column.id} style={{ marginBottom: 4 }}>
                        <button
                          type="button" onClick={() => toggleMobileColumn(column.id)}
                          style={{
                            width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '11px 12px',
                            background: expanded ? `${color}0d` : 'transparent', border: 'none', borderRadius: 12,
                            cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                          }}
                        >
                          <span style={{ width: 30, height: 30, borderRadius: 8, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <column.Icon size={15} color={color} strokeWidth={1.85} />
                          </span>
                          <span style={{ flex: 1, fontSize: 14.5, fontWeight: 700, color: '#0f172a' }}>{column.title}</span>
                          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ display: 'flex' }}>
                            <ChevronDown size={16} color="#94a3b8" />
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {expanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: EASE }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div style={{ display: 'flex', flexDirection: 'column', padding: '4px 12px 10px 52px', gap: 2 }}>
                                {column.links.map(link => (
                                  <Link
                                    key={link.href + link.label} href={link.href} onClick={handleLink}
                                    style={{ fontSize: 13.5, color: '#64748b', textDecoration: 'none', padding: '7px 0', fontWeight: 500 }}
                                  >
                                    {link.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                  <div style={{ display: 'flex', gap: 16, padding: '10px 12px 0' }}>
                    <Link href="/services" onClick={handleLink} style={{ fontSize: 13, fontWeight: 700, color: '#2563eb', textDecoration: 'none' }}>View all services →</Link>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.3, ease: EASE }}
                style={{
                  padding: 20, borderTop: '1px solid rgba(15,23,42,0.06)', display: 'flex', flexDirection: 'column', gap: 10,
                  position: 'relative', zIndex: 1, background: '#fff',
                }}
              >
                <Link
                  href="/cap/apply" onClick={handleLink}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none',
                    background: 'linear-gradient(135deg,#2563eb,#7c8ff0)', color: '#fff',
                    fontWeight: 700, fontSize: 15, padding: '14px', borderRadius: 999,
                    boxShadow: '0 8px 24px rgba(37,99,235,0.35)',
                  }}
                >
                  Apply for CAP <ArrowRight size={16} />
                </Link>
                <Link
                  href="/login" onClick={handleLink}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none',
                    color: '#0f172a', fontWeight: 700, fontSize: 15, padding: '13px', borderRadius: 999,
                    border: '1.5px solid #e2e8f0',
                  }}
                >
                  <CircleUserRound size={17} /> Sign in
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes navGradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .pd-nav-link:hover .pd-signin-underline { transform: scaleX(1); }

        .pd-services-trigger:hover {
          border-color: rgba(37,99,235,0.3) !important;
          box-shadow: 0 4px 14px rgba(37,99,235,0.12);
        }

        .pd-signin-link { overflow: hidden; }
        .pd-signin-underline {
          position: absolute; left: 18px; right: 18px; bottom: 6px; height: 2px; border-radius: 999px;
          background: linear-gradient(90deg,#2563eb,#fb923c);
          transform: scaleX(0); transform-origin: left; transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .pd-signin-link:hover .pd-signin-underline { transform: scaleX(1); }

        .pd-avatar-btn { transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
        .pd-avatar-btn:hover {
          transform: scale(1.08);
          border-color: rgba(37,99,235,0.35);
          box-shadow: 0 0 0 4px rgba(37,99,235,0.08);
        }

        .pd-cta-shine { isolation: isolate; }
        .pd-cta-shine-sweep {
          position: absolute; top: 0; left: -130%; width: 55%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.5), transparent);
          transform: skewX(-20deg); transition: left 0.65s ease; z-index: 0; pointer-events: none;
        }
        .pd-cta-shine:hover .pd-cta-shine-sweep { left: 140%; }

        .pd-mega-col { transition: box-shadow .3s ease, border-color .3s ease; }
        .pd-mega-col:hover { box-shadow: 0 20px 50px rgba(15,23,42,0.1); border-color: rgba(15,23,42,0.09); }
        .pd-mega-link:hover { color: #2563eb !important; transform: translateX(3px); }
        .pd-mega-link:hover .pd-mega-dot { background: #2563eb !important; }

        @media (max-width: 900px) {
          .pd-desktop-links, .pd-desktop-actions { display: none !important; }
          .pd-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}