#!/usr/bin/env python3
"""
FINAL_FIX.py — One script, fixes everything, pushes to GitHub.
Run from project root:
    cd /Users/rahulgupta/Desktop/visa-mytriplooker
    python3 FINAL_FIX.py
"""
import re
import subprocess
import sys
from pathlib import Path

FOOTER_DECL = 'const FOOTER_LINKS: [string,string][] = ['

# First line of footer array content — this is what appears orphaned
FOOTER_FIRST = '["/#privacy","Privacy Policy"]'

FILES = [
    "src/app/admin/page.tsx",
    "src/app/apply/page.tsx",
    "src/app/checklist/page.tsx",
    "src/app/dashboard/page.tsx",
    "src/app/pay/page.tsx",
    "src/app/track/page.tsx",
    "src/app/upload/page.tsx",
    "src/app/login/page.tsx",
]

print("\n" + "═"*60)
print("  FINAL_FIX.py — Targeted Build Fix")
print("═"*60)

# ── PHASE 1: Fix each file ─────────────────────────────────────
print("\n📝  Phase 1: Patching files\n")

patched = []
skipped = []

for filepath in FILES:
    p = Path(filepath)
    if not p.exists():
        print(f"  ⚠️  NOT FOUND (skip): {filepath}")
        skipped.append(filepath)
        continue

    original = p.read_text()
    content  = original
    changes  = []

    # ── Fix 1: Insert missing const FOOTER_LINKS declaration ───
    # Pattern: a line containing ["/#privacy" that is NOT preceded
    # (within 8 lines) by "const FOOTER_LINKS"
    lines = content.split('\n')
    new_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        # Check if this line starts the footer array without a declaration
        stripped = line.strip()
        if FOOTER_FIRST in stripped:
            # Look back 8 lines for the const declaration
            lookback = '\n'.join(new_lines[-8:]) if len(new_lines) >= 8 else '\n'.join(new_lines)
            if FOOTER_DECL not in lookback:
                new_lines.append(FOOTER_DECL)
                changes.append(f"Inserted missing '{FOOTER_DECL}' before footer array")
        new_lines.append(line)
        i += 1
    content = '\n'.join(new_lines)

    # ── Fix 2: Remove unused eslint-disable comments ──────────
    # These cause build errors when reportUnusedDisableDirectives is on
    disabled_rules = [
        "react-hooks/set-state-in-effect",
        "react-hooks/exhaustive-deps",
    ]
    for rule in disabled_rules:
        pattern = rf'^\s*//\s*eslint-disable-next-line\s+{re.escape(rule)}\s*\n'
        if re.search(pattern, content, re.MULTILINE):
            content = re.sub(pattern, '', content, flags=re.MULTILINE)
            changes.append(f"Removed unused eslint-disable: {rule}")

    # ── Fix 3: Remove duplicate const FOOTER_LINKS declarations ──
    # (safety: if it was already there, we might have added a second)
    count = content.count(FOOTER_DECL)
    if count > 1:
        # Keep only first occurrence — remove extras
        first_idx = content.index(FOOTER_DECL)
        after_first = content[first_idx + len(FOOTER_DECL):]
        while FOOTER_DECL in after_first:
            after_first = after_first.replace(FOOTER_DECL, '', 1)
            changes.append("Removed duplicate FOOTER_LINKS declaration")
        content = content[:first_idx + len(FOOTER_DECL)] + after_first

    if content != original:
        p.write_text(content)
        patched.append(filepath)
        print(f"  ✅  {filepath}")
        for ch in changes:
            print(f"      → {ch}")
    else:
        skipped.append(filepath)
        print(f"  ✓   {filepath}  (no changes needed — already fixed)")

# ── PHASE 2: Verify ────────────────────────────────────────────
print(f"\n📋  Phase 2: Verifying (tsc --noEmit)\n")

result = subprocess.run(
    ["npx", "tsc", "--noEmit", "--skipLibCheck"],
    capture_output=True, text=True, cwd="."
)

if result.returncode != 0:
    output = (result.stdout + result.stderr).strip()
    # Print only lines with "error" or file paths
    print("  ❌  TypeScript errors remain:\n")
    for line in output.split('\n'):
        if line.strip():
            print(f"      {line}")
    print("\n  ⛔  Not pushing — fix errors above first.")
    sys.exit(1)
else:
    print("  ✅  TypeScript: CLEAN — zero errors!\n")

# ── PHASE 3: Git ───────────────────────────────────────────────
print("🚀  Phase 3: Committing and pushing\n")

if not patched:
    print("  ℹ️  No files changed — nothing to commit.")
    sys.exit(0)

commands = [
    ["git", "add", "src/app/admin/page.tsx", "src/app/apply/page.tsx",
     "src/app/checklist/page.tsx", "src/app/dashboard/page.tsx",
     "src/app/pay/page.tsx", "src/app/track/page.tsx",
     "src/app/upload/page.tsx", "src/app/login/page.tsx"],
    ["git", "commit", "-m",
     "fix: restore FOOTER_LINKS declarations + remove unused eslint-disable"],
    ["git", "push"],
]

for cmd in commands:
    r = subprocess.run(cmd, capture_output=True, text=True)
    label = " ".join(cmd[:3]) + ("..." if len(cmd) > 3 else "")
    if r.returncode != 0 and "nothing to commit" not in r.stdout + r.stderr:
        print(f"  ❌  {label}")
        print(f"      {r.stderr.strip()}")
        sys.exit(1)
    else:
        out = (r.stdout + r.stderr).strip().split('\n')[0]
        print(f"  ✅  {label}")
        if out:
            print(f"      {out}")

print("\n" + "═"*60)
print("  ✅  DONE — Vercel will deploy in ~60 seconds")
print("═"*60 + "\n")
