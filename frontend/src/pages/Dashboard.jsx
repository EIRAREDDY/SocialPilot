import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Workflow, Users, MessageCircle, Zap, Camera,
  Plus, ArrowRight, TrendingUp, Clock, CheckCircle,
} from "lucide-react";
import StatCard from "../components/StatCard";
import GlassCard from "../components/GlassCard";
import PageTransition from "../components/PageTransition";

const CHART_DATA = [
  { day: "Mon", triggers: 42, leads: 18 },
  { day: "Tue", triggers: 78, leads: 31 },
  { day: "Wed", triggers: 55, leads: 22 },
  { day: "Thu", triggers: 120, leads: 48 },
  { day: "Fri", triggers: 95, leads: 39 },
  { day: "Sat", triggers: 140, leads: 62 },
  { day: "Sun", triggers: 88, leads: 35 },
];

const ACTIVITY = [
  { id: 1, platform: "Instagram", keyword: "GATE2027", action: "Comment trigger → DM sent", user: "@rahul_prep", time: "2m ago", color: "#d64b92" },
  { id: 2, platform: "Facebook",  keyword: "FREEGUIDE", action: "Message trigger → Reply sent", user: "Priya M.", time: "8m ago", color: "#2875df" },
  { id: 3, platform: "Instagram", keyword: "DISCOUNT50", action: "Comment trigger → DM sent", user: "@shopaholic99", time: "15m ago", color: "#d64b92" },
  { id: 4, platform: "Instagram", keyword: "GATE2027", action: "Comment trigger → DM sent", user: "@exam_warrior", time: "22m ago", color: "#d64b92" },
  { id: 5, platform: "Facebook",  keyword: "FREEGUIDE", action: "Message trigger → Reply sent", user: "Amit S.", time: "31m ago", color: "#2875df" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--bg-elevated)", border: "1px solid var(--border-bright)",
      borderRadius: "var(--r-md)", padding: "10px 14px",
      boxShadow: "var(--shadow-lg)", fontSize: 13,
    }}>
      <p style={{ color: "var(--text-muted)", marginBottom: 6 }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color, fontWeight: 600 }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const automations = JSON.parse(localStorage.getItem("automations") || "[]");

  return (
    <PageTransition>
      {/* Welcome */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Welcome back! 👋</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
            Here's what's happening with your automations today.
            <span style={{ marginLeft: 8, fontSize: 12, color: "var(--amber)", background: "var(--amber-bg)", padding: "2px 8px", borderRadius: 10, border: "1px solid rgba(245,158,11,0.2)" }}>
              Demo data
            </span>
          </p>
        </div>
        <Link to="/create-automation">
          <motion.div whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(124,58,237,0.4)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--grad-brand)", color: "white",
              padding: "11px 22px", borderRadius: "var(--r-lg)",
              fontSize: 14, fontWeight: 700,
              boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
            }}>
            <Plus size={16} /> New Automation
          </motion.div>
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
        <StatCard label="Total Automations" value={automations.length || 24} icon={Workflow} trend={12} trendLabel="vs last week" color="var(--violet)" index={0} />
        <StatCard label="Leads Captured" value={1284} icon={Users} trend={23} trendLabel="vs last week" color="var(--green)" index={1} />
        <StatCard label="Messages Sent" value={8492} icon={MessageCircle} trend={8} trendLabel="vs last week" color="var(--blue-accent)" index={2} />
        <StatCard label="Active Rules" value={automations.length || 18} icon={Zap} trend={5} trendLabel="vs last week" color="var(--amber)" index={3} />
      </div>

      {/* Chart + Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20, marginBottom: 24 }}>
        {/* Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <GlassCard style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700 }}>Automation Performance</h3>
                <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 3 }}>Last 7 days · Demo data</p>
              </div>
              <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-secondary)" }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: "#7c3aed", display: "inline-block" }} /> Triggers
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-secondary)" }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: "#10b981", display: "inline-block" }} /> Leads
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={CHART_DATA} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="gTriggers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fill: "#475569", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#475569", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="triggers" stroke="#7c3aed" strokeWidth={2} fill="url(#gTriggers)" name="Triggers" />
                <Area type="monotone" dataKey="leads" stroke="#10b981" strokeWidth={2} fill="url(#gLeads)" name="Leads" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <GlassCard style={{ padding: 22, height: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>Recent Activity</h3>
              <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Demo data</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {ACTIVITY.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.06 }}
                  style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: "var(--r-sm)", flexShrink: 0,
                    background: `${a.color}18`, border: `1px solid ${a.color}33`,
                    display: "grid", placeItems: "center",
                  }}>
                    {a.platform === "Instagram" ? <Camera size={13} color={a.color} /> : <MessageCircle size={13} color={a.color} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>
                      {a.user}
                    </p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {a.action}
                    </p>
                  </div>
                  <span style={{ fontSize: 11, color: "var(--text-dim)", flexShrink: 0 }}>{a.time}</span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Channels + Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Channels */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <GlassCard style={{ padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Connected Channels</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { name: "Instagram", desc: "Professional account", icon: Camera, color: "#d64b92", bg: "rgba(214,75,146,0.12)" },
                { name: "Facebook", desc: "Facebook Page", icon: MessageCircle, color: "#2875df", bg: "rgba(40,117,223,0.12)" },
              ].map(ch => (
                <div key={ch.name} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 16px", borderRadius: "var(--r-md)",
                  background: "var(--bg-elevated)", border: "1px solid var(--border)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "var(--r-sm)", background: ch.bg, display: "grid", placeItems: "center" }}>
                      <ch.icon size={18} color={ch.color} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{ch.name}</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{ch.desc}</div>
                    </div>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
                    background: "var(--amber-bg)", color: "var(--amber)",
                    border: "1px solid rgba(245,158,11,0.2)",
                  }}>Not connected</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
          <GlassCard style={{ padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Quick Actions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Create New Automation", icon: Plus, to: "/create-automation", primary: true },
                { label: "View All Automations", icon: Workflow, to: "/automations", primary: false },
                { label: "Browse Leads", icon: Users, to: "/leads", primary: false },
                { label: "Open Conversations", icon: MessageCircle, to: "/conversations", primary: false },
              ].map(action => (
                <Link key={action.label} to={action.to}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "12px 16px", borderRadius: "var(--r-md)",
                      background: action.primary ? "rgba(124,58,237,0.12)" : "var(--bg-elevated)",
                      border: action.primary ? "1px solid rgba(124,58,237,0.25)" : "1px solid var(--border)",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <action.icon size={15} color={action.primary ? "var(--violet-bright)" : "var(--text-secondary)"} />
                      <span style={{ fontSize: 14, fontWeight: 500, color: action.primary ? "var(--violet-bright)" : "var(--text-secondary)" }}>
                        {action.label}
                      </span>
                    </div>
                    <ArrowRight size={14} color="var(--text-dim)" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </PageTransition>
  );
}
