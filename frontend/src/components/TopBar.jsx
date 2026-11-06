import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, Search, X, CheckCircle, Zap, Users } from "lucide-react";

const SAMPLE_NOTIFS = [
  { id: 1, icon: <Zap size={14} />, text: "Automation 'GATE2027' triggered 12 times today", time: "2m ago", unread: true },
  { id: 2, icon: <Users size={14} />, text: "3 new leads captured from Instagram", time: "1h ago", unread: true },
  { id: 3, icon: <CheckCircle size={14} />, text: "Automation saved successfully", time: "3h ago", unread: false },
];

export default function TopBar({ title, subtitle }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState(SAMPLE_NOTIFS);
  const unreadCount = notifs.filter(n => n.unread).length;

  return (
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", height: 64, flexShrink: 0,
      borderBottom: "1px solid var(--border)",
      background: "rgba(13,17,23,0.8)",
      backdropFilter: "blur(12px)",
      position: "sticky", top: 0, zIndex: 8,
    }}>
      <div>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{subtitle}</p>}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Notification bell */}
        <div style={{ position: "relative" }}>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setNotifOpen(o => !o)}
            style={{
              width: 38, height: 38, borderRadius: "var(--r-md)",
              background: "var(--bg-elevated)", border: "1px solid var(--border)",
              display: "grid", placeItems: "center",
              color: "var(--text-secondary)", position: "relative",
            }}
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span style={{
                position: "absolute", top: 6, right: 6,
                width: 8, height: 8, borderRadius: "50%",
                background: "var(--violet)", border: "2px solid var(--bg-surface)",
              }} />
            )}
          </motion.button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: "absolute", top: "calc(100% + 8px)", right: 0,
                  width: 320, background: "var(--bg-elevated)",
                  border: "1px solid var(--border-bright)",
                  borderRadius: "var(--r-lg)", overflow: "hidden",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <div style={{
                  padding: "14px 16px", borderBottom: "1px solid var(--border)",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>Notifications</span>
                  <button
                    onClick={() => { setNotifs(n => n.map(x => ({ ...x, unread: false }))); }}
                    style={{ background: "none", border: "none", fontSize: 12, color: "var(--violet-bright)", cursor: "pointer" }}
                  >
                    Mark all read
                  </button>
                </div>
                {notifs.map(n => (
                  <div key={n.id} style={{
                    padding: "12px 16px", display: "flex", gap: 10, alignItems: "flex-start",
                    background: n.unread ? "rgba(124,58,237,0.05)" : "transparent",
                    borderBottom: "1px solid var(--border)",
                    cursor: "pointer",
                  }}
                    onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, unread: false } : x))}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: "var(--r-sm)",
                      background: "rgba(124,58,237,0.15)", color: "var(--violet-bright)",
                      display: "grid", placeItems: "center", flexShrink: 0,
                    }}>{n.icon}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.4 }}>{n.text}</p>
                      <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 3 }}>{n.time}</p>
                    </div>
                    {n.unread && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--violet)", marginTop: 5, flexShrink: 0 }} />}
                  </div>
                ))}
                <div style={{ padding: "10px 16px", textAlign: "center" }}>
                  <button
                    onClick={() => setNotifOpen(false)}
                    style={{ background: "none", border: "none", fontSize: 12, color: "var(--text-muted)", cursor: "pointer" }}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Demo badge */}
        <div style={{
          padding: "5px 12px", borderRadius: 20,
          background: "var(--amber-bg)", border: "1px solid rgba(245,158,11,0.3)",
          fontSize: 11, fontWeight: 600, color: "var(--amber)",
        }}>
          DEMO MODE
        </div>
      </div>
    </header>
  );
}
