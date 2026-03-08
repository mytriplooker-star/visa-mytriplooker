"use client";
import { useState } from "react";
import { COUNTRIES, getCountryBySlug, getTotalFee, formatINR, CATEGORY_LABELS, CATEGORY_ICONS, type Country, type VisaType, type DocCategory } from "@/lib/visaData";

// ── Demo: show UAE by default ─────────────────────────────────────────────
const DEFAULT_SLUG = "uae";

export default function ChecklistPage() {
  const country = getCountryBySlug(DEFAULT_SLUG)!;
  const [selectedVisaId, setSelectedVisaId] = useState(country.visaTypes[0].id);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<DocCategory | "all">("all");

  const visaType = country.visaTypes.find(v => v.id === selectedVisaId)!;
  const totalFee = getTotalFee(visaType);
  const docs = visaType.documents.filter(d => activeCategory === "all" || d.category === activeCategory);
  const requiredDocs = visaType.documents.filter(d => d.required);
  const checkedRequired = requiredDocs.filter(d => checked[d.id]).length;
  const progress = requiredDocs.length ? Math.round((checkedRequired / requiredDocs.length) * 100) : 0;

  const categories = [...new Set(visaType.documents.map(d => d.category))] as DocCategory[];

  const toggleCheck = (id: string) => setChecked(p => ({ ...p, [id]: !p[id] }));
  const toggleExpand = (id: string) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  const badgeStyle = (type: string) => {
    if (type === "evisa") return { bg: "rgba(46,204,139,0.12)", color: "#2ECC8B", border: "rgba(46,204,139,0.3)", label: "eVisa" };
    if (type === "voa") return { bg: "rgba(212,175,106,0.12)", color: "#D4AF6A", border: "rgba(212,175,106,0.3)", label: "Visa on Arrival" };
    return { bg: "rgba(74,143,232,0.12)", color: "#4A8FE8", border: "rgba(74,143,232,0.3)", label: "Sticker Visa" };
  };

  const badge = badgeStyle(visaType.type);

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#08080F", color: "#F5F0E8", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,500;0,600;1,300;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #08080F; } ::-webkit-scrollbar-thumb { background: #3A3A4E; border-radius: 2px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes checkPop { 0% { transform: scale(0); } 60% { transform: scale(1.2); } 100% { transform: scale(1); } }
        .doc-card { transition: border-color 0.2s, background 0.2s; }
        .doc-card:hover { border-color: rgba(212,175,106,0.3) !important; }
        .cat-pill { transition: all 0.15s; cursor: pointer; }
        .cat-pill:hover { border-color: rgba(212,175,106,0.4) !important; }
        .visa-tab { transition: all 0.15s; cursor: pointer; }
        .visa-tab:hover { background: rgba(212,175,106,0.06) !important; }
        .apply-btn { background: linear-gradient(135deg, #D4AF6A, #E8C977); color: #08080F; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s; }
        .apply-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(212,175,106,0.35); }
        .expand-btn { transition: transform 0.2s; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ height: 60, background: "rgba(8,8,15,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(212,175,106,0.12)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: "linear-gradient(135deg, #D4AF6A, #E8C977)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✈</div>
          <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 18, fontWeight: 600, color: "#D4AF6A" }}>mytriplooker <span style={{ fontSize: 12, color: "#8A8A9A", fontFamily: "'Outfit', sans-serif", fontWeight: 400 }}>/ visa checklist</span></div>
        </div>
        <a href="/" style={{ fontSize: 13, color: "#8A8A9A", textDecoration: "none" }}>← Back to Home</a>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ── COUNTRY HEADER ── */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 36, animation: "fadeUp 0.5s ease both" }}>
          <div style={{ fontSize: 64, lineHeight: 1 }}>{country.flag}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <h1 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 40, fontWeight: 500, color: "#F5F0E8", lineHeight: 1 }}>{country.name}</h1>
              <span style={{ fontSize: 11, fontWeight: 700, background: badge.bg, color: badge.color, border: `1px solid ${badge.border}`, padding: "4px 10px", borderRadius: 4 }}>{badge.label}</span>
            </div>
            <p style={{ fontSize: 14, color: "#8A8A9A", marginBottom: 12 }}>{country.tagline}</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {country.generalNotes.map((note, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 12, color: "#8A8A9A" }}>
                  <span style={{ color: "#D4AF6A", flexShrink: 0, marginTop: 1 }}>›</span> {note}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>

          {/* ── LEFT: CHECKLIST ── */}
          <div>
            {/* Visa type selector */}
            {country.visaTypes.length > 1 && (
              <div style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "4px", marginBottom: 24, display: "flex", gap: 4 }}>
                {country.visaTypes.map(v => (
                  <button key={v.id} className="visa-tab"
                    onClick={() => { setSelectedVisaId(v.id); setChecked({}); setActiveCategory("all"); }}
                    style={{ flex: 1, padding: "10px 16px", borderRadius: 9, border: "none", fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s", background: selectedVisaId === v.id ? "rgba(212,175,106,0.12)" : "transparent", color: selectedVisaId === v.id ? "#D4AF6A" : "#8A8A9A", borderBottom: selectedVisaId === v.id ? `2px solid #D4AF6A` : "2px solid transparent" }}>
                    {v.label}
                  </button>
                ))}
              </div>
            )}

            {/* Progress bar */}
            <div style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#F5F0E8" }}>Document Readiness</span>
                <span style={{ fontSize: 22, fontFamily: "'Cormorant Garant', serif", fontWeight: 600, color: progress === 100 ? "#2ECC8B" : "#D4AF6A" }}>{progress}%</span>
              </div>
              <div style={{ height: 8, background: "#0F0F1A", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progress}%`, background: progress === 100 ? "linear-gradient(90deg, #2ECC8B, #4EE8A0)" : "linear-gradient(90deg, #D4AF6A, #E8C977)", borderRadius: 4, transition: "width 0.5s ease" }} />
              </div>
              <div style={{ fontSize: 12, color: "#8A8A9A", marginTop: 8 }}>{checkedRequired} of {requiredDocs.length} required documents ready</div>
              {progress === 100 && (
                <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(46,204,139,0.08)", border: "1px solid rgba(46,204,139,0.2)", borderRadius: 8, fontSize: 13, color: "#2ECC8B", fontWeight: 600 }}>
                  🎉 All documents ready! Proceed to apply.
                </div>
              )}
            </div>

            {/* Category filter pills */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {(["all", ...categories] as (DocCategory | "all")[]).map(cat => (
                <button key={cat} className="cat-pill"
                  onClick={() => setActiveCategory(cat)}
                  style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${activeCategory === cat ? "rgba(212,175,106,0.5)" : "rgba(255,255,255,0.08)"}`, background: activeCategory === cat ? "rgba(212,175,106,0.1)" : "transparent", color: activeCategory === cat ? "#D4AF6A" : "#8A8A9A", fontSize: 12, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>
                  {cat === "all" ? `All (${visaType.documents.length})` : `${CATEGORY_ICONS[cat]} ${CATEGORY_LABELS[cat]}`}
                </button>
              ))}
            </div>

            {/* Document cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {docs.map((doc, i) => {
                const isDone = !!checked[doc.id];
                const isExpanded = !!expanded[doc.id];
                return (
                  <div key={doc.id} className="doc-card"
                    style={{ background: isDone ? "rgba(46,204,139,0.04)" : "#141420", border: `1px solid ${isDone ? "rgba(46,204,139,0.2)" : "rgba(255,255,255,0.06)"}`, borderRadius: 12, overflow: "hidden", animation: `fadeUp 0.4s ${i * 0.05}s ease both` }}>

                    {/* Card header */}
                    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", cursor: "pointer" }} onClick={() => toggleExpand(doc.id)}>
                      {/* Checkbox */}
                      <div onClick={e => { e.stopPropagation(); toggleCheck(doc.id); }}
                        style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${isDone ? "#2ECC8B" : "rgba(255,255,255,0.2)"}`, background: isDone ? "#2ECC8B" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer", transition: "all 0.2s" }}>
                        {isDone && <span style={{ color: "#08080F", fontSize: 13, fontWeight: 900, animation: "checkPop 0.3s ease" }}>✓</span>}
                      </div>

                      <span style={{ fontSize: 22, flexShrink: 0 }}>{doc.icon}</span>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: isDone ? "#2ECC8B" : "#F5F0E8", textDecoration: isDone ? "line-through" : "none", opacity: isDone ? 0.7 : 1 }}>{doc.name}</span>
                          <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 3, background: doc.required ? "rgba(232,93,74,0.1)" : "rgba(212,175,106,0.1)", color: doc.required ? "#E85D4A" : "#D4AF6A", border: `1px solid ${doc.required ? "rgba(232,93,74,0.2)" : "rgba(212,175,106,0.2)"}` }}>
                            {doc.required ? "Required" : "Optional"}
                          </span>
                          <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 3, background: "rgba(255,255,255,0.04)", color: "#8A8A9A", border: "1px solid rgba(255,255,255,0.06)" }}>
                            {CATEGORY_ICONS[doc.category]} {CATEGORY_LABELS[doc.category]}
                          </span>
                        </div>
                        <div style={{ fontSize: 11, color: "#8A8A9A", marginTop: 3 }}>
                          Accepted: {doc.acceptedFormats.join(", ")}
                        </div>
                      </div>

                      <span className="expand-btn" style={{ color: "#8A8A9A", fontSize: 18, flexShrink: 0, transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>⌄</span>
                    </div>

                    {/* Expanded specs */}
                    {isExpanded && (
                      <div style={{ padding: "0 18px 18px 54px", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 14 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#D4AF6A", marginBottom: 10 }}>Embassy Requirements</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          {doc.specs.map((spec, si) => (
                            <div key={si} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                              <span style={{ color: "#D4AF6A", flexShrink: 0, marginTop: 1 }}>›</span>
                              <span style={{ fontSize: 13, color: "#A0A0B8", lineHeight: 1.5 }}>{spec}</span>
                            </div>
                          ))}
                        </div>
                        {doc.notes && (
                          <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(232,168,74,0.06)", border: "1px solid rgba(232,168,74,0.2)", borderRadius: 8, display: "flex", gap: 8 }}>
                            <span style={{ flexShrink: 0 }}>⚠️</span>
                            <span style={{ fontSize: 12, color: "#E8A84A", lineHeight: 1.6 }}>{doc.notes}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: FEE CARD ── */}
          <div style={{ position: "sticky", top: 76 }}>
            {/* Fee breakdown */}
            <div style={{ background: "#141420", border: "1px solid rgba(212,175,106,0.2)", borderRadius: 16, padding: "24px", marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#D4AF6A", marginBottom: 16 }}>Fee Breakdown</div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                {[
                  { label: "Embassy / Govt Fee", value: formatINR(visaType.embassyFee) },
                  { label: "Service Fee", value: formatINR(visaType.serviceFee) },
                  { label: "GST (18%)", value: formatINR(Math.round((visaType.embassyFee + visaType.serviceFee) * 0.18)) },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: "#8A8A9A" }}>{row.label}</span>
                    <span style={{ fontSize: 13, color: "#F5F0E8", fontWeight: 500 }}>{row.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ height: 1, background: "rgba(212,175,106,0.15)", marginBottom: 12 }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#F5F0E8" }}>Total</span>
                <span style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 28, fontWeight: 600, color: "#D4AF6A" }}>{formatINR(totalFee)}</span>
              </div>

              <button className="apply-btn" style={{ width: "100%", padding: "14px", borderRadius: 10, fontSize: 15, fontFamily: "'Outfit', sans-serif", letterSpacing: "0.3px" }}>
                Apply Now →
              </button>

              <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 14 }}>
                {["🔒 Secure", "✓ Expert Review", "📱 WhatsApp"].map(t => (
                  <span key={t} style={{ fontSize: 11, color: "#3A3A4E" }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Visa details */}
            <div style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "20px 24px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#8A8A9A", marginBottom: 14 }}>Visa Details</div>
              {[
                { label: "Processing Time", value: `${visaType.processingDays} working days`, icon: "⏱" },
                { label: "Validity", value: visaType.validity, icon: "📅" },
                { label: "Max Stay", value: visaType.maxStay, icon: "🏝" },
                { label: "Entries", value: visaType.entries.charAt(0).toUpperCase() + visaType.entries.slice(1), icon: "🔁" },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontSize: 12, color: "#8A8A9A" }}>{row.icon} {row.label}</span>
                  <span style={{ fontSize: 12, color: "#F5F0E8", fontWeight: 600 }}>{row.value}</span>
                </div>
              ))}

              <a href={country.officialUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: "block", marginTop: 16, textAlign: "center", fontSize: 12, color: "#D4AF6A", textDecoration: "none", opacity: 0.7 }}>
                Official Embassy Website ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}