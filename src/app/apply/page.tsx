"use client";
import { useState } from "react";
import { COUNTRIES, getTotalFee, formatINR } from "@/lib/visaData";

// ── Types ─────────────────────────────────────────────────────────────────
interface FormData {
  // Step 1
  countrySlug: string;
  visaTypeId: string;
  // Step 2
  fullName: string;
  dob: string;
  gender: string;
  passportNumber: string;
  passportExpiry: string;
  phone: string;
  email: string;
  // Step 3
  travelDate: string;
  returnDate: string;
  purpose: string;
  portOfEntry: string;
  hotelName: string;
  hotelAddress: string;
  notes: string;
}

const EMPTY: FormData = {
  countrySlug: "", visaTypeId: "",
  fullName: "", dob: "", gender: "", passportNumber: "", passportExpiry: "", phone: "", email: "",
  travelDate: "", returnDate: "", purpose: "", portOfEntry: "", hotelName: "", hotelAddress: "", notes: "",
};

const STEPS = [
  { n: 1, label: "Destination", icon: "🌍" },
  { n: 2, label: "Personal Info", icon: "🪪" },
  { n: 3, label: "Travel Details", icon: "✈️" },
  { n: 4, label: "Review & Pay", icon: "💳" },
];

// ── Helpers ───────────────────────────────────────────────────────────────
const Input = ({ label, value, onChange, placeholder = "", type = "text", required = false, hint = "" }: any) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: "#8A8A9A", letterSpacing: "0.5px", textTransform: "uppercase" }}>
      {label} {required && <span style={{ color: "#E85D4A" }}>*</span>}
    </label>
    <input
      type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ background: "#0F0F1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "12px 14px", color: "#F5F0E8", fontSize: 14, fontFamily: "'Outfit', sans-serif", outline: "none", transition: "border-color 0.2s", width: "100%" }}
      onFocus={e => e.target.style.borderColor = "rgba(212,175,106,0.5)"}
      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
    />
    {hint && <span style={{ fontSize: 11, color: "#3A3A4E" }}>{hint}</span>}
  </div>
);

const Select = ({ label, value, onChange, options, required = false }: any) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: "#8A8A9A", letterSpacing: "0.5px", textTransform: "uppercase" }}>
      {label} {required && <span style={{ color: "#E85D4A" }}>*</span>}
    </label>
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ background: "#0F0F1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "12px 14px", color: value ? "#F5F0E8" : "#3A3A4E", fontSize: 14, fontFamily: "'Outfit', sans-serif", outline: "none", cursor: "pointer", width: "100%" }}
      onFocus={e => e.target.style.borderColor = "rgba(212,175,106,0.5)"}
      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}>
      {options.map((o: any) => <option key={o.value} value={o.value} style={{ background: "#141420" }}>{o.label}</option>)}
    </select>
  </div>
);

