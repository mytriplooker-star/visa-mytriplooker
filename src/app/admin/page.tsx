"use client";
import Link from "next/link";
import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────
type AppStatus = "draft" | "submitted" | "documents_verified" | "embassy_submitted" | "approved" | "rejected" | "on_hold";

interface Application {
  id: string;
  ref_id: string;
  applicant_name: string;
  email: string;
  phone: string;
  country: string;
  flag: string;
  visa_type: string;
  travel_date: string;
  applied_on: string;
  status: AppStatus;
  amount: number;
  assigned_to: string;
  documents: number;
  notes: string[];
}

// ── Mock Data ─────────────────────────────────────────────────────────────
const MOCK_APPS: Application[] = [
  { id: "1", ref_id: "MTL-A3F9K2", applicant_name: "Rahul Kumar Gupta",   email: "rahul@email.com",   phone: "+91 98765 43210", country: "United Arab Emirates", flag: "🇦🇪", visa_type: "Tourist eVisa 30D",     travel_date: "15 Apr 2026", applied_on: "8 Mar 2026",  status: "documents_verified",  amount: 2949, assigned_to: "Priya S.",   documents: 6, notes: ["Passport valid till Oct 2028", "Bank statement verified"] },
  { id: "2", ref_id: "MTL-B7M2P4", applicant_name: "Sneha Sharma",        email: "sneha@email.com",   phone: "+91 87654 32109", country: "France (Schengen)",    flag: "🇫🇷", visa_type: "Schengen Tourist 90D", travel_date: "20 Apr 2026", applied_on: "7 Mar 2026",  status: "embassy_submitted",   amount: 8499, assigned_to: "Amit K.",    documents: 9, notes: ["Insurance uploaded", "Submitted to VFS Mumbai"] },
  { id: "3", ref_id: "MTL-C1X5R8", applicant_name: "Arjun Mehta",         email: "arjun@email.com",   phone: "+91 76543 21098", country: "Singapore",            flag: "🇸🇬", visa_type: "Tourist Sticker 30D", travel_date: "1 May 2026",  applied_on: "6 Mar 2026",  status: "submitted",           amount: 3299, assigned_to: "Unassigned", documents: 3, notes: [] },
  { id: "4", ref_id: "MTL-D4K8T1", applicant_name: "Priya Nair",          email: "priya@email.com",   phone: "+91 65432 10987", country: "Thailand",             flag: "🇹🇭", visa_type: "Tourist eVisa 60D",   travel_date: "10 Apr 2026", applied_on: "5 Mar 2026",  status: "approved",            amount: 1899, assigned_to: "Priya S.",   documents: 6, notes: ["Visa approved!", "Sent to applicant via email"] },
  { id: "5", ref_id: "MTL-E9J3W6", applicant_name: "Vikram Singh",        email: "vikram@email.com",  phone: "+91 54321 09876", country: "United Kingdom",       flag: "🇬🇧", visa_type: "Standard Visitor 6M", travel_date: "25 May 2026", applied_on: "4 Mar 2026",  status: "on_hold",             amount: 9499, assigned_to: "Amit K.",    documents: 7, notes: ["Need 6-month bank statement", "Called applicant on WhatsApp"] },
  { id: "6", ref_id: "MTL-F2N7Q9", applicant_name: "Deepika Reddy",       email: "deepika@email.com", phone: "+91 43210 98765", country: "United Arab Emirates", flag: "🇦🇪", visa_type: "Tourist eVisa 60D",   travel_date: "5 May 2026",  applied_on: "3 Mar 2026",  status: "rejected",            amount: 3499, assigned_to: "Priya S.",   documents: 6, notes: ["Rejected — insufficient bank balance", "Offered reapplication"] },
  { id: "7", ref_id: "MTL-G5H1L3", applicant_name: "Rohit Joshi",         email: "rohit@email.com",   phone: "+91 32109 87654", country: "Singapore",            flag: "🇸🇬", visa_type: "Tourist Sticker 30D", travel_date: "12 May 2026", applied_on: "2 Mar 2026",  status: "draft",               amount: 3299, assigned_to: "Unassigned", documents: 0, notes: [] },
  { id: "8", ref_id: "MTL-H8P4S7", applicant_name: "Ananya Krishnan",     email: "ananya@email.com",  phone: "+91 21098 76543", country: "France (Schengen)",    flag: "🇫🇷", visa_type: "Schengen Tourist 90D", travel_date: "18 Jun 2026", applied_on: "1 Mar 2026",  status: "submitted",           amount: 8499, assigned_to: "Unassigned", documents: 5, notes: [] },

];

