import { useState } from "react";
import { motion } from "motion/react";
import {
  Zap, MessageCircle, Users, TrendingUp, Shield,
  Clock, Globe, CheckCircle, Star, ChevronDown,
  Workflow, Camera, ArrowRight,
} from "lucide-react";

/* ── Scroll reveal wrapper ────────────────────────────── */
function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Section label ────────────────────────────────────── */
function SectionLabel({ text }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)",
      borderRadius: 20, padding: "5px 14px",
      fontSize: 12, color: "var(--violet-bright)", fontWeight: 600,
      letterSpacing: "0.05em", textTransform: "uppercase",
      marginBottom: 16,
    }}>
      {text}
    </div>
  );
}

/* ── Use Cases ────────────────────────────────────────── */
const USE_CASES = [
  {
    emoji: "🎓",
    title: "Course Creators & Educators",
    desc: "Share your free guide or course link automatically when students comment a keyword on your post. Build your email list on autopilot.",
    example: "Keyword: FREEGUIDE → DM with course link",
    color: "#7c3aed",
  },
  {
    emoji: "🛍️",
    title: "E-commerce & Product Launches",
    desc: "Run flash sales and giveaways. When followers comment your discount keyword, instantly DM them the promo code.",
    example: "Keyword: SALE50 → DM with discount code",
    color: "#d64b92",
  },
  {
    emoji: "💼",
    title: "Coaches & Consultants",
    desc: "Capture leads from your content. When someone comments interest, automatically send your booking link or lead magnet.",
    example: "Keyword: COACHING → DM with booking link",
    color: "#10b981",
  },
  {
    emoji: "🎵",
    title: "Musicians & Artists",
    desc: "Drop your new track or merch link to every fan who comments. Turn every post into a distribution channel.",
    example: "Keyword: NEWTRACK → DM with Spotify link",
    color: "#3b82f6",
  },
  {
    emoji: "🏋️",
    title: "Fitness & Wellness Brands",
    desc: "Share workout plans, nutrition guides or app download links automatically when followers engage with your content.",
    example: "Keyword: WORKOUT → DM with PDF plan",
    color: "#f59e0b",
  },
  {
    emoji: "🏢",
    title: "Agencies & Marketers",
    desc: "Manage multiple client accounts from one dashboard. Scale lead generation across Instagram and Facebook Pages.",
    example: "Multiple accounts · Unlimited automations",
    color: "#6366f1",
  },
];

