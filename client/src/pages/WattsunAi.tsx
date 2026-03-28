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

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#ffffff", color: "#1a1a1a", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .w-root { font-family: 'Open Sans', sans-serif; }
        .w-root h1, .w-root h2, .w-root h3 { font-family: 'Poppins', sans-serif; }
        .pillar-card { border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 32px 24px; transition: all 0.2s; cursor: default; }
        .pillar-card:hover { border-color: #16a34a; box-shadow: 0 8px 24px rgba(22,163,74,0.12); transform: translateY(-3px); }
      `}</style>

      <div className="w-root">

        {/* HERO */}
        <div style={{ background: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 55%, #1b4332 100%)", position: "relative", overflow: "hidden", padding: "90px 40px 80px" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.03) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.03) 60px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.35)", borderRadius: "4px", padding: "6px 14px", marginBottom: "28px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#fbbf24", flexShrink: 0 }} />
              <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fbbf24", fontFamily: "'Poppins', sans-serif" }}>AI-Powered Solar Intelligence Platform</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
              <div>
                <h1 style={{ fontSize: "clamp(40px, 5.5vw, 64px)", fontWeight: "800", lineHeight: "1.08", color: "#ffffff", marginBottom: "18px", letterSpacing: "-0.025em" }}>
                  Wattsun<span style={{ color: "#fbbf24" }}>.Ai</span>
                </h1>
                <p style={{ fontSize: "18px", lineHeight: "1.6", color: "rgba(255,255,255,0.85)", marginBottom: "8px", fontWeight: "600" }}>The Intelligent Solar Energy Expert</p>
                <p style={{ fontSize: "15px", lineHeight: "1.8", color: "rgba(255,255,255,0.58)", marginBottom: "40px" }}>
                  A voice-powered AI consultant specialising in India's renewable energy landscape, electrical systems, and Electric Vehicle infrastructure — available 24 hours a day, 7 days a week.
                </p>
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <button
                    onClick={handleLaunchApp}
                    onMouseEnter={() => setLaunchHover(true)}
                    onMouseLeave={() => setLaunchHover(false)}
                    style={{ backgroundColor: launchHover ? "#d97706" : "#f59e0b", color: "#1a1a1a", border: "none", borderRadius: "6px", padding: "14px 30px", fontSize: "14px", fontWeight: "700", fontFamily: "'Poppins', sans-serif", cursor: "pointer", letterSpacing: "0.03em", transition: "all 0.2s", transform: launchHover ? "translateY(-1px)" : "none", boxShadow: launchHover ? "0 6px 20px rgba(245,158,11,0.45)" : "0 2px 10px rgba(245,158,11,0.3)" }}
                  >
                    Launch Wattsun.Ai
                  </button>
                  <button
                    onMouseEnter={() => setOutlineHover(true)}
                    onMouseLeave={() => setOutlineHover(false)}
                    style={{ backgroundColor: outlineHover ? "rgba(255,255,255,0.08)" : "transparent", color: "#ffffff", border: "1.5px solid rgba(255,255,255,0.45)", borderRadius: "6px", padding: "14px 30px", fontSize: "14px", fontWeight: "600", fontFamily: "'Poppins', sans-serif", cursor: "pointer", letterSpacing: "0.02em", transition: "all 0.2s" }}
                  >
                    Explore Features
                  </button>
                </div>
              </div>

              {/* Stats panel */}
              <div style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.11)", borderRadius: "12px", padding: "36px", backdropFilter: "blur(8px)" }}>
                <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.16em", textTransform: "uppercase", color: "#fbbf24", marginBottom: "22px", fontFamily: "'Poppins', sans-serif" }}>Platform at a Glance</div>
                {[
                  { value: "36", label: "States and UTs Covered", sub: "Pan-India Scope" },
                  { value: "3", label: "AI Models", sub: "Multi-Model Routing" },
                  { value: "8", label: "Core Capabilities", sub: "End-to-End Advisory" },
                  { value: "24/7", label: "Availability", sub: "Always On" },
                ].map((stat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                    <div>
                      <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>{stat.label}</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.32)", marginTop: "2px" }}>{stat.sub}</div>
                    </div>
                    <div style={{ fontSize: "30px", fontWeight: "800", color: "#fbbf24", fontFamily: "'Poppins', sans-serif" }}>{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div style={{ marginTop: "48px", display: "flex", gap: "30px", flexWrap: "wrap" }}>
              {["MNRE Verified Data", "Government Portal Links", "Serverless Architecture", "Firebase Cloud Sync"].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "16px", height: "16px", borderRadius: "50%", backgroundColor: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: "white", fontSize: "10px", fontWeight: "700" }}>✓</span>
                  </div>
                  <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", fontWeight: "500" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AMBER STRIPE */}
        <div style={{ height: "4px", backgroundColor: "#f59e0b" }} />

        {/* AIM & MOTIVATION */}
        <div style={{ backgroundColor: "#f8fdf9", padding: "80px 40px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
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
            ].map((section, i) => (
              <div key={i}>
                <div style={{ display: "inline-block", backgroundColor: section.badgeBg, color: section.badgeColor, fontSize: "10px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", padding: "5px 12px", borderRadius: "4px", marginBottom: "18px", fontFamily: "'Poppins', sans-serif" }}>{section.badge}</div>
                <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#1b4332", lineHeight: "1.28", marginBottom: "18px" }}>{section.title}</h2>
                <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#4b5563" }}>{section.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PURPOSE PILLARS */}
        <div style={{ backgroundColor: "#ffffff", padding: "80px 40px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "52px" }}>
              <div style={{ display: "inline-block", backgroundColor: "#dcfce7", color: "#166534", fontSize: "10px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", padding: "5px 12px", borderRadius: "4px", marginBottom: "16px", fontFamily: "'Poppins', sans-serif" }}>Core Purpose</div>
              <h2 style={{ fontSize: "34px", fontWeight: "700", color: "#1b4332", lineHeight: "1.2", marginBottom: "12px" }}>A 24/7 Virtual Energy Consultant</h2>
              <p style={{ fontSize: "16px", color: "#6b7280", maxWidth: "520px", margin: "0 auto", lineHeight: "1.7" }}>Wattsun.Ai operates across four service dimensions to deliver comprehensive renewable energy guidance.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px" }}>
              {pillars.map((p, i) => (
                <div key={i} className="pillar-card">
                  <div style={{ width: "38px", height: "38px", borderRadius: "8px", backgroundColor: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", fontSize: "15px", fontWeight: "800", color: "#16a34a", fontFamily: "'Poppins', sans-serif" }}>{p.letter}</div>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1b4332", marginBottom: "10px" }}>{p.label}</h3>
                  <p style={{ fontSize: "13px", lineHeight: "1.78", color: "#6b7280" }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FEATURES GRID */}
        <div style={{ backgroundColor: "#1b4332", padding: "80px 40px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", bottom: "-120px", left: "-120px", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.09) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "44px" }}>
              <div>
                <div style={{ display: "inline-block", backgroundColor: "rgba(251,191,36,0.14)", color: "#fbbf24", fontSize: "10px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", padding: "5px 12px", borderRadius: "4px", marginBottom: "14px", fontFamily: "'Poppins', sans-serif" }}>Platform Capabilities</div>
                <h2 style={{ fontSize: "34px", fontWeight: "700", color: "#ffffff", lineHeight: "1.2", margin: 0 }}>8 Core Features</h2>
              </div>
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "4px" }}>Built for India's Energy Transition</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", backgroundColor: "rgba(255,255,255,0.07)", borderRadius: "10px", overflow: "hidden" }}>
              {features.map((f, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredFeature(i)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  style={{ backgroundColor: hoveredFeature === i ? "rgba(245,158,11,0.11)" : "rgba(255,255,255,0.03)", padding: "28px 22px", transition: "background-color 0.2s", cursor: "default" }}
                >
                  <div style={{ fontSize: "10px", fontWeight: "700", color: hoveredFeature === i ? "#fbbf24" : "rgba(255,255,255,0.28)", fontFamily: "'Poppins', sans-serif", marginBottom: "12px", letterSpacing: "0.1em", transition: "color 0.2s" }}>{f.number}</div>
                  <h3 style={{ fontSize: "13.5px", fontWeight: "700", color: hoveredFeature === i ? "#fbbf24" : "#e5e7eb", marginBottom: "9px", lineHeight: "1.35", transition: "color 0.2s" }}>{f.title}</h3>
                  <p style={{ fontSize: "12px", lineHeight: "1.75", color: "rgba(255,255,255,0.48)" }}>{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ backgroundColor: "#f8fdf9", padding: "80px 40px", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-block", backgroundColor: "#dcfce7", color: "#166534", fontSize: "10px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", padding: "5px 12px", borderRadius: "4px", marginBottom: "22px", fontFamily: "'Poppins', sans-serif" }}>Begin Your Consultation</div>
            <h2 style={{ fontSize: "36px", fontWeight: "700", color: "#1b4332", lineHeight: "1.22", marginBottom: "16px" }}>Access Expert Solar and EV Guidance — at No Cost</h2>
            <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: "1.8", marginBottom: "38px" }}>
              Wattsun.Ai is available around the clock, providing verified and structured guidance on solar installations, government subsidies, EV infrastructure, and energy ROI — for every state in India.
            </p>
            <button
              onClick={handleLaunchApp}
              style={{ backgroundColor: "#f59e0b", color: "#1a1a1a", border: "none", borderRadius: "6px", padding: "15px 38px", fontSize: "15px", fontWeight: "700", fontFamily: "'Poppins', sans-serif", cursor: "pointer", letterSpacing: "0.02em", transition: "all 0.2s", boxShadow: "0 4px 16px rgba(245,158,11,0.35)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#d97706"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#f59e0b"; e.currentTarget.style.transform = "none"; }}
            >
              Launch Wattsun.Ai
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ backgroundColor: "#1b4332", padding: "22px 40px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>Wattsun.Ai — Developed in partnership with Swayog Energy for a sustainable energy future in India.</span>
            <span style={{ fontSize: "10px", color: "#fbbf24", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Poppins', sans-serif" }}>Intelligence · Accuracy · Accessibility</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WattsunAi;