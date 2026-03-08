"use client";
import { useState, useEffect, useRef } from "react";

const destinations = [
  { name: "Dubai & UAE", flag: "🇦🇪", type: "eVisa", days: "3–5", price: "₹2,499", popular: true },
  { name: "Thailand", flag: "🇹🇭", type: "eVisa", days: "5–7", price: "₹1,899", popular: true },
  { name: "Singapore", flag: "🇸🇬", type: "eVisa", days: "3–5", price: "₹3,299", popular: true },
  { name: "United Kingdom", flag: "🇬🇧", type: "Sticker", days: "15–20", price: "₹9,499", popular: false },
  { name: "France / Schengen", flag: "🇫🇷", type: "Sticker", days: "15–20", price: "₹8,999", popular: true },
  { name: "Japan", flag: "🇯🇵", type: "Sticker", days: "10–15", price: "₹4,299", popular: false },
  { name: "Malaysia", flag: "🇲🇾", type: "Free", days: "Instant", price: "Free", popular: false },
  { name: "USA", flag: "🇺🇸", type: "Sticker", days: "30–60", price: "₹12,999", popular: false },
  { name: "Australia", flag: "🇦🇺", type: "eVisa", days: "7–10", price: "₹7,499", popular: false },
  { name: "Canada", flag: "🇨🇦", type: "Sticker", days: "30–60", price: "₹11,499", popular: false },
  { name: "Indonesia / Bali", flag: "🇮🇩", type: "VOA", days: "Instant", price: "₹1,299", popular: false },
  { name: "Vietnam", flag: "🇻🇳", type: "eVisa", days: "3–5", price: "₹1,599", popular: false },
];

const steps = [
  { n: "01", icon: "✈", title: "Pick your destination", body: "Search from 50+ countries. We show you exact documents, fees, and processing time upfront — no surprises." },
  { n: "02", icon: "📋", title: "Upload your documents", body: "Our smart checklist tells you exactly what to submit. Upload from your phone or computer in minutes." },
  { n: "03", icon: "💳", title: "Pay securely", body: "UPI, cards, net banking — all accepted. Government fee + our service charge, clearly shown before you pay." },
  { n: "04", icon: "🛂", title: "Receive your visa", body: "Track your application live. Get notified by WhatsApp and email. Most eVisas delivered in 3–5 working days." },
];

