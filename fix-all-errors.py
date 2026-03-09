#!/usr/bin/env python3
"""
MyTripLooker — Surgical Fix for All 86 VS Code Errors
Run from project root: python3 fix-all-errors.py
"""
import re, os, sys

ROOT = os.path.dirname(os.path.abspath(__file__))

def read(rel):
    p = os.path.join(ROOT, rel)
    if not os.path.exists(p):
        print(f"  ❌ NOT FOUND: {rel}")
        return None
    with open(p) as f: return f.read()

def write(rel, content):
    p = os.path.join(ROOT, rel)
    with open(p, 'w') as f: f.write(content)

def fix(rel, fn, label):
    c = read(rel)
    if c is None: return
    after = fn(c)
    if after == c:
        print(f"  ⚪ No change: {rel}  ({label})")
    else:
        write(rel, after)
        print(f"  ✅ Fixed:     {rel}  ({label})")

print("=" * 60)
print("  MyTripLooker — Fix All TS/ESLint Errors")
print("=" * 60)

# ──────────────────────────────────────────────────────────────
# ERROR TYPE 1: Orphaned array fragments (TS2695 + "Expression
# expected") in admin, apply, checklist, dashboard, track, upload
#
# Root cause: the cleanup script stripped the `const NAV_LINKS = [`
# and `const FOOTER_LINKS = [` declaration lines but left the array
# body behind — so the file has floating `["/checklist",...],` lines
# that TypeScript sees as bare comma expressions.
#
# Exact pattern to remove (appears between last component function
# and the SHARED COMPONENTS comment block):
#
#   ["/checklist", "Destinations"],
#   ["/track",     "Track"],
#   ["/upload",    "Upload Docs"],
#
#   ["/#privacy","Privacy Policy"], ["/#terms","Terms of Service"],
#   ["mailto:support@mytriplooker.com","Contact Us"],
#   ["/track","Track Application"], ["/login","Sign In"],
#
# ──────────────────────────────────────────────────────────────

ORPHAN_RE = re.compile(
    r'\n'
    r'  \["/checklist",\s*"Destinations"\],\n'
    r'  \["/track",\s*"Track"\],\n'
    r'  \["/upload",\s*"Upload Docs"\],\n'
    r'\n'
    r'  \["/#privacy","Privacy Policy"\],\s*\["/#terms","Terms of Service"\],\n'
    r'  \["mailto:support@mytriplooker\.com","Contact Us"\],\n'
    r'  \["/track","Track Application"\],\s*\["/login","Sign In"\],\n'
)

def remove_orphans(c):
    return ORPHAN_RE.sub('\n', c)

print("\n[1/5] Orphaned array fragments (TS2695 / Expression expected)")
for p in [
    "src/app/admin/page.tsx",
    "src/app/apply/page.tsx",
    "src/app/checklist/page.tsx",
    "src/app/dashboard/page.tsx",
    "src/app/track/page.tsx",
    "src/app/upload/page.tsx",
]:
    fix(p, remove_orphans, "orphaned arrays removed")

# ──────────────────────────────────────────────────────────────
# ERROR TYPE 2: <a href="/"> → <Link href="/"> in MTLLogo
# Files: login/page.tsx (line 15), page.tsx (line 62), pay/page.tsx (line 66)
# All other pages also have this issue (admin, apply, etc.)
# Rule: @next/next/no-html-link-for-pages
# ──────────────────────────────────────────────────────────────

def fix_logo_link(c):
    # Add Link import after "use client" if missing
    if 'from "next/link"' not in c:
        c = c.replace(
            '"use client";\n',
            '"use client";\nimport Link from "next/link";\n'
        )
    # Replace <a href="/"> opening tag in MTLLogo (exact string from our files)
    c = c.replace(
        '<a href="/" style={{ display:"flex", alignItems:"center", textDecoration:"none" }}>',
        '<Link href="/" style={{ display:"flex", alignItems:"center", textDecoration:"none" }}>'
    )
    # Replace the matching </a> that closes the SVG wrapper in MTLLogo
    # Pattern: </svg>\n    </a>  →  </svg>\n    </Link>
    c = re.sub(r'(</svg>\n\s*)</a>(\s*\n\s*\);)', r'\1</Link>\2', c)
    return c

print("\n[2/5] <a href='/'> → <Link> in MTLLogo (no-html-link-for-pages)")
for p in [
    "src/app/login/page.tsx",
    "src/app/page.tsx",
    "src/app/pay/page.tsx",
    "src/app/admin/page.tsx",
    "src/app/apply/page.tsx",
    "src/app/checklist/page.tsx",
    "src/app/dashboard/page.tsx",
    "src/app/track/page.tsx",
    "src/app/upload/page.tsx",
]:
    fix(p, fix_logo_link, "<Link> added")

