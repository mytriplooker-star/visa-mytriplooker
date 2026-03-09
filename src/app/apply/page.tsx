"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { COUNTRIES, getTotalFee, formatINR } from "@/lib/visaData";

interface FormData {
  countrySlug: string; visaTypeId: string;
  fullName: string; dob: string; gender: string;
  passportNumber: string; passportExpiry: string; phone: string; email: string;
  travelDate: string; returnDate: string; purpose: string;
  portOfEntry: string; hotelName: string; hotelAddress: string; notes: string;
}
const EMPTY: FormData = {
  countrySlug:"",visaTypeId:"",fullName:"",dob:"",gender:"",passportNumber:"",
  passportExpiry:"",phone:"",email:"",travelDate:"",returnDate:"",
  purpose:"",portOfEntry:"",hotelName:"",hotelAddress:"",notes:"",
};
const STEPS = [
  {n:1,label:"Destination",icon:"1"},
  {n:2,label:"Personal Info",icon:"2"},
  {n:3,label:"Travel Details",icon:"3"},
  {n:4,label:"Review & Pay",icon:"4"},

// ── Field components ──────────────────────────────────────────────────────
];

const fieldBase: React.CSSProperties = {
  background: "#1A1A28",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8, padding: "13px 14px",
  color: "#F5F0E8", fontSize: 14,
  fontFamily: "'Outfit', sans-serif",
  outline: "none", width: "100%",
  transition: "border-color 0.2s",
};
const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, color: "#8A8A9A",
  letterSpacing: "0.6px", textTransform: "uppercase" as const,
  marginBottom: 6, display: "block",
};

const Input = ({ label, value, onChange, placeholder="", type="text", required=false, hint="" }: any) => (
  <div style={{display:"flex",flexDirection:"column"}}>
    <label style={labelStyle}>{label}{required&&<span style={{color:"#E85D4A",marginLeft:4}}>*</span>}</label>
    <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      style={fieldBase}
      onFocus={e=>(e.target.style.borderColor="rgba(212,175,106,0.6)")}
      onBlur={e=>(e.target.style.borderColor="rgba(255,255,255,0.1)")}
    />
    {hint&&<span style={{fontSize:11,color:"#5A5A6E",marginTop:5}}>{hint}</span>}
  </div>
);

// ── Gender: custom radio buttons instead of a <select> ─────────────────
const GenderPicker = ({ value, onChange }: { value: string; onChange: (v:string)=>void }) => (
  <div style={{display:"flex",flexDirection:"column"}}>
    <label style={labelStyle}>Gender<span style={{color:"#E85D4A",marginLeft:4}}>*</span></label>
    <div style={{display:"flex",gap:10}}>
      {["Male","Female","Other"].map(g=>{
        const active = value === g.toLowerCase();
        return (
          <button key={g} type="button" onClick={()=>onChange(g.toLowerCase())}
            style={{
              flex:1, padding:"12px 8px", borderRadius:8, cursor:"pointer",
              fontFamily:"'Outfit',sans-serif", fontSize:14, fontWeight:600,
              border:`1px solid ${active?"rgba(212,175,106,0.7)":"rgba(255,255,255,0.1)"}`,
              background: active ? "rgba(212,175,106,0.12)" : "#1A1A28",
              color: active ? "#D4AF6A" : "#F5F0E8",
              transition:"all 0.2s",
            }}>
            {g==="Male"?"👨 ":g==="Female"?"👩 ":"⚧️ "}{g}
          </button>
        );
      })}
    </div>
  </div>
);

const SelectField = ({ label, value, onChange, options, required=false }: any) => (
  <div style={{display:"flex",flexDirection:"column"}}>
    <label style={labelStyle}>{label}{required&&<span style={{color:"#E85D4A",marginLeft:4}}>*</span>}</label>
    <select value={value} onChange={e=>onChange(e.target.value)}
      style={{...fieldBase, color: value ? "#F5F0E8" : "#5A5A6E", appearance:"none",
        backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%238A8A9A'/%3E%3C/svg%3E")`,
        backgroundRepeat:"no-repeat", backgroundPosition:"right 14px center", paddingRight:36,
      }}
      onFocus={e=>(e.target.style.borderColor="rgba(212,175,106,0.6)")}
      onBlur={e=>(e.target.style.borderColor="rgba(255,255,255,0.1)")}>
      {options.map((o:any)=><option key={o.value} value={o.value} style={{background:"#1A1A28",color:"#F5F0E8"}}>{o.label}</option>)}
    </select>
  </div>
);

