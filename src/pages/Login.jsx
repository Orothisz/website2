// src/pages/Login.jsx
import React, { useState, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ChevronRight, ShieldCheck, Info, X } from "lucide-react";

/* =========================================================
 * DEMO CONFIG — FRONTEND ONLY
 * =======================================================*/
const DEMO_NOTICE =
  "This is a DEMO login page. No authentication happens. No data is sent to any server.";

/* --- Background (matches Home/Assistance look) --- */
function NoirBg() {
  return (
    <>
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(1200px_800px_at_80%_-20%,rgba(255,255,255,0.08),rgba(0,0,0,0)),radial-gradient(1000px_600px_at_10%_20%,rgba(255,255,255,0.06),rgba(0,0,0,0))]" />
      <div
        className="fixed inset-0 -z-10 opacity-[.06] pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22 viewBox=%220 0 160 160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22 opacity=%220.35%22/></svg>')",
        }}
      />
    </>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state && location.state.from) || "/";

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [toast, setToast] = useState(null);

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");

    if (!/\S+@\S+\.\S+/.test(email)) return setErr("Enter a valid email.");
    if (pw.length < 6) return setErr("Password must be at least 6 characters.");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToast({
        type: "ok",
        text: "Demo login successful. No authentication occurred.",
      });
      setTimeout(() => navigate(from, { replace: true }), 900);
    }, 1200);
  };

  return (
    <div className="min-h-[100dvh] text-white relative grid place-items-center px-4">
      <NoirBg />

      {/* floating glows */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
        animate={prefersReducedMotion ? {} : { opacity: 0.7, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pointer-events-none fixed -top-24 -left-24 w-80 h-80 rounded-full blur-3xl"
        style={{ background: "var(--theme, #0a0a1a)" }}
      />
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        animate={prefersReducedMotion ? {} : { opacity: 0.6, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="pointer-events-none fixed -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl"
        style={{ background: "var(--theme, #0a0a1a)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 90, damping: 16 }}
        className="w-full max-w-md rounded-2xl border border-white/12 bg-white/5 backdrop-blur p-5 shadow-2xl"
      >
        {/* header */}
        <div className="font-semibold text-lg tracking-wide">
          Sign in (Demo)
        </div>

        {/* trust bar */}
        <div className="mt-2 text-[11px] text-white/70 flex items-center gap-1">
          <ShieldCheck size={14} /> Frontend-only demo authentication.
        </div>

        <div className="mt-2 text-xs text-white/70">{DEMO_NOTICE}</div>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          {err && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-300 bg-red-500/10 border border-red-400/30 rounded-lg px-3 py-2 flex items-center gap-2"
            >
              <Info size={14} /> {err}
            </motion.div>
          )}

          <label className="block">
            <div className="text-xs mb-1 text-white/70">Email</div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/12 rounded-xl px-3 py-2 focus-within:border-white/25 transition-colors">
              <Mail size={16} className="opacity-80" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
          </label>

          <label className="block">
            <div className="flex items-center justify-between">
              <div className="text-xs mb-1 text-white/70">Password</div>
              <span className="text-xs text-white/50">Demo</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/12 rounded-xl px-3 py-2 focus-within:border-white/25 transition-colors">
              <Lock size={16} className="opacity-80" />
              <input
                type={show ? "text" : "password"}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="opacity-80 hover:opacity-100"
                aria-label="Toggle visibility"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
            type="submit"
            disabled={loading}
            className="w-full mt-1 inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 hover:bg-white/15 px-4 py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign In (Demo)"} <ChevronRight size={16} />
          </motion.button>

          <div className="text-xs text-white/70 text-center mt-1">
            Don’t have an account?{" "}
            <Link to="/signup" className="underline">
              Create one
            </Link>
          </div>
        </form>
      </motion.div>

      {toast && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className="fixed bottom-4 right-4 bg-black/70 backdrop-blur px-4 py-2 rounded-xl border border-white/20 text-sm flex items-center gap-2"
        >
          {toast.text}
          <button onClick={() => setToast(null)}>
            <X size={14} />
          </button>
        </motion.div>
      )}

      <style>{`::selection{ background: rgba(255,255,255,.22); }`}</style>
    </div>
  );
}
