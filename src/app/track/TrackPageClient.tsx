"use client";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase-client";

// ── Types ─────────────────────────────────────────────────────────────────
type AppStatus = "draft" | "submitted" | "documents_verified" | "embassy_submitted" | "approved" | "rejected" | "on_hold";

interface StatusEvent {
  status: AppStatus;
  timestamp: string;
  note: string;
}

interface Application {
  ref_id: string;
  country: string;
  flag: string;
  visa_type: string;
  applicant_name: string;
  travel_date: string;
  current_status: AppStatus;
  created_at: string;
  timeline: StatusEvent[];
}

// ── Status config ─────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<AppStatus, { label: string; icon: string; color: string; bg: string; border: string; desc: string }> = {
  draft:               { label: "Draft",                icon: "📝", color: "#8A8A9A", bg: "rgba(138,138,154,0.08)", border: "rgba(138,138,154,0.2)",  desc: "Application saved but not yet submitted" },
  submitted:           { label: "Submitted",            icon: "📨", color: "#4A8FE8", bg: "rgba(74,143,232,0.08)",  border: "rgba(74,143,232,0.2)",   desc: "We have received your application and documents" },
  documents_verified:  { label: "Documents Verified",  icon: "✅", color: "#D4AF6A", bg: "rgba(212,175,106,0.08)", border: "rgba(212,175,106,0.2)",  desc: "All your documents have been verified by our team" },
  embassy_submitted:   { label: "Embassy Submitted",   icon: "🏛️", color: "#9B59B6", bg: "rgba(155,89,182,0.08)",  border: "rgba(155,89,182,0.2)",   desc: "Your application has been submitted to the embassy" },
  approved:            { label: "Visa Approved! 🎉",   icon: "🎫", color: "#2ECC8B", bg: "rgba(46,204,139,0.08)",  border: "rgba(46,204,139,0.2)",   desc: "Congratulations! Your visa has been approved" },
  rejected:            { label: "Rejected",             icon: "❌", color: "#E85D4A", bg: "rgba(232,93,74,0.08)",   border: "rgba(232,93,74,0.2)",    desc: "Unfortunately your visa application was not approved" },
  on_hold:             { label: "On Hold",              icon: "⏸️", color: "#E8A84A", bg: "rgba(232,168,74,0.08)",  border: "rgba(232,168,74,0.2)",   desc: "Additional documents or information required" },
};

const TIMELINE_STEPS: AppStatus[] = ["submitted", "documents_verified", "embassy_submitted", "approved"];

// ── Mock data for demo ────────────────────────────────────────────────────
const MOCK_APP: Application = {
  ref_id: "MTL-A3F9K2",
  country: "United Arab Emirates",
  flag: "🇦🇪",
  visa_type: "Tourist eVisa — 30 Days",
  applicant_name: "Rahul Kumar Gupta",
  travel_date: "2026-04-15",
  current_status: "documents_verified",
  created_at: "2026-03-08T10:30:00Z",
  timeline: [
    { status: "submitted",          timestamp: "2026-03-08T10:30:00Z", note: "Application received. Payment confirmed ₹2,949." },
    { status: "documents_verified", timestamp: "2026-03-08T14:15:00Z", note: "All 6 documents verified by our team. Proceeding to embassy submission." },
  ],
};

