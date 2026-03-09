"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import { COUNTRIES, COUNTRY_REGIONS, REGION_META, Region, Country, getCountriesByRegion } from "@/lib/visaData";

const ALL_REGIONS: Region[] = [
  'middle-east', 'schengen', 'europe', 'asia-pacific',
  'asia', 'indian-subcontinent', 'americas', 'africa',

];

const VISA_TYPE_BADGE: Record<string, { label: string; color: string }> = {
  evisa:   { label: "eVisa",   color: "#2ECC8B" },
  free:    { label: "Free",    color: "#4A8FE8" },
  voa:     { label: "VOA",     color: "#E8A84A" },
  sticker: { label: "Sticker", color: "#D4AF6A" },
  eta:     { label: "ETA",     color: "#A78BFA" },
};

function CountryCard({ country, onClick }: { country: Country; onClick: () => void }) {
  const vt = country.visaTypes[0];
  const badge = VISA_TYPE_BADGE[vt.type] || { label: vt.type, color: "#8A8A9A" };
  const isFree = vt.embassyFee === 0 && vt.serviceFee === 0;
  const totalDisplay = isFree ? "Free" : `₹${(vt.embassyFee + vt.serviceFee).toLocaleString('en-IN')}+`;

  return (
    <button
      onClick={onClick}
      style={{
        background: "#1A1A28", border: "1px solid #2A2A3E", borderRadius: 14,
        padding: "18px 20px", cursor: "pointer", textAlign: "left", width: "100%",
        transition: "all 0.2s", display: "flex", flexDirection: "column", gap: 10,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "#D4AF6A";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "#2A2A3E";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 28 }}>{country.flag}</span>
          <div>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 15, color: "#F5F0E8", lineHeight: 1.2 }}>{country.name}</div>
            <div style={{ fontSize: 11, color: "#8A8A9A", marginTop: 2 }}>{country.tagline}</div>
          </div>
        </div>
        <span style={{
          background: badge.color + "22", color: badge.color, border: `1px solid ${badge.color}55`,
          borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
        }}>{badge.label}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8, borderTop: "1px solid #2A2A3E" }}>
        <div style={{ display: "flex", gap: 16 }}>
          <div>
            <div style={{ fontSize: 10, color: "#8A8A9A", marginBottom: 2 }}>PROCESSING</div>
            <div style={{ fontSize: 13, color: "#F5F0E8", fontWeight: 600 }}>{vt.processingDays} days</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: "#8A8A9A", marginBottom: 2 }}>STAY</div>
            <div style={{ fontSize: 13, color: "#F5F0E8", fontWeight: 600 }}>{vt.maxStay}</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 10, color: "#8A8A9A", marginBottom: 2 }}>FROM</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#D4AF6A" }}>{totalDisplay}</div>
        </div>
      </div>
      <div style={{
        background: "#D4AF6A11", border: "1px solid #D4AF6A33", borderRadius: 8,
        padding: "7px 12px", display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: 12, color: "#D4AF6A", fontWeight: 600 }}>
          {country.visaTypes[0].documents.length} documents required
        </span>
        <span style={{ fontSize: 12, color: "#D4AF6A" }}>View Checklist →</span>
      </div>
    </button>
  );
}

