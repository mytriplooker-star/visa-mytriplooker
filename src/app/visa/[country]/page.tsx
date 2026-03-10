import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

/* ============================================================================
   /visa/[country]/page.tsx — Individual destination pages
   Each page targets long-tail keywords like "dubai visa for indians"
   ============================================================================ */

type CountryData = {
  name: string;
  flag: string;
  slug: string;
  type: string;
  days: string;
  price: string;
  title: string;
  description: string;
  h1: string;
  requirements: string[];
  processingInfo: string;
  overview: string;
};

const COUNTRY_DATA: Record<string, CountryData> = {
  dubai: {
    name: "UAE / Dubai",
    flag: "🇦🇪",
    slug: "dubai",
    type: "eVisa",
    days: "2–4 business days",
    price: "₹2,499",
    title: "Dubai / UAE eVisa for Indians — Apply Online | ₹2,499 | My Trip Looker",
    description:
      "Apply for UAE/Dubai eVisa for Indian passport holders. 2–4 day processing, 98.7% approval rate, real-time WhatsApp tracking. Starting at ₹2,499. Embassy-accurate document review included.",
    h1: "Dubai / UAE eVisa for Indian Passport Holders",
    requirements: [
      "Valid Indian passport with 6+ months validity",
      "Recent passport-size colour photograph (white background)",
      "Confirmed return flight ticket or itinerary",
      "Hotel booking or proof of accommodation in UAE",
      "Bank statement for last 3 months (minimum balance varies)",
      "Visa application form (we help you fill this)",
    ],
    processingInfo:
      "Standard processing takes 2–4 business days. Express 24-hour processing is available for an additional fee. You receive real-time WhatsApp updates at every stage.",
    overview:
      "The UAE eVisa allows Indian passport holders to visit Dubai, Abu Dhabi, Sharjah, and other Emirates for tourism, business, or transit. My Trip Looker handles the entire application process including document verification, embassy coordination, and digital visa delivery.",
  },
  thailand: {
    name: "Thailand",
    flag: "🇹🇭",
    slug: "thailand",
    type: "Tourist Visa",
    days: "4–7 business days",
    price: "₹1,899",
    title: "Thailand Visa for Indians — Tourist Visa Online | ₹1,899 | My Trip Looker",
    description:
      "Apply for Thailand tourist visa for Indian passport holders. 4–7 day processing, expert document review, WhatsApp tracking. Starting at ₹1,899.",
    h1: "Thailand Tourist Visa for Indian Passport Holders",
    requirements: [
      "Valid Indian passport with 6+ months validity",
      "Two recent passport-size photographs",
      "Confirmed return flight tickets",
      "Hotel booking or invitation letter",
      "Bank statement for last 6 months",
      "Cover letter stating purpose of visit",
    ],
    processingInfo:
      "Standard processing takes 4–7 business days through the Thai Embassy. Our experts review all documents before submission to ensure highest approval chances.",
    overview:
      "Thailand is one of the most popular travel destinations for Indian tourists. A tourist visa allows stays of up to 60 days. My Trip Looker handles the complete application including Royal Thai Embassy coordination.",
  },
  vietnam: {
    name: "Vietnam",
    flag: "🇻🇳",
    slug: "vietnam",
    type: "eVisa / Visa on Arrival",
    days: "3–5 business days",
    price: "₹1,599",
    title: "Vietnam Visa for Indians — eVisa & VOA | ₹1,599 | My Trip Looker",
    description:
      "Apply for Vietnam eVisa or Visa on Arrival for Indian passport holders. 3–5 day processing, 98.7% approval, WhatsApp tracking. From ₹1,599.",
    h1: "Vietnam eVisa & Visa on Arrival for Indians",
    requirements: [
      "Valid Indian passport with 6+ months validity",
      "Passport-size photograph (4x6cm, white background)",
      "Confirmed flight itinerary",
      "Accommodation details in Vietnam",
      "Online application form (we assist with this)",
    ],
    processingInfo:
      "Vietnam eVisa is processed in 3–5 business days. Visa on Arrival requires a pre-approved letter which we obtain for you within 1–2 business days.",
    overview:
      "Indian passport holders can enter Vietnam with either an eVisa (single entry, 30 days) or Visa on Arrival (available at international airports). My Trip Looker handles both options with complete documentation support.",
  },
  indonesia: {
    name: "Bali / Indonesia",
    flag: "🇮🇩",
    slug: "indonesia",
    type: "Visa on Arrival",
    days: "On Arrival",
    price: "₹1,299",
    title: "Indonesia / Bali Visa for Indians — VOA Pre-Registration | ₹1,299 | My Trip Looker",
    description:
      "Indonesia Visa on Arrival pre-registration for Indian passport holders. Skip the airport queue in Bali. ₹1,299 with document review and travel support.",
    h1: "Indonesia / Bali Visa on Arrival for Indian Passport Holders",
    requirements: [
      "Valid Indian passport with 6+ months validity",
      "Return flight ticket within 30 days",
      "Proof of accommodation in Indonesia",
      "VOA fee (payable at airport or pre-registered)",
      "Passport-size photograph for pre-registration",
    ],
    processingInfo:
      "Indonesia offers Visa on Arrival for Indian citizens at major airports including Bali (Ngurah Rai). Our pre-registration service saves you 1–2 hours of queue time at immigration.",
    overview:
      "Indian passport holders can obtain a 30-day Visa on Arrival at Indonesian airports including Bali, Jakarta, and Surabaya. My Trip Looker provides pre-registration and documentation assistance to ensure a smooth arrival experience.",
  },
  malaysia: {
    name: "Malaysia",
    flag: "🇲🇾",
    slug: "malaysia",
    type: "eVisa / eNTRI",
    days: "3–5 business days",
    price: "Free*",
    title: "Malaysia Visa for Indians — eVisa & Visa-Free Entry | My Trip Looker",
    description:
      "Malaysia visa information for Indian passport holders. Visa-free transit available. eVisa and eNTRI processing with expert guidance from My Trip Looker.",
    h1: "Malaysia Visa for Indian Passport Holders",
    requirements: [
      "Valid Indian passport with 6+ months validity",
      "Recent passport-size photograph",
      "Confirmed return flight ticket",
      "Hotel booking or accommodation proof",
      "Bank statement showing sufficient funds",
      "Travel insurance (recommended)",
    ],
    processingInfo:
      "India is eligible for Malaysia's visa-free transit facility (up to 120 hours under specific conditions). For tourist stays, eVisa or eNTRI note processing takes 3–5 business days.",
    overview:
      "Malaysia offers multiple entry options for Indian passport holders depending on the purpose and duration of visit. My Trip Looker guides you to the right visa type and handles the complete application if required.",
  },
  singapore: {
    name: "Singapore",
    flag: "🇸🇬",
    slug: "singapore",
    type: "eVisa",
    days: "3–5 business days",
    price: "₹3,299",
    title: "Singapore Visa for Indians — eVisa Online | ₹3,299 | My Trip Looker",
    description:
      "Apply for Singapore eVisa for Indian passport holders. 3–5 day processing, embassy-accurate documents, WhatsApp tracking. Starting at ₹3,299.",
    h1: "Singapore eVisa for Indian Passport Holders",
    requirements: [
      "Valid Indian passport with 6+ months validity",
      "Recent colour photograph (35mm x 45mm)",
      "Confirmed return flight ticket",
      "Hotel booking or host's details in Singapore",
      "Bank statement for last 3 months",
      "Cover letter with travel itinerary",
      "Income proof (salary slips or ITR)",
    ],
    processingInfo:
      "Singapore eVisa processing takes 3–5 business days. Our experts ensure all documents meet the Immigration & Checkpoints Authority (ICA) requirements before submission.",
    overview:
      "Indian passport holders require an eVisa to enter Singapore. The visa is typically issued for 30 days with single or multiple entry options. My Trip Looker handles the complete application through authorized channels.",
  },
  japan: {
    name: "Japan",
    flag: "🇯🇵",
    slug: "japan",
    type: "Tourist Visa",
    days: "5–7 business days",
    price: "₹5,999",
    title: "Japan Visa for Indians — Tourist Visa Application | ₹5,999 | My Trip Looker",
    description:
      "Apply for Japan tourist visa for Indian passport holders. 5–7 day processing, expert document review, embassy coordination. Starting at ₹5,999.",
    h1: "Japan Tourist Visa for Indian Passport Holders",
    requirements: [
      "Valid Indian passport with 6+ months validity",
      "Two recent passport-size photographs",
      "Detailed day-by-day travel itinerary",
      "Confirmed hotel reservations",
      "Return flight booking",
      "Bank statement for last 6 months",
      "Income tax returns for last 3 years",
      "Employment letter or business proof",
    ],
    processingInfo:
      "Japan tourist visa processing takes 5–7 business days via the Embassy of Japan. Our team prepares your complete application including the detailed itinerary required by the embassy.",
    overview:
      "Japan requires Indian passport holders to obtain a tourist visa before travel. The application process requires detailed documentation including a day-by-day itinerary. My Trip Looker specializes in preparing Japan visa applications with high approval rates.",
  },
  "south-korea": {
    name: "South Korea",
    flag: "🇰🇷",
    slug: "south-korea",
    type: "Tourist Visa",
    days: "5–7 business days",
    price: "₹4,999",
    title: "South Korea Visa for Indians — Tourist Visa | ₹4,999 | My Trip Looker",
    description:
      "Apply for South Korea tourist visa for Indian passport holders. 5–7 day processing, document verification, WhatsApp tracking. Starting at ₹4,999.",
    h1: "South Korea Tourist Visa for Indian Passport Holders",
    requirements: [
      "Valid Indian passport with 6+ months validity",
      "Recent passport-size photograph",
      "Travel itinerary and flight booking",
      "Hotel reservation confirmation",
      "Bank statement for last 6 months",
      "Employment proof or business registration",
    ],
    processingInfo:
      "South Korea tourist visa processing takes 5–7 business days. Our experts ensure all documents meet Korean Embassy requirements for maximum approval chances.",
    overview:
      "Indian passport holders need a tourist visa to visit South Korea. My Trip Looker handles the complete application process including Korean Embassy coordination and document preparation.",
  },
  turkey: {
    name: "Turkey",
    flag: "🇹🇷",
    slug: "turkey",
    type: "eVisa",
    days: "1–3 business days",
    price: "₹3,999",
    title: "Turkey eVisa for Indians — Online Application | ₹3,999 | My Trip Looker",
    description:
      "Apply for Turkey eVisa for Indian passport holders. 1–3 day processing, instant digital delivery, expert support. Starting at ₹3,999.",
    h1: "Turkey eVisa for Indian Passport Holders",
    requirements: [
      "Valid Indian passport with 6+ months validity",
      "Valid Schengen, US, UK, or Ireland visa/residence permit (required for eVisa eligibility)",
      "Return flight ticket",
      "Hotel booking in Turkey",
    ],
    processingInfo:
      "Turkey eVisa for Indians who hold a valid Schengen/US/UK visa is processed in 1–3 business days. Without these, a sticker visa is required — we handle both options.",
    overview:
      "Indian passport holders can apply for a Turkey eVisa if they hold a valid visa or residence permit from Schengen countries, US, UK, or Ireland. My Trip Looker verifies your eligibility and processes the application seamlessly.",
  },
  egypt: {
    name: "Egypt",
    flag: "🇪🇬",
    slug: "egypt",
    type: "eVisa",
    days: "3–5 business days",
    price: "₹2,999",
    title: "Egypt eVisa for Indians — Online Application | ₹2,999 | My Trip Looker",
    description:
      "Apply for Egypt eVisa for Indian passport holders. 3–5 day processing, digital delivery, WhatsApp tracking. Starting at ₹2,999.",
    h1: "Egypt eVisa for Indian Passport Holders",
    requirements: [
      "Valid Indian passport with 8+ months validity",
      "Recent passport-size photograph",
      "Hotel booking in Egypt",
      "Return flight ticket",
      "Bank statement showing sufficient funds",
    ],
    processingInfo:
      "Egypt eVisa processing takes 3–5 business days. The visa allows single or multiple entry for tourism purposes.",
    overview:
      "Indian passport holders can apply for an Egypt eVisa online. My Trip Looker handles the complete application with document verification and embassy coordination for a smooth experience.",
  },
  azerbaijan: {
    name: "Azerbaijan",
    flag: "🇦🇿",
    slug: "azerbaijan",
    type: "eVisa",
    days: "3 business days",
    price: "₹2,499",
    title: "Azerbaijan eVisa for Indians — Apply Online | ₹2,499 | My Trip Looker",
    description:
      "Apply for Azerbaijan eVisa for Indian passport holders. 3-day processing, digital delivery, expert support. Starting at ₹2,499.",
    h1: "Azerbaijan eVisa for Indian Passport Holders",
    requirements: [
      "Valid Indian passport with 6+ months validity",
      "Passport-size photograph",
      "Travel itinerary",
      "Hotel booking confirmation",
    ],
    processingInfo:
      "Azerbaijan eVisa for Indians is typically processed within 3 business days. The visa allows a 30-day stay for tourism or business.",
    overview:
      "Azerbaijan offers an easy eVisa application process for Indian passport holders. My Trip Looker handles the entire application with document review and real-time tracking.",
  },
  "sri-lanka": {
    name: "Sri Lanka",
    flag: "🇱🇰",
    slug: "sri-lanka",
    type: "ETA (Electronic Travel Authorization)",
    days: "1–2 business days",
    price: "₹1,299",
    title: "Sri Lanka Visa for Indians — ETA Online | ₹1,299 | My Trip Looker",
    description:
      "Apply for Sri Lanka ETA for Indian passport holders. 1–2 day processing, digital delivery, WhatsApp tracking. Starting at ₹1,299.",
    h1: "Sri Lanka ETA for Indian Passport Holders",
    requirements: [
      "Valid Indian passport with 6+ months validity",
      "Return flight ticket",
      "Hotel booking or accommodation details",
      "Sufficient funds for the stay",
    ],
    processingInfo:
      "Sri Lanka ETA for Indian citizens is processed in 1–2 business days. It allows a 30-day tourist stay with possible extension.",
    overview:
      "Indian passport holders need an Electronic Travel Authorization (ETA) to visit Sri Lanka. My Trip Looker processes your ETA application with expert document review and instant digital delivery.",
  },
};

