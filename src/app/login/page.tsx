"use client";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase-client";

type Mode = "login" | "signup" | "forgot";



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

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const supabase = createClient();

  const reset = () => { setError(""); setSuccess(""); };

  const handleLogin = async () => {
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setLoading(true); reset();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else { setSuccess("Logged in! Redirecting..."); setTimeout(() => window.location.href = "/dashboard", 1200); }
    setLoading(false);
  };

  const handleSignup = async () => {
    if (!fullName || !email || !password) { setError("Please fill in all required fields."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true); reset();
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName, phone } }
    });
    if (error) setError(error.message);
    else if (data.user) setSuccess("Account created! Please check your email to verify your account.");
    setLoading(false);
  };

  const handleForgot = async () => {
    if (!email) { setError("Please enter your email address."); return; }
    setLoading(true); reset();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) setError(error.message);
    else setSuccess("Password reset link sent! Check your inbox.");
    setLoading(false);
  };

  const handleGoogle = async () => {
    setLoading(true); reset();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    });
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#08080F", color: "#F5F0E8", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,500;0,600;1,300;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .auth-input { background: #0F0F1A; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 14px 16px; color: #F5F0E8; font-size: 15px; font-family: 'Outfit', sans-serif; outline: none; width: 100%; transition: border-color 0.2s; }
        .auth-input:focus { border-color: rgba(212,175,106,0.5); }
        .auth-input::placeholder { color: #3A3A4E; }
        .gold-btn { background: linear-gradient(135deg, #D4AF6A, #E8C977); color: #08080F; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s; font-family: 'Outfit', sans-serif; width: 100%; padding: 15px; border-radius: 10px; font-size: 15px; letter-spacing: 0.3px; }
        .gold-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(212,175,106,0.35); }
        .gold-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }
        .link-btn { background: none; border: none; cursor: pointer; font-family: 'Outfit', sans-serif; transition: color 0.15s; padding: 0; }
        .link-btn:hover { color: #D4AF6A !important; }
        .spinner { width: 18px; height: 18px; border: 2px solid rgba(8,8,15,0.3); border-top-color: #08080F; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }
      `}</style>

      {/* ── NAV ── */}
      <SharedNav current="/login" />

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>

        {/* Background glow */}
        <div style={{ position: "fixed", top: "30%", left: "50%", transform: "translateX(-50%)", width: 500, height: 500, background: "radial-gradient(ellipse, rgba(212,175,106,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ width: "100%", maxWidth: 440, animation: "fadeUp 0.5s ease both", position: "relative", zIndex: 1 }}>

          {/* Card */}
          <div style={{ background: "#141420", border: "1px solid rgba(212,175,106,0.15)", borderRadius: 20, padding: "40px 36px", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}>

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ display: "flex", justifyContent: "center", margin: "0 auto 16px" }}><MTLLogo height={42} /></div>
              <h1 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 30, fontWeight: 500, color: "#F5F0E8", marginBottom: 6 }}>
                {mode === "login" && <>Welcome <em style={{ color: "#D4AF6A" }}>back</em></>}
                {mode === "signup" && <>Create your <em style={{ color: "#D4AF6A" }}>account</em></>}
                {mode === "forgot" && <>Reset your <em style={{ color: "#D4AF6A" }}>password</em></>}
              </h1>
              <p style={{ fontSize: 13, color: "#8A8A9A" }}>
                {mode === "login" && "Sign in to track your visa applications"}
                {mode === "signup" && "Join 50,000+ Indian travellers on mytriplooker"}
                {mode === "forgot" && "Enter your email and we&apos;ll send a reset link"}
              </p>
            </div>

            {/* Error / Success banners */}
            {error && (
              <div style={{ background: "rgba(232,93,74,0.08)", border: "1px solid rgba(232,93,74,0.25)", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#E8907A", display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ flexShrink: 0 }}>⚠️</span> {error}
              </div>
            )}
            {success && (
              <div style={{ background: "rgba(46,204,139,0.08)", border: "1px solid rgba(46,204,139,0.25)", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#2ECC8B", display: "flex", gap: 8 }}>
                <span>✓</span> {success}
              </div>
            )}

            {/* Google Sign In */}
            {mode !== "forgot" && (
              <>
                <button onClick={handleGoogle} disabled={loading}
                  style={{ width: "100%", padding: "13px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#F5F0E8", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.2s", marginBottom: 20 }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}>
                  <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Continue with Google
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                  <span style={{ fontSize: 12, color: "#3A3A4E" }}>or with email</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                </div>
              </>
            )}

            {/* Form fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Signup only: Full Name */}
              {mode === "signup" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#8A8A9A", letterSpacing: "0.5px", textTransform: "uppercase" }}>Full Name <span style={{ color: "#E85D4A" }}>*</span></label>
                  <input className="auth-input" type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="As on your passport" />
                </div>
              )}

              {/* Email */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#8A8A9A", letterSpacing: "0.5px", textTransform: "uppercase" }}>Email Address <span style={{ color: "#E85D4A" }}>*</span></label>
                <input className="auth-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com"
                  onKeyDown={e => e.key === "Enter" && (mode === "login" ? handleLogin() : mode === "signup" ? handleSignup() : handleForgot())} />
              </div>

              {/* Signup only: Phone */}
              {mode === "signup" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#8A8A9A", letterSpacing: "0.5px", textTransform: "uppercase" }}>Phone (WhatsApp) <span style={{ color: "#3A3A4E", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>optional</span></label>
                  <input className="auth-input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" />
                </div>
              )}

              {/* Password */}
              {mode !== "forgot" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#8A8A9A", letterSpacing: "0.5px", textTransform: "uppercase" }}>Password <span style={{ color: "#E85D4A" }}>*</span></label>
                    {mode === "login" && (
                      <button className="link-btn" onClick={() => { setMode("forgot"); reset(); }} style={{ fontSize: 12, color: "#8A8A9A" }}>Forgot password?</button>
                    )}
                  </div>
                  <div style={{ position: "relative" }}>
                    <input className="auth-input" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder={mode === "signup" ? "Min. 8 characters" : "Enter your password"}
                      onKeyDown={e => e.key === "Enter" && (mode === "login" ? handleLogin() : handleSignup())}
                      style={{ paddingRight: 46 }} />
                    <button onClick={() => setShowPassword(p => !p)}
                      style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#8A8A9A", cursor: "pointer", fontSize: 16, padding: 0 }}>
                      {showPassword ? "🙈" : "👁"}
                    </button>
                  </div>
                  {mode === "signup" && password && (
                    <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                      {[1,2,3,4].map(i => (
                        <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: password.length >= i * 2 ? (password.length >= 10 ? "#2ECC8B" : "#E8A84A") : "rgba(255,255,255,0.08)", transition: "background 0.3s" }} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Submit button */}
              <button className="gold-btn" disabled={loading}
                onClick={mode === "login" ? handleLogin : mode === "signup" ? handleSignup : handleForgot}
                style={{ marginTop: 6 }}>
                {loading ? <span className="spinner" /> :
                  mode === "login" ? "Sign In →" :
                  mode === "signup" ? "Create Account →" :
                  "Send Reset Link →"
                }
              </button>
            </div>

            {/* Mode switch */}
            <div style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: "#8A8A9A" }}>
              {mode === "login" && (
                <>Don&apos;t have an account?{" "}
                  <button className="link-btn" onClick={() => { setMode("signup"); reset(); }} style={{ color: "#D4AF6A", fontWeight: 700, fontSize: 13 }}>Create one free</button>
                </>
              )}
              {mode === "signup" && (
                <>Already have an account?{" "}
                  <button className="link-btn" onClick={() => { setMode("login"); reset(); }} style={{ color: "#D4AF6A", fontWeight: 700, fontSize: 13 }}>Sign in</button>
                </>
              )}
              {mode === "forgot" && (
                <>Remember your password?{" "}
                  <button className="link-btn" onClick={() => { setMode("login"); reset(); }} style={{ color: "#D4AF6A", fontWeight: 700, fontSize: 13 }}>Sign in</button>
                </>
              )}
            </div>
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 24 }}>
            {["🔒 256-bit SSL", "✓ No spam ever", "🇮🇳 Indian company"].map(t => (
              <span key={t} style={{ fontSize: 11, color: "#3A3A4E" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
      <SharedFooter />
    </div>
  );
}