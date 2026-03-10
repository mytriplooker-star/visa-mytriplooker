import type { Metadata, Viewport } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";

/* ═══════════════════════════════════════════════════════════════════
   src/app/layout.tsx — visa.mytriplooker.com
   ─────────────────────────────────────────────
   CRITICAL: This file fixes ALL SEO issues found in the audit:
   ✅ Page title (was "Create Next App")
   ✅ Meta description (was missing)
   ✅ Viewport meta tag (was missing — causes zoom issues on mobile)
   ✅ Canonical URL
   ✅ Open Graph tags (for WhatsApp/Facebook/Twitter sharing)
   ✅ Twitter Card tags
   ✅ Robots directives
   ✅ Keywords
   ✅ JSON-LD structured data (for Google rich results)
   ═══════════════════════════════════════════════════════════════════ */

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/* ─────────────────────────────────────────────
   VIEWPORT — MUST be a separate export in Next.js 14+
   DO NOT put viewport inside the metadata object.
   This is what generates the <meta name="viewport"> tag.
   ───────────────────────────────────────────── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

/* ─────────────────────────────────────────────
   METADATA — This generates <title>, <meta description>,
   OG tags, Twitter cards, canonical, robots, etc.
   ───────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://visa.mytriplooker.com"),

  title: {
    default:
      "MyTripLooker Visa | Fast eVisa for Indians | Dubai, Thailand, Bali & 50+ Countries",
    template: "%s | Visa for Indians — My Trip Looker",
  },

  description:
    "Apply for Dubai visa, Thailand eVisa, Bali visa & 50+ countries online in 4 easy steps. 98.7% approval rate, real-time tracking, starting ₹1,299. Trusted by 50,000+ Indian travellers.",

  keywords: [
    "visa for indians",
    "dubai visa for indians",
    "uae visa for indians",
    "thailand visa for indians",
    "thailand visa online",
    "bali visa for indians",
    "indonesia visa for indians",
    "singapore visa for indians",
    "vietnam visa for indians",
    "evisa india",
    "dubai evisa",
    "thailand evisa",
    "visa application india",
    "indian passport visa",
    "visa on arrival for indians",
    "malaysia visa for indians",
    "turkey visa for indians",
    "online visa application india",
    "my trip looker",
  ],

  authors: [{ name: "My Trip Looker", url: "https://visa.mytriplooker.com" }],
  creator: "My Trip Looker",
  publisher: "My Trip Looker",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://visa.mytriplooker.com",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://visa.mytriplooker.com",
    siteName: "My Trip Looker — Visa Services for Indians",
    title:
      "MyTripLooker Visa — Apply Online in 4 Steps | 98.7% Approval Rate",
    description:
      "Embassy-approved visas with live tracking. Dubai eVisa, Thailand, Bali, Singapore & 50+ countries. 98.7% success rate. Trusted by 50,000+ Indians.",
    images: [
      {
        url: "https://visa.mytriplooker.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "My Trip Looker — Visa Services for Indian Passport Holders — 50+ Countries",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@mytriplooker",
    creator: "@mytriplooker",
    title: "Visa for Indians | Dubai, Thailand, Bali & 50+ Countries",
    description:
      "98.7% approval · 50,000+ visas processed · Real-time WhatsApp tracking. Apply in 4 steps.",
    images: ["https://visa.mytriplooker.com/og-image.jpg"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  category: "travel",
};

/* ─────────────────────────────────────────────
   JSON-LD STRUCTURED DATA
   These generate <script type="application/ld+json"> in <head>
   for Google rich results (star ratings, FAQ snippets, etc.)
   ───────────────────────────────────────────── */

// 1. Organization / TravelAgency schema
const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": "https://visa.mytriplooker.com/#organization",
  name: "My Trip Looker",
  alternateName: "MyTripLooker Visa Services",
  url: "https://visa.mytriplooker.com",
  logo: {
    "@type": "ImageObject",
    url: "https://visa.mytriplooker.com/logo.png",
    width: 512,
    height: 512,
  },
  image: "https://visa.mytriplooker.com/og-image.jpg",
  description:
    "India's trusted visa facilitation service. Embassy-accurate processing for Indian passport holders across 50+ countries with 98.7% approval rate.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: ["https://www.mytriplooker.com"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "12400",
    bestRating: "5",
    worstRating: "1",
  },
  priceRange: "₹₹",
  areaServed: { "@type": "Country", name: "India" },
};

