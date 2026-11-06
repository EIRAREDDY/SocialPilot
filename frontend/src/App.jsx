import { BrowserRouter, Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "motion/react";

import { ToastProvider } from "./components/Toast";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Automations from "./pages/Automations";
import CreateAutomation from "./pages/CreateAutomation";
import Leads from "./pages/Leads";
import Conversations from "./pages/Conversations";
import Instagram from "./pages/Instagram";
import Facebook from "./pages/Facebook";
import Settings from "./pages/Settings";

/* ── Page meta for TopBar ─────────────────────────────── */
const PAGE_META = {
  "/dashboard":        { title: "Dashboard",       subtitle: "Overview of your automation workspace" },
  "/automations":      { title: "Automations",     subtitle: "Manage your automation rules" },
  "/create-automation":{ title: "Create Automation", subtitle: "Build a new automation workflow" },
  "/leads":            { title: "Leads",            subtitle: "People who interacted with your automations" },
  "/conversations":    { title: "Conversations",    subtitle: "Unified inbox for all your messages" },
  "/instagram":        { title: "Instagram",        subtitle: "Manage your Instagram Professional account" },
  "/facebook":         { title: "Facebook",         subtitle: "Manage your Facebook Page" },
  "/settings":         { title: "Settings",         subtitle: "Configure your workspace" },
};

/* ── Dashboard layout ─────────────────────────────────── */
function DashboardLayout() {
  const location = useLocation();
  const meta = PAGE_META[location.pathname] || { title: "SocialPilot" };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-base)" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <TopBar title={meta.title} subtitle={meta.subtitle} />
        <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
          <AnimatePresence mode="wait">
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

/* ── App ──────────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard shell */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard"         element={<Dashboard />} />
            <Route path="/automations"       element={<Automations />} />
            <Route path="/create-automation" element={<CreateAutomation />} />
            <Route path="/leads"             element={<Leads />} />
            <Route path="/conversations"     element={<Conversations />} />
            <Route path="/instagram"         element={<Instagram />} />
            <Route path="/facebook"          element={<Facebook />} />
            <Route path="/settings"          element={<Settings />} />
          </Route>

          {/* Legacy redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
