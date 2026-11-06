import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Camera, MessageCircle, Send } from "lucide-react";
import GlassCard from "../components/GlassCard";
import PageTransition from "../components/PageTransition";

const CONVERSATIONS = [
  {
    id: 1, name: "@rahul_prep", platform: "Instagram", keyword: "GATE2027",
    lastMsg: "Thanks! Got the link 🙏", time: "2m", unread: 2,
    messages: [
      { from: "user", text: "GATE2027 🔥", time: "10:42 AM" },
      { from: "bot",  text: "Hi! Thanks for your interest in GATE 2027 prep. Here's your exclusive study guide link 👇", time: "10:42 AM" },
      { from: "bot",  text: "https://example.com/gate2027-guide", time: "10:42 AM", isLink: true },
      { from: "user", text: "Thanks! Got the link 🙏", time: "10:43 AM" },
    ],
  },
  {
    id: 2, name: "Priya Mehta", platform: "Facebook", keyword: "FREEGUIDE",
    lastMsg: "Auto-reply sent", time: "18m", unread: 0,
    messages: [
      { from: "user", text: "FREEGUIDE", time: "10:25 AM" },
      { from: "bot",  text: "Hey Priya! Here's your free guide as promised. Enjoy! 🎉", time: "10:25 AM" },
      { from: "bot",  text: "https://example.com/free-guide", time: "10:25 AM", isLink: true },
    ],
  },
  {
    id: 3, name: "@shopaholic99", platform: "Instagram", keyword: "DISCOUNT50",
    lastMsg: "DISCOUNT50 🛍️", time: "34m", unread: 1,
    messages: [
      { from: "user", text: "DISCOUNT50 🛍️", time: "10:08 AM" },
      { from: "bot",  text: "Your 50% discount code is ready! Use code SAVE50 at checkout.", time: "10:08 AM" },
    ],
  },
  {
    id: 4, name: "Amit Sharma", platform: "Facebook", keyword: "FREEGUIDE",
    lastMsg: "Can I get the PDF version?", time: "1h", unread: 1,
    messages: [
      { from: "user", text: "FREEGUIDE", time: "09:30 AM" },
      { from: "bot",  text: "Hey Amit! Here's your free guide 🎉", time: "09:30 AM" },
      { from: "user", text: "Can I get the PDF version?", time: "09:45 AM" },
    ],
  },
];

