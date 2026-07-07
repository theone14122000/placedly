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
      { label: 'Resume Optimization', href: '/resume-optimization' },
      { label: 'LinkedIn Profile Enhancement', href: '/linkedin-optimization' },
      { label: 'ATS Resume Review', href: '/ats-resume-review' },
      { label: 'Mock Interviews', href: '/mock-interviews' },
      { label: 'Interview Preparation', href: '/interview-preparation' },
      { label: 'Job Referrals', href: '/job-referrals' },
    ],
  },
  {
    id: 'placement',
    title: 'Placement Services',
    Icon: Building2,
    links: [
      { label: 'Fresher Placements', href: '/fresher-placements' },
      { label: 'Experienced Professional Placements', href: '/experienced-placements' },
      { label: 'BPO / KPO Hiring', href: '/bpo-kpo-hiring' },
      { label: 'IT Hiring', href: '/it-hiring' },
      { label: 'Non-IT Hiring', href: '/non-it-hiring' },
    ],
  },
  {
    id: 'study',
    title: 'Study Abroad Services',
    Icon: GraduationCap,
    links: [
      { label: 'University Selection', href: '/university-selection' },
      { label: 'SOP & LOR Assistance', href: '/sop-lor-assistance' },
      { label: 'Scholarship Guidance', href: '/scholarship-guidance' },
      { label: 'Visa Support', href: '/visa-support' },
      { label: 'Application Assistance', href: '/application-assistance' },
    ],
  },
];