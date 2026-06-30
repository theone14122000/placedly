'use client';
import { useRef, useState } from 'react';
import { Upload, X, Loader } from 'lucide-react';

interface Props {
  label: string;
  value: string;
  onChange: (url: string) => void;
  /** Aspect hint shown under the upload zone */
  hint?: string;
  /** Preview shape: 'circle' | 'rect' (default rect) */
  shape?: 'circle' | 'rect';
}

export default function ImageUpload({ label, value, onChange, hint, shape = 'rect' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const upload = async (file: File) => {
    setError('');
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Upload failed');
      onChange(json.url);
    } catch (e: any) {
      setError(e.message ?? 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleFile = (f: File | undefined) => {
    if (!f) return;
    upload(f);
  };

  const isCircle = shape === 'circle';
  const previewStyle: React.CSSProperties = isCircle
    ? { width: 88, height: 88, borderRadius: '50%', objectFit: 'cover', border: '2.5px solid #e2e8f0', flexShrink: 0 }
    : { width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 10, border: '1.5px solid #e2e8f0' };

  const lbl: React.CSSProperties = { display: 'block', fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '6px' };

  return (
    <div>
      <label style={lbl}>{label}</label>
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => {
          e.preventDefault();
          setDragOver(false);
          handleFile(e.dataTransfer.files[0]);
        }}
        style={{
          border: `2px dashed ${dragOver ? '#2145fb' : '#d1d5db'}`,
          borderRadius: 12,
          padding: 16,
          background: dragOver ? '#eff3ff' : '#f8faff',
          transition: 'all 0.15s',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {/* Preview */}
        {value && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
            <img src={value} alt="preview" style={previewStyle} />
            {!isCircle && (
              <button
                type="button"
                onClick={() => onChange('')}
                title="Remove"
                style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,0.55)', border: 'none', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}
              >
                <X size={11} />
              </button>
            )}
            {isCircle && (
              <button
                type="button"
                onClick={() => onChange('')}
                title="Remove"
                style={{ background: '#fee2e2', border: 'none', borderRadius: 7, padding: '4px 10px', fontSize: 11, color: '#dc2626', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}
              >
                Remove
              </button>
            )}
          </div>
        )}

        {/* Upload zone */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '8px 0' }}>
          {uploading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#2145fb', fontSize: 13 }}>
              <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
              Uploading…
            </div>
          ) : (
            <>
              <Upload size={20} color="#94a3b8" />
              <div style={{ fontSize: 12, color: '#64748b', textAlign: 'center' }}>
                Drag & drop an image here, or{' '}
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  style={{ color: '#2145fb', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: "'Poppins',sans-serif", padding: 0 }}
                >
                  browse
                </button>
              </div>
              {hint && <div style={{ fontSize: 11, color: '#94a3b8' }}>{hint}</div>}
            </>
          )}
          {error && <div style={{ fontSize: 11, color: '#dc2626', fontWeight: 600 }}>{error}</div>}
        </div>

        {/* URL fallback */}
        <div>
          <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.3px' }}>Or paste URL directly</div>
          <input
            type="url"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="https://…"
            style={{ display: 'block', width: '100%', padding: '8px 11px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', fontFamily: "'Poppins',sans-serif", color: '#0b0d20', background: '#fff', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => handleFile(e.target.files?.[0])}
      />

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
