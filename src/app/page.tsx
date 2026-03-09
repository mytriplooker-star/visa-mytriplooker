"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const destinations = [
  // Popular (shown on homepage cards)
  { name:"Dubai & UAE",       slug:"uae",          flag:"🇦🇪", type:"eVisa",   days:"3–5",    price:"₹2,499",  popular:true  },
  { name:"Bali / Indonesia",  slug:"indonesia",    flag:"🇮🇩", type:"VOA",     days:"Instant",price:"₹1,299",  popular:true  },
  { name:"Thailand",          slug:"thailand",     flag:"🇹🇭", type:"eVisa",   days:"5–7",    price:"₹1,899",  popular:true  },
  { name:"Vietnam",           slug:"vietnam",      flag:"🇻🇳", type:"eVisa",   days:"3–5",    price:"₹1,599",  popular:true  },
  { name:"Malaysia",          slug:"malaysia",     flag:"🇲🇾", type:"Free",    days:"Instant",price:"Free",    popular:true  },
  { name:"Singapore",         slug:"singapore",    flag:"🇸🇬", type:"eVisa",   days:"3–5",    price:"₹3,299",  popular:true  },
  // All countries (searchable in hero)
  { name:"Japan",             slug:"japan",        flag:"🇯🇵", type:"Sticker", days:"5–7",    price:"₹4,299",  popular:false },
  { name:"South Korea",       slug:"south-korea",  flag:"🇰🇷", type:"Sticker", days:"5–7",    price:"₹4,999",  popular:false },
  { name:"France / Schengen", slug:"france",       flag:"🇫🇷", type:"Sticker", days:"15–20",  price:"₹8,999",  popular:false },
  { name:"United Kingdom",    slug:"united-kingdom",flag:"🇬🇧",type:"Sticker", days:"15–20",  price:"₹9,499",  popular:false },
  { name:"Australia",         slug:"australia",    flag:"🇦🇺", type:"eVisa",   days:"7–15",   price:"₹7,499",  popular:false },
  { name:"New Zealand",       slug:"new-zealand",  flag:"🇳🇿", type:"eVisa",   days:"15–25",  price:"₹7,999",  popular:false },
  { name:"Canada",            slug:"canada",       flag:"🇨🇦", type:"Sticker", days:"30–60",  price:"₹11,499", popular:false },
  { name:"USA",               slug:"usa",          flag:"🇺🇸", type:"Sticker", days:"30–60",  price:"₹12,999", popular:false },
  { name:"South Africa",      slug:"south-africa", flag:"🇿🇦", type:"Sticker", days:"7–10",   price:"₹4,799",  popular:false },
  { name:"Saudi Arabia",      slug:"saudi-arabia", flag:"🇸🇦", type:"eVisa",   days:"3–5",    price:"₹4,199",  popular:false },
  { name:"Qatar",             slug:"qatar",        flag:"🇶🇦", type:"eVisa",   days:"2–4",    price:"₹2,599",  popular:false },
  { name:"Oman",              slug:"oman",         flag:"🇴🇲", type:"eVisa",   days:"2–4",    price:"₹2,399",  popular:false },
  { name:"Bahrain",           slug:"bahrain",      flag:"🇧🇭", type:"eVisa",   days:"1–3",    price:"₹2,099",  popular:false },
  { name:"Kuwait",            slug:"kuwait",       flag:"🇰🇼", type:"Sticker", days:"7–14",   price:"₹4,099",  popular:false },
  { name:"Germany",           slug:"germany",      flag:"🇩🇪", type:"Schengen",days:"15–20",  price:"₹8,999",  popular:false },
  { name:"Italy",             slug:"italy",        flag:"🇮🇹", type:"Schengen",days:"15–20",  price:"₹8,999",  popular:false },
  { name:"Spain",             slug:"spain",        flag:"🇪🇸", type:"Schengen",days:"15–20",  price:"₹8,999",  popular:false },
  { name:"Netherlands",       slug:"netherlands",  flag:"🇳🇱", type:"Schengen",days:"15–20",  price:"₹8,999",  popular:false },
  { name:"Greece",            slug:"greece",       flag:"🇬🇷", type:"Schengen",days:"15–20",  price:"₹8,999",  popular:false },
  { name:"Switzerland",       slug:"switzerland",  flag:"🇨🇭", type:"Schengen",days:"15–20",  price:"₹8,999",  popular:false },
  { name:"Austria",           slug:"austria",      flag:"🇦🇹", type:"Schengen",days:"15–20",  price:"₹8,999",  popular:false },
  { name:"Portugal",          slug:"portugal",     flag:"🇵🇹", type:"Schengen",days:"15–20",  price:"₹8,999",  popular:false },
  { name:"Philippines",       slug:"philippines",  flag:"🇵🇭", type:"Free",    days:"Instant",price:"Free",    popular:false },
  { name:"Hong Kong",         slug:"hong-kong",    flag:"🇭🇰", type:"Free",    days:"Instant",price:"Free",    popular:false },
  { name:"Maldives",          slug:"maldives",     flag:"🇲🇻", type:"VOA",     days:"Instant",price:"Free",    popular:false },
  { name:"Sri Lanka",         slug:"sri-lanka",    flag:"🇱🇰", type:"ETA",     days:"1–2",    price:"₹1,699",  popular:false },
  { name:"Nepal",             slug:"nepal",        flag:"🇳🇵", type:"Free",    days:"Instant",price:"Free",    popular:false },
  { name:"Bhutan",            slug:"bhutan",       flag:"🇧🇹", type:"Permit",  days:"Instant",price:"₹1,499",  popular:false },
  { name:"Myanmar",           slug:"myanmar",      flag:"🇲🇲", type:"eVisa",   days:"3–5",    price:"₹2,199",  popular:false },
  { name:"Cambodia",          slug:"cambodia",     flag:"🇰🇭", type:"eVisa",   days:"3–5",    price:"₹1,699",  popular:false },
];

