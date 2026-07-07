import ServiceDetailPage from '../components/ServiceDetailPage';

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'Interview Preparation',
      tag: 'Career Services',
      title: 'Interview Preparation, End to End',
      subtitle: 'From company research to salary negotiation — a complete preparation framework so you walk into every interview ready.',
      stats: [
        { value: '89%', label: 'Offer Conversion' },
        { value: '12+', label: 'Prep Resources' },
        { value: '5,000+', label: 'Candidates Prepped' },
      ],
      ctaPrimaryLabel: 'Start Preparing',
      ctaPrimaryHref: '/contact',
      ctaSecondaryLabel: 'See CAP Program',
      ctaSecondaryHref: '/cap',
      overviewHeading: 'Preparation Beats Talent, Every Time',
      overviewBody: 'Most candidates lose offers not because they lack skill, but because they walk in unprepared — vague answers, no company research, no negotiation strategy. Our interview preparation service builds a structured plan covering company research, likely questions, storytelling frameworks, and closing techniques.',
      featuresHeading: "What's Included",
      features: [
        { title: 'Company & Role Research Brief', desc: 'A curated brief on the company, team, and interviewers when available.' },
        { title: 'Question Bank & Frameworks', desc: 'STAR-method answer frameworks for common behavioral questions.' },
        { title: 'Technical Prep Guides', desc: 'Role-specific technical question sets for tech, finance, and ops roles.' },
        { title: 'Salary Negotiation Coaching', desc: 'Scripts and strategy to negotiate confidently once an offer lands.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: 'Interview Scheduled', desc: 'As soon as you land an interview, notify your advisor.' },
        { title: 'Custom Prep Pack', desc: 'Receive a tailored research brief and question bank within hours.' },
        { title: 'Coaching Call', desc: 'A live prep session to rehearse answers and address concerns.' },
        { title: 'Post-Interview Debrief', desc: 'We review how it went and prep you for the next round.' },
      ],
      faqs: [
        { q: 'How fast can prep materials be ready?', a: 'Most prep packs are delivered within 4-6 hours of your interview being scheduled.' },
        { q: 'Do you help with salary negotiation?', a: 'Yes — negotiation coaching is included once you receive an offer.' },
        { q: 'Is this only for first interviews?', a: 'No, we support you through every round — screening, technical, panel, and final.' },
      ],
      finalHeading: 'Never Walk In Unprepared Again',
      finalSub: 'Get your custom interview prep pack before your next interview.',
      finalCtaLabel: 'Get Prepared',
      finalCtaHref: '/contact',
    }} />
  );
}