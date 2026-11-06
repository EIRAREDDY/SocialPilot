import { useState } from "react";
import { motion } from "motion/react";
import { Users, Search, Camera, MessageCircle, Mail, ExternalLink } from "lucide-react";
import GlassCard from "../components/GlassCard";
import PageTransition from "../components/PageTransition";

const SAMPLE_LEADS = [
  { id: 1, name: "@rahul_prep",    platform: "Instagram", trigger: "GATE2027",   status: "New",       time: "2m ago",  email: "" },
  { id: 2, name: "Priya Mehta",    platform: "Facebook",  trigger: "FREEGUIDE",  status: "Contacted", time: "18m ago", email: "priya@example.com" },
  { id: 3, name: "@shopaholic99",  platform: "Instagram", trigger: "DISCOUNT50", status: "New",       time: "34m ago", email: "" },
  { id: 4, name: "Amit Sharma",    platform: "Facebook",  trigger: "FREEGUIDE",  status: "Converted", time: "1h ago",  email: "amit@example.com" },
  { id: 5, name: "@exam_warrior",  platform: "Instagram", trigger: "GATE2027",   status: "New",       time: "1h ago",  email: "" },
  { id: 6, name: "Sneha Kapoor",   platform: "Facebook",  trigger: "FREEGUIDE",  status: "Contacted", time: "2h ago",  email: "sneha@example.com" },
  { id: 7, name: "@fitness_daily", platform: "Instagram", trigger: "DISCOUNT50", status: "New",       time: "3h ago",  email: "" },
  { id: 8, name: "Rohan Verma",    platform: "Facebook",  trigger: "GATE2027",   status: "Converted", time: "5h ago",  email: "rohan@example.com" },
];

const STATUS_STYLE = {
  New:       { bg: "rgba(59,130,246,0.12)", color: "#3b82f6", border: "rgba(59,130,246,0.25)" },
  Contacted: { bg: "var(--amber-bg)",       color: "var(--amber)", border: "rgba(245,158,11,0.25)" },
  Converted: { bg: "var(--green-bg)",       color: "var(--green)", border: "rgba(16,185,129,0.25)" },
};

export default function Leads() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = SAMPLE_LEADS.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.trigger.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || l.platform === filter || l.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <PageTransition>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 14 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 5 }}>Leads</h2>
          <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
            {SAMPLE_LEADS.length} leads captured ·
            <span style={{ marginLeft: 6, fontSize: 12, color: "var(--amber)", background: "var(--amber-bg)", padding: "2px 8px", borderRadius: 10, border: "1px solid rgba(245,158,11,0.2)" }}>
              Sample data
            </span>
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total Leads", val: SAMPLE_LEADS.length, color: "var(--violet)" },
          { label: "New", val: SAMPLE_LEADS.filter(l => l.status === "New").length, color: "var(--blue-accent)" },
          { label: "Converted", val: SAMPLE_LEADS.filter(l => l.status === "Converted").length, color: "var(--green)" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <GlassCard style={{ padding: "18px 22px" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4 }}>{s.label}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Filters + Search */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search leads…"
            style={{
              width: "100%", padding: "9px 12px 9px 34px",
              background: "var(--bg-card)", border: "1px solid var(--border)",
              borderRadius: "var(--r-md)", color: "var(--text-primary)", fontSize: 14, outline: "none",
            }}
            onFocus={e => e.target.style.borderColor = "var(--border-bright)"}
            onBlur={e => e.target.style.borderColor = "var(--border)"}
          />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["All", "Instagram", "Facebook", "New", "Converted"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                padding: "8px 14px", borderRadius: "var(--r-md)", fontSize: 13, fontWeight: 500,
                background: filter === f ? "rgba(124,58,237,0.15)" : "var(--bg-card)",
                border: filter === f ? "1px solid rgba(124,58,237,0.35)" : "1px solid var(--border)",
                color: filter === f ? "var(--violet-bright)" : "var(--text-secondary)",
                cursor: "pointer",
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <GlassCard style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Lead", "Platform", "Keyword", "Status", "Time", ""].map(h => (
                  <th key={h} style={{
                    padding: "12px 18px", textAlign: "left",
                    fontSize: 11, fontWeight: 700, color: "var(--text-muted)",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, i) => {
                const ss = STATUS_STYLE[lead.status];
                const isIG = lead.platform === "Instagram";
                return (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    style={{ borderBottom: "1px solid var(--border)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(124,58,237,0.04)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 34, height: 34, borderRadius: "50%",
                          background: "var(--grad-brand)", display: "grid", placeItems: "center",
                          fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0,
                        }}>{lead.name[0].toUpperCase()}</div>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{lead.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                        background: isIG ? "rgba(214,75,146,0.12)" : "rgba(40,117,223,0.12)",
                        color: isIG ? "#d64b92" : "#2875df",
                      }}>
                        {isIG ? <Camera size={11} /> : <MessageCircle size={11} />}
                        {lead.platform}
                      </span>
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <code style={{
                        fontSize: 12, fontWeight: 700, padding: "3px 8px",
                        background: "rgba(124,58,237,0.1)", borderRadius: "var(--r-sm)",
                        color: "var(--violet-bright)",
                      }}>{lead.trigger}</code>
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <span style={{
                        padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                        background: ss.bg, color: ss.color, border: `1px solid ${ss.border}`,
                      }}>{lead.status}</span>
                    </td>
                    <td style={{ padding: "14px 18px", fontSize: 13, color: "var(--text-muted)" }}>{lead.time}</td>
                    <td style={{ padding: "14px 18px" }}>
                      {lead.email && (
                        <a href={`mailto:${lead.email}`} style={{ color: "var(--text-muted)" }}>
                          <Mail size={15} />
                        </a>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted)", fontSize: 14 }}>
              No leads match your search.
            </div>
          )}
        </div>
      </GlassCard>
    </PageTransition>
  );
}