const steps = [
  { n: "01", icon: "🔍", title: "Pick your destination",   body: "Search from 50+ countries. We show you exact documents, fees, and processing time — no surprises." },
  { n: "02", icon: "📋", title: "Upload your documents",   body: "Our smart checklist tells you exactly what to submit. Upload from your phone or computer in minutes." },
  { n: "03", icon: "💳", title: "Pay securely",            body: "UPI, cards, net banking — all accepted. Government fee + service charge, clearly shown before you pay." },
  { n: "04", icon: "🛂", title: "Receive your visa",       body: "Track your application live. Get notified by WhatsApp and email. Most eVisas in 3–5 working days." },
];

const stats = [
  { value: "50,000+", label: "Visas Processed" },
  { value: "50+",     label: "Countries Covered" },
  { value: "98.7%",   label: "Approval Rate" },
  { value: "4.9★",    label: "Customer Rating" },
];

function MTLLogo({ height = 38 }: { height?: number }) {
  const scale = height / 48;
  return (
    <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", gap: 0 }}>
      <svg width={Math.round(220 * scale)} height={height} viewBox="0 0 220 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* MY */}
        <text x="0" y="36" fontFamily="'Outfit',sans-serif" fontWeight="900" fontSize="38" fill="#1EC8F0" letterSpacing="-1">MY</text>
        {/* TRIP */}
        <text x="72" y="36" fontFamily="'Outfit',sans-serif" fontWeight="900" fontSize="38" fill="#1EC8F0" letterSpacing="-1">TRIP</text>
        {/* L */}
        <text x="0" y="48" fontFamily="'Outfit',sans-serif" fontWeight="900" fontSize="0" fill="transparent">L</text>
        {/* Binoculars icon replacing OO in LOOKER */}
        <g transform="translate(0, 22) scale(0.72)">
          {/* L */}
          <text x="0" y="28" fontFamily="'Outfit',sans-serif" fontWeight="900" fontSize="38" fill="#1EC8F0" letterSpacing="-1">L</text>
          {/* Left lens */}
          <circle cx="52" cy="16" r="12" fill="#D4AF6A"/>
          <circle cx="52" cy="16" r="7" fill="#08080F"/>
          {/* Bridge */}
          <rect x="61" y="13" width="8" height="5" rx="2" fill="#D4AF6A"/>
          {/* Right lens */}
          <circle cx="76" cy="16" r="12" fill="#D4AF6A"/>
          <circle cx="76" cy="16" r="7" fill="#08080F"/>
          {/* KER */}
          <text x="91" y="28" fontFamily="'Outfit',sans-serif" fontWeight="900" fontSize="38" fill="#1EC8F0" letterSpacing="-1">KER</text>
        </g>
      </svg>
    </Link>
  );
}

