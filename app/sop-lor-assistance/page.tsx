import ServiceDetailPage from '../components/ServiceDetailPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SOP & LOR Writing Assistance for Study Abroad | Placedly',
  description: "Placedly helps students craft compelling Statements of Purpose and Letters of Recommendation that strengthen university applications for study abroad.",
};

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'SOP & LOR Assistance',
      tag: 'Study Abroad Services',
      title: 'SOP & LOR Assistance – Applications That Tell Your Real Story',
      subtitle: "Placedly helps students craft compelling Statements of Purpose and Letters of Recommendation that strengthen university applications for study abroad.",
      stats: [
        { value: '95%', label: 'Application Success Rate' },
        { value: '48 Hrs', label: 'First Draft Turnaround' },
        { value: '1,500+', label: 'SOPs Written' },
      ],
      ctaPrimaryLabel: 'Get My SOP Started',
      ctaPrimaryHref: '/study-visa#apply',
      ctaSecondaryLabel: 'See Study Abroad Program',
      ctaSecondaryHref: '/study-visa',
      overviewHeading: 'Applications That Tell Your Real Story',
      overviewBody: "In a competitive admissions process, grades and test scores only tell part of the story. The Statement of Purpose and Letters of Recommendation are often what actually differentiate one strong applicant from another — they show admissions committees who you are, why you've chosen this path, and why you're a genuine fit for their program. Placedly's SOP and LOR assistance service is built around helping students articulate that story clearly and authentically. Rather than generic templates filled with clichés, we work one-on-one with students to identify what's genuinely compelling about their journey, and translate that into a well-structured, persuasive SOP. For Letters of Recommendation, we guide students on how to approach recommenders and what context to provide, so the letters that come back genuinely reflect the student's strengths and align with what the target university is looking for. Admissions committees read thousands of SOPs, and generic, templated writing is easy to spot — and easy to dismiss. Placedly's approach focuses on genuine storytelling grounded in the student's real experiences and goals, which is what actually makes an application memorable and convincing.",
      featuresHeading: "What's Included",
      features: [
        { title: 'One-on-One Brainstorming', desc: 'One-on-one brainstorming to identify your authentic, compelling narrative.' },
        { title: 'Structured SOP Drafting', desc: "Structured SOP drafting aligned with each university's specific expectations." },
        { title: 'LOR Guidance', desc: 'Guidance on approaching and briefing recommenders for strong LORs.' },
        { title: 'University Customisation', desc: 'University-specific customisation across multiple applications.' },
        { title: 'Review & Refinement', desc: 'Multiple rounds of review and refinement before final submission.' },
        { title: 'Focused Feedback', desc: 'Feedback focused on clarity, authenticity, and persuasive structure.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: '1. Discovery Session', desc: 'Discovery session to identify your story, goals, and strengths.' },
        { title: '2. First Draft', desc: 'First SOP draft built around your specific narrative and target program.' },
        { title: '3. LOR Briefing', desc: 'Guidance on briefing recommenders for strong, aligned LORs.' },
        { title: '4. Review Rounds', desc: 'Multiple review rounds to refine tone, structure, and content.' },
        { title: '5. Final Submission', desc: 'Final, university-specific versions ready for submission.' },
      ],
      faqs: [
        { q: 'Do you write the SOP for me or guide me to write it?', a: 'We work collaboratively — helping structure and refine your ideas into a strong SOP that remains authentically yours.' },
        { q: 'Can the same SOP be used for multiple universities?', a: "We recommend customising your SOP for each university's specific program and expectations, and we support that customisation." },
        { q: 'How many recommenders do I typically need?', a: "This depends on the university's requirements, and we guide you on how many and who to approach based on your target programs." },
      ],
      finalHeading: 'Strengthen Your Application with a Genuinely Compelling SOP',
      finalSub: 'Get support from Placedly today.',
      finalCtaLabel: 'Get Started',
      finalCtaHref: '/study-visa#apply',
    }} />
  );
}