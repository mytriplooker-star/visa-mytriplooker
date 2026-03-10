import type { Metadata, Viewport } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "./globals.css";

/* ─── FONTS ─── */
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

/* ─── VIEWPORT (Next.js 14 — must be separate export) ─── */
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

/* ─── METADATA ─── */
export const metadata: Metadata = {
  metadataBase: new URL("https://visa.mytriplooker.com"),
  title: {
    default:
      "Visa for Indians | UAE, Thailand, Vietnam & 50+ Countries | My Trip Looker",
    template: "%s | Visa for Indians — My Trip Looker",
  },
  description:
    "Embassy-accurate visa for Indian passport holders. 50,000+ visas processed | 98.7% approval rate | Real-time WhatsApp & email tracking. UAE eVisa, Thailand, Vietnam, Indonesia VOA & more in 4 easy steps.",
  keywords: [
    "visa for indians",
    "uae visa for indians",
    "dubai visa for indians",
    "thailand visa for indians",
    "vietnam visa for indians",
    "evisa india",
    "indian passport visa",
    "visa on arrival for indians",
    "singapore visa for indians",
    "malaysia visa for indians",
    "indonesia visa for indians",
    "bali visa for indians",
    "turkey visa for indians",
    "japan visa for indians",
    "online visa application india",
    "dubai evisa",
    "thailand evisa from india",
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
      "Visa for Indians | UAE, Thailand, Vietnam & 50+ Countries | My Trip Looker",
    description:
      "Embassy-accurate visa for Indian passport holders. 50,000+ visas processed | 98.7% approval rate. UAE eVisa, Thailand, Vietnam, Indonesia VOA & more.",
    images: [
      {
        url: "https://visa.mytriplooker.com/og-visa.jpg",
        width: 1200,
        height: 630,
        alt: "My Trip Looker — Trusted Visa Services for Indian Passport Holders — 50+ Countries",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mytriplooker",
    creator: "@mytriplooker",
    title: "Visa for Indians | UAE, Thailand, Vietnam & 50+ Countries",
    description:
      "98.7% approval rate · 50,000+ visas processed · Real-time WhatsApp tracking. Apply in 4 steps.",
    images: ["https://visa.mytriplooker.com/og-visa.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  category: "travel",
  other: {
    "google-site-verification": "RHxlReg66ea-thd6ZsLzkfeX0WI2ZI2SkGnPj6VZ5xY",
  },
};

/* ─── JSON-LD STRUCTURED DATA ─── */
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
  image: "https://visa.mytriplooker.com/og-visa.jpg",
  description:
    "India's trusted visa facilitation service. Embassy-accurate processing for Indian passport holders across 50+ countries.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressLocality: "India",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.mytriplooker.com",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "12400",
    bestRating: "5",
    worstRating: "1",
  },
  priceRange: "₹₹",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
};

const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://visa.mytriplooker.com/#service",
  name: "Visa Processing Services for Indians",
  description:
    "Fast, embassy-accurate visa processing for Indian passport holders. UAE eVisa, Thailand, Vietnam, Indonesia VOA, Singapore, Malaysia & 50+ countries.",
  provider: {
    "@type": "TravelAgency",
    name: "My Trip Looker",
    url: "https://visa.mytriplooker.com",
  },
  serviceType: "Visa Facilitation",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Visa Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "UAE / Dubai eVisa for Indians",
          description: "UAE eVisa processing in 2-4 business days",
        },
        price: "2499",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Thailand Tourist Visa for Indians",
          description: "Thailand visa processing in 4-7 business days",
        },
        price: "1899",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Vietnam eVisa for Indians",
          description: "Vietnam eVisa processing in 3-5 business days",
        },
        price: "1599",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Singapore eVisa for Indians",
          description: "Singapore eVisa processing in 3-5 business days",
        },
        price: "3299",
        priceCurrency: "INR",
      },
    ],
  },
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://visa.mytriplooker.com/#website",
  name: "My Trip Looker Visa Services",
  url: "https://visa.mytriplooker.com",
  publisher: {
    "@id": "https://visa.mytriplooker.com/#organization",
  },
  description:
    "Visa services for Indian passport holders — 50+ countries, 98.7% approval rate.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://visa.mytriplooker.com/visa/{search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.mytriplooker.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Visa Services",
      item: "https://visa.mytriplooker.com",
    },
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I apply for a UAE eVisa as an Indian passport holder?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Apply through My Trip Looker in 4 easy steps: choose UAE as your destination, upload your passport and photo, pay securely via UPI or card, and receive your eVisa via email in 2-4 business days. Our experts handle all embassy coordination.",
      },
    },
    {
      "@type": "Question",
      name: "What is the visa approval rate for applications processed by My Trip Looker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "My Trip Looker maintains a 98.7% approval rate across 50+ countries with over 50,000 visas processed for Indian passport holders. Our expert document review minimizes rejection risk.",
      },
    },
    {
      "@type": "Question",
      name: "Which countries offer visa on arrival for Indian passport holders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Countries offering visa on arrival for Indians include Indonesia (Bali), Thailand (select categories), Maldives, Cambodia, Laos, Seychelles, and several others. My Trip Looker helps with pre-registration and required documentation.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a Dubai visa cost for Indians?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard Dubai/UAE tourist eVisa for Indian passport holders costs ₹2,499 through My Trip Looker, with processing in 2-4 business days. Express 24-hour processing is available for an additional fee.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a visa for Malaysia as an Indian citizen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "India is eligible for Malaysia's visa-free transit program for certain durations. For longer stays, an eVisa or eNTRI is required. My Trip Looker can guide you on the right option and handle the application.",
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
  ],
};

/* ─── ROOT LAYOUT ─── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <head>
        {/* Structured data — multiple JSON-LD blocks for rich results */}
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
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-body antialiased bg-slate-950 text-slate-100 overflow-x-hidden">
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
