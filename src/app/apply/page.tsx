import type { Metadata } from "next";
import ApplyPageClient from "./ApplyPageClient";

export const metadata: Metadata = {
  title: "Apply for Visa Online | MyTripLooker",
  description: "Apply for your visa in 4 simple steps. Select destination, fill personal details, upload documents, pay securely. 50+ countries, 98.7% approval rate.",
  keywords: "apply visa online india,online visa application,visa apply indian passport,dubai visa apply,bali visa apply,thailand visa apply",
  alternates: { canonical: "https://visa.mytriplooker.com/apply" },
  openGraph: {
    title: "Apply for Visa Online | MyTripLooker",
    description: "Apply for your visa in 4 simple steps. Select destination, fill personal details, upload documents, pay securely. 50+ countries, 98.7% approval rate.",
    url: "https://visa.mytriplooker.com/apply",
    siteName: "MyTripLooker",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "MyTripLooker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply for Visa Online | MyTripLooker",
    description: "Apply for your visa in 4 simple steps. Select destination, fill personal details, upload documents, pay securely. 50+ countries, 98.7% approval rate.",
  },
};

export default function Page() {
  return <ApplyPageClient />;
}