const Textarea = ({ label, value, onChange, placeholder="", hint="" }: any) => (
  <div style={{display:"flex",flexDirection:"column"}}>
    <label style={labelStyle}>{label}</label>
    <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={3}
      style={{...fieldBase, resize:"vertical"}}
      onFocus={e=>(e.target.style.borderColor="rgba(212,175,106,0.6)")}
      onBlur={e=>(e.target.style.borderColor="rgba(255,255,255,0.1)")}
    />
    {hint&&<span style={{fontSize:11,color:"#5A5A6E",marginTop:5}}>{hint}</span>}
  </div>
);

// ── MTL Logo ──────────────────────────────────────────────────────────────

// ── Country search helper ─────────────────────────────────────────────────
function resolveSlug(raw: string): string {
  if (!raw) return "";
  const lower = raw.toLowerCase();
  // Try exact slug match first
  const exact = COUNTRIES.find(c => c.slug === lower);
  if (exact) return exact.slug;
  // Try name match (handles "Saudi Arabia", "UAE", "Bali / Indonesia" etc)
  const byName = COUNTRIES.find(c =>
    c.name.toLowerCase().includes(lower) ||
    lower.includes(c.name.toLowerCase().split(" ")[0].toLowerCase()) ||
    c.slug.replace(/-/g," ").includes(lower)
  );
  return byName?.slug ?? "";
}

// ── Main ──────────────────────────────────────────────────────────────────