/* ─── GENERATE STATIC PARAMS for all countries ─── */
export async function generateStaticParams() {
  return Object.keys(COUNTRY_DATA).map((country) => ({
    country,
  }));
}

/* ─── DYNAMIC METADATA per country ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  const data = COUNTRY_DATA[country];
  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `https://visa.mytriplooker.com/visa/${data.slug}`,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `https://visa.mytriplooker.com/visa/${data.slug}`,
      siteName: "My Trip Looker Visa Services",
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: `https://visa.mytriplooker.com/og-visa.jpg`,
          width: 1200,
          height: 630,
          alt: `${data.name} Visa for Indian Passport Holders — My Trip Looker`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.h1,
      description: data.description,
    },
  };
}

const WHATSAPP_LINK =
  "https://wa.me/919012222901?text=Hi%2C%20I%20need%20help%20with%20a%20visa%20for%20Indian%20passport";

/* ─── PAGE COMPONENT ─── */
export default async function CountryVisaPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  const data = COUNTRY_DATA[country];

  if (!data) notFound();

  /* Country-specific JSON-LD */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${data.name} Visa Service for Indians`,
    description: data.description,
    provider: {
      "@type": "TravelAgency",
      name: "My Trip Looker",
      url: "https://visa.mytriplooker.com",
    },
    areaServed: { "@type": "Country", name: "India" },
    offers: {
      "@type": "Offer",
      price: data.price.replace(/[₹,*Free]/g, "") || "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mytriplooker.com" },
      { "@type": "ListItem", position: 2, name: "Visa Services", item: "https://visa.mytriplooker.com" },
      {
        "@type": "ListItem",
        position: 3,
        name: `${data.name} Visa`,
        item: `https://visa.mytriplooker.com/visa/${data.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <nav className="section-container flex items-center justify-between h-14 sm:h-16">
          <Link href="/" className="text-lg font-bold font-heading gradient-text tap-target">
            My Trip Looker
          </Link>
          <a
            href={`${WHATSAPP_LINK}%20for%20${encodeURIComponent(data.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-5 sm:py-2.5
                       bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold
                       rounded-lg transition-colors touch-manipulation tap-target"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.913.914l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.39-1.59.75.75 0 00-.665-.078l-2.902.973.973-2.902a.75.75 0 00-.078-.665A9.94 9.94 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Apply Now
          </a>
        </nav>
      </header>

      <main id="main-content" className="section-container py-10 sm:py-16 lg:py-20">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="https://www.mytriplooker.com" className="hover:text-slate-300 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/" className="hover:text-slate-300 transition-colors">Visa Services</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-300 font-medium">{data.name}</li>
          </ol>
        </nav>

        {/* H1 */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-5xl sm:text-6xl" role="img" aria-label={`${data.name} flag`}>{data.flag}</span>
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white">
              {data.h1}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-400">
              <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-300 font-medium">
                {data.type}
              </span>
              <span>{data.days}</span>
              <span className="font-bold text-blue-400 text-lg">{data.price}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Overview</h2>
              <p className="text-slate-400 leading-relaxed">{data.overview}</p>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="text-xl font-bold text-white mb-3">
                Documents Required for {data.name} Visa (Indian Citizens)
              </h2>
              <ul className="space-y-2.5">
                {data.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {req}
                  </li>
                ))}
              </ul>
            </section>

            {/* Processing */}
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Processing Time & Tracking</h2>
              <p className="text-slate-400 leading-relaxed">{data.processingInfo}</p>
            </section>
          </div>

          {/* Sidebar CTA */}
          <aside>
            <div className="card sticky top-20 text-center">
              <h3 className="text-lg font-bold text-white mb-2">
                Apply for {data.name} Visa
              </h3>
              <p className="text-3xl font-extrabold font-heading text-blue-400 mb-1">{data.price}</p>
              <p className="text-xs text-slate-500 mb-5">Starting price · All-inclusive</p>

              <a
                href={`${WHATSAPP_LINK}%20for%20${encodeURIComponent(data.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full mb-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.913.914l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.39-1.59.75.75 0 00-.665-.078l-2.902.973.973-2.902a.75.75 0 00-.078-.665A9.94 9.94 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Apply via WhatsApp
              </a>
              <a href="mailto:sales@mytriplooker.com" className="btn-outline w-full text-sm">
                Email Us
              </a>

              <div className="mt-5 pt-4 border-t border-slate-800/50 space-y-2 text-xs text-slate-500 text-left">
                <p className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> 98.7% approval rate
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Real-time WhatsApp tracking
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Expert document review
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Free reprocessing on errors
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-slate-800/50">
          <Link
            href="/"
            className="text-sm text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
          >
            &larr; View all visa destinations for Indians
          </Link>
        </div>
      </main>

      <footer className="border-t border-slate-800/50 bg-slate-950 py-8">
        <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} My Trip Looker. All rights reserved.</p>
          <p>Not a government website. Private visa facilitation service only.</p>
        </div>
      </footer>
    </>
  );
}
