import type { Metadata, Viewport } from "next";
import "./globals.css";

/* ─────────────────────────────────────────────────────────────────────────
   GLOBAL METADATA  — applies to every page unless a page overrides it
───────────────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://visa.mytriplooker.com"),
  title: {
    default: "MyTripLooker — Visa Services for Indian Passport Holders",
    template: "%s | MyTripLooker Visa",
  },
  description:
    "Fast, affordable visa processing for Indian travellers. Apply online for Dubai, Bali, Thailand, Singapore, UK, USA & 50+ countries. Track your application in real-time. 98.7% approval rate.",
  keywords: [
    "visa for indian passport","online visa apply india","dubai visa india",
    "bali visa india","thailand visa","singapore visa india","uk visa india",
    "usa visa india","visa processing india","evisa india","mytriplooker",
    "visa service india","visa agent india","passport visa",
  ],
  authors: [{ name: "MyTripLooker", url: "https://visa.mytriplooker.com" }],
  creator: "MyTripLooker",
  publisher: "MyTripLooker",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://visa.mytriplooker.com",
    siteName: "MyTripLooker",
    title: "MyTripLooker — Visa Services for Indian Passport Holders",
    description:
      "Apply for Dubai, Bali, Thailand, UK & 50+ country visas online. Embassy-accurate checklists, expert processing, real-time tracking.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MyTripLooker — Visa Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyTripLooker — Visa Services for Indian Passport Holders",
    description:
      "Fast visa processing for Indian travellers. 50+ countries, 98.7% approval rate.",
    images: ["/og-image.jpg"],
    creator: "@mytriplooker",
  },
  alternates: {
    canonical: "https://visa.mytriplooker.com",
  },
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#08080F",
};

/* ─────────────────────────────────────────────────────────────────────────
   STRUCTURED DATA (JSON-LD)
───────────────────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": "https://visa.mytriplooker.com/#organization",
      name: "MyTripLooker",
      url: "https://visa.mytriplooker.com",
      logo: "https://visa.mytriplooker.com/logo.png",
      description:
        "Online visa processing service for Indian passport holders. We handle Dubai, Bali, Thailand, UK, USA and 50+ country visas.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "sales@mytriplooker.com",
        availableLanguage: ["English", "Hindi"],
      },
      sameAs: [
        "https://www.instagram.com/mytriplooker",
        "https://www.facebook.com/mytriplooker",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://visa.mytriplooker.com/#website",
      url: "https://visa.mytriplooker.com",
      name: "MyTripLooker",
      publisher: { "@id": "https://visa.mytriplooker.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://visa.mytriplooker.com/checklist?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How long does visa processing take for Indian passport holders?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Processing times vary: Dubai/UAE eVisa takes 3-5 working days, Bali VOA is instant, Thailand eVisa 5-7 days, UK/USA visas take 15-60 days. We show exact timelines for each country.",
          },
        },
        {
          "@type": "Question",
          name: "What documents do I need for a visa application?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Typically: valid Indian passport (6+ months validity), recent passport-size photo, travel dates, accommodation details, and financial proof. Our checklist shows exact requirements per country.",
          },
        },
        {
          "@type": "Question",
          name: "Is MyTripLooker safe and legitimate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. MyTripLooker is a registered visa service with 50,000+ processed applications and a 98.7% approval rate. Payments are secured by Razorpay with 256-bit SSL encryption.",
          },
        },
        {
          "@type": "Question",
          name: "What is the fee for visa processing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Fees vary by country: Dubai from ₹2,499, Bali from ₹1,299, Thailand from ₹1,899. This includes embassy fee + our service fee + GST. All fees are shown transparently before payment.",
          },
        },
      ],
    },
  ],
};

/* ─────────────────────────────────────────────────────────────────────────
   ROOT LAYOUT
───────────────────────────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Favicons */}
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#08080F", color: "#F5F0E8" }}>
        {children}
      </body>
    </html>
  );
}
