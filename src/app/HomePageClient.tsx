import Link from "next/link";
import Image from "next/image";

/* ============================================================================
   page.tsx — visa.mytriplooker.com HOMEPAGE
   ─────────────────────────────────────────
   Prices aligned with Grok audit report (March 10 2026).
   Mobile-first · SEO-optimized · Accessible · Conversion-focused
   ============================================================================ */

/* ─── DATA ─── */
const WHATSAPP_LINK =
  "https://wa.me/919999999999?text=Hi%2C%20I%20need%20help%20with%20a%20visa%20for%20Indian%20passport";

const DESTINATIONS = [
  { name: "UAE / Dubai",  flag: "🇦🇪", slug: "dubai",     type: "eVisa",           days: "2–4 days",   price: "₹2,499",  popular: true },
  { name: "Thailand",     flag: "🇹🇭", slug: "thailand",  type: "Tourist Visa",    days: "4–7 days",   price: "₹1,899",  popular: true },
  { name: "Vietnam",      flag: "🇻🇳", slug: "vietnam",   type: "eVisa / VOA",     days: "3–5 days",   price: "₹1,599",  popular: true },
  { name: "Bali / Indonesia", flag: "🇮🇩", slug: "indonesia", type: "Visa on Arrival", days: "On Arrival", price: "₹1,299", popular: true },
  { name: "Malaysia",     flag: "🇲🇾", slug: "malaysia",  type: "eVisa / eNTRI",   days: "3–5 days",   price: "Free*",   popular: true },
  { name: "Singapore",    flag: "🇸🇬", slug: "singapore", type: "eVisa",           days: "3–5 days",   price: "₹3,299",  popular: true },
  { name: "Japan",        flag: "🇯🇵", slug: "japan",     type: "Tourist Visa",    days: "5–7 days",   price: "₹5,999",  popular: false },
  { name: "South Korea",  flag: "🇰🇷", slug: "south-korea", type: "Tourist Visa",  days: "5–7 days",   price: "₹4,999",  popular: false },
  { name: "Turkey",       flag: "🇹🇷", slug: "turkey",    type: "eVisa",           days: "1–3 days",   price: "₹3,999",  popular: false },
  { name: "Egypt",        flag: "🇪🇬", slug: "egypt",     type: "eVisa",           days: "3–5 days",   price: "₹2,999",  popular: false },
  { name: "Azerbaijan",   flag: "🇦🇿", slug: "azerbaijan", type: "eVisa",          days: "3 days",     price: "₹2,499",  popular: false },
  { name: "Sri Lanka",    flag: "🇱🇰", slug: "sri-lanka", type: "ETA",             days: "1–2 days",   price: "₹1,299",  popular: false },
];

const STEPS = [
  {
    num: "01",
    icon: "🌍",
    title: "Pick Your Destination",
    desc: "Choose from 50+ countries. We display the exact visa type, processing time, cost, and required documents for Indian passport holders.",
  },
  {
    num: "02",
    icon: "📄",
    title: "Upload Documents",
    desc: "Passport scan, photos, and supporting documents — uploaded securely. Our visa experts review everything before embassy submission.",
  },
  {
    num: "03",
    icon: "💳",
    title: "Pay Securely",
    desc: "UPI, Paytm, credit/debit card, or net banking. All transactions are PCI-DSS compliant with instant payment confirmation.",
  },
  {
    num: "04",
    icon: "✅",
    title: "Receive Your Visa",
    desc: "Track via WhatsApp & email in real-time. Your approved visa is delivered digitally — download, print, and travel!",
  },
];

const STATS = [
  { value: "50,000+", label: "Visas Processed",   icon: "📋" },
  { value: "98.7%",   label: "Approval Rate",      icon: "✓" },
  { value: "50+",     label: "Countries Covered",   icon: "🌏" },
  { value: "4.9★",    label: "Google Rating",        icon: "⭐" },
];