const STATUS_CONFIG: Record<AppStatus, { label: string; color: string; bg: string; border: string; icon: string }> = {
  draft:               { label: "Draft",               color: "#8A8A9A", bg: "rgba(138,138,154,0.1)", border: "rgba(138,138,154,0.2)", icon: "📝" },
  submitted:           { label: "Submitted",           color: "#4A8FE8", bg: "rgba(74,143,232,0.1)",  border: "rgba(74,143,232,0.2)",  icon: "📨" },
  documents_verified:  { label: "Docs Verified",       color: "#D4AF6A", bg: "rgba(212,175,106,0.1)", border: "rgba(212,175,106,0.2)", icon: "✅" },
  embassy_submitted:   { label: "At Embassy",          color: "#9B59B6", bg: "rgba(155,89,182,0.1)",  border: "rgba(155,89,182,0.2)",  icon: "🏛️" },
  approved:            { label: "Approved",            color: "#2ECC8B", bg: "rgba(46,204,139,0.1)",  border: "rgba(46,204,139,0.2)",  icon: "🎫" },
  rejected:            { label: "Rejected",            color: "#E85D4A", bg: "rgba(232,93,74,0.1)",   border: "rgba(232,93,74,0.2)",   icon: "❌" },
  on_hold:             { label: "On Hold",             color: "#E8A84A", bg: "rgba(232,168,74,0.1)",  border: "rgba(232,168,74,0.2)",  icon: "⏸️" },
};

const ALL_STATUSES = Object.keys(STATUS_CONFIG) as AppStatus[];
const TEAM = ["Unassigned", "Priya S.", "Amit K.", "Rahul G.", "Neha M."];

function formatINR(n: number) { return `₹${n.toLocaleString("en-IN")}`; }

// ── Status Badge ──────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: AppStatus }) {
  const c = STATUS_CONFIG[status];
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 4, background: c.bg, color: c.color, border: `1px solid ${c.border}`, whiteSpace: "nowrap" }}>
      {c.icon} {c.label}
    </span>
  );
}