export function UseCases() {
  return (
    <section id="use-cases" style={{ padding: "100px 5%", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <SectionLabel text="Use Cases" />
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>
              Built for every type of
              <br />
              <span style={{ background: "var(--grad-brand)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                social media creator
              </span>
            </h2>
            <p style={{ fontSize: 17, color: "var(--text-secondary)", maxWidth: 500, margin: "0 auto" }}>
              Whether you're a solo creator or a full agency, SocialPilot scales with you.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {USE_CASES.map((uc, i) => (
            <Reveal key={uc.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -4, borderColor: "var(--border-bright)" }}
                transition={{ duration: 0.2 }}
                style={{
                  background: "var(--bg-card)", border: "1px solid var(--border)",
                  borderRadius: "var(--r-xl)", padding: 28,
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 16 }}>{uc.emoji}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: "var(--text-primary)" }}>{uc.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 16 }}>{uc.desc}</p>
                <div style={{
                  padding: "8px 12px", borderRadius: "var(--r-sm)",
                  background: `${uc.color}12`, border: `1px solid ${uc.color}25`,
                  fontSize: 12, color: uc.color, fontWeight: 600,
                  fontFamily: "monospace",
                }}>
                  {uc.example}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Features ─────────────────────────────────────────── */
const FEATURES = [
  { icon: MessageCircle, title: "Comment-to-DM Automation", desc: "When someone comments a keyword on your post, automatically send them a personalised DM — instantly.", color: "#7c3aed" },
  { icon: Zap, title: "Keyword Triggers", desc: "Set any keyword as a trigger. Works for giveaways, lead magnets, product launches and more.", color: "#6366f1" },
  { icon: Users, title: "Lead Capture", desc: "Every interaction becomes a lead. Capture names, usernames and contact details automatically.", color: "#3b82f6" },
  { icon: TrendingUp, title: "Performance Analytics", desc: "Track how many times each automation triggered, leads captured and messages sent.", color: "#10b981" },
  { icon: Shield, title: "Meta API Compliant", desc: "Built to work within Instagram and Facebook's official API guidelines. Safe and compliant.", color: "#f59e0b" },
  { icon: Clock, title: "24/7 Automation", desc: "Your automations run around the clock. Never miss a lead, even while you sleep.", color: "#ef4444" },
];

export function Features() {
  return (
    <section id="features" style={{ padding: "100px 5%", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <SectionLabel text="Features" />
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>
              Everything you need to automate
              <br />
              <span style={{ background: "var(--grad-brand)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                social media growth
              </span>
            </h2>
            <p style={{ fontSize: 17, color: "var(--text-secondary)", maxWidth: 520, margin: "0 auto" }}>
              Powerful automation tools designed for creators, coaches and businesses.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -4, borderColor: "var(--border-bright)" }}
                transition={{ duration: 0.2 }}
                style={{
                  background: "var(--bg-card)", border: "1px solid var(--border)",
                  borderRadius: "var(--r-xl)", padding: 28,
                }}
              >
                <div style={{
                  width: 46, height: 46, borderRadius: "var(--r-md)",
                  background: `${f.color}18`, border: `1px solid ${f.color}33`,
                  display: "grid", placeItems: "center", marginBottom: 18, color: f.color,
                }}>
                  <f.icon size={20} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: "var(--text-primary)" }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── How it works ─────────────────────────────────────── */
const STEPS = [
  { num: "01", title: "Connect your account", desc: "Link your Instagram Professional or Facebook Page account via the official Meta API." },
  { num: "02", title: "Create an automation", desc: "Choose a trigger keyword, write your reply message and optionally add a link to share." },
  { num: "03", title: "Go live", desc: "Activate your automation. It runs 24/7 and replies instantly when the keyword is detected." },
  { num: "04", title: "Capture leads", desc: "Every person who triggers your automation is saved as a lead with their contact details." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: "100px 5%", position: "relative", zIndex: 1 }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "var(--r-2xl)", padding: "60px 5%",
      }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel text="How It Works" />
            <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Up and running in minutes
            </h2>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.1}>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "var(--grad-brand)", margin: "0 auto 20px",
                  display: "grid", placeItems: "center",
                  fontSize: 18, fontWeight: 800, color: "white",
                  boxShadow: "var(--shadow-glow)",
                }}>
                  {s.num}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pricing ──────────────────────────────────────────── */
const PLANS = [
  {
    name: "Free", price: "$0", period: "/month",
    features: ["1 connected account", "3 automations", "100 triggers/month", "Basic analytics"],
    cta: "Get Started", highlight: false,
  },
  {
    name: "Pro", price: "$29", period: "/month",
    features: ["5 connected accounts", "Unlimited automations", "10,000 triggers/month", "Advanced analytics", "Priority support", "Custom keywords"],
    cta: "Start Pro Trial", highlight: true,
  },
  {
    name: "Agency", price: "$99", period: "/month",
    features: ["Unlimited accounts", "Unlimited automations", "Unlimited triggers", "White-label option", "API access", "Dedicated support"],
    cta: "Contact Sales", highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" style={{ padding: "100px 5%", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel text="Pricing" />
            <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 14 }}>
              Simple, transparent pricing
            </h2>
            <p style={{ fontSize: 16, color: "var(--text-secondary)" }}>Start free. Scale as you grow.</p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                style={{
                  background: p.highlight ? "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(99,102,241,0.1) 100%)" : "var(--bg-card)",
                  border: p.highlight ? "1px solid var(--border-bright)" : "1px solid var(--border)",
                  borderRadius: "var(--r-xl)", padding: 32,
                  boxShadow: p.highlight ? "var(--shadow-glow)" : "none",
                  position: "relative",
                }}
              >
                {p.highlight && (
                  <div style={{
                    position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    background: "var(--grad-brand)", color: "white",
                    padding: "4px 16px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                  }}>Most Popular</div>
                )}
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 24 }}>
                  <span style={{ fontSize: 40, fontWeight: 900, color: p.highlight ? "var(--violet-bright)" : "var(--text-primary)" }}>{p.price}</span>
                  <span style={{ fontSize: 14, color: "var(--text-muted)" }}>{p.period}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--text-secondary)" }}>
                      <CheckCircle size={14} color="var(--green)" /> {f}
                    </div>
                  ))}
                </div>
                <motion.a
                  href="/signup"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  style={{
                    display: "block", textAlign: "center",
                    padding: "12px", borderRadius: "var(--r-md)",
                    fontSize: 14, fontWeight: 600,
                    background: p.highlight ? "var(--grad-brand)" : "rgba(124,58,237,0.12)",
                    color: p.highlight ? "white" : "var(--violet-bright)",
                    border: p.highlight ? "none" : "1px solid rgba(124,58,237,0.3)",
                    boxShadow: p.highlight ? "0 4px 16px rgba(124,58,237,0.35)" : "none",
                  }}
                >
                  {p.cta}
                </motion.a>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ─────────────────────────────────────── */
