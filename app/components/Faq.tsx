'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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
        <span className="placedly-faq-toggle" aria-hidden>
          {open ? '−' : '+'}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="placedly-faq-answer-wrap"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
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
            <h2 className="placedly-faq-title">Frequently asked questions</h2>
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
    </section>
  );
}