function CountryModal({ country, onClose }: { country: Country; onClose: () => void }) {
  const [activeVisa, setActiveVisa] = useState(0);
  const vt = country.visaTypes[activeVisa];
  const totalFee = vt.embassyFee + vt.serviceFee;
  const gst = Math.round(totalFee * 0.18);
  const grandTotal = totalFee + gst;
  const isFree = grandTotal === 0;

  const categories = [...new Set(vt.documents.map(d => d.category))];

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "#000000CC", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: "#141420", border: "1px solid #2A2A3E", borderRadius: 20,
        width: "100%", maxWidth: 680, maxHeight: "90vh", overflowY: "auto",
        display: "flex", flexDirection: "column",
      }}>
        {/* Header */}
        <div style={{ padding: "24px 28px", borderBottom: "1px solid #2A2A3E", display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "sticky", top: 0, background: "#141420", zIndex: 10, borderRadius: "20px 20px 0 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 42 }}>{country.flag}</span>
            <div>
              <div style={{ fontFamily: "'Cormorant Garant',serif", fontSize: 24, fontWeight: 700, color: "#F5F0E8" }}>{country.name}</div>
              <div style={{ fontSize: 13, color: "#8A8A9A", marginTop: 2 }}>{country.tagline}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "#2A2A3E", border: "none", borderRadius: 8, width: 36, height: 36, cursor: "pointer", color: "#8A8A9A", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Visa type selector */}
          {country.visaTypes.length > 1 && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {country.visaTypes.map((v, i) => (
                <button key={v.id} onClick={() => setActiveVisa(i)} style={{
                  background: i === activeVisa ? "#D4AF6A" : "#1A1A28",
                  color: i === activeVisa ? "#08080F" : "#8A8A9A",
                  border: `1px solid ${i === activeVisa ? "#D4AF6A" : "#2A2A3E"}`,
                  borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer",
                }}>{v.label}</button>
              ))}
            </div>
          )}

          {/* Visa details grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {[
              { label: "PROCESSING", value: `${vt.processingDays} days` },
              { label: "MAX STAY", value: vt.maxStay },
              { label: "VALIDITY", value: vt.validity },
              { label: "ENTRIES", value: vt.entries.charAt(0).toUpperCase() + vt.entries.slice(1) },
              { label: "EMBASSY FEE", value: vt.embassyFee === 0 ? "Free" : `₹${vt.embassyFee.toLocaleString('en-IN')}` },
              { label: "SERVICE FEE", value: vt.serviceFee === 0 ? "Free" : `₹${vt.serviceFee.toLocaleString('en-IN')}` },
            ].map(item => (
              <div key={item.label} style={{ background: "#1A1A28", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 10, color: "#8A8A9A", marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#F5F0E8" }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* Total fee */}
          <div style={{ background: "linear-gradient(135deg,#D4AF6A18,#E8C97712)", border: "1px solid #D4AF6A44", borderRadius: 12, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, color: "#8A8A9A" }}>Total (incl. 18% GST)</div>
              <div style={{ fontFamily: "'Cormorant Garant',serif", fontSize: 28, fontWeight: 700, color: "#D4AF6A" }}>
                {isFree ? "Free 🎉" : `₹${grandTotal.toLocaleString('en-IN')}`}
              </div>
            </div>
            <a href={`/apply?country=${country.slug}`} style={{
              background: "linear-gradient(135deg,#D4AF6A,#E8C977)", color: "#08080F",
              padding: "12px 24px", borderRadius: 10, textDecoration: "none",
              fontWeight: 800, fontSize: 15,
            }}>Apply Now →</a>
          </div>

          {/* General notes */}
          {country.generalNotes.length > 0 && (
            <div style={{ background: "#4A8FE822", border: "1px solid #4A8FE844", borderRadius: 12, padding: "14px 18px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#4A8FE8", marginBottom: 8 }}>ℹ️ IMPORTANT NOTES</div>
              <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
                {country.generalNotes.map((note, i) => (
                  <li key={i} style={{ fontSize: 13, color: "#B8B4CC", marginBottom: 4, lineHeight: 1.5 }}>{note}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Document checklist */}
          <div>
            <div style={{ fontFamily: "'Cormorant Garant',serif", fontSize: 20, fontWeight: 700, color: "#F5F0E8", marginBottom: 16 }}>
              📋 Document Checklist ({vt.documents.length} items)
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {vt.documents.map(doc => (
                <div key={doc.id} style={{ background: "#1A1A28", border: `1px solid ${doc.required ? "#2A2A3E" : "#2A2A3E88"}`, borderRadius: 12, padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 20 }}>{doc.icon}</span>
                      <div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#F5F0E8" }}>{doc.name}</span>
                        {doc.required
                          ? <span style={{ marginLeft: 8, fontSize: 10, color: "#E85D4A", fontWeight: 700, background: "#E85D4A22", padding: "1px 6px", borderRadius: 4 }}>REQUIRED</span>
                          : <span style={{ marginLeft: 8, fontSize: 10, color: "#8A8A9A", fontWeight: 700, background: "#8A8A9A22", padding: "1px 6px", borderRadius: 4 }}>OPTIONAL</span>
                        }
                      </div>
                    </div>
                    <span style={{ fontSize: 10, color: "#8A8A9A", background: "#2A2A3E", padding: "2px 8px", borderRadius: 4 }}>{doc.acceptedFormats.join(" / ")}</span>
                  </div>
                  <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
                    {doc.specs.map((s, i) => (
                      <li key={i} style={{ fontSize: 12, color: "#8A8A9A", marginBottom: 2, lineHeight: 1.5 }}>{s}</li>
                    ))}
                  </ul>
                  {doc.notes && (
                    <div style={{ marginTop: 8, background: "#E8A84A18", border: "1px solid #E8A84A33", borderRadius: 8, padding: "6px 10px", fontSize: 12, color: "#E8A84A" }}>
                      ⚠️ {doc.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Embassy info */}
          <div style={{ background: "#1A1A28", border: "1px solid #2A2A3E", borderRadius: 12, padding: "14px 18px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#8A8A9A", marginBottom: 8 }}>🏛️ EMBASSY IN INDIA</div>
            <div style={{ fontSize: 14, color: "#F5F0E8", marginBottom: 4 }}>{country.embassyInIndia}</div>
            <a href={country.officialUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#4A8FE8" }}>{country.officialUrl}</a>
          </div>

          {/* CTA */}
          <a href={`/apply?country=${country.slug}`} style={{
              display: "block", textAlign: "center",
              background: "linear-gradient(135deg,#D4AF6A,#E8C977)", color: "#08080F",
              padding: "16px", borderRadius: 12, textDecoration: "none",
              fontWeight: 800, fontSize: 17, fontFamily: "'Outfit',sans-serif",
            }}>
            Start My {country.name} Visa Application →
          </a>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SHARED COMPONENTS  (MTLLogo · NAV_LINKS · SharedNav · FOOTER_LINKS · SharedFooter)
// ═══════════════════════════════════════════════════════════════════
function MTLLogo({ height = 36 }: { height?: number }) {
  const s = height / 48;
  return (
    <Link href="/" style={{ display:"flex", alignItems:"center", textDecoration:"none" }}>
      <svg width={Math.round(220*s)} height={height} viewBox="0 0 220 48" fill="none">
        <text x="0"  y="36" fontFamily="'Outfit',sans-serif" fontWeight="900" fontSize="38" fill="#1EC8F0" letterSpacing="-1">MY</text>
        <text x="72" y="36" fontFamily="'Outfit',sans-serif" fontWeight="900" fontSize="38" fill="#1EC8F0" letterSpacing="-1">TRIP</text>
        <g transform="translate(0,22) scale(0.72)">
          <text x="0"  y="28" fontFamily="'Outfit',sans-serif" fontWeight="900" fontSize="38" fill="#1EC8F0" letterSpacing="-1">L</text>
          <circle cx="52" cy="16" r="12" fill="#D4AF6A"/>
          <circle cx="52" cy="16" r="7"  fill="#08080F"/>
          <rect   x="61"  y="13" width="8" height="5" rx="2" fill="#D4AF6A"/>
          <circle cx="76" cy="16" r="12" fill="#D4AF6A"/>
          <circle cx="76" cy="16" r="7"  fill="#08080F"/>
          <text x="91" y="28" fontFamily="'Outfit',sans-serif" fontWeight="900" fontSize="38" fill="#1EC8F0" letterSpacing="-1">KER</text>
        </g>
      </svg>
    </Link>
  );
}

const NAV_LINKS: [string,string][] = [
  ["/checklist","Destinations"],
  ["/track","Track"],
  ["/upload","Upload Docs"],
];

function SharedNav({ current = "" }: { current?: string }) {
  return (
    <nav style={{ height:64, background:"rgba(8,8,15,0.97)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(212,175,106,0.12)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 40px", position:"sticky", top:0, zIndex:200 }}>
      <MTLLogo height={38} />
      <div style={{ display:"flex", alignItems:"center", gap:28 }}>
        {NAV_LINKS.map(([href,label]) => (
          <a key={href} href={href} style={{ fontSize:13, color:current===href?"#D4AF6A":"#A0A0B8", textDecoration:"none", fontWeight:500 }}
            onMouseEnter={e=>(e.currentTarget.style.color="#D4AF6A")}
            onMouseLeave={e=>(e.currentTarget.style.color=current===href?"#D4AF6A":"#A0A0B8")}>
            {label}
          </a>
        ))}
      </div>
      <div style={{ display:"flex", gap:10, alignItems:"center" }}>
        <a href="/login" style={{ background:"transparent", border:"1px solid rgba(212,175,106,0.35)", color:"#D4AF6A", padding:"8px 20px", borderRadius:8, fontSize:13, fontWeight:600, textDecoration:"none" }}>Sign In</a>
        <a href="/apply" style={{ background:"linear-gradient(135deg,#D4AF6A,#E8C977)", color:"#08080F", padding:"8px 20px", borderRadius:8, fontSize:13, fontWeight:700, textDecoration:"none" }}>Apply Now</a>
      </div>
    </nav>
  );
}

const FOOTER_LINKS: [string,string][] = [
  ["/#privacy","Privacy Policy"],["/#terms","Terms of Service"],
  ["mailto:support@mytriplooker.com","Contact Us"],
  ["/track","Track Application"],["/login","Sign In"],
];

function SharedFooter() {
  return (
    <footer style={{ borderTop:"1px solid rgba(255,255,255,0.05)", padding:"40px 40px 28px", background:"#08080F" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:20 }}>
        <MTLLogo height={32} />
        <div style={{ display:"flex", gap:24, flexWrap:"wrap" }}>
          {FOOTER_LINKS.map(([href,label]) => (
            <a key={label} href={href} style={{ fontSize:12, color:"#5A5A6E", textDecoration:"none" }}
              onMouseEnter={e=>(e.currentTarget.style.color="#D4AF6A")}
              onMouseLeave={e=>(e.currentTarget.style.color="#5A5A6E")}>
              {label}
            </a>
          ))}
        </div>
        <div style={{ fontSize:12, color:"#3A3A4E" }}>© 2026 mytriplooker. All rights reserved.</div>
      </div>
    </footer>
  );
}
// ═══════════════════════════════════════════════════════════════════

export default function ChecklistPage() {
  const [activeRegion, setActiveRegion] = useState<Region | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const filteredCountries = useMemo(() => {
    let list = activeRegion === "all"
      ? COUNTRIES
      : COUNTRIES.filter(c => COUNTRY_REGIONS[c.slug] === activeRegion);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.visaTypes[0].type.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeRegion, search]);

  // Group by region for "all" view
  const grouped = useMemo(() => {
    if (activeRegion !== "all" || search.trim()) return null;
    const map: Partial<Record<Region, Country[]>> = {};
    ALL_REGIONS.forEach(r => {
      const countries = COUNTRIES.filter(c => COUNTRY_REGIONS[c.slug] === r);
      if (countries.length > 0) map[r] = countries;
    });
    return map;
  }, [activeRegion, search]);

  return (
    <div style={{ minHeight: "100vh", background: "#08080F", color: "#F5F0E8", fontFamily: "'Outfit',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,500;0,600;1,300;1,400&family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;}
        ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:#08080F;}::-webkit-scrollbar-thumb{background:#3A3A4E;border-radius:2px;}
        input::placeholder{color:#3A3A4E;}
      `}</style>
      <SharedNav current="/checklist" />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-block", background: "#D4AF6A18", border: "1px solid #D4AF6A44", borderRadius: 20, padding: "6px 16px", fontSize: 12, color: "#D4AF6A", fontWeight: 700, marginBottom: 16 }}>
            🌍 42 Countries Covered
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garant',serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 700, color: "#F5F0E8", margin: "0 0 12px" }}>
            Visa Checklist & Requirements
          </h1>
          <p style={{ fontSize: 16, color: "#8A8A9A", maxWidth: 520, margin: "0 auto" }}>
            Embassy-accurate document requirements for Indian passport holders. Select a country to see the full checklist.
          </p>
        </div>

        {/* Search */}
        <div style={{ position: "relative", maxWidth: 480, margin: "0 auto 32px" }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#8A8A9A" }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search countries — Japan, Bali, Schengen..."
            style={{
              width: "100%", background: "#141420", border: "1px solid #2A2A3E", borderRadius: 12,
              padding: "14px 16px 14px 44px", color: "#F5F0E8", fontSize: 15,
              boxSizing: "border-box", outline: "none",
            }}
          />
        </div>

        {/* Region tabs */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 36 }}>
          <button
            onClick={() => setActiveRegion("all")}
            style={{
              background: activeRegion === "all" ? "#D4AF6A" : "#1A1A28",
              color: activeRegion === "all" ? "#08080F" : "#8A8A9A",
              border: `1px solid ${activeRegion === "all" ? "#D4AF6A" : "#2A2A3E"}`,
              borderRadius: 20, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer",
            }}
          >🌐 All Countries</button>
          {ALL_REGIONS.map(r => {
            const meta = REGION_META[r];
            const count = COUNTRIES.filter(c => COUNTRY_REGIONS[c.slug] === r).length;
            if (count === 0) return null;
            return (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                style={{
                  background: activeRegion === r ? "#D4AF6A" : "#1A1A28",
                  color: activeRegion === r ? "#08080F" : "#8A8A9A",
                  border: `1px solid ${activeRegion === r ? "#D4AF6A" : "#2A2A3E"}`,
                  borderRadius: 20, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                <span>{meta.icon}</span>
                <span>{meta.label}</span>
                <span style={{ background: activeRegion === r ? "#08080F33" : "#2A2A3E", borderRadius: 10, padding: "1px 7px", fontSize: 11 }}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Grouped view (All regions) */}
        {grouped && !search && (
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {ALL_REGIONS.map(r => {
              const countries = grouped[r];
              if (!countries || countries.length === 0) return null;
              const meta = REGION_META[r];
              return (
                <div key={r}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <span style={{ fontSize: 28 }}>{meta.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garant',serif", fontSize: 22, fontWeight: 700, color: "#F5F0E8" }}>{meta.label}</div>
                      <div style={{ fontSize: 12, color: "#8A8A9A" }}>{meta.desc} · {countries.length} {countries.length === 1 ? "country" : "countries"}</div>
                    </div>
                    <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#2A2A3E,transparent)" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 14 }}>
                    {countries.map(c => (
                      <CountryCard key={c.slug} country={c} onClick={() => setSelectedCountry(c)} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Flat filtered view */}
        {(activeRegion !== "all" || search.trim()) && (
          <>
            {activeRegion !== "all" && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: "'Cormorant Garant',serif", fontSize: 22, fontWeight: 700, color: "#F5F0E8", marginBottom: 4 }}>
                  {REGION_META[activeRegion].icon} {REGION_META[activeRegion].label}
                </div>
                <div style={{ fontSize: 13, color: "#8A8A9A" }}>{REGION_META[activeRegion].desc}</div>
              </div>
            )}
            {filteredCountries.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#8A8A9A" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 18, color: "#F5F0E8", marginBottom: 8 }}>No countries found</div>
                <div>Try a different search or region</div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 14 }}>
                {filteredCountries.map(c => (
                  <CountryCard key={c.slug} country={c} onClick={() => setSelectedCountry(c)} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Result count */}
        {search.trim() && (
          <div style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: "#8A8A9A" }}>
            {filteredCountries.length} {filteredCountries.length === 1 ? "country" : "countries"} found for "{search}"
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedCountry && (
        <CountryModal country={selectedCountry} onClose={() => setSelectedCountry(null)} />
      )}

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1A1A28", marginTop: 80, padding: "32px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 13, color: "#3A3A4E" }}>
          © 2026 mytriplooker · <a href="/track" style={{ color: "#3A3A4E" }}>Track Application</a> · <a href="/login" style={{ color: "#3A3A4E" }}>Sign In</a>
        </div>
      </footer>
    </div>
  );
}