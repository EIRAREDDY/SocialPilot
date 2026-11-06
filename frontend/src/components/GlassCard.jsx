import { motion } from "motion/react";

export default function GlassCard({ children, style = {}, hover = true, glow = false, onClick }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: glow ? "0 8px 32px rgba(124,58,237,0.25)" : "0 8px 24px rgba(0,0,0,0.4)" } : {}}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${glow ? "var(--border-bright)" : "var(--border)"}`,
        borderRadius: "var(--r-lg)",
        backdropFilter: "blur(8px)",
        boxShadow: glow ? "var(--shadow-glow-sm)" : "var(--shadow-sm)",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
