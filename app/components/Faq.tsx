'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────
   DESIGN SYSTEM TOKENS
───────────────────────────────────────────────────────── */
const GEOM_FONT = `'Inter', 'Manrope', 'Geist', 'Plus Jakarta Sans', system-ui, sans-serif`;

const ORANGE        = '#f97316';
const ORANGE_DARK   = '#ea580c';
const ORANGE_SOFT   = 'rgba(249, 115, 22, 0.08)';
const ORANGE_BORDER = 'rgba(249, 115, 22, 0.18)';
const ORANGE_BORDER_STRONG = 'rgba(249, 115, 22, 0.28)';

const DEFAULT_FAQS = [
  {
    q: 'What services does Placedly offer?',
    a: "Placedly runs two services: the Career Assistance Programme (CAP) — helping professionals land MNC roles through resume rebuild, interview coaching, and direct employer connect — and the Study Abroad Programme, connecting students to 140+ universities in UK, France, Germany and Dubai. Both are end-to-end, with a dedicated advisor for every candidate.",
  },
  {
    q: 'Is there a fee for your consultation services?',
    a: "Initial consultation is completely free — no commitment at all. For CAP, we charge a Career Assistance Fee of 12% of your annual CTC — but only after you receive your offer letter. This is not a placement fee. We charge for the career assistance work we do — resume rebuild, interview coaching, and active job search support. You pay nothing upfront, nothing during the process, and nothing if you don't get placed. For Study Abroad, fee structure is shared transparently during your free counselling session.",
  },
  {
    q: 'What industries does Placedly cover?',
    a: "Our strongest domains are US Healthcare Claims, Insurance & Underwriting Operations (including Lloyd's Market), Finance & Accounts, and BPO/KPO Operations. We place professionals in these domains at MNCs across India including EXL, Optum, WNS, Quatrro, Cognizant and more.",
  },
  {
    q: 'How long does the placement process take?',
    a: 'For CAP, the average time from programme start to offer letter is 15–21 days. Resume ready in 48 hours. Interview coaching in days 5–10. Active employer outreach from day 7. Our fastest placement was completed in 9 days.',
  },
  {
    q: 'Is the Career Assistance Programme right for me?',
    a: "CAP is designed for professionals with 1+ year of full-time experience in Healthcare, Insurance, Finance, or BPO/KPO — targeting roles at MNCs across India. If you're serious about career growth and want someone genuinely working on your side, yes — CAP is for you.",
  },
  {
    q: 'Do you work with freshers as well as experienced professionals?',
    a: "For career placement, we primarily work with professionals with 1+ year of experience — we know the market well enough to guarantee results. For Study Abroad, we work with students at all levels — Bachelor's applicants, post-graduates, and even working professionals considering an international degree.",
  },
  {
    q: 'How is Placedly different from other placement agencies?',
    a: "Placedly is not a placement agency. We run a Career Assistance Programme — meaning we charge for the career work we do (resume, coaching, job search strategy), not for the placement itself. Placement happens through our recruitment network. Most consultants charge upfront regardless of outcome — we charge a Career Assistance Fee of 12% of CTC, only after your offer letter arrives. Zero upfront. Zero risk for you.",
  },
  {
    q: 'What happens after I get placed?',
    a: 'For CAP — we remain available for offer negotiation support, onboarding guidance, and 30-day post-placement check-in. For Study Abroad — we provide pre-departure support including accommodation guidance, banking setup abroad, and travel prep.',
  },
];