const TESTIMONIALS = [
  { name: "Sarah K.", role: "Content Creator", text: "SocialPilot tripled my lead capture rate. The keyword automation is incredibly powerful.", stars: 5 },
  { name: "Marcus T.", role: "Digital Marketer", text: "I set up my first automation in under 5 minutes. The interface is clean and intuitive.", stars: 5 },
  { name: "Priya M.", role: "E-commerce Owner", text: "My DISCOUNT50 automation captured 300+ leads in the first week. Absolutely worth it.", stars: 5 },
];

export function Testimonials() {
  return (
    <section style={{ padding: "80px 5%", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel text="Testimonials" />
            <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Loved by creators and marketers
            </h2>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 8 }}>
              ⚠️ Sample testimonials for demonstration purposes only.
            </p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div style={{
                background: "var(--bg-card)", border: "1px solid var(--border)",
                borderRadius: "var(--r-xl)", padding: 28,
              }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                  {Array(t.stars).fill(0).map((_, j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 20 }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "var(--grad-brand)", display: "grid", placeItems: "center",
                    fontSize: 14, fontWeight: 700, color: "white",
                  }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────── */
const FAQS = [
  { q: "Does this actually send Instagram DMs?", a: "Not yet. This is a frontend prototype. Real Instagram and Facebook messaging will be implemented using the official Meta API and webhooks in a future release." },
  { q: "Is my account safe?", a: "SocialPilot is designed to comply with Meta's API guidelines. We never store your passwords or access tokens in the browser." },
  { q: "What triggers are supported?", a: "Currently: comment on a post and direct message triggers for both Instagram and Facebook Pages." },
  { q: "Can I use multiple keywords?", a: "Yes. You can create multiple automation rules, each with a different keyword, trigger and reply." },
  { q: "Is the data stored securely?", a: "In this prototype, automation rules are stored in your browser's localStorage. No data is sent to any server." },
];

export function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ padding: "80px 5%", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel text="FAQ" />
            <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Frequently asked questions
            </h2>
          </div>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div style={{
                background: "var(--bg-card)", border: "1px solid var(--border)",
                borderRadius: "var(--r-lg)", overflow: "hidden",
              }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between",
                    alignItems: "center", padding: "18px 22px",
                    background: "none", border: "none", cursor: "pointer",
                    color: "var(--text-primary)", fontSize: 15, fontWeight: 600,
                    textAlign: "left",
                  }}
                >
                  {f.q}
                  <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={18} color="var(--text-muted)" />
                  </motion.div>
                </button>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ padding: "0 22px 18px", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}
                  >
                    {f.a}
                  </motion.div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA Banner ───────────────────────────────────────── */
export function CTABanner() {
  return (
    <section style={{ padding: "60px 5%", position: "relative", zIndex: 1 }}>
      <Reveal>
        <div style={{
          maxWidth: 800, margin: "0 auto", textAlign: "center",
          background: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(99,102,241,0.1) 100%)",
          border: "1px solid var(--border-bright)",
          borderRadius: "var(--r-2xl)", padding: "60px 40px",
          boxShadow: "var(--shadow-glow)",
        }}>
          <h2 style={{ fontSize: "clamp(24px,4vw,42px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>
            Ready to automate your growth?
          </h2>
          <p style={{ fontSize: 17, color: "var(--text-secondary)", marginBottom: 32 }}>
            Join thousands of creators using SocialPilot to turn comments into customers.
          </p>
          <a href="/signup">
            <motion.div
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(124,58,237,0.5)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "var(--grad-brand)", color: "white",
                padding: "14px 36px", borderRadius: "var(--r-lg)",
                fontSize: 16, fontWeight: 700,
                boxShadow: "0 4px 24px rgba(124,58,237,0.4)",
              }}
            >
              Get Started Free <ArrowRight size={16} />
            </motion.div>
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────── */
export function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)", padding: "40px 5%",
      position: "relative", zIndex: 1,
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: "var(--grad-brand)", display: "grid", placeItems: "center",
          }}>
            <Zap size={15} color="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>SocialPilot</span>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
          © 2025 SocialPilot. Frontend prototype. Not affiliated with Meta.
        </p>
        <div style={{ display: "flex", gap: 20, fontSize: 13, color: "var(--text-muted)" }}>
          {["Privacy", "Terms", "Contact"].map(l => (
            <a key={l} href="#" style={{ transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "var(--violet-bright)"}
              onMouseLeave={e => e.target.style.color = "var(--text-muted)"}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
