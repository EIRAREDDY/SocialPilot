import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Mail, Lock, Eye, EyeOff, User, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";

function PasswordStrength({ password }) {
  const checks = [
    { label: "8+ characters", ok: password.length >= 8 },
    { label: "Uppercase letter", ok: /[A-Z]/.test(password) },
    { label: "Number", ok: /\d/.test(password) },
  ];
  const score = checks.filter(c => c.ok).length;
  const colors = ["var(--red)", "var(--amber)", "var(--green)"];
  const labels = ["Weak", "Fair", "Strong"];

  if (!password) return null;
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i < score ? colors[score - 1] : "var(--border)",
            transition: "background 0.3s",
          }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: score > 0 ? colors[score - 1] : "var(--text-muted)" }}>
          {score > 0 ? labels[score - 1] : ""}
        </span>
        <div style={{ display: "flex", gap: 10 }}>
          {checks.map(c => (
            <span key={c.label} style={{ fontSize: 10, color: c.ok ? "var(--green)" : "var(--text-dim)", display: "flex", alignItems: "center", gap: 3 }}>
              <CheckCircle size={9} color={c.ok ? "var(--green)" : "var(--text-dim)"} /> {c.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!name.trim()) return "Please enter your name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (!agreed) return "Please agree to the Terms of Service.";
    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1000);
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
          position: "absolute", top: "-15%", right: "15%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute", bottom: "0%", left: "5%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 1 }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
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
            Create your account
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 28 }}>
            Start automating your social media growth — free
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Name */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 7 }}>
                Full name
              </label>
              <div style={{ position: "relative" }}>
                <User size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type="text"
                  value={name}
                  onChange={e => { setName(e.target.value); setError(""); }}
                  placeholder="Your name"
                  autoComplete="name"
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
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 7 }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
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
              <PasswordStrength password={password} />
            </div>

            {/* Terms */}
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
              <div
                onClick={() => { setAgreed(v => !v); setError(""); }}
                style={{
                  width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
                  background: agreed ? "var(--grad-brand)" : "var(--bg-elevated)",
                  border: agreed ? "none" : "1px solid var(--border)",
                  display: "grid", placeItems: "center",
                  transition: "all 0.2s",
                }}
              >
                {agreed && <CheckCircle size={12} color="white" />}
              </div>
              <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                I agree to the{" "}
                <a href="#" onClick={e => e.preventDefault()} style={{ color: "var(--violet-bright)" }}>Terms of Service</a>
                {" "}and{" "}
                <a href="#" onClick={e => e.preventDefault()} style={{ color: "var(--violet-bright)" }}>Privacy Policy</a>
              </span>
            </label>

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
                <><span>Create Account</span><ArrowRight size={16} /></>
              )}
            </motion.button>
          </form>

          {/* Benefits */}
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 6 }}>
            {["Free plan — no credit card required", "Setup in under 2 minutes", "Cancel anytime"].map(b => (
              <div key={b} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "var(--text-muted)" }}>
                <CheckCircle size={12} color="var(--green)" /> {b}
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-muted)", marginTop: 20 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--violet-bright)", fontWeight: 600 }}>
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
