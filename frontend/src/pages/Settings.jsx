import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  User, Bell, Shield, Palette, Globe, Trash2,
  Save, CheckCircle, LogOut, Moon, Sun,
} from "lucide-react";
import GlassCard from "../components/GlassCard";
import PageTransition from "../components/PageTransition";
import { useToast } from "../components/Toast";

const TABS = [
  { id: "profile",       label: "Profile",       icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance",    label: "Appearance",    icon: Palette },
  { id: "security",      label: "Security",      icon: Shield },
  { id: "danger",        label: "Danger Zone",   icon: Trash2 },
];

function Toggle({ value, onChange }) {
  return (
    <motion.div
      onClick={() => onChange(!value)}
      animate={{ background: value ? "var(--grad-brand)" : "var(--bg-elevated)" }}
      style={{
        width: 44, height: 24, borderRadius: 12,
        border: "1px solid var(--border)",
        cursor: "pointer", position: "relative", flexShrink: 0,
      }}
    >
      <motion.div
        animate={{ x: value ? 22 : 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          position: "absolute", top: 2,
          width: 18, height: 18, borderRadius: "50%",
          background: "white",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }}
      />
    </motion.div>
  );
}

function SettingRow({ label, desc, children }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "16px 0", borderBottom: "1px solid var(--border)",
      gap: 16,
    }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>{label}</div>
        {desc && <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{desc}</div>}
      </div>
      {children}
    </div>
  );
}