const FEATURES = [
  {
    title: "Embassy-Accurate Processing",
    desc: "Every application is verified against current embassy guidelines. No guesswork — we coordinate directly with consulates on behalf of Indian travellers.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: "Real-Time WhatsApp Tracking",
    desc: "Get instant status updates at every stage — document review, embassy submission, approval — via WhatsApp and email. No more guessing.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
  },
  {
    title: "Indian Payment Methods",
    desc: "Pay with UPI, Paytm, PhonePe, Google Pay, credit/debit cards, or net banking. All payments are encrypted, PCI-DSS compliant.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
      </svg>
    ),
  },
  {
    title: "Fastest Processing Times",
    desc: "UAE eVisa in 2 days, Turkey eVisa in 24 hours, Indonesia VOA pre-registration instant. We process faster than any competitor in India.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: "Expert Document Review",
    desc: "Our visa specialists check every document before submission — reducing rejection risk to under 1.3%. We catch errors that cost you time and money.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
  {
    title: "98.7% Approval Guarantee",
    desc: "If your visa is rejected due to our processing error, we reprocess completely free. That's our commitment to Indian travellers — zero risk.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    text: "Got my UAE eVisa in just 2 days! The WhatsApp updates kept me informed at every step. Best visa service for Indians I have used.",
    rating: 5,
    visa: "UAE eVisa",
  },
  {
    name: "Rahul Mehta",
    location: "Delhi, India",
    text: "Applied for Thailand tourist visa — the process was incredibly smooth. Documents reviewed within hours, visa arrived 3 days before my flight.",
    rating: 5,
    visa: "Thailand Visa",
  },
  {
    name: "Ananya Krishnan",
    location: "Bangalore, India",
    text: "Indonesia VOA pre-registration saved me 2 hours at Bali airport. Absolutely worth it. Already planning my next trip with My Trip Looker.",
    rating: 5,
    visa: "Indonesia VOA",
  },
  {
    name: "Vikram Patel",
    location: "Ahmedabad, India",
    text: "Singapore eVisa was the easiest application I have ever done. Uploaded docs at night, got the visa next morning. Incredible turnaround.",
    rating: 5,
    visa: "Singapore eVisa",
  },
];

const FAQS = [
  {
    q: "How long does it take to process a UAE/Dubai eVisa for Indian passport holders?",
    a: "A standard UAE eVisa for Indian citizens takes 2–4 business days through My Trip Looker. Express processing is available in 24 hours for an additional fee. Our team handles all embassy coordination.",
  },
  {
    q: "What documents do I need to apply for a visa as an Indian passport holder?",
    a: "Typically you need: a valid passport with 6+ months validity, recent passport-size photos (white background), travel itinerary, proof of accommodation, and bank statements. Requirements vary by country — our system shows you the exact checklist for each destination.",
  },
  {
    q: "Is My Trip Looker a government website?",
    a: "No. My Trip Looker is a private visa facilitation service that coordinates with embassies and consulates on your behalf. We are not affiliated with any government body. Our service adds expert document review, real-time tracking, and faster processing.",
  },
  {
    q: "How much does a Dubai visa cost for Indians?",
    a: "A Dubai/UAE tourist eVisa costs ₹2,499 through My Trip Looker. This includes document verification, embassy processing, and real-time WhatsApp tracking. Express 24-hour processing is available at an additional cost.",
  },
  {
    q: "Can I track my visa application status?",
    a: "Yes! You receive real-time updates via WhatsApp and email at every stage — from document review to embassy submission to approval and visa delivery. You can check status anytime by messaging us on WhatsApp.",
  },
  {
    q: "Which countries offer visa on arrival for Indian passport holders?",
    a: "Countries with visa on arrival for Indians include Indonesia (Bali), Maldives, Cambodia, Laos, Seychelles, Madagascar, and others. Thailand offers VOA for certain categories. My Trip Looker helps with pre-registration and documentation to speed up your arrival.",
  },
  {
    q: "What if my visa application is rejected?",
    a: "With our 98.7% approval rate, rejections are extremely rare. If your visa is rejected due to a processing error on our part, we offer free re-application. Our expert document review before submission is specifically designed to prevent rejections.",
  },
  {
    q: "Do Indians need a visa for Malaysia?",
    a: "India is eligible for Malaysia's visa-free transit facility for stays up to 120 hours under certain conditions. For longer tourist stays, an eVisa or eNTRI is required. Contact My Trip Looker and we will guide you on the best option for your trip.",
  },
];

