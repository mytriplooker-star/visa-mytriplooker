#!/usr/bin/env python3
"""
MyTripLooker — Targeted patch script
Run from: /Users/rahulgupta/Desktop/visa-mytriplooker
Usage:    python3 patch.py
"""
import os, sys, re

PROJECT = os.path.dirname(os.path.abspath(__file__))

# ── The inline SVG logo that replaces every broken nav logo ──────────────
SVG_LOGO_NAV = """        <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", gap: 0 }}>
          <svg width="174" height="38" viewBox="0 0 220 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </a>"""

# ── Gender picker that replaces the broken <select> ───────────────────────
GENDER_PICKER = """              {/* Gender */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#8A8A9A", letterSpacing: "0.6px", textTransform: "uppercase" as const, display: "block" }}>
                  Gender <span style={{ color: "#E85D4A" }}>*</span>
                </label>
                <div style={{ display: "flex", gap: 10 }}>
                  {(["Male", "Female", "Other"] as const).map(g => {
                    const active = form.gender === g.toLowerCase();
                    return (
                      <button key={g} type="button"
                        onClick={() => set("gender")(g.toLowerCase())}
                        style={{
                          flex: 1, padding: "12px 8px", borderRadius: 8, cursor: "pointer",
                          fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 600,
                          border: `1px solid ${active ? "rgba(212,175,106,0.7)" : "rgba(255,255,255,0.12)"}`,
                          background: active ? "rgba(212,175,106,0.12)" : "#1A1A28",
                          color: active ? "#D4AF6A" : "#C0C0D0",
                          transition: "all 0.2s",
                        }}>
                        {g === "Male" ? "👨 " : g === "Female" ? "👩 " : "⚧️ "}{g}
                      </button>
                    );
                  })}
                </div>
              </div>"""

# ─────────────────────────────────────────────────────────────────────────
def patch_file(rel_path, patches):
    full = os.path.join(PROJECT, rel_path)
    if not os.path.exists(full):
        print(f"  ⚠️  NOT FOUND: {rel_path}")
        return False
    with open(full, "r") as f:
        content = f.read()
    original = content
    for old, new, label in patches:
        if old in content:
            content = content.replace(old, new, 1)
            print(f"  ✅ {label}")
        else:
            print(f"  ⚠️  SKIP (already patched or changed): {label}")
    if content != original:
        with open(full, "w") as f:
            f.write(content)
    return True

print("\n🔧 MyTripLooker Patch Script")
print("=" * 50)

# ── 1. Apply page — logo + stepper + gender ───────────────────────────────
print("\n📄 src/app/apply/page.tsx")
patch_file("src/app/apply/page.tsx", [
    # Logo: replace gold ✈ box
    (
        """          <div style={{ width: 30, height: 30, borderRadius: 7, background: "linear-gradient(135deg, #D4AF6A, #E8C977)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✈</div>
          <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 18, fontWeight: 600, color: "#D4AF6A" }}>
            mytriplooker <span style={{ fontSize: 12, color: "#8A8A9A", fontFamily: "'Outfit', sans-serif", fontWeight: 400 }}>/ apply</span>
          </div>""",
        SVG_LOGO_NAV,
        "Nav logo fixed"
    ),
    # Stepper icons: replace emoji with numbers
    ('{n:1,label:"Destination",icon:"🌍"}', '{n:1,label:"Destination",icon:"1"}', "Stepper icon 1"),
    ('{n:2,label:"Personal Info",icon:"🪪"}', '{n:2,label:"Personal Info",icon:"2"}', "Stepper icon 2"),
    ('{n:3,label:"Travel Details",icon:"✈️"}', '{n:3,label:"Travel Details",icon:"3"}', "Stepper icon 3"),
    ('{n:4,label:"Review & Pay",icon:"💳"}', '{n:4,label:"Review & Pay",icon:"4"}', "Stepper icon 4"),
    # Gender: replace the <Select> component call for gender with inline buttons
    (
        """                <Select label="Gender" value={form.gender} onChange={set("gender")} required options={[{ value: "", label: "Select gender" }, { value: "male", label: "Male" }, { value: "female", label: "Female" }, { value: "other", label: "Other" }]} />""",
        GENDER_PICKER,
        "Gender picker replaced"
    ),
])

# ── Helper: replace old nav logo pattern in secondary pages ──────────────
OLD_NAV_ICON = '          <div style={{ width: 30, height: 30, borderRadius: 7, background: "linear-gradient(135deg, #D4AF6A, #E8C977)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✈</div>'
OLD_NAV_ICON_2 = '          <div style={{ width: 30, height: 30, borderRadius: 7, background: "linear-gradient(135deg,#D4AF6A,#E8C977)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✈</div>'

SECONDARY_PAGES = [
    ("src/app/track/page.tsx",     "Track page"),
    ("src/app/login/page.tsx",     "Login page"),
    ("src/app/dashboard/page.tsx", "Dashboard"),
    ("src/app/upload/page.tsx",    "Upload page"),
    ("src/app/pay/page.tsx",       "Payment page"),
    ("src/app/admin/page.tsx",     "Admin page"),
    ("src/app/checklist/page.tsx", "Checklist page"),
]

for rel_path, name in SECONDARY_PAGES:
    print(f"\n📄 {rel_path}")
    full = os.path.join(PROJECT, rel_path)
    if not os.path.exists(full):
        print(f"  ⚠️  NOT FOUND")
        continue
    with open(full) as f:
        content = f.read()
    original = content

    # Replace either variant of the old icon
    for old_icon in [OLD_NAV_ICON, OLD_NAV_ICON_2]:
        if old_icon in content:
            content = content.replace(old_icon, SVG_LOGO_NAV, 1)
            print(f"  ✅ Nav logo fixed")
            break
    else:
        if "MYTRIP" in content or 'viewBox="0 0 220 48"' in content:
            print(f"  ✅ Logo already correct")
        else:
            print(f"  ⚠️  Logo pattern not found — check manually")

    # Also remove the text label that was next to the icon (track/upload pages)
    for old_label in [
        '          <div style={{ fontFamily: "\'Cormorant Garant\', serif", fontSize: 18, fontWeight: 600, color: "#D4AF6A" }}>mytriplooker <span style={{ fontSize: 12, color: "#8A8A9A", fontFamily: "\'Outfit\', sans-serif", fontWeight: 400 }}>/ track application</span></div>',
        '          <div style={{ fontFamily: "\'Cormorant Garant\', serif", fontSize: 18, fontWeight: 600, color: "#D4AF6A" }}>mytriplooker <span style={{ fontSize: 12, color: "#8A8A9A", fontFamily: "\'Outfit\', sans-serif", fontWeight: 400 }}>/ upload documents</span></div>',
        '            mytriplooker <span style={{ fontSize: 12, color: "#8A8A9A", fontFamily: "\'Outfit\', sans-serif", fontWeight: 400 }}>/ payment</span>',
    ]:
        if old_label in content:
            content = content.replace(old_label, "", 1)
            print(f"  ✅ Old text label removed")

    if content != original:
        with open(full, "w") as f:
            f.write(content)

# ── 3. Git commit ─────────────────────────────────────────────────────────
print("\n" + "=" * 50)
print("✅ Patch complete!\n")
print("Now run these commands to deploy:")
print("  git add .")
print('  git commit -m "Fix: logo SVG all pages, gender buttons, stepper numbers"')
print("  git push")
print("\nVercel will auto-deploy in ~2 minutes.")
