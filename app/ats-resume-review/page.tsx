import ServiceDetailPage from '../components/ServiceDetailPage';

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'Career Assistance Program (CAP)',
      tag: 'Career Services',
      title: 'Career Assistance Program (CAP) India',
      subtitle: "Placedly's Career Assistance Program (CAP) offers end-to-end career guidance — resume building, LinkedIn optimization, mock interviews, and job referrals for freshers and professionals across India.",
      stats: [
        { value: '5+', label: 'Sectors Covered' },
        { value: '1-on-1', label: 'Dedicated Advisor' },
        { value: '12%', label: 'Success Fee Only' },
      ],
      ctaPrimaryLabel: 'Enrol in CAP',
      ctaPrimaryHref: '/tools#ats-resume',
      ctaSecondaryLabel: 'Talk to an Advisor',
      ctaSecondaryHref: '/contact',
      overviewHeading: 'Complete Career Support in India',
      overviewBody: "Finding the right job in today's competitive market takes more than just applying to openings and hoping for the best. It requires a clear strategy, the right positioning, and consistent guidance at every stage — from figuring out which roles fit your skill set to actually walking into the interview room with confidence. That's exactly the gap Placedly's Career Assistance Program (CAP) is built to close. CAP is a structured, end-to-end career support system designed for freshers, experienced professionals, and career switchers across BPO, KPO, LPO, IT, and MNC sectors, pan-India. Instead of leaving candidates to figure things out on their own — juggling resume templates, random YouTube interview tips, and unresponsive job portals — Placedly assigns each candidate a dedicated advisor who understands their background, target roles, and career goals, and builds a personalised roadmap around them. The program brings together every service a job seeker actually needs under one roof: resume optimization, LinkedIn profile enhancement, ATS resume review, mock interviews, structured interview preparation, and direct job referrals. Rather than piecing together advice from multiple sources, candidates get a single, coordinated support system that moves them from 'where do I start' to 'I got the offer.' Most career support services stop at giving you a template or a checklist. CAP is different because it is relationship-driven — your advisor stays with you through the entire process, adjusts the plan as your search evolves, and connects you to real opportunities rather than just generic advice. With coverage across BPO, KPO, LPO, IT, and MNC sectors, Placedly understands the specific hiring patterns, expectations, and interview formats of each industry, which means the guidance you get is practical and relevant, not generic.",
      featuresHeading: "What's Included",
      features: [
        { title: '1-on-1 Onboarding', desc: 'One-on-one onboarding to understand your background, strengths, and target roles.' },
        { title: 'Personalised Career Roadmap', desc: 'A personalised career roadmap with clear milestones and timelines.' },
        { title: 'Resume & LinkedIn Optimization', desc: 'Resume building and LinkedIn optimization aligned to your target industry.' },
        { title: 'Interview Preparation', desc: 'Structured mock interviews and interview preparation coaching.' },
        { title: 'Direct Job Referrals', desc: "Direct referrals to verified openings through Placedly's employer network." },
        { title: 'Continued Advisor Support', desc: 'Continued advisor support until you receive and accept an offer.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: '1. Initial Consultation', desc: 'Initial consultation to assess your profile, goals, and target roles.' },
        { title: '2. Roadmap Creation', desc: 'Roadmap creation covering resume, LinkedIn, interview prep, and referral strategy.' },
        { title: '3. Execution Phase', desc: 'Resume and profile rebuild, mock interview rounds, and coaching sessions.' },
        { title: '4. Job Matching & Referrals', desc: "Active job matching and referrals through Placedly's recruiter network." },
        { title: '5. Offer & Onboarding', desc: "Offer negotiation support and onboarding guidance once you're selected." },
      ],
      faqs: [
        { q: 'Who is CAP for?', a: 'CAP is designed for freshers entering the job market, experienced professionals looking to switch roles or industries, and career switchers who need structured guidance to reposition themselves.' },
        { q: 'How long does the program take?', a: 'Timelines vary by candidate profile and target role, but most candidates complete the full CAP journey — from onboarding to offer — within a few weeks of consistent engagement.' },
        { q: 'Is CAP only for IT roles?', a: 'No. CAP covers BPO, KPO, LPO, IT, and MNC roles, so candidates from a wide range of backgrounds and industries can benefit from the program.' },
        { q: 'Is there a fee for CAP?', a: "CAP runs on a success-based model — a nominal service fee (12%) applies only once you accept a job offer through the program. There's no upfront cost, and full details are shared during your initial consultation." },
      ],
      finalHeading: 'Ready to Get Started?',
      finalSub: "Enrol in Placedly's Career Assistance Program today and get a dedicated advisor guiding every step of your job search. CAP is a success-based program — our fee applies only once you accept an offer, so there's nothing to pay upfront.",
      finalCtaLabel: 'Enrol in CAP',
      finalCtaHref: '/tools#ats-resume',
    }} />
  );
}