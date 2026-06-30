'use client';
import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FadeUp, SlideLeft } from './motion';

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSubmitted(false), 6000);
  }

  return (
    <section className="lead-form-section" id="contact">
      <div className="container">
        <FadeUp>
          <div className="placedly-form-wrap">
            <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: 700, color: '#f97316', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>
              Quick Enquiry
            </div>
            <div className="placedly-form-title">Interested? Let&apos;s Talk.</div>
            <p className="placedly-form-subtitle">
              Fill this in — we&apos;ll personally reach out within 24 hours. No bots. No templates. A real conversation.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="placedly-form-grid">
                <div className="placedly-form-field">
                  <label className="placedly-form-label">Full Name *</label>
                  <input className="placedly-form-input" type="text" name="name" placeholder="Your full name" required />
                </div>
                <div className="placedly-form-field">
                  <label className="placedly-form-label">WhatsApp Number *</label>
                  <input className="placedly-form-input" type="tel" name="phone" placeholder="+91 XXXXX XXXXX" required />
                </div>
                <div className="placedly-form-field full">
                  <label className="placedly-form-label">I&apos;m Interested In *</label>
                  <select className="placedly-form-input" name="service" required>
                    <option value="">Select</option>
                    <option value="career">Career Growth — India (MNC Placement)</option>
                    <option value="study">Study Abroad — UK / France / Germany / Dubai</option>
                    <option value="cap">Career Assistance Programme (CAP)</option>
                    <option value="cv">CV &amp; Resume Building</option>
                    <option value="interview">Interview Coaching</option>
                  </select>
                </div>
                <div className="placedly-form-field">
                  <label className="placedly-form-label">Current Domain</label>
                  <select className="placedly-form-input" name="domain">
                    <option value="">Select domain</option>
                    <option value="bpo">BPO / KPO</option>
                    <option value="healthcare">Healthcare &amp; Insurance</option>
                    <option value="finance">Finance &amp; Accounts</option>
                    <option value="it">IT / Tech</option>
                    <option value="sales">Sales &amp; Marketing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="placedly-form-field">
                  <label className="placedly-form-label">Current CTC / Budget</label>
                  <input className="placedly-form-input" type="text" name="ctc" placeholder="e.g. ₹4,50,000" />
                </div>
              </div>
              <motion.button
                type="submit"
                className="placedly-form-submit"
                whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(249,115,22,0.40)' }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Enquiry →
              </motion.button>
              <div className={`form-success-msg${submitted ? ' visible' : ''}`}>
                ✅ Thank you! We&apos;ll reach out within 24 hours.
              </div>
            </form>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#94a3b8', marginTop: '16px', textAlign: 'center' }}>
              ✅ Free consultation &nbsp;·&nbsp; Zero upfront commitment &nbsp;·&nbsp; Response within 24 hours
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
