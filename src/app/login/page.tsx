import type { Metadata } from "next";
import AuthPageClient from "./AuthPageClient";

export const metadata: Metadata = {
  title: "Sign In | MyTripLooker",
  description: "Sign in to your MyTripLooker account to track applications, view documents, and manage your visa portfolio.",
  keywords: "mytriplooker login,visa portal sign in,visa account india",
  alternates: { canonical: "https://visa.mytriplooker.com/login" },
  openGraph: {
    title: "Sign In | MyTripLooker",
    description: "Sign in to your MyTripLooker account to track applications, view documents, and manage your visa portfolio.",
    url: "https://visa.mytriplooker.com/login",
    siteName: "MyTripLooker",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "MyTripLooker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign In | MyTripLooker",
    description: "Sign in to your MyTripLooker account to track applications, view documents, and manage your visa portfolio.",
  },
};

export default function Page() {
  return <AuthPageClient />;
}
