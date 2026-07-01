'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const HEADING_GRADIENT =
  'linear-gradient(270deg, #2563eb 0%, #4f46e5 20%, #f97316 45%, #f43f5e 65%, #9333ea 85%, #2563eb 100%)';

const gradientTextStyle: React.CSSProperties = {
  backgroundImage: HEADING_GRADIENT,
  backgroundSize: '200% 200%',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
};

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

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const paragraphs = a.split(/\n\n/).filter(Boolean);

  return (
    <div className={`placedly-faq-item${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="placedly-faq-trigger"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="placedly-faq-question">{q}</span>
        <motion.span 
          className="placedly-faq-toggle" 
          aria-hidden
          initial={false}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="placedly-faq-answer-wrap"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="placedly-faq-answer">
              {paragraphs.length > 1 ? (
                paragraphs.map((para, i) => <p key={i}>{para}</p>)
              ) : (
                <p>{a}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
          // keep defaults
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="section faq-v1 placedly-faq-section" id="faq">
      <div className="container placedly-faq-container">
        <div className="placedly-faq-layout">
          <div className="placedly-faq-heading-col">
            <h2 className="placedly-faq-title" style={gradientTextStyle}>
              Frequently asked questions
            </h2>
          </div>

          <div className="placedly-faq-list">
            {faqs.map((item, i) => (
              <FaqItem
                key={i}
                q={item.q}
                a={item.a}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* --- Scoped Design Improvements --- */
        
        .placedly-faq-section {
          background: #fff;
          padding: 4rem 1rem;
        }
        
        .placedly-faq-title {
          font-size: 2.5rem;
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }
        
        /* Layout Grid */
        .placedly-faq-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        
        @media (min-width: 900px) {
          .placedly-faq-layout {
            grid-template-columns: 280px 1fr;
            align-items: start;
          }
          .placedly-faq-heading-col {
            position: sticky;
            top: 6rem;
          }
        }

        /* FAQ Item Card */
        .placedly-faq-item {
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 16px;
          background: #fff;
          margin-bottom: 1rem;
          overflow: hidden;
          transition: all 0.25s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        
        .placedly-faq-item:hover {
          border-color: rgba(37, 99, 235, 0.15);
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }

        .placedly-faq-item.is-open {
          border-left: 4px solid #2563eb; /* Matches the start of the gradient */
          box-shadow: 0 12px 24px rgba(37, 99, 235, 0.08);
          border-color: transparent;
        }
        
        /* Trigger Button */
        .placedly-faq-trigger {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 1.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: background 0.2s ease;
        }
        
        .placedly-faq-trigger:hover {
          background: #fafafa;
        }
        
        .placedly-faq-question {
          font-size: 1.125rem;
          font-weight: 600;
          color: #0f172a;
          line-height: 1.4;
          padding-right: 1rem;
        }
        
        /* Toggle Icon */
        .placedly-faq-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background: #f1f5f9;
          color: #475569;
          font-size: 1.25rem;
          font-weight: 500;
          flex-shrink: 0;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .placedly-faq-item.is-open .placedly-faq-toggle {
          background: #2563eb;
          color: #fff;
        }

        /* Answer Area */
        .placedly-faq-answer-wrap {
          overflow: hidden;
        }
        
        .placedly-faq-answer {
          padding: 0 1.5rem 1.5rem 1.5rem;
        }

        .placedly-faq-answer p {
          margin: 0 0 1rem 0;
          color: #475569;
          line-height: 1.65;
          font-size: 1rem;
        }
        
        .placedly-faq-answer p:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </section>
  );
}