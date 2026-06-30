'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import GenZBlobs from './GenZBlobs';

const testimonials = [
  {
    metric: 73,
    details: (
      <>
        &quot;4 years in US healthcare claims and my career had stalled at ₹4.2L. Placedly rebuilt my resume from scratch, coached me for the domain round, and sent my profile directly to a hiring manager at EXL. 18 days later — offer letter in hand at ₹7.3L. I paid the Success Share happily.&quot;
      </>
    ),
    name: 'Priya Sharma',
    date: 'Claims Analyst → Sr. Claims Analyst, Gurgaon | +73% CTC',
    img: 'https://images.unsplash.com/photo-1758518729459-235dcaadc611?w=120&h=120&fit=crop&crop=face&q=80',
  },
  {
    metric: 71,
    details: (
      <>
        &quot;I had a 14-month career gap and had been rejected by three agencies. Placedly didn&apos;t just take my case — they coached me on exactly how to own my gap in an interview. Three weeks later, placed at an MNC in Noida. Knowing they only earn after I land the role is what gave me the confidence to try.&quot;
      </>
    ),
    name: 'Rahul Mehta',
    date: 'Associate → Operations Lead, Noida | +71% CTC',
    img: 'https://images.unsplash.com/photo-1589386417686-0d34b5903d23?w=120&h=120&fit=crop&crop=face&q=80',
  },
  {
    metric: 68,
    details: (
      <>
        &quot;I was in BPO for 5 years wanting to break into insurance ops. Placedly knew which companies were actively hiring and introduced me directly to the hiring manager. Got placed on my very first interview. Worth every rupee of the Success Share.&quot;
      </>
    ),
    name: 'Anjali Kapoor',
    date: 'BPO → Insurance Operations, Delhi | +68% CTC',
    img: 'https://images.unsplash.com/photo-1637589267610-6c66fc2a086b?w=120&h=120&fit=crop&crop=face&q=80',
  },
  {
    metric: null,
    details: (
      <>
        &quot;Placedly isn&apos;t just a service — it&apos;s a career partner. I highly recommend them to anyone serious about growing professionally.&quot;
      </>
    ),
    name: 'Harshall Gibbs',
    date: 'March 28, 2024',
    img: 'https://images.unsplash.com/photo-1646743231546-2e846f063199?w=120&h=120&fit=crop&crop=face&q=80',
  },
  {
    metric: null,
    details: (
      <>
        &quot;What stood out was how personalised everything felt. They understood my goals and helped me land a job I actually love.&quot;
      </>
    ),
    name: 'Ayesha K.',
    date: 'March 28, 2024',
    img: 'https://images.unsplash.com/photo-1642757205086-567b72efaa80?w=120&h=120&fit=crop&crop=face&q=80',
  },
];

type TestimonialItem = {
  details: React.ReactNode;
  name: string;
  date: string;
  img: string;
  metric?: number | null;
};

function useCountUp(target: number | null, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target == null || !active) {
      setValue(0);
      return;
    }

    let frame = 0;
    let start: number | null = null;
    const duration = 900;

    const tick = (now: number) => {
      if (start == null) start = now;
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [target, active]);

  return value;
}

function TestimonialCard({ t, index }: { t: TestimonialItem; index: number }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const metricValue = useCountUp(t.metric ?? null, hasAnimated);

  return (
    <motion.article
      className="placedly-genz-glass placedly-testimonial-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -8, rotateX: -3, rotateY: 3, scale: 1.01 }}
      onViewportEnter={() => setHasAnimated(true)}
    >
      <Quote className="placedly-testimonial-quote-icon" size={28} strokeWidth={1.5} aria-hidden />
      {t.metric != null && (
        <div className="placedly-testimonial-metric-wrap">
          <span className="placedly-testimonial-metric">+{metricValue}%</span>
          <span className="placedly-testimonial-metric-label">CTC Growth</span>
        </div>
      )}
      <div className="placedly-testimonial-body">{t.details}</div>
      <div className="placedly-testimonial-author">
        <img src={t.img} alt={t.name} loading="lazy" className="placedly-testimonial-avatar" />
        <div>
          <h3 className="placedly-testimonial-name">{t.name}</h3>
          <p className="placedly-testimonial-date">{t.date}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Testimonials() {
  const [cmsTestimonials, setCmsTestimonials] = useState<
    Array<{ name: string; role: string; company: string; text: string; rating: number }> | null
  >(null);

  useEffect(() => {
    fetch('/api/admin/content?prefix=faq:')
      .then((r) => r.json())
      .then((map: Record<string, string>) => {
        try {
          const raw = map['faq:data'];
          if (!raw) return;
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed?.testimonials) && parsed.testimonials.length > 0) {
            setCmsTestimonials(parsed.testimonials);
          }
        } catch {
          // keep defaults
        }
      })
      .catch(() => {});
  }, []);

  const imgFallbacks = [
    'https://images.unsplash.com/photo-1758518729459-235dcaadc611?w=120&h=120&fit=crop&crop=face&q=80',
    'https://images.unsplash.com/photo-1589386417686-0d34b5903d23?w=120&h=120&fit=crop&crop=face&q=80',
    'https://images.unsplash.com/photo-1637589267610-6c66fc2a086b?w=120&h=120&fit=crop&crop=face&q=80',
    'https://images.unsplash.com/photo-1646743231546-2e846f063199?w=120&h=120&fit=crop&crop=face&q=80',
    'https://images.unsplash.com/photo-1642757205086-567b72efaa80?w=120&h=120&fit=crop&crop=face&q=80',
  ];

  const items: TestimonialItem[] = cmsTestimonials
    ? cmsTestimonials.map((t, i) => ({
        details: t.text,
        name: t.name,
        date: `${t.role}${t.company ? ', ' + t.company : ''}`,
        img: imgFallbacks[i % imgFallbacks.length],
      }))
    : testimonials;

  return (
    <section className="placedly-genz-section placedly-testimonials-section" id="testimonials">
      <GenZBlobs />
      <div className="placedly-genz-wrap">
        <motion.div
          className="placedly-genz-header"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="placedly-genz-eyebrow">Success Stories</p>
          <h2 className="placedly-genz-title">Real People. Real Growth.</h2>
        </motion.div>

        <div className="placedly-testimonials-grid">
          {items.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