// ── Helpers ───────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function daysUntil(dateStr: string) {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// ── Main Component ────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════════════════
// SHARED COMPONENTS  (MTLLogo · NAV_LINKS · SharedNav · FOOTER_LINKS · SharedFooter)
// ═══════════════════════════════════════════════════════════════════
function MTLLogo({ height = 36 }: { height?: number }) {
  return (
    <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
      <img src="/logo.png" alt="MyTripLooker" style={{ height: height, width: "auto", display: "block" }} />
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
    <nav style={{ height:64, background:"rgba(8,8,15,0.97)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(212,175,106,0.12)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 clamp(16px,4vw,40px)", position:"sticky", top:0, zIndex:200 }}>
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

export default function TrackPage() {
  const [refInput, setRefInput] = useState("");
  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const supabase = createClient();

  const handleTrack = async () => {
    const ref = refInput.trim().toUpperCase();
    if (!ref) { setError("Please enter your reference ID."); return; }
    if (!ref.startsWith("MTL-")) { setError("Reference ID must start with MTL- (e.g. MTL-A3F9K2)"); return; }

    setLoading(true);
    setError("");
    setApp(null);
    setSearched(true);

    try {
      // Try real Supabase data first
      const { data, error: dbError } = await supabase
        .from("applications")
        .select(`*, status_history(*)`)
        .eq("ref_id", ref)
        .single();

      if (dbError || !data) {
        // Fall back to mock for demo
        if (ref === "MTL-A3F9K2" || ref === "MTL-DEMO") {
          setApp(MOCK_APP);
        } else {
          setError("No application found with this reference ID. Please check and try again.");
        }
      } else {
        // Map real DB data to our Application type
        setApp({
          ref_id: data.ref_id,
          country: data.country_name || "Unknown",
          flag: data.country_flag || "🌍",
          visa_type: data.visa_type_label || "Tourist Visa",
          applicant_name: data.applicant_name || "Applicant",
          travel_date: data.travel_date,
          current_status: data.current_status,
          created_at: data.created_at,
          timeline: (data.status_history || []).map((h: { status: string; date: string; note?: string; created_at?: string }) => ({
            status: h.status,
            timestamp: h.created_at,
            note: h.note || "",
          })),
        });
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const cfg = app ? STATUS_CONFIG[app.current_status] : null;
  const currentStepIndex = app ? TIMELINE_STEPS.indexOf(app.current_status) : -1;
  const days = app ? daysUntil(app.travel_date) : 0;

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#08080F", color: "#F5F0E8", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,500;0,600;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #08080F; } ::-webkit-scrollbar-thumb { background: #3A3A4E; border-radius: 2px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        .track-btn { background: linear-gradient(135deg, #D4AF6A, #E8C977); color: #08080F; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s; font-family: 'Outfit', sans-serif; }
        .track-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(212,175,106,0.35); }
        .track-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }
        .ref-input { background: #141420; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 16px 20px; color: #F5F0E8; font-size: 18px; font-family: 'Outfit', sans-serif; outline: none; transition: border-color 0.2s; letter-spacing: 2px; text-transform: uppercase; width: 100%; }
        .ref-input:focus { border-color: rgba(212,175,106,0.5); }
        .ref-input::placeholder { letter-spacing: 1px; text-transform: none; color: #3A3A4E; font-size: 15px; }
      
        /* ── Mobile responsive ─────────────────────────────── */
        @media (max-width:767px) {
          .mtl-inner { padding-left:16px !important; padding-right:16px !important; }
          .form-card { padding:20px 16px !important; }
          .form-row-2 { grid-template-columns:1fr !important; }
          .nav-desktop-links { display:none !important; }
          .nav-desktop-cta { display:none !important; }
          .mobile-menu-btn { display:flex !important; }
          .sidebar-panel { display:none !important; }
          .footer-inner { flex-direction:column !important; gap:20px !important; }
          .footer-links { flex-wrap:wrap !important; gap:14px !important; }
          .page-main { padding-left:16px !important; padding-right:16px !important; }
          .stepper-wrap { padding:0 12px !important; }
          .step-label { display:none !important; }
          .hero-section { padding-left:16px !important; padding-right:16px !important; }
          .cta-wrap { flex-direction:column !important; }
          .track-card { padding:20px 16px !important; }
          .auth-card { padding:28px 20px !important; }
          .checklist-sidebar { display:none !important; }
          .upload-zone { padding:32px 16px !important; }
        }
        @media (max-width:480px) {
          .gender-row { grid-template-columns:1fr !important; }
          .pay-method-grid { grid-template-columns:1fr 1fr !important; }
          .stat-grid { grid-template-columns:1fr 1fr !important; }
        }`}</style>

      <SharedNav current="/track" />

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px 80px" }}>

        {/* ── SEARCH BOX ── */}
        <div style={{ textAlign: "center", marginBottom: 48, animation: "fadeUp 0.5s ease both" }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>🔍</div>
          <h1 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 44, fontWeight: 500, color: "#F5F0E8", marginBottom: 10 }}>
            Track your <em style={{ color: "#D4AF6A" }}>Application</em>
          </h1>
          <p style={{ fontSize: 14, color: "#8A8A9A", marginBottom: 36 }}>Enter your reference ID from your confirmation email to see the live status.</p>

          <div style={{ display: "flex", gap: 12, maxWidth: 520, margin: "0 auto" }}>
            <input className="ref-input" value={refInput} onChange={e => setRefInput(e.target.value)}
              placeholder="e.g. MTL-A3F9K2"
              onKeyDown={e => e.key === "Enter" && handleTrack()} />
            <button className="track-btn" onClick={handleTrack} disabled={loading}
              style={{ padding: "16px 28px", borderRadius: 10, fontSize: 15, whiteSpace: "nowrap", flexShrink: 0 }}>
              {loading ? "⏳" : "Track →"}
            </button>
          </div>

          {error && (
            <div style={{ marginTop: 14, padding: "12px 16px", background: "rgba(232,93,74,0.08)", border: "1px solid rgba(232,93,74,0.2)", borderRadius: 8, fontSize: 13, color: "#E8907A", maxWidth: 520, margin: "14px auto 0" }}>
              ⚠️ {error}
            </div>
          )}

          {/* Demo hint */}
          {!searched && (
            <div style={{ marginTop: 16, fontSize: 12, color: "#3A3A4E" }}>
              Try demo: <button onClick={() => { setRefInput("MTL-A3F9K2"); }} style={{ background: "none", border: "none", color: "#D4AF6A", cursor: "pointer", fontSize: 12, fontFamily: "'Outfit', sans-serif", textDecoration: "underline" }}>MTL-A3F9K2</button>
            </div>
          )}
        </div>

        {/* ── APPLICATION RESULT ── */}
        {app && cfg && (
          <div style={{ animation: "fadeUp 0.5s ease both" }}>

            {/* Status banner */}
            <div style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 16, padding: "24px 28px", marginBottom: 24, display: "flex", alignItems: "center", gap: 18 }}>
              <span style={{ fontSize: 44, flexShrink: 0 }}>{cfg.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: cfg.color, marginBottom: 4 }}>Current Status</div>
                <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 30, fontWeight: 600, color: "#F5F0E8", lineHeight: 1.2 }}>{cfg.label}</div>
                <div style={{ fontSize: 13, color: "#8A8A9A", marginTop: 4 }}>{cfg.desc}</div>
              </div>
              {app.current_status === "approved" && (
                <div style={{ textAlign: "center", flexShrink: 0 }}>
                  <div style={{ fontSize: 11, color: "#8A8A9A", marginBottom: 4 }}>Travel in</div>
                  <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 36, fontWeight: 600, color: "#2ECC8B" }}>{days}</div>
                  <div style={{ fontSize: 11, color: "#8A8A9A" }}>days</div>
                </div>
              )}
            </div>

            {/* Application details */}
            <div style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "24px 28px", marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#D4AF6A", marginBottom: 18 }}>Application Details</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { label: "Reference ID", value: app.ref_id, mono: true },
                  { label: "Applicant", value: app.applicant_name },
                  { label: "Destination", value: `${app.flag}  ${app.country}` },
                  { label: "Visa Type", value: app.visa_type },
                  { label: "Travel Date", value: formatDateShort(app.travel_date) },
                  { label: "Applied On", value: formatDateShort(app.created_at) },
                ].map(row => (
                  <div key={row.label}>
                    <div style={{ fontSize: 11, color: "#3A3A4E", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>{row.label}</div>
                    <div style={{ fontSize: 14, color: "#F5F0E8", fontWeight: 600, fontFamily: row.mono ? "'Courier New', monospace" : "inherit", letterSpacing: row.mono ? "1px" : 0 }}>{row.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── PROGRESS TIMELINE ── */}
            <div style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "24px 28px", marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#D4AF6A", marginBottom: 24 }}>Visa Journey</div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 0, marginBottom: 32 }}>
                {TIMELINE_STEPS.map((status, i) => {
                  const stepCfg = STATUS_CONFIG[status];
                  const isDone = currentStepIndex >= i;
                  const isActive = currentStepIndex === i;
                  const isRejected = app.current_status === "rejected";
                  return (
                    <div key={status} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                      {/* Connector line */}
                      {i < TIMELINE_STEPS.length - 1 && (
                        <div style={{ position: "absolute", top: 20, left: "50%", width: "100%", height: 2, background: isDone && currentStepIndex > i ? "#D4AF6A" : "rgba(255,255,255,0.06)", zIndex: 0, transition: "background 0.5s" }} />
                      )}
                      {/* Circle */}
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: isRejected && !isDone ? "rgba(232,93,74,0.1)" : isDone ? (isActive ? "linear-gradient(135deg,#D4AF6A,#E8C977)" : "#2ECC8B") : "#0F0F1A", border: `2px solid ${isDone ? (isActive ? "#D4AF6A" : "#2ECC8B") : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, position: "relative", zIndex: 1, transition: "all 0.3s", boxShadow: isActive ? "0 0 20px rgba(212,175,106,0.4)" : "none", flexShrink: 0 }}>
                        {isDone ? (isActive ? <span style={{ animation: "pulse 2s infinite" }}>{stepCfg.icon}</span> : "✓") : <span style={{ fontSize: 14, opacity: 0.3 }}>{stepCfg.icon}</span>}
                      </div>
                      {/* Label */}
                      <div style={{ marginTop: 8, textAlign: "center", padding: "0 4px" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: isDone ? (isActive ? "#D4AF6A" : "#2ECC8B") : "#3A3A4E", transition: "color 0.3s" }}>{stepCfg.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Rejected state */}
              {app.current_status === "rejected" && (
                <div style={{ padding: "14px 16px", background: "rgba(232,93,74,0.08)", border: "1px solid rgba(232,93,74,0.2)", borderRadius: 10, marginBottom: 20, fontSize: 13, color: "#E8907A" }}>
                  ❌ Your application was not approved. Please contact our team for details and possible reapplication options.
                </div>
              )}

              {/* On hold state */}
              {app.current_status === "on_hold" && (
                <div style={{ padding: "14px 16px", background: "rgba(232,168,74,0.08)", border: "1px solid rgba(232,168,74,0.2)", borderRadius: 10, marginBottom: 20, fontSize: 13, color: "#E8A84A" }}>
                  ⏸️ Additional information or documents are required. Our team will contact you on WhatsApp shortly.
                </div>
              )}
            </div>

            {/* ── ACTIVITY LOG ── */}
            <div style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "24px 28px", marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#D4AF6A", marginBottom: 20 }}>Activity Log</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[...app.timeline].reverse().map((event, i) => {
                  const eCfg = STATUS_CONFIG[event.status];
                  const isLast = i === app.timeline.length - 1;
                  return (
                    <div key={i} style={{ display: "flex", gap: 16, position: "relative" }}>
                      {/* Vertical line */}
                      {!isLast && <div style={{ position: "absolute", left: 19, top: 40, width: 2, height: "calc(100% - 8px)", background: "rgba(255,255,255,0.05)" }} />}
                      {/* Dot */}
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: eCfg.bg, border: `1px solid ${eCfg.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0, zIndex: 1 }}>{eCfg.icon}</div>
                      <div style={{ flex: 1, paddingBottom: 24 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#F5F0E8", marginBottom: 2 }}>{eCfg.label}</div>
                        <div style={{ fontSize: 12, color: "#8A8A9A", marginBottom: 6 }}>{formatDate(event.timestamp)}</div>
                        {event.note && <div style={{ fontSize: 13, color: "#A0A0B8", background: "#0F0F1A", padding: "10px 14px", borderRadius: 8, lineHeight: 1.6 }}>{event.note}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── ACTIONS ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <a href="/upload" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#141420", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "16px", textDecoration: "none", color: "#F5F0E8", fontSize: 14, fontWeight: 600, transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(212,175,106,0.3)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}>
                📁 Upload Documents
              </a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.2)", borderRadius: 12, padding: "16px", textDecoration: "none", color: "#25D366", fontSize: 14, fontWeight: 600, transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(37,211,102,0.4)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(37,211,102,0.2)")}>
                💬 WhatsApp Support
              </a>
            </div>
          </div>
        )}

        {/* No result state */}
        {searched && !app && !loading && !error && (
          <div style={{ textAlign: "center", padding: "48px 0", animation: "fadeUp 0.4s ease both" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔎</div>
            <div style={{ fontSize: 16, color: "#8A8A9A" }}>No application found for that reference ID.</div>
          </div>
        )}
      </div>
      <SharedFooter />
    </div>
  );
}
