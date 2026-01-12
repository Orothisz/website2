// src/pages/Home.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  ChevronRight,
  X,
  Quote,
  Sparkles,
  Columns,
  Shield,
} from "lucide-react";

/* =========================================================
 * DEMO DISCLAIMER
 * =======================================================*/
const DEMO_NOTICE =
  "This is a frontend-only demo website. No backend, database, authentication, or live services are connected.";

/* =========================================================
 * USER-CHANGEABLE THEME (LIVE)
 * =======================================================*/
const THEMES = {
  midnight: "#020617",
  slate: "#020617",
  indigo: "#0B1020",
  emerald: "#021F17",
};

function setTheme(color) {
  const r = document.documentElement;
  r.style.setProperty("--theme", color);
  r.style.setProperty("--glass", "rgba(255,255,255,.06)");
  r.style.setProperty("--glass-strong", "rgba(255,255,255,.12)");
  r.style.setProperty("--stroke", "rgba(255,255,255,.14)");
  document.body.style.background = color;
}

/* =========================================================
 * BACKGROUND ATMOSPHERE
 * =======================================================*/
function Atmosphere() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let w = (c.width = innerWidth);
    let h = (c.height = innerHeight);

    const pts = Array.from({ length: 120 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      v: Math.random() * 0.4 + 0.1,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,.45)";
      pts.forEach((p) => {
        p.y += p.v;
        if (p.y > h) p.y = 0;
        ctx.fillRect(p.x, p.y, 1, 1);
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} className="fixed inset-0 -z-20" />;
}

/* =========================================================
 * FLOATING FIGURES (GENERIC)
 * =======================================================*/
function FloatingFigures() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <>
      <motion.img
        src="https://images.unsplash.com/photo-1549893074-0c45f7d1c57d"
        className="pointer-events-none fixed left-[-30px] top-[16vh] w-[260px] opacity-[.55] mix-blend-screen -z-10"
        style={{ y: y1, filter: "grayscale(70%) contrast(110%)" }}
        alt=""
      />
      <motion.img
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
        className="pointer-events-none fixed right-[-30px] top-[28vh] w-[260px] opacity-[.5] mix-blend-screen -z-10"
        style={{ y: y2, filter: "grayscale(70%) contrast(110%)" }}
        alt=""
      />
      <motion.img
        src="https://images.unsplash.com/photo-1528747045269-390fe33c19f2"
        className="pointer-events-none fixed left-1/2 -translate-x-1/2 bottom-[6vh] w-[520px] opacity-[.45] mix-blend-screen -z-10"
        style={{ y: y3, filter: "grayscale(65%) contrast(105%)" }}
        alt=""
      />
    </>
  );
}

/* =========================================================
 * MOCK DATA (NO BACKEND)
 * =======================================================*/
const EVENT = {
  name: "Demo Conference 2026",
  dates: "DD–DD Month YYYY",
  location: "City, Country",
};

const TARGET_DATE = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

const COMMITTEES = [
  {
    name: "General Assembly",
    agenda: "Addressing global governance challenges in the modern era.",
    brief: {
      overview: "A high-level diplomatic forum.",
      objectives: ["Draft resolutions", "Negotiate policy"],
      format: "Formal debate",
      resources: ["UN Charter", "Past resolutions"],
    },
  },
  {
    name: "Security Council",
    agenda: "Peacekeeping and international security.",
    brief: {
      overview: "Crisis-driven executive council.",
      objectives: ["Manage crises", "Pass directives"],
      format: "Crisis committee",
      resources: ["Security Council mandates"],
    },
  },
];

/* =========================================================
 * COUNTDOWN
 * =======================================================*/
function useCountdown(target) {
  const [t, setT] = useState(() => new Date(target) - Date.now());
  useEffect(() => {
    const i = setInterval(() => setT(new Date(target) - Date.now()), 1000);
    return () => clearInterval(i);
  }, [target]);

  const d = Math.max(0, Math.floor(t / (1000 * 60 * 60 * 24)));
  const h = Math.max(0, Math.floor((t / (1000 * 60 * 60)) % 24));
  const m = Math.max(0, Math.floor((t / (1000 * 60)) % 60));
  const s = Math.max(0, Math.floor((t / 1000) % 60));
  return { d, h, m, s };
}

/* =========================================================
 * HERO
 * =======================================================*/
