import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles, ExternalLink, Bot, Send, BookOpen, Compass, Award,
  Menu, X, ShieldCheck, Info, Brain, Gauge, Check, MapPin, Calendar as CalIcon
} from "lucide-react";

/* =========================================================
 * DEMO CONFIG (frontend-only)
 * =======================================================*/
const DEMO_BRAND = "Conference Assistant (Demo)";
const DEMO_DISCLAIMER =
  "This is a DEMO website. All features are frontend-only. No real backend, AI, or data processing occurs.";

/* =========================================================
 * THEME (user-changeable)
 * =======================================================*/
const DEFAULT_THEME = "#0a0a1a";
const GOLD = "#d6c089";
const GOLD_SOFT = "rgba(214,192,137,.45)";

function setCSSVars(theme) {
  const root = document.documentElement;
  root.style.setProperty("--theme", theme);
  root.style.setProperty("--noir-ink", "rgba(255,255,255,.86)");
  root.style.setProperty("--noir-stroke", "rgba(255,255,255,.12)");
  root.style.setProperty("--noir-glass", "rgba(255,255,255,.06)");
  root.style.setProperty("--noir-glass-2", "rgba(255,255,255,.10)");
}

/* =========================================================
 * BACKGROUND (generic statues)
 * =======================================================*/
function Atmosphere() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let w = (c.width = innerWidth), h = (c.height = innerHeight);
    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      v: Math.random() * 0.4 + 0.1,
    }));
    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,.35)";
      stars.forEach(s => {
        s.y += s.v;
        if (s.y > h) s.y = 0;
        ctx.fillRect(s.x, s.y, 1, 1);
      });
      requestAnimationFrame(draw);
    }
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
        className="fixed left-[-40px] top-[20vh] w-[260px] opacity-[.5] -z-10"
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
 * MOCK CHAT ENGINE (NO BACKEND)
 * =======================================================*/
function mockAnswer(q) {
  if (/date|when/i.test(q)) return "The conference is scheduled across two days. Exact dates are announced on the homepage.";
  if (/venue|where/i.test(q)) return "The venue is a centrally located hotel venue (demo placeholder).";
  if (/register/i.test(q)) return "Registration is currently open on the main website (demo).";
  if (/unga/i.test(q)) return "UNGA focuses on global policy, diplomacy, and multilateral negotiations.";
  if (/unhrc/i.test(q)) return "UNHRC debates human rights concerns and accountability mechanisms.";
  return "This is a demo assistant. In a real deployment, this response would come from an AI-backed knowledge system.";
}

/* =========================================================
 * CHAT
 * =======================================================*/
function DemoChat() {
  const [thread, setThread] = useState([
    { from: "bot", text: "Hello! I’m the Demo Assistant. Ask me anything about the conference." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setThread(t => [...t, { from: "user", text: q }, { from: "bot", text: mockAnswer(q) }]);
    setInput("");
  };

  return (
    <div className="space-y-3">
      <div className="h-[45vh] overflow-auto space-y-2">
        {thread.map((m, i) => (
          <div key={i} className={`px-3 py-2 rounded-xl max-w-[80%] ${m.from === "bot" ? "bg-white/10" : "bg-white/20 ml-auto"}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask something…"
          className="flex-1 px-3 py-2 rounded-lg bg-white/10 outline-none"
        />
        <button onClick={send} className="px-4 rounded-lg bg-white/20">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
 * PAGE
 * =======================================================*/
export default function Assistance() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || DEFAULT_THEME);
  const [tab, setTab] = useState("chat");

  useEffect(() => {
    setCSSVars(theme);
    document.body.style.background = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen text-white">
      <Atmosphere />
      <RomanLayer />

      {/* HEADER */}
      <header className="px-4 py-3 flex items-center justify-between backdrop-blur border-b border-white/10">
        <Link to="/" className="font-semibold">{DEMO_BRAND}</Link>
        <input
          type="color"
          value={theme}
          onChange={e => setTheme(e.target.value)}
          title="Change theme color"
        />
      </header>

      {/* DISCLAIMER */}
      <div className="text-center text-xs text-white/70 py-2 bg-black/40">
        {DEMO_DISCLAIMER}
      </div>

      {/* MAIN */}
      <main className="max-w-5xl mx-auto p-4 grid gap-4">
        <div className="flex gap-2">
          {["chat", "rop", "quiz", "rubric"].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1 rounded-full ${tab === t ? "bg-white/20" : "bg-white/10"}`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {tab === "chat" && <DemoChat />}
        {tab !== "chat" && (
          <div className="p-6 rounded-xl bg-white/10">
            <p className="text-white/80">
              This section is fully interactive in the real product.
              In this demo, it visually represents the feature without backend logic.
            </p>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-10 py-4 text-center text-xs text-white/70 border-t border-white/10">
        <div>{DEMO_DISCLAIMER}</div>
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
