'use client';
import { useRef, useState } from 'react';
import { Upload, Copy, Check, Loader, X } from 'lucide-react';

const SITE_IMAGES = [
  { name: 'logo.png', path: '/logo.png', desc: 'Site logo (navbar + footer)' },
  { name: 'favicon.png', path: '/favicon.png', desc: 'Browser tab icon' },
  { name: 'team.png', path: '/img/team.png', desc: 'Team photo (About Us / Homepage)' },
  { name: 'aboutt us consultancy.png', path: '/img/aboutt us consultancy.png', desc: 'Office photo (About Us page)' },
  { name: 'at founder part.png', path: '/img/at founder part.png', desc: 'Founder photo (About Us page)' },
];

interface Uploaded { name: string; url: string; }

export default function AdminMedia() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState<Uploaded[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(''), 2000);
  };

  const uploadFiles = async (files: File[]) => {
    if (!files.length) return;
    setUploading(true);
    setErrors([]);

    const results: Uploaded[] = [];
    const errs: string[] = [];

    await Promise.all(files.map(async (file) => {
      try {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? 'Upload failed');
        results.push({ name: file.name, url: json.url });
      } catch (e: any) {
        errs.push(`${file.name}: ${e.message}`);
      }
    }));

    setUploaded(u => [...results, ...u]);
    if (errs.length) setErrors(errs);
    setUploading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadFiles(Array.from(e.target.files ?? []));
    e.target.value = '';
  };

  return (
    <div className="adm-page" style={{ padding: '32px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', marginBottom: '4px' }}>Media Library</h1>
        <p style={{ fontSize: '13px', color: '#64748b' }}>Upload images and copy their URLs to use in any CMS field.</p>
      </div>

      {/* Upload zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); uploadFiles(Array.from(e.dataTransfer.files)); }}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? '#2145fb' : '#cbd5e1'}`,
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center',
          background: dragOver ? '#eff3ff' : '#f8faff',
          cursor: 'pointer',
          marginBottom: '28px',
          transition: 'all 0.15s',
        }}
      >
        {uploading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#2145fb', fontSize: '14px', fontWeight: 600 }}>
            <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} /> Uploading…
          </div>
        ) : (
          <>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <Upload size={22} color="#2145fb" />
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0b0d20', marginBottom: '4px' }}>
              {dragOver ? 'Drop to upload' : 'Click or drag & drop to upload'}
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>PNG, JPG, WebP, GIF, SVG — max 5MB each · Multiple files OK</div>
          </>
        )}
        <input ref={inputRef} type="file" multiple accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {/* Errors */}
      {errors.length > 0 && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px' }}>
          {errors.map((e, i) => (
            <div key={i} style={{ fontSize: '12px', color: '#dc2626', fontWeight: 500 }}>{e}</div>
          ))}
          <button onClick={() => setErrors([])} style={{ marginTop: 6, fontSize: 11, color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Poppins',sans-serif", fontWeight: 600 }}>Dismiss</button>
        </div>
      )}

      {/* Uploaded images */}
      {uploaded.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0b0d20', marginBottom: '12px' }}>Uploaded Images</div>
          <div className="adm-grid-4">
            {uploaded.map((img, idx) => (
              <div key={img.url} style={{ background: '#fff', border: '1px solid #eef0f6', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,.04)', position: 'relative' }}>
                <img src={img.url} alt={img.name} style={{ width: '100%', height: '120px', objectFit: 'cover', display: 'block' }} />
                <button
                  onClick={() => setUploaded(u => u.filter((_, i) => i !== idx))}
                  style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,0.55)', border: 'none', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}
                  title="Remove from list"
                >
                  <X size={11} />
                </button>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#0b0d20', marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{img.name}</div>
                  <button
                    onClick={() => copyUrl(img.url)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '6px', background: copied === img.url ? '#f0fdf4' : '#eff6ff', color: copied === img.url ? '#16a34a' : '#2145fb', border: 'none', borderRadius: '7px', fontSize: '11px', cursor: 'pointer', fontWeight: 600, fontFamily: "'Poppins',sans-serif" }}
                  >
                    {copied === img.url ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy URL</>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Static site images */}
      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0b0d20', marginBottom: '14px' }}>Static Site Images (public/)</div>
      <div style={{ background: '#fff', border: '1px solid #eef0f6', borderRadius: '16px', overflow: 'hidden' }}>
        {SITE_IMAGES.map((img, i) => (
          <div key={img.name} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', borderBottom: i < SITE_IMAGES.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
            <div style={{ width: '56px', height: '40px', borderRadius: '8px', background: '#f8faff', border: '1px solid #eef0f6', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
              <img src={img.path} alt={img.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#0b0d20' }}>{img.name}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>{img.desc}</div>
            </div>
            <code style={{ fontSize: '11px', color: '#475569', background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px' }}>{img.path}</code>
            <button
              onClick={() => copyUrl(img.path)}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: copied === img.path ? '#f0fdf4' : '#eff6ff', color: copied === img.path ? '#16a34a' : '#2145fb', border: 'none', borderRadius: '7px', fontSize: '11px', cursor: 'pointer', fontWeight: 600, fontFamily: "'Poppins',sans-serif", whiteSpace: 'nowrap' }}
            >
              {copied === img.path ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy Path</>}
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '10px', padding: '12px 16px', fontSize: '12px', color: '#0369a1' }}>
        <strong>Tip:</strong> Images uploaded here are stored on Vercel Blob and are live immediately. Copy the URL and paste it into any image field in the CMS editors above.
      </div>
    </div>
  );
}
