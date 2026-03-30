import { useState } from "react";

const WattsunAi = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const handleLaunchApp = () => {
    window.open("https://wattsun-ai.vercel.app/", "_blank");
  };

  const features = [
    {
      number: "01",
      title: "Multi-Model AI Engine",
      description:
        "Intelligently routes each query to the most capable model — Gemini 1.5 Pro, Gemini 1.5 Flash, or Groq LLaMA 3 — balancing depth, speed, and precision for every response.",
    },
    {
      number: "02",
      title: "State-Aware Policy Intelligence",
      description:
        "Interprets and applies regional energy policies, DISCOM tariff structures, and subsidy eligibility rules specific to all 28 states and 8 Union Territories across India.",
    },
    {
      number: "03",
      title: "Voice-Enabled Consultations",
      description:
        "Integrates a native Text-to-Speech engine calibrated for Indian conversational pacing, enabling fully hands-free, accessible energy consultations in natural language.",
    },
    {
      number: "04",
      title: "Structured Response Format",
      description:
        "Delivers every answer in a consistent, audit-ready format — plain-language Explanation, supporting Data Table, Verified Government Source, and curated Video Reference.",
    },
    {
      number: "05",
      title: "Contextual Follow-Up Engine",
      description:
        "Analyses each completed response and surfaces the most relevant follow-up questions, guiding users along a logical advisory path without requiring them to formulate the next query.",
    },
    {
      number: "06",
      title: "Cross-Device Cloud Sync",
      description:
        "Powered by Firebase Firestore, all consultation history is synchronised in real time — ensuring continuity whether the user accesses the platform from mobile, tablet, or desktop.",
    },
    {
      number: "07",
      title: "One-Click PDF Export",
      description:
        "Generates a professionally formatted PDF report from any consultation session — structured for sharing with contractors, financial advisors, or government portal submissions.",
    },
    {
      number: "08",
      title: "Solar ROI Calculator",
      description:
        "Computes personalised Return on Investment projections using location, monthly consumption, rooftop area, applicable central and state subsidies, and current DISCOM buy-back rates.",
    },
  ];

  const pillars = [
    {
      label: "Educates",
      letter: "A",
      desc: "Translates highly technical concepts — net metering, LCOE, grid parity, and load forecasting — into clear, jargon-free guidance that any homeowner or business owner can act on.",
    },
    {
      label: "Advises",
      letter: "B",
      desc: "Provides personalised ROI projections, payback period analysis, and financing recommendations tailored to the user's location, consumption profile, and budget.",
    },
    {
      label: "Guides",
      letter: "C",
      desc: "Walks users through the complete installation process — from identifying eligible subsidies and empanelled vendors to filing applications on the PM Surya Ghar portal.",
    },
    {
      label: "Validates",
      letter: "D",
      desc: "Every piece of data is cross-referenced against official sources. Responses include direct links to MNRE, state nodal agencies, and DISCOM portals — never unverified blogs.",
    },
  ];

  const stats = [
    { value: "36",   label: "States and UTs Covered",  sub: "Pan-India Scope" },
    { value: "3",    label: "AI Models in Rotation",   sub: "Dynamic Multi-Model Routing" },
    { value: "8",    label: "Core Capabilities",       sub: "End-to-End Energy Advisory" },
    { value: "24/7", label: "Platform Availability",   sub: "Always On, No Downtime" },
  ];

  const trustBadges = [
    "MNRE Verified Data Sources",
    "Official Government Portal Links",
    "Serverless Cloud Architecture",
    "Firebase Real-Time Sync",
  ];

  const aimSections = [
    {
      badge: "Our Aim",
      badgeBg: "#dcfce7",
      badgeColor: "#166534",
      title: "Making Expert Energy Advisory Accessible to Every Indian",
      body: "India's transition to renewable energy holds enormous potential — but the path is obstructed by regulatory complexity, scattered information, and the high cost of professional consultation. Wattsun.Ai was built to remove those barriers. By combining advanced AI with deep domain expertise, we put the knowledge of a qualified solar energy consultant directly in the hands of homeowners, housing societies, MSMEs, and developers across the country — free of charge, around the clock.",
    },
    {
      badge: "Why We Built This",
      badgeBg: "#fef3c7",
      badgeColor: "#92400e",
      title: "India Needed a Centralised, Trustworthy Energy Intelligence Platform",
      body: "When Indian households and businesses explore rooftop solar, they encounter a fragmented landscape: subsidy schemes differ by state, DISCOM net-metering policies vary by utility, and reliable guidance is buried across dozens of government portals. Misinformation from vendors and unreliable blogs further erodes confidence. Wattsun.Ai was built as a single, verified, and structured advisory resource — one that draws exclusively from official government sources and translates policy into practical, personalised action.",
    },
  ];

  return (
    <div style={{ fontFamily: "sans-serif", backgroundColor: "#ffffff", color: "#1a1a1a", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Open+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { font-size: 18px; }

        .w-root { font-family: 'Open Sans', sans-serif; font-size: 1rem; line-height: 1.75; }
        .w-root h1, .w-root h2, .w-root h3, .w-root h4 { font-family: 'Poppins', sans-serif; }

        /* ── Layout ── */
        .w-container  { max-width: 1140px; margin: 0 auto; padding: 0 32px; }
        .w-section    { padding: 96px 32px; }
        .w-section-dark { padding: 96px 32px; background: #1b4332; position: relative; overflow: hidden; }

        /* ── Grids ── */
        .hero-grid     { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 64px; align-items: center; }
        .hero-trust    { margin-top: 48px; display: flex; gap: 28px; flex-wrap: wrap; }
        .aim-grid      { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
        .pillars-grid  { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(255,255,255,0.07); border-radius: 12px; overflow: hidden; }

        /* ── Cards ── */
        .pillar-card { border: 1.5px solid #e5e7eb; border-radius: 12px; padding: 36px 26px; transition: all 0.25s; cursor: default; }
        .pillar-card:hover { border-color: #16a34a; box-shadow: 0 10px 32px rgba(22,163,74,0.13); transform: translateY(-4px); }
        .feature-cell { padding: 36px 28px; transition: background-color 0.2s; cursor: default; }

        /* ── Badge ── */
        .badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 4px;
          margin-bottom: 18px;
          font-family: 'Poppins', sans-serif;
        }

        /* ── Buttons ── */
        .w-btn-primary {
          display: inline-block;
          background: #f59e0b;
          color: #1a1a1a;
          border: none;
          border-radius: 8px;
          padding: 16px 36px;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 12px rgba(245,158,11,0.3);
          font-family: 'Poppins', sans-serif;
        }
        .w-btn-primary:hover { background: #d97706; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(245,158,11,0.45); }

        .w-btn-outline {
          display: inline-block;
          background: transparent;
          color: #fff;
          border: 2px solid rgba(255,255,255,0.45);
          border-radius: 8px;
          padding: 16px 36px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Poppins', sans-serif;
        }
        .w-btn-outline:hover { background: rgba(255,255,255,0.09); border-color: rgba(255,255,255,0.7); }

        /* ── Divider ── */
        .section-divider { display: flex; align-items: center; gap: 18px; margin-bottom: 60px; }
        .sdl { flex: 1; height: 1px; background: #e5e7eb; }

        /* ── Stat rows ── */
        .stat-row { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; }
        .stat-row + .stat-row { border-top: 1px solid rgba(255,255,255,0.08); }

        /* ── TABLET (≤ 960px) ── */
        @media (max-width: 960px) {
          html { font-size: 17px; }
          .hero-grid     { grid-template-columns: 1fr; gap: 48px; }
          .aim-grid      { grid-template-columns: 1fr; gap: 48px; }
          .pillars-grid  { grid-template-columns: repeat(2, 1fr); }
          .features-grid { grid-template-columns: repeat(2, 1fr); }
          .features-header { flex-direction: column !important; gap: 10px; align-items: flex-start !important; }
        }

        /* ── MOBILE (≤ 600px) ── */
        @media (max-width: 600px) {
          html { font-size: 16px; }
          .w-section      { padding: 64px 20px; }
          .w-section-dark { padding: 64px 20px; }
          .w-container    { padding: 0 20px; }
          .hero-grid, .aim-grid { grid-template-columns: 1fr; gap: 36px; }
          .pillars-grid   { grid-template-columns: 1fr; gap: 16px; }
          .features-grid  { grid-template-columns: 1fr; }
          .hero-trust     { gap: 16px; }
          .hero-btns      { flex-direction: column !important; }
          .hero-btns button { width: 100% !important; text-align: center; }
          .stats-panel    { padding: 26px 22px !important; }
          .cta-btn-wrap button { width: 100% !important; }
        }
      `}</style>

      <div className="w-root">

        {/* ══════════════ HERO ══════════════ */}
        <div style={{
          background: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 55%, #1b4332 100%)",
          position: "relative", overflow: "hidden", padding: "96px 32px 84px",
        }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(255,255,255,0.03) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(255,255,255,0.03) 60px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.13) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div className="w-container" style={{ position: "relative" }}>

            {/* Top label badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", backgroundColor: "rgba(251,191,36,0.14)", border: "1px solid rgba(251,191,36,0.32)", borderRadius: "5px", padding: "8px 16px", marginBottom: "32px" }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#fbbf24", flexShrink: 0 }} />
              <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fbbf24", fontFamily: "'Poppins', sans-serif" }}>
                AI-Powered Solar Intelligence Platform — India
              </span>
            </div>

            <div className="hero-grid">
              {/* Left */}
              <div>
                <h1 style={{ fontSize: "clamp(44px, 6.5vw, 72px)", fontWeight: "800", lineHeight: "1.06", color: "#fff", marginBottom: "20px", letterSpacing: "-0.025em" }}>
                  Wattsun<span style={{ color: "#fbbf24" }}>.Ai</span>
                </h1>
                <p style={{ fontSize: "clamp(18px, 2.2vw, 22px)", lineHeight: "1.55", color: "rgba(255,255,255,0.88)", marginBottom: "14px", fontWeight: "600" }}>
                  India's Most Comprehensive Solar and EV Intelligence Platform
                </p>
                <p style={{ fontSize: "clamp(15px, 1.7vw, 17px)", lineHeight: "1.9", color: "rgba(255,255,255,0.55)", marginBottom: "40px" }}>
                  Wattsun.Ai delivers the depth and accuracy of a qualified energy consultant through a
                  voice-enabled, AI-powered platform — covering rooftop solar, grid regulations, government
                  subsidies, and Electric Vehicle infrastructure for every state and Union Territory in India.
                </p>
                <div className="hero-btns" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <button className="w-btn-primary" onClick={handleLaunchApp}>Launch Wattsun.Ai</button>
                  <button className="w-btn-outline" onClick={() => document.getElementById('platform-capabilities')?.scrollIntoView({ behavior: 'smooth' })}>Explore Platform Features</button>
                </div>
              </div>

              {/* Stats panel */}
              <div className="stats-panel" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "36px 32px", backdropFilter: "blur(8px)" }}>
                <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.18em", textTransform: "uppercase", color: "#fbbf24", marginBottom: "20px", fontFamily: "'Poppins', sans-serif", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "16px" }}>
                  Platform at a Glance
                </div>
                {stats.map((stat, i) => (
                  <div className="stat-row" key={i}>
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: "500", color: "rgba(255,255,255,0.75)" }}>{stat.label}</div>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.32)", marginTop: "3px" }}>{stat.sub}</div>
                    </div>
                    <div style={{ fontSize: "clamp(28px, 4vw, 38px)", fontWeight: "800", color: "#fbbf24", fontFamily: "'Poppins', sans-serif" }}>{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="hero-trust">
              {trustBadges.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <div style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: "white", fontSize: "10px", fontWeight: "800" }}>✓</span>
                  </div>
                  <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", fontWeight: "500" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Amber stripe */}
        <div style={{ height: "5px", backgroundColor: "#f59e0b" }} />

        {/* ══════════════ AIM & MOTIVATION ══════════════ */}
        <div className="w-section" style={{ backgroundColor: "#f8fdf9" }}>
          <div className="w-container">
            <div className="section-divider">
              <div className="sdl" />
              <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.18em", textTransform: "uppercase", color: "#16a34a", whiteSpace: "nowrap", fontFamily: "'Poppins', sans-serif" }}>Mission and Purpose</span>
              <div className="sdl" />
            </div>
            <div className="aim-grid">
              {aimSections.map((s, i) => (
                <div key={i}>
                  <span className="badge" style={{ backgroundColor: s.badgeBg, color: s.badgeColor }}>{s.badge}</span>
                  <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: "700", color: "#1b4332", lineHeight: "1.28", marginBottom: "20px" }}>{s.title}</h2>
                  <p style={{ fontSize: "clamp(15px, 1.6vw, 17px)", lineHeight: "1.9", color: "#4b5563" }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════ PURPOSE PILLARS ══════════════ */}
        <div className="w-section" style={{ backgroundColor: "#ffffff" }}>
          <div className="w-container">
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <span className="badge" style={{ backgroundColor: "#dcfce7", color: "#166534" }}>Four Service Dimensions</span>
              <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: "700", color: "#1b4332", lineHeight: "1.2", marginBottom: "16px" }}>
                What Wattsun.Ai Does for You
              </h2>
              <p style={{ fontSize: "clamp(15px, 1.7vw, 17px)", color: "#6b7280", maxWidth: "580px", margin: "0 auto", lineHeight: "1.8" }}>
                From first inquiry to final installation, Wattsun.Ai supports every stage of your renewable
                energy journey across four core service functions.
              </p>
            </div>
            <div className="pillars-grid">
              {pillars.map((p, i) => (
                <div key={i} className="pillar-card">
                  <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px", fontSize: "17px", fontWeight: "800", color: "#16a34a", fontFamily: "'Poppins', sans-serif" }}>{p.letter}</div>
                  <h3 style={{ fontSize: "clamp(16px, 1.8vw, 18px)", fontWeight: "700", color: "#1b4332", marginBottom: "12px" }}>{p.label}</h3>
                  <p style={{ fontSize: "clamp(14px, 1.4vw, 15px)", lineHeight: "1.82", color: "#6b7280" }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════ FEATURES ══════════════ */}
        <div id="platform-capabilities" className="w-section-dark">
          <div style={{ position: "absolute", bottom: "-140px", left: "-140px", width: "460px", height: "460px", borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div className="w-container" style={{ position: "relative" }}>
            <div className="features-header" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "44px" }}>
              <div>
                <span className="badge" style={{ backgroundColor: "rgba(251,191,36,0.14)", color: "#fbbf24" }}>Platform Capabilities</span>
                <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: "700", color: "#fff", lineHeight: "1.2", margin: 0 }}>
                  Eight Capabilities, One Platform
                </h2>
              </div>
              <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.32)", marginBottom: "4px", textAlign: "right" }}>
                Designed for India's<br />Energy Transition
              </span>
            </div>

            <div className="features-grid">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="feature-cell"
                  onMouseEnter={() => setHoveredFeature(i)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  style={{ backgroundColor: hoveredFeature === i ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.025)" }}
                >
                  <div style={{ fontSize: "11px", fontWeight: "700", color: hoveredFeature === i ? "#fbbf24" : "rgba(255,255,255,0.25)", fontFamily: "'Poppins', sans-serif", marginBottom: "13px", letterSpacing: "0.14em", transition: "color 0.2s" }}>{f.number}</div>
                  <h3 style={{ fontSize: "clamp(14px, 1.5vw, 16px)", fontWeight: "700", color: hoveredFeature === i ? "#fbbf24" : "#e5e7eb", marginBottom: "10px", lineHeight: "1.38", transition: "color 0.2s" }}>{f.title}</h3>
                  <p style={{ fontSize: "clamp(13px, 1.3vw, 14px)", lineHeight: "1.82", color: "rgba(255,255,255,0.5)" }}>{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════ CTA ══════════════ */}
        <div className="w-section" style={{ backgroundColor: "#f8fdf9", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center", padding: "0 20px" }}>
            <span className="badge" style={{ backgroundColor: "#dcfce7", color: "#166534" }}>Begin Your Energy Consultation</span>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: "700", color: "#1b4332", lineHeight: "1.2", marginBottom: "20px" }}>
              Get Expert Solar and EV Guidance — at Absolutely No Cost
            </h2>
            <p style={{ fontSize: "clamp(15px, 1.6vw, 17px)", color: "#6b7280", lineHeight: "1.9", marginBottom: "40px" }}>
              Whether you are evaluating a rooftop solar installation, calculating your eligibility for a PM Surya
              Ghar subsidy, or researching EV charging infrastructure for your property, Wattsun.Ai provides
              accurate, verified, and personalised guidance — for every state in India, every hour of the day.
            </p>
            <div className="cta-btn-wrap">
              <button
                onClick={handleLaunchApp}
                style={{ backgroundColor: "#f59e0b", color: "#1a1a1a", border: "none", borderRadius: "8px", padding: "17px 44px", fontSize: "17px", fontWeight: "700", fontFamily: "'Poppins', sans-serif", cursor: "pointer", letterSpacing: "0.02em", transition: "all 0.2s", boxShadow: "0 4px 18px rgba(245,158,11,0.35)" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#d97706"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#f59e0b"; e.currentTarget.style.transform = "none"; }}
              >
                Launch Wattsun.Ai — Free Access
              </button>
            </div>
            <p style={{ marginTop: "18px", fontSize: "14px", color: "#9ca3af", letterSpacing: "0.02em" }}>
              No registration required &nbsp;·&nbsp; No consultation fee &nbsp;·&nbsp; All 36 states and UTs covered
            </p>
          </div>
        </div>

        {/* ══════════════ FOOTER ══════════════ */}
        <div style={{ backgroundColor: "#1b4332", padding: "28px 32px" }}>
          <div className="w-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
            <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.42)", lineHeight: "1.65", maxWidth: "680px" }}>
              Wattsun.Ai is an AI-powered advisory platform developed in partnership with Swayog Energy Private Limited,
              dedicated to accelerating India's transition to clean, affordable energy.
            </span>
            <span style={{ fontSize: "11px", color: "#fbbf24", fontWeight: "700", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "'Poppins', sans-serif", flexShrink: 0 }}>
              Intelligence · Accuracy · Accessibility
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WattsunAi;