export default function Conversations() {
  const [selected, setSelected] = useState(CONVERSATIONS[0]);
  const [search, setSearch] = useState("");
  const [inputMsg, setInputMsg] = useState("");

  const filtered = CONVERSATIONS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.keyword.toLowerCase().includes(search.toLowerCase())
  );

  const isIG = selected.platform === "Instagram";
  const pc = isIG
    ? { color: "#d64b92", bg: "rgba(214,75,146,0.12)" }
    : { color: "#2875df", bg: "rgba(40,117,223,0.12)" };

  return (
    <PageTransition>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 5 }}>Conversations</h2>
        <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
          Unified inbox ·
          <span style={{ marginLeft: 6, fontSize: 12, color: "var(--amber)", background: "var(--amber-bg)", padding: "2px 8px", borderRadius: 10, border: "1px solid rgba(245,158,11,0.2)" }}>
            Sample conversations
          </span>
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 16, height: "calc(100vh - 200px)", minHeight: 500 }}>
        {/* Conversation list */}
        <GlassCard style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "14px 14px 10px" }}>
            <div style={{ position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search…"
                style={{
                  width: "100%", padding: "8px 10px 8px 30px",
                  background: "var(--bg-elevated)", border: "1px solid var(--border)",
                  borderRadius: "var(--r-md)", color: "var(--text-primary)", fontSize: 13, outline: "none",
                }}
              />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {filtered.map(conv => {
              const isActive = selected.id === conv.id;
              const convIG = conv.platform === "Instagram";
              return (
                <motion.div
                  key={conv.id}
                  whileHover={{ backgroundColor: "rgba(124,58,237,0.06)" }}
                  onClick={() => setSelected(conv)}
                  style={{
                    padding: "12px 14px", cursor: "pointer",
                    background: isActive ? "rgba(124,58,237,0.1)" : "transparent",
                    borderLeft: isActive ? "2px solid var(--violet)" : "2px solid transparent",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: "50%",
                        background: "var(--grad-brand)", display: "grid", placeItems: "center",
                        fontSize: 14, fontWeight: 700, color: "white",
                      }}>{conv.name[0].toUpperCase()}</div>
                      <div style={{
                        position: "absolute", bottom: -2, right: -2,
                        width: 16, height: 16, borderRadius: "50%",
                        background: convIG ? "rgba(214,75,146,0.9)" : "rgba(40,117,223,0.9)",
                        display: "grid", placeItems: "center",
                        border: "2px solid var(--bg-card)",
                      }}>
                        {convIG ? <Camera size={8} color="white" /> : <MessageCircle size={8} color="white" />}
                      </div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{conv.name}</span>
                        <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{conv.time}</span>
                      </div>
                      <p style={{ fontSize: 12, color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {conv.lastMsg}
                      </p>
                    </div>
                    {conv.unread > 0 && (
                      <div style={{
                        width: 18, height: 18, borderRadius: "50%",
                        background: "var(--violet)", display: "grid", placeItems: "center",
                        fontSize: 10, fontWeight: 700, color: "white", flexShrink: 0,
                      }}>{conv.unread}</div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>

        {/* Chat panel */}
        <GlassCard style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Chat header */}
          <div style={{
            padding: "14px 20px", borderBottom: "1px solid var(--border)",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--grad-brand)", display: "grid", placeItems: "center", fontSize: 14, fontWeight: 700, color: "white" }}>
              {selected.name[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{selected.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-muted)" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  padding: "1px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                  background: pc.bg, color: pc.color,
                }}>
                  {isIG ? <Camera size={10} /> : <MessageCircle size={10} />}
                  {selected.platform}
                </span>
                · Keyword: <code style={{ color: "var(--violet-bright)", fontWeight: 700 }}>{selected.keyword}</code>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
            {selected.messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{ display: "flex", justifyContent: msg.from === "bot" ? "flex-start" : "flex-end" }}
              >
                <div style={{
                  maxWidth: "70%", padding: "10px 14px",
                  borderRadius: msg.from === "bot" ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
                  background: msg.from === "bot"
                    ? "rgba(124,58,237,0.12)"
                    : "var(--bg-elevated)",
                  border: msg.from === "bot"
                    ? "1px solid rgba(124,58,237,0.2)"
                    : "1px solid var(--border)",
                }}>
                  {msg.from === "bot" && (
                    <div style={{ fontSize: 10, color: "var(--violet-bright)", fontWeight: 600, marginBottom: 4 }}>
                      🤖 Auto-reply
                    </div>
                  )}
                  <p style={{
                    fontSize: 14, lineHeight: 1.5,
                    color: msg.isLink ? "var(--violet-bright)" : "var(--text-primary)",
                  }}>{msg.text}</p>
                  <div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 4, textAlign: "right" }}>{msg.time}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", display: "flex", gap: 10 }}>
            <input
              value={inputMsg} onChange={e => setInputMsg(e.target.value)}
              placeholder="Type a message… (demo only)"
              style={{
                flex: 1, padding: "10px 14px",
                background: "var(--bg-elevated)", border: "1px solid var(--border)",
                borderRadius: "var(--r-md)", color: "var(--text-primary)", fontSize: 14, outline: "none",
              }}
              onFocus={e => e.target.style.borderColor = "var(--border-bright)"}
              onBlur={e => e.target.style.borderColor = "var(--border)"}
            />
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setInputMsg("")}
              style={{
                width: 40, height: 40, borderRadius: "var(--r-md)",
                background: "var(--grad-brand)", border: "none",
                display: "grid", placeItems: "center", color: "white",
              }}>
              <Send size={16} />
            </motion.button>
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  );
}
