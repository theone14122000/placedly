'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, IndianRupee, ArrowUpRight, Briefcase, Clock } from 'lucide-react';
import { jobs } from '../data/jobs';
import GenZBlobs from './GenZBlobs';

const latestJobs = jobs.slice(0, 3);

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Tech: { bg: 'rgba(37,99,235,0.12)', text: '#2563eb', border: 'rgba(37,99,235,0.22)' },
  Sales: { bg: 'rgba(22,163,74,0.12)', text: '#16a34a', border: 'rgba(22,163,74,0.22)' },
  Marketing: { bg: 'rgba(234,88,12,0.12)', text: '#ea580c', border: 'rgba(234,88,12,0.22)' },
  Finance: { bg: 'rgba(124,58,237,0.12)', text: '#7c3aed', border: 'rgba(124,58,237,0.22)' },
  Operations: { bg: 'rgba(71,85,105,0.1)', text: '#475569', border: 'rgba(71,85,105,0.18)' },
  Healthcare: { bg: 'rgba(220,38,38,0.1)', text: '#dc2626', border: 'rgba(220,38,38,0.2)' },
};

export default function Events() {
  return (
    <section className="placedly-genz-section placedly-jobs-section" id="vacancies">
      <GenZBlobs />
      <div className="placedly-genz-wrap">
        <motion.div
          className="placedly-jobs-header"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="placedly-genz-eyebrow">Live Opportunities</p>
            <h2 className="placedly-genz-title placedly-jobs-title">
              Roles We&apos;re Actively Filling
            </h2>
            <p className="placedly-genz-sub">
              Real openings at our hiring partners. Apply through Placedly and skip the queue — your profile goes directly to the hiring manager.
            </p>
          </div>
          <Link href="/vacancies" className="placedly-genz-btn-ghost">
            View All Roles
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </Link>
        </motion.div>

        <div className="placedly-jobs-grid">
          {latestJobs.map((job, i) => {
            const cat = categoryColors[job.category] ?? categoryColors.Operations;
            return (
              <motion.article
                key={job.id}
                className="placedly-genz-glass placedly-job-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="placedly-job-top">
                  <span
                    className="placedly-job-cat"
                    style={{ color: cat.text, background: cat.bg, borderColor: cat.border }}
                  >
                    <Briefcase size={10} strokeWidth={2.5} />
                    {job.category}
                  </span>
                  <span className="placedly-job-live">
                    <span className="placedly-job-live-dot" />
                    Live
                  </span>
                </div>

                <h3 className="placedly-job-role">{job.role}</h3>
                <p className="placedly-job-company">{job.company}</p>

                <div className="placedly-job-meta">
                  <span>
                    <MapPin size={12} strokeWidth={2} />
                    {job.location}
                  </span>
                  <span>
                    <Clock size={12} strokeWidth={2} />
                    {job.experience}
                  </span>
                </div>
                <p className="placedly-job-salary">
                  <IndianRupee size={14} strokeWidth={2.5} />
                  {job.salary.replace('₹', '')}
                </p>

                <div className="placedly-job-tags">
                  {job.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <Link href="/vacancies" className="placedly-genz-btn placedly-job-cta">
                  View &amp; Apply
                  <span className="placedly-genz-btn-icon">
                    <ArrowUpRight size={15} strokeWidth={2.5} />
                  </span>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
