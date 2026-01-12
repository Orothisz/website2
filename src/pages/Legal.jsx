// src/pages/Legal.jsx
import React from "react";
import { Link } from "react-router-dom";

/* =========================================================
 * DEMO / TEMPLATE NOTICE
 * =======================================================*/
const DEMO_BANNER =
  "This is a DEMO / TEMPLATE website. The following legal text is sample content for demonstration only and does not create any legal obligations.";

/* =========================================================
 * FULL TERMS (DEMO / TEMPLATE VERSION)
 * =======================================================*/
const TERMS_FULL = `DEMO MODEL UNITED NATIONS – TERMS OF SERVICE (SAMPLE)

Effective Date: 1 January 2026
Last Updated: 1 January 2026

IMPORTANT NOTICE:
This document is a SAMPLE TERMS OF SERVICE provided for demonstration purposes only.
It does NOT constitute legal advice, does NOT bind any party, and does NOT represent
the policies of any real organization or event.

1. DEMO NATURE
1.1 This website is a frontend-only demonstration.
1.2 No real registrations, payments, authentication, or backend processing occur.
1.3 Any resemblance to real events, organizations, or policies is purely illustrative.

2. NO EVENT, NO GUARANTEES
2.1 This demo does not represent a real conference or Model United Nations event.
2.2 No participation, awards, certificates, or outcomes are guaranteed or implied.

3. USER CONDUCT (ILLUSTRATIVE)
3.1 Users are expected to interact respectfully with this demo interface.
3.2 Misuse of the demo for malicious testing, scraping, or abuse is discouraged.

4. DATA & PRIVACY (FRONTEND ONLY)
4.1 No personal data is transmitted to a server.
4.2 Any data entered is stored temporarily in the browser only (local storage).
4.3 Clearing your browser will erase all demo data.

5. PAYMENTS
5.1 Any references to fees, payments, UPI, QR codes, or uploads are simulated.
5.2 No real financial transaction takes place.

6. AI / ASSISTANCE FEATURES
6.1 Any AI assistant, chatbot, or helper shown on this site is a mock interface.
6.2 Responses are pre-defined or simulated and are not authoritative.

7. LIMITATION OF LIABILITY
7.1 This demo is provided “as is” with no warranties.
7.2 The creator is not liable for any misunderstanding, misuse, or reliance on this demo.

8. MODIFICATIONS
8.1 This demo content may be modified, removed, or replaced at any time without notice.

9. GOVERNING LAW
9.1 This demo does not invoke any jurisdiction, court, or governing law.

10. CONTACT
For template or demo-related queries only:
WhatsApp: +91 98115 88040

END OF SAMPLE TERMS.
`;

/* =========================================================
 * SHORT SUMMARY
 * =======================================================*/
const TERMS_SHORT = `SUMMARY (DEMO ONLY)

• This website is a frontend demo/template.
• No backend, payments, accounts, or legal obligations exist.
• All features are simulated for design and UX demonstration.
• Do not rely on this content for real-world use.
`;

/* =========================================================
 * PAGE
 * =======================================================*/
export default function Legal() {
  return (
    <div className="min-h-screen text-white bg-[#0a0a1a]">
      {/* Header */}
      <header className="px-4 py-3 flex items-center justify-between border-b border-white/10 bg-white/5 backdrop-blur">
        <strong>Legal — Demo Website</strong>
        <Link
          to="/"
          className="rounded-xl border border-white/20 px-3 py-2 text-sm hover:bg-white/10"
        >
          Home
        </Link>
      </header>

      {/* Demo banner */}
      <div className="mx-auto max-w-4xl px-4 mt-4">
        <div className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-3 text-sm text-yellow-200">
          {DEMO_BANNER}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mt-4">Terms of Service & Privacy</h1>

        {/* Full Terms */}
        <section className="mt-4">
          <pre className="whitespace-pre-wrap text-white/80 text-sm leading-relaxed">
{TERMS_FULL}
          </pre>
        </section>

        {/* Short Summary */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Summary</h2>
          <pre className="mt-2 whitespace-pre-wrap text-white/80 text-sm leading-relaxed">
{TERMS_SHORT}
          </pre>
        </section>

        {/* Footer credit */}
        <footer className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/60">
          Made by{" "}
          <a
            href="https://wa.me/919811588040"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-white"
          >
            Sameer
          </a>{" "}
          · Demo frontend only · No backend supported
        </footer>
      </main>
    </div>
  );
}
