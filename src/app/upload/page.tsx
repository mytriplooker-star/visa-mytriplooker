"use client";
import { useState, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase-client";

// ── Types ─────────────────────────────────────────────────────────────────
type UploadStatus = "idle" | "uploading" | "done" | "error";

interface DocSlot {
  id: string;
  label: string;
  icon: string;
  accept: string;
  maxMB: number;
  required: boolean;
  hint: string;
  category: string;
}

interface FileState {
  file: File | null;
  status: UploadStatus;
  progress: number;
  error: string;
  url: string;
}

// ── Document slots definition ─────────────────────────────────────────────
const DOC_SLOTS: DocSlot[] = [
  { id: "passport_main", label: "Passport — Bio Data Page", icon: "📘", accept: ".pdf,.jpg,.jpeg,.png", maxMB: 5, required: true, hint: "Clear scan of the page with your photo and details", category: "Identity" },
  { id: "passport_back", label: "Passport — Back Cover", icon: "📗", accept: ".pdf,.jpg,.jpeg,.png", maxMB: 5, required: false, hint: "Back cover scan — required for some countries", category: "Identity" },
  { id: "photo", label: "Passport-size Photograph", icon: "📷", accept: ".jpg,.jpeg,.png", maxMB: 2, required: true, hint: "White background, 35×45mm, taken within 3 months", category: "Photo" },
  { id: "bank_statement", label: "Bank Statement (3-6 months)", icon: "🏦", accept: ".pdf", maxMB: 10, required: true, hint: "Official statement with bank seal and signature", category: "Financial" },
  { id: "salary_slip", label: "Salary Slip / Income Proof", icon: "💼", accept: ".pdf,.jpg,.jpeg", maxMB: 5, required: true, hint: "Last 3 months, with company stamp and HR signature", category: "Employment" },
  { id: "hotel_booking", label: "Hotel Booking Confirmation", icon: "🏨", accept: ".pdf,.jpg,.jpeg", maxMB: 5, required: true, hint: "Confirmed booking for entire stay duration", category: "Travel" },
  { id: "flight_tickets", label: "Return Flight Tickets", icon: "✈️", accept: ".pdf,.jpg,.jpeg", maxMB: 5, required: true, hint: "Both onward and return confirmed tickets", category: "Travel" },
  { id: "travel_insurance", label: "Travel Insurance", icon: "🛡️", accept: ".pdf,.jpg,.jpeg", maxMB: 5, required: false, hint: "Required for Schengen — recommended for all", category: "Insurance" },
  { id: "itr", label: "Income Tax Returns (ITR)", icon: "📊", accept: ".pdf", maxMB: 10, required: false, hint: "Last 2 years — required for UK, Singapore, Schengen", category: "Financial" },
  { id: "employment_letter", label: "Employment / Leave Letter", icon: "📋", accept: ".pdf,.jpg,.jpeg", maxMB: 5, required: false, hint: "Company letter with leave approval and salary details", category: "Employment" },
];

const CATEGORY_ORDER = ["Identity", "Photo", "Financial", "Employment", "Travel", "Insurance"];

const EMPTY_FILE_STATE: FileState = { file: null, status: "idle", progress: 0, error: "", url: "" };

// ── Drop Zone Component ───────────────────────────────────────────────────
function DropZone({ slot, state, onFile, onRemove }: {
  slot: DocSlot;
  state: FileState;
  onFile: (file: File) => void;
  onRemove: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  }, [onFile]);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);

  const isDone = state.status === "done";
  const isUploading = state.status === "uploading";
  const isError = state.status === "error";
  const hasFile = !!state.file;

  return (
    <div style={{ background: isDone ? "rgba(46,204,139,0.04)" : isError ? "rgba(232,93,74,0.04)" : dragging ? "rgba(212,175,106,0.06)" : "#141420", border: `1px solid ${isDone ? "rgba(46,204,139,0.25)" : isError ? "rgba(232,93,74,0.25)" : dragging ? "rgba(212,175,106,0.5)" : hasFile ? "rgba(212,175,106,0.2)" : "rgba(255,255,255,0.06)"}`, borderRadius: 12, overflow: "hidden", transition: "all 0.2s" }}>

      {/* Header */}
      <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 24, flexShrink: 0 }}>{slot.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: isDone ? "#2ECC8B" : "#F5F0E8" }}>{slot.label}</span>
            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 3, background: slot.required ? "rgba(232,93,74,0.1)" : "rgba(212,175,106,0.1)", color: slot.required ? "#E85D4A" : "#D4AF6A", border: `1px solid ${slot.required ? "rgba(232,93,74,0.2)" : "rgba(212,175,106,0.2)"}` }}>
              {slot.required ? "Required" : "Optional"}
            </span>
          </div>
          <div style={{ fontSize: 11, color: "#8A8A9A", marginTop: 2 }}>{slot.hint}</div>
        </div>
        {isDone && (
          <button onClick={onRemove} style={{ background: "transparent", border: "1px solid rgba(232,93,74,0.3)", color: "#E85D4A", padding: "4px 10px", borderRadius: 6, fontSize: 11, cursor: "pointer", fontFamily: "'Outfit', sans-serif", flexShrink: 0 }}>Remove</button>
        )}
      </div>

      {/* Drop area or file info */}
      {!hasFile ? (
        <div
          onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          style={{ margin: "0 16px 16px", border: `2px dashed ${dragging ? "rgba(212,175,106,0.6)" : "rgba(255,255,255,0.08)"}`, borderRadius: 8, padding: "20px", textAlign: "center", cursor: "pointer", transition: "all 0.2s", background: dragging ? "rgba(212,175,106,0.04)" : "transparent" }}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>📂</div>
          <div style={{ fontSize: 13, color: "#8A8A9A", marginBottom: 4 }}>
            <span style={{ color: "#D4AF6A", fontWeight: 600 }}>Click to upload</span> or drag & drop
          </div>
          <div style={{ fontSize: 11, color: "#3A3A4E" }}>
            {slot.accept.replace(/\./g, "").toUpperCase().replace(/,/g, " · ")} · Max {slot.maxMB}MB
          </div>
          <input ref={inputRef} type="file" accept={slot.accept} style={{ display: "none" }}
            onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
        </div>
      ) : (
        <div style={{ margin: "0 16px 16px", background: "#0F0F1A", borderRadius: 8, padding: "12px 14px" }}>
          {/* File name row */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: isUploading ? 10 : 0 }}>
            <span style={{ fontSize: 20 }}>{state.file!.type.includes("pdf") ? "📄" : "🖼️"}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#F5F0E8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{state.file!.name}</div>
              <div style={{ fontSize: 11, color: "#8A8A9A" }}>{(state.file!.size / 1024 / 1024).toFixed(2)} MB</div>
            </div>
            <span style={{ fontSize: 18, flexShrink: 0 }}>
              {isDone ? "✅" : isError ? "❌" : isUploading ? "⏳" : "📎"}
            </span>
          </div>
          {/* Progress bar */}
          {isUploading && (
            <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${state.progress}%`, background: "linear-gradient(90deg, #D4AF6A, #E8C977)", borderRadius: 2, transition: "width 0.3s ease" }} />
            </div>
          )}
          {/* Error message */}
          {isError && (
            <div style={{ marginTop: 8, fontSize: 12, color: "#E85D4A" }}>⚠️ {state.error}</div>
          )}
          {/* Done message */}
          {isDone && (
            <div style={{ marginTop: 6, fontSize: 11, color: "#2ECC8B" }}>✓ Uploaded successfully</div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────

function MTLLogo({ height = 36 }: { height?: number }) {
  const scale = height / 48;
  return (
    <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", gap: 0 }}>
      <svg width={Math.round(220 * scale)} height={height} viewBox="0 0 220 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="36" fontFamily="'Outfit',sans-serif" fontWeight="900" fontSize="38" fill="#1EC8F0" letterSpacing="-1">MY</text>
        <text x="72" y="36" fontFamily="'Outfit',sans-serif" fontWeight="900" fontSize="38" fill="#1EC8F0" letterSpacing="-1">TRIP</text>
        <g transform="translate(0,22) scale(0.72)">
          <text x="0" y="28" fontFamily="'Outfit',sans-serif" fontWeight="900" fontSize="38" fill="#1EC8F0" letterSpacing="-1">L</text>
          <circle cx="52" cy="16" r="12" fill="#D4AF6A"/>
          <circle cx="52" cy="16" r="7" fill="#08080F"/>
          <rect x="61" y="13" width="8" height="5" rx="2" fill="#D4AF6A"/>
          <circle cx="76" cy="16" r="12" fill="#D4AF6A"/>
          <circle cx="76" cy="16" r="7" fill="#08080F"/>
          <text x="91" y="28" fontFamily="'Outfit',sans-serif" fontWeight="900" fontSize="38" fill="#1EC8F0" letterSpacing="-1">KER</text>
        </g>
      </svg>
    </a>
  );
}

export default function UploadPage() {
  const [files, setFiles] = useState<Record<string, FileState>>(
    Object.fromEntries(DOC_SLOTS.map(s => [s.id, { ...EMPTY_FILE_STATE }]))
  );
  const [uploading, setUploading] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const supabase = createClient();

  const setFileState = (id: string, patch: Partial<FileState>) =>
    setFiles(p => ({ ...p, [id]: { ...p[id], ...patch } }));

  const handleFile = (slot: DocSlot, file: File) => {
    // Validate size
    if (file.size > slot.maxMB * 1024 * 1024) {
      setFileState(slot.id, { file, status: "error", error: `File too large. Maximum size is ${slot.maxMB}MB.`, progress: 0 });
      return;
    }
    setFileState(slot.id, { file, status: "idle", error: "", progress: 0, url: "" });
  };

  const handleRemove = (id: string) => {
    setFileState(id, { ...EMPTY_FILE_STATE });
  };

  const uploadAll = async () => {
    setUploading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = "/login"; return; }

    const toUpload = DOC_SLOTS.filter(s => files[s.id].file && files[s.id].status !== "done");

    for (const slot of toUpload) {
      const fileState = files[slot.id];
      if (!fileState.file) continue;

      setFileState(slot.id, { status: "uploading", progress: 10 });

      // Simulate progress
      const progressInterval = setInterval(() => {
        setFiles(p => {
          const current = p[slot.id].progress;
          if (current < 85) return { ...p, [slot.id]: { ...p[slot.id], progress: current + 15 } };
          return p;
        });
      }, 200);

      const ext = fileState.file.name.split(".").pop();
      const path = `${user.id}/${slot.id}_${Date.now()}.${ext}`;

      const { error } = await supabase.storage
        .from("documents")
        .upload(path, fileState.file, { upsert: true });

      clearInterval(progressInterval);

      if (error) {
        setFileState(slot.id, { status: "error", progress: 0, error: error.message });
      } else {
        const { data: urlData } = supabase.storage.from("documents").getPublicUrl(path);
        setFileState(slot.id, { status: "done", progress: 100, url: urlData.publicUrl });
      }
    }

    setUploading(false);

    // Check if all required docs are done
    const allRequiredDone = DOC_SLOTS
      .filter(s => s.required)
      .every(s => files[s.id].status === "done" || files[s.id].file);
    if (allRequiredDone) setAllDone(true);
  };

  // Stats
  const totalRequired = DOC_SLOTS.filter(s => s.required).length;
  const uploadedRequired = DOC_SLOTS.filter(s => s.required && files[s.id].status === "done").length;
  const totalSelected = DOC_SLOTS.filter(s => files[s.id].file).length;
  const readyToUpload = DOC_SLOTS.filter(s => files[s.id].file && files[s.id].status === "idle").length;
  const progress = totalRequired > 0 ? Math.round((uploadedRequired / totalRequired) * 100) : 0;

  // Group by category
  const grouped = CATEGORY_ORDER.map(cat => ({
    category: cat,
    slots: DOC_SLOTS.filter(s => s.category === cat),
  }));

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#08080F", color: "#F5F0E8", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,500;0,600;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #08080F; } ::-webkit-scrollbar-thumb { background: #3A3A4E; border-radius: 2px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes celebrate { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        .upload-btn { background: linear-gradient(135deg, #D4AF6A, #E8C977); color: #08080F; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s; font-family: 'Outfit', sans-serif; }
        .upload-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(212,175,106,0.35); }
        .upload-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }
      `}</style>

      {/* Nav */}
      <nav style={{ height: 60, background: "rgba(8,8,15,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(212,175,106,0.12)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <MTLLogo height={38} />
        </div>
        <a href="/dashboard" style={{ fontSize: 13, color: "#8A8A9A", textDecoration: "none" }}>← Back to Dashboard</a>
      </nav>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 36, animation: "fadeUp 0.5s ease both" }}>
          <h1 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 42, fontWeight: 500, color: "#F5F0E8", marginBottom: 8 }}>
            Upload <em style={{ color: "#D4AF6A" }}>Documents</em>
          </h1>
          <p style={{ fontSize: 14, color: "#8A8A9A" }}>Upload your documents securely. Files are encrypted and only accessible by our visa team.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>

          {/* Left: Document slots */}
          <div>
            {/* Success banner */}
            {allDone && (
              <div style={{ background: "rgba(46,204,139,0.08)", border: "1px solid rgba(46,204,139,0.25)", borderRadius: 12, padding: "16px 20px", marginBottom: 24, display: "flex", gap: 12, alignItems: "center", animation: "celebrate 0.6s ease" }}>
                <span style={{ fontSize: 28 }}>🎉</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#2ECC8B" }}>All required documents uploaded!</div>
                  <div style={{ fontSize: 12, color: "#8A8A9A", marginTop: 2 }}>Our team will review them and get back to you within 24 hours.</div>
                </div>
              </div>
            )}

            {grouped.map(({ category, slots }) => (
              <div key={category} style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#8A8A9A", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ height: 1, width: 24, background: "rgba(212,175,106,0.3)" }} />
                  {category}
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {slots.map(slot => (
                    <DropZone key={slot.id} slot={slot} state={files[slot.id]}
                      onFile={f => handleFile(slot, f)}
                      onRemove={() => handleRemove(slot.id)} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Upload panel */}
          <div style={{ position: "sticky", top: 76 }}>

            {/* Progress card */}
            <div style={{ background: "#141420", border: "1px solid rgba(212,175,106,0.2)", borderRadius: 16, padding: "24px", marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#D4AF6A", marginBottom: 16 }}>Upload Progress</div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: "#8A8A9A" }}>Required documents</span>
                <span style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 26, fontWeight: 600, color: progress === 100 ? "#2ECC8B" : "#D4AF6A" }}>{progress}%</span>
              </div>
              <div style={{ height: 8, background: "#0F0F1A", borderRadius: 4, overflow: "hidden", marginBottom: 8 }}>
                <div style={{ height: "100%", width: `${progress}%`, background: progress === 100 ? "linear-gradient(90deg,#2ECC8B,#4EE8A0)" : "linear-gradient(90deg,#D4AF6A,#E8C977)", borderRadius: 4, transition: "width 0.5s ease" }} />
              </div>
              <div style={{ fontSize: 12, color: "#8A8A9A" }}>{uploadedRequired} of {totalRequired} required uploaded</div>

              <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "16px 0" }} />

              {/* Stats */}
              {[
                { label: "Files selected", value: totalSelected },
                { label: "Ready to upload", value: readyToUpload },
                { label: "Successfully uploaded", value: DOC_SLOTS.filter(s => files[s.id].status === "done").length },
                { label: "Errors", value: DOC_SLOTS.filter(s => files[s.id].status === "error").length },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
                  <span style={{ fontSize: 12, color: "#8A8A9A" }}>{row.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: row.label === "Errors" && row.value > 0 ? "#E85D4A" : "#F5F0E8" }}>{row.value}</span>
                </div>
              ))}

              <button className="upload-btn" disabled={readyToUpload === 0 || uploading} onClick={uploadAll}
                style={{ width: "100%", padding: "14px", borderRadius: 10, fontSize: 15, marginTop: 16 }}>
                {uploading ? "⏳ Uploading..." : readyToUpload > 0 ? `Upload ${readyToUpload} File${readyToUpload > 1 ? "s" : ""} →` : "Select files to upload"}
              </button>
            </div>

            {/* Security note */}
            <div style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#8A8A9A", marginBottom: 10 }}>🔒 Security</div>
              {[
                "256-bit SSL encryption in transit",
                "Files stored in private Supabase bucket",
                "Only your visa officer can access files",
                "Auto-deleted 90 days after visa decision",
              ].map(t => (
                <div key={t} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
                  <span style={{ color: "#2ECC8B", flexShrink: 0, fontSize: 12, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 12, color: "#8A8A9A", lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}