export default function Settings() {
  const toast = useToast();
  const navigate = useNavigate();
  const [tab, setTab] = useState("profile");

  // Profile state
  const [name, setName] = useState("Your Workspace");
  const [email, setEmail] = useState("demo@socialpilot.io");
  const [bio, setBio] = useState("");

  // Notification toggles
  const [notifs, setNotifs] = useState({
    automationTrigger: true,
    newLead: true,
    weeklyReport: false,
    productUpdates: true,
  });

  // Appearance
  const [theme, setTheme] = useState("dark");
  const [compactMode, setCompactMode] = useState(false);
  const [animations, setAnimations] = useState(true);

  function saveProfile() {
    toast("Profile updated successfully!", "success");
  }

  function saveNotifs() {
    toast("Notification preferences saved!", "success");
  }

  function clearData() {
    localStorage.removeItem("automations");
    toast("All automation data cleared.", "info");
  }

  return (
    <PageTransition>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 5 }}>Settings</h2>
          <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
            Manage your workspace preferences and account settings
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 20, alignItems: "start" }}>
          {/* Tab nav */}
          <GlassCard style={{ padding: 8 }}>
            {TABS.map(t => {
              const isActive = tab === t.id;
              const isDanger = t.id === "danger";
              return (
                <motion.button
                  key={t.id}
                  whileHover={{ x: 2 }}
                  onClick={() => setTab(t.id)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 9,
                    padding: "10px 12px", borderRadius: "var(--r-md)", marginBottom: 2,
                    background: isActive
                      ? isDanger ? "var(--red-bg)" : "rgba(124,58,237,0.15)"
                      : "transparent",
                    border: isActive
                      ? isDanger ? "1px solid rgba(239,68,68,0.25)" : "1px solid rgba(124,58,237,0.25)"
                      : "1px solid transparent",
                    color: isActive
                      ? isDanger ? "var(--red)" : "var(--violet-bright)"
                      : isDanger ? "var(--red)" : "var(--text-secondary)",
                    fontSize: 13, fontWeight: isActive ? 600 : 400,
                    cursor: "pointer", textAlign: "left",
                  }}
                >
                  <t.icon size={15} />
                  {t.label}
                </motion.button>
              );
            })}
          </GlassCard>

          {/* Tab content */}
          <GlassCard style={{ padding: 28 }}>
            {tab === "profile" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Profile Settings</h3>

                {/* Avatar */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: "var(--grad-brand)", display: "grid", placeItems: "center",
                    fontSize: 24, fontWeight: 800, color: "white",
                    boxShadow: "var(--shadow-glow-sm)",
                  }}>
                    {name[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>Free Plan</div>
                    <button style={{
                      fontSize: 12, padding: "5px 12px", borderRadius: "var(--r-sm)",
                      background: "rgba(124,58,237,0.12)", color: "var(--violet-bright)",
                      border: "1px solid rgba(124,58,237,0.25)", cursor: "pointer",
                    }}>
                      Change avatar
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { label: "Display name", value: name, setter: setName, type: "text", placeholder: "Your name" },
                    { label: "Email address", value: email, setter: setEmail, type: "email", placeholder: "you@example.com" },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 7 }}>
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        value={f.value}
                        onChange={e => f.setter(e.target.value)}
                        placeholder={f.placeholder}
                        style={{
                          width: "100%", padding: "11px 13px",
                          background: "var(--bg-elevated)", border: "1px solid var(--border)",
                          borderRadius: "var(--r-md)", color: "var(--text-primary)",
                          fontSize: 14, outline: "none",
                        }}
                        onFocus={e => e.target.style.borderColor = "var(--border-bright)"}
                        onBlur={e => e.target.style.borderColor = "var(--border)"}
                      />
                    </div>
                  ))}

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 7 }}>
                      Bio (optional)
                    </label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                      placeholder="Tell us about your workspace…"
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

                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={saveProfile}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      background: "var(--grad-brand)", color: "white",
                      padding: "11px 22px", borderRadius: "var(--r-md)",
                      border: "none", fontSize: 14, fontWeight: 700,
                      boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
                      alignSelf: "flex-start",
                    }}
                  >
                    <Save size={15} /> Save Changes
                  </motion.button>
                </div>
              </motion.div>
            )}

            {tab === "notifications" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Notification Preferences</h3>
                <div>
                  {[
                    { key: "automationTrigger", label: "Automation triggered", desc: "Get notified when an automation fires" },
                    { key: "newLead", label: "New lead captured", desc: "Alert when a new lead is added" },
                    { key: "weeklyReport", label: "Weekly performance report", desc: "Summary of your automation stats" },
                    { key: "productUpdates", label: "Product updates", desc: "New features and improvements" },
                  ].map(n => (
                    <SettingRow key={n.key} label={n.label} desc={n.desc}>
                      <Toggle
                        value={notifs[n.key]}
                        onChange={v => setNotifs(prev => ({ ...prev, [n.key]: v }))}
                      />
                    </SettingRow>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={saveNotifs}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "var(--grad-brand)", color: "white",
                    padding: "11px 22px", borderRadius: "var(--r-md)",
                    border: "none", fontSize: 14, fontWeight: 700,
                    boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
                    marginTop: 20,
                  }}
                >
                  <Save size={15} /> Save Preferences
                </motion.button>
              </motion.div>
            )}

            {tab === "appearance" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Appearance</h3>

                {/* Theme selector */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 12 }}>Theme</div>
                  <div style={{ display: "flex", gap: 12 }}>
                    {[
                      { val: "dark", label: "Dark", icon: Moon },
                      { val: "light", label: "Light", icon: Sun },
                    ].map(t => (
                      <motion.button
                        key={t.val}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => { setTheme(t.val); toast("Theme preference saved (demo only).", "info"); }}
                        style={{
                          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                          padding: "16px 24px", borderRadius: "var(--r-lg)",
                          background: theme === t.val ? "rgba(124,58,237,0.15)" : "var(--bg-elevated)",
                          border: theme === t.val ? "2px solid var(--violet)" : "1px solid var(--border)",
                          cursor: "pointer", color: theme === t.val ? "var(--violet-bright)" : "var(--text-secondary)",
                        }}
                      >
                        <t.icon size={20} />
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{t.label}</span>
                        {theme === t.val && <CheckCircle size={13} color="var(--violet-bright)" />}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <SettingRow label="Compact mode" desc="Reduce spacing for a denser layout">
                  <Toggle value={compactMode} onChange={setCompactMode} />
                </SettingRow>
                <SettingRow label="Animations" desc="Enable motion and transition effects">
                  <Toggle value={animations} onChange={setAnimations} />
                </SettingRow>

                <div style={{
                  marginTop: 20, padding: "12px 16px",
                  background: "var(--amber-bg)", borderRadius: "var(--r-md)",
                  border: "1px solid rgba(245,158,11,0.2)", fontSize: 12, color: "var(--amber)",
                }}>
                  ⚠️ Appearance settings are demo only and do not persist across sessions.
                </div>
              </motion.div>
            )}

            {tab === "security" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Security</h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
                  {["Current password", "New password", "Confirm new password"].map(label => (
                    <div key={label}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 7 }}>
                        {label}
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        style={{
                          width: "100%", padding: "11px 13px",
                          background: "var(--bg-elevated)", border: "1px solid var(--border)",
                          borderRadius: "var(--r-md)", color: "var(--text-primary)",
                          fontSize: 14, outline: "none",
                        }}
                        onFocus={e => e.target.style.borderColor = "var(--border-bright)"}
                        onBlur={e => e.target.style.borderColor = "var(--border)"}
                      />
                    </div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={() => toast("Password change is demo only.", "info")}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      background: "var(--grad-brand)", color: "white",
                      padding: "11px 22px", borderRadius: "var(--r-md)",
                      border: "none", fontSize: 14, fontWeight: 700,
                      boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
                      alignSelf: "flex-start",
                    }}
                  >
                    <Shield size={15} /> Update Password
                  </motion.button>
                </div>

                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Active Sessions</div>
                  <div style={{
                    padding: "14px 16px", background: "var(--bg-elevated)",
                    borderRadius: "var(--r-md)", border: "1px solid var(--border)",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>Current session</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Chrome · Windows · Just now</div>
                    </div>
                    <span style={{
                      fontSize: 11, padding: "3px 10px", borderRadius: 20,
                      background: "var(--green-bg)", color: "var(--green)",
                      border: "1px solid rgba(16,185,129,0.2)", fontWeight: 600,
                    }}>Active</span>
                  </div>
                </div>
              </motion.div>
            )}

            {tab === "danger" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: "var(--red)" }}>Danger Zone</h3>
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>
                  These actions are irreversible. Proceed with caution.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    {
                      title: "Clear all automation data",
                      desc: "Removes all saved automations from localStorage.",
                      action: clearData,
                      label: "Clear Data",
                    },
                    {
                      title: "Sign out",
                      desc: "Sign out of your current session.",
                      action: () => navigate("/"),
                      label: "Sign Out",
                    },
                  ].map(item => (
                    <div key={item.title} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "18px 20px", borderRadius: "var(--r-lg)",
                      background: "var(--red-bg)", border: "1px solid rgba(239,68,68,0.2)",
                      gap: 16,
                    }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 3 }}>{item.title}</div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.desc}</div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        onClick={item.action}
                        style={{
                          display: "flex", alignItems: "center", gap: 7,
                          padding: "9px 16px", borderRadius: "var(--r-md)",
                          background: "rgba(239,68,68,0.15)", color: "var(--red)",
                          border: "1px solid rgba(239,68,68,0.3)",
                          fontSize: 13, fontWeight: 600, flexShrink: 0,
                        }}
                      >
                        {item.label === "Sign Out" ? <LogOut size={14} /> : <Trash2 size={14} />}
                        {item.label}
                      </motion.button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  );
}
