import { useState, useEffect } from 'react';

export function usePageContent<T>(key: string, defaults: T) {
  const [data, setData] = useState<T>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch(`/api/admin/content?prefix=${key}`)
      .then(r => r.json())
      .then((saved: Record<string, string>) => {
        if (saved[key]) {
          try { setData(JSON.parse(saved[key])); } catch { setData(defaults); }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [key]);

  const save = async (value?: T) => {
    setSaving(true);
    const payload = { [key]: JSON.stringify(value ?? data) };
    const r = await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    setStatus(r.ok ? 'Saved!' : 'Save failed');
    setTimeout(() => setStatus(''), 3000);
  };

  return { data, setData, loading, saving, save, status };
}
