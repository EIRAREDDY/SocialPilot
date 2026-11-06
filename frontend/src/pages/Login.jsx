import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!email.trim()) return "Please enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
    if (!password) return "Please enter your password.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);
    // Demo: simulate login delay then redirect
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 900);
  }

  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg-base)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px 16px", position: "relative", overflow: "hidden",
    }}>
      {/* Background orbs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-10%", left: "20%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute", bottom: "5%", right: "10%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{
              width: 40, height: 40, borderRadius: 11,
              background: "var(--grad-brand)", display: "grid", placeItems: "center",
              boxShadow: "var(--shadow-glow-sm)",
            }}>
              <Zap size={20} color="white" />
            </div>
            <span style={{
              fontWeight: 800, fontSize: 20,
              background: "var(--grad-brand)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>SocialPilot</span>
          </Link>
        </div>

        {/* Card */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-bright)",
          borderRadius: "var(--r-2xl)",
          padding: "36px 32px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.08)",
          backdropFilter: "blur(12px)",
        }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6, color: "var(--text-primary)" }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 28 }}>
            Sign in to your SocialPilot workspace
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Email */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 7 }}>
                Email address
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(""); }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  style={{
                    width: "100%", padding: "11px 13px 11px 38px",
                    background: "var(--bg-elevated)", border: "1px solid var(--border)",
                    borderRadius: "var(--r-md)", color: "var(--text-primary)",
                    fontSize: 14, outline: "none",
                  }}
                  onFocus={e => e.target.style.borderColor = "var(--border-bright)"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)" }}>
                  Password
                </label>
                <a href="#" style={{ fontSize: 12, color: "var(--violet-bright)" }}
                  onClick={e => e.preventDefault()}>
                  Forgot password?
                </a>
              </div>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  style={{
                    width: "100%", padding: "11px 40px 11px 38px",
                    background: "var(--bg-elevated)", border: "1px solid var(--border)",
                    borderRadius: "var(--r-md)", color: "var(--text-primary)",
                    fontSize: 14, outline: "none",
                  }}
                  onFocus={e => e.target.style.borderColor = "var(--border-bright)"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", color: "var(--text-muted)", padding: 2,
                  }}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: "var(--red-bg)", border: "1px solid rgba(239,68,68,0.3)",
                    borderRadius: "var(--r-md)", padding: "10px 14px",
                    fontSize: 13, color: "var(--red)",
                  }}
                >
                  <AlertCircle size={14} /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={loading ? {} : { scale: 1.02, boxShadow: "0 8px 28px rgba(124,58,237,0.45)" }}
              whileTap={loading ? {} : { scale: 0.97 }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                background: "var(--grad-brand)", color: "white",
                padding: "13px", borderRadius: "var(--r-md)",
                border: "none", fontSize: 15, fontWeight: 700,
                boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
                opacity: loading ? 0.75 : 1, marginTop: 4,
              }}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%" }}
                />
              ) : (
                <><span>Sign In</span><ArrowRight size={16} /></>
              )}
            </motion.button>
          </form>

          {/* Demo notice */}
          <div style={{
            marginTop: 20, padding: "10px 14px",
            background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)",
            borderRadius: "var(--r-md)", fontSize: 12, color: "var(--amber)", textAlign: "center",
          }}>
            Demo mode — any valid email & password (6+ chars) will sign you in
          </div>

          <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-muted)", marginTop: 20 }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "var(--violet-bright)", fontWeight: 600 }}>
              Sign up free
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
