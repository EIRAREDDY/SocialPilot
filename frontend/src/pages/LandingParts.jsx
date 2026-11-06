import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import {
  Zap, ArrowRight, MessageCircle, Camera, CheckCircle,
  Star, ChevronDown, Menu, X, Workflow, Users,
  TrendingUp, Shield, Clock, Globe,
} from "lucide-react";

/* ── Floating orb background ─────────────────────────── */
function Orbs() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "-20%", left: "10%",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <motion.div
        animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{
          position: "absolute", top: "30%", right: "-10%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <motion.div
        animate={{ x: [0, 30, -40, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        style={{
          position: "absolute", bottom: "10%", left: "30%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <motion.div
        animate={{ x: [0, -20, 40, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 9 }}
        style={{
          position: "absolute", top: "60%", left: "-5%",
          width: 350, height: 350, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(214,75,146,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}

/* ── Navbar ───────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 5%",
        background: scrolled ? "rgba(8,11,20,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.3s ease",
        height: 68, display: "flex", alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 9,
          background: "var(--grad-brand)",
          display: "grid", placeItems: "center",
          boxShadow: "var(--shadow-glow-sm)",
        }}>
          <Zap size={18} color="white" />
        </div>
        <span style={{
          fontWeight: 800, fontSize: 18,
          background: "var(--grad-brand)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>SocialPilot</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 32, fontSize: 14, color: "var(--text-secondary)" }}
        className="nav-links-desktop">
        {["Features", "How it Works", "Pricing", "FAQ"].map(item => (
          <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`}
            style={{ cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "var(--violet-bright)"}
            onMouseLeave={e => e.target.style.color = "var(--text-secondary)"}
          >{item}</a>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Link to="/login" style={{
          fontSize: 14, color: "var(--text-secondary)", fontWeight: 500,
          padding: "8px 16px", borderRadius: "var(--r-md)",
          border: "1px solid var(--border)",
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-bright)"; e.currentTarget.style.color = "var(--text-primary)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
        >
          Sign In
        </Link>
        <Link to="/signup">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{
            background: "var(--grad-brand)", color: "white",
            padding: "9px 20px", borderRadius: "var(--r-md)",
            fontSize: 14, fontWeight: 600,
            boxShadow: "0 4px 16px rgba(124,58,237,0.4)",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            Get Started <ArrowRight size={14} />
          </motion.div>
        </Link>
        {/* Mobile hamburger */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(o => !o)}
          style={{
            display: "none", width: 38, height: 38, borderRadius: "var(--r-md)",
            background: "var(--bg-elevated)", border: "1px solid var(--border)",
            placeItems: "center", color: "var(--text-secondary)",
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute", top: "100%", left: 0, right: 0,
              background: "rgba(8,11,20,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--border)",
              padding: "16px 5%",
              display: "flex", flexDirection: "column", gap: 4,
            }}
            className="mobile-menu"
          >
            {["Features", "How it Works", "Pricing", "FAQ"].map(item => (
              <a key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: "12px 16px", borderRadius: "var(--r-md)",
                  fontSize: 15, color: "var(--text-secondary)",
                  display: "block",
                }}
                onMouseEnter={e => e.target.style.color = "var(--violet-bright)"}
                onMouseLeave={e => e.target.style.color = "var(--text-secondary)"}
              >{item}</a>
            ))}
            <div style={{ height: 1, background: "var(--border)", margin: "8px 0" }} />
            <Link to="/login" onClick={() => setMenuOpen(false)}
              style={{ padding: "12px 16px", fontSize: 15, color: "var(--text-secondary)" }}>
              Sign In
            </Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)}>
              <div style={{
                margin: "4px 0", padding: "12px 16px", borderRadius: "var(--r-md)",
                background: "var(--grad-brand)", color: "white",
                fontSize: 15, fontWeight: 600, textAlign: "center",
              }}>Get Started Free</div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ── Animated live activity ticker ───────────────────── */
const LIVE_EVENTS = [
  { user: "@rahul_prep",  kw: "GATE2027",   platform: "Instagram", color: "#d64b92" },
  { user: "Priya M.",     kw: "FREEGUIDE",  platform: "Facebook",  color: "#2875df" },
  { user: "@shopaholic",  kw: "DISCOUNT50", platform: "Instagram", color: "#d64b92" },
  { user: "Amit S.",      kw: "COACHING",   platform: "Facebook",  color: "#2875df" },
  { user: "@fitlife99",   kw: "WORKOUT",    platform: "Instagram", color: "#d64b92" },
];

function LiveTicker() {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => { setIdx(i => (i + 1) % LIVE_EVENTS.length); setShow(true); }, 350);
    }, 2600);
    return () => clearInterval(t);
  }, []);
  const ev = LIVE_EVENTS[idx];
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div key={idx}
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.3 }}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 7, height: 7, borderRadius: "50%", background: ev.color, boxShadow: `0 0 6px ${ev.color}`, flexShrink: 0 }}
          />
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
            <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{ev.user}</span>
            {" triggered "}
            <span style={{ color: "var(--violet-bright)", fontWeight: 700 }}>{ev.kw}</span>
            {" → DM sent"}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Hero floating card ───────────────────────────────── */
