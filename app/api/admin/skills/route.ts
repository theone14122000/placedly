import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Public GET — used by both admin (vacancy form) and candidate-facing pages
export async function GET() {
  const skills = await prisma.skill.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(skills);
}
