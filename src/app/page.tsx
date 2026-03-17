import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "MyTripLooker — Visa Services for Indian Passport Holders",
  description: "Fast, affordable visa processing for Indian travellers. Apply online for Dubai, Bali, Thailand, Singapore, UK, USA & 50+ countries. 98.7% approval rate.",
  keywords: "visa for indian passport,online visa apply india,dubai visa india,bali visa india,thailand visa,singapore visa india,uk visa india,mytriplooker",
  alternates: { canonical: "https://visa.mytriplooker.com" },
  openGraph: {
    title: "MyTripLooker — Visa Services for Indian Passport Holders",
    description: "Apply for Dubai, Bali, Thailand, UK & 50+ country visas online. Embassy-accurate checklists, expert processing, real-time tracking.",
    url: "https://visa.mytriplooker.com",
    siteName: "MyTripLooker",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "MyTripLooker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyTripLooker — Visa Services for Indian Passport Holders",
    description: "Fast visa processing for Indian travellers. 50+ countries, 98.7% approval rate.",
  },
};

export default function Page() {
  return <HomePageClient />;
}
