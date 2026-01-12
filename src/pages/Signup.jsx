// src/pages/Signup.jsx
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, ChevronRight, Shield, Info, X } from "lucide-react";

/* =========================================================
 * DEMO CONFIG — FRONTEND ONLY
 * =======================================================*/
const DEMO_NOTICE =
  "This is a DEMO signup page. No account is created, no data is sent or stored on any server.";

/* =========================================================
 * Password strength (visual only)
 * =======================================================*/
function scorePassword(pw = "") {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(4, s);
}

/* =========================================================
 * Background
 * =======================================================*/
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

export default function Signup() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [cpw, setCpw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showC, setShowC] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [toast, setToast] = useState(null);

  const score = useMemo(() => scorePassword(pw), [pw]);
  const scoreLabel = ["Very weak", "Weak", "Okay", "Good", "Strong"][score];

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");

    if (name.trim().length < 2) return setErr("Please enter your full name.");
    if (!/\S+@\S+\.\S+/.test(email)) return setErr("Enter a valid email.");
    if (pw.length < 8) return setErr("Use at least 8 characters.");
    if (pw !== cpw) return setErr("Passwords do not match.");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToast({
        type: "ok",
        text: "Demo signup successful. No account was created.",
      });
      setTimeout(() => nav("/login"), 1200);
    }, 1400);
  };

  return (
    <div className="min-h-[100dvh] text-white relative grid place-items-center px-4">
      <NoirBg />

      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 90, damping: 16 }}
        className="w-full max-w-md rounded-2xl border border-white/12 bg-white/5 backdrop-blur p-5 shadow-2xl"
      >
        <div className="font-semibold text-lg tracking-wide">
          Create your account (Demo)
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
            <div className="text-xs mb-1 text-white/70">Full name</div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/12 rounded-xl px-3 py-2">
              <User size={16} />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Johnson"
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
          </label>

          <label className="block">
            <div className="text-xs mb-1 text-white/70">Email</div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/12 rounded-xl px-3 py-2">
              <Mail size={16} />
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
            <div className="text-xs mb-1 text-white/70">Password</div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/12 rounded-xl px-3 py-2">
              <Lock size={16} />
              <input
                type={showPw ? "text" : "password"}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full bg-transparent outline-none text-sm"
              />
              <button type="button" onClick={() => setShowPw((v) => !v)}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="mt-1">
              <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${(score / 4) * 100}%`,
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,.9), rgba(255,255,255,.25))",
                  }}
                />
              </div>
              <div className="text-[11px] text-white/60 mt-1 flex items-center gap-1">
                <Shield size={12} /> {scoreLabel}
              </div>
            </div>
          </label>

          <label className="block">
            <div className="text-xs mb-1 text-white/70">Confirm password</div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/12 rounded-xl px-3 py-2">
              <Lock size={16} />
              <input
                type={showC ? "text" : "password"}
                value={cpw}
                onChange={(e) => setCpw(e.target.value)}
                placeholder="Re-enter password"
                className="w-full bg-transparent outline-none text-sm"
              />
              <button type="button" onClick={() => setShowC((v) => !v)}>
                {showC ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          <motion.button
            whileHover={{ y: -1 }}
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 hover:bg-white/15 px-4 py-2.5 disabled:opacity-60"
          >
            {loading ? "Creating…" : "Create Account (Demo)"}{" "}
            <ChevronRight size={16} />
          </motion.button>

          <div className="text-xs text-white/70 text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
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
