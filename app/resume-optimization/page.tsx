import ServiceDetailPage from '../components/ServiceDetailPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume Optimization Services India | Placedly',
  description: "Placedly's resume optimization service creates ATS-friendly, recruiter-approved resumes tailored for BPO, IT, KPO, and MNC roles, helping you get shortlisted faster.",
};

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'Resume Optimization',
      tag: 'Career Services',
      title: 'Resume Optimization Services – Resumes That Get You Shortlisted',
      subtitle: "Placedly's resume optimization service creates ATS-friendly, recruiter-approved resumes tailored for BPO, IT, KPO, and MNC roles, helping you get shortlisted faster.",
      stats: [
        { value: '2.3x', label: 'More Callbacks' },
        { value: '48 Hrs', label: 'Turnaround' },
        { value: '1,200+', label: 'Resumes Revamped' },
      ],
      ctaPrimaryLabel: 'Get My Resume Reviewed',
      ctaPrimaryHref: '/contact',
      ctaSecondaryLabel: 'See CAP Program',
      ctaSecondaryHref: '/cap',
      overviewHeading: 'Why Your Resume Needs a Rewrite',
      overviewBody: "Recruiters spend an average of a few seconds scanning a resume before deciding whether to move forward or move on. In that narrow window, formatting, keywords, and clarity matter more than most candidates realise. A resume that lists responsibilities instead of achievements, uses inconsistent formatting, or misses industry-relevant keywords can get filtered out — even when the candidate is genuinely qualified. Placedly's resume optimization service takes a data-driven approach to fixing this. Instead of simply 'polishing' your existing resume, our team rebuilds it around what recruiters and applicant tracking systems are actually looking for — the right keywords for your target industry, a structure that highlights measurable achievements over generic duties, and formatting that renders cleanly whether it's read by a human or scanned by software. Whether you're a fresher building your first resume, an experienced professional repositioning for a senior role, or someone switching industries entirely, the resume is customised to your specific goals rather than forced into a one-size-fits-all template. A generic resume template downloaded from the internet doesn't account for how recruiters in BPO, KPO, IT, or MNC sectors actually screen candidates. Placedly's team works across these sectors daily, which means the resumes we build reflect real, current hiring patterns — not outdated advice. The goal isn't just a resume that looks good; it's a resume that consistently gets you shortlisted.",
      featuresHeading: "What's Included",
      features: [
        { title: 'Complete Resume Rebuild', desc: 'Complete resume rebuild with industry-specific keyword optimization.' },
        { title: 'Achievement-Focused Bullets', desc: 'Achievement-focused bullet points instead of generic job descriptions.' },
        { title: 'ATS-Compatible Formatting', desc: 'ATS-compatible formatting that passes automated screening systems.' },
        { title: 'Targeted Versions', desc: 'Separate resume versions for different target roles, where needed.' },
        { title: 'Cover Letter Support', desc: 'Cover letter support to complement your resume where required.' },
        { title: 'Unlimited Revisions', desc: 'Unlimited revisions until the resume is fully aligned with your goals.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: '1. Share Details', desc: 'Share your current resume, work history, and target roles.' },
        { title: '2. Gap Analysis', desc: 'Our team analyses gaps in keywords, structure, and achievements.' },
        { title: '3. Draft Review', desc: 'A rebuilt resume draft is shared for your review.' },
        { title: '4. Revisions', desc: 'Revisions are made based on your feedback and target job descriptions.' },
        { title: '5. Final Delivery', desc: 'You receive a final, ATS-optimized resume ready to use across applications.' },
      ],
      faqs: [
        { q: 'Do you write resumes from scratch for freshers with no experience?', a: 'Yes. For freshers, we build resumes around academic projects, internships, certifications, and transferable skills to create a strong first impression.' },
        { q: 'Will this resume work with online application systems?', a: 'Yes, all resumes are built to be ATS-compatible so they parse correctly in applicant tracking systems used by most companies.' },
        { q: 'How many revisions are included?', a: 'We work with you through multiple revisions until the resume accurately reflects your profile and is ready for submission.' },
      ],
      finalHeading: 'Ready for a Resume That Works?',
      finalSub: "Get your resume rebuilt by Placedly and start turning applications into interviews.",
      finalCtaLabel: 'Start Now',
      finalCtaHref: '/contact',
    }} />
  );
}