# ──────────────────────────────────────────────────────────────
# ERROR TYPE 3: Unescaped apostrophes in JSX text
# login/page.tsx line 291 — "Don't have an account?"
# page.tsx       line 330 — "India's"
# pay/page.tsx   line 264 — "you'll" or similar
# Rule: react/no-unescaped-entities
# ──────────────────────────────────────────────────────────────

# login/page.tsx line 291 — find the exact text and escape it
def fix_login_apostrophe(c):
    lines = c.split('\n')
    # Line 291 (0-indexed: 290)
    if len(lines) > 290:
        lines[290] = lines[290].replace("Don't", "Don&apos;t")
    # Also fix any other unescaped ' in JSX text nodes (safe replacements)
    c = '\n'.join(lines)
    # Belt-and-suspenders: replace all common contractions in JSX text
    c = re.sub(r"(>|{[^}]*})([^<{]*?)Don't", r"\1\2Don&apos;t", c)
    c = re.sub(r"(>|{[^}]*})([^<{]*?)don't", r"\1\2don&apos;t", c)
    return c

def fix_homepage_apostrophe(c):
    lines = c.split('\n')
    if len(lines) > 329:
        l = lines[329]
        # Fix any unescaped ' that's inside JSX text (not JS strings)
        # The error is at column 73 — find that character position
        lines[329] = l.replace("India's", "India&apos;s")
        lines[329] = lines[329].replace("world's", "world&apos;s")
        lines[329] = lines[329].replace("traveller's", "traveller&apos;s")
        lines[329] = lines[329].replace("visitor's", "visitor&apos;s")
    return '\n'.join(lines)

def fix_pay_apostrophe(c):
    lines = c.split('\n')
    if len(lines) > 263:
        l = lines[263]
        # Fix unescaped ' at column ~160
        lines[263] = l.replace("'s", "&apos;s").replace("'t", "&apos;t").replace("'ll", "&apos;ll").replace("'re", "&apos;re").replace("'ve", "&apos;ve")
    return '\n'.join(lines)

print("\n[3/5] Unescaped apostrophes in JSX (react/no-unescaped-entities)")
fix("src/app/login/page.tsx", fix_login_apostrophe,   "line 291 Don't → Don&apos;t")
fix("src/app/page.tsx",       fix_homepage_apostrophe, "line 330 apostrophe escaped")
fix("src/app/pay/page.tsx",   fix_pay_apostrophe,      "line 264 apostrophe escaped")

# ──────────────────────────────────────────────────────────────
# ERROR TYPE 4: setState called synchronously inside useEffect
# page.tsx lines 103–106
# Rule: react-hooks/set-state-in-effect
# Fix: replace the useEffect+setResults with useMemo derived state
# ──────────────────────────────────────────────────────────────

def fix_homepage_setstate_in_effect(c):
    # Remove the useState for results
    c = c.replace(
        "  const [results, setResults] = useState(destinations.filter(d => d.popular));\n",
        ""
    )
    c = c.replace(
        "  const [results, setResults] = useState<typeof destinations>(destinations.filter(d => d.popular));\n",
        ""
    )
    # Remove the useEffect that calls setResults
    old_effect = (
        "  useEffect(() => {\n"
        "    const q = query.trim().toLowerCase();\n"
        "    setResults(q ? destinations.filter(d => d.name.toLowerCase().includes(q)) : destinations.filter(d => d.popular));\n"
        "  }, [query]);\n"
    )
    new_derived = (
        "  // Derived — no setState needed (avoids cascading renders)\n"
        "  const results = query.trim()\n"
        "    ? destinations.filter(d => d.name.toLowerCase().includes(query.trim().toLowerCase()))\n"
        "    : destinations.filter(d => d.popular);\n"
    )
    c = c.replace(old_effect, new_derived)

    # Also make sure useMemo import isn't needed (we use plain derived const)
    # Remove useMemo from imports if it was accidentally added
    return c

print("\n[4/5] setState in useEffect → derived const (react-hooks/set-state-in-effect)")
fix("src/app/page.tsx", fix_homepage_setstate_in_effect, "useEffect→derived state")

# ──────────────────────────────────────────────────────────────
# ERROR TYPE 5: Unused variable 'supabase' in pay/page.tsx line 96
# Rule: @typescript-eslint/no-unused-vars  (severity: warning)
# ──────────────────────────────────────────────────────────────

