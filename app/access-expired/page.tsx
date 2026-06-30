import Link from 'next/link';

export default function AccessExpiredPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8faff', fontFamily: "'Poppins',sans-serif", padding: '24px' }}>
      <div style={{ maxWidth: '440px', textAlign: 'center' }}>
        <div style={{ fontSize: '56px', marginBottom: '16px' }}>🔒</div>
        <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0b0d20', marginBottom: '10px' }}>Your access has expired</h1>
        <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.7, marginBottom: '28px' }}>
          Your CAP portal access period has ended. To continue using Placedly, please contact your advisor or the admin team to renew your subscription.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="mailto:admin@placedly.in" style={{ padding: '12px 24px', background: '#2145fb', color: '#fff', borderRadius: '10px', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
            Email Admin →
          </a>
          <Link href="/" style={{ padding: '12px 24px', background: '#fff', color: '#374151', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