// ── Application Detail Drawer ─────────────────────────────────────────────
function AppDrawer({ app, onClose, onUpdate }: { app: Application; onClose: () => void; onUpdate: (id: string, patch: Partial<Application>) => void }) {
  const [newNote, setNewNote] = useState("");
  const [status, setStatus] = useState<AppStatus>(app.status);
  const [assigned, setAssigned] = useState(app.assigned_to);
  const [notes, setNotes] = useState(app.notes);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onUpdate(app.id, { status, assigned_to: assigned, notes });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    const updated = [`${new Date().toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}: ${newNote.trim()}`, ...notes];
    setNotes(updated);
    setNewNote("");
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex" }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{ flex: 1, background: "rgba(8,8,15,0.7)", backdropFilter: "blur(4px)" }} />
      {/* Drawer */}
      <div style={{ width: 480, background: "#141420", borderLeft: "1px solid rgba(212,175,106,0.15)", height: "100%", overflowY: "auto", padding: "28px 28px 40px", animation: "slideIn 0.25s ease both" }}>
        <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 26, fontWeight: 600, color: "#F5F0E8" }}>{app.applicant_name}</div>
            <div style={{ fontSize: 12, color: "#D4AF6A", fontFamily: "monospace", marginTop: 2 }}>{app.ref_id}</div>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#8A8A9A", fontSize: 22, cursor: "pointer", padding: "0 4px" }}>✕</button>
        </div>

        {/* Visa info */}
        <div style={{ background: "#0F0F1A", borderRadius: 12, padding: "16px", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 36 }}>{app.flag}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#F5F0E8" }}>{app.country}</div>
              <div style={{ fontSize: 12, color: "#8A8A9A" }}>{app.visa_type}</div>
            </div>
            <div style={{ marginLeft: "auto", textAlign: "right" }}>
              <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 22, fontWeight: 600, color: "#D4AF6A" }}>{formatINR(app.amount)}</div>
              <div style={{ fontSize: 11, color: "#8A8A9A" }}>paid</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { label: "Travel Date", value: app.travel_date },
              { label: "Applied On", value: app.applied_on },
              { label: "Email", value: app.email },
              { label: "Phone", value: app.phone },
              { label: "Documents", value: `${app.documents} uploaded` },
            ].map(r => (
              <div key={r.label}>
                <div style={{ fontSize: 10, color: "#3A3A4E", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>{r.label}</div>
                <div style={{ fontSize: 12, color: "#F5F0E8", marginTop: 2 }}>{r.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Update Status */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#8A8A9A", display: "block", marginBottom: 8 }}>Update Status</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {ALL_STATUSES.filter(s => s !== "draft").map(s => {
              const c = STATUS_CONFIG[s];
              return (
                <button key={s} onClick={() => setStatus(s)}
                  style={{ padding: "10px 8px", borderRadius: 8, border: `1.5px solid ${status === s ? c.color : "rgba(255,255,255,0.06)"}`, background: status === s ? c.bg : "transparent", color: status === s ? c.color : "#8A8A9A", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  {c.icon} {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Assign to */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#8A8A9A", display: "block", marginBottom: 8 }}>Assign To</label>
          <select value={assigned} onChange={e => setAssigned(e.target.value)}
            style={{ width: "100%", background: "#0F0F1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 14px", color: "#F5F0E8", fontSize: 13, fontFamily: "'Outfit', sans-serif", outline: "none" }}>
            {TEAM.map(t => <option key={t} value={t} style={{ background: "#141420" }}>{t}</option>)}
          </select>
        </div>

        {/* Documents */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#8A8A9A", display: "block", marginBottom: 8 }}>Documents ({app.documents})</label>
          {app.documents > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {["Passport Bio Data", "Bank Statement", "Salary Slip", "Hotel Booking", "Flight Tickets", "Photograph"].slice(0, app.documents).map(doc => (
                <div key={doc} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0F0F1A", borderRadius: 8, padding: "10px 12px" }}>
                  <span style={{ fontSize: 12, color: "#F5F0E8" }}>📄 {doc}</span>
                  <button style={{ background: "rgba(212,175,106,0.1)", border: "1px solid rgba(212,175,106,0.2)", color: "#D4AF6A", padding: "4px 10px", borderRadius: 5, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>View</button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: "16px", background: "#0F0F1A", borderRadius: 8, textAlign: "center", fontSize: 12, color: "#3A3A4E" }}>No documents uploaded yet</div>
          )}
        </div>

        {/* Notes */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#8A8A9A", display: "block", marginBottom: 8 }}>Internal Notes</label>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <input value={newNote} onChange={e => setNewNote(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addNote()}
              placeholder="Add a note..." 
              style={{ flex: 1, background: "#0F0F1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 12px", color: "#F5F0E8", fontSize: 13, fontFamily: "'Outfit', sans-serif", outline: "none" }} />
            <button onClick={addNote} style={{ background: "rgba(212,175,106,0.1)", border: "1px solid rgba(212,175,106,0.2)", color: "#D4AF6A", padding: "10px 14px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: "'Outfit', sans-serif" }}>Add</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 160, overflowY: "auto" }}>
            {notes.length === 0 && <div style={{ fontSize: 12, color: "#3A3A4E", textAlign: "center", padding: 12 }}>No notes yet</div>}
            {notes.map((note, i) => (
              <div key={i} style={{ background: "#0F0F1A", borderRadius: 8, padding: "10px 12px", fontSize: 12, color: "#A0A0B8", lineHeight: 1.5 }}>📌 {note}</div>
            ))}
          </div>
        </div>

        {/* Save */}
        <button onClick={handleSave}
          style={{ width: "100%", padding: "14px", background: saved ? "rgba(46,204,139,0.15)" : "linear-gradient(135deg,#D4AF6A,#E8C977)", border: saved ? "1px solid rgba(46,204,139,0.3)" : "none", color: saved ? "#2ECC8B" : "#08080F", fontWeight: 700, borderRadius: 10, fontSize: 15, cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "all 0.3s" }}>
          {saved ? "✓ Changes Saved!" : "Save Changes →"}
        </button>

        {/* Quick actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
          <a href={`https://wa.me/${app.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.2)", borderRadius: 8, padding: "10px", textDecoration: "none", color: "#25D366", fontSize: 12, fontWeight: 700 }}>
            💬 WhatsApp
          </a>
          <a href={`mailto:${app.email}`}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "rgba(74,143,232,0.08)", border: "1px solid rgba(74,143,232,0.2)", borderRadius: 8, padding: "10px", textDecoration: "none", color: "#4A8FE8", fontSize: 12, fontWeight: 700 }}>
            ✉️ Email
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Main Admin Panel ──────────────────────────────────────────────────────

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

export default function AdminPage() {
  const [apps, setApps] = useState<Application[]>(MOCK_APPS);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [filterStatus, setFilterStatus] = useState<AppStatus | "all">("all");
  const [filterCountry, setFilterCountry] = useState("all");
  const [search, setSearch] = useState("");

  const updateApp = (id: string, patch: Partial<Application>) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, ...patch } : a));
    if (selectedApp?.id === id) setSelectedApp(prev => prev ? { ...prev, ...patch } : null);
  };

  // Filtered apps
  const filtered = apps.filter(a => {
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    const matchCountry = filterCountry === "all" || a.country === filterCountry;
    const matchSearch = !search || a.applicant_name.toLowerCase().includes(search.toLowerCase()) || a.ref_id.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchCountry && matchSearch;
  });

  // Stats
  const totalRevenue = apps.reduce((s, a) => s + a.amount, 0);
  const pending = apps.filter(a => ["submitted", "documents_verified"].includes(a.status)).length;
  const approved = apps.filter(a => a.status === "approved").length;
  const atEmbassy = apps.filter(a => a.status === "embassy_submitted").length;
  const countries = [...new Set(apps.map(a => a.country))];

  const statCards = [
    { label: "Total Applications", value: apps.length, icon: "📋", color: "#4A8FE8", sub: `${pending} pending action` },
    { label: "Total Revenue", value: formatINR(totalRevenue), icon: "💰", color: "#D4AF6A", sub: "this month" },
    { label: "Approved", value: approved, icon: "🎫", color: "#2ECC8B", sub: `${Math.round(approved / apps.length * 100)}% approval rate` },
    { label: "At Embassy", value: atEmbassy, icon: "🏛️", color: "#9B59B6", sub: "awaiting decision" },
    { label: "On Hold", value: apps.filter(a => a.status === "on_hold").length, icon: "⏸️", color: "#E8A84A", sub: "needs attention" },
    { label: "Rejected", value: apps.filter(a => a.status === "rejected").length, icon: "❌", color: "#E85D4A", sub: "this month" },
  ];

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#08080F", color: "#F5F0E8", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,500;0,600;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; } ::-webkit-scrollbar-track { background: #08080F; } ::-webkit-scrollbar-thumb { background: #3A3A4E; border-radius: 2px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .row-hover:hover { background: rgba(212,175,106,0.04) !important; cursor: pointer; }
        .tab-btn { transition: all 0.15s; cursor: pointer; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ height: 60, background: "rgba(8,8,15,0.98)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(212,175,106,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", position: "sticky", top: 0, zIndex: 200 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <MTLLogo height={38} />
          <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 18, fontWeight: 600, color: "#D4AF6A" }}>mytriplooker</div>
          <div style={{ height: 18, width: 1, background: "rgba(255,255,255,0.1)" }} />
          <div style={{ fontSize: 12, fontWeight: 700, background: "rgba(232,93,74,0.15)", color: "#E85D4A", border: "1px solid rgba(232,93,74,0.3)", padding: "3px 10px", borderRadius: 4 }}>ADMIN</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ fontSize: 12, color: "#8A8A9A" }}>
            <span style={{ color: "#2ECC8B", fontWeight: 700 }}>● </span>Live
          </div>
          <a href="/dashboard" style={{ fontSize: 12, color: "#8A8A9A", textDecoration: "none" }}>Customer View ↗</a>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(212,175,106,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, cursor: "pointer" }}>👤</div>
        </div>
      </nav>

      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "32px 24px 80px" }}>

        {/* Page title */}
        <div style={{ marginBottom: 28, animation: "fadeUp 0.4s ease both" }}>
          <h1 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 40, fontWeight: 500, color: "#F5F0E8" }}>
            Admin <em style={{ color: "#D4AF6A" }}>Dashboard</em>
          </h1>
          <p style={{ fontSize: 13, color: "#8A8A9A", marginTop: 4 }}>Manage all visa applications, update statuses, and communicate with applicants.</p>
        </div>

        {/* ── STATS GRID ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14, marginBottom: 32 }}>
          {statCards.map((s, i) => (
            <div key={s.label} style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "18px 16px", animation: `fadeUp 0.4s ${i * 0.05}s ease both` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, opacity: 0.7 }} />
              </div>
              <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 28, fontWeight: 600, color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#F5F0E8", marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 10, color: "#3A3A4E", marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* ── STATUS BREAKDOWN ── */}
        <div style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "20px 24px", marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#8A8A9A", marginBottom: 14 }}>Pipeline Overview</div>
          <div style={{ display: "flex", gap: 0, height: 12, borderRadius: 6, overflow: "hidden", marginBottom: 12 }}>
            {ALL_STATUSES.map(s => {
              const count = apps.filter(a => a.status === s).length;
              const pct = (count / apps.length) * 100;
              if (pct === 0) return null;
              return <div key={s} title={`${STATUS_CONFIG[s].label}: ${count}`} style={{ width: `${pct}%`, background: STATUS_CONFIG[s].color, transition: "width 0.5s" }} />;
            })}
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {ALL_STATUSES.map(s => {
              const count = apps.filter(a => a.status === s).length;
              if (count === 0) return null;
              const c = STATUS_CONFIG[s];
              return (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }} onClick={() => setFilterStatus(s)}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: c.color }} />
                  <span style={{ fontSize: 11, color: "#8A8A9A" }}>{c.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: c.color }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── FILTERS + SEARCH ── */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search by name, ref ID, email..."
            style={{ flex: 1, minWidth: 240, background: "#141420", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 14px", color: "#F5F0E8", fontSize: 13, fontFamily: "'Outfit', sans-serif", outline: "none" }}
            onFocus={e => (e.target.style.borderColor = "rgba(212,175,106,0.4)")}
            onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />

          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as AppStatus | "all")}
            style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 14px", color: "#F5F0E8", fontSize: 13, fontFamily: "'Outfit', sans-serif", outline: "none", cursor: "pointer" }}>
            <option value="all">All Statuses</option>
            {ALL_STATUSES.map(s => <option key={s} value={s} style={{ background: "#141420" }}>{STATUS_CONFIG[s].icon} {STATUS_CONFIG[s].label}</option>)}
          </select>

          <select value={filterCountry} onChange={e => setFilterCountry(e.target.value)}
            style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 14px", color: "#F5F0E8", fontSize: 13, fontFamily: "'Outfit', sans-serif", outline: "none", cursor: "pointer" }}>
            <option value="all">All Countries</option>
            {countries.map(c => <option key={c} value={c} style={{ background: "#141420" }}>{c}</option>)}
          </select>

          <div style={{ fontSize: 12, color: "#8A8A9A", marginLeft: "auto" }}>
            Showing <strong style={{ color: "#F5F0E8" }}>{filtered.length}</strong> of {apps.length} applications
          </div>
        </div>

        {/* ── APPLICATIONS TABLE ── */}
        <div style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, overflow: "hidden" }}>
          {/* Table header */}
          <div style={{ display: "grid", gridTemplateColumns: "130px 1fr 140px 130px 110px 110px 100px 80px", gap: 0, padding: "12px 20px", background: "#0F0F1A", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {["Ref ID", "Applicant", "Destination", "Visa Type", "Travel Date", "Status", "Assigned", "Amount"].map(h => (
              <div key={h} style={{ fontSize: 10, fontWeight: 700, color: "#3A3A4E", textTransform: "uppercase", letterSpacing: "0.8px" }}>{h}</div>
            ))}
          </div>

          {/* Table rows */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px", color: "#3A3A4E", fontSize: 14 }}>No applications match your filters.</div>
          ) : (
            filtered.map((app, i) => (
              <div key={app.id} className="row-hover"
                onClick={() => setSelectedApp(app)}
                style={{ display: "grid", gridTemplateColumns: "130px 1fr 140px 130px 110px 110px 100px 80px", gap: 0, padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)", transition: "background 0.15s" }}>

                <div style={{ fontSize: 12, fontWeight: 700, color: "#D4AF6A", fontFamily: "monospace", display: "flex", alignItems: "center" }}>{app.ref_id}</div>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#F5F0E8" }}>{app.applicant_name}</div>
                  <div style={{ fontSize: 11, color: "#8A8A9A" }}>{app.email}</div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 18 }}>{app.flag}</span>
                  <span style={{ fontSize: 12, color: "#F5F0E8" }}>{app.country.split(" ")[0]}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "#8A8A9A" }}>{app.visa_type}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#F5F0E8" }}>{app.travel_date}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <StatusBadge status={app.status} />
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: app.assigned_to === "Unassigned" ? "#E8A84A" : "#8A8A9A" }}>{app.assigned_to}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#2ECC8B" }}>{formatINR(app.amount)}</span>
                </div>
              </div>
            ))
          )}

          {/* Table footer */}
          <div style={{ padding: "12px 20px", background: "#0F0F1A", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#3A3A4E" }}>Click any row to view details & update status</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#D4AF6A" }}>
              Total: {formatINR(filtered.reduce((s, a) => s + a.amount, 0))}
            </span>
          </div>
        </div>
      </div>

      {/* Drawer */}
      {selectedApp && (
        <AppDrawer app={selectedApp} onClose={() => setSelectedApp(null)} onUpdate={updateApp} />
      )}
    </div>
  );
}