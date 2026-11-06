import { motion } from "motion/react";

const VARIANTS = {
  primary: {
    background: "var(--grad-brand)",
    color: "white",
    border: "none",
    boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
  },
  secondary: {
    background: "rgba(124,58,237,0.12)",
    color: "var(--violet-bright)",
    border: "1px solid rgba(124,58,237,0.3)",
    boxShadow: "none",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-secondary)",
    border: "1px solid var(--border)",
    boxShadow: "none",
  },
  danger: {
    background: "var(--red-bg)",
    color: "var(--red)",
    border: "1px solid rgba(239,68,68,0.3)",
    boxShadow: "none",
  },
};

export default function Button({
  children, variant = "primary", size = "md",
  onClick, type = "button", disabled = false,
  style = {}, icon,
}) {
  const v = VARIANTS[variant];
  const padding = size === "sm" ? "7px 14px" : size === "lg" ? "14px 28px" : "10px 20px";
  const fontSize = size === "sm" ? 13 : size === "lg" ? 16 : 14;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02, filter: "brightness(1.1)" }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      transition={{ duration: 0.15 }}
      style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        padding, fontSize, fontWeight: 600,
        borderRadius: "var(--r-md)", cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        fontFamily: "inherit", transition: "filter 0.15s",
        ...v, ...style,
      }}
    >
      {icon && icon}
      {children}
    </motion.button>
  );
}
