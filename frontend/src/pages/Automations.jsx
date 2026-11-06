import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  Workflow, Trash2, Plus, Camera, MessageCircle,
  Zap, Search, Filter,
} from "lucide-react";
import GlassCard from "../components/GlassCard";
import PageTransition from "../components/PageTransition";
import { useToast } from "../components/Toast";

const PLATFORM_COLORS = {
  Instagram: { color: "#d64b92", bg: "rgba(214,75,146,0.12)", border: "rgba(214,75,146,0.25)" },
  Facebook:  { color: "#2875df", bg: "rgba(40,117,223,0.12)",  border: "rgba(40,117,223,0.25)" },
};

export default function Automations() {
  const toast = useToast();
  const [automations, setAutomations] = useState(() =>
    JSON.parse(localStorage.getItem("automations") || "[]")
  );
  const [search, setSearch] = useState("");

  function deleteAutomation(id) {
    const updated = automations.filter(a => a.id !== id);
    setAutomations(updated);
    localStorage.setItem("automations", JSON.stringify(updated));
    toast("Automation deleted.", "info");
  }

  const filtered = automations.filter(a =>
    a.keyword.toLowerCase().includes(search.toLowerCase()) ||
    a.platform.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageTransition>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 14 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 5 }}>Automations</h2>
          <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
            {automations.length} rule{automations.length !== 1 ? "s" : ""} configured
          </p>
        </div>
        <Link to="/create-automation">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--grad-brand)", color: "white",
              padding: "10px 20px", borderRadius: "var(--r-lg)",
              fontSize: 14, fontWeight: 700,
              boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
            }}>
            <Plus size={15} /> New Automation
          </motion.div>
        </Link>
      </div>

      {/* Search */}
      {automations.length > 0 && (
        <div style={{ position: "relative", marginBottom: 20, maxWidth: 360 }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by keyword or platform…"
            style={{
              width: "100%", padding: "10px 12px 10px 36px",
              background: "var(--bg-card)", border: "1px solid var(--border)",
              borderRadius: "var(--r-md)", color: "var(--text-primary)",
              fontSize: 14, outline: "none",
            }}
            onFocus={e => e.target.style.borderColor = "var(--border-bright)"}
            onBlur={e => e.target.style.borderColor = "var(--border)"}
          />
        </div>
      )}

      {/* Empty state */}
      {automations.length === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard style={{ padding: "60px 40px", textAlign: "center" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "var(--r-xl)",
              background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)",
              display: "grid", placeItems: "center", margin: "0 auto 20px",
            }}>
              <Workflow size={28} color="var(--violet-bright)" />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>No automations yet</h3>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 28, maxWidth: 340, margin: "0 auto 28px" }}>
              Create your first automation to start capturing leads from Instagram and Facebook.
            </p>
            <Link to="/create-automation">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "var(--grad-brand)", color: "white",
                  padding: "12px 28px", borderRadius: "var(--r-lg)",
                  fontSize: 14, fontWeight: 700,
                  boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
                }}>
                <Plus size={15} /> Create First Automation
              </motion.div>
            </Link>
          </GlassCard>
        </motion.div>
      )}

      {/* Rules list */}
      <AnimatePresence>
        {filtered.map((rule, i) => {
          const pc = PLATFORM_COLORS[rule.platform] || PLATFORM_COLORS.Instagram;
          return (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              style={{ marginBottom: 12 }}
            >
              <GlassCard hover style={{ padding: "18px 22px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14, flex: 1, minWidth: 0 }}>
                    {/* Platform badge */}
                    <div style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "5px 12px", borderRadius: 20, flexShrink: 0,
                      background: pc.bg, border: `1px solid ${pc.border}`,
                      fontSize: 12, fontWeight: 600, color: pc.color,
                    }}>
                      {rule.platform === "Instagram" ? <Camera size={12} /> : <MessageCircle size={12} />}
                      {rule.platform}
                    </div>

                    {/* Details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{rule.keyword}</span>
                        <span style={{
                          fontSize: 11, padding: "2px 8px", borderRadius: 20,
                          background: "var(--green-bg)", color: "var(--green)",
                          border: "1px solid rgba(16,185,129,0.2)", fontWeight: 600,
                        }}>Active</span>
                      </div>
                      <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>{rule.triggerLabel}</p>
                      <p style={{
                        fontSize: 13, color: "var(--text-secondary)",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        maxWidth: 480,
                      }}>{rule.reply}</p>
                      {rule.link && (
                        <a href={rule.link} target="_blank" rel="noreferrer" style={{
                          fontSize: 12, color: "var(--violet-bright)",
                          overflow: "hidden", textOverflow: "ellipsis",
                          whiteSpace: "nowrap", display: "block", maxWidth: 480, marginTop: 4,
                        }}>{rule.link}</a>
                      )}
                    </div>
                  </div>

                  {/* Right */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, flexShrink: 0 }}>
                    <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{rule.createdAt}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      onClick={() => deleteAutomation(rule.id)}
                      style={{
                        width: 32, height: 32, borderRadius: "var(--r-sm)",
                        background: "var(--red-bg)", border: "1px solid rgba(239,68,68,0.25)",
                        display: "grid", placeItems: "center", color: "var(--red)",
                      }}
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {search && filtered.length === 0 && automations.length > 0 && (
        <p style={{ textAlign: "center", color: "var(--text-muted)", padding: 40 }}>
          No automations match "{search}"
        </p>
      )}
    </PageTransition>
  );
}
