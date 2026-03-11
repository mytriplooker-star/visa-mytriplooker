import type { Metadata } from "next";
import TermsPageClient from "./TermsPageClient";

export const metadata: Metadata = {
  title: "Terms of Service | MyTripLooker",
  description: "MyTripLooker's Terms of Service. Understand our service terms, refund policy, and your rights when using our visa facilitation service.",
  alternates: { canonical: "https://visa.mytriplooker.com/terms" },
};

export default function Page() {
  return <TermsPageClient />;
}
