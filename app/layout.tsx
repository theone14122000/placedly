import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Providers from './components/Providers';

export const metadata: Metadata = {
  title: 'Placedly — Career Placement & Coaching Platform',
  description:
    "Placedly is India's leading career placement platform. Expert CV building, interview coaching, job matching, and our flagship Career Assistance Programme. 1,000+ candidates placed. Free consultation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Webflow shared CSS */}
        <link
          href="https://cdn.prod.website-files.com/68297ae923cb528bf9784f53/css/porbe.shared.fb01228ff.css"
          rel="stylesheet"
          type="text/css"
          crossOrigin="anonymous"
        />
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        {/* Favicon */}
        <link href="/favicon.png" rel="icon" type="image/png" />
        <link href="/favicon.png" rel="apple-touch-icon" />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>

        {/* WebFont loader */}
        <Script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" strategy="beforeInteractive" />
        <Script id="webfont-load" strategy="beforeInteractive">{`
          WebFont.load({ google: { families: ["Poppins:300,regular,500,600,700,800,900","Instrument Serif:regular,italic","Playfair Display:600,700","Inter:500,600,700","Fraunces:opsz,wght@9..144,500,600"] } });
        `}</Script>

        {/* Webflow touch/JS class injection */}
        <Script id="wf-touch" strategy="beforeInteractive">{`
          !function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart" in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);
        `}</Script>

        {/* GSAP */}
        <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/gsap.min.js" strategy="afterInteractive" />
        <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/SplitText.min.js" strategy="afterInteractive" />

        {/* jQuery */}
        <Script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=68297ae923cb528bf9784f53" strategy="afterInteractive" crossOrigin="anonymous" />

        {/* Webflow JS chunks */}
        <Script src="https://cdn.prod.website-files.com/68297ae923cb528bf9784f53/js/porbe.schunk.f3a08821b4e31f89.js" strategy="afterInteractive" crossOrigin="anonymous" />
        <Script src="https://cdn.prod.website-files.com/68297ae923cb528bf9784f53/js/porbe.schunk.d1df3b71234f3b90.js" strategy="afterInteractive" crossOrigin="anonymous" />
        <Script src="https://cdn.prod.website-files.com/68297ae923cb528bf9784f53/js/porbe.schunk.ffd953334ce057bc.js" strategy="afterInteractive" crossOrigin="anonymous" />
        <Script src="https://cdn.prod.website-files.com/68297ae923cb528bf9784f53/js/porbe.schunk.4913f0d9ee368d76.js" strategy="afterInteractive" crossOrigin="anonymous" />
        <Script src="https://cdn.prod.website-files.com/68297ae923cb528bf9784f53/js/porbe.schunk.d659be6dcd9af708.js" strategy="afterInteractive" crossOrigin="anonymous" />
        <Script src="https://cdn.prod.website-files.com/68297ae923cb528bf9784f53/js/porbe.84b96995.2a8a6b9ca04293c5.js" strategy="afterInteractive" crossOrigin="anonymous" />
      </body>
    </html>
  );
}