function ApplyPageInner() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [countrySearch, setCountrySearch] = useState("");

  // Pre-select country from URL ?country=slug-or-name
  useEffect(() => {
    const raw = searchParams.get("country") ?? "";
    if (!raw) return;
    const slug = resolveSlug(raw);
    if (!slug) return;
    const country = COUNTRIES.find(c => c.slug === slug);
    if (!country) return;
    setForm(p => ({ ...p, countrySlug: slug, visaTypeId: country.visaTypes[0].id }));
  }, [searchParams]);

  const set = (field: keyof FormData) => (val: string) =>
    setForm(p => ({ ...p, [field]: val }));

  const selectedCountry = COUNTRIES.find(c => c.slug === form.countrySlug);
  const selectedVisa    = selectedCountry?.visaTypes.find(v => v.id === form.visaTypeId);
  const totalFee        = selectedVisa ? getTotalFee(selectedVisa) : 0;

  const canNext = () => {
    if (step===1) return !!form.countrySlug && !!form.visaTypeId;
    if (step===2) return !!form.fullName&&!!form.dob&&!!form.gender&&!!form.passportNumber&&!!form.passportExpiry&&!!form.phone&&!!form.email;
    if (step===3) return !!form.travelDate&&!!form.returnDate&&!!form.purpose;
    return true;
  };

  return (
    <div style={{fontFamily:"'Outfit',sans-serif",background:"#08080F",color:"#F5F0E8",minHeight:"100vh"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,500;0,600;1,300;1,400&family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:#08080F;}::-webkit-scrollbar-thumb{background:#3A3A4E;border-radius:2px;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .apply-btn{background:linear-gradient(135deg,#D4AF6A,#E8C977);color:#08080F;font-weight:700;border:none;cursor:pointer;transition:all 0.2s;font-family:'Outfit',sans-serif;}
        .apply-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(212,175,106,0.35);}
        .apply-btn:disabled{opacity:0.35;cursor:not-allowed;transform:none;box-shadow:none;}
        .country-card{transition:all 0.2s;cursor:pointer;}
        .country-card:hover{border-color:rgba(212,175,106,0.5)!important;transform:translateY(-2px);}
        .visa-card{transition:all 0.2s;cursor:pointer;}
        .visa-card:hover{border-color:rgba(212,175,106,0.5)!important;}
        input::placeholder,textarea::placeholder{color:#3A3A4E;}
        input[type=date]::-webkit-calendar-picker-indicator{filter:invert(0.5);}
        select option{background:#1A1A28;color:#F5F0E8;}
        .csearch{background:#1A1A28;border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:10px 14px;color:#F5F0E8;font-size:14px;font-family:'Outfit',sans-serif;outline:none;width:100%;}
        .csearch:focus{border-color:rgba(212,175,106,0.6);}
        .csearch::placeholder{color:#3A3A4E;}
      `}</style>

      <SharedNav current="/apply" />

      {/* STEPPER */}
      <div style={{background:"#0E0E1A",borderBottom:"1px solid rgba(255,255,255,0.05)",padding:"0 32px"}}>
        <div style={{maxWidth:760,margin:"0 auto",display:"flex",alignItems:"stretch"}}>
          {STEPS.map((s,i)=>{
            const done=step>s.n, active=step===s.n;
            return (
              <div key={s.n} style={{display:"flex",alignItems:"center",flex:i<STEPS.length-1?1:"none",padding:"18px 0"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,cursor:done?"pointer":"default",flexShrink:0}} onClick={()=>done&&setStep(s.n)}>
                  <div style={{
                    width:32,height:32,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:13,fontWeight:800,flexShrink:0,transition:"all 0.3s",
                    background: done ? "#2ECC8B" : active ? "linear-gradient(135deg,#D4AF6A,#E8C977)" : "#1A1A28",
                    color: done || active ? "#08080F" : "#5A5A6E",
                    border: done || active ? "none" : "1.5px solid #2A2A3E",
                  }}>
                    {done ? "✓" : s.n}
                  </div>
                  <div style={{display:"flex",flexDirection:"column"}}>
                    <span style={{fontSize:10,color:active?"#D4AF6A":done?"#2ECC8B":"#3A3A4E",fontWeight:700,letterSpacing:"0.5px",textTransform:"uppercase"}}>Step {s.n}</span>
                    <span style={{fontSize:12,fontWeight:700,color:active?"#F5F0E8":done?"#2ECC8B":"#3A3A4E"}}>{s.label}</span>
                  </div>
                </div>
                {i<STEPS.length-1&&(
                  <div style={{flex:1,height:1.5,background:done?"#2ECC8B":"#1A1A28",margin:"0 12px",transition:"background 0.4s",borderRadius:2}}/>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* FORM */}
      <div style={{maxWidth:760,margin:"0 auto",padding:"40px 24px 80px"}}>

        {/* STEP 1: DESTINATION */}
        {step===1&&(
          <Step1
            form={form} setForm={setForm} set={set}
            selectedCountry={selectedCountry} selectedVisa={selectedVisa}
            countrySearch={countrySearch} setCountrySearch={setCountrySearch}
          />
        )}

        {/* STEP 2: PERSONAL INFO */}
        {step===2&&(
          <div style={{animation:"fadeUp 0.4s ease both"}}>
            <h2 style={{fontFamily:"'Cormorant Garant',serif",fontSize:36,fontWeight:500,color:"#F5F0E8",marginBottom:8}}>
              Personal <em style={{color:"#D4AF6A"}}>Details</em>
            </h2>
            <p style={{fontSize:14,color:"#8A8A9A",marginBottom:32}}>Enter details exactly as they appear on your passport.</p>

            <div style={{background:"#141420",border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,padding:"28px",display:"flex",flexDirection:"column",gap:22}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:"#D4AF6A",paddingBottom:12,borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                🪪 Applicant Information
              </div>
              <Input label="Full Name (as in passport)" value={form.fullName} onChange={set("fullName")} placeholder="e.g. RAHUL KUMAR GUPTA" required hint="Use BLOCK CAPITALS exactly as printed on your passport" />
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <Input label="Date of Birth" value={form.dob} onChange={set("dob")} type="date" required />
                <GenderPicker value={form.gender} onChange={set("gender")} />
              </div>

              <div style={{height:1,background:"rgba(255,255,255,0.05)"}}/>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:"#D4AF6A"}}>📘 Passport Details</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <Input label="Passport Number" value={form.passportNumber} onChange={set("passportNumber")} placeholder="e.g. A1234567" required hint="Top-right of your bio-data page" />
                <Input label="Passport Expiry Date" value={form.passportExpiry} onChange={set("passportExpiry")} type="date" required hint="Must be 6+ months from travel date" />
              </div>
              {form.passportExpiry&&form.travelDate&&new Date(form.passportExpiry)<new Date(new Date(form.travelDate).setMonth(new Date(form.travelDate).getMonth()+6))&&(
                <div style={{padding:"12px 16px",background:"rgba(232,93,74,0.08)",border:"1px solid rgba(232,93,74,0.25)",borderRadius:8,fontSize:13,color:"#E8907A"}}>
                  ⚠️ Passport expires within 6 months of your travel date. Most countries will reject your visa.
                </div>
              )}

              <div style={{height:1,background:"rgba(255,255,255,0.05)"}}/>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:"#D4AF6A"}}>📞 Contact Details</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <Input label="Mobile Number" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" type="tel" required hint="We'll send WhatsApp updates here" />
                <Input label="Email Address" value={form.email} onChange={set("email")} placeholder="name@email.com" type="email" required hint="Visa approval sent here" />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: TRAVEL DETAILS */}
        {step===3&&(
          <div style={{animation:"fadeUp 0.4s ease both"}}>
            <h2 style={{fontFamily:"'Cormorant Garant',serif",fontSize:36,fontWeight:500,color:"#F5F0E8",marginBottom:8}}>
              Travel <em style={{color:"#D4AF6A"}}>Details</em>
            </h2>
            <p style={{fontSize:14,color:"#8A8A9A",marginBottom:32}}>Tell us about your trip so we can prepare your application.</p>

            <div style={{background:"#141420",border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,padding:"28px",display:"flex",flexDirection:"column",gap:22}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:"#D4AF6A",paddingBottom:12,borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                ✈️ Trip Information
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <Input label="Intended Travel Date" value={form.travelDate} onChange={set("travelDate")} type="date" required />
                <Input label="Return Date" value={form.returnDate} onChange={set("returnDate")} type="date" required />
              </div>
              <SelectField label="Purpose of Visit" value={form.purpose} onChange={set("purpose")} required options={[
                {value:"",label:"Select purpose"},
                {value:"tourism",label:"Tourism / Holiday"},
                {value:"business",label:"Business"},
                {value:"medical",label:"Medical Treatment"},
                {value:"education",label:"Education / Study"},
                {value:"family",label:"Visiting Family / Friends"},
                {value:"transit",label:"Transit"},
              ]}/>
              <Input label="Port of Entry" value={form.portOfEntry} onChange={set("portOfEntry")} placeholder="e.g. Dubai International Airport" hint="City/airport where you'll enter the country" />

              <div style={{height:1,background:"rgba(255,255,255,0.05)"}}/>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:"#D4AF6A"}}>🏨 Accommodation</div>
              <Input label="Hotel / Accommodation Name" value={form.hotelName} onChange={set("hotelName")} placeholder="e.g. Atlantis The Palm" />
              <Input label="Hotel Address" value={form.hotelAddress} onChange={set("hotelAddress")} placeholder="Full hotel address" />
              <Textarea label="Additional Notes" value={form.notes} onChange={set("notes")} placeholder="Any special requests or information for our team..." />
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW */}
        {step===4&&selectedCountry&&selectedVisa&&(
          <div style={{animation:"fadeUp 0.4s ease both",display:"flex",flexDirection:"column",gap:20}}>
            <h2 style={{fontFamily:"'Cormorant Garant',serif",fontSize:36,fontWeight:500,color:"#F5F0E8",marginBottom:0}}>
              Review & <em style={{color:"#D4AF6A"}}>Pay</em>
            </h2>
            <p style={{fontSize:14,color:"#8A8A9A",marginTop:4,marginBottom:12}}>Double-check all your details before proceeding to payment.</p>

            {/* Visa */}
            <div style={{background:"#141420",border:"1px solid rgba(212,175,106,0.2)",borderRadius:14,padding:"20px 24px"}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:"#D4AF6A",marginBottom:14}}>🌍 Visa Selected</div>
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <span style={{fontSize:40}}>{selectedCountry.flag}</span>
                <div>
                  <div style={{fontFamily:"'Cormorant Garant',serif",fontSize:20,fontWeight:600,color:"#F5F0E8"}}>{selectedCountry.name}</div>
                  <div style={{fontSize:13,color:"#8A8A9A",marginTop:2}}>{selectedVisa.label} · {selectedVisa.processingDays} working days</div>
                </div>
                <button onClick={()=>setStep(1)} style={{marginLeft:"auto",background:"transparent",border:"1px solid rgba(255,255,255,0.1)",color:"#8A8A9A",padding:"6px 14px",borderRadius:6,fontSize:12,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Edit</button>
              </div>
            </div>

            {/* Personal */}
            <div style={{background:"#141420",border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,padding:"20px 24px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:"#D4AF6A"}}>🪪 Personal Details</div>
                <button onClick={()=>setStep(2)} style={{background:"transparent",border:"1px solid rgba(255,255,255,0.1)",color:"#8A8A9A",padding:"6px 14px",borderRadius:6,fontSize:12,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Edit</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {[{label:"Full Name",value:form.fullName},{label:"Date of Birth",value:form.dob},{label:"Gender",value:form.gender},{label:"Passport No.",value:form.passportNumber},{label:"Passport Expiry",value:form.passportExpiry},{label:"Phone",value:form.phone},{label:"Email",value:form.email}].map(r=>(
                  <div key={r.label}>
                    <div style={{fontSize:11,color:"#5A5A6E",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px"}}>{r.label}</div>
                    <div style={{fontSize:14,color:"#F5F0E8",marginTop:2,fontWeight:500}}>{r.value||"—"}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel */}
            <div style={{background:"#141420",border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,padding:"20px 24px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:"#D4AF6A"}}>✈️ Travel Details</div>
                <button onClick={()=>setStep(3)} style={{background:"transparent",border:"1px solid rgba(255,255,255,0.1)",color:"#8A8A9A",padding:"6px 14px",borderRadius:6,fontSize:12,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Edit</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {[{label:"Travel Date",value:form.travelDate},{label:"Return Date",value:form.returnDate},{label:"Port of Entry",value:form.portOfEntry},{label:"Purpose",value:form.purpose},{label:"Hotel",value:form.hotelName}].map(r=>(
                  <div key={r.label}>
                    <div style={{fontSize:11,color:"#5A5A6E",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px"}}>{r.label}</div>
                    <div style={{fontSize:14,color:"#F5F0E8",marginTop:2,fontWeight:500}}>{r.value||"—"}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div style={{background:"linear-gradient(135deg,#141420,#1A1A28)",border:"1px solid rgba(212,175,106,0.25)",borderRadius:14,padding:"24px 28px"}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:"#D4AF6A",marginBottom:16}}>💳 Payment Summary</div>
              {[
                {label:"Embassy / Govt Fee",value:formatINR(selectedVisa.embassyFee)},
                {label:"Service Fee",value:formatINR(selectedVisa.serviceFee)},
                {label:"GST (18%)",value:formatINR(Math.round((selectedVisa.embassyFee+selectedVisa.serviceFee)*0.18))},
              ].map(r=>(
                <div key={r.label} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                  <span style={{fontSize:13,color:"#8A8A9A"}}>{r.label}</span>
                  <span style={{fontSize:13,color:"#F5F0E8"}}>{r.value}</span>
                </div>
              ))}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:14}}>
                <span style={{fontSize:16,fontWeight:700,color:"#F5F0E8"}}>Total Amount</span>
                <span style={{fontFamily:"'Cormorant Garant',serif",fontSize:32,fontWeight:600,color:"#D4AF6A"}}>{formatINR(totalFee)}</span>
              </div>
              <div style={{marginTop:6,fontSize:12,color:"#5A5A6E"}}>Payment via UPI, Credit/Debit Card, Net Banking</div>
            </div>

            <div style={{display:"flex",alignItems:"flex-start",gap:10,padding:"12px 0"}}>
              <input type="checkbox" id="terms" style={{marginTop:2,accentColor:"#D4AF6A",width:16,height:16,cursor:"pointer"}}/>
              <label htmlFor="terms" style={{fontSize:13,color:"#8A8A9A",lineHeight:1.6,cursor:"pointer"}}>
                I confirm all information is accurate and matches my passport. Incorrect details may result in visa rejection without refund.
              </label>
            </div>
            <a href="/upload" className="apply-btn" style={{width:"100%",padding:"18px",borderRadius:12,fontSize:16,display:"block",textAlign:"center",textDecoration:"none"}}>
              📁 Next: Upload Documents →
            </a>
            <p style={{textAlign:"center",fontSize:12,color:"#5A5A6E",marginTop:8}}>
              Upload your passport & documents, then proceed to secure payment
            </p>
            <div style={{textAlign:"center",fontSize:12,color:"#5A5A6E"}}>Secured by Razorpay · 256-bit SSL · Refundable if rejected at our end</div>
          </div>
        )}

        {/* NAV BUTTONS */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:36,paddingTop:24,borderTop:"1px solid rgba(255,255,255,0.05)"}}>
          <button onClick={()=>setStep(s=>s-1)} disabled={step===1}
            style={{background:"transparent",border:"1px solid rgba(255,255,255,0.1)",color:step===1?"#3A3A4E":"#8A8A9A",padding:"12px 28px",borderRadius:8,fontSize:14,fontWeight:600,cursor:step===1?"not-allowed":"pointer",fontFamily:"'Outfit',sans-serif",transition:"all 0.2s"}}>
            ← Previous
          </button>
          <div style={{display:"flex",gap:8}}>
            {STEPS.map(s=>(
              <div key={s.n} style={{width:step===s.n?24:8,height:8,borderRadius:4,background:step>s.n?"#2ECC8B":step===s.n?"#D4AF6A":"rgba(255,255,255,0.1)",transition:"all 0.3s"}}/>
            ))}
          </div>
          {step<4?(
            <button onClick={()=>setStep(s=>s+1)} disabled={!canNext()} className="apply-btn"
              style={{padding:"12px 32px",borderRadius:8,fontSize:14}}>
              Continue →
            </button>
          ):(
            <div style={{width:120}}/>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Step 1 extracted for cleanliness ─────────────────────────────────────
function Step1({ form, setForm, set, selectedCountry, selectedVisa, countrySearch, setCountrySearch }: any) {
  const visaRef = useRef<HTMLDivElement>(null);

  const filtered = COUNTRIES.filter(c => {
    if (!countrySearch.trim()) return true;
    const q = countrySearch.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q) || c.isoCode.toLowerCase().includes(q);
  });

  const handleSelectCountry = (c: any) => {
    setForm((p: FormData) => ({ ...p, countrySlug: c.slug, visaTypeId: c.visaTypes[0].id }));
    // Scroll to visa section after short delay
    setTimeout(() => {
      visaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div style={{animation:"fadeUp 0.4s ease both"}}>
      <h2 style={{fontFamily:"'Cormorant Garant',serif",fontSize:36,fontWeight:500,color:"#F5F0E8",marginBottom:8}}>
        Where are you <em style={{color:"#D4AF6A"}}>travelling?</em>
      </h2>
      <p style={{fontSize:14,color:"#8A8A9A",marginBottom:24}}>Select your destination and visa type to get started.</p>

      {/* Country search */}
      <div style={{position:"relative",marginBottom:16}}>
        <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14,color:"#5A5A6E"}}>🔍</span>
        <input className="csearch" value={countrySearch} onChange={e=>setCountrySearch(e.target.value)}
          placeholder="Search 42 countries — Japan, Bali, Saudi Arabia..."
          style={{paddingLeft:36}}
        />
      </div>

      {/* Country grid */}
      <div style={{fontSize:11,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:"#8A8A9A",marginBottom:12}}>
        {filtered.length} {filtered.length===1?"country":"countries"} available
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10,marginBottom:28,maxHeight:420,overflowY:"auto",paddingRight:4}}>
        {filtered.map(c=>{
          const selected = form.countrySlug===c.slug;
          return (
            <div key={c.slug} className="country-card"
              onClick={()=>handleSelectCountry(c)}
              style={{background:selected?"rgba(212,175,106,0.1)":"#141420",border:`1px solid ${selected?"rgba(212,175,106,0.7)":"rgba(255,255,255,0.06)"}`,borderRadius:12,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,
                boxShadow: selected ? "0 0 0 2px rgba(212,175,106,0.2)" : "none"}}>
              <span style={{fontSize:28,flexShrink:0}}>{c.flag}</span>
              <div style={{minWidth:0}}>
                <div style={{fontSize:13,fontWeight:700,color:selected?"#D4AF6A":"#F5F0E8",lineHeight:1.2}}>{c.name}</div>
                <div style={{fontSize:11,color:"#5A5A6E",marginTop:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.tagline}</div>
              </div>
              {selected&&<span style={{marginLeft:"auto",background:"#D4AF6A",color:"#08080F",borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,flexShrink:0}}>✓</span>}
            </div>
          );
        })}
        {filtered.length===0&&(
          <div style={{gridColumn:"1/-1",textAlign:"center",padding:"40px 20px",color:"#5A5A6E"}}>
            <div style={{fontSize:32,marginBottom:8}}>🔍</div>
            No countries found for "{countrySearch}"
          </div>
        )}
      </div>

      {/* Visa type selector */}
      <div ref={visaRef}>
      {selectedCountry&&(
        <div style={{animation:"fadeUp 0.3s ease both"}}>
          {/* Selected country banner */}
          <div style={{background:"rgba(46,204,139,0.08)",border:"1px solid rgba(46,204,139,0.3)",borderRadius:10,padding:"12px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:24}}>{selectedCountry.flag}</span>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:"#2ECC8B"}}>✓ {selectedCountry.name} selected</div>
              <div style={{fontSize:12,color:"#5A5A6E"}}>Now choose your visa type below</div>
            </div>
          </div>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:"#8A8A9A",marginBottom:12}}>Select Visa Type</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {selectedCountry.visaTypes.map((v:any)=>{
              const selected = form.visaTypeId===v.id;
              const fee = getTotalFee(v);
              return (
                <div key={v.id} className="visa-card"
                  onClick={()=>set("visaTypeId")(v.id)}
                  style={{background:selected?"rgba(212,175,106,0.06)":"#141420",border:`1px solid ${selected?"rgba(212,175,106,0.5)":"rgba(255,255,255,0.06)"}`,borderRadius:12,padding:"18px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{display:"flex",alignItems:"center",gap:14}}>
                    <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${selected?"#D4AF6A":"rgba(255,255,255,0.2)"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {selected&&<div style={{width:10,height:10,borderRadius:"50%",background:"#D4AF6A"}}/>}
                    </div>
                    <div>
                      <div style={{fontSize:15,fontWeight:700,color:selected?"#D4AF6A":"#F5F0E8"}}>{v.label}</div>
                      <div style={{fontSize:12,color:"#8A8A9A",marginTop:3}}>⏱ {v.processingDays} days · 📅 {v.validity} · 🔁 {v.entries} entry</div>
                    </div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontFamily:"'Cormorant Garant',serif",fontSize:22,fontWeight:600,color:"#D4AF6A"}}>{fee===0?"Free":formatINR(fee)}</div>
                    <div style={{fontSize:11,color:"#8A8A9A"}}>incl. GST</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      </div>
      <SharedFooter />
    </div>
  );
}

// Next.js 16 requires useSearchParams() to be wrapped in Suspense

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

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div style={{ background: "#08080F", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, color: "#8A8A9A" }}>Loading...</div>
        </div>
      </div>
    }>
      <ApplyPageInner />
    </Suspense>
  );
}