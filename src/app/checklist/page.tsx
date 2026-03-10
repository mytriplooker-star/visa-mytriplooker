import type { Metadata } from "next";
import ChecklistPageClient from "./ChecklistPageClient";

export const metadata: Metadata = {
  title: "Visa Requirements & Document Checklist | MyTripLooker",
  description: "Complete visa document checklist for 50+ countries. Know exactly what you need — passport, photos, finances — before applying. For Indian passport holders.",
  keywords: "visa documents checklist,visa requirements india,what documents for visa,visa checklist dubai,visa checklist bali",
  alternates: { canonical: "https://visa.mytriplooker.com/checklist" },
  openGraph: {
    title: "Visa Requirements & Document Checklist | MyTripLooker",
    description: "Complete visa document checklist for 50+ countries. Know exactly what you need — passport, photos, finances — before applying. For Indian passport holders.",
    url: "https://visa.mytriplooker.com/checklist",
    siteName: "MyTripLooker",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "MyTripLooker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visa Requirements & Document Checklist | MyTripLooker",
    description: "Complete visa document checklist for 50+ countries. Know exactly what you need — passport, photos, finances — before applying. For Indian passport holders.",
  },
};

export default function Page() {
  return <ChecklistPageClient />;
}
