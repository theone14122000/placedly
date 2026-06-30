import type { LucideIcon } from 'lucide-react';
import { Briefcase, Building2, GraduationCap } from 'lucide-react';

export type NavServiceLink = {
  label: string;
  href: string;
};

export type NavServiceColumn = {
  id: string;
  title: string;
  Icon: LucideIcon;
  links: NavServiceLink[];
};

export const megaMenuColumns: NavServiceColumn[] = [
  {
    id: 'career',
    title: 'Career Services',
    Icon: Briefcase,
    links: [
      { label: 'Career Assistance Program (CAP)', href: '/cap' },
      { label: 'Resume Optimization', href: '/cap#resume' },
      { label: 'LinkedIn Profile Enhancement', href: '/cap#linkedin' },
      { label: 'ATS Resume Review', href: '/tools#ats-resume' },
      { label: 'Mock Interviews', href: '/cap#mock-interviews' },
      { label: 'Interview Preparation', href: '/cap#interview-prep' },
      { label: 'Job Referrals', href: '/cap#referrals' },
    ],
  },
  {
    id: 'placement',
    title: 'Placement Services',
    Icon: Building2,
    links: [
      { label: 'Fresher Placements', href: '/vacancies?level=fresher' },
      { label: 'Experienced Professional Placements', href: '/vacancies?level=experienced' },
      { label: 'BPO / KPO Hiring', href: '/vacancies?sector=bpo-kpo' },
      { label: 'IT Hiring', href: '/vacancies?sector=it' },
      { label: 'Non-IT Hiring', href: '/vacancies?sector=non-it' },
    ],
  },
  {
    id: 'study',
    title: 'Study Abroad Services',
    Icon: GraduationCap,
    links: [
      { label: 'University Selection', href: '/study-visa#university-selection' },
      { label: 'SOP & LOR Assistance', href: '/study-visa#sop-lor' },
      { label: 'Scholarship Guidance', href: '/study-visa#scholarships' },
      { label: 'Visa Support', href: '/study-visa#visa' },
      { label: 'Application Assistance', href: '/study-visa#applications' },
    ],
  },
];