export default function HomePage() {
  const [query,    setQuery]    = useState("");
  const [results,  setResults]  = useState<typeof destinations>([]);
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Derived — no setState in effect needed
  const results = query.trim()
    ? destinations.filter(d => d.name.toLowerCase().includes(query.trim().toLowerCase()))
    : destinations.filter(d => d.popular);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const typeColor = (type: string) => {
    if (type === "eVisa") return { bg: "rgba(46,204,139,0.15)", color: "#2ECC8B", border: "rgba(46,204,139,0.35)" };
    if (type === "Free" || type === "VOA") return { bg: "rgba(30,200,240,0.15)", color: "#1EC8F0", border: "rgba(30,200,240,0.35)" };
    return { bg: "rgba(212,175,106,0.15)", color: "#D4AF6A", border: "rgba(212,175,106,0.35)" };
  };

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#08080F", color: "#F5F0E8", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,500;0,600;1,300;1,400&family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        ::selection { background:rgba(212,175,106,0.3); color:#F5F0E8; }
        ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-track { background:#08080F; } ::-webkit-scrollbar-thumb { background:#3A3A4E; border-radius:2px; }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes shimmer { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .hero-title  { animation:fadeUp 0.9s ease both; }
        .hero-sub    { animation:fadeUp 0.9s 0.15s ease both; }
        .hero-search { animation:fadeUp 0.9s 0.3s ease both; }
        .hero-stats  { animation:fadeUp 0.9s 0.45s ease both; }
        .card-hover  { transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s; }
        .card-hover:hover { transform:translateY(-5px); box-shadow:0 24px 60px rgba(0,0,0,0.55); border-color:rgba(212,175,106,0.45) !important; }
        .gold-btn    { background:linear-gradient(135deg,#D4AF6A,#E8C977); color:#08080F; font-weight:700; border:none; cursor:pointer; transition:all 0.2s; letter-spacing:0.5px; }
        .gold-btn:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(212,175,106,0.4); }
        .result-row  { transition:background 0.15s; cursor:pointer; }
        .result-row:hover { background:rgba(212,175,106,0.06) !important; }
        .step-card   { transition:transform 0.3s; }
        .step-card:hover { transform:translateY(-6px); }
        .nav-link    { transition:color 0.15s; }
        .nav-link:hover { color:#D4AF6A !important; }
        .apply-btn:hover { background:rgba(212,175,106,0.2) !important; border-color:rgba(212,175,106,0.5) !important; }
        .grain { position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.025;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
      `}</style>
      <div className="grain" />

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, padding:"0 40px", height:68, display:"flex", alignItems:"center", justifyContent:"space-between", background: scrolled ? "rgba(8,8,15,0.96)" : "rgba(8,8,15,0.7)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(212,175,106,0.1)", transition:"background 0.3s" }}>
        <MTLLogo height={42} />
        <div style={{ display:"flex", alignItems:"center", gap:36 }}>
          {([["/checklist","Destinations"],["#how-it-works","How It Works"],["/track","Track Application"],["/upload","Upload Docs"]] as [string,string][]).map(([href,label]) => (
            <a key={label} href={href} className="nav-link" style={{ fontSize:13, color:"#A0A0B8", textDecoration:"none", fontWeight:500 }}>{label}</a>
          ))}
        </div>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <a href="/login" style={{ background:"transparent", border:"1px solid rgba(212,175,106,0.35)", color:"#D4AF6A", padding:"9px 22px", borderRadius:8, fontSize:13, fontWeight:600, textDecoration:"none", display:"inline-block", transition:"border-color 0.2s" }}
            onMouseEnter={e=>(e.currentTarget.style.borderColor="rgba(212,175,106,0.7)")}
            onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(212,175,106,0.35)")}>Sign In</a>
          <a href="/apply" className="gold-btn" style={{ padding:"9px 22px", borderRadius:8, fontSize:13, fontFamily:"'Outfit',sans-serif", textDecoration:"none", display:"inline-block" }}>Apply Now</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"130px 24px 100px", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"22%", left:"50%", transform:"translateX(-50%)", width:800, height:500, background:"radial-gradient(ellipse,rgba(212,175,106,0.055) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"10%", left:"12%", width:280, height:280, background:"radial-gradient(ellipse,rgba(30,200,240,0.04) 0%,transparent 70%)", pointerEvents:"none" }} />
        {(["🇦🇪","🇫🇷","🇯🇵","🇸🇬","🇬🇧"]).map((flag,i) => (
          <div key={i} style={{ position:"absolute", fontSize:26, opacity:0.12, top:`${[18,32,60,22,68][i]}%`, left:`${[7,88,4,92,84][i]}%`, animation:`float ${3.2+i*0.5}s ease-in-out infinite`, animationDelay:`${i*0.4}s`, pointerEvents:"none" }}>{flag}</div>
        ))}

        <div style={{ position:"relative", zIndex:1, textAlign:"center", maxWidth:800, width:"100%" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(212,175,106,0.07)", border:"1px solid rgba(212,175,106,0.18)", borderRadius:50, padding:"6px 18px", marginBottom:36, animation:"fadeIn 0.6s ease both" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#2ECC8B", animation:"shimmer 2s infinite" }} />
            <span style={{ fontSize:11, color:"#D4AF6A", fontWeight:600, letterSpacing:"1px", textTransform:"uppercase" }}>Trusted by 50,000+ Indian travellers</span>
          </div>

          <h1 className="hero-title" style={{ fontFamily:"'Cormorant Garant',serif", fontSize:"clamp(48px,7.5vw,88px)", fontWeight:300, lineHeight:1.05, color:"#F5F0E8", marginBottom:22, letterSpacing:"-1px" }}>
            Your Visa, <em style={{ color:"#D4AF6A", fontStyle:"italic", fontWeight:400 }}>Handled.</em>
          </h1>
          <p className="hero-sub" style={{ fontSize:"clamp(15px,2vw,18px)", color:"#8A8A9A", lineHeight:1.75, fontWeight:300, maxWidth:560, margin:"0 auto 52px" }}>
            Embassy-accurate document checklists. Expert processing. Real-time tracking.<br />For Indian passport holders flying worldwide.
          </p>

          {/* Search — fixed: dropdown has high z-index, stats sit below search wrapper */}
          <div className="hero-search" style={{ maxWidth:610, margin:"0 auto 0", position:"relative", zIndex:50 }} ref={dropRef}>
            <div style={{ display:"flex", alignItems:"center", background:"#141420", border:"1px solid rgba(212,175,106,0.28)", borderRadius:14, overflow:"hidden", boxShadow:"0 0 0 1px rgba(212,175,106,0.05),0 24px 60px rgba(0,0,0,0.45)" }}>
              <div style={{ padding:"0 18px", fontSize:18, flexShrink:0 }}>🔍</div>
              <input value={query} onChange={e=>setQuery(e.target.value)} onFocus={()=>setOpen(true)}
                placeholder="Where are you travelling to?"
                style={{ flex:1, background:"transparent", border:"none", outline:"none", color:"#F5F0E8", fontSize:16, padding:"20px 0", fontFamily:"'Outfit',sans-serif", fontWeight:400 }} />
              <a href={query ? `/checklist?q=${encodeURIComponent(query)}` : "/checklist"}
                className="gold-btn" style={{ margin:7, padding:"13px 28px", borderRadius:10, fontSize:14, fontFamily:"'Outfit',sans-serif", flexShrink:0, textDecoration:"none", display:"inline-block" }}>
                Check Visa →
              </a>
            </div>

            {/* Dropdown — floats above everything */}
            {open && results.length > 0 && (
              <div style={{ position:"absolute", top:"calc(100% + 8px)", left:0, right:0, background:"#141420", border:"1px solid rgba(212,175,106,0.2)", borderRadius:14, overflow:"hidden", boxShadow:"0 24px 60px rgba(0,0,0,0.75)", zIndex:9999, animation:"fadeUp 0.2s ease both" }}>
                <div style={{ padding:"10px 16px 6px", fontSize:10, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", color:"#3A3A4E" }}>
                  {query ? `${results.length} result${results.length!==1?"s":""}` : "Popular Destinations"}
                </div>
                {results.map((d,i) => {
                  const tc = typeColor(d.type);
                  return (
                    <a key={i} href={`/apply?country=${d.slug}`} className="result-row"
                      style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 16px", borderTop:i===0?"none":"1px solid rgba(255,255,255,0.03)", textDecoration:"none" }}
                      onClick={()=>{setQuery(d.name);setOpen(false);}}>
                      <span style={{ fontSize:26, flexShrink:0 }}>{d.flag}</span>
                      <div style={{ flex:1, textAlign:"left" }}>
                        <div style={{ fontSize:14, fontWeight:600, color:"#F5F0E8" }}>{d.name}</div>
                        <div style={{ fontSize:12, color:"#8A8A9A", marginTop:2 }}>{d.days} working days</div>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <span style={{ fontSize:11, fontWeight:700, background:tc.bg, color:tc.color, border:`1px solid ${tc.border}`, padding:"3px 9px", borderRadius:5 }}>{d.type}</span>
                        <span style={{ fontSize:14, fontWeight:700, color:"#D4AF6A" }}>{d.price}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Stats — clear separation below search */}
          <div className="hero-stats" style={{ display:"flex", justifyContent:"center", gap:48, flexWrap:"wrap", marginTop:56 }}>
            {stats.map((s,i) => (
              <div key={i} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Cormorant Garant',serif", fontSize:30, fontWeight:600, color:"#D4AF6A", lineHeight:1 }}>{s.value}</div>
                <div style={{ fontSize:11, color:"#8A8A9A", marginTop:5, letterSpacing:"0.5px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section style={{ padding:"80px 40px" }} id="destinations">
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:"#D4AF6A", marginBottom:12 }}>Where Indians Are Flying</div>
            <h2 style={{ fontFamily:"'Cormorant Garant',serif", fontSize:"clamp(32px,4vw,52px)", fontWeight:400, color:"#F5F0E8", lineHeight:1.1 }}>
              Popular <em style={{ color:"#D4AF6A", fontStyle:"italic" }}>Destinations</em>
            </h2>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(265px,1fr))", gap:18 }}>
            {destinations.filter(d=>d.popular).map((d,i) => {
              const tc = typeColor(d.type);
              return (
                <div key={i} className="card-hover" style={{ background:"#141420", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"26px 24px", animation:`fadeUp 0.5s ${i*0.07}s ease both`, display:"flex", flexDirection:"column", gap:16 }}>
                  {/* Top: flag + name + type badge */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                      <div style={{ fontSize:42, lineHeight:1 }}>{d.flag}</div>
                      <div>
                        <div style={{ fontWeight:700, fontSize:15, color:"#F5F0E8", lineHeight:1.2 }}>{d.name}</div>
                        <div style={{ fontSize:11, color:"#8A8A9A", marginTop:3 }}>⏱ {d.days} working days</div>
                      </div>
                    </div>
                    <span style={{ fontSize:10, fontWeight:700, background:tc.bg, color:tc.color, border:`1px solid ${tc.border}`, padding:"4px 10px", borderRadius:5, flexShrink:0, whiteSpace:"nowrap" }}>{d.type}</span>
                  </div>
                  {/* Divider */}
                  <div style={{ height:1, background:"rgba(255,255,255,0.05)" }} />
                  {/* Bottom: price + apply */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div>
                      <div style={{ fontSize:10, color:"#8A8A9A", textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:3 }}>Starting from</div>
                      <div style={{ fontFamily:"'Cormorant Garant',serif", fontSize:26, fontWeight:600, color:"#D4AF6A", lineHeight:1 }}>{d.price}</div>
                    </div>
                    <a href={`/apply?country=${d.slug}`} className="apply-btn"
                      style={{ background:"rgba(212,175,106,0.1)", border:"1px solid rgba(212,175,106,0.25)", color:"#D4AF6A", padding:"10px 20px", borderRadius:9, fontSize:13, fontWeight:700, textDecoration:"none", display:"inline-block", transition:"all 0.15s" }}>
                      Apply →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign:"center", marginTop:40 }}>
            <a href="/checklist" style={{ background:"transparent", border:"1px solid rgba(212,175,106,0.25)", color:"#D4AF6A", padding:"13px 36px", borderRadius:9, fontSize:14, fontWeight:600, textDecoration:"none", display:"inline-block", transition:"border-color 0.2s" }}
              onMouseEnter={e=>(e.currentTarget.style.borderColor="rgba(212,175,106,0.6)")}
              onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(212,175,106,0.25)")}>
              View All 50+ Countries →
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 40px" }}>
        <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(212,175,106,0.3),transparent)" }} />
      </div>

      {/* HOW IT WORKS */}
      <section style={{ padding:"80px 40px" }} id="how-it-works">
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:"#D4AF6A", marginBottom:12 }}>Simple & Transparent</div>
            <h2 style={{ fontFamily:"'Cormorant Garant',serif", fontSize:"clamp(32px,4vw,52px)", fontWeight:400, color:"#F5F0E8" }}>
              Visa in <em style={{ color:"#D4AF6A", fontStyle:"italic" }}>4 Steps</em>
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:20 }}>
            {steps.map((s,i) => (
              <div key={i} className="step-card" style={{ background:"#141420", border:"1px solid rgba(255,255,255,0.06)", borderRadius:16, padding:"32px 24px", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:14, right:18, fontFamily:"'Cormorant Garant',serif", fontSize:52, fontWeight:600, color:"rgba(212,175,106,0.055)", lineHeight:1, userSelect:"none" }}>{s.n}</div>
                <div style={{ fontSize:34, marginBottom:18 }}>{s.icon}</div>
                <h3 style={{ fontWeight:700, fontSize:16, color:"#F5F0E8", marginBottom:10, lineHeight:1.3 }}>{s.title}</h3>
                <p style={{ fontSize:13, color:"#8A8A9A", lineHeight:1.7 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding:"60px 40px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ background:"linear-gradient(135deg,#141420 0%,#1A1A28 100%)", border:"1px solid rgba(212,175,106,0.2)", borderRadius:22, padding:"52px 60px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:36 }}>
            <div>
              <h2 style={{ fontFamily:"'Cormorant Garant',serif", fontSize:"clamp(28px,3.5vw,44px)", fontWeight:400, color:"#F5F0E8", marginBottom:14, lineHeight:1.1 }}>
                Ready to travel?<br /><em style={{ color:"#D4AF6A" }}>We'll handle the paperwork.</em>
              </h2>
              <p style={{ fontSize:14, color:"#8A8A9A", lineHeight:1.65, maxWidth:440 }}>
                Join 50,000+ Indian travellers who trust mytriplooker for stress-free visa processing.
              </p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:14, alignItems:"flex-start" }}>
              <a href="/apply" className="gold-btn" style={{ padding:"17px 44px", borderRadius:11, fontSize:15, fontFamily:"'Outfit',sans-serif", whiteSpace:"nowrap", textDecoration:"none", display:"inline-block" }}>
                Start My Application →
              </a>
              <div style={{ display:"flex", gap:18, flexWrap:"wrap" }}>
                {["🔒 100% Secure","✓ Expert Review","📱 WhatsApp Updates"].map(t=>(
                  <span key={t} style={{ fontSize:12, color:"#8A8A9A" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:"1px solid rgba(255,255,255,0.05)", padding:"44px 40px 32px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:24 }}>
          <MTLLogo height={34} />
          <div style={{ display:"flex", gap:28, flexWrap:"wrap" }}>
            {([["/#privacy","Privacy Policy"],["/#terms","Terms of Service"],["mailto:support@mytriplooker.com","Contact Us"],["/track","Track Application"],["/login","Sign In"]] as [string,string][]).map(([href,label])=>(
              <a key={label} href={href} style={{ fontSize:12, color:"#3A3A4E", textDecoration:"none", transition:"color 0.15s" }}
                onMouseEnter={e=>(e.currentTarget.style.color="#8A8A9A")}
                onMouseLeave={e=>(e.currentTarget.style.color="#3A3A4E")}>{label}</a>
            ))}
          </div>
          <div style={{ fontSize:12, color:"#3A3A4E" }}>© 2026 mytriplooker. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}