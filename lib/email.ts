import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM ?? 'onboarding@resend.dev';

export async function sendApprovalEmail(opts: {
  to: string;
  name: string;
  password: string;
  validUntil: Date;
}) {
  const expiry = opts.validUntil.toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return resend.emails.send({
    from: FROM,
    to: opts.to,
    subject: '🎉 You\'re approved — Welcome to Placedly CAP!',
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:520px;margin:0 auto;color:#1e293b">
        <div style="background:#0b0d20;padding:28px 32px;border-radius:12px 12px 0 0">
          <img src="https://placedly.in/logo.png" alt="Placedly" style="height:40px"/>
        </div>
        <div style="background:#fff;border:1px solid #e2e8f0;border-top:none;padding:32px;border-radius:0 0 12px 12px">
          <h2 style="font-size:22px;font-weight:800;color:#0b0d20;margin-bottom:8px">
            Welcome aboard, ${opts.name}! 🚀
          </h2>
          <p style="color:#64748b;font-size:15px;line-height:1.6;margin-bottom:24px">
            Your Career Assistance Programme (CAP) application has been approved.
            Here are your login credentials:
          </p>

          <div style="background:#f1f5f9;border-radius:10px;padding:20px 24px;margin-bottom:24px">
            <div style="margin-bottom:12px">
              <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:4px">Login Email</div>
              <div style="font-size:16px;font-weight:700;color:#0b0d20">${opts.to}</div>
            </div>
            <div>
              <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:4px">Temporary Password</div>
              <div style="font-size:18px;font-weight:800;color:#2145fb;letter-spacing:1px">${opts.password}</div>
            </div>
          </div>

          <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:14px 18px;margin-bottom:24px;font-size:13px;color:#92400e">
            ⚠️ Keep these credentials safe. Your portal access is valid until <strong>${expiry}</strong>.
          </div>

          <a href="${process.env.NEXTAUTH_URL}/login"
             style="display:inline-block;background:#2145fb;color:#fff;font-weight:700;font-size:15px;padding:13px 28px;border-radius:10px;text-decoration:none">
            Login to Placedly →
          </a>

          <p style="color:#94a3b8;font-size:12px;margin-top:28px;line-height:1.6">
            If you have any questions, reply to this email or WhatsApp us at +91 XXXXX XXXXX.
          </p>
        </div>
      </div>
    `,
  });
}

export async function sendRejectionEmail(opts: { to: string; name: string }) {
  return resend.emails.send({
    from: FROM,
    to: opts.to,
    subject: 'Update on your Placedly CAP application',
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:520px;margin:0 auto;color:#1e293b">
        <div style="background:#0b0d20;padding:28px 32px;border-radius:12px 12px 0 0">
          <img src="https://placedly.in/logo.png" alt="Placedly" style="height:40px"/>
        </div>
        <div style="background:#fff;border:1px solid #e2e8f0;border-top:none;padding:32px;border-radius:0 0 12px 12px">
          <h2 style="font-size:20px;font-weight:800;color:#0b0d20;margin-bottom:8px">Hi ${opts.name},</h2>
          <p style="color:#64748b;font-size:15px;line-height:1.7">
            Thank you for applying to Placedly's Career Assistance Programme.
            After careful review, we're unable to move forward with your application at this time.
          </p>
          <p style="color:#64748b;font-size:15px;line-height:1.7">
            You're welcome to re-apply in 30 days if your situation changes.
          </p>
          <p style="color:#94a3b8;font-size:13px;margin-top:24px">— Team Placedly</p>
        </div>
      </div>
    `,
  });
}

export async function sendRenewalEmail(opts: {
  to: string;
  name: string;
  validUntil: Date;
}) {
  const expiry = opts.validUntil.toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
  return resend.emails.send({
    from: FROM,
    to: opts.to,
    subject: '✅ Your Placedly portal access has been renewed',
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:520px;margin:0 auto;color:#1e293b">
        <div style="background:#0b0d20;padding:28px 32px;border-radius:12px 12px 0 0">
          <img src="https://placedly.in/logo.png" alt="Placedly" style="height:40px"/>
        </div>
        <div style="background:#fff;border:1px solid #e2e8f0;border-top:none;padding:32px;border-radius:0 0 12px 12px">
          <h2 style="font-size:20px;font-weight:800;color:#0b0d20;margin-bottom:8px">Access renewed, ${opts.name}! 🎉</h2>
          <p style="color:#64748b;font-size:15px;line-height:1.7">
            Your Placedly portal access has been extended. You can now log in until <strong>${expiry}</strong>.
          </p>
          <a href="${process.env.NEXTAUTH_URL}/login"
             style="display:inline-block;margin-top:16px;background:#2145fb;color:#fff;font-weight:700;font-size:15px;padding:13px 28px;border-radius:10px;text-decoration:none">
            Go to Portal →
          </a>
        </div>
      </div>
    `,
  });
}
