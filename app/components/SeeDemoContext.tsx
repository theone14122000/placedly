'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Play, X } from 'lucide-react';

type SeeDemoContextValue = {
  openDemo: () => void;
  closeDemo: () => void;
  isOpen: boolean;
};

const SeeDemoContext = createContext<SeeDemoContextValue | null>(null);

export function useSeeDemo() {
  const ctx = useContext(SeeDemoContext);
  if (!ctx) {
    throw new Error('useSeeDemo must be used within SeeDemoProvider');
  }
  return ctx;
}

export function SeeDemoProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openDemo = useCallback(() => setOpen(true), []);
  const closeDemo = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <SeeDemoContext.Provider value={{ openDemo, closeDemo, isOpen: open }}>
      {children}
      <SeeDemoModal open={open} onClose={closeDemo} />
    </SeeDemoContext.Provider>
  );
}

function SeeDemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });

  useEffect(() => {
    if (!open) {
      setSent(false);
      setSubmitting(false);
      setForm({ name: '', email: '', phone: '', interest: '', message: '' });
    }
  }, [open]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 700);
  };

  const inputClass = (name: string) =>
    `placedly-demo-input${focused === name ? ' is-focused' : ''}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="placedly-demo-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="placedly-demo-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="placedly-demo-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className="placedly-demo-close"
              aria-label="Close"
              onClick={onClose}
            >
              <X size={18} strokeWidth={2} />
            </button>

            <div className="placedly-demo-layout">
              <div className="placedly-demo-copy">
                <p className="placedly-demo-eyebrow">Get started with Placedly</p>
                <h2 id="placedly-demo-title" className="placedly-demo-title">
                  Schedule a free expert session
                </h2>
                <p className="placedly-demo-desc">
                  Book a 30-minute walkthrough of our Career Assistance Programme or Study
                  Abroad process — personalised to your goals, no obligation.
                </p>

                <ul className="placedly-demo-points">
                  <li>
                    <CheckCircle2 size={16} strokeWidth={2.25} aria-hidden />
                    Free consultation — zero upfront fees
                  </li>
                  <li>
                    <CheckCircle2 size={16} strokeWidth={2.25} aria-hidden />
                    Career placement or study abroad roadmap
                  </li>
                  <li>
                    <CheckCircle2 size={16} strokeWidth={2.25} aria-hidden />
                    Real advisor, not a sales script
                  </li>
                </ul>

                <div className="placedly-demo-stats">
                  <div>
                    <strong>300+</strong>
                    <span>Careers placed</span>
                  </div>
                  <div>
                    <strong>140+</strong>
                    <span>Universities</span>
                  </div>
                  <div>
                    <strong>₹0</strong>
                    <span>Upfront fee</span>
                  </div>
                </div>
              </div>

              <div className="placedly-demo-form-wrap">
                {sent ? (
                  <div className="placedly-demo-success">
                    <CheckCircle2 size={40} strokeWidth={1.75} aria-hidden />
                    <h3>You&apos;re booked in!</h3>
                    <p>
                      Thanks — our team will reach out within 24 hours to confirm your session
                      time.
                    </p>
                    <a
                      href="https://wa.me/919910116901"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="placedly-demo-wa-link"
                    >
                      Chat on WhatsApp for faster scheduling
                    </a>
                    <button type="button" className="placedly-demo-submit" onClick={onClose}>
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="placedly-demo-form-title">Request your demo</p>
                    <form className="placedly-demo-form" onSubmit={handleSubmit}>
                      <label className="placedly-demo-label">
                        Full name *
                        <input
                          className={inputClass('name')}
                          required
                          value={form.name}
                          onFocus={() => setFocused('name')}
                          onBlur={() => setFocused('')}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your name"
                        />
                      </label>
                      <label className="placedly-demo-label">
                        Work email *
                        <input
                          className={inputClass('email')}
                          type="email"
                          required
                          value={form.email}
                          onFocus={() => setFocused('email')}
                          onBlur={() => setFocused('')}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@company.com"
                        />
                      </label>
                      <label className="placedly-demo-label">
                        Phone / WhatsApp *
                        <input
                          className={inputClass('phone')}
                          type="tel"
                          required
                          value={form.phone}
                          onFocus={() => setFocused('phone')}
                          onBlur={() => setFocused('')}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </label>
                      <label className="placedly-demo-label">
                        I&apos;m interested in *
                        <select
                          className={inputClass('interest')}
                          required
                          value={form.interest}
                          onFocus={() => setFocused('interest')}
                          onBlur={() => setFocused('')}
                          onChange={(e) => setForm({ ...form, interest: e.target.value })}
                        >
                          <option value="">Select</option>
                          <option value="cap">Career Assistance Programme (CAP)</option>
                          <option value="study">Study Abroad</option>
                          <option value="both">Both — not sure yet</option>
                        </select>
                      </label>
                      <label className="placedly-demo-label">
                        Anything we should know?
                        <textarea
                          className={inputClass('message')}
                          rows={3}
                          value={form.message}
                          onFocus={() => setFocused('message')}
                          onBlur={() => setFocused('')}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Target role, destination, timeline…"
                        />
                      </label>
                      <button
                        type="submit"
                        className="placedly-demo-submit"
                        disabled={submitting}
                      >
                        {submitting ? 'Scheduling…' : 'See a demo'}
                      </button>
                      <p className="placedly-demo-footnote">
                        Free session. No spam. We reply within 24 hours.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
