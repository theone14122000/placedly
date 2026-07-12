import ServiceDetailPage from '../components/ServiceDetailPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mock Interview Practice Sessions India | Placedly',
  description: "Placedly's mock interview sessions simulate real HR, technical, and behavioural rounds for BPO, IT, and MNC roles, helping candidates build genuine interview confidence.",
};

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'Mock Interviews',
      tag: 'Career Services',
      title: 'Mock Interviews – Practice Real Scenarios Before It Counts',
      subtitle: "Placedly's mock interview sessions simulate real HR, technical, and behavioural rounds for BPO, IT, and MNC roles, helping candidates build genuine interview confidence.",
      stats: [
        { value: '4.8/5', label: 'Avg. Candidate Rating' },
        { value: '60 Min', label: 'Per Session' },
        { value: '2,000+', label: 'Mock Interviews Run' },
      ],
      ctaPrimaryLabel: 'Book a Mock Interview',
      ctaPrimaryHref: '/contact',
      ctaSecondaryLabel: 'See CAP Program',
      ctaSecondaryHref: '/cap',
      overviewHeading: 'Practice Like It\'s the Real Thing',
      overviewBody: "There's a meaningful difference between knowing how to answer interview questions in theory and being able to do it confidently under real pressure, in front of an actual interviewer, with a job on the line. Most candidates only get that real pressure-tested experience during the interview that actually matters — which means there's no room for mistakes or nerves to settle. Placedly's mock interview sessions close that gap by simulating real hiring rounds — HR, technical, and behavioural — in a format that closely mirrors what candidates will actually face. This isn't a casual run-through of generic questions; it's a structured simulation with real feedback on your answers, communication style, body language, and overall presentation. By the time candidates walk into their actual interview, they've already faced tough, realistic questions, received honest feedback, and had the chance to correct weak spots — so the real interview feels familiar rather than intimidating. Reading interview tips online doesn't prepare you for the actual experience of being asked a tough question live and having to respond in real time. Placedly's mock interviews give you that real rehearsal, with feedback from people who understand what recruiters across BPO, KPO, IT, and MNC sectors are actually evaluating — so the practice translates directly into performance when it counts.",
      featuresHeading: "What's Included",
      features: [
        { title: 'Role-Specific Mocks', desc: 'Role-specific mock interviews for BPO, KPO, LPO, IT, and MNC positions.' },
        { title: 'Comprehensive Rounds', desc: 'Separate rounds covering HR, technical, and behavioural interview formats.' },
        { title: 'Detailed Feedback', desc: 'Detailed feedback on answer structure, clarity, and confidence.' },
        { title: 'Communication Guidance', desc: 'Guidance on body language, tone, and communication style.' },
        { title: 'Scenario Practice', desc: 'Practice with situational and scenario-based questions specific to your target role.' },
        { title: 'Repeat Sessions', desc: 'Repeat sessions available to build consistency before the real interview.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: '1. Share Details', desc: 'Share your target role and interview stage (HR, technical, or final round).' },
        { title: '2. Schedule Session', desc: 'A mock interview session is scheduled matching that specific format.' },
        { title: '3. Simulated Interview', desc: 'You go through a realistic, simulated interview experience.' },
        { title: '4. Detailed Feedback', desc: 'Detailed feedback is provided immediately after the session.' },
        { title: '5. Additional Sessions', desc: 'Additional sessions can be scheduled to address specific weak areas.' },
      ],
      faqs: [
        { q: 'How many mock interview sessions do I need?', a: "This depends on your comfort level and the role's competitiveness — some candidates benefit from a single session, others prefer multiple rounds before the real interview." },
        { q: 'Are mock interviews specific to my industry?', a: 'Yes, sessions are tailored to your target role, whether that\'s a voice process in BPO, a technical IT interview, or a managerial MNC round.' },
        { q: 'Do I get feedback in writing?', a: 'Yes, you receive structured feedback covering strengths and specific areas to improve after each session.' },
      ],
      finalHeading: 'Walk In Ready, Not Nervous',
      finalSub: 'Book a mock interview session with Placedly and walk into your real interview already prepared.',
      finalCtaLabel: 'Book Now',
      finalCtaHref: '/contact',
    }} />
  );
}