const Textarea = ({ label, value, onChange, placeholder = "", hint = "" }: any) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: "#8A8A9A", letterSpacing: "0.5px", textTransform: "uppercase" }}>{label}</label>
    <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3}
      style={{ background: "#0F0F1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "12px 14px", color: "#F5F0E8", fontSize: 14, fontFamily: "'Outfit', sans-serif", outline: "none", resize: "vertical", width: "100%" }}
      onFocus={e => e.target.style.borderColor = "rgba(212,175,106,0.5)"}
      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
    {hint && <span style={{ fontSize: 11, color: "#3A3A4E" }}>{hint}</span>}
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────
export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(EMPTY);

  const set = (field: keyof FormData) => (val: string) => setForm(p => ({ ...p, [field]: val }));

  const selectedCountry = COUNTRIES.find(c => c.slug === form.countrySlug);
  const selectedVisa = selectedCountry?.visaTypes.find(v => v.id === form.visaTypeId);
  const totalFee = selectedVisa ? getTotalFee(selectedVisa) : 0;

  // Validation per step
  const canNext = () => {
    if (step === 1) return !!form.countrySlug && !!form.visaTypeId;
    if (step === 2) return !!form.fullName && !!form.dob && !!form.gender && !!form.passportNumber && !!form.passportExpiry && !!form.phone && !!form.email;
    if (step === 3) return !!form.travelDate && !!form.returnDate && !!form.purpose;
    return true;
  };

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#08080F", color: "#F5F0E8", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,500;0,600;1,300;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #08080F; } ::-webkit-scrollbar-thumb { background: #3A3A4E; border-radius: 2px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .apply-btn { background: linear-gradient(135deg, #D4AF6A, #E8C977); color: #08080F; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s; font-family: 'Outfit', sans-serif; }
        .apply-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(212,175,106,0.35); }
        .apply-btn:disabled { opacity: 0.35; cursor: not-allowed; transform: none; box-shadow: none; }
        .country-card { transition: all 0.2s; cursor: pointer; }
        .country-card:hover { border-color: rgba(212,175,106,0.4) !important; transform: translateY(-2px); }
        .visa-card { transition: all 0.2s; cursor: pointer; }
        .visa-card:hover { border-color: rgba(212,175,106,0.4) !important; }
        input::placeholder, textarea::placeholder { color: #3A3A4E; }
        select option { background: #141420; color: #F5F0E8; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ height: 60, background: "rgba(8,8,15,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(212,175,106,0.12)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: "linear-gradient(135deg, #D4AF6A, #E8C977)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✈</div>
          <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 18, fontWeight: 600, color: "#D4AF6A" }}>
            mytriplooker <span style={{ fontSize: 12, color: "#8A8A9A", fontFamily: "'Outfit', sans-serif", fontWeight: 400 }}>/ apply</span>
          </div>
        </div>
        <a href="/" style={{ fontSize: 13, color: "#8A8A9A", textDecoration: "none" }}>← Back to Home</a>
      </nav>

      {/* ── STEPPER ── */}
      <div style={{ background: "#141420", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "20px 32px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", alignItems: "center", gap: 0 }}>
          {STEPS.map((s, i) => {
            const done = step > s.n;
            const active = step === s.n;
            return (
              <div key={s.n} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: done ? "pointer" : "default" }}
                  onClick={() => done && setStep(s.n)}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: done ? 16 : 14, fontWeight: 700, flexShrink: 0, background: done ? "#2ECC8B" : active ? "linear-gradient(135deg, #D4AF6A, #E8C977)" : "#0F0F1A", color: done ? "#08080F" : active ? "#08080F" : "#3A3A4E", border: done ? "none" : active ? "none" : "1px solid rgba(255,255,255,0.08)", transition: "all 0.3s" }}>
                    {done ? "✓" : s.icon}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: 10, color: "#3A3A4E", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>Step {s.n}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: active ? "#D4AF6A" : done ? "#2ECC8B" : "#3A3A4E" }}>{s.label}</span>
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ flex: 1, height: 1, background: done ? "#2ECC8B" : "rgba(255,255,255,0.06)", margin: "0 16px", transition: "background 0.3s" }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── FORM BODY ── */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ════ STEP 1: DESTINATION ════ */}
        {step === 1 && (
          <div style={{ animation: "fadeUp 0.4s ease both" }}>
            <h2 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 36, fontWeight: 500, color: "#F5F0E8", marginBottom: 8 }}>
              Where are you <em style={{ color: "#D4AF6A" }}>travelling?</em>
            </h2>
            <p style={{ fontSize: 14, color: "#8A8A9A", marginBottom: 32 }}>Select your destination and visa type to get started.</p>

            {/* Country grid */}
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#8A8A9A", marginBottom: 14 }}>Select Destination</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, marginBottom: 32 }}>
              {COUNTRIES.map(c => {
                const selected = form.countrySlug === c.slug;
                return (
                  <div key={c.slug} className="country-card"
                    onClick={() => setForm(p => ({ ...p, countrySlug: c.slug, visaTypeId: c.visaTypes[0].id }))}
                    style={{ background: selected ? "rgba(212,175,106,0.08)" : "#141420", border: `1px solid ${selected ? "rgba(212,175,106,0.5)" : "rgba(255,255,255,0.06)"}`, borderRadius: 12, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 32 }}>{c.flag}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: selected ? "#D4AF6A" : "#F5F0E8" }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: "#8A8A9A", marginTop: 2 }}>{c.tagline}</div>
                    </div>
                    {selected && <span style={{ marginLeft: "auto", color: "#D4AF6A", fontSize: 18 }}>✓</span>}
                  </div>
                );
              })}
            </div>

            {/* Visa type selector */}
            {selectedCountry && (
              <div style={{ animation: "fadeUp 0.3s ease both" }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#8A8A9A", marginBottom: 14 }}>Select Visa Type</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {selectedCountry.visaTypes.map(v => {
                    const selected = form.visaTypeId === v.id;
                    const fee = getTotalFee(v);
                    return (
                      <div key={v.id} className="visa-card"
                        onClick={() => set("visaTypeId")(v.id)}
                        style={{ background: selected ? "rgba(212,175,106,0.06)" : "#141420", border: `1px solid ${selected ? "rgba(212,175,106,0.4)" : "rgba(255,255,255,0.06)"}`, borderRadius: 12, padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${selected ? "#D4AF6A" : "rgba(255,255,255,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            {selected && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#D4AF6A" }} />}
                          </div>
                          <div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: selected ? "#D4AF6A" : "#F5F0E8" }}>{v.label}</div>
                            <div style={{ fontSize: 12, color: "#8A8A9A", marginTop: 3 }}>
                              ⏱ {v.processingDays} days &nbsp;·&nbsp; 📅 Valid {v.validity} &nbsp;·&nbsp; 🔁 {v.entries} entry
                            </div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 22, fontWeight: 600, color: "#D4AF6A" }}>{formatINR(fee)}</div>
                          <div style={{ fontSize: 11, color: "#8A8A9A" }}>incl. GST</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════ STEP 2: PERSONAL INFO ════ */}
        {step === 2 && (
          <div style={{ animation: "fadeUp 0.4s ease both" }}>
            <h2 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 36, fontWeight: 500, color: "#F5F0E8", marginBottom: 8 }}>
              Personal <em style={{ color: "#D4AF6A" }}>Details</em>
            </h2>
            <p style={{ fontSize: 14, color: "#8A8A9A", marginBottom: 32 }}>Enter details exactly as they appear on your passport. Any mismatch will cause rejection.</p>

            <div style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "28px 28px", display: "flex", flexDirection: "column", gap: 22 }}>

              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#D4AF6A", paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                🪪 Applicant Information
              </div>

              <Input label="Full Name (as in passport)" value={form.fullName} onChange={set("fullName")} placeholder="e.g. RAHUL KUMAR GUPTA" required hint="Use BLOCK CAPITALS exactly as printed on your passport" />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Input label="Date of Birth" value={form.dob} onChange={set("dob")} type="date" required />
                <Select label="Gender" value={form.gender} onChange={set("gender")} required options={[{ value: "", label: "Select gender" }, { value: "male", label: "Male" }, { value: "female", label: "Female" }, { value: "other", label: "Other" }]} />
              </div>

              <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#D4AF6A" }}>📘 Passport Details</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Input label="Passport Number" value={form.passportNumber} onChange={set("passportNumber")} placeholder="e.g. A1234567" required hint="Found on the top right of your bio-data page" />
                <Input label="Passport Expiry Date" value={form.passportExpiry} onChange={set("passportExpiry")} type="date" required hint="Must be 6+ months from travel date" />
              </div>

              {/* Warning if expiry is too soon */}
              {form.passportExpiry && form.travelDate && new Date(form.passportExpiry) < new Date(new Date(form.travelDate).setMonth(new Date(form.travelDate).getMonth() + 6)) && (
                <div style={{ padding: "12px 16px", background: "rgba(232,93,74,0.08)", border: "1px solid rgba(232,93,74,0.25)", borderRadius: 8, fontSize: 13, color: "#E8907A", display: "flex", gap: 8 }}>
                  ⚠️ Your passport expires within 6 months of your travel date. Most countries will reject your visa.
                </div>
              )}

              <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#D4AF6A" }}>📱 Contact Details</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Input label="Phone Number" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" type="tel" required hint="WhatsApp number preferred" />
                <Input label="Email Address" value={form.email} onChange={set("email")} placeholder="you@email.com" type="email" required hint="Visa updates will be sent here" />
              </div>
            </div>
          </div>
        )}

        {/* ════ STEP 3: TRAVEL DETAILS ════ */}
        {step === 3 && (
          <div style={{ animation: "fadeUp 0.4s ease both" }}>
            <h2 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 36, fontWeight: 500, color: "#F5F0E8", marginBottom: 8 }}>
              Travel <em style={{ color: "#D4AF6A" }}>Details</em>
            </h2>
            <p style={{ fontSize: 14, color: "#8A8A9A", marginBottom: 32 }}>Your travel plan helps us prepare your visa application accurately.</p>

            <div style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "28px", display: "flex", flexDirection: "column", gap: 22 }}>

              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#D4AF6A", paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                ✈️ Flight Details
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Input label="Travel Date (Departure)" value={form.travelDate} onChange={set("travelDate")} type="date" required hint="Date you fly out of India" />
                <Input label="Return Date" value={form.returnDate} onChange={set("returnDate")} type="date" required hint="Date you fly back to India" />
              </div>

              {/* Duration indicator */}
              {form.travelDate && form.returnDate && (
                <div style={{ padding: "10px 14px", background: "rgba(212,175,106,0.06)", border: "1px solid rgba(212,175,106,0.15)", borderRadius: 8, fontSize: 13, color: "#D4AF6A", fontWeight: 600 }}>
                  📅 Trip Duration: {Math.ceil((new Date(form.returnDate).getTime() - new Date(form.travelDate).getTime()) / (1000 * 60 * 60 * 24))} days
                </div>
              )}

              <Select label="Port of Entry" value={form.portOfEntry} onChange={set("portOfEntry")} options={[
                { value: "", label: "Select entry point" },
                ...(selectedCountry?.slug === "uae" ? [{ value: "DXB", label: "Dubai International Airport (DXB)" }, { value: "AUH", label: "Abu Dhabi International Airport (AUH)" }] : []),
                ...(selectedCountry?.slug === "thailand" ? [{ value: "BKK", label: "Suvarnabhumi Airport, Bangkok (BKK)" }, { value: "HKT", label: "Phuket International Airport (HKT)" }] : []),
                ...(selectedCountry?.slug === "singapore" ? [{ value: "SIN", label: "Changi Airport, Singapore (SIN)" }] : []),
                ...(selectedCountry?.slug === "france" ? [{ value: "CDG", label: "Charles de Gaulle, Paris (CDG)" }] : []),
                { value: "other", label: "Other" },
              ]} />

              <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#D4AF6A" }}>🏨 Accommodation</div>

              <Input label="Hotel / Accommodation Name" value={form.hotelName} onChange={set("hotelName")} placeholder="e.g. Burj Al Arab, Dubai" hint="If staying with family, write their name and relationship" />
              <Input label="Hotel Address" value={form.hotelAddress} onChange={set("hotelAddress")} placeholder="Full address including city" hint="Must match your hotel booking confirmation exactly" />

              <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#D4AF6A" }}>📋 Purpose of Visit</div>

              <Select label="Purpose of Travel" value={form.purpose} onChange={set("purpose")} required options={[
                { value: "", label: "Select purpose" },
                { value: "tourism", label: "Tourism / Holiday" },
                { value: "business", label: "Business Meeting" },
                { value: "family", label: "Visiting Family / Friends" },
                { value: "medical", label: "Medical Treatment" },
                { value: "education", label: "Education / Conference" },
                { value: "transit", label: "Transit" },
              ]} />

              <Textarea label="Additional Notes (optional)" value={form.notes} onChange={set("notes")} placeholder="Any special requirements or information for our visa team..." hint="E.g. disability requirements, previous visa rejections, etc." />
            </div>
          </div>
        )}

        {/* ════ STEP 4: REVIEW ════ */}
        {step === 4 && selectedCountry && selectedVisa && (
          <div style={{ animation: "fadeUp 0.4s ease both" }}>
            <h2 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 36, fontWeight: 500, color: "#F5F0E8", marginBottom: 8 }}>
              Review & <em style={{ color: "#D4AF6A" }}>Pay</em>
            </h2>
            <p style={{ fontSize: 14, color: "#8A8A9A", marginBottom: 32 }}>Please review all details carefully before proceeding to payment.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Visa selected */}
              <div style={{ background: "#141420", border: "1px solid rgba(212,175,106,0.2)", borderRadius: 14, padding: "20px 24px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#D4AF6A", marginBottom: 14 }}>🌍 Visa Selected</div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 40 }}>{selectedCountry.flag}</span>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#F5F0E8" }}>{selectedCountry.name}</div>
                    <div style={{ fontSize: 13, color: "#8A8A9A", marginTop: 2 }}>{selectedVisa.label} · {selectedVisa.processingDays} working days</div>
                  </div>
                  <button onClick={() => setStep(1)} style={{ marginLeft: "auto", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#8A8A9A", padding: "6px 14px", borderRadius: 6, fontSize: 12, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>Edit</button>
                </div>
              </div>

              {/* Personal details */}
              <div style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "20px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#D4AF6A" }}>🪪 Personal Details</div>
                  <button onClick={() => setStep(2)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#8A8A9A", padding: "6px 14px", borderRadius: 6, fontSize: 12, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>Edit</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { label: "Full Name", value: form.fullName },
                    { label: "Date of Birth", value: form.dob },
                    { label: "Gender", value: form.gender },
                    { label: "Passport Number", value: form.passportNumber },
                    { label: "Passport Expiry", value: form.passportExpiry },
                    { label: "Phone", value: form.phone },
                    { label: "Email", value: form.email },
                  ].map(row => (
                    <div key={row.label}>
                      <div style={{ fontSize: 11, color: "#3A3A4E", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{row.label}</div>
                      <div style={{ fontSize: 14, color: "#F5F0E8", marginTop: 2, fontWeight: 500 }}>{row.value || "—"}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Travel details */}
              <div style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "20px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#D4AF6A" }}>✈️ Travel Details</div>
                  <button onClick={() => setStep(3)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#8A8A9A", padding: "6px 14px", borderRadius: 6, fontSize: 12, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>Edit</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { label: "Travel Date", value: form.travelDate },
                    { label: "Return Date", value: form.returnDate },
                    { label: "Port of Entry", value: form.portOfEntry },
                    { label: "Purpose", value: form.purpose },
                    { label: "Hotel", value: form.hotelName },
                  ].map(row => (
                    <div key={row.label}>
                      <div style={{ fontSize: 11, color: "#3A3A4E", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{row.label}</div>
                      <div style={{ fontSize: 14, color: "#F5F0E8", marginTop: 2, fontWeight: 500 }}>{row.value || "—"}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment summary */}
              <div style={{ background: "linear-gradient(135deg, #141420, #1A1A28)", border: "1px solid rgba(212,175,106,0.25)", borderRadius: 14, padding: "24px 28px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#D4AF6A", marginBottom: 16 }}>💳 Payment Summary</div>
                {[
                  { label: "Embassy / Govt Fee", value: formatINR(selectedVisa.embassyFee) },
                  { label: "Service Fee", value: formatINR(selectedVisa.serviceFee) },
                  { label: "GST (18%)", value: formatINR(Math.round((selectedVisa.embassyFee + selectedVisa.serviceFee) * 0.18)) },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ fontSize: 13, color: "#8A8A9A" }}>{row.label}</span>
                    <span style={{ fontSize: 13, color: "#F5F0E8" }}>{row.value}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#F5F0E8" }}>Total Amount</span>
                  <span style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 32, fontWeight: 600, color: "#D4AF6A" }}>{formatINR(totalFee)}</span>
                </div>
                <div style={{ marginTop: 6, fontSize: 12, color: "#3A3A4E" }}>Payment via UPI, Credit/Debit Card, Net Banking</div>
              </div>

              {/* Terms */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 0" }}>
                <input type="checkbox" id="terms" style={{ marginTop: 2, accentColor: "#D4AF6A", width: 16, height: 16, cursor: "pointer" }} />
                <label htmlFor="terms" style={{ fontSize: 13, color: "#8A8A9A", lineHeight: 1.6, cursor: "pointer" }}>
                  I confirm that all information provided is accurate and matches my passport. I understand that incorrect information may result in visa rejection without refund.
                </label>
              </div>

              {/* Pay button */}
              <button className="apply-btn" style={{ width: "100%", padding: "18px", borderRadius: 12, fontSize: 16, letterSpacing: "0.5px" }}>
                🔒 Proceed to Payment — {formatINR(totalFee)}
              </button>

              <div style={{ textAlign: "center", fontSize: 12, color: "#3A3A4E" }}>
                Secured by Razorpay · 256-bit SSL encryption · Refundable if rejected at our end
              </div>
            </div>
          </div>
        )}

        {/* ── NAVIGATION BUTTONS ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 36, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <button onClick={() => setStep(s => s - 1)} disabled={step === 1}
            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: step === 1 ? "#3A3A4E" : "#8A8A9A", padding: "12px 28px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: step === 1 ? "not-allowed" : "pointer", fontFamily: "'Outfit', sans-serif", transition: "all 0.2s" }}>
            ← Previous
          </button>

          <div style={{ display: "flex", gap: 8 }}>
            {STEPS.map(s => (
              <div key={s.n} style={{ width: step === s.n ? 24 : 8, height: 8, borderRadius: 4, background: step > s.n ? "#2ECC8B" : step === s.n ? "#D4AF6A" : "rgba(255,255,255,0.1)", transition: "all 0.3s" }} />
            ))}
          </div>

          {step < 4 ? (
            <button onClick={() => setStep(s => s + 1)} disabled={!canNext()} className="apply-btn"
              style={{ padding: "12px 32px", borderRadius: 8, fontSize: 14 }}>
              Continue →
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}