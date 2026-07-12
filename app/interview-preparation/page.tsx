import ServiceDetailPage from '../components/ServiceDetailPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interview Preparation Services India | Placedly',
  description: "Placedly's interview preparation service covers HR questions, technical rounds, and salary negotiation coaching tailored to your target role and industry.",
};

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'Interview Preparation',
      tag: 'Career Services',
      title: 'Interview Preparation – Master Every Round with a Clear Strategy',
      subtitle: "Placedly's interview preparation service covers HR questions, technical rounds, and salary negotiation coaching tailored to your target role and industry.",
      stats: [
        { value: '89%', label: 'Offer Conversion' },
        { value: '12+', label: 'Prep Resources' },
        { value: '5,000+', label: 'Candidates Prepped' },
      ],
      ctaPrimaryLabel: 'Start Preparing',
      ctaPrimaryHref: '/contact',
      ctaSecondaryLabel: 'See CAP Program',
      ctaSecondaryHref: '/cap',
      overviewHeading: 'Real Preparation for Every Round',
      overviewBody: "Interview preparation is often reduced to memorising a list of common questions — but real preparation is about understanding how to think through any question you're asked, structure a clear answer, and communicate your value with confidence, regardless of how the question is phrased. Placedly's interview preparation service goes beyond generic tips. We build a preparation plan specific to your target role and industry, covering the HR questions you're likely to face, the technical or functional areas relevant to the position, and the behavioural and situational questions that trip up even strong candidates. We also address a part of interview preparation many candidates overlook entirely: salary negotiation. Knowing your market value and how to discuss compensation confidently can significantly affect the offer you end up with. Generic interview tips don't account for the fact that a BPO voice-process interview, a technical IT interview, and a managerial MNC interview all look completely different. Placedly's preparation is grounded in real, current hiring practices across these sectors, so candidates walk in knowing exactly what to expect and how to respond — not guessing based on outdated advice.",
      featuresHeading: "What's Included",
      features: [
        { title: 'Role-Specific Question Banks', desc: 'Curated, role-specific question banks for HR, technical, and managerial rounds.' },
        { title: 'Structured Frameworks', desc: 'Structured frameworks for answering behavioural and situational questions.' },
        { title: 'Articulation Guidance', desc: 'Guidance on articulating strengths, weaknesses, and career gaps confidently.' },
        { title: 'Salary Negotiation Coaching', desc: 'Salary negotiation coaching, including market benchmarking for your role.' },
        { title: 'Industry-Tailored Prep', desc: 'Preparation tailored to BPO, KPO, LPO, IT, and MNC interview formats.' },
        { title: '1-on-1 Coaching', desc: 'One-on-one coaching sessions to address your specific concerns.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: '1. Assessment', desc: 'Assessment of your target role, industry, and interview stage.' },
        { title: '2. Preparation Plan', desc: 'Preparation plan covering relevant question types and formats.' },
        { title: '3. Coaching Sessions', desc: 'Coaching sessions on answer structuring and communication.' },
        { title: '4. Salary Strategy', desc: 'Salary negotiation strategy session based on market benchmarks.' },
        { title: '5. Readiness Check', desc: 'Final readiness check before your scheduled interview.' },
      ],
      faqs: [
        { q: 'Is this different from mock interviews?', a: 'Interview preparation focuses on strategy, content, and coaching, while mock interviews are live simulated practice sessions. Many candidates use both together.' },
        { q: 'Do you help with salary negotiation after the offer too?', a: 'Yes, we provide guidance both before and after the offer is made, to help you negotiate confidently.' },
        { q: 'Can this be customised to a specific company?', a: "Where possible, we tailor preparation to the specific company and role you're interviewing for, based on available information." },
      ],
      finalHeading: 'Prepare with a Clear Strategy',
      finalSub: 'Get structured interview preparation support from Placedly.',
      finalCtaLabel: 'Get Prepared',
      finalCtaHref: '/contact',
    }} />
  );
}