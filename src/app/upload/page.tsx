import type { Metadata } from "next";
import UploadPageClient from "./UploadPageClient";

export const metadata: Metadata = {
  title: "Upload Visa Documents | MyTripLooker",
  description: "Securely upload your passport, photographs, and supporting documents for visa processing. We verify every document for embassy accuracy.",
  keywords: "upload visa documents,visa document upload,passport upload visa",
  alternates: { canonical: "https://visa.mytriplooker.com/upload" },
  openGraph: {
    title: "Upload Visa Documents | MyTripLooker",
    description: "Securely upload your passport, photographs, and supporting documents for visa processing. We verify every document for embassy accuracy.",
    url: "https://visa.mytriplooker.com/upload",
    siteName: "MyTripLooker",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "MyTripLooker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Upload Visa Documents | MyTripLooker",
    description: "Securely upload your passport, photographs, and supporting documents for visa processing. We verify every document for embassy accuracy.",
  },
};

export default function Page() {
  return <UploadPageClient />;
}