const stats = [
  { value: "50,000+", label: "Visas Processed" },
  { value: "50+", label: "Countries Covered" },
  { value: "98.7%", label: "Approval Rate" },
  { value: "4.9★", label: "Customer Rating" },
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof destinations>([]);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) { setResults(destinations.filter(d => d.popular)); return; }
    setResults(destinations.filter(d => d.name.toLowerCase().includes(q)));
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const badgeColor = (type: string) => {
    if (type === "eVisa") return { bg: "rgba(46,204,139,0.12)", color: "#2ECC8B", border: "rgba(46,204,139,0.3)" };
    if (type === "Free" || type === "VOA") return { bg: "rgba(212,175,106,0.12)", color: "#D4AF6A", border: "rgba(212,175,106,0.3)" };
    return { bg: "rgba(74,143,232,0.12)", color: "#4A8FE8", border: "rgba(74,143,232,0.3)" };
  };

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#08080F", color: "#F5F0E8", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,500;0,600;1,300;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: rgba(212,175,106,0.3); color: #F5F0E8; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #08080F; }
        ::-webkit-scrollbar-thumb { background: #3A3A4E; border-radius: 2px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes shimmer { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes gradientShift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .hero-title { animation: fadeUp 0.9s ease both; }
        .hero-sub { animation: fadeUp 0.9s 0.15s ease both; }
        .hero-search { animation: fadeUp 0.9s 0.3s ease both; }
        .hero-stats { animation: fadeUp 0.9s 0.45s ease both; }
        .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.5); border-color: rgba(212,175,106,0.4) !important; }
        .gold-btn { background: linear-gradient(135deg, #D4AF6A, #E8C977); color: #08080F; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s; letter-spacing: 0.5px; }
        .gold-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(212,175,106,0.35); }
        .result-row { transition: background 0.15s; cursor: pointer; }
        .result-row:hover { background: rgba(212,175,106,0.06) !important; }
        .step-card { transition: transform 0.3s ease; }
        .step-card:hover { transform: translateY(-6px); }
        .nav-link { transition: color 0.15s; }
        .nav-link:hover { color: #D4AF6A !important; }
        .grain { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
      `}</style>

      {/* Grain overlay */}
      <div className="grain" />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 40px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(8,8,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,175,106,0.12)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg, #D4AF6A, #E8C977)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✈</div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 18, fontWeight: 600, color: "#D4AF6A", lineHeight: 1 }}>mytriplooker</div>
            <div style={{ fontSize: 9, color: "#8A8A9A", letterSpacing: "2px", textTransform: "uppercase" }}>visa services</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {([["/checklist", "Destinations"], ["#how-it-works", "How It Works"], ["/track", "Track Application"]] as [string,string][]).map(([href, l]) => (
            <a key={l} className="nav-link" href={href} style={{ fontSize: 13, color: "#8A8A9A", textDecoration: "none", fontWeight: 500 }}>{l}</a>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <a href="/login" style={{ background: "transparent", border: "1px solid rgba(212,175,106,0.3)", color: "#D4AF6A", padding: "8px 20px", borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif", textDecoration: "none", display: "inline-block" }}>
            Sign In
          </a>
          <a href="/apply" className="gold-btn" style={{ padding: "8px 20px", borderRadius: 7, fontSize: 13, fontFamily: "'Outfit', sans-serif", textDecoration: "none", display: "inline-block" }}>
            Apply Now
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px", overflow: "hidden" }}>
        {/* Background glow */}
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 700, height: 700, background: "radial-gradient(ellipse, rgba(212,175,106,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "10%", left: "15%", width: 300, height: 300, background: "radial-gradient(ellipse, rgba(74,143,232,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "30%", right: "10%", width: 200, height: 200, background: "radial-gradient(ellipse, rgba(46,204,139,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Floating flag decorations */}
        {["🇦🇪", "🇫🇷", "🇯🇵", "🇸🇬", "🇬🇧"].map((flag, i) => (
          <div key={i} style={{
            position: "absolute", fontSize: 28, opacity: 0.15,
            top: `${[20, 35, 60, 25, 70][i]}%`,
            left: `${[8, 88, 5, 92, 85][i]}%`,
            animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}>{flag}</div>
        ))}

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 780, width: "100%" }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,175,106,0.08)", border: "1px solid rgba(212,175,106,0.2)", borderRadius: 50, padding: "6px 16px", marginBottom: 32, animation: "fadeIn 0.6s ease both" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2ECC8B", animation: "shimmer 2s infinite" }} />
            <span style={{ fontSize: 12, color: "#D4AF6A", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>Trusted by 50,000+ Indian travellers</span>
          </div>

          {/* Headline */}
          <h1 className="hero-title" style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 300, lineHeight: 1.05, color: "#F5F0E8", marginBottom: 20, letterSpacing: "-1px" }}>
            Your Visa,{" "}
            <em style={{ color: "#D4AF6A", fontStyle: "italic", fontWeight: 400 }}>Handled.</em>
          </h1>

          <p className="hero-sub" style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "#8A8A9A", lineHeight: 1.7, marginBottom: 48, fontWeight: 300, maxWidth: 560, margin: "0 auto 48px" }}>
            Embassy-accurate document checklists. Expert processing. Real-time tracking. For Indian passport holders flying worldwide.
          </p>

          {/* Search */}
          <div className="hero-search" ref={dropRef} style={{ position: "relative", maxWidth: 580, margin: "0 auto 56px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 0,
              background: "#141420", border: "1px solid rgba(212,175,106,0.25)",
              borderRadius: 14, overflow: "visible",
              boxShadow: "0 0 0 1px rgba(212,175,106,0.05), 0 24px 60px rgba(0,0,0,0.4)",
            }}>
              <div style={{ padding: "0 18px", fontSize: 18 }}>🔍</div>
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setOpen(true)}
                placeholder="Where are you travelling to?"
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  color: "#F5F0E8", fontSize: 16, padding: "18px 0",
                  fontFamily: "'Outfit', sans-serif", fontWeight: 400,
                }}
              />
              <a href="/checklist" className="gold-btn" style={{ margin: 6, padding: "12px 28px", borderRadius: 10, fontSize: 14, fontFamily: "'Outfit', sans-serif", flexShrink: 0, textDecoration: "none", display: "inline-block" }}>
                Check Visa →
              </a>
            </div>

            {/* Dropdown */}
            {open && (
              <div style={{
                position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
                background: "#141420", border: "1px solid rgba(212,175,106,0.2)",
                borderRadius: 12, overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0,0,0,0.6)", zIndex: 200,
                animation: "fadeUp 0.2s ease both",
              }}>
                <div style={{ padding: "10px 16px 6px", fontSize: 10, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#3A3A4E" }}>
                  {query ? `${results.length} result${results.length !== 1 ? "s" : ""}` : "Popular Destinations"}
                </div>
                {results.length === 0 && (
                  <div style={{ padding: "20px 16px", textAlign: "center", color: "#8A8A9A", fontSize: 14 }}>No destinations found</div>
                )}
                {results.map((d, i) => {
                  const b = badgeColor(d.type);
                  return (
                    <div key={i} className="result-row" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.03)" }}
                      onClick={() => { setQuery(d.name); setOpen(false); }}>
                      <span style={{ fontSize: 24, flexShrink: 0 }}>{d.flag}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#F5F0E8" }}>{d.name}</div>
                        <div style={{ fontSize: 12, color: "#8A8A9A", marginTop: 2 }}>{d.days} working days</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, background: b.bg, color: b.color, border: `1px solid ${b.border}`, padding: "3px 8px", borderRadius: 4 }}>{d.type}</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#D4AF6A" }}>{d.price}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 28, fontWeight: 600, color: "#D4AF6A", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#8A8A9A", marginTop: 4, letterSpacing: "0.5px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR DESTINATIONS ── */}
      <section style={{ padding: "80px 40px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#D4AF6A", marginBottom: 12 }}>Where Indians Are Flying</div>
            <h2 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, color: "#F5F0E8", lineHeight: 1.1 }}>
              Popular <em style={{ color: "#D4AF6A", fontStyle: "italic" }}>Destinations</em>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            {destinations.filter(d => d.popular).map((d, i) => {
              const b = badgeColor(d.type);
              return (
                <div key={i} className="card-hover" style={{
                  background: "#141420", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 14, padding: "24px", cursor: "pointer",
                  animation: `fadeUp 0.5s ${i * 0.08}s ease both`,
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ fontSize: 36 }}>{d.flag}</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 15, color: "#F5F0E8" }}>{d.name}</div>
                        <div style={{ fontSize: 11, color: "#8A8A9A", marginTop: 2 }}>{d.days} working days</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, background: b.bg, color: b.color, border: `1px solid ${b.border}`, padding: "3px 8px", borderRadius: 4, flexShrink: 0 }}>{d.type}</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <div>
                      <div style={{ fontSize: 11, color: "#8A8A9A" }}>Starting from</div>
                      <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 22, fontWeight: 600, color: "#D4AF6A" }}>{d.price}</div>
                    </div>
                    <a href="/apply" style={{ background: "rgba(212,175,106,0.08)", border: "1px solid rgba(212,175,106,0.2)", color: "#D4AF6A", padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "all 0.15s", textDecoration: "none", display: "inline-block" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(212,175,106,0.16)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(212,175,106,0.08)"; }}>
                      Apply →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: "center", marginTop: 36 }}>
            <a href="/checklist" style={{ background: "transparent", border: "1px solid rgba(212,175,106,0.25)", color: "#D4AF6A", padding: "12px 32px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "all 0.2s", textDecoration: "none", display: "inline-block" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(212,175,106,0.6)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(212,175,106,0.25)"; }}>
              View All 50+ Countries →
            </a>
          </div>
        </div>
      </section>

      {/* ── GOLD DIVIDER ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(212,175,106,0.3), transparent)" }} />
      </div>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#D4AF6A", marginBottom: 12 }}>Simple & Transparent</div>
            <h2 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, color: "#F5F0E8" }}>
              Visa in <em style={{ color: "#D4AF6A", fontStyle: "italic" }}>4 Steps</em>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {steps.map((s, i) => (
              <div key={i} className="step-card" style={{
                background: "#141420", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16, padding: "32px 24px", position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 16, right: 20, fontFamily: "'Cormorant Garant', serif", fontSize: 48, fontWeight: 600, color: "rgba(212,175,106,0.06)", lineHeight: 1, userSelect: "none" }}>{s.n}</div>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: "#F5F0E8", marginBottom: 10, lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "#8A8A9A", lineHeight: 1.7 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BANNER ── */}
      <section style={{ padding: "60px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ background: "linear-gradient(135deg, #141420 0%, #1A1A28 100%)", border: "1px solid rgba(212,175,106,0.2)", borderRadius: 20, padding: "48px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, color: "#F5F0E8", marginBottom: 12, lineHeight: 1.1 }}>
                Ready to travel?<br />
                <em style={{ color: "#D4AF6A" }}>We'll handle the paperwork.</em>
              </h2>
              <p style={{ fontSize: 14, color: "#8A8A9A", lineHeight: 1.6, maxWidth: 420 }}>
                Join 50,000+ Indian travellers who trust mytriplooker for stress-free visa processing. Embassy-accurate. Expert reviewed. Always on time.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
              <a href="/apply" className="gold-btn" style={{ padding: "16px 40px", borderRadius: 10, fontSize: 15, fontFamily: "'Outfit', sans-serif", whiteSpace: "nowrap", textDecoration: "none", display: "inline-block" }}>
                Start My Application →
              </a>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {["🔒 100% Secure", "✓ Expert Review", "📱 WhatsApp Updates"].map(t => (
                  <span key={t} style={{ fontSize: 12, color: "#8A8A9A" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px 40px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 7, background: "linear-gradient(135deg, #D4AF6A, #E8C977)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✈</div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 16, fontWeight: 600, color: "#D4AF6A" }}>mytriplooker</div>
              <div style={{ fontSize: 9, color: "#3A3A4E", letterSpacing: "1.5px", textTransform: "uppercase" }}>visa services</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service", "Contact Us", "Track Application"].map(l => (
              <a key={l} href="#" style={{ fontSize: 12, color: "#3A3A4E", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = "#8A8A9A"; }}
                onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = "#3A3A4E"; }}>{l}</a>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#3A3A4E" }}>© 2025 mytriplooker. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}