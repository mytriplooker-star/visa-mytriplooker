"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";


  ["/checklist", "Destinations"],
  ["/track",     "Track"],
  ["/upload",    "Upload Docs"],
];


  ["/#privacy","Privacy Policy"], ["/#terms","Terms of Service"],
  ["mailto:support@mytriplooker.com","Contact Us"],
  ["/track","Track Application"], ["/login","Sign In"],
];

// ═══════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════
// SHARED COMPONENTS  (MTLLogo · NAV_LINKS · SharedNav · FOOTER_LINKS · SharedFooter)
// ═══════════════════════════════════════════════════════════════════
function MTLLogo({ height = 36 }: { height?: number }) {
  const s = height / 48;
  return (
    <a href="/" style={{ display:"flex", alignItems:"center", textDecoration:"none" }}>
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
    </a>
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

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = "/login";
      } else {
        setUser(data.user);
        setLoading(false);
      }
    });
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div style={{ fontFamily: "'Outfit', sans-serif", background: "#08080F", color: "#F5F0E8", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🗺️</div>
          <div style={{ color: "#8A8A9A", fontSize: 14 }}>Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  const name = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Traveller";
  const email = user?.email;
  const avatar = user?.user_metadata?.avatar_url;

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#08080F", color: "#F5F0E8", minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,500;0,600;1,400&family=Outfit:wght@300;400;500;600;700&display=swap'); *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; } @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>

      <SharedNav current="/dashboard" />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px", animation: "fadeUp 0.5s ease both" }}>

        {/* Welcome */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 13, color: "#D4AF6A", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8 }}>Welcome back</p>
          <h1 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 48, fontWeight: 500, color: "#F5F0E8", lineHeight: 1.1 }}>
            Hello, <em style={{ color: "#D4AF6A" }}>{name}</em> 👋
          </h1>
          <p style={{ fontSize: 15, color: "#8A8A9A", marginTop: 10 }}>Your visa applications and documents are managed here.</p>
        </div>

        {/* Empty state */}
        <div style={{ background: "#141420", border: "2px dashed rgba(212,175,106,0.2)", borderRadius: 20, padding: "60px 40px", textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>📋</div>
          <h2 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 28, fontWeight: 500, color: "#F5F0E8", marginBottom: 10 }}>No applications yet</h2>
          <p style={{ fontSize: 14, color: "#8A8A9A", marginBottom: 28, maxWidth: 400, margin: "0 auto 28px" }}>Start your visa application and we will guide you through every step — from documents to approval.</p>
          <a href="/apply" style={{ display: "inline-block", background: "linear-gradient(135deg, #D4AF6A, #E8C977)", color: "#08080F", fontWeight: 700, padding: "14px 32px", borderRadius: 10, textDecoration: "none", fontSize: 15 }}>
            Apply for a Visa →
          </a>
        </div>

        {/* Quick links */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { icon: "🌍", label: "Visa Checklist", desc: "See exact documents needed", href: "/checklist" },
            { icon: "📁", label: "Upload Documents", desc: "Submit your files securely", href: "/upload" },
            { icon: "🔍", label: "Track Application", desc: "Check your visa status", href: "/track" },
          ].map(card => (
            <a key={card.label} href={card.href} style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "24px 20px", textDecoration: "none", display: "block", transition: "border-color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(212,175,106,0.3)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{card.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#F5F0E8", marginBottom: 4 }}>{card.label}</div>
              <div style={{ fontSize: 12, color: "#8A8A9A" }}>{card.desc}</div>
            </a>
          ))}
        </div>
      </div>
      <SharedFooter />
    </div>
  );
}