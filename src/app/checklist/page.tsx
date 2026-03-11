"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import { COUNTRIES, COUNTRY_REGIONS, REGION_META, Region, Country } from "@/lib/visaData";

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

async function generateChecklistPDF(country: Country, visaTypeIndex: number) {
  const { jsPDF } = await import("jspdf");
  const vt = country.visaTypes[visaTypeIndex];
  const totalFee = vt.embassyFee + vt.serviceFee;
  const gst = Math.round(totalFee * 0.18);
  const grandTotal = totalFee + gst;
  const isFree = grandTotal === 0;

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210, PL = 18, PR = 192;
  let y = 0;

  // ── Helper functions ──────────────────────────────────────────────
  const hex = (h: string, a = 1) => {
    const r = parseInt(h.slice(1,3),16), g = parseInt(h.slice(3,5),16), b = parseInt(h.slice(5,7),16);
    return [r,g,b,a] as [number,number,number,number];
  };
  const setFill   = (h: string) => { const [r,g,b] = hex(h); doc.setFillColor(r,g,b); };
  const setStroke = (h: string) => { const [r,g,b] = hex(h); doc.setDrawColor(r,g,b); };
  const setTxt    = (h: string) => { const [r,g,b] = hex(h); doc.setTextColor(r,g,b); };

  // ── HEADER BAND ───────────────────────────────────────────────────
  setFill("#08080F"); doc.rect(0, 0, W, 42, "F");

  // Load logo
  try {
    const resp = await fetch("/logo.png");
    const blob = await resp.blob();
    const b64: string = await new Promise(res => {
      const r = new FileReader();
      r.onload = () => res((r.result as string).split(",")[1]);
      r.readAsDataURL(blob);
    });
    doc.addImage(b64, "PNG", PL, 8, 0, 20, undefined, "FAST");
  } catch { /* logo optional */ }

  // MTL tagline right-aligned
  doc.setFont("helvetica","normal"); doc.setFontSize(8);
  setTxt("#D4AF6A"); doc.text("visa.mytriplooker.com", PR, 16, { align: "right" });
  setTxt("#8A8A9A"); doc.text("Your Visa. Handled.", PR, 22, { align: "right" });

  // Gold divider
  setFill("#D4AF6A"); doc.rect(0, 42, W, 1.2, "F");
  y = 55;

  // ── COUNTRY TITLE ────────────────────────────────────────────────
  doc.setFont("helvetica","bold"); doc.setFontSize(26);
  setTxt("#08080F"); doc.text(`${country.flag}  ${country.name}`, PL, y);
  y += 7;
  doc.setFont("helvetica","normal"); doc.setFontSize(10);
  setTxt("#5A5A6E"); doc.text(country.tagline, PL + 2, y);
  y += 5;
  doc.setFont("helvetica","normal"); doc.setFontSize(9);
  setTxt("#7A7A8A"); doc.text(`Visa Type: ${vt.label}`, PL + 2, y);
  y += 10;

  // ── FEE SUMMARY BOX ───────────────────────────────────────────────
  setFill("#FFF8EC"); setStroke("#D4AF6A");
  doc.setLineWidth(0.5); doc.roundedRect(PL, y, PR - PL, 28, 3, 3, "FD");
  const cols = [PL + 10, PL + 50, PL + 95, PL + 130];
  const labels = ["PROCESSING", "MAX STAY", "EMBASSY FEE", "SERVICE FEE"];
  const vals = [
    `${vt.processingDays} days`, vt.maxStay,
    isFree ? "Free" : `Rs.${vt.embassyFee.toLocaleString("en-IN")}`,
    isFree ? "Free" : `Rs.${vt.serviceFee.toLocaleString("en-IN")}`,
  ];
  labels.forEach((l, i) => {
    doc.setFont("helvetica","bold"); doc.setFontSize(7); setTxt("#8A8A9A");
    doc.text(l, cols[i], y + 8);
    doc.setFont("helvetica","bold"); doc.setFontSize(12); setTxt("#1A1A28");
    doc.text(vals[i], cols[i], y + 17);
  });
  y += 34;

  // Total fee highlight
  setFill(isFree ? "#E8F5E9" : "#FFF3CD"); setStroke(isFree ? "#2ECC8B" : "#D4AF6A");
  doc.setLineWidth(0.4); doc.roundedRect(PL, y, PR - PL, 13, 2, 2, "FD");
  doc.setFont("helvetica","normal"); doc.setFontSize(9); setTxt("#5A5A6E");
  doc.text("Total (incl. 18% GST)", PL + 5, y + 5.5);
  doc.setFont("helvetica","bold"); doc.setFontSize(14); setTxt(isFree ? "#1A7A4A" : "#B8860B");
  doc.text(isFree ? "Free!" : `Rs.${grandTotal.toLocaleString("en-IN")}`, PL + 5, y + 11.5);
  doc.setFont("helvetica","normal"); doc.setFontSize(8); setTxt("#5A5A6E");
  doc.text("Apply at: visa.mytriplooker.com/apply?country=" + country.slug, PR - 5, y + 9, { align: "right" });
  y += 20;

  // ── IMPORTANT NOTES ───────────────────────────────────────────────
  if (country.generalNotes.length > 0) {
    setFill("#EEF4FF"); setStroke("#4A8FE8");
    doc.setLineWidth(0.4);
    const notesH = 10 + country.generalNotes.length * 6;
    doc.roundedRect(PL, y, PR - PL, notesH, 2, 2, "FD");
    doc.setFont("helvetica","bold"); doc.setFontSize(8); setTxt("#4A8FE8");
    doc.text("IMPORTANT NOTES", PL + 5, y + 7);
    country.generalNotes.forEach((note, i) => {
      doc.setFont("helvetica","normal"); doc.setFontSize(8); setTxt("#333355");
      doc.text(`• ${note}`, PL + 5, y + 13 + i * 6, { maxWidth: PR - PL - 10 });
    });
    y += notesH + 8;
  }

  // ── DOCUMENT CHECKLIST ────────────────────────────────────────────
  doc.setFont("helvetica","bold"); doc.setFontSize(13); setTxt("#08080F");
  doc.text(`Document Checklist  (${vt.documents.length} items)`, PL, y);
  setFill("#D4AF6A"); doc.rect(PL, y + 2, 60, 0.6, "F");
  y += 11;

  vt.documents.forEach((docItem, idx) => {
    // page break guard
    if (y > 255) {
      doc.addPage();
      setFill("#08080F"); doc.rect(0, 0, W, 12, "F");
      setFill("#D4AF6A"); doc.rect(0, 12, W, 0.8, "F");
      doc.setFont("helvetica","bold"); doc.setFontSize(8); setTxt("#D4AF6A");
      doc.text(`${country.name} Visa Checklist (cont.)`, PL, 9);
      y = 22;
    }

    const required = docItem.required;
    const boxH = 10 + docItem.specs.length * 5 + (docItem.notes ? 7 : 0);
    setFill(required ? "#FFF8F8" : "#F8F8FF"); setStroke(required ? "#E85D4A" : "#AAAACC");
    doc.setLineWidth(0.3); doc.roundedRect(PL, y, PR - PL, boxH, 2, 2, "FD");

    // Index + name
    doc.setFont("helvetica","bold"); doc.setFontSize(9.5);
    setTxt("#1A1A28"); doc.text(`${idx + 1}.  ${docItem.icon} ${docItem.name}`, PL + 4, y + 7);

    // Required badge
    const badgeX = PR - 5;
    doc.setFont("helvetica","bold"); doc.setFontSize(7);
    setTxt(required ? "#E85D4A" : "#8A8A9A");
    doc.text(required ? "REQUIRED" : "OPTIONAL", badgeX - (required ? 18 : 15), y + 7, { align: "left" });

    // Specs
    docItem.specs.forEach((spec, si) => {
      doc.setFont("helvetica","normal"); doc.setFontSize(7.5); setTxt("#555566");
      doc.text(`    – ${spec}`, PL + 6, y + 13 + si * 5, { maxWidth: PR - PL - 30 });
    });

    // Notes
    if (docItem.notes) {
      const noteY = y + 13 + docItem.specs.length * 5;
      doc.setFont("helvetica","italic"); doc.setFontSize(7); setTxt("#B8860B");
      doc.text(`⚠ ${docItem.notes}`, PL + 6, noteY, { maxWidth: PR - PL - 12 });
    }

    y += boxH + 4;
  });

  y += 6;

  // ── EMBASSY INFO ─────────────────────────────────────────────────
  if (y > 255) { doc.addPage(); y = 20; }
  setFill("#F5F5F5"); setStroke("#CCCCCC");
  doc.setLineWidth(0.3); doc.roundedRect(PL, y, PR - PL, 18, 2, 2, "FD");
  doc.setFont("helvetica","bold"); doc.setFontSize(8); setTxt("#5A5A6E");
  doc.text("EMBASSY IN INDIA", PL + 5, y + 6);
  doc.setFont("helvetica","normal"); doc.setFontSize(9); setTxt("#1A1A28");
  doc.text(country.embassyInIndia, PL + 5, y + 12);
  doc.setFont("helvetica","normal"); doc.setFontSize(8); setTxt("#4A8FE8");
  doc.text(country.officialUrl, PR - 5, y + 12, { align: "right" });
  y += 24;

  // ── FOOTER ────────────────────────────────────────────────────────
  const pageCount = (doc as unknown as {internal:{getNumberOfPages:()=>number}}).internal.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    setFill("#08080F"); doc.rect(0, 285, W, 12, "F");
    doc.setFont("helvetica","normal"); doc.setFontSize(7); setTxt("#D4AF6A");
    doc.text("MyTripLooker  •  visa.mytriplooker.com  •  sales@mytriplooker.com  •  +91 90122 22901", W / 2, 291, { align: "center" });
    setTxt("#5A5A6E");
    doc.text(`Generated: ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}   |   Page ${p} of ${pageCount}`, W / 2, 295, { align: "center" });
  }

  doc.save(`MTL-${country.name.replace(/\s+/g,"-")}-Visa-Checklist.pdf`);
}

