// src/pages/Register.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  Crown, ChevronRight, Loader2, Info, CheckCircle2,
  CloudUpload, X, ExternalLink, Check, Copy, AlertTriangle
} from "lucide-react";

/* =========================================================
 * DEMO CONFIG — FRONTEND ONLY
 * =======================================================*/
const DEMO_NOTICE =
  "This is a DEMO registration form. No data is submitted, stored, or processed on any server.";

const DRAFT_KEY = "demo_registration_draft";

/* ----------- Helpers ----------- */
const cls = (...xs) => xs.filter(Boolean).join(" ");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s()]{8,}$/;

/* ----------- Mock data ----------- */
const COMMITTEES = [
  "UNGA — Global Security",
  "UNHRC — Human Rights",
  "UNCSW — Gender Equality",
  "AIPPM — Indian Politics",
  "IPL — Sports Governance",
];

const UPI_PRIMARY = "demo@upi";
const UPI_ALT = "demoalt@upi";

/* =========================================================
 * Atmosphere + Roman Layer (same visuals)
 * =======================================================*/
function Atmosphere() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let w = (c.width = innerWidth), h = (c.height = innerHeight);
    const pts = Array.from({ length: 120 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      v: Math.random() * 0.35 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,.4)";
      pts.forEach(p => {
        p.y += p.v;
        if (p.y > h) p.y = 0;
        ctx.fillRect(p.x, p.y, 1, 1);
      });
      requestAnimationFrame(draw);
    };
    draw();
  }, []);
  return <canvas ref={ref} className="fixed inset-0 -z-20" />;
}

function RomanLayer() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  return (
    <>
      <motion.img
        src="https://images.unsplash.com/photo-1583511655826-05700442982b"
        className="fixed left-[-40px] top-[18vh] w-[260px] opacity-[.5] -z-10"
        style={{ y }}
        alt=""
      />
      <motion.img
        src="https://images.unsplash.com/photo-1549887534-3ec93abae044"
        className="fixed right-[-40px] top-[30vh] w-[260px] opacity-[.45] -z-10"
        style={{ y }}
        alt=""
      />
    </>
  );
}

/* =========================================================
 * UI primitives
 * =======================================================*/
function Card({ children }) {
  return (
    <section className="rounded-2xl border border-white/12 bg-white/[0.06] backdrop-blur p-6">
      {children}
    </section>
  );
}
function Field({ label, error, children }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-white/90">{label}</label>
      {children}
      {error && (
        <div className="text-xs text-red-300 flex items-center gap-1">
          <Info size={12} /> {error}
        </div>
      )}
    </div>
  );
}
function Input(props) {
  return (
    <input
      {...props}
      className="w-full rounded-xl bg-white/10 px-3 py-2 outline-none border border-white/20"
    />
  );
}
function Textarea(props) {
  return (
    <textarea
      {...props}
      rows={4}
      className="w-full rounded-xl bg-white/10 px-3 py-2 outline-none border border-white/20"
    />
  );
}

/* =========================================================
 * PAGE
 * =======================================================*/
export default function Register() {
  const nav = useNavigate();

  const [f, setF] = useState(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    return saved
      ? JSON.parse(saved)
      : {
          fullName: "",
          email: "",
          whatsapp: "",
          institution: "",
          committee: "",
          paymentFile: null,
          paymentPreview: "",
        };
  });
  const [err, setErr] = useState({});
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(f));
  }, [f]);

  const validate = () => {
    const e = {};
    if (!f.fullName) e.fullName = "Required";
    if (!EMAIL_RE.test(f.email)) e.email = "Invalid email";
    if (!PHONE_RE.test(f.whatsapp)) e.whatsapp = "Invalid number";
    if (!f.committee) e.committee = "Select a committee";
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) {
      setToast({ type: "error", text: "Fix errors before submitting." });
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setToast({ type: "ok", text: "Demo submission successful. No data was sent." });
    }, 1800);
  };

  return (
    <div className="min-h-screen text-white">
      <Atmosphere />
      <RomanLayer />

      <header className="px-4 py-3 border-b border-white/10 backdrop-blur">
        <button onClick={() => nav("/")} className="font-semibold">
          Demo Conference Registration
        </button>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-8">
        <div className="text-center text-xs text-white/70">{DEMO_NOTICE}</div>

        <Card>
          <h1 className="text-3xl font-bold mb-4">Registration</h1>

          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Full Name" error={err.fullName}>
              <Input value={f.fullName} onChange={e => setF({ ...f, fullName: e.target.value })} />
            </Field>
            <Field label="Email" error={err.email}>
              <Input value={f.email} onChange={e => setF({ ...f, email: e.target.value })} />
            </Field>
            <Field label="WhatsApp Number" error={err.whatsapp}>
              <Input value={f.whatsapp} onChange={e => setF({ ...f, whatsapp: e.target.value })} />
            </Field>
            <Field label="Institution">
              <Input value={f.institution} onChange={e => setF({ ...f, institution: e.target.value })} />
            </Field>
            <Field label="Committee Preference" error={err.committee}>
              <select
                className="w-full rounded-xl bg-white/10 px-3 py-2 border border-white/20"
                value={f.committee}
                onChange={e => setF({ ...f, committee: e.target.value })}
              >
                <option value="">Select</option>
                {COMMITTEES.map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={submit}
              disabled={busy}
              className="rounded-xl px-5 py-3 bg-white/20 border border-white/30"
            >
              {busy ? <Loader2 className="animate-spin" /> : "Submit (Demo)"}
            </button>
          </div>
        </Card>
      </main>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-4 right-4 bg-black/70 backdrop-blur px-4 py-2 rounded-xl border border-white/20 text-sm"
          >
            {toast.text}
            <button onClick={() => setToast(null)} className="ml-2">
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-10 text-center text-xs text-white/60">
        {DEMO_NOTICE}
        <div className="mt-1">
          Made by{" "}
          <a
            href="https://wa.me/919811588040"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Sameer
          </a>
        </div>
      </footer>
    </div>
  );
}