function Hero() {
  const { d, h, m, s } = useCountdown(TARGET_DATE);

  return (
    <section
      className="rounded-[28px] px-6 md:px-10 py-14 text-center"
      style={{
        border: "1px solid var(--stroke)",
        background: "linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02))",
      }}
    >
      <div className="mx-auto h-20 w-20 rounded-xl bg-white/10 grid place-items-center text-xs uppercase tracking-widest">
        Logo
      </div>

      <h1 className="mt-6 text-[42px] md:text-[70px] font-black">
        {EVENT.name}
      </h1>

      <div className="mt-3 text-white/70 flex items-center justify-center gap-2">
        <Calendar size={16} /> {EVENT.dates} • {EVENT.location}
      </div>

      <div className="mt-6 flex justify-center gap-4">
        {[["Days", d], ["Hrs", h], ["Min", m], ["Sec", s]].map(([l, v]) => (
          <div key={l} className="text-center">
            <div className="text-3xl font-black">{String(v).padStart(2, "0")}</div>
            <div className="text-xs text-white/60 uppercase tracking-widest">
              {l}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => alert("Demo only — backend not connected")}
          className="px-6 py-3 rounded-2xl border"
          style={{ background: "var(--glass-strong)", borderColor: "var(--stroke)" }}
        >
          Register <ChevronRight size={18} />
        </button>
        <Link
          to="/assistance"
          className="px-6 py-3 rounded-2xl border"
          style={{ background: "var(--glass)", borderColor: "var(--stroke)" }}
        >
          Assistance
        </Link>
      </div>

      <div className="mt-6 text-xs text-white/50">{DEMO_NOTICE}</div>
    </section>
  );
}

/* =========================================================
 * COMMITTEE GRID
 * =======================================================*/
function Committees({ onOpen }) {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-extrabold text-center flex justify-center items-center gap-2">
        <Columns size={22} /> Committees
      </h2>

      <div className="mt-8 grid sm:grid-cols-2 gap-6">
        {COMMITTEES.map((c, i) => (
          <motion.button
            key={c.name}
            onClick={() => onOpen(i)}
            className="rounded-[26px] p-6 text-left"
            style={{
              border: "1px solid var(--stroke)",
              background: "var(--glass)",
            }}
            whileHover={{ y: -4 }}
          >
            <div className="font-semibold text-lg">{c.name}</div>
            <div className="text-sm text-white/70 mt-2">{c.agenda}</div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
 * COMMITTEE MODAL
 * =======================================================*/
function CommitteeModal({ idx, onClose }) {
  if (idx === null) return null;
  const c = COMMITTEES[idx];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="max-w-xl w-full rounded-2xl p-6"
          style={{ background: "rgba(5,5,20,.96)", border: "1px solid var(--stroke)" }}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          exit={{ y: 20 }}
        >
          <div className="flex items-center gap-3">
            <Shield size={20} />
            <h3 className="text-xl font-bold">{c.name}</h3>
            <button onClick={onClose} className="ml-auto">
              <X />
            </button>
          </div>

          <p className="mt-4 text-white/80">{c.brief.overview}</p>

          <div className="mt-4">
            <strong>Objectives</strong>
            <ul className="list-disc list-inside text-white/80">
              {c.brief.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
/* =========================================================
 * HEADER + THEME SWITCHER
 * =======================================================*/
function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur"
      style={{ borderBottom: "1px solid var(--stroke)", background: "rgba(2,6,23,.65)" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="font-semibold tracking-wide">Demo Conference</div>

        <div className="hidden sm:flex gap-2">
          {Object.entries(THEMES).map(([k, v]) => (
            <button
              key={k}
              onClick={() => setTheme(v)}
              className="px-3 py-1 rounded-full text-xs border"
              style={{ borderColor: "var(--stroke)", background: "var(--glass)" }}
            >
              {k}
            </button>
          ))}
        </div>

        <button onClick={() => setOpen(true)} className="sm:hidden">
          <span className="text-xl">☰</span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed top-0 left-0 right-0 z-50 p-6"
              style={{ background: "#020617" }}
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
            >
              <button onClick={() => setOpen(false)} className="mb-4">
                <X />
              </button>
              <div className="flex flex-wrap gap-2">
                {Object.entries(THEMES).map(([k, v]) => (
                  <button
                    key={k}
                    onClick={() => setTheme(v)}
                    className="px-3 py-2 rounded-xl border"
                    style={{ borderColor: "var(--stroke)", background: "var(--glass)" }}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

/* =========================================================
 * PARTNER MARQUEE (MOCK)
 * =======================================================*/
function PartnerMarquee() {
  const partners = ["Education Partner", "Media Partner", "Hospitality Partner"];

  return (
    <div className="mt-16 overflow-hidden border-y" style={{ borderColor: "var(--stroke)" }}>
      <div className="flex gap-12 animate-marquee px-6 py-4 text-white/70">
        {[...partners, ...partners].map((p, i) => (
          <span key={i} className="whitespace-nowrap">{p}</span>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
 * ITINERARY (MOCK)
 * =======================================================*/
function Itinerary() {
  return (
    <section className="mt-16 rounded-[28px] p-6 md:p-10"
      style={{ border: "1px solid var(--stroke)", background: "var(--glass)" }}
    >
      <h2 className="text-2xl font-extrabold flex items-center gap-2">
        <Sparkles size={20} /> Itinerary
      </h2>
      <ul className="mt-4 space-y-3 text-white/80">
        <li>Day 1 — Opening Ceremony & Sessions</li>
        <li>Day 2 — Core Debate & Drafting</li>
        <li>Day 3 — Final Voting & Closing</li>
      </ul>
    </section>
  );
}

/* =========================================================
 * FAQ
 * =======================================================*/
function FAQ() {
  const qa = [
    ["Is this a real website?", "No. This is a frontend demo only."],
    ["Does registration work?", "No backend is connected."],
    ["Can this be reused?", "Yes. This is a template."],
  ];

  return (
    <section className="mt-16 rounded-[28px] p-6 md:p-10"
      style={{ border: "1px solid var(--stroke)", background: "var(--glass)" }}
    >
      <h2 className="text-2xl font-extrabold flex items-center gap-2">
        <HelpCircle size={20} /> FAQs
      </h2>
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        {qa.map(([q, a]) => (
          <details key={q} className="p-4 rounded-xl bg-white/5">
            <summary className="cursor-pointer font-semibold">{q}</summary>
            <p className="mt-2 text-white/75">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
 * DEMO CHAT (FAKE BACKEND)
 * =======================================================*/
function DemoChat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {open && (
        <div className="w-80 rounded-2xl p-4 border"
          style={{ background: "rgba(10,10,30,.95)", borderColor: "var(--stroke)" }}
        >
          <div className="flex justify-between items-center mb-2">
            <strong>Demo Assistant</strong>
            <button onClick={() => setOpen(false)}><X size={16} /></button>
          </div>
          <p className="text-sm text-white/80">
            This chat appears functional but is not connected to any backend.
          </p>
        </div>
      )}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-3 rounded-2xl border"
          style={{ background: "var(--glass-strong)", borderColor: "var(--stroke)" }}
        >
          Chat
        </button>
      )}
    </div>
  );
}

/* =========================================================
 * FOOTER
 * =======================================================*/
function Footer() {
  return (
    <footer className="mt-20 py-10 text-center text-white/60 border-t"
      style={{ borderColor: "var(--stroke)" }}
    >
      <div>© {new Date().getFullYear()} Demo Website</div>
      <a
        href="https://wa.me/919811588040"
        target="_blank"
        rel="noreferrer"
        className="block mt-2 underline"
      >
        Made by Sameer
      </a>
      <div className="mt-2 text-xs">{DEMO_NOTICE}</div>
    </footer>
  );
}

/* =========================================================
 * PAGE EXPORT
 * =======================================================*/
export default function Home() {
  const [modalIdx, setModalIdx] = useState(null);

  useEffect(() => {
    setTheme(THEMES.midnight);
  }, []);

  return (
    <div className="min-h-screen text-white relative">
      <Atmosphere />
      <FloatingFigures />

      <Header />

      <main className="max-w-7xl mx-auto px-4 py-10">
        <Hero />
        <Committees onOpen={setModalIdx} />
        <PartnerMarquee />
        <Itinerary />
        <FAQ />
      </main>

      <Footer />
      <DemoChat />

      <CommitteeModal idx={modalIdx} onClose={() => setModalIdx(null)} />

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
