import type { Metadata } from "next";
import TrackPageClient from "./TrackPageClient";

export const metadata: Metadata = {
  title: "Track Visa Application Status | MyTripLooker",
  description: "Track your visa application status in real-time. Get live updates on processing, approval, and delivery. Enter your reference ID to check status.",
  keywords: "track visa application,visa status check,visa application tracking india",
  alternates: { canonical: "https://visa.mytriplooker.com/track" },
  openGraph: {
    title: "Track Visa Application Status | MyTripLooker",
    description: "Track your visa application status in real-time. Get live updates on processing, approval, and delivery. Enter your reference ID to check status.",
    url: "https://visa.mytriplooker.com/track",
    siteName: "MyTripLooker",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "MyTripLooker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Track Visa Application Status | MyTripLooker",
    description: "Track your visa application status in real-time. Get live updates on processing, approval, and delivery. Enter your reference ID to check status.",
  },
};

export default function Page() {
  return <TrackPageClient />;
}
