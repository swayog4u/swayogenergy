import { useState } from "react";

const WattsunAi = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [launchHover, setLaunchHover] = useState(false);
  const [outlineHover, setOutlineHover] = useState(false);

  const handleLaunchApp = () => {
    window.open("https://wattsun-ai.vercel.app/", "_blank");
  };

  const features = [
    {
      number: "01",
      title: "Multi-Model AI Engine",
      description:
        "Dynamically routes queries across Gemini 1.5 Pro, Gemini 1.5 Flash, and Groq LLaMA 3 for optimal accuracy and response performance.",
    },
    {
      number: "02",
      title: "State-Aware Intelligence",
      description:
        "Understands and adapts to regional energy policies, subsidy structures, and DISCOM regulations across all 28 states and 8 Union Territories.",
    },
    {
      number: "03",
      title: "Voice Integration",
      description:
        "Native Text-to-Speech engine with localised Indian conversational pacing, enabling natural and accessible voice-based consultations.",
    },
    {
      number: "04",
      title: "Structured Output Format",
      description:
        "Every response is formatted into Explanations, Data Tables, Verified Government Links, and Video References for clarity and credibility.",
    },
    {
      number: "05",
      title: "Intelligent Follow-Ups",
      description:
        "Automatically generates contextual follow-up questions to guide users progressively deeper into relevant energy topics.",
    },
    {
      number: "06",
      title: "Cloud Synchronisation",
      description:
        "Firebase Firestore integration ensures real-time chat history persistence across all devices and concurrent sessions.",
    },
    {
      number: "07",
      title: "PDF Report Export",
      description:
        "One-click export of complete consultation sessions into professionally formatted, shareable PDF documents.",
    },
    {
      number: "08",
      title: "ROI Advisory Module",
      description:
        "Calculates precise Return on Investment for solar installations based on location, consumption profile, and applicable government subsidies.",
    },
  ];

  const pillars = [
    {
      label: "Educates",
      letter: "A",
      desc: "Simplifies complex concepts such as grid-tied net metering and LCOE calculations for non-technical users and general consumers.",
    },
    {
      label: "Advises",
      letter: "B",
      desc: "Calculates Return on Investment for solar installations based on location, energy usage, and all applicable central and state subsidies.",
    },
    {
      label: "Guides",
      letter: "C",
      desc: "Breaks down state-by-state subsidy schemes and EV charging infrastructure regulations across all 36 states and Union Territories.",
    },
    {
      label: "Validates",
      letter: "D",
      desc: "Automatically cross-references data to provide verified links to official government portals — MNRE and state energy departments.",
    },
  ];

  const stats = [
    { value: "36", label: "States and UTs Covered", sub: "Pan-India Scope" },
    { value: "3",  label: "AI Models",               sub: "Multi-Model Routing" },
    { value: "8",  label: "Core Capabilities",        sub: "End-to-End Advisory" },
    { value: "24/7", label: "Availability",           sub: "Always On" },
  ];

  const trustBadges = [
    "MNRE Verified Data",
    "Government Portal Links",
    "Serverless Architecture",
    "Firebase Cloud Sync",
  ];

  return (
    <div style={{ fontFamily: "sans-serif", backgroundColor: "#ffffff", color: "#1a1a1a", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .w-root { font-family: 'Open Sans', sans-serif; }
        .w-root h1, .w-root h2, .w-root h3, .w-btn { font-family: 'Poppins', sans-serif; }

        /* ── Layout helpers ── */
        .w-container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
        .w-section   { padding: 72px 24px; }
        .w-section-dark { padding: 72px 24px; background: #1b4332; position: relative; overflow: hidden; }

        /* ── HERO ── */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
        }
        .hero-trust {
          margin-top: 44px;
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        /* ── AIM section ── */
        .aim-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
        }

        /* ── PILLARS ── */
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .pillar-card {
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          padding: 28px 20px;
          transition: all 0.2s;
          cursor: default;
        }
        .pillar-card:hover {
          border-color: #16a34a;
          box-shadow: 0 8px 24px rgba(22,163,74,0.12);
          transform: translateY(-3px);
        }

        /* ── FEATURES ── */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.07);
          border-radius: 10px;
          overflow: hidden;
        }
        .feature-cell {
          padding: 28px 22px;
          transition: background-color 0.2s;
          cursor: default;
        }

        /* ── Buttons ── */
        .w-btn-primary {
          display: inline-block;
          background: #f59e0b;
          color: #1a1a1a;
          border: none;
          border-radius: 6px;
          padding: 14px 30px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 10px rgba(245,158,11,0.3);
          font-family: 'Poppins', sans-serif;
        }
        .w-btn-primary:hover {
          background: #d97706;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(245,158,11,0.45);
        }
        .w-btn-outline {
          display: inline-block;
          background: transparent;
          color: #ffffff;
          border: 1.5px solid rgba(255,255,255,0.45);
          border-radius: 6px;
          padding: 14px 30px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Poppins', sans-serif;
        }
        .w-btn-outline:hover { background: rgba(255,255,255,0.08); }

        .badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 4px;
          margin-bottom: 16px;
          font-family: 'Poppins', sans-serif;
        }

        /* ── TABLET ── */
        @media (max-width: 900px) {
          .hero-grid    { grid-template-columns: 1fr; gap: 40px; }
          .aim-grid     { grid-template-columns: 1fr; gap: 40px; }
          .pillars-grid { grid-template-columns: repeat(2, 1fr); }
          .features-grid { grid-template-columns: repeat(2, 1fr); }
          .features-header { flex-direction: column; gap: 8px; align-items: flex-start !important; }
        }

        /* ── MOBILE ── */
        @media (max-width: 560px) {
          .w-section      { padding: 52px 16px; }
          .w-section-dark { padding: 52px 16px; }
          .w-container    { padding: 0 16px; }

          .hero-grid    { grid-template-columns: 1fr; gap: 32px; }
          .aim-grid     { grid-template-columns: 1fr; gap: 32px; }
          .pillars-grid { grid-template-columns: 1fr; gap: 14px; }
          .features-grid{ grid-template-columns: 1fr; }
          .hero-trust   { gap: 14px; }

          .hero-btns { flex-direction: column; }
          .hero-btns button, .hero-btns .w-btn-primary, .hero-btns .w-btn-outline {
            width: 100%;
            justify-content: center;
            text-align: center;
          }

          .stats-panel { padding: 24px 20px !important; }
          .cta-btn-wrap { width: 100%; }
          .cta-btn-wrap button { width: 100%; }
        }
      `}</style>

      <div className="w-root">

        {/* ══════════════════════ HERO ══════════════════════ */}
        <div style={{
          background: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 55%, #1b4332 100%)",
          position: "relative",
          overflow: "hidden",
          padding: "80px 24px 72px",
        }}>
          {/* Grid texture */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(255,255,255,0.03) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(255,255,255,0.03) 60px)",
            pointerEvents: "none",
          }} />
          {/* Glow orb */}
          <div style={{
            position: "absolute", top: "-80px", right: "-80px",
            width: "420px", height: "420px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div className="w-container" style={{ position: "relative" }}>
            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              backgroundColor: "rgba(251,191,36,0.15)",
              border: "1px solid rgba(251,191,36,0.35)",
              borderRadius: "4px", padding: "6px 14px", marginBottom: "28px",
            }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#fbbf24", flexShrink: 0 }} />
              <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fbbf24", fontFamily: "'Poppins', sans-serif" }}>
                AI-Powered Solar Intelligence Platform
              </span>
            </div>

            <div className="hero-grid">
              {/* Left column */}
              <div>
                <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: "800", lineHeight: "1.08", color: "#ffffff", marginBottom: "16px", letterSpacing: "-0.025em" }}>
                  Wattsun<span style={{ color: "#fbbf24" }}>.Ai</span>
                </h1>
                <p style={{ fontSize: "clamp(15px, 2vw, 18px)", lineHeight: "1.6", color: "rgba(255,255,255,0.85)", marginBottom: "8px", fontWeight: "600" }}>
                  The Intelligent Solar Energy Expert
                </p>
                <p style={{ fontSize: "clamp(13px, 1.5vw, 15px)", lineHeight: "1.85", color: "rgba(255,255,255,0.58)", marginBottom: "36px" }}>
                  A voice-powered AI consultant specialising in India's renewable energy landscape,
                  electrical systems, and Electric Vehicle infrastructure — available 24 hours a day,
                  7 days a week.
                </p>
                <div className="hero-btns" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <button className="w-btn-primary" onClick={handleLaunchApp}>
                    Launch Wattsun.Ai
                  </button>
                  <button className="w-btn-outline">
                    Explore Features
                  </button>
                </div>
              </div>

              {/* Stats panel */}
              <div className="stats-panel" style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.11)",
                borderRadius: "12px", padding: "32px",
                backdropFilter: "blur(8px)",
              }}>
                <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.16em", textTransform: "uppercase", color: "#fbbf24", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" }}>
                  Platform at a Glance
                </div>
                {stats.map((stat, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "13px 0",
                    borderBottom: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  }}>
                    <div>
                      <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>{stat.label}</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.32)", marginTop: "2px" }}>{stat.sub}</div>
                    </div>
                    <div style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: "800", color: "#fbbf24", fontFamily: "'Poppins', sans-serif" }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="hero-trust">
              {trustBadges.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "16px", height: "16px", borderRadius: "50%", backgroundColor: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: "white", fontSize: "9px", fontWeight: "700" }}>✓</span>
                  </div>
                  <span style={{ fontSize: "clamp(11px, 1.4vw, 13px)", color: "rgba(255,255,255,0.6)", fontWeight: "500" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Amber stripe ── */}
        <div style={{ height: "4px", backgroundColor: "#f59e0b" }} />

        {/* ══════════════════════ AIM & MOTIVATION ══════════════════════ */}
        <div className="w-section" style={{ backgroundColor: "#f8fdf9" }}>
          <div className="w-container">
            <div className="aim-grid">
              {[
                {
                  badge: "Our Aim", badgeBg: "#dcfce7", badgeColor: "#166534",
                  title: "Democratising Access to Technical Energy Knowledge",
                  body: "Wattsun.Ai bridges the gap between complex government energy policies, intricate electrical engineering concepts, and the everyday consumer or business owner seeking to transition to renewable energy in India. Expert-grade advisory should not be limited to those who can afford professional consultants.",
                },
                {
                  badge: "Motivation", badgeBg: "#fef3c7", badgeColor: "#92400e",
                  title: "Filling a Critical Gap in India's Energy Advisory Ecosystem",
                  body: "Navigating rooftop solar subsidies, DISCOM regulations, ROI calculations, and state-wise EV policies is overwhelming for the general public. Information is scattered across government portals and difficult to comprehend without domain expertise. We built Wattsun.Ai to provide a centralised, verified, and structured advisory tool dedicated to India's energy transition.",
                },
              ].map((s, i) => (
                <div key={i}>
                  <span className="badge" style={{ backgroundColor: s.badgeBg, color: s.badgeColor }}>{s.badge}</span>
                  <h2 style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: "700", color: "#1b4332", lineHeight: "1.28", marginBottom: "16px" }}>{s.title}</h2>
                  <p style={{ fontSize: "clamp(13px, 1.5vw, 15px)", lineHeight: "1.85", color: "#4b5563" }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════ PURPOSE PILLARS ══════════════════════ */}
        <div className="w-section" style={{ backgroundColor: "#ffffff" }}>
          <div className="w-container">
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span className="badge" style={{ backgroundColor: "#dcfce7", color: "#166534" }}>Core Purpose</span>
              <h2 style={{ fontSize: "clamp(26px, 4vw, 34px)", fontWeight: "700", color: "#1b4332", lineHeight: "1.2", marginBottom: "12px" }}>
                A 24/7 Virtual Energy Consultant
              </h2>
              <p style={{ fontSize: "clamp(14px, 1.6vw, 16px)", color: "#6b7280", maxWidth: "520px", margin: "0 auto", lineHeight: "1.7" }}>
                Wattsun.Ai operates across four service dimensions to deliver comprehensive renewable energy guidance.
              </p>
            </div>
            <div className="pillars-grid">
              {pillars.map((p, i) => (
                <div key={i} className="pillar-card">
                  <div style={{ width: "38px", height: "38px", borderRadius: "8px", backgroundColor: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px", fontSize: "15px", fontWeight: "800", color: "#16a34a", fontFamily: "'Poppins', sans-serif" }}>
                    {p.letter}
                  </div>
                  <h3 style={{ fontSize: "clamp(14px, 1.6vw, 16px)", fontWeight: "700", color: "#1b4332", marginBottom: "10px" }}>{p.label}</h3>
                  <p style={{ fontSize: "clamp(12px, 1.3vw, 13px)", lineHeight: "1.78", color: "#6b7280" }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════ FEATURES ══════════════════════ */}
        <div className="w-section-dark">
          {/* Decorative orb */}
          <div style={{ position: "absolute", bottom: "-120px", left: "-120px", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.09) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div className="w-container" style={{ position: "relative" }}>
            <div className="features-header" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px" }}>
              <div>
                <span className="badge" style={{ backgroundColor: "rgba(251,191,36,0.14)", color: "#fbbf24" }}>Platform Capabilities</span>
                <h2 style={{ fontSize: "clamp(26px, 4vw, 34px)", fontWeight: "700", color: "#ffffff", lineHeight: "1.2", margin: 0 }}>
                  8 Core Features
                </h2>
              </div>
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "4px" }}>
                Built for India's Energy Transition
              </span>
            </div>

            <div className="features-grid">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="feature-cell"
                  onMouseEnter={() => setHoveredFeature(i)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  style={{ backgroundColor: hoveredFeature === i ? "rgba(245,158,11,0.11)" : "rgba(255,255,255,0.03)" }}
                >
                  <div style={{ fontSize: "10px", fontWeight: "700", color: hoveredFeature === i ? "#fbbf24" : "rgba(255,255,255,0.28)", fontFamily: "'Poppins', sans-serif", marginBottom: "11px", letterSpacing: "0.1em", transition: "color 0.2s" }}>
                    {f.number}
                  </div>
                  <h3 style={{ fontSize: "clamp(12px, 1.4vw, 13.5px)", fontWeight: "700", color: hoveredFeature === i ? "#fbbf24" : "#e5e7eb", marginBottom: "9px", lineHeight: "1.35", transition: "color 0.2s" }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: "clamp(11px, 1.2vw, 12px)", lineHeight: "1.75", color: "rgba(255,255,255,0.48)" }}>
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════ CTA ══════════════════════ */}
        <div className="w-section" style={{ backgroundColor: "#f8fdf9", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center", padding: "0 16px" }}>
            <span className="badge" style={{ backgroundColor: "#dcfce7", color: "#166534" }}>Begin Your Consultation</span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: "700", color: "#1b4332", lineHeight: "1.22", marginBottom: "16px" }}>
              Access Expert Solar and EV Guidance — at No Cost
            </h2>
            <p style={{ fontSize: "clamp(13px, 1.5vw, 15px)", color: "#6b7280", lineHeight: "1.85", marginBottom: "36px" }}>
              Wattsun.Ai is available around the clock, providing verified and structured guidance on solar
              installations, government subsidies, EV infrastructure, and energy ROI — for every state in India.
            </p>
            <div className="cta-btn-wrap">
              <button
                onClick={handleLaunchApp}
                style={{
                  backgroundColor: "#f59e0b", color: "#1a1a1a", border: "none",
                  borderRadius: "6px", padding: "15px 38px",
                  fontSize: "clamp(14px, 1.5vw, 15px)", fontWeight: "700",
                  fontFamily: "'Poppins', sans-serif", cursor: "pointer",
                  letterSpacing: "0.02em", transition: "all 0.2s",
                  boxShadow: "0 4px 16px rgba(245,158,11,0.35)",
                  width: "auto", maxWidth: "100%",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#d97706"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#f59e0b"; e.currentTarget.style.transform = "none"; }}
              >
                Launch Wattsun.Ai
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════ FOOTER ══════════════════════ */}
        <div style={{ backgroundColor: "#1b4332", padding: "22px 24px" }}>
          <div className="w-container" style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: "12px",
          }}>
            <span style={{ fontSize: "clamp(11px, 1.3vw, 13px)", color: "rgba(255,255,255,0.45)" }}>
              Wattsun.Ai — Developed in partnership with Swayog Energy for a sustainable energy future in India.
            </span>
            <span style={{ fontSize: "10px", color: "#fbbf24", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Poppins', sans-serif" }}>
              Intelligence · Accuracy · Accessibility
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WattsunAi;