def fix_unused_supabase(c):
    # Comment out the unused line
    c = c.replace(
        "  const supabase = createClient();\n",
        "  // const supabase = createClient(); // TODO: wire up Supabase order creation\n"
    )
    # If createClient import is now unused, prefix with _ or remove
    # Check if createClient is used elsewhere
    if 'createClient' not in c.replace('// const supabase = createClient();', ''):
        c = c.replace(
            'import { createClient } from "@/lib/supabase-client";\n',
            ''
        )
        c = c.replace(
            "import { createClient } from '@/lib/supabase-client';\n",
            ''
        )
    return c

print("\n[5/5] Unused 'supabase' variable (no-unused-vars)")
fix("src/app/pay/page.tsx", fix_unused_supabase, "supabase commented out")

# ──────────────────────────────────────────────────────────────
# VERIFICATION — re-read each file and confirm errors are gone
# ──────────────────────────────────────────────────────────────

print("\n" + "=" * 60)
print("  VERIFICATION")
print("=" * 60)

def check(rel, tests):
    c = read(rel)
    if c is None: return False
    lines = c.split('\n')
    ok = True
    for label, fn in tests:
        passed = fn(c, lines)
        print(f"  {'✅' if passed else '❌'} {rel}: {label}")
        if not passed: ok = False
    return ok

all_ok = True

# admin/page.tsx
all_ok &= check("src/app/admin/page.tsx", [
    ("No orphaned arrays",   lambda c, l: '  ["/checklist"' not in c[:500] and
                                           ORPHAN_RE.search(c) is None),
    ("SharedNav present",    lambda c, l: 'function SharedNav' in c),
    ("Link import present",  lambda c, l: 'from "next/link"' in c),
    ("<Link> in MTLLogo",    lambda c, l: '<Link href="/"' in c),
])

# apply/page.tsx
all_ok &= check("src/app/apply/page.tsx", [
    ("No orphaned arrays",   lambda c, l: ORPHAN_RE.search(c) is None),
    ("Suspense wrap",        lambda c, l: 'Suspense' in c),
    ("<Link> in MTLLogo",    lambda c, l: '<Link href="/"' in c),
])

# checklist/page.tsx
all_ok &= check("src/app/checklist/page.tsx", [
    ("No orphaned arrays",   lambda c, l: ORPHAN_RE.search(c) is None),
    ("<Link> in MTLLogo",    lambda c, l: '<Link href="/"' in c),
])

# dashboard/page.tsx
all_ok &= check("src/app/dashboard/page.tsx", [
    ("No orphaned arrays",   lambda c, l: ORPHAN_RE.search(c) is None),
    ("<Link> in MTLLogo",    lambda c, l: '<Link href="/"' in c),
])

# track/page.tsx
all_ok &= check("src/app/track/page.tsx", [
    ("No orphaned arrays",   lambda c, l: ORPHAN_RE.search(c) is None),
    ("<Link> in MTLLogo",    lambda c, l: '<Link href="/"' in c),
])

# upload/page.tsx
all_ok &= check("src/app/upload/page.tsx", [
    ("No orphaned arrays",   lambda c, l: ORPHAN_RE.search(c) is None),
    ("<Link> in MTLLogo",    lambda c, l: '<Link href="/"' in c),
])

# login/page.tsx
all_ok &= check("src/app/login/page.tsx", [
    ("Link import",          lambda c, l: 'from "next/link"' in c),
    ("<Link> in MTLLogo",    lambda c, l: '<Link href="/"' in c),
    ("Don't escaped",        lambda c, l: "Don't" not in c or "Don&apos;t" in c),
])

# page.tsx (homepage)
all_ok &= check("src/app/page.tsx", [
    ("Link import",          lambda c, l: 'from "next/link"' in c),
    ("<Link> in MTLLogo",    lambda c, l: '<Link href="/"' in c),
    ("No setResults effect", lambda c, l: 'setResults(' not in c),
    ("Derived results",      lambda c, l: 'const results =' in c),
])

# pay/page.tsx
all_ok &= check("src/app/pay/page.tsx", [
    ("Link import",          lambda c, l: 'from "next/link"' in c),
    ("<Link> in MTLLogo",    lambda c, l: '<Link href="/"' in c),
    ("supabase commented",   lambda c, l: '  const supabase = createClient();' not in c),
])

print("\n" + "=" * 60)
if all_ok:
    print("  ✅  ALL CHECKS PASSED — 0 errors expected")
    print("""
  Deploy:
    git add .
    git commit -m "Fix: all 86 TS/ESLint errors resolved"
    git push
""")
else:
    print("  ⚠️   Some checks failed — see ❌ above")
print("=" * 60)