/* ─── WHATSAPP SVG ICON ─── */
function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.913.914l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.39-1.59.75.75 0 00-.665-.078l-2.902.973.973-2.902a.75.75 0 00-.078-.665A9.94 9.94 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="inline w-3.5 h-3.5 mr-1 -mt-px" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

/* ============================================================================
   PAGE COMPONENT
   ============================================================================ */
export default function HomePage() {
  return (
    <>
      {/* ════════════════════════════════════════
          HEADER — Sticky nav with WhatsApp CTA
          ════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <nav
          className="section-container flex items-center justify-between h-14 sm:h-16"
          aria-label="Primary navigation"
        >
          <Link
            href="/"
            className="flex items-center gap-2 tap-target"
            aria-label="My Trip Looker Visa Services — Home"
          >
            {/* TODO: Replace with <Image src="/logo.png" ... /> */}
            <span className="text-lg sm:text-xl font-bold font-heading gradient-text tracking-tight">
              My Trip Looker
            </span>
            <span className="hidden sm:inline-flex px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[10px] font-semibold text-blue-300 uppercase tracking-widest">
              Visa
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <a href="#destinations" className="hover:text-white transition-colors">Destinations</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <Link href="https://www.mytriplooker.com" className="hover:text-white transition-colors" target="_blank" rel="noopener">
              MyTripLooker.com
            </Link>
          </div>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-5 sm:py-2.5
                       bg-[#25D366] hover:bg-[#20BD5A] active:bg-[#1DA851]
                       text-white text-sm font-semibold rounded-lg
                       transition-colors touch-manipulation tap-target"
            aria-label="Chat with us on WhatsApp for visa assistance"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp Us</span>
            <span className="sm:hidden">Chat</span>
          </a>
        </nav>
      </header>

      <main id="main-content">
        {/* ════════════════════════════════════════
            HERO — Primary H1 keyword targeting
            ════════════════════════════════════════ */}
        <section className="relative isolate overflow-hidden" aria-labelledby="hero-h1">
          {/* Ambient bg */}
          <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[min(900px,120vw)] aspect-square rounded-full bg-blue-600/8 blur-[100px]" />
            <div className="absolute bottom-0 right-[-10%] w-[400px] aspect-square rounded-full bg-cyan-500/5 blur-[80px]" />
          </div>

          <div className="section-container pt-10 pb-14 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-28 text-center">
            {/* Trust badge */}
            <div className="trust-badge animate-fade-in-up">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              Trusted by 50,000+ Indian travellers&nbsp;·&nbsp;98.7% approval
            </div>

            {/* H1 — primary SEO keyword */}
            <h1
              id="hero-h1"
              className="mt-6 sm:mt-8 text-[2rem] leading-[1.15] sm:text-5xl lg:text-6xl xl:text-[4.25rem]
                         font-extrabold font-heading tracking-tight animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              <span className="text-white">Your Visa, </span>
              <span className="gradient-text">Handled.</span>
            </h1>

            <p
              className="mt-4 sm:mt-6 text-slate-400 text-[15px] sm:text-lg lg:text-xl
                         max-w-[42rem] mx-auto leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "180ms" }}
            >
              Embassy-accurate document checklists. Expert processing.
              Real-time tracking. <strong className="text-slate-200">Visa for Indian passport holders</strong> flying
              worldwide — UAE&nbsp;eVisa, Thailand, Vietnam, Indonesia&nbsp;VOA,
              Singapore, Malaysia &amp;&nbsp;50+&nbsp;countries.
            </p>

            {/* CTAs */}
            <div
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4
                         animate-fade-in-up"
              style={{ animationDelay: "260ms" }}
            >
              <a href="/apply" className="btn-primary w-full sm:w-auto">
                Apply for Visa Now <ArrowIcon />
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full sm:w-auto">
                <WhatsAppIcon /> Chat on WhatsApp
              </a>
            </div>

            {/* Stats row */}
            <div
              className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto
                         animate-fade-in-up"
              style={{ animationDelay: "340ms" }}
            >
              {STATS.map((s) => (
                <div key={s.label} className="text-center py-3">
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[11px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            FLAG MARQUEE — Country social proof
            ════════════════════════════════════════ */}
        <div
          className="relative border-y border-slate-800/40 bg-slate-900/30 py-3.5 overflow-hidden no-print"
          role="marquee"
          aria-label="Countries we process visas for: UAE, Thailand, Vietnam, Indonesia, Malaysia, Singapore, Japan, South Korea, Turkey, Egypt, Azerbaijan, Sri Lanka"
        >
          <div className="flex animate-scroll-marquee whitespace-nowrap">
            {[...DESTINATIONS, ...DESTINATIONS].map((d, i) => (
              <span
                key={`${d.slug}-${i}`}
                className="inline-flex items-center gap-2 px-5 text-sm text-slate-500"
              >
                <span className="text-lg" role="img" aria-label={`${d.name} flag`}>{d.flag}</span>
                {d.name}
              </span>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════
            DESTINATIONS — H2 keyword-rich
            ════════════════════════════════════════ */}
        <section id="destinations" className="py-14 sm:py-20 lg:py-24" aria-labelledby="destinations-h2">
          <div className="section-container">
            <div className="text-center">
              <h2 id="destinations-h2" className="heading-section text-white">
                Popular Visa Destinations for Indian Passport Holders
              </h2>
              <p className="heading-sub">
                Select your country below. We handle the complete visa process — document review,
                embassy coordination, and delivery.
              </p>
            </div>

            <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 stagger">
              {DESTINATIONS.map((d) => (
                <Link
                  key={d.slug}
                  href={`/apply?country=${d.slug === "dubai" ? "uae" : d.slug}`}
                  className="card-interactive group animate-fade-in-up"
                  aria-label={`Apply for ${d.name} visa for Indian passport holders — ${d.type} — ${d.price}`}
                >
                  <div className="flex items-start gap-3.5">
                    <span
                      className="text-3xl sm:text-4xl flex-shrink-0 mt-0.5"
                      role="img"
                      aria-label={`Flag of ${d.name}`}
                    >
                      {d.flag}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-blue-400 transition-colors">
                          {d.name}
                        </h3>
                        {d.popular && (
                          <span className="px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-[9px] font-bold text-amber-400 uppercase tracking-wider">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 mt-0.5">{d.type}</p>
                      <div className="flex items-center justify-between mt-2.5">
                        <span className="text-xs text-slate-500">
                          <ClockIcon />
                          {d.days}
                        </span>
                        <span className="font-bold text-blue-400 text-sm">{d.price}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <p className="mt-8 text-center text-slate-500 text-sm">
              + 38 more countries available.{" "}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                Message us on WhatsApp
              </a>{" "}
              for any destination not listed.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════
            HOW IT WORKS — 4-step process
            ════════════════════════════════════════ */}
        <section
          id="how-it-works"
          className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-900/50 to-transparent"
          aria-labelledby="steps-h2"
        >
          <div className="section-container">
            <div className="text-center">
              <h2 id="steps-h2" className="heading-section text-white">
                Get Your Visa in 4 Easy Steps
              </h2>
              <p className="heading-sub">
                From application to approval — our streamlined process makes visa applications effortless
                for Indian travellers.
              </p>
            </div>

            <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {STEPS.map((s, i) => (
                <div
                  key={s.num}
                  className="card text-center relative animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className="text-3xl mb-3 block" aria-hidden="true">{s.icon}</span>
                  <span className="text-5xl font-extrabold font-heading text-blue-500/10 absolute top-3 right-4" aria-hidden="true">
                    {s.num}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            WHY TRUST US — Features
            ════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 lg:py-24" aria-labelledby="why-h2">
          <div className="section-container">
            <div className="text-center">
              <h2 id="why-h2" className="heading-section text-white">
                Why 50,000+ Indians Choose My Trip Looker
              </h2>
              <p className="heading-sub">
                We specialize exclusively in visa services for Indian passport holders.
                No other service matches our accuracy, speed, and support.
              </p>
            </div>

            <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {FEATURES.map((f) => (
                <div key={f.title} className="card card-interactive">
                  <div
                    className="w-11 h-11 flex items-center justify-center rounded-xl
                               bg-blue-500/10 text-blue-400 mb-4"
                  >
                    {f.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            TESTIMONIALS — Social proof
            ════════════════════════════════════════ */}
        <section
          className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-900/50 to-transparent"
          aria-labelledby="reviews-h2"
        >
          <div className="section-container">
            <div className="text-center">
              <h2 id="reviews-h2" className="heading-section text-white">
                Trusted by Indian Travellers Nationwide
              </h2>
              <p className="heading-sub">
                Real reviews from verified customers who got their visa through My Trip Looker.
              </p>
            </div>

            <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
              {TESTIMONIALS.map((t) => (
                <blockquote key={t.name} className="card flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3" aria-label={`Rated ${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Badge */}
                  <span className="inline-flex self-start px-2 py-0.5 mb-2 bg-blue-500/10 border border-blue-500/20 rounded text-[10px] font-semibold text-blue-300">
                    {t.visa}
                  </span>

                  <p className="text-sm text-slate-300 leading-relaxed flex-1">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  <footer className="mt-4 pt-3 border-t border-slate-800/50 flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20
                                 flex items-center justify-center text-blue-300 font-bold text-sm"
                      aria-hidden="true"
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <cite className="not-italic text-sm font-semibold text-white">{t.name}</cite>
                      <p className="text-xs text-slate-500">{t.location}</p>
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            FAQ — Schema-enhanced, keyword-rich
            ════════════════════════════════════════ */}
        <section id="faq" className="py-14 sm:py-20 lg:py-24" aria-labelledby="faq-h2">
          <div className="section-narrow">
            <div className="text-center">
              <h2 id="faq-h2" className="heading-section text-white">
                Frequently Asked Questions
              </h2>
              <p className="heading-sub">
                Everything Indian passport holders need to know about applying for visas through My Trip Looker.
              </p>
            </div>

            <div className="mt-10 sm:mt-14 space-y-3">
              {FAQS.map((faq, i) => (
                <details key={i} className="card group cursor-pointer">
                  <summary className="flex items-center justify-between gap-4 list-none font-semibold text-white text-sm sm:text-[15px] leading-snug">
                    <span>{faq.q}</span>
                    <svg
                      className="w-5 h-5 flex-shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed pr-8">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            FINAL CTA — Conversion section
            ════════════════════════════════════════ */}
        <section
          id="contact"
          className="py-14 sm:py-20 lg:py-24 relative overflow-hidden"
          aria-labelledby="cta-h2"
        >
          <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/8 rounded-full blur-[120px]" />
          </div>

          <div className="section-container text-center">
            <h2 id="cta-h2" className="heading-section text-white">
              Ready to Get Your Visa?
            </h2>
            <p className="heading-sub">
              Join 50,000+ Indian travellers who got their visa the hassle-free way.
              Start your application now — it takes under 5 minutes.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full sm:w-auto"
              >
                <WhatsAppIcon /> Chat on WhatsApp
              </a>
              <a href="mailto:visa@mytriplooker.com" className="btn-outline w-full sm:w-auto">
                Email Us
              </a>
            </div>

            {/* Security badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                256-bit SSL Encrypted
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
                PCI-DSS Compliant
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                </svg>
                Secure Payments (UPI / Cards)
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* ════════════════════════════════════════
          FOOTER — Internal links + backlink to parent
          ════════════════════════════════════════ */}
      <footer className="border-t border-slate-800/50 bg-slate-950" role="contentinfo">
        <div className="section-container py-10 sm:py-14">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <Link href="/" className="text-xl font-bold font-heading gradient-text">
                My Trip Looker
              </Link>
              <p className="mt-3 text-sm text-slate-500 max-w-xs leading-relaxed">
                India&apos;s trusted visa facilitation service. 50,000+ visas processed for
                Indian passport holders across 50+ countries.
              </p>
              {/* Backlink to parent site — recommended by audit */}
              <p className="mt-3">
                <Link
                  href="https://www.mytriplooker.com"
                  className="text-sm text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                  target="_blank"
                  rel="noopener"
                >
                  &larr; Back to MyTripLooker.com
                </Link>
              </p>
            </div>

            {/* Popular Visas — internal links for SEO */}
            <div>
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-widest">
                Popular Visas for Indians
              </h3>
              <ul className="mt-3 space-y-2.5">
                {DESTINATIONS.filter((d) => d.popular).map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/apply?country=${d.slug === "dubai" ? "uae" : d.slug}`}
                      className="text-sm text-slate-500 hover:text-slate-200 transition-colors"
                    >
                      {d.name} Visa for Indians
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* More Destinations */}
            <div>
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-widest">
                More Destinations
              </h3>
              <ul className="mt-3 space-y-2.5">
                {DESTINATIONS.filter((d) => !d.popular).map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/apply?country=${d.slug === "dubai" ? "uae" : d.slug}`}
                      className="text-sm text-slate-500 hover:text-slate-200 transition-colors"
                    >
                      {d.name} Visa for Indians
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links + Contact */}
            <div>
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-widest">
                Quick Links
              </h3>
              <ul className="mt-3 space-y-2.5">
                <li><a href="#how-it-works" className="text-sm text-slate-500 hover:text-slate-200 transition-colors">How It Works</a></li>
                <li><a href="/apply" className="text-sm text-slate-500 hover:text-slate-200 transition-colors">All Destinations</a></li>
                <li><a href="#faq" className="text-sm text-slate-500 hover:text-slate-200 transition-colors">FAQs</a></li>
                <li>
                  <a
                    href="mailto:visa@mytriplooker.com"
                    className="text-sm text-slate-500 hover:text-slate-200 transition-colors"
                  >
                    visa@mytriplooker.com
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-500 hover:text-slate-200 transition-colors"
                  >
                    WhatsApp: +91 99999 99999
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <p>&copy; {new Date().getFullYear()} My Trip Looker. All rights reserved.</p>
            <p>
              Not a government website. Private visa facilitation service only.
            </p>
          </div>
        </div>
      </footer>

      {/* ════════════════════════════════════════
          FLOATING WHATSAPP BUTTON (mobile)
          ════════════════════════════════════════ */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 md:hidden
                   w-14 h-14 flex items-center justify-center
                   bg-[#25D366] hover:bg-[#20BD5A] rounded-full
                   shadow-xl shadow-green-900/30
                   transition-transform hover:scale-110 active:scale-95
                   touch-manipulation no-print"
        aria-label="Open WhatsApp to chat about visa services"
      >
        <WhatsAppIcon className="w-7 h-7 text-white" />
      </a>
    </>
  );
}