/* ─────────────────────────────────────────────────────────
   FAQ ITEM
───────────────────────────────────────────────────────── */
function FaqItem({
  q,
  a,
  open,
  index,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  index: number;
  onToggle: () => void;
}) {
  const paragraphs = a.split(/\n\n/).filter(Boolean);

  return (
    <motion.div
      className={`faq-item${open ? ' faq-item--open' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.38, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        className="faq-trigger"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="faq-q">{q}</span>
        <motion.span
          className="faq-icon"
          aria-hidden
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="faq-answer-wrap"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="faq-answer">
              {paragraphs.length > 1
                ? paragraphs.map((para, i) => <p key={i}>{para}</p>)
                : <p>{a}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────── */
export default function Faq() {
  const [faqs, setFaqs] = useState(DEFAULT_FAQS);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    fetch('/api/admin/content?prefix=faq:')
      .then((r) => r.json())
      .then((map: Record<string, string>) => {
        try {
          const raw = map['faq:data'];
          if (!raw) return;
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed?.faqs) && parsed.faqs.length > 0) {
            setFaqs(parsed.faqs);
          }
        } catch {
          /* keep defaults */
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="faq-section" id="faq">
      <style>{`
        /* ── FONT STACK ─────────────────────────── */
        .faq-section,
        .faq-section * {
          font-family: ${GEOM_FONT};
          font-feature-settings: "ss01","cv11","cv02";
          font-optical-sizing: auto;
          box-sizing: border-box;
        }

        /* ── SECTION ────────────────────────────── */
        .faq-section {
          background: #f8fafc;
          padding: clamp(56px, 7vw, 96px) clamp(16px, 4vw, 40px);
        }

        /* ── CONTAINER ──────────────────────────── */
        .faq-inner {
          max-width: 1020px;
          margin: 0 auto;
        }

        /* ── LAYOUT ─────────────────────────────── */
        .faq-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        @media (min-width: 900px) {
          .faq-layout {
            grid-template-columns: 260px 1fr;
            gap: 56px;
            align-items: start;
          }
        }

        /* ── STICKY HEADING COL ─────────────────── */
        .faq-heading-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        @media (min-width: 900px) {
          .faq-heading-col {
            position: sticky;
            top: 88px;
          }
        }

        /* ── EYEBROW ─────────────────────────────── */
        .faq-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: ${ORANGE};
          background: ${ORANGE_SOFT};
          border: 1px solid ${ORANGE_BORDER};
          border-radius: 999px;
          padding: 5px 12px;
          width: fit-content;
        }
        .faq-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${ORANGE};
          flex-shrink: 0;
        }

        /* ── HEADING ─────────────────────────────── */
        .faq-title {
          font-size: clamp(1.75rem, 3vw, 2.4rem);
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.15;
          color: #0f172a;
          margin: 0;
        }

        /* ── SUBTEXT ─────────────────────────────── */
        .faq-sub {
          font-size: 14.5px;
          line-height: 1.65;
          color: #64748b;
          margin: 0;
          max-width: 240px;
        }

        /* ── CONTACT NUDGE ───────────────────────── */
        .faq-nudge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
          font-size: 13px;
          font-weight: 600;
          color: ${ORANGE};
          text-decoration: none;
          transition: color 0.18s;
        }
        .faq-nudge:hover { color: ${ORANGE_DARK}; }

        .faq-nudge-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: ${ORANGE_SOFT};
          font-size: 13px;
          transition: background 0.18s, transform 0.18s;
        }
        .faq-nudge:hover .faq-nudge-arrow {
          background: ${ORANGE_BORDER};
          transform: translateX(2px);
        }

        /* ── FAQ LIST ────────────────────────────── */
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        /* ── FAQ ITEM ────────────────────────────── */
        .faq-item {
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.07);
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.22s ease, box-shadow 0.22s ease;
          box-shadow: 0 1px 4px rgba(15, 23, 42, 0.04);
        }
        .faq-item:hover {
          border-color: ${ORANGE_BORDER};
          box-shadow: 0 4px 14px rgba(249, 115, 22, 0.08);
        }
        .faq-item--open {
          border-color: ${ORANGE_BORDER_STRONG};
          border-left: 3px solid ${ORANGE};
          box-shadow: 0 6px 20px rgba(249, 115, 22, 0.10);
        }

        /* ── TRIGGER ─────────────────────────────── */
        .faq-trigger {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 18px 20px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          gap: 16px;
          transition: background 0.18s ease;
        }
        .faq-trigger:hover { background: #fff7ed; }

        /* ── QUESTION TEXT ───────────────────────── */
        .faq-q {
          font-size: 15px;
          font-weight: 600;
          color: #0f172a;
          line-height: 1.45;
          letter-spacing: -0.01em;
          flex: 1;
        }
        .faq-item--open .faq-q {
          color: ${ORANGE_DARK};
        }

        /* ── TOGGLE ICON ─────────────────────────── */
        .faq-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #f1f5f9;
          color: #475569;
          font-size: 18px;
          font-weight: 400;
          line-height: 1;
          flex-shrink: 0;
          transition: background 0.2s ease, color 0.2s ease;
          font-family: inherit;
        }
        .faq-item--open .faq-icon {
          background: ${ORANGE};
          color: #ffffff;
        }

        /* ── ANSWER ──────────────────────────────── */
        .faq-answer-wrap { overflow: hidden; }

        .faq-answer {
          padding: 0 20px 18px 20px;
          border-top: 1px solid rgba(249, 115, 22, 0.08);
          padding-top: 14px;
        }

        .faq-answer p {
          margin: 0 0 12px;
          font-size: 14px;
          line-height: 1.72;
          color: #475569;
          font-weight: 400;
        }
        .faq-answer p:last-child { margin-bottom: 0; }

        /* ── RESPONSIVE ──────────────────────────── */
        @media (max-width: 640px) {
          .faq-q      { font-size: 14px; }
          .faq-sub    { max-width: 100%; }
          .faq-trigger { padding: 16px; }
          .faq-answer  { padding: 0 16px 16px; padding-top: 12px; }
        }
      `}</style>

      <div className="faq-inner">
        <div className="faq-layout">

          {/* ── Sticky heading column ── */}
          <div className="faq-heading-col">
            <span className="faq-eyebrow">
              <span className="faq-eyebrow-dot" />
              FAQ
            </span>

            <h2 className="faq-title">
              Frequently asked<br />questions
            </h2>

            <p className="faq-sub">
              Can't find the answer you're looking for? Reach out to our team.
            </p>

            <a href="/contact" className="faq-nudge">
              Contact us
              <span className="faq-nudge-arrow">→</span>
            </a>
          </div>

          {/* ── FAQ list ── */}
          <div className="faq-list">
            {faqs.map((item, i) => (
              <FaqItem
                key={i}
                q={item.q}
                a={item.a}
                open={openIndex === i}
                index={i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}