function FloatingCard({ children, style, delay = 0, amplitude = 8 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: [0, -amplitude, 0] }}
      transition={{
        opacity: { duration: 0.5, delay: 0.8 + delay },
        scale:   { duration: 0.5, delay: 0.8 + delay },
        y: { duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay: 0.8 + delay },
      }}
      style={{
        background: "rgba(13,17,23,0.93)",
        border: "1px solid var(--border-bright)",
        borderRadius: "var(--r-lg)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.12), inset 0 1px 0 rgba(255,255,255,0.04)",
        padding: "14px 18px",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Hero ─────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", padding: "100px 5% 60px",
      position: "relative", textAlign: "center",
    }}>
      <div style={{ maxWidth: 860, position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(124,58,237,0.12)",
            border: "1px solid rgba(124,58,237,0.3)",
            borderRadius: 20, padding: "6px 16px",
            fontSize: 13, color: "var(--violet-bright)",
            fontWeight: 500, marginBottom: 28,
          }}
        >
          <Zap size={13} /> Instagram & Facebook Automation Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{
            fontSize: "clamp(38px, 6vw, 72px)",
            fontWeight: 900, lineHeight: 1.08,
            letterSpacing: "-0.03em",
            marginBottom: 24,
          }}
        >
          Turn Every Interaction
          <br />
          <span style={{
            background: "var(--grad-brand)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Into an Opportunity.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "var(--text-secondary)", lineHeight: 1.7,
            maxWidth: 600, margin: "0 auto 40px",
          }}
        >
          Automatically reply to Instagram comments and Facebook messages with
          personalised DMs. Convert followers into leads — on autopilot.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link to="/signup">
            <motion.div whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(124,58,237,0.5)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "var(--grad-brand)", color: "white",
                padding: "14px 32px", borderRadius: "var(--r-lg)",
                fontSize: 16, fontWeight: 700,
                boxShadow: "0 4px 24px rgba(124,58,237,0.4)",
                display: "flex", alignItems: "center", gap: 8,
              }}>
              Start Free <ArrowRight size={16} />
            </motion.div>
          </Link>
          <a href="#how-it-works">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--border-bright)",
                color: "var(--text-primary)",
                padding: "14px 32px", borderRadius: "var(--r-lg)",
                fontSize: 16, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 8,
              }}>
              See How It Works <ChevronDown size={16} />
            </motion.div>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}
        >
          {["No credit card required", "Free plan available", "Setup in 2 minutes"].map(t => (
            <span key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-muted)" }}>
              <CheckCircle size={13} color="var(--green)" /> {t}
            </span>
          ))}
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ marginTop: 64, position: "relative" }}
        >
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-bright)",
            borderRadius: "var(--r-2xl)",
            padding: 24,
            boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,58,237,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
            textAlign: "left",
          }}>
            {/* Mock topbar */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              {["#ef4444","#f59e0b","#10b981"].map(c => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
              ))}
              <div style={{
                flex: 1, height: 28, background: "var(--bg-elevated)",
                borderRadius: "var(--r-sm)", marginLeft: 8,
                display: "flex", alignItems: "center", paddingLeft: 12,
                fontSize: 12, color: "var(--text-muted)",
              }}>
                app.socialpilot.io/dashboard
              </div>
            </div>

            {/* Mock stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
              {[
                { label: "Automations", val: "24", color: "#7c3aed" },
                { label: "Leads", val: "1,284", color: "#10b981" },
                { label: "Messages", val: "8,492", color: "#3b82f6" },
                { label: "Active", val: "18", color: "#f59e0b" },
              ].map(s => (
                <div key={s.label} style={{
                  background: "var(--bg-elevated)", borderRadius: "var(--r-md)",
                  padding: "14px 16px", border: "1px solid var(--border)",
                }}>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* Mock automation rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { kw: "GATE2027", platform: "Instagram", trigger: "Comment", count: 142 },
                { kw: "FREEGUIDE", platform: "Facebook", trigger: "Message", count: 89 },
                { kw: "DISCOUNT50", platform: "Instagram", trigger: "Comment", count: 234 },
              ].map(r => (
                <div key={r.kw} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "var(--bg-elevated)", borderRadius: "var(--r-md)",
                  padding: "12px 16px", border: "1px solid var(--border)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                      background: r.platform === "Instagram" ? "rgba(214,75,146,0.15)" : "rgba(40,117,223,0.15)",
                      color: r.platform === "Instagram" ? "#d64b92" : "#2875df",
                    }}>{r.platform}</div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{r.kw}</span>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{r.trigger}</span>
                  </div>
                  <span style={{ fontSize: 13, color: "var(--green)", fontWeight: 600 }}>{r.count} triggered</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating cards */}
          <FloatingCard style={{
            position: "absolute", top: -20, right: -30,
            minWidth: 200,
            animationDelay: "0s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(214,75,146,0.2)", display: "grid", placeItems: "center" }}>
                <Camera size={14} color="#d64b92" />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>New Comment</span>
            </div>
            <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>@user123: "GATE2027 🔥"</p>
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)" }} />
              <span style={{ fontSize: 11, color: "var(--green)" }}>Auto-reply sent</span>
            </div>
          </FloatingCard>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{
              position: "absolute", bottom: 20, left: -30,
              background: "rgba(19,28,46,0.9)",
              border: "1px solid var(--border-bright)",
              borderRadius: "var(--r-lg)",
              backdropFilter: "blur(16px)",
              padding: "12px 16px", minWidth: 180,
            }}
          >
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>Leads captured today</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "var(--green)" }}>+47</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>↑ 23% vs yesterday</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export { Orbs, Navbar, Hero };
