'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

/* ════════════════════════════════════════════════════════
   Homepage "What We Do" mode — shared between the Services
   toggle (control) and the homepage sections (display).
   'cap'   = Get Placed  → shows How It Works / Our Process / CAP Journey
   'study' = Go Global   → shows Document Checklist / Focus Areas / Destinations
════════════════════════════════════════════════════════ */

export type HomeMode = 'cap' | 'study';

interface HomeModeContextValue {
  mode: HomeMode;
  setMode: (mode: HomeMode) => void;
}

const HomeModeContext = createContext<HomeModeContextValue>({
  mode: 'cap',
  setMode: () => {},
});

export function HomeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<HomeMode>('cap');
  const value = useMemo(() => ({ mode, setMode }), [mode]);
  return <HomeModeContext.Provider value={value}>{children}</HomeModeContext.Provider>;
}

export function useHomeMode() {
  return useContext(HomeModeContext);
}