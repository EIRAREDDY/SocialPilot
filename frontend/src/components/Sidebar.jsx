import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard, Workflow, Users, MessageCircle,
  Camera, Settings, Zap, ChevronLeft, ChevronRight,
  Bell, LogOut, ChevronDown, Globe,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/automations", icon: Workflow,       label: "Automations" },
  { to: "/leads",       icon: Users,          label: "Leads" },
  { to: "/conversations", icon: MessageCircle, label: "Conversations" },
];

const CHANNEL_ITEMS = [
  { to: "/instagram", icon: Camera,        label: "Instagram" },
  { to: "/facebook",  icon: MessageCircle, label: "Facebook" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const w = collapsed ? 72 : 240;

  return (
    <motion.aside
      animate={{ width: w }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        width: w, minHeight: "100vh", flexShrink: 0,
        background: "var(--bg-surface)",
        borderRight: "1px solid var(--border)",
        display: "flex", flexDirection: "column",
        position: "relative", overflow: "hidden",
        zIndex: 10,
      }}
    >
      {/* Glow top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 120,
        background: "radial-gradient(ellipse at 50% -20%, rgba(124,58,237,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Logo */}
      <div style={{
        padding: collapsed ? "20px 0" : "20px 18px",
        display: "flex", alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between",
        borderBottom: "1px solid var(--border)", marginBottom: 8,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: "var(--grad-brand)",
            display: "grid", placeItems: "center",
            flexShrink: 0, boxShadow: "var(--shadow-glow-sm)",
          }}>
            <Zap size={18} color="white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontWeight: 700, fontSize: 17,
                  background: "var(--grad-brand)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  whiteSpace: "nowrap", overflow: "hidden",
                }}
              >
                SocialPilot
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(c => !c)}
        style={{
          position: "absolute", top: 22, right: -12,
          width: 24, height: 24, borderRadius: "50%",
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-bright)",
          display: "grid", placeItems: "center",
          color: "var(--text-secondary)", zIndex: 20,
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
      </button>

      {/* Nav */}
      <div style={{ flex: 1, padding: "8px 10px", overflowY: "auto", overflowX: "hidden" }}>
        <NavSection label="WORKSPACE" collapsed={collapsed} />
        {NAV_ITEMS.map(item => (
          <SidebarLink key={item.to} {...item} collapsed={collapsed} />
        ))}

        <NavSection label="CHANNELS" collapsed={collapsed} />
        {CHANNEL_ITEMS.map(item => (
          <SidebarLink key={item.to} {...item} collapsed={collapsed} />
        ))}
      </div>

      {/* Bottom */}
      <div style={{ padding: "10px 10px 16px", borderTop: "1px solid var(--border)" }}>
        <SidebarLink to="/settings" icon={Settings} label="Settings" collapsed={collapsed} />

        {/* Profile */}
        <div style={{ position: "relative", marginTop: 6 }}>
          <button
            onClick={() => setProfileOpen(o => !o)}
            style={{
              width: "100%", display: "flex", alignItems: "center",
              gap: 10, padding: collapsed ? "10px 0" : "10px 12px",
              justifyContent: collapsed ? "center" : "flex-start",
              background: "none", border: "none",
              borderRadius: "var(--r-md)", cursor: "pointer",
              transition: "background var(--t-fast)",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(124,58,237,0.08)"}
            onMouseLeave={e => e.currentTarget.style.background = "none"}
          >
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "var(--grad-brand)",
              display: "grid", placeItems: "center",
              fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0,
            }}>U</div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ flex: 1, textAlign: "left", overflow: "hidden" }}
                >
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap" }}>Your Workspace</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Free Plan</div>
                </motion.div>
              )}
            </AnimatePresence>
            {!collapsed && <ChevronDown size={14} color="var(--text-muted)" />}
          </button>

          <AnimatePresence>
            {profileOpen && !collapsed && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: "absolute", bottom: "calc(100% + 6px)", left: 0, right: 0,
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-bright)",
                  borderRadius: "var(--r-lg)", padding: 6,
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <ProfileMenuItem icon={<Globe size={14} />} label="Switch Workspace" />
                <ProfileMenuItem icon={<Bell size={14} />} label="Notifications" />
                <div style={{ height: 1, background: "var(--border)", margin: "4px 0" }} />
                <ProfileMenuItem
                  icon={<LogOut size={14} />} label="Sign Out"
                  onClick={() => navigate("/")}
                  danger
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}

function NavSection({ label, collapsed }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
      color: "var(--text-muted)", padding: collapsed ? "14px 0 6px" : "14px 10px 6px",
      textAlign: collapsed ? "center" : "left",
      overflow: "hidden", whiteSpace: "nowrap",
    }}>
      {collapsed ? "·" : label}
    </div>
  );
}

function SidebarLink({ to, icon: Icon, label, collapsed }) {
  return (
    <NavLink
      to={to}
      end={to === "/dashboard"}
      style={{ textDecoration: "none", display: "block" }}
    >
      {({ isActive }) => (
        <motion.div
          whileHover={{ x: collapsed ? 0 : 2 }}
          style={{
            display: "flex", alignItems: "center",
            gap: 11, padding: collapsed ? "10px 0" : "10px 12px",
            justifyContent: collapsed ? "center" : "flex-start",
            borderRadius: "var(--r-md)", marginBottom: 2,
            background: isActive ? "rgba(124,58,237,0.15)" : "transparent",
            border: isActive ? "1px solid rgba(124,58,237,0.25)" : "1px solid transparent",
            color: isActive ? "var(--violet-bright)" : "var(--text-secondary)",
            fontWeight: isActive ? 600 : 400,
            fontSize: 14, cursor: "pointer",
            transition: "all var(--t-fast)",
            position: "relative", overflow: "hidden",
          }}
          onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(124,58,237,0.07)"; }}
          onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
        >
          {isActive && (
            <motion.div
              layoutId="activeNav"
              style={{
                position: "absolute", left: 0, top: "20%", bottom: "20%",
                width: 3, borderRadius: 2,
                background: "var(--grad-brand)",
                boxShadow: "0 0 8px var(--violet)",
              }}
            />
          )}
          <Icon size={17} style={{ flexShrink: 0 }} />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.18 }}
                style={{ whiteSpace: "nowrap", overflow: "hidden" }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </NavLink>
  );
}

function ProfileMenuItem({ icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", display: "flex", alignItems: "center", gap: 9,
        padding: "9px 10px", background: "none", border: "none",
        borderRadius: "var(--r-sm)", fontSize: 13,
        color: danger ? "var(--red)" : "var(--text-secondary)",
        cursor: "pointer", transition: "background var(--t-fast)",
      }}
      onMouseEnter={e => e.currentTarget.style.background = danger ? "var(--red-bg)" : "rgba(124,58,237,0.08)"}
      onMouseLeave={e => e.currentTarget.style.background = "none"}
    >
      {icon} {label}
    </button>
  );
}
