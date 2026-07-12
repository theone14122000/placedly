import ServiceDetailPage from '../components/ServiceDetailPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scholarship Guidance for Study Abroad Students | Placedly',
  description: "Placedly guides students through scholarship research, eligibility checks, and applications to help fund their study abroad journey.",
};

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'Scholarship Guidance',
      tag: 'Study Abroad Services',
      title: 'Scholarship Guidance – Make Studying Abroad More Affordable',
      subtitle: "Placedly guides students through scholarship research, eligibility checks, and applications to help fund their study abroad journey.",
      stats: [
        { value: '£2M+', label: 'Scholarships Secured' },
        { value: '60+', label: 'Scholarship Programs Tracked' },
        { value: '450+', label: 'Students Funded' },
      ],
      ctaPrimaryLabel: 'Find My Scholarships',
      ctaPrimaryHref: '/study-visa#apply',
      ctaSecondaryLabel: 'See Study Abroad Program',
      ctaSecondaryHref: '/study-visa',
      overviewHeading: 'Don\'t Miss Out on Available Funding',
      overviewBody: "The cost of studying abroad is often the single biggest barrier for students, and many miss out on scholarships simply because they don't know these opportunities exist, or don't know how to put together a competitive application in time. Placedly's scholarship guidance service helps students navigate this landscape systematically. We research university-specific, government, and private scholarship options relevant to each student's profile and target destination, and assess realistic eligibility so students focus their time on opportunities they're genuinely positioned to win. Beyond identifying opportunities, we support students through the actual application process — managing documentation, meeting deadlines, and preparing strong applications — while also helping think through broader financial planning alongside scholarship funding. Scholarship opportunities are scattered across university websites, government portals, and private foundations, and finding the ones that genuinely match a student's profile takes real research time most students don't have during an already demanding application season. Placedly does that research and filtering work, so students spend their time on applications with real potential.",
      featuresHeading: "What's Included",
      features: [
        { title: 'Scholarship Research', desc: 'Research into university, government, and private scholarship options.' },
        { title: 'Eligibility Assessment', desc: 'Eligibility assessment based on your academic profile and destination.' },
        { title: 'Application Support', desc: 'Application support, including documentation and deadline tracking.' },
        { title: 'Essay Guidance', desc: 'Guidance on writing scholarship-specific essays where required.' },
        { title: 'Financial Planning', desc: 'Broader financial planning support alongside scholarship applications.' },
        { title: 'Ongoing Updates', desc: 'Ongoing updates on new or relevant scholarship opportunities.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: '1. Assessment', desc: 'Profile and destination assessment to identify eligible scholarships.' },
        { title: '2. Research & Shortlist', desc: 'Research and shortlist of relevant scholarship opportunities.' },
        { title: '3. Application Support', desc: 'Application support including essays and documentation.' },
        { title: '4. Deadline Tracking', desc: 'Deadline tracking across multiple scholarship applications.' },
        { title: '5. Ongoing Guidance', desc: 'Ongoing guidance through decisions and financial planning.' },
      ],
      faqs: [
        { q: 'Can international students access most scholarships?', a: 'Eligibility varies by scholarship — we assess your specific profile and destination to identify realistic options.' },
        { q: 'Do you guarantee scholarship approval?', a: "We can't guarantee approval, as decisions rest with the awarding body, but we help you submit the strongest possible application." },
        { q: 'Is scholarship guidance included with university selection?', a: 'It can be combined with our university selection and application services for a more coordinated study abroad plan.' },
      ],
      finalHeading: 'Reduce Your Study Abroad Costs',
      finalSub: "Explore scholarship options with Placedly's guidance.",
      finalCtaLabel: 'Get Started',
      finalCtaHref: '/study-visa#apply',
    }} />
  );
}