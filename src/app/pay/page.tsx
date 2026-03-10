"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

// ── Types ─────────────────────────────────────────────────────────────────
interface OrderSummary {
  refId: string;
  country: string;
  flag: string;
  visaType: string;
  applicantName: string;
  travelDate: string;
  embassyFee: number;
  serviceFee: number;
  gst: number;
  total: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────
function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

// ── Mock order for demo ───────────────────────────────────────────────────
const MOCK_ORDER: OrderSummary = {
  refId: "MTL-A3F9K2",
  country: "United Arab Emirates",
  flag: "🇦🇪",
  visaType: "Tourist eVisa — 30 Days",
  applicantName: "Rahul Kumar Gupta",
  travelDate: "15 Apr 2026",
  embassyFee: 1500,
  serviceFee: 999,
  gst: 450,
  total: 2949,
};

// ── Payment method button ─────────────────────────────────────────────────
function PayMethod({ icon, label, selected, onClick }: { icon: string; label: string; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      style={{ flex: 1, padding: "12px 10px", borderRadius: 10, border: `1.5px solid ${selected ? "rgba(212,175,106,0.6)" : "rgba(255,255,255,0.07)"}`, background: selected ? "rgba(212,175,106,0.08)" : "#0F0F1A", cursor: "pointer", transition: "all 0.2s", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, fontFamily: "'Outfit', sans-serif" }}>
      <span style={{ fontSize: 24 }}>{icon}</span>
      <span style={{ fontSize: 11, fontWeight: 700, color: selected ? "#D4AF6A" : "#8A8A9A" }}>{label}</span>
    </button>
  );
}

// ── Step indicator ────────────────────────────────────────────────────────
function StepDot({ n, label, active, done }: { n: number; label: string; active: boolean; done: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: done ? "#2ECC8B" : active ? "linear-gradient(135deg,#D4AF6A,#E8C977)" : "#0F0F1A", border: `2px solid ${done ? "#2ECC8B" : active ? "#D4AF6A" : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: done ? 14 : 12, fontWeight: 700, color: done || active ? "#08080F" : "#3A3A4E", flexShrink: 0 }}>
        {done ? "✓" : n}
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: active ? "#D4AF6A" : done ? "#2ECC8B" : "#3A3A4E" }}>{label}</span>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════════════════
// SHARED COMPONENTS  (MTLLogo · NAV_LINKS · SharedNav · FOOTER_LINKS · SharedFooter)
// ═══════════════════════════════════════════════════════════════════
function MTLLogo({ height = 36 }: { height?: number }) {
  return (
    <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
      <Image
        src="/logo.png"
        alt="MyTripLooker"
        width={150}
        height={height}
        style={{ width: "auto", height: height }}
        priority
      />
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

export default function PaymentPage() {
  const [order] = useState<OrderSummary>(MOCK_ORDER);
  const [payMethod, setPayMethod] = useState<"upi" | "card" | "netbanking" | "wallet">("upi");
  const [upiId, setUpiId] = useState("");
  const [step, setStep] = useState<"review" | "pay" | "processing" | "success" | "failed">("review");
  const [agreed, setAgreed] = useState(false);
  const [cardNum, setCardNum] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [countdown, setCountdown] = useState(8);


  // Countdown after success
  useEffect(() => {
    if (step === "success" && countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(t);
    }
    if (step === "success" && countdown === 0) {
      window.location.href = "/upload";
    }
  }, [step, countdown]);

  const handlePay = async () => {
    if (payMethod === "upi" && !upiId.includes("@")) {
      alert("Please enter a valid UPI ID (e.g. name@upi)");
      return;
    }
    if (payMethod === "card" && (!cardNum || !cardExp || !cardCvv || !cardName)) {
      alert("Please fill in all card details");
      return;
    }

    setStep("processing");

    // Simulate Razorpay processing
    await new Promise(r => setTimeout(r, 2800));

    // In production: call /api/payments/create-order → Razorpay SDK → /api/payments/verify
    // For now simulate success
    setStep("success");
  };

  const formatCard = (val: string) => val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExp = (val: string) => { const v = val.replace(/\D/g, "").slice(0, 4); return v.length >= 2 ? v.slice(0, 2) + "/" + v.slice(2) : v; };

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#08080F", color: "#F5F0E8", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,500;0,600;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #08080F; } ::-webkit-scrollbar-thumb { background: #3A3A4E; border-radius: 2px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes successPop { 0% { transform:scale(0.5); opacity:0; } 60% { transform:scale(1.1); } 100% { transform:scale(1); opacity:1; } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        .pay-input { background: #0F0F1A; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 12px 14px; color: #F5F0E8; font-size: 14px; font-family: 'Outfit', sans-serif; outline: none; width: 100%; transition: border-color 0.2s; }
        .pay-input:focus { border-color: rgba(212,175,106,0.5); }
        .pay-input::placeholder { color: #3A3A4E; }
        .pay-btn { background: linear-gradient(135deg, #D4AF6A, #E8C977); color: #08080F; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s; font-family: 'Outfit', sans-serif; }
        .pay-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(212,175,106,0.4); }
        .pay-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }
        .spinner { width: 48px; height: 48px; border: 3px solid rgba(212,175,106,0.2); border-top-color: #D4AF6A; border-radius: 50%; animation: spin 0.8s linear infinite; }
      `}</style>

      <SharedNav current="/pay" />

      {/* ── PROCESSING OVERLAY ── */}
      {step === "processing" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(8,8,15,0.95)", zIndex: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
          <div className="spinner" />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 28, fontWeight: 500, color: "#F5F0E8", marginBottom: 8 }}>Processing Payment</div>
            <div style={{ fontSize: 14, color: "#8A8A9A", animation: "pulse 1.5s infinite" }}>Please do not close this window...</div>
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 8 }}>
            {["🔒 256-bit SSL", "✓ PCI DSS", "🇮🇳 RBI Compliant"].map(t => (
              <span key={t} style={{ fontSize: 11, color: "#3A3A4E" }}>{t}</span>
            ))}
          </div>
        </div>
      )}

      {/* ── SUCCESS SCREEN ── */}
      {step === "success" && (
        <div style={{ maxWidth: 520, margin: "80px auto", padding: "0 24px", textAlign: "center", animation: "fadeUp 0.5s ease both" }}>
          <div style={{ width: 100, height: 100, borderRadius: "50%", background: "rgba(46,204,139,0.1)", border: "2px solid rgba(46,204,139,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, margin: "0 auto 28px", animation: "successPop 0.6s ease both" }}>🎉</div>
          <h1 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 44, fontWeight: 500, color: "#F5F0E8", marginBottom: 10 }}>Payment <em style={{ color: "#2ECC8B" }}>Successful!</em></h1>
          <p style={{ fontSize: 15, color: "#8A8A9A", marginBottom: 32 }}>Your payment of <strong style={{ color: "#D4AF6A" }}>{formatINR(order.total)}</strong> has been received. Your visa application is now being processed.</p>

          <div style={{ background: "#141420", border: "1px solid rgba(46,204,139,0.2)", borderRadius: 16, padding: "24px", marginBottom: 28, textAlign: "left" }}>
            {[
              { label: "Reference ID", value: order.refId, mono: true },
              { label: "Amount Paid", value: formatINR(order.total) },
              { label: "Visa", value: `${order.flag} ${order.country} — ${order.visaType}` },
              { label: "Status", value: "✅ Payment Confirmed" },
            ].map(row => (
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ fontSize: 12, color: "#8A8A9A" }}>{row.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#F5F0E8", fontFamily: row.mono ? "monospace" : "inherit" }}>{row.value}</span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 13, color: "#8A8A9A", marginBottom: 20 }}>
            Redirecting to tracking page in <strong style={{ color: "#D4AF6A" }}>{countdown}s</strong>...
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/upload" style={{ display: "inline-block", background: "linear-gradient(135deg,#D4AF6A,#E8C977)", color: "#08080F", fontWeight: 800, padding: "14px 24px", borderRadius: 10, textDecoration: "none", fontSize: 14 }}>
              📁 Upload Documents
            </a>
            <a href="/track" style={{ display: "inline-block", background: "transparent", border: "1px solid rgba(212,175,106,0.4)", color: "#D4AF6A", fontWeight: 600, padding: "14px 24px", borderRadius: 10, textDecoration: "none", fontSize: 14 }}>
              📍 Track Application
            </a>
            <a href="/dashboard" style={{ display: "inline-block", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#8A8A9A", fontWeight: 600, padding: "14px 24px", borderRadius: 10, textDecoration: "none", fontSize: 14 }}>
              🏠 Dashboard
            </a>
          </div>
        </div>
      )}

      {/* ── MAIN PAYMENT UI ── */}
      {(step === "review" || step === "pay") && (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px 80px" }}>

          {/* Steps */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40, flexWrap: "wrap" }}>
            <StepDot n={1} label="Review Order" active={step === "review"} done={step === "pay"} />
            <div style={{ flex: 1, height: 1, background: step === "pay" ? "#D4AF6A" : "rgba(255,255,255,0.06)", minWidth: 32, transition: "background 0.3s" }} />
            <StepDot n={2} label="Payment" active={step === "pay"} done={false} />
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)", minWidth: 32 }} />
            <StepDot n={3} label="Confirmation" active={false} done={false} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, alignItems: "start" }}>

            {/* ── LEFT PANEL ── */}
            <div>
              {/* ── STEP 1: REVIEW ── */}
              {step === "review" && (
                <div style={{ animation: "fadeUp 0.4s ease both" }}>
                  <h2 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 36, fontWeight: 500, color: "#F5F0E8", marginBottom: 6 }}>
                    Review your <em style={{ color: "#D4AF6A" }}>Order</em>
                  </h2>
                  <p style={{ fontSize: 14, color: "#8A8A9A", marginBottom: 28 }}>Please verify the details below before proceeding to payment.</p>

                  {/* Application summary */}
                  <div style={{ background: "#141420", border: "1px solid rgba(212,175,106,0.15)", borderRadius: 14, padding: "24px", marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                      <span style={{ fontSize: 48 }}>{order.flag}</span>
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 700, color: "#F5F0E8" }}>{order.country}</div>
                        <div style={{ fontSize: 13, color: "#8A8A9A", marginTop: 2 }}>{order.visaType}</div>
                      </div>
                      <div style={{ marginLeft: "auto", textAlign: "right" }}>
                        <div style={{ fontSize: 11, color: "#8A8A9A" }}>Reference</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#D4AF6A", fontFamily: "monospace" }}>{order.refId}</div>
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      {[
                        { label: "Applicant", value: order.applicantName },
                        { label: "Travel Date", value: order.travelDate },
                      ].map(row => (
                        <div key={row.label} style={{ background: "#0F0F1A", borderRadius: 8, padding: "12px 14px" }}>
                          <div style={{ fontSize: 11, color: "#3A3A4E", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>{row.label}</div>
                          <div style={{ fontSize: 14, color: "#F5F0E8", fontWeight: 600 }}>{row.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What&apos;s included */}
                  <div style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "20px 24px", marginBottom: 20 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#D4AF6A", marginBottom: 14 }}>What&apos;s Included</div>
                    {[
                      "Embassy / Government visa fee",
                      "Expert document review by certified visa officers",
                      "Application preparation and submission to embassy",
                      "Real-time status tracking via WhatsApp & email",
                      "Rejection assistance and resubmission support",
                    ].map(item => (
                      <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                        <span style={{ color: "#2ECC8B", flexShrink: 0, marginTop: 2, fontSize: 13 }}>✓</span>
                        <span style={{ fontSize: 13, color: "#A0A0B8", lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Terms */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "4px 0 20px" }}>
                    <input type="checkbox" id="terms" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                      style={{ marginTop: 3, accentColor: "#D4AF6A", width: 16, height: 16, cursor: "pointer", flexShrink: 0 }} />
                    <label htmlFor="terms" style={{ fontSize: 12, color: "#8A8A9A", lineHeight: 1.6, cursor: "pointer" }}>
                      I agree to the <span style={{ color: "#D4AF6A" }}>Terms of Service</span> and <span style={{ color: "#D4AF6A" }}>Refund Policy</span>. I confirm that all application details are accurate. I understand that embassy fees are non-refundable once submitted.
                    </label>
                  </div>

                  <button className="pay-btn" disabled={!agreed}
                    onClick={() => setStep("pay")}
                    style={{ width: "100%", padding: "16px", borderRadius: 12, fontSize: 16 }}>
                    Proceed to Payment — {formatINR(order.total)} →
                  </button>
                </div>
              )}

              {/* ── STEP 2: PAYMENT ── */}
              {step === "pay" && (
                <div style={{ animation: "fadeUp 0.4s ease both" }}>
                  <h2 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 36, fontWeight: 500, color: "#F5F0E8", marginBottom: 6 }}>
                    Choose <em style={{ color: "#D4AF6A" }}>Payment Method</em>
                  </h2>
                  <p style={{ fontSize: 14, color: "#8A8A9A", marginBottom: 28 }}>All payments are processed securely via Razorpay.</p>

                  {/* Payment method selector */}
                  <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
                    <PayMethod icon="📱" label="UPI" selected={payMethod === "upi"} onClick={() => setPayMethod("upi")} />
                    <PayMethod icon="💳" label="Card" selected={payMethod === "card"} onClick={() => setPayMethod("card")} />
                    <PayMethod icon="🏦" label="Net Banking" selected={payMethod === "netbanking"} onClick={() => setPayMethod("netbanking")} />
                    <PayMethod icon="👛" label="Wallet" selected={payMethod === "wallet"} onClick={() => setPayMethod("wallet")} />
                  </div>

                  {/* UPI form */}
                  {payMethod === "upi" && (
                    <div style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "24px", animation: "fadeUp 0.3s ease both" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#D4AF6A", marginBottom: 16 }}>📱 Pay via UPI</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                        <label style={{ fontSize: 12, fontWeight: 600, color: "#8A8A9A", textTransform: "uppercase", letterSpacing: "0.5px" }}>UPI ID</label>
                        <input className="pay-input" value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@upi / yourname@okicici" />
                      </div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {["GPay", "PhonePe", "Paytm", "BHIM"].map(app => (
                          <div key={app} style={{ padding: "6px 14px", background: "#0F0F1A", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 6, fontSize: 12, color: "#8A8A9A" }}>{app}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Card form */}
                  {payMethod === "card" && (
                    <div style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "24px", animation: "fadeUp 0.3s ease both" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#D4AF6A", marginBottom: 16 }}>💳 Credit / Debit Card</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <label style={{ fontSize: 12, fontWeight: 600, color: "#8A8A9A", textTransform: "uppercase", letterSpacing: "0.5px" }}>Card Number</label>
                          <input className="pay-input" value={cardNum} onChange={e => setCardNum(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19} style={{ letterSpacing: "2px" }} />
                        </div>
                        <input className="pay-input" value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Name on Card" />
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={{ fontSize: 12, fontWeight: 600, color: "#8A8A9A", textTransform: "uppercase", letterSpacing: "0.5px" }}>Expiry</label>
                            <input className="pay-input" value={cardExp} onChange={e => setCardExp(formatExp(e.target.value))} placeholder="MM/YY" maxLength={5} />
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={{ fontSize: 12, fontWeight: 600, color: "#8A8A9A", textTransform: "uppercase", letterSpacing: "0.5px" }}>CVV</label>
                            <input className="pay-input" value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g,"").slice(0,3))} placeholder="•••" maxLength={3} type="password" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Net Banking */}
                  {payMethod === "netbanking" && (
                    <div style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "24px", animation: "fadeUp 0.3s ease both" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#D4AF6A", marginBottom: 16 }}>🏦 Select Your Bank</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        {["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Bank", "Yes Bank", "PNB", "Other Banks"].map(bank => (
                          <button key={bank} style={{ padding: "12px", background: "#0F0F1A", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, color: "#F5F0E8", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "all 0.15s" }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(212,175,106,0.3)")}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}>
                            {bank}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Wallet */}
                  {payMethod === "wallet" && (
                    <div style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "24px", animation: "fadeUp 0.3s ease both" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#D4AF6A", marginBottom: 16 }}>👛 Select Wallet</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                        {[{ icon: "🔵", name: "Paytm" }, { icon: "🟣", name: "PhonePe" }, { icon: "🔴", name: "Mobikwik" }, { icon: "🟠", name: "Freecharge" }].map(w => (
                          <button key={w.name} style={{ padding: "14px 8px", background: "#0F0F1A", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "all 0.15s", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(212,175,106,0.3)")}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}>
                            <span style={{ fontSize: 28 }}>{w.icon}</span>
                            <span style={{ fontSize: 12, color: "#8A8A9A", fontWeight: 600 }}>{w.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button className="pay-btn" onClick={handlePay}
                    style={{ width: "100%", padding: "16px", borderRadius: 12, fontSize: 16, marginTop: 20 }}>
                    🔒 Pay {formatINR(order.total)} Securely →
                  </button>

                  <button onClick={() => setStep("review")}
                    style={{ width: "100%", padding: "12px", background: "transparent", border: "none", color: "#8A8A9A", fontSize: 13, cursor: "pointer", marginTop: 10, fontFamily: "'Outfit', sans-serif" }}>
                    ← Back to Review
                  </button>
                </div>
              )}
            </div>

            {/* ── RIGHT: ORDER SUMMARY ── */}
            <div style={{ position: "sticky", top: 76 }}>
              <div style={{ background: "#141420", border: "1px solid rgba(212,175,106,0.2)", borderRadius: 16, padding: "24px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#D4AF6A", marginBottom: 16 }}>Order Summary</div>

                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: 16 }}>
                  <span style={{ fontSize: 28 }}>{order.flag}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#F5F0E8" }}>{order.country}</div>
                    <div style={{ fontSize: 11, color: "#8A8A9A" }}>{order.visaType}</div>
                  </div>
                </div>

                {[
                  { label: "Embassy / Govt Fee", value: formatINR(order.embassyFee) },
                  { label: "Service Fee", value: formatINR(order.serviceFee) },
                  { label: "GST (18%)", value: formatINR(order.gst) },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                    <span style={{ fontSize: 13, color: "#8A8A9A" }}>{row.label}</span>
                    <span style={{ fontSize: 13, color: "#F5F0E8" }}>{row.value}</span>
                  </div>
                ))}

                <div style={{ height: 1, background: "rgba(212,175,106,0.15)", margin: "12px 0" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#F5F0E8" }}>Total</span>
                  <span style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 32, fontWeight: 600, color: "#D4AF6A" }}>{formatINR(order.total)}</span>
                </div>

                {/* Trust signals */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {["🔒 256-bit SSL encryption", "✓ PCI DSS Level 1 certified", "🏦 Powered by Razorpay", "↩️ Refund within 7 business days"].map(t => (
                    <div key={t} style={{ fontSize: 11, color: "#3A3A4E", display: "flex", alignItems: "center", gap: 6 }}>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <SharedFooter />
    </div>
  );
}