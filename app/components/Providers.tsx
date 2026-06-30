'use client';
import { SessionProvider } from 'next-auth/react';
import { SeeDemoProvider } from './SeeDemoContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchOnWindowFocus>
      <SeeDemoProvider>{children}</SeeDemoProvider>
    </SessionProvider>
  );
}
