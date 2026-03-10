import type { Metadata } from "next";
import PaymentPageClient from "./PaymentPageClient";

export const metadata: Metadata = {
  title: "Secure Visa Payment | MyTripLooker",
  description: "Pay for your visa application securely via UPI, credit/debit card, or net banking. 256-bit SSL encryption. All fees shown transparently before payment.",
  keywords: "visa payment online,pay visa fees india,visa application payment,upi visa payment",
  alternates: { canonical: "https://visa.mytriplooker.com/pay" },
  openGraph: {
    title: "Secure Visa Payment | MyTripLooker",
    description: "Pay for your visa application securely via UPI, credit/debit card, or net banking. 256-bit SSL encryption. All fees shown transparently before payment.",
    url: "https://visa.mytriplooker.com/pay",
    siteName: "MyTripLooker",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "MyTripLooker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Secure Visa Payment | MyTripLooker",
    description: "Pay for your visa application securely via UPI, credit/debit card, or net banking. 256-bit SSL encryption. All fees shown transparently before payment.",
  },
};

export default function Page() {
  return <PaymentPageClient />;
}
