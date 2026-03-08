export type DocCategory = 'identity' | 'financial' | 'travel' | 'accommodation' | 'employment' | 'insurance' | 'photo' | 'forms';

export interface DocRequirement {
  id: string;
  name: string;
  category: DocCategory;
  required: boolean;
  icon: string;
  specs: string[];
  notes?: string;
  acceptedFormats: string[];
}

export interface VisaType {
  id: string;
  label: string;
  type: 'evisa' | 'sticker' | 'voa' | 'free' | 'eta';
  embassyFee: number;
  serviceFee: number;
  processingDays: string;
  validity: string;
  maxStay: string;
  entries: 'single' | 'double' | 'multiple';
  documents: DocRequirement[];
}

export interface Country {
  name: string;
  slug: string;
  flag: string;
  isoCode: string;
  tagline: string;
  embassyInIndia: string;
  officialUrl: string;
  generalNotes: string[];
  visaTypes: VisaType[];
}

export const COUNTRIES: Country[] = [
  {
    name: "United Arab Emirates",
    slug: "uae",
    flag: "🇦🇪",
    isoCode: "AE",
    tagline: "Dubai, Abu Dhabi & beyond",
    embassyInIndia: "UAE Embassy, New Delhi",
    officialUrl: "https://icp.gov.ae",
    generalNotes: [
      "Indian passport holders require a visa to enter UAE",
      "eVisa is processed online — no embassy visit required",
      "Your passport must be valid for at least 6 months from travel date",
    ],
    visaTypes: [
      {
        id: "uae-30-single",
        label: "30 Days — Single Entry",
        type: "evisa",
        embassyFee: 1500,
        serviceFee: 999,
        processingDays: "3–5",
        validity: "60 days from issue",
        maxStay: "30 days",
        entries: "single",
        documents: [
          { id: "uae-passport", name: "Passport (Original Scan)", category: "identity", required: true, icon: "📘", specs: ["Valid for minimum 6 months from travel date", "At least 2 blank pages", "Scan all pages — front, back, and data page", "File size: max 2MB per page"], notes: "Expired or damaged passports will be rejected immediately.", acceptedFormats: ["PDF", "JPG"] },
          { id: "uae-photo", name: "Passport-size Photograph", category: "photo", required: true, icon: "📷", specs: ["White background only", "35mm × 45mm size", "Face covering 70–80% of frame", "Taken within last 3 months", "No glasses or head covering"], acceptedFormats: ["JPG", "PNG"] },
          { id: "uae-bank", name: "Bank Statement (3 Months)", category: "financial", required: true, icon: "🏦", specs: ["Last 3 months from your bank", "Must show minimum balance of ₹50,000", "Bank stamp and signature required", "Printed on bank letterhead"], notes: "Net banking statements without bank seal are NOT accepted.", acceptedFormats: ["PDF"] },
          { id: "uae-salary", name: "Salary Slip / Income Proof", category: "employment", required: true, icon: "💼", specs: ["Last 3 months salary slips", "Company stamp and HR signature required", "Self-employed: CA-certified ITR for last 2 years"], acceptedFormats: ["PDF", "JPG"] },
          { id: "uae-hotel", name: "Hotel Booking Confirmation", category: "accommodation", required: true, icon: "🏨", specs: ["Confirmed booking for entire duration of stay", "Must show your full name matching passport", "Hotel name, address, and dates must be visible"], notes: "Tentative or unconfirmed bookings are not accepted.", acceptedFormats: ["PDF"] },
          { id: "uae-flight", name: "Return Flight Tickets", category: "travel", required: true, icon: "✈️", specs: ["Both onward and return flight tickets", "Must be confirmed — not just a hold", "Passenger name must match passport exactly"], acceptedFormats: ["PDF"] },
        ],
      },
      {
        id: "uae-60-single",
        label: "60 Days — Single Entry",
        type: "evisa",
        embassyFee: 2500,
        serviceFee: 999,
        processingDays: "3–5",
        validity: "90 days from issue",
        maxStay: "60 days",
        entries: "single",
        documents: [
          { id: "uae-passport-60", name: "Passport (Original Scan)", category: "identity", required: true, icon: "📘", specs: ["Valid for minimum 6 months from travel date", "At least 2 blank pages"], acceptedFormats: ["PDF", "JPG"] },
          { id: "uae-photo-60", name: "Passport-size Photograph", category: "photo", required: true, icon: "📷", specs: ["White background", "35mm × 45mm", "Last 3 months"], acceptedFormats: ["JPG", "PNG"] },
          { id: "uae-bank-60", name: "Bank Statement (6 Months)", category: "financial", required: true, icon: "🏦", specs: ["Last 6 months statement", "Minimum balance ₹75,000", "Bank stamp required"], acceptedFormats: ["PDF"] },
          { id: "uae-hotel-60", name: "Hotel Booking Confirmation", category: "accommodation", required: true, icon: "🏨", specs: ["Confirmed booking for full stay duration"], acceptedFormats: ["PDF"] },
          { id: "uae-flight-60", name: "Return Flight Tickets", category: "travel", required: true, icon: "✈️", specs: ["Confirmed onward and return tickets"], acceptedFormats: ["PDF"] },
          { id: "uae-salary-60", name: "Salary Slip / Income Proof", category: "employment", required: true, icon: "💼", specs: ["Last 3 months salary slips with company stamp"], acceptedFormats: ["PDF", "JPG"] },
        ],
      },
    ],
  },
  {
    name: "Thailand",
    slug: "thailand",
    flag: "🇹🇭",
    isoCode: "TH",
    tagline: "Bangkok, Phuket, Chiang Mai",
    embassyInIndia: "Royal Thai Embassy, New Delhi",
    officialUrl: "https://www.thaievisa.go.th",
    generalNotes: [
      "Thailand offers eVisa — completely online process",
      "Passport must be valid 6 months beyond your travel date",
    ],
    visaTypes: [
      {
        id: "thailand-tourist",
        label: "Tourist Visa — 60 Days",
        type: "evisa",
        embassyFee: 1200,
        serviceFee: 699,
        processingDays: "5–7",
        validity: "3 months from issue",
        maxStay: "60 days",
        entries: "single",
        documents: [
          { id: "th-passport", name: "Passport (Scanned Copy)", category: "identity", required: true, icon: "📘", specs: ["Minimum 6 months validity from travel date", "At least 1 blank visa page", "Clear scan of bio-data page"], acceptedFormats: ["PDF", "JPG"] },
          { id: "th-photo", name: "Recent Photograph", category: "photo", required: true, icon: "📷", specs: ["White or light blue background", "4cm × 6cm", "Taken within last 6 months", "No spectacles"], acceptedFormats: ["JPG"] },
          { id: "th-bank", name: "Bank Statement", category: "financial", required: true, icon: "🏦", specs: ["Last 3 months", "Minimum balance ₹20,000", "Bank seal and signature mandatory"], acceptedFormats: ["PDF"] },
          { id: "th-hotel", name: "Accommodation Proof", category: "accommodation", required: true, icon: "🏨", specs: ["Hotel booking confirmation OR host invitation letter", "Dates must match travel dates"], acceptedFormats: ["PDF"] },
          { id: "th-flight", name: "Flight Itinerary", category: "travel", required: true, icon: "✈️", specs: ["Confirmed round-trip tickets"], acceptedFormats: ["PDF"] },
          { id: "th-insurance", name: "Travel Insurance", category: "insurance", required: false, icon: "🛡️", specs: ["Minimum coverage: USD 10,000 medical", "Covers entire trip duration"], acceptedFormats: ["PDF"] },
        ],
      },
    ],
  },
  {
    name: "Singapore",
    slug: "singapore",
    flag: "🇸🇬",
    isoCode: "SG",
    tagline: "The Lion City",
    embassyInIndia: "Singapore High Commission, New Delhi",
    officialUrl: "https://www.ica.gov.sg",
    generalNotes: [
      "Singapore visa must be applied through an accredited agent",
      "Biometric data may be required for first-time applicants",
    ],
    visaTypes: [
      {
        id: "sg-tourist",
        label: "Tourist Visa — 30 Days",
        type: "sticker",
        embassyFee: 2200,
        serviceFee: 1099,
        processingDays: "3–5",
        validity: "30 days from issue",
        maxStay: "30 days",
        entries: "single",
        documents: [
          { id: "sg-passport", name: "Original Passport", category: "identity", required: true, icon: "📘", specs: ["Valid for at least 6 months beyond travel dates", "At least 2 blank pages for visa stamp"], notes: "Singapore requires physical passport for sticker visa.", acceptedFormats: ["PDF", "JPG"] },
          { id: "sg-photo", name: "Photograph (2 copies)", category: "photo", required: true, icon: "📷", specs: ["White background", "35mm × 45mm", "Matte finish — no glossy prints", "Taken within last 3 months"], acceptedFormats: ["JPG"] },
          { id: "sg-form", name: "Visa Application Form 14A", category: "forms", required: true, icon: "📋", specs: ["Signed by applicant", "Download from ICA website"], acceptedFormats: ["PDF"] },
          { id: "sg-bank", name: "Bank Statement (3 Months)", category: "financial", required: true, icon: "🏦", specs: ["Last 3 months", "Minimum average balance ₹1,00,000", "Certified and stamped by bank"], acceptedFormats: ["PDF"] },
          { id: "sg-employment", name: "Employment Proof", category: "employment", required: true, icon: "💼", specs: ["Employment letter on company letterhead", "Mentioning position, salary, leave sanctioned"], acceptedFormats: ["PDF"] },
          { id: "sg-hotel", name: "Hotel Booking / Host Invitation", category: "accommodation", required: true, icon: "🏨", specs: ["Confirmed hotel booking for entire stay"], acceptedFormats: ["PDF"] },
          { id: "sg-flight", name: "Confirmed Air Tickets", category: "travel", required: true, icon: "✈️", specs: ["Both onward and return confirmed tickets"], acceptedFormats: ["PDF"] },
        ],
      },
    ],
  },
  {
    name: "France (Schengen)",
    slug: "france",
    flag: "🇫🇷",
    isoCode: "FR",
    tagline: "Paris & 26 Schengen countries",
    embassyInIndia: "French Embassy / VFS Global",
    officialUrl: "https://france-visas.gouv.fr",
    generalNotes: [
      "Schengen visa covers 27 European countries with one visa",
      "Apply at French embassy if France is your main destination",
      "Apply 15 weeks in advance — not more than 6 months before travel",
    ],
    visaTypes: [
      {
        id: "france-tourist",
        label: "Schengen Tourist Visa — 90 Days",
        type: "sticker",
        embassyFee: 6500,
        serviceFee: 1999,
        processingDays: "15–20",
        validity: "90 days within 180 days",
        maxStay: "90 days",
        entries: "multiple",
        documents: [
          { id: "fr-passport", name: "Passport (Original + Copy)", category: "identity", required: true, icon: "📘", specs: ["Valid at least 3 months beyond return date", "At least 2 blank pages", "Photocopy of all stamped pages"], acceptedFormats: ["PDF", "JPG"] },
          { id: "fr-photo", name: "Photograph (2 copies)", category: "photo", required: true, icon: "📷", specs: ["35mm × 45mm", "White background", "Biometric ICAO standard", "Taken within last 3 months"], acceptedFormats: ["JPG"] },
          { id: "fr-form", name: "Schengen Visa Application Form", category: "forms", required: true, icon: "📋", specs: ["Completed online at france-visas.gouv.fr", "Print and sign"], acceptedFormats: ["PDF"] },
          { id: "fr-insurance", name: "Travel Insurance", category: "insurance", required: true, icon: "🛡️", specs: ["Minimum €30,000 medical coverage", "Valid for all Schengen countries", "Must include medical repatriation"], notes: "MANDATORY — application rejected without this.", acceptedFormats: ["PDF"] },
          { id: "fr-bank", name: "Bank Statement (3 Months)", category: "financial", required: true, icon: "🏦", specs: ["Last 3 months statement", "Minimum €50 per day of stay", "Bank stamp and signature"], acceptedFormats: ["PDF"] },
          { id: "fr-employment", name: "Employment & Leave Documents", category: "employment", required: true, icon: "💼", specs: ["Employment letter with salary, designation, leave dates", "Last 3 months pay slips"], acceptedFormats: ["PDF"] },
          { id: "fr-hotel", name: "Hotel Bookings for Entire Stay", category: "accommodation", required: true, icon: "🏨", specs: ["Confirmed bookings for every night", "Refundable bookings acceptable"], acceptedFormats: ["PDF"] },
          { id: "fr-flight", name: "Return Flight Tickets", category: "travel", required: true, icon: "✈️", specs: ["Confirmed onward and return flights"], acceptedFormats: ["PDF"] },
        ],
      },
    ],
  },
];

export function getCountryBySlug(slug: string): Country | undefined {
  return COUNTRIES.find(c => c.slug === slug);
}

export function getTotalFee(visaType: VisaType): number {
  return visaType.embassyFee + visaType.serviceFee + Math.round((visaType.embassyFee + visaType.serviceFee) * 0.18);
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export const CATEGORY_LABELS: Record<DocCategory, string> = {
  identity: "Identity Documents",
  financial: "Financial Documents",
  travel: "Travel Documents",
  accommodation: "Accommodation",
  employment: "Employment Proof",
  insurance: "Travel Insurance",
  photo: "Photographs",
  forms: "Application Forms",
};

export const CATEGORY_ICONS: Record<DocCategory, string> = {
  identity: "🪪",
  financial: "💰",
  travel: "✈️",
  accommodation: "🏨",
  employment: "💼",
  insurance: "🛡️",
  photo: "📷",
  forms: "📋",
};