// 2. Service schema with price offers
const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://visa.mytriplooker.com/#service",
  name: "Visa Processing Services for Indian Passport Holders",
  description:
    "Fast, embassy-accurate visa processing for Indians. Dubai eVisa, Thailand, Bali, Vietnam, Singapore, Malaysia & 50+ countries.",
  provider: {
    "@type": "TravelAgency",
    name: "My Trip Looker",
    url: "https://visa.mytriplooker.com",
  },
  serviceType: "Visa Facilitation",
  areaServed: { "@type": "Country", name: "India" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Visa Services for Indians",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "UAE / Dubai eVisa for Indians",
          description:
            "Dubai eVisa processing in 2-4 business days for Indian passport holders",
        },
        price: "2499",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Thailand Tourist Visa for Indians",
          description:
            "Thailand visa processing in 4-7 business days for Indian passport holders",
        },
        price: "1899",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Bali / Indonesia Visa on Arrival for Indians",
          description:
            "Indonesia VOA pre-registration for Indian passport holders",
        },
        price: "1299",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Vietnam eVisa for Indians",
          description:
            "Vietnam eVisa processing in 3-5 business days for Indian passport holders",
        },
        price: "1599",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Singapore eVisa for Indians",
          description:
            "Singapore eVisa processing in 3-5 business days for Indian passport holders",
        },
        price: "3299",
        priceCurrency: "INR",
      },
    ],
  },
};

// 3. WebSite schema
const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://visa.mytriplooker.com/#website",
  name: "My Trip Looker Visa Services",
  url: "https://visa.mytriplooker.com",
  description:
    "Visa services for Indian passport holders — 50+ countries, 98.7% approval rate, real-time tracking.",
  publisher: { "@id": "https://visa.mytriplooker.com/#organization" },
};

// 4. Breadcrumb schema
const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "My Trip Looker",
      item: "https://www.mytriplooker.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Visa Services for Indians",
      item: "https://visa.mytriplooker.com",
    },
  ],
};

// 5. FAQ schema — eligible for Google FAQ rich snippets
const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I apply for a Dubai/UAE eVisa as an Indian passport holder?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Apply through My Trip Looker in 4 easy steps: choose UAE as your destination, upload your passport and photo, pay securely via UPI or card, and receive your eVisa via email in 2-4 business days.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a Dubai visa cost for Indians?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard Dubai/UAE tourist eVisa for Indian passport holders starts at ₹2,499 through My Trip Looker, with processing in 2-4 business days. Express 24-hour processing is available at additional cost.",
      },
    },
    {
      "@type": "Question",
      name: "What is the visa approval rate at My Trip Looker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "My Trip Looker maintains a 98.7% approval rate across 50+ countries with over 50,000 visas processed for Indian passport holders.",
      },
    },
    {
      "@type": "Question",
      name: "Which countries offer visa on arrival for Indian passport holders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Countries offering visa on arrival for Indians include Indonesia (Bali), Thailand (select categories), Maldives, Cambodia, Laos, Seychelles, and others. My Trip Looker helps with pre-registration and documentation.",
      },
    },
    {
      "@type": "Question",
      name: "Can I track my visa application status in real-time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. My Trip Looker provides real-time tracking via WhatsApp and email at every stage — from document review to embassy submission to visa approval and delivery.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a visa for Thailand as an Indian citizen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Indian passport holders need a tourist visa for Thailand. Processing takes 4-7 business days through My Trip Looker, starting at ₹1,899 with complete document review and embassy coordination.",
      },
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════════
   ROOT LAYOUT COMPONENT
   This wraps ALL pages (/, /apply, /dashboard, /visa, etc.)
   ═══════════════════════════════════════════════════════════════════ */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <head>
        {/* JSON-LD structured data for Google rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdOrganization),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdBreadcrumb),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
        {/* Preconnect for font performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-body antialiased bg-[#00080F] text-slate-100 overflow-x-hidden">
        {/* Skip-to-content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}