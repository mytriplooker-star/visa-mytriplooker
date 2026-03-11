import type { Metadata } from "next";
import PrivacyPageClient from "./PrivacyPageClient";

export const metadata: Metadata = {
  title: "Privacy Policy | MyTripLooker",
  description: "MyTripLooker's Privacy Policy. Learn how we collect, use, and protect your personal data when processing visa applications for Indian passport holders.",
  alternates: { canonical: "https://visa.mytriplooker.com/privacy" },
};

export default function Page() {
  return <PrivacyPageClient />;
}
