import ServiceDetailPage from '../components/ServiceDetailPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LinkedIn Profile Enhancement Services | Placedly',
  description: "Placedly's LinkedIn profile enhancement service builds a keyword-optimized, recruiter-ready profile that improves visibility and strengthens your personal brand.",
};

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'LinkedIn Profile Enhancement',
      tag: 'Career Services',
      title: 'LinkedIn Profile Enhancement – Get Found by the Right Recruiters',
      subtitle: "Placedly's LinkedIn profile enhancement service builds a keyword-optimized, recruiter-ready profile that improves visibility and strengthens your personal brand.",
      stats: [
        { value: '5.6x', label: 'Profile Views' },
        { value: '3x', label: 'Recruiter InMails' },
        { value: '900+', label: 'Profiles Optimized' },
      ],
      ctaPrimaryLabel: 'Optimize My Profile',
      ctaPrimaryHref: '/contact',
      ctaSecondaryLabel: 'See CAP Program',
      ctaSecondaryHref: '/cap',
      overviewHeading: 'Your LinkedIn Is Your First Impression',
      overviewBody: "Long before a job is posted publicly, recruiters are often already searching LinkedIn for candidates who match their requirements. If your profile is incomplete, poorly worded, or missing the right keywords, you're invisible to a huge share of hiring activity — regardless of how qualified you actually are. Placedly's LinkedIn profile enhancement service treats your profile as a strategic asset, not just an online resume. We rework your headline, summary, and experience sections to reflect the keywords and phrasing recruiters actually search for in your target industry, while keeping the tone authentic and professional. Beyond the writing, we guide you on the structural elements that affect visibility and credibility — skills section optimization, profile completeness, recommendations, and activity — so your profile performs well both in recruiter search results and in the eyes of anyone who views it after an application. A LinkedIn profile that isn't optimized is a missed opportunity — recruiters are actively searching, but they can't find you if your profile doesn't speak their language. Placedly's team understands what recruiters across BPO, KPO, IT, and MNC sectors search for, and builds your profile to match that search behaviour directly, rather than guessing at generic best practices.",
      featuresHeading: "What's Included",
      features: [
        { title: 'Headline & Summary Optimization', desc: 'Optimized headline and \'About\' summary aligned to your target roles.' },
        { title: 'Experience Rewrite', desc: 'Experience section rewritten with achievement-focused, keyword-rich language.' },
        { title: 'Skills Strategy', desc: 'Skills section strategy to improve ranking in recruiter searches.' },
        { title: 'Presentation Guidance', desc: 'Guidance on profile photo, banner, and overall presentation.' },
        { title: 'Recommendations & Endorsements', desc: 'Recommendations and endorsement strategy for added credibility.' },
        { title: 'Activity Tips', desc: 'Tips on LinkedIn activity to stay visible to recruiters over time.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: '1. Profile Review', desc: 'Review of your current LinkedIn profile and career goals.' },
        { title: '2. Positioning Strategy', desc: 'Keyword and positioning strategy based on your target roles.' },
        { title: '3. Content Rewrite', desc: 'Rewrite of headline, summary, and experience sections.' },
        { title: '4. Profile Guidance', desc: 'Guidance on skills, recommendations, and profile completeness.' },
        { title: '5. Final Review', desc: 'Final review to ensure the profile is fully optimized and ready.' },
      ],
      faqs: [
        { q: "Will this help even if I'm not actively job hunting?", a: 'Yes. A strong LinkedIn profile builds long-term visibility, so recruiters can find you even when you\'re not actively applying.' },
        { q: 'Do you write the content or just give suggestions?', a: 'We write the actual content for your headline, summary, and experience sections based on your background and goals.' },
        { q: 'Can this be done alongside resume optimization?', a: 'Yes, many candidates combine LinkedIn enhancement with resume optimization for consistent positioning across both platforms.' },
      ],
      finalHeading: 'Get Found by the Right Recruiters',
      finalSub: "Let Placedly rebuild your LinkedIn profile so the right recruiters find you first.",
      finalCtaLabel: 'Start Now',
      finalCtaHref: '/contact',
    }} />
  );
}