import { motion } from "motion/react";
import { Camera, Zap, Users, MessageCircle, AlertCircle, ExternalLink } from "lucide-react";
import GlassCard from "../components/GlassCard";
import PageTransition from "../components/PageTransition";
import { Link } from "react-router-dom";

export default function Instagram() {
  return (
    <PageTransition>
      <div style={{ maxWidth: 800 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <div style={{
            width: 56, height: 56, borderRadius: "var(--r-xl)",
            background: "rgba(214,75,146,0.15)", border: "1px solid rgba(214,75,146,0.3)",
            display: "grid", placeItems: "center",
          }}>
            <Camera size={26} color="#d64b92" />
          </div>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800 }}>Instagram</h2>
            <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>Professional account automation</p>
          </div>
        </div>

        {/* Connection status */}
        <GlassCard style={{ padding: 24, marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <AlertCircle size={20} color="var(--amber)" />
              <div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>Not Connected</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Connect your Instagram Professional account to activate automations.</div>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "rgba(214,75,146,0.15)", color: "#d64b92",
                border: "1px solid rgba(214,75,146,0.3)",
                padding: "10px 20px", borderRadius: "var(--r-md)",
                fontSize: 14, fontWeight: 600, cursor: "pointer",
              }}>
              <Camera size={15} /> Connect Instagram
            </motion.button>
          </div>
        </GlassCard>

        {/* Info cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Automations", val: "—", icon: Zap, color: "var(--violet)" },
            { label: "Leads from IG", val: "—", icon: Users, color: "var(--green)" },
            { label: "DMs Sent", val: "—", icon: MessageCircle, color: "var(--blue-accent)" },
          ].map(s => (
            <GlassCard key={s.label} style={{ padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <s.icon size={16} color={s.color} />
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{s.label}</span>
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "var(--text-muted)" }}>{s.val}</div>
            </GlassCard>
          ))}
        </div>

        {/* What's supported */}
        <GlassCard style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Supported Triggers</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "💬", title: "Comment Trigger", desc: "When someone comments a keyword on your post, send them an automatic DM." },
              { icon: "✉️", title: "Direct Message Trigger", desc: "When someone sends you a DM containing a keyword, reply automatically." },
            ].map(t => (
              <div key={t.title} style={{
                display: "flex", gap: 14, padding: "14px 16px",
                background: "var(--bg-elevated)", borderRadius: "var(--r-md)",
                border: "1px solid var(--border)",
              }}>
                <span style={{ fontSize: 22 }}>{t.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t.title}</div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: "12px 16px", background: "var(--amber-bg)", borderRadius: "var(--r-md)", border: "1px solid rgba(245,158,11,0.2)", fontSize: 13, color: "var(--amber)" }}>
            ⚠️ Real Instagram automation requires a Professional account and Meta API approval. This is a frontend prototype.
          </div>
          <Link to="/create-automation" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16 }}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "var(--grad-brand)", color: "white",
                padding: "10px 20px", borderRadius: "var(--r-md)",
                fontSize: 14, fontWeight: 700,
                boxShadow: "0 4px 16px rgba(124,58,237,0.3)",
              }}>
              <Zap size={14} /> Create Instagram Automation
            </motion.div>
          </Link>
        </GlassCard>
      </div>
    </PageTransition>
  );
}
