import ServiceDetailPage from '../components/ServiceDetailPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Job Referral Services India | Placedly',
  description: "Placedly's job referral service connects candidates directly with verified openings across BPO, KPO, LPO, IT, and MNC sectors through its recruiter network.",
};

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'Job Referrals',
      tag: 'Career Services',
      title: 'Job Referrals – Skip the Queue with Direct Access to Verified Openings',
      subtitle: "Placedly's job referral service connects candidates directly with verified openings across BPO, KPO, LPO, IT, and MNC sectors through its recruiter network.",
      stats: [
        { value: '40+', label: 'Partner Companies' },
        { value: '3x', label: 'Higher Response Rate' },
        { value: '1,000+', label: 'Referrals Made' },
      ],
      ctaPrimaryLabel: 'Get Referred',
      ctaPrimaryHref: '/vacancies',
      ctaSecondaryLabel: 'See CAP Program',
      ctaSecondaryHref: '/cap',
      overviewHeading: 'Referrals Open Doors Applications Can\'t',
      overviewBody: "Applying through job portals often means competing with hundreds of other candidates for the same posting, with no real way to stand out or know whether your application was even reviewed. Referrals work differently — they put your profile directly in front of the people making hiring decisions, which typically means faster responses and a stronger first impression. Placedly's job referral service uses its extensive recruiter and employer network to connect candidates directly with verified openings across BPO, KPO, LPO, IT, and non-IT sectors, pan-India. Rather than submitting into a black hole, your profile is actively presented to employers who are hiring for roles that genuinely match your background. This service isn't just about the introduction — Placedly stays involved through the process, supporting you from the initial referral through to interview scheduling and, ultimately, the offer. A referral carries more weight than a cold application because it comes with an implicit vouch — the employer knows the candidate has already been screened for fit. Placedly's recruiter relationships across BPO, KPO, LPO, IT, and MNC sectors mean candidates get access to openings and hiring managers that aren't always visible through public job portals.",
      featuresHeading: "What's Included",
      features: [
        { title: 'Direct Referrals', desc: "Direct referrals to verified, active openings through Placedly's employer network." },
        { title: 'Faster Scheduling', desc: 'Faster interview scheduling compared to standard portal applications.' },
        { title: 'Pan-India Access', desc: 'Access to roles across BPO, KPO, LPO, IT, and non-IT sectors pan-India.' },
        { title: 'Profile Matching', desc: 'Profile matching based on your actual skills and experience, not mass submissions.' },
        { title: 'Continued Support', desc: 'Continued support through interview scheduling and follow-ups.' },
        { title: 'Offer Guidance', desc: 'Guidance through the offer stage until the role is finalised.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: '1. Profile Review', desc: 'Profile review to understand your skills, experience, and target roles.' },
        { title: '2. Role Matching', desc: "Matching against active, verified openings in Placedly's network." },
        { title: '3. Direct Referral', desc: 'Direct referral submitted to the relevant employer or hiring manager.' },
        { title: '4. Interview Scheduling', desc: 'Interview scheduling support once the employer responds.' },
        { title: '5. Finalisation', desc: 'Ongoing support through to offer and finalisation.' },
      ],
      faqs: [
        { q: 'Is there a guarantee of a job through referrals?', a: 'Referrals significantly improve your chances of being seen and interviewed, but final hiring decisions rest with the employer based on interview performance and fit.' },
        { q: 'What industries do referrals cover?', a: 'Referrals span BPO, KPO, LPO, IT, and non-IT sectors, covering a wide range of roles and experience levels pan-India.' },
        { q: 'How is this different from just applying on a job portal?', a: 'Referrals put your profile directly in front of hiring decision-makers, rather than into a general applicant pool, typically resulting in faster and more meaningful responses.' },
      ],
      finalHeading: 'Get In Front of Real Hiring Managers',
      finalSub: "Get referred to your next opportunity through Placedly's recruiter network — apply for job referrals today.",
      finalCtaLabel: 'View Open Roles',
      finalCtaHref: '/vacancies',
    }} />
  );
}