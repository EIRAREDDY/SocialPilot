import { useEffect, useState } from "react";
import { motion } from "motion/react";
import GlassCard from "./GlassCard";

function useCounter(target, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return value;
}

export default function StatCard({ label, value, icon: Icon, trend, trendLabel, color = "var(--violet)", index = 0 }) {
  const numericValue = parseInt(String(value).replace(/,/g, ""), 10) || 0;
  const animated = useCounter(numericValue);
  const display = numericValue >= 1000 ? animated.toLocaleString() : animated;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <GlassCard style={{ padding: 22 }} glow>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{
            width: 40, height: 40, borderRadius: "var(--r-md)",
            background: `${color}22`, border: `1px solid ${color}44`,
            display: "grid", placeItems: "center", color,
          }}>
            <Icon size={18} />
          </div>
          {trend !== undefined && (
            <span style={{
              fontSize: 12, fontWeight: 600, padding: "3px 8px",
              borderRadius: 20,
              background: trend >= 0 ? "var(--green-bg)" : "var(--red-bg)",
              color: trend >= 0 ? "var(--green)" : "var(--red)",
            }}>
              {trend >= 0 ? "+" : ""}{trend}%
            </span>
          )}
        </div>
        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>
            {display}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 6 }}>{label}</div>
          {trendLabel && <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 3 }}>{trendLabel}</div>}
        </div>
      </GlassCard>
    </motion.div>
  );
}
