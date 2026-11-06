import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import {
  Camera, MessageCircle, Zap, ArrowLeft, CheckCircle,
  AlertCircle, Eye, Hash, Type, Link2,
} from "lucide-react";
import GlassCard from "../components/GlassCard";
import PageTransition from "../components/PageTransition";
import { useToast } from "../components/Toast";

const TRIGGERS = {
  Instagram: [
    { value: "comment", label: "Someone comments on a post", icon: "💬" },
    { value: "message", label: "Someone sends a direct message", icon: "✉️" },
  ],
  Facebook: [
    { value: "page_comment", label: "Someone comments on a Page post", icon: "💬" },
    { value: "page_message", label: "Someone sends a Page message", icon: "✉️" },
  ],
};

const STEPS = [
  { num: 1, label: "Platform" },
  { num: 2, label: "Trigger" },
  { num: 3, label: "Keyword" },
  { num: 4, label: "Reply" },
];

export default function CreateAutomation() {
  const navigate = useNavigate();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [platform, setPlatform] = useState("Instagram");
  const [trigger, setTrigger] = useState("comment");
  const [keyword, setKeyword] = useState("");
  const [reply, setReply] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function handlePlatformChange(val) {
    setPlatform(val);
    setTrigger(TRIGGERS[val][0].value);
    setError("");
  }

  function handleSave(e) {
    e.preventDefault();
    setError("");
    if (!keyword.trim()) { setError("Please enter a trigger keyword."); return; }
    if (!reply.trim()) { setError("Please enter a reply message."); return; }

    const rule = {
      id: Date.now(),
      platform, trigger,
      triggerLabel: TRIGGERS[platform].find(t => t.value === trigger)?.label,
      keyword: keyword.trim(),
      reply: reply.trim(),
      link: link.trim(),
      createdAt: new Date().toLocaleDateString(),
    };

    const existing = JSON.parse(localStorage.getItem("automations") || "[]");
    localStorage.setItem("automations", JSON.stringify([...existing, rule]));
    setSaved(true);
    toast("Automation saved successfully!", "success");
  }

  const pc = platform === "Instagram"
    ? { color: "#d64b92", bg: "rgba(214,75,146,0.12)", border: "rgba(214,75,146,0.25)" }
    : { color: "#2875df", bg: "rgba(40,117,223,0.12)", border: "rgba(40,117,223,0.25)" };

  return (
    <PageTransition>
      <Link to="/automations" style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        color: "var(--text-secondary)", fontSize: 14, marginBottom: 24,
        transition: "color 0.2s",
      }}
        onMouseEnter={e => e.currentTarget.style.color = "var(--violet-bright)"}
        onMouseLeave={e => e.currentTarget.style.color = "var(--text-secondary)"}
      >
        <ArrowLeft size={16} /> Back to Automations
      </Link>

      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        {/* Step indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 36 }}>
          {STEPS.map((s, i) => (
            <div key={s.num} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <motion.div
                  animate={{
                    background: step > s.num ? "var(--green)" : step === s.num ? "var(--grad-brand)" : "var(--bg-elevated)",
                    borderColor: step >= s.num ? "transparent" : "var(--border)",
                  }}
                  style={{
                    width: 32, height: 32, borderRadius: "50%",
                    display: "grid", placeItems: "center",
                    border: "1px solid var(--border)",
                    fontSize: 13, fontWeight: 700,
                    color: step >= s.num ? "white" : "var(--text-muted)",
                  }}
                >
                  {step > s.num ? <CheckCircle size={16} /> : s.num}
                </motion.div>
                <span style={{ fontSize: 11, color: step >= s.num ? "var(--text-secondary)" : "var(--text-dim)", whiteSpace: "nowrap" }}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{
                  flex: 1, height: 1, margin: "0 8px", marginBottom: 20,
                  background: step > s.num ? "var(--violet)" : "var(--border)",
                  transition: "background 0.3s",
                }} />
              )}
            </div>
          ))}
        </div>

        {saved ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <GlassCard glow style={{ padding: 48, textAlign: "center" }}>
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "var(--green-bg)", border: "1px solid rgba(16,185,129,0.3)",
                  display: "grid", placeItems: "center", margin: "0 auto 20px",
                }}
              >
                <CheckCircle size={32} color="var(--green)" />
              </motion.div>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Automation Saved!</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 8 }}>
                {platform} · {TRIGGERS[platform].find(t => t.value === trigger)?.label}
              </p>
              <p style={{ color: "var(--violet-bright)", fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
                Keyword: {keyword}
              </p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 32, maxWidth: 400, margin: "0 auto 32px" }}>
                This rule is saved in your browser. Connect your social account to activate real automation.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/automations")}
                  style={{
                    background: "var(--grad-brand)", color: "white",
                    padding: "11px 24px", borderRadius: "var(--r-md)",
                    border: "none", fontSize: 14, fontWeight: 700,
                    boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
                  }}>
                  View All Automations
                </motion.button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => { setSaved(false); setKeyword(""); setReply(""); setLink(""); setStep(1); }}
                  style={{
                    background: "rgba(124,58,237,0.12)", color: "var(--violet-bright)",
                    padding: "11px 24px", borderRadius: "var(--r-md)",
                    border: "1px solid rgba(124,58,237,0.3)", fontSize: 14, fontWeight: 600,
                  }}>
                  Create Another
                </motion.button>
              </div>
            </GlassCard>
          </motion.div>
        ) : (
          <form onSubmit={handleSave}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, alignItems: "start" }}>
              {/* Main form */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Step 1: Platform */}
                <GlassCard style={{ padding: 24 }}>
                  <StepHeader num={1} label="Select Platform" active={step >= 1} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
                    {[
                      { val: "Instagram", icon: Camera, color: "#d64b92", bg: "rgba(214,75,146,0.12)", sub: "Professional account" },
                      { val: "Facebook", icon: MessageCircle, color: "#2875df", bg: "rgba(40,117,223,0.12)", sub: "Facebook Page" },
                    ].map(p => (
                      <motion.button
                        key={p.val} type="button"
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => { handlePlatformChange(p.val); setStep(s => Math.max(s, 2)); }}
                        style={{
                          display: "flex", flexDirection: "column", alignItems: "flex-start",
                          gap: 8, padding: 18, borderRadius: "var(--r-lg)",
                          background: platform === p.val ? p.bg : "var(--bg-elevated)",
                          border: platform === p.val ? `2px solid ${p.color}` : "1px solid var(--border)",
                          cursor: "pointer", transition: "all 0.2s",
                        }}
                      >
                        <div style={{ width: 36, height: 36, borderRadius: "var(--r-sm)", background: p.bg, display: "grid", placeItems: "center" }}>
                          <p.icon size={18} color={p.color} />
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: platform === p.val ? p.color : "var(--text-primary)" }}>{p.val}</span>
                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{p.sub}</span>
                      </motion.button>
                    ))}
                  </div>
                </GlassCard>

                {/* Step 2: Trigger */}
                <GlassCard style={{ padding: 24, opacity: step >= 2 ? 1 : 0.5 }}>
                  <StepHeader num={2} label="Choose Trigger" active={step >= 2} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
                    {TRIGGERS[platform].map(t => (
                      <motion.button
                        key={t.value} type="button"
                        whileHover={{ x: 4 }}
                        onClick={() => { setTrigger(t.value); setStep(s => Math.max(s, 3)); }}
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "14px 16px", borderRadius: "var(--r-md)",
                          background: trigger === t.value ? "rgba(124,58,237,0.12)" : "var(--bg-elevated)",
                          border: trigger === t.value ? "1px solid rgba(124,58,237,0.35)" : "1px solid var(--border)",
                          cursor: "pointer", textAlign: "left",
                        }}
                      >
                        <span style={{ fontSize: 20 }}>{t.icon}</span>
                        <span style={{ fontSize: 14, color: trigger === t.value ? "var(--violet-bright)" : "var(--text-secondary)", fontWeight: trigger === t.value ? 600 : 400 }}>
                          {t.label}
                        </span>
                        {trigger === t.value && <CheckCircle size={15} color="var(--violet-bright)" style={{ marginLeft: "auto" }} />}
                      </motion.button>
                    ))}
                  </div>
                </GlassCard>

                {/* Step 3: Keyword */}
                <GlassCard style={{ padding: 24, opacity: step >= 3 ? 1 : 0.5 }}>
                  <StepHeader num={3} label="Set Keyword" active={step >= 3} />
                  <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6, marginBottom: 14 }}>
                    When someone uses this word, the automation triggers.
                  </p>
                  <div style={{ position: "relative" }}>
                    <Hash size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                    <input
                      type="text" placeholder="e.g. GATE2027"
                      value={keyword}
                      onChange={e => { setKeyword(e.target.value); setStep(s => Math.max(s, 4)); setError(""); }}
                      style={{
                        width: "100%", padding: "12px 12px 12px 36px",
                        background: "var(--bg-elevated)", border: "1px solid var(--border)",
                        borderRadius: "var(--r-md)", color: "var(--text-primary)",
                        fontSize: 15, fontWeight: 600, outline: "none",
                        letterSpacing: "0.05em",
                      }}
                      onFocus={e => e.target.style.borderColor = "var(--border-bright)"}
                      onBlur={e => e.target.style.borderColor = "var(--border)"}
                    />
                  </div>
                </GlassCard>

                {/* Step 4: Reply */}
                <GlassCard style={{ padding: 24, opacity: step >= 4 ? 1 : 0.5 }}>
                  <StepHeader num={4} label="Configure Reply" active={step >= 4} />
                  <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 14 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 8 }}>
                        Reply message *
                      </label>
                      <textarea
                        rows={4} placeholder="Hi! Thanks for your interest. Here's your link 👇"
                        value={reply}
                        onChange={e => { setReply(e.target.value); setError(""); }}
                        style={{
                          width: "100%", padding: 13,
                          background: "var(--bg-elevated)", border: "1px solid var(--border)",
                          borderRadius: "var(--r-md)", color: "var(--text-primary)",
                          fontSize: 14, outline: "none", resize: "vertical",
                        }}
                        onFocus={e => e.target.style.borderColor = "var(--border-bright)"}
                        onBlur={e => e.target.style.borderColor = "var(--border)"}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 8 }}>
                        Link to share (optional)
                      </label>
                      <div style={{ position: "relative" }}>
                        <Link2 size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                        <input
                          type="url" placeholder="https://example.com/resource"
                          value={link}
                          onChange={e => setLink(e.target.value)}
                          style={{
                            width: "100%", padding: "11px 12px 11px 34px",
                            background: "var(--bg-elevated)", border: "1px solid var(--border)",
                            borderRadius: "var(--r-md)", color: "var(--text-primary)",
                            fontSize: 14, outline: "none",
                          }}
                          onFocus={e => e.target.style.borderColor = "var(--border-bright)"}
                          onBlur={e => e.target.style.borderColor = "var(--border)"}
                        />
                      </div>
                    </div>
                  </div>
                </GlassCard>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      style={{
                        display: "flex", alignItems: "center", gap: 10,
                        background: "var(--red-bg)", border: "1px solid rgba(239,68,68,0.3)",
                        borderRadius: "var(--r-md)", padding: "12px 16px",
                        fontSize: 14, color: "var(--red)",
                      }}>
                      <AlertCircle size={16} /> {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actions */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                  <Link to="/automations" style={{
                    padding: "11px 20px", borderRadius: "var(--r-md)",
                    fontSize: 14, color: "var(--text-secondary)",
                    border: "1px solid var(--border)", background: "none",
                  }}>Cancel</Link>
                  <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      background: "var(--grad-brand)", color: "white",
                      padding: "11px 24px", borderRadius: "var(--r-md)",
                      border: "none", fontSize: 14, fontWeight: 700,
                      boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
                    }}>
                    <Zap size={15} /> Save Automation
                  </motion.button>
                </div>
              </div>

              {/* Preview panel */}
              <div style={{ position: "sticky", top: 80 }}>
                <GlassCard glow style={{ padding: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <Eye size={15} color="var(--violet-bright)" />
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--violet-bright)" }}>Live Preview</span>
                  </div>

                  {/* Trigger event */}
                  <div style={{
                    background: "var(--bg-elevated)", borderRadius: "var(--r-md)",
                    padding: "12px 14px", marginBottom: 10,
                    border: "1px solid var(--border)",
                  }}>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>Trigger event</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: pc.bg, display: "grid", placeItems: "center" }}>
                        {platform === "Instagram" ? <Camera size={13} color={pc.color} /> : <MessageCircle size={13} color={pc.color} />}
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>@user123</div>
                        <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                          "{keyword || "KEYWORD"}" 🔥
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div style={{ textAlign: "center", fontSize: 18, marginBottom: 10, color: "var(--violet-bright)" }}>↓</div>

                  {/* Auto reply */}
                  <div style={{
                    background: "rgba(124,58,237,0.1)", borderRadius: "var(--r-md)",
                    padding: "12px 14px", border: "1px solid rgba(124,58,237,0.2)",
                  }}>
                    <div style={{ fontSize: 11, color: "var(--violet-bright)", marginBottom: 6, fontWeight: 600 }}>Auto-reply DM</div>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      {reply || "Your reply message will appear here…"}
                    </p>
                    {link && (
                      <div style={{
                        marginTop: 8, padding: "6px 10px",
                        background: "rgba(124,58,237,0.12)", borderRadius: "var(--r-sm)",
                        fontSize: 12, color: "var(--violet-bright)",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>{link}</div>
                    )}
                  </div>

                  <div style={{
                    marginTop: 14, padding: "8px 12px",
                    background: "var(--green-bg)", borderRadius: "var(--r-sm)",
                    fontSize: 11, color: "var(--green)", fontWeight: 600,
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <CheckCircle size={12} /> Sent instantly · Demo only
                  </div>
                </GlassCard>
              </div>
            </div>
          </form>
        )}
      </div>
    </PageTransition>
  );
}

function StepHeader({ num, label, active }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 26, height: 26, borderRadius: "50%",
        background: active ? "var(--grad-brand)" : "var(--bg-elevated)",
        border: active ? "none" : "1px solid var(--border)",
        display: "grid", placeItems: "center",
        fontSize: 12, fontWeight: 700, color: active ? "white" : "var(--text-muted)",
        flexShrink: 0,
      }}>{num}</div>
      <span style={{ fontSize: 15, fontWeight: 700, color: active ? "var(--text-primary)" : "var(--text-muted)" }}>{label}</span>
    </div>
  );
}