function CountryModal({ country, onClose }: { country: Country; onClose: () => void }) {
  const [activeVisa, setActiveVisa] = useState(0);
  const [pdfLoading, setPdfLoading] = useState(false);
  const vt = country.visaTypes[activeVisa];
  const totalFee = vt.embassyFee + vt.serviceFee;
  const gst = Math.round(totalFee * 0.18);
  const grandTotal = totalFee + gst;
  const isFree = grandTotal === 0;

  const handleExportPDF = async () => {
    setPdfLoading(true);
    try { await generateChecklistPDF(country, activeVisa); }
    finally { setPdfLoading(false); }
  };

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
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={handleExportPDF}
              disabled={pdfLoading}
              title="Export checklist as PDF"
              style={{
                background: pdfLoading ? "#2A2A3E" : "linear-gradient(135deg,#D4AF6A,#E8C977)",
                border: "none", borderRadius: 8, padding: "8px 14px",
                cursor: pdfLoading ? "not-allowed" : "pointer",
                color: pdfLoading ? "#8A8A9A" : "#08080F",
                fontSize: 12, fontWeight: 700, fontFamily: "'Outfit',sans-serif",
                display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              {pdfLoading ? (
                <><span style={{ display: "inline-block", width: 12, height: 12, border: "2px solid #8A8A9A", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />Generating…</>
              ) : (
                <>📥 Export PDF</>
              )}
            </button>
            <button onClick={onClose} style={{ background: "#2A2A3E", border: "none", borderRadius: 8, width: 36, height: 36, cursor: "pointer", color: "#8A8A9A", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </div>
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
  ["mailto:sales@mytriplooker.com","Contact Us"],
  ["/track","Track Application"],["/login","Sign In"],
];

// ═══════════════════════════════════════════════════════════════════

export default function ChecklistPageClient() {
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
        @keyframes spin{to{transform:rotate(360deg);}}
      
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
            {filteredCountries.length} {filteredCountries.length === 1 ? "country" : "countries"} found for &quot;{search}&quot;
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
