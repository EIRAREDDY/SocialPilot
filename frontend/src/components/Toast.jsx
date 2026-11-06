import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, AlertCircle, X, Info } from "lucide-react";

const ToastContext = createContext(null);

const ICONS = {
  success: <CheckCircle size={16} />,
  error:   <AlertCircle size={16} />,
  info:    <Info size={16} />,
};

const COLORS = {
  success: { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)", color: "#10b981" },
  error:   { bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.3)",  color: "#ef4444" },
  info:    { bg: "rgba(124,58,237,0.12)", border: "rgba(124,58,237,0.3)", color: "#8b5cf6" },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const remove = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10 }}>
        <AnimatePresence>
          {toasts.map(t => {
            const c = COLORS[t.type];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 60, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.9 }}
                transition={{ duration: 0.22 }}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: c.bg, border: `1px solid ${c.border}`,
                  borderRadius: 10, padding: "12px 16px",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                  minWidth: 260, maxWidth: 360, color: c.color,
                  fontSize: 14, fontWeight: 500,
                }}
              >
                {ICONS[t.type]}
                <span style={{ flex: 1, color: "#f1f5f9" }}>{t.message}</span>
                <button onClick={() => remove(t.id)} style={{ background: "none", border: "none", color: "#475569", padding: 2 }}>
                  <X size={14} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
