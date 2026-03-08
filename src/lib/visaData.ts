export type DocCategory = 'identity' | 'financial' | 'travel' | 'accommodation' | 'employment' | 'insurance' | 'photo' | 'forms';

export interface DocRequirement {
  id: string; name: string; category: DocCategory; required: boolean;
  icon: string; specs: string[]; notes?: string; acceptedFormats: string[];
}
export interface VisaType {
  id: string; label: string; type: 'evisa' | 'sticker' | 'voa' | 'free' | 'eta';
  embassyFee: number; serviceFee: number; processingDays: string;
  validity: string; maxStay: string; entries: 'single' | 'double' | 'multiple';
  documents: DocRequirement[];
}
export interface Country {
  name: string; slug: string; flag: string; isoCode: string; tagline: string;
  embassyInIndia: string; officialUrl: string; generalNotes: string[]; visaTypes: VisaType[];
}

export const COUNTRIES: Country[] = [
  {
    name:"United Arab Emirates",slug:"uae",flag:"🇦🇪",isoCode:"AE",tagline:"Dubai, Abu Dhabi & beyond",
    embassyInIndia:"UAE Embassy, New Delhi",officialUrl:"https://icp.gov.ae",
    generalNotes:["Indian passport holders require a visa to enter UAE","eVisa is processed online — no embassy visit required","Passport must be valid for at least 6 months from travel date"],
    visaTypes:[
      {id:"uae-30",label:"30 Days — Single Entry",type:"evisa",embassyFee:1500,serviceFee:999,processingDays:"3–5",validity:"60 days from issue",maxStay:"30 days",entries:"single",documents:[
        {id:"uae-passport",name:"Passport (Original Scan)",category:"identity",required:true,icon:"📘",specs:["Valid for minimum 6 months from travel date","At least 2 blank pages","Scan all pages including bio-data page","File size: max 2MB per page"],notes:"Expired or damaged passports will be rejected immediately.",acceptedFormats:["PDF","JPG"]},
        {id:"uae-photo",name:"Passport-size Photograph",category:"photo",required:true,icon:"📷",specs:["White background only","35mm × 45mm size","Face covering 70–80% of frame","Taken within last 3 months","No glasses or head covering"],acceptedFormats:["JPG","PNG"]},
        {id:"uae-bank",name:"Bank Statement (3 Months)",category:"financial",required:true,icon:"🏦",specs:["Last 3 months from your bank","Must show minimum balance of ₹50,000","Bank stamp and signature required","Printed on bank letterhead"],notes:"Net banking statements without bank seal are NOT accepted.",acceptedFormats:["PDF"]},
        {id:"uae-salary",name:"Salary Slip / Income Proof",category:"employment",required:true,icon:"💼",specs:["Last 3 months salary slips","Company stamp and HR signature required","Self-employed: CA-certified ITR for last 2 years"],acceptedFormats:["PDF","JPG"]},
        {id:"uae-hotel",name:"Hotel Booking Confirmation",category:"accommodation",required:true,icon:"🏨",specs:["Confirmed booking for entire duration of stay","Must show your full name matching passport","Hotel name, address, and dates must be visible"],notes:"Tentative or unconfirmed bookings are not accepted.",acceptedFormats:["PDF"]},
        {id:"uae-flight",name:"Return Flight Tickets",category:"travel",required:true,icon:"✈️",specs:["Both onward and return flight tickets","Must be confirmed — not just a hold","Passenger name must match passport exactly"],acceptedFormats:["PDF"]},
      ]},
      {id:"uae-60",label:"60 Days — Single Entry",type:"evisa",embassyFee:2500,serviceFee:999,processingDays:"3–5",validity:"90 days from issue",maxStay:"60 days",entries:"single",documents:[
        {id:"uae-p60",name:"Passport (Original Scan)",category:"identity",required:true,icon:"📘",specs:["Valid for minimum 6 months from travel date","At least 2 blank pages"],acceptedFormats:["PDF","JPG"]},
        {id:"uae-ph60",name:"Passport-size Photograph",category:"photo",required:true,icon:"📷",specs:["White background","35mm × 45mm","Last 3 months"],acceptedFormats:["JPG","PNG"]},
        {id:"uae-b60",name:"Bank Statement (6 Months)",category:"financial",required:true,icon:"🏦",specs:["Last 6 months statement","Minimum balance ₹75,000","Bank stamp required"],acceptedFormats:["PDF"]},
        {id:"uae-h60",name:"Hotel Booking Confirmation",category:"accommodation",required:true,icon:"🏨",specs:["Confirmed booking for full stay duration"],acceptedFormats:["PDF"]},
        {id:"uae-f60",name:"Return Flight Tickets",category:"travel",required:true,icon:"✈️",specs:["Confirmed onward and return tickets"],acceptedFormats:["PDF"]},
        {id:"uae-s60",name:"Salary Slip / Income Proof",category:"employment",required:true,icon:"💼",specs:["Last 3 months salary slips with company stamp"],acceptedFormats:["PDF","JPG"]},
      ]},
    ],
  },
  {
    name:"Thailand",slug:"thailand",flag:"🇹🇭",isoCode:"TH",tagline:"Bangkok, Phuket, Chiang Mai",
    embassyInIndia:"Royal Thai Embassy, New Delhi",officialUrl:"https://www.thaievisa.go.th",
    generalNotes:["Thailand offers eVisa — completely online process","Passport must be valid 6 months beyond your travel date"],
    visaTypes:[
      {id:"th-tourist",label:"Tourist Visa — 60 Days",type:"evisa",embassyFee:1200,serviceFee:699,processingDays:"5–7",validity:"3 months from issue",maxStay:"60 days",entries:"single",documents:[
        {id:"th-p",name:"Passport (Scanned Copy)",category:"identity",required:true,icon:"📘",specs:["Minimum 6 months validity from travel date","At least 1 blank visa page","Clear scan of bio-data page"],acceptedFormats:["PDF","JPG"]},
        {id:"th-ph",name:"Recent Photograph",category:"photo",required:true,icon:"📷",specs:["White or light blue background","4cm × 6cm","Taken within last 6 months","No spectacles"],acceptedFormats:["JPG"]},
        {id:"th-b",name:"Bank Statement",category:"financial",required:true,icon:"🏦",specs:["Last 3 months","Minimum balance ₹20,000","Bank seal and signature mandatory"],acceptedFormats:["PDF"]},
        {id:"th-h",name:"Accommodation Proof",category:"accommodation",required:true,icon:"🏨",specs:["Hotel booking confirmation OR host invitation letter","Dates must match travel dates"],acceptedFormats:["PDF"]},
        {id:"th-f",name:"Flight Itinerary",category:"travel",required:true,icon:"✈️",specs:["Confirmed round-trip tickets"],acceptedFormats:["PDF"]},
        {id:"th-ins",name:"Travel Insurance",category:"insurance",required:false,icon:"🛡️",specs:["Minimum coverage: USD 10,000 medical","Covers entire trip duration"],acceptedFormats:["PDF"]},
      ]},
    ],
  },
  {
    name:"Singapore",slug:"singapore",flag:"🇸🇬",isoCode:"SG",tagline:"The Lion City",
    embassyInIndia:"Singapore High Commission, New Delhi",officialUrl:"https://www.ica.gov.sg",
    generalNotes:["Singapore visa must be applied through an accredited agent","Biometric data may be required for first-time applicants"],
    visaTypes:[
      {id:"sg-tourist",label:"Tourist Visa — 30 Days",type:"sticker",embassyFee:2200,serviceFee:1099,processingDays:"3–5",validity:"30 days from issue",maxStay:"30 days",entries:"single",documents:[
        {id:"sg-p",name:"Original Passport",category:"identity",required:true,icon:"📘",specs:["Valid for at least 6 months beyond travel dates","At least 2 blank pages for visa stamp"],notes:"Singapore requires physical passport for sticker visa.",acceptedFormats:["PDF","JPG"]},
        {id:"sg-ph",name:"Photograph (2 copies)",category:"photo",required:true,icon:"📷",specs:["White background","35mm × 45mm","Matte finish — no glossy prints","Taken within last 3 months"],acceptedFormats:["JPG"]},
        {id:"sg-form",name:"Visa Application Form 14A",category:"forms",required:true,icon:"📋",specs:["Signed by applicant","Download from ICA website"],acceptedFormats:["PDF"]},
        {id:"sg-b",name:"Bank Statement (3 Months)",category:"financial",required:true,icon:"🏦",specs:["Last 3 months","Minimum average balance ₹1,00,000","Certified and stamped by bank"],acceptedFormats:["PDF"]},
        {id:"sg-emp",name:"Employment Proof",category:"employment",required:true,icon:"💼",specs:["Employment letter on company letterhead","Mentioning position, salary, leave sanctioned"],acceptedFormats:["PDF"]},
        {id:"sg-h",name:"Hotel Booking / Host Invitation",category:"accommodation",required:true,icon:"🏨",specs:["Confirmed hotel booking for entire stay"],acceptedFormats:["PDF"]},
        {id:"sg-f",name:"Confirmed Air Tickets",category:"travel",required:true,icon:"✈️",specs:["Both onward and return confirmed tickets"],acceptedFormats:["PDF"]},
      ]},
    ],
  },
  {
    name:"France (Schengen)",slug:"france",flag:"🇫🇷",isoCode:"FR",tagline:"Paris & 26 Schengen countries",
    embassyInIndia:"French Embassy / VFS Global",officialUrl:"https://france-visas.gouv.fr",
    generalNotes:["Schengen visa covers 27 European countries with one visa","Apply at French embassy if France is your main destination","Apply 15 weeks in advance — not more than 6 months before travel"],
    visaTypes:[
      {id:"fr-tourist",label:"Schengen Tourist Visa — 90 Days",type:"sticker",embassyFee:6500,serviceFee:1999,processingDays:"15–20",validity:"90 days within 180 days",maxStay:"90 days",entries:"multiple",documents:[
        {id:"fr-p",name:"Passport (Original + Copy)",category:"identity",required:true,icon:"📘",specs:["Valid at least 3 months beyond return date","At least 2 blank pages","Photocopy of all stamped pages"],acceptedFormats:["PDF","JPG"]},
        {id:"fr-ph",name:"Photograph (2 copies)",category:"photo",required:true,icon:"📷",specs:["35mm × 45mm","White background","Biometric ICAO standard","Taken within last 3 months"],acceptedFormats:["JPG"]},
        {id:"fr-form",name:"Schengen Visa Application Form",category:"forms",required:true,icon:"📋",specs:["Completed online at france-visas.gouv.fr","Print and sign"],acceptedFormats:["PDF"]},
        {id:"fr-ins",name:"Travel Insurance",category:"insurance",required:true,icon:"🛡️",specs:["Minimum €30,000 medical coverage","Valid for all Schengen countries","Must include medical repatriation"],notes:"MANDATORY — application rejected without this.",acceptedFormats:["PDF"]},
        {id:"fr-b",name:"Bank Statement (3 Months)",category:"financial",required:true,icon:"🏦",specs:["Last 3 months statement","Minimum €50 per day of stay","Bank stamp and signature"],acceptedFormats:["PDF"]},
        {id:"fr-emp",name:"Employment & Leave Documents",category:"employment",required:true,icon:"💼",specs:["Employment letter with salary, designation, leave dates","Last 3 months pay slips"],acceptedFormats:["PDF"]},
        {id:"fr-h",name:"Hotel Bookings for Entire Stay",category:"accommodation",required:true,icon:"🏨",specs:["Confirmed bookings for every night","Refundable bookings acceptable"],acceptedFormats:["PDF"]},
        {id:"fr-f",name:"Return Flight Tickets",category:"travel",required:true,icon:"✈️",specs:["Confirmed onward and return flights"],acceptedFormats:["PDF"]},
      ]},
    ],
  },
  {
    name:"Japan",slug:"japan",flag:"🇯🇵",isoCode:"JP",tagline:"Tokyo, Kyoto & Osaka",
    embassyInIndia:"Embassy of Japan / VFS Global, New Delhi",officialUrl:"https://www.mofa.go.jp/j_info/visit/visa/",
    generalNotes:["Japan visa must be applied in person at VFS Global","Passport must be valid for the entire duration of stay","Apply at least 2–3 weeks before travel","Japan Embassy has strict financial requirements"],
    visaTypes:[
      {id:"jp-tourist",label:"Tourist Visa — 15 Days Single Entry",type:"sticker",embassyFee:3500,serviceFee:799,processingDays:"5–7",validity:"3 months from issue",maxStay:"15 days",entries:"single",documents:[
        {id:"jp-p",name:"Original Passport",category:"identity",required:true,icon:"📘",specs:["Valid throughout entire stay in Japan","At least 2 blank pages for visa stamp","Photocopy of bio-data page required"],notes:"Japan requires passport to be submitted physically to VFS.",acceptedFormats:["PDF","JPG"]},
        {id:"jp-ph",name:"Photograph (1 copy)",category:"photo",required:true,icon:"📷",specs:["45mm × 45mm size (square format)","White background, no borders","Taken within last 6 months","No glasses, no head covering"],acceptedFormats:["JPG"]},
        {id:"jp-form",name:"Visa Application Form",category:"forms",required:true,icon:"📋",specs:["Download from Japan Embassy website","Fill in English or Japanese only","Sign and date at bottom"],acceptedFormats:["PDF"]},
        {id:"jp-itin",name:"Day-wise Travel Itinerary",category:"travel",required:true,icon:"🗺️",specs:["Detailed plan for each day of your trip","Include city names, hotels, attractions","Japan Embassy verifies itinerary carefully"],notes:"Vague itineraries lead to rejection — be specific.",acceptedFormats:["PDF"]},
        {id:"jp-h",name:"Hotel Reservations (All Nights)",category:"accommodation",required:true,icon:"🏨",specs:["Confirmed booking for every single night","Must show your full name and passport number","Booking.com / Agoda printouts accepted"],acceptedFormats:["PDF"]},
        {id:"jp-f",name:"Return Air Tickets",category:"travel",required:true,icon:"✈️",specs:["Confirmed onward and return flights","Must be in applicant's name exactly as passport"],acceptedFormats:["PDF"]},
        {id:"jp-b",name:"Bank Statement (Last 3 Months)",category:"financial",required:true,icon:"🏦",specs:["Last 3 months statement from your bank","Minimum balance ₹1,00,000 recommended","Bank seal and authorised signature mandatory","Net banking printouts NOT accepted"],notes:"Insufficient funds is the #1 reason for Japan visa rejection.",acceptedFormats:["PDF"]},
        {id:"jp-emp",name:"Employment Proof",category:"employment",required:true,icon:"💼",specs:["Employment letter on company letterhead","Mentioning designation, salary, leave approval","Self-employed: ITR last 2 years + business registration"],acceptedFormats:["PDF"]},
      ]},
    ],
  },
  {
    name:"Malaysia",slug:"malaysia",flag:"🇲🇾",isoCode:"MY",tagline:"KL, Langkawi & Penang",
    embassyInIndia:"Malaysian High Commission, New Delhi",officialUrl:"https://www.imi.gov.my",
    generalNotes:["Indian passport holders get visa-free entry to Malaysia for up to 30 days","No advance visa application required — enter freely at airport immigration","Passport must be valid for at least 6 months from date of entry","Must have proof of sufficient funds and return ticket at immigration"],
    visaTypes:[
      {id:"my-free",label:"Visa-Free Entry — 30 Days",type:"free",embassyFee:0,serviceFee:299,processingDays:"Instant",validity:"On arrival",maxStay:"30 days",entries:"multiple",documents:[
        {id:"my-p",name:"Valid Passport",category:"identity",required:true,icon:"📘",specs:["Valid for at least 6 months from entry date","At least 1 blank page for entry stamp"],notes:"Keep your passport handy at immigration.",acceptedFormats:["PDF","JPG"]},
        {id:"my-f",name:"Return / Onward Air Ticket",category:"travel",required:true,icon:"✈️",specs:["Confirmed return or onward ticket","Immigration may ask for proof of departure"],acceptedFormats:["PDF"]},
        {id:"my-h",name:"Hotel Booking / Accommodation Proof",category:"accommodation",required:false,icon:"🏨",specs:["Hotel booking for at least first night","Immigration may verify accommodation"],acceptedFormats:["PDF"]},
        {id:"my-funds",name:"Proof of Sufficient Funds",category:"financial",required:false,icon:"💵",specs:["Bank statement or credit card","Recommended: RM 500 per day (~₹9,000/day)"],notes:"Immigration may deny entry without fund proof.",acceptedFormats:["PDF"]},
      ]},
    ],
  },
  {
    name:"United States of America",slug:"usa",flag:"🇺🇸",isoCode:"US",tagline:"New York, Los Angeles & beyond",
    embassyInIndia:"US Embassy / Consulate (New Delhi, Mumbai, Chennai, Hyderabad, Kolkata)",officialUrl:"https://travel.state.gov",
    generalNotes:["US B1/B2 visa requires a mandatory in-person interview at the US Consulate","Apply well in advance — interview slots can be 2–6 months away","DS-160 form must be completed online before booking the interview","Visa approval is at the discretion of the consular officer","MRV fee must be paid before booking the interview appointment"],
    visaTypes:[
      {id:"us-b2",label:"B1/B2 Tourist & Business Visa",type:"sticker",embassyFee:11500,serviceFee:1499,processingDays:"30–60",validity:"10 years from issue",maxStay:"180 days per visit",entries:"multiple",documents:[
        {id:"us-p",name:"Original Passport",category:"identity",required:true,icon:"📘",specs:["Valid for at least 6 months beyond intended stay","All old/expired passports must also be submitted","At least 2 blank pages"],notes:"All previous passports with US visas must be brought to interview.",acceptedFormats:["PDF","JPG"]},
        {id:"us-ph",name:"Photograph (as per US specs)",category:"photo",required:true,icon:"📷",specs:["51mm × 51mm (2 inch × 2 inch)","White background","Taken within last 6 months","No glasses as per 2023 rules"],acceptedFormats:["JPG"]},
        {id:"us-ds160",name:"DS-160 Confirmation Page",category:"forms",required:true,icon:"📋",specs:["Complete DS-160 at ceac.state.gov","Print the confirmation page with barcode","Bring physical copy to interview"],notes:"Without DS-160, you cannot book interview or enter the consulate.",acceptedFormats:["PDF"]},
        {id:"us-appt",name:"Interview Appointment Letter",category:"forms",required:true,icon:"📅",specs:["Print from ustraveldocs.com after payment","Bring original printout to interview"],acceptedFormats:["PDF"]},
        {id:"us-b",name:"Bank Statements (6 Months)",category:"financial",required:true,icon:"🏦",specs:["Last 6 months bank statement","Fixed deposits, mutual funds, property documents welcome","Show strong financial ties to India"],notes:"US officers look for proof you will return to India.",acceptedFormats:["PDF"]},
        {id:"us-emp",name:"Employment / Business Proof",category:"employment",required:true,icon:"💼",specs:["Employment letter: position, salary, leave approved, will return","Business owners: incorporation certificate, ITR, GST returns"],acceptedFormats:["PDF"]},
        {id:"us-itr",name:"Income Tax Returns (3 Years)",category:"financial",required:true,icon:"📊",specs:["Last 3 years ITR acknowledgement","Shows stable income and Indian tax residency"],acceptedFormats:["PDF"]},
        {id:"us-ties",name:"Proof of Ties to India",category:"employment",required:true,icon:"🏠",specs:["Property documents / house ownership","Family dependents (spouse, children)","Business ownership documents"],notes:"Demonstrating strong ties to India is essential to get US visa approved.",acceptedFormats:["PDF"]},
        {id:"us-ins",name:"Travel Insurance",category:"insurance",required:false,icon:"🛡️",specs:["Recommended but not mandatory","Minimum $50,000 medical coverage recommended"],acceptedFormats:["PDF"]},
      ]},
    ],
  },
  {
    name:"Australia",slug:"australia",flag:"🇦🇺",isoCode:"AU",tagline:"Sydney, Melbourne & the Outback",
    embassyInIndia:"Australian High Commission, New Delhi",officialUrl:"https://immi.homeaffairs.gov.au",
    generalNotes:["Australia offers an online eVisa — no embassy visit needed","Apply at least 4–6 weeks before travel","Passport must be valid for the entire duration of stay"],
    visaTypes:[
      {id:"au-tourist",label:"Tourist Visa (subclass 600) — 3 Months",type:"evisa",embassyFee:5500,serviceFee:1499,processingDays:"7–15",validity:"12 months from grant",maxStay:"3 months per visit",entries:"multiple",documents:[
        {id:"au-p",name:"Passport (Scanned Bio Page)",category:"identity",required:true,icon:"📘",specs:["Valid for entire duration of stay","Colour, high-resolution scan of bio-data page"],acceptedFormats:["PDF","JPG"]},
        {id:"au-ph",name:"Passport-size Photograph",category:"photo",required:true,icon:"📷",specs:["White background","35mm × 45mm","Taken within last 6 months"],acceptedFormats:["JPG"]},
        {id:"au-b",name:"Bank Statement (3 Months)",category:"financial",required:true,icon:"🏦",specs:["Last 3 months certified bank statement","Minimum balance ₹2,00,000 recommended","Bank certified and stamped"],acceptedFormats:["PDF"]},
        {id:"au-emp",name:"Employment Letter",category:"employment",required:true,icon:"💼",specs:["Employer letterhead","States salary, position, leave approval, return to work date"],acceptedFormats:["PDF"]},
        {id:"au-itr",name:"Income Tax Returns (2 Years)",category:"financial",required:true,icon:"📊",specs:["Last 2 years ITR acknowledgement","Proves stable income"],acceptedFormats:["PDF"]},
        {id:"au-h",name:"Accommodation Proof",category:"accommodation",required:true,icon:"🏨",specs:["Hotel bookings or letter from host in Australia","For entire duration of stay"],acceptedFormats:["PDF"]},
        {id:"au-f",name:"Return Flight Tickets",category:"travel",required:true,icon:"✈️",specs:["Confirmed onward and return flights"],acceptedFormats:["PDF"]},
        {id:"au-ins",name:"Travel Insurance",category:"insurance",required:true,icon:"🛡️",specs:["Minimum AUD 50,000 medical coverage","Covers entire duration of stay"],notes:"Strongly recommended — medical care in Australia is very expensive.",acceptedFormats:["PDF"]},
      ]},
    ],
  },
  {
    name:"Canada",slug:"canada",flag:"🇨🇦",isoCode:"CA",tagline:"Toronto, Vancouver & Niagara Falls",
    embassyInIndia:"Canadian High Commission / VFS Global",officialUrl:"https://www.canada.ca/en/immigration-refugees-citizenship.html",
    generalNotes:["Canada Visitor Visa (TRV) is required for Indian passport holders","Applications are now primarily online via IRCC portal","Biometrics required — visit a VAC after online application","Apply 8–12 weeks in advance"],
    visaTypes:[
      {id:"ca-visitor",label:"Visitor Visa (TRV) — 6 Months",type:"sticker",embassyFee:7500,serviceFee:1499,processingDays:"30–60",validity:"Up to 10 years or passport expiry",maxStay:"6 months per visit",entries:"multiple",documents:[
        {id:"ca-p",name:"Original Passport + All Old Passports",category:"identity",required:true,icon:"📘",specs:["Valid for at least 6 months beyond stay","All previous passports must be submitted","Photocopy of all pages with stamps"],notes:"All expired passports with visas to other countries strengthen your application.",acceptedFormats:["PDF","JPG"]},
        {id:"ca-ph",name:"Photograph (as per IRCC specs)",category:"photo",required:true,icon:"📷",specs:["35mm × 45mm","White background","Taken within last 6 months","Plain expression, eyes open"],acceptedFormats:["JPG"]},
        {id:"ca-form",name:"IMM 5257 Application Form",category:"forms",required:true,icon:"📋",specs:["Complete online at ircc.canada.ca","Download and sign the validation barcode page"],acceptedFormats:["PDF"]},
        {id:"ca-b",name:"Bank Statement (6 Months)",category:"financial",required:true,icon:"🏦",specs:["Last 6 months certified bank statement","Minimum ₹3,00,000 recommended","Fixed deposits and investments welcome"],notes:"Canada immigration places heavy emphasis on financial stability.",acceptedFormats:["PDF"]},
        {id:"ca-itr",name:"Income Tax Returns (3 Years)",category:"financial",required:true,icon:"📊",specs:["Last 3 years ITR acknowledgement","CA-certified copy recommended"],acceptedFormats:["PDF"]},
        {id:"ca-emp",name:"Employment Letter",category:"employment",required:true,icon:"💼",specs:["Company letterhead","States designation, salary, leave approval","Confirms applicant will return after trip"],acceptedFormats:["PDF"]},
        {id:"ca-ties",name:"Proof of Ties to India",category:"employment",required:true,icon:"🏠",specs:["Property ownership documents","Family dependents (spouse/children staying in India)","Business certificates, if applicable"],notes:"Proving you will return to India is crucial for Canada visa approval.",acceptedFormats:["PDF"]},
        {id:"ca-h",name:"Accommodation Proof",category:"accommodation",required:true,icon:"🏨",specs:["Hotel bookings or host invitation letter from Canada","Full address, contact details of host"],acceptedFormats:["PDF"]},
        {id:"ca-ins",name:"Travel Insurance",category:"insurance",required:false,icon:"🛡️",specs:["Minimum CAD 100,000 medical coverage","Covers entire trip"],acceptedFormats:["PDF"]},
      ]},
    ],
  },
  {
    name:"Indonesia (Bali)",slug:"indonesia",flag:"🇮🇩",isoCode:"ID",tagline:"Bali, Jakarta & Lombok",
    embassyInIndia:"Embassy of Indonesia, New Delhi",officialUrl:"https://molina.imigrasi.go.id",
    generalNotes:["Indian passport holders can get Visa on Arrival (VOA) at Bali/Jakarta airports","VOA is available at 22 international airports and seaports","Payment at arrival counter is in USD, EUR, or IDR — carry cash","Online e-VOA can be applied before travel at molina.imigrasi.go.id"],
    visaTypes:[
      {id:"id-voa",label:"Visa on Arrival — 30 Days",type:"voa",embassyFee:1500,serviceFee:299,processingDays:"Instant",validity:"30 days from arrival, extendable once",maxStay:"30 days",entries:"single",documents:[
        {id:"id-p",name:"Valid Passport",category:"identity",required:true,icon:"📘",specs:["Valid for at least 6 months from date of entry","At least 1 blank page for entry stamp"],acceptedFormats:["PDF","JPG"]},
        {id:"id-f",name:"Return / Onward Ticket",category:"travel",required:true,icon:"✈️",specs:["Confirmed return ticket OR onward ticket to next destination","Immigration may ask for proof of departure"],acceptedFormats:["PDF"]},
        {id:"id-h",name:"Hotel Booking",category:"accommodation",required:false,icon:"🏨",specs:["At least first night accommodation confirmation","Immigration may ask for accommodation proof"],acceptedFormats:["PDF"]},
        {id:"id-funds",name:"Proof of Sufficient Funds",category:"financial",required:false,icon:"💵",specs:["Credit card or bank statement","USD 1,000 equivalent recommended"],notes:"Carry USD 500 in cash for VOA fee payment at the counter.",acceptedFormats:["PDF"]},
      ]},
    ],
  },
  {
    name:"Vietnam",slug:"vietnam",flag:"🇻🇳",isoCode:"VN",tagline:"Hanoi, Ho Chi Minh & Ha Long Bay",
    embassyInIndia:"Embassy of Vietnam, New Delhi",officialUrl:"https://evisa.xuatnhapcanh.gov.vn",
    generalNotes:["Vietnam offers eVisa — fully online, no embassy visit","eVisa is valid for 90 days, allows multiple entries","Apply at least 3 business days before travel","Indian passport holders are eligible for Vietnam eVisa"],
    visaTypes:[
      {id:"vn-evisa",label:"eVisa — 90 Days Multiple Entry",type:"evisa",embassyFee:1400,serviceFee:499,processingDays:"3–5",validity:"90 days from entry",maxStay:"90 days",entries:"multiple",documents:[
        {id:"vn-p",name:"Passport (Bio-data Page Scan)",category:"identity",required:true,icon:"📘",specs:["Valid for at least 6 months beyond travel dates","High-resolution colour scan of bio-data page only"],acceptedFormats:["JPG","PNG"]},
        {id:"vn-ph",name:"Passport-size Photo (Digital)",category:"photo",required:true,icon:"📷",specs:["White background","Face clearly visible","Recent — within last 6 months","JPEG format, minimum 300 DPI"],acceptedFormats:["JPG"]},
        {id:"vn-f",name:"Return Flight Tickets",category:"travel",required:false,icon:"✈️",specs:["Not mandatory for eVisa application","May be asked at immigration"],acceptedFormats:["PDF"]},
        {id:"vn-h",name:"Accommodation Confirmation",category:"accommodation",required:false,icon:"🏨",specs:["Hotel booking for first few nights","Useful to show at immigration"],acceptedFormats:["PDF"]},
      ]},
    ],
  },
  {
    name:"South Africa",slug:"south-africa",flag:"🇿🇦",isoCode:"ZA",tagline:"Cape Town, Safari & Garden Route",
    embassyInIndia:"South African High Commission / VFS Global, New Delhi",officialUrl:"https://www.vfsglobal.com/southafrica/india/",
    generalNotes:["Indian passport holders require a visa for South Africa","Apply through VFS Global in New Delhi, Mumbai, or Chennai","Yellow Fever vaccination certificate required if travelling from endemic countries","Apply at least 3–4 weeks before travel"],
    visaTypes:[
      {id:"za-tourist",label:"Tourist Visa — 30 Days",type:"sticker",embassyFee:3500,serviceFee:1299,processingDays:"7–10",validity:"30 days from entry",maxStay:"30 days",entries:"single",documents:[
        {id:"za-p",name:"Original Passport + Photocopy",category:"identity",required:true,icon:"📘",specs:["Valid for at least 30 days beyond intended stay","At least 2 blank pages","Copy of all pages with stamps"],acceptedFormats:["PDF","JPG"]},
        {id:"za-ph",name:"Photographs (2 copies)",category:"photo",required:true,icon:"📷",specs:["35mm × 45mm","White background","Taken within last 3 months"],acceptedFormats:["JPG"]},
        {id:"za-form",name:"Visa Application Form BI-84",category:"forms",required:true,icon:"📋",specs:["Download from SA High Commission website","Complete in black ink, sign and date"],acceptedFormats:["PDF"]},
        {id:"za-b",name:"Bank Statement (3 Months)",category:"financial",required:true,icon:"🏦",specs:["Last 3 months certified bank statement","Minimum balance ₹1,00,000 recommended"],acceptedFormats:["PDF"]},
        {id:"za-emp",name:"Employment Letter",category:"employment",required:true,icon:"💼",specs:["Company letterhead","States designation, salary, leave approved"],acceptedFormats:["PDF"]},
        {id:"za-h",name:"Accommodation Proof",category:"accommodation",required:true,icon:"🏨",specs:["Hotel booking for entire stay OR invitation letter from South African host"],acceptedFormats:["PDF"]},
        {id:"za-f",name:"Return Flight Tickets",category:"travel",required:true,icon:"✈️",specs:["Confirmed return tickets"],acceptedFormats:["PDF"]},
        {id:"za-ins",name:"Travel Insurance",category:"insurance",required:true,icon:"🛡️",specs:["Minimum USD 30,000 medical coverage","Valid for South Africa"],acceptedFormats:["PDF"]},
        {id:"za-yf",name:"Yellow Fever Certificate (if applicable)",category:"identity",required:false,icon:"💉",specs:["Required if travelling from or via yellow fever endemic countries","International Certificate of Vaccination"],notes:"Not required if flying directly from India.",acceptedFormats:["PDF","JPG"]},
      ]},
    ],
  },
  {
    name:"New Zealand",slug:"new-zealand",flag:"🇳🇿",isoCode:"NZ",tagline:"Auckland, Queenstown & Fiordland",
    embassyInIndia:"New Zealand High Commission, New Delhi",officialUrl:"https://www.immigration.govt.nz",
    generalNotes:["Indian passport holders require a Visitor Visa for New Zealand","Applications are fully online via Immigration New Zealand","Processing takes 20–25 working days — apply well in advance","Biometrics (at VFS) may be required depending on profile"],
    visaTypes:[
      {id:"nz-visitor",label:"Visitor Visa — 9 Months",type:"evisa",embassyFee:6500,serviceFee:1499,processingDays:"15–25",validity:"9 months from grant",maxStay:"90 days per visit",entries:"multiple",documents:[
        {id:"nz-p",name:"Passport (Scanned Bio Page)",category:"identity",required:true,icon:"📘",specs:["Valid for at least 3 months beyond intended departure","All previous passports to be uploaded"],acceptedFormats:["PDF","JPG"]},
        {id:"nz-ph",name:"Passport-size Photograph (Digital)",category:"photo",required:true,icon:"📷",specs:["35mm × 45mm","White background","Taken within last 6 months"],acceptedFormats:["JPG"]},
        {id:"nz-b",name:"Bank Statements (3 Months)",category:"financial",required:true,icon:"🏦",specs:["Last 3 months certified statement","Minimum NZD 1,000 per month of stay recommended"],acceptedFormats:["PDF"]},
        {id:"nz-emp",name:"Employment Letter",category:"employment",required:true,icon:"💼",specs:["Employer letterhead","Salary, position, leave approved, confirmed return to work"],acceptedFormats:["PDF"]},
        {id:"nz-h",name:"Accommodation Proof",category:"accommodation",required:true,icon:"🏨",specs:["Hotel bookings OR host invitation letter in NZ"],acceptedFormats:["PDF"]},
        {id:"nz-ins",name:"Travel Insurance",category:"insurance",required:true,icon:"🛡️",specs:["Minimum NZD 100,000 medical coverage","Covers entire trip"],acceptedFormats:["PDF"]},
        {id:"nz-itr",name:"Income Tax Returns (2 Years)",category:"financial",required:true,icon:"📊",specs:["Last 2 years ITR acknowledgement","Shows stable employment and financial history"],acceptedFormats:["PDF"]},
      ]},
    ],
  },
  {
    name:"South Korea",slug:"south-korea",flag:"🇰🇷",isoCode:"KR",tagline:"Seoul, Busan & Jeju Island",
    embassyInIndia:"Embassy of the Republic of Korea, New Delhi",officialUrl:"https://www.visa.go.kr",
    generalNotes:["Indian passport holders require a visa for South Korea","Apply at the Korean Embassy in New Delhi or consulates in Mumbai/Chennai","Apply at least 2–3 weeks before travel"],
    visaTypes:[
      {id:"kr-tourist",label:"Tourist Visa (C-3) — 30 Days",type:"sticker",embassyFee:4000,serviceFee:999,processingDays:"5–7",validity:"3 months from issue",maxStay:"30 days",entries:"single",documents:[
        {id:"kr-p",name:"Original Passport + All Old Passports",category:"identity",required:true,icon:"📘",specs:["Valid for at least 6 months from travel date","At least 1 blank page","All previous passports as evidence of travel history"],acceptedFormats:["PDF","JPG"]},
        {id:"kr-ph",name:"Photograph (1 copy)",category:"photo",required:true,icon:"📷",specs:["35mm × 45mm","White background","Taken within last 6 months","No glasses"],acceptedFormats:["JPG"]},
        {id:"kr-form",name:"Visa Application Form",category:"forms",required:true,icon:"📋",specs:["Download from Korean Embassy website","Fill in English, sign and date","Paste photograph on form"],acceptedFormats:["PDF"]},
        {id:"kr-b",name:"Bank Statement (3 Months)",category:"financial",required:true,icon:"🏦",specs:["Last 3 months certified bank statement","Minimum balance ₹50,000 recommended","Bank stamp and signature mandatory"],acceptedFormats:["PDF"]},
        {id:"kr-emp",name:"Employment Proof",category:"employment",required:true,icon:"💼",specs:["Employment certificate on company letterhead","States position, salary, leave approval"],acceptedFormats:["PDF"]},
        {id:"kr-itr",name:"Income Tax Returns (1 Year)",category:"financial",required:true,icon:"📊",specs:["Last year's ITR acknowledgement"],acceptedFormats:["PDF"]},
        {id:"kr-h",name:"Hotel Reservations",category:"accommodation",required:true,icon:"🏨",specs:["Confirmed hotel bookings for entire stay"],acceptedFormats:["PDF"]},
        {id:"kr-f",name:"Return Air Tickets",category:"travel",required:true,icon:"✈️",specs:["Confirmed onward and return tickets"],acceptedFormats:["PDF"]},
      ]},
    ],
  },
  // ── MIDDLE EAST ──────────────────────────────────────────────────────────

  {
    name:"Saudi Arabia",slug:"saudi-arabia",flag:"🇸🇦",isoCode:"SA",tagline:"Riyadh, Jeddah & AlUla",
    embassyInIndia:"Royal Embassy of Saudi Arabia, New Delhi",officialUrl:"https://visa.visitsaudi.com",
    generalNotes:["India is among the countries eligible for Saudi eVisa","Tourist eVisa launched in 2019 — fully online","Passport must be valid for at least 6 months","Female travellers no longer require a male guardian (mahram)"],
    visaTypes:[{
      id:"sa-tourist",label:"Tourist eVisa — 90 Days",type:"evisa",embassyFee:3200,serviceFee:999,processingDays:"3–5",validity:"1 year from issue",maxStay:"90 days total",entries:"multiple",
      documents:[
        {id:"sa-p",name:"Passport (Bio-data Page Scan)",category:"identity",required:true,icon:"📘",specs:["Valid for at least 6 months from travel date","High-resolution colour scan"],acceptedFormats:["JPG","PDF"]},
        {id:"sa-ph",name:"Passport-size Photograph",category:"photo",required:true,icon:"📷",specs:["White background","35mm × 45mm","Taken within last 6 months","No head covering (exceptions for religious reasons)"],acceptedFormats:["JPG"]},
        {id:"sa-b",name:"Bank Statement (3 Months)",category:"financial",required:true,icon:"🏦",specs:["Last 3 months certified statement","Minimum balance ₹50,000","Bank stamp and signature"],acceptedFormats:["PDF"]},
        {id:"sa-f",name:"Return Flight Tickets",category:"travel",required:true,icon:"✈️",specs:["Confirmed onward and return flights"],acceptedFormats:["PDF"]},
        {id:"sa-h",name:"Hotel Booking Confirmation",category:"accommodation",required:true,icon:"🏨",specs:["Confirmed booking for entire stay","Name must match passport"],acceptedFormats:["PDF"]},
        {id:"sa-ins",name:"Travel Insurance",category:"insurance",required:true,icon:"🛡️",specs:["Minimum $50,000 medical coverage","Covers entire trip duration"],acceptedFormats:["PDF"]},
      ],
    }],
  },
  {
    name:"Qatar",slug:"qatar",flag:"🇶🇦",isoCode:"QA",tagline:"Doha & the Pearl",
    embassyInIndia:"Embassy of Qatar, New Delhi",officialUrl:"https://www.moi.gov.qa/visaservice",
    generalNotes:["Indian passport holders are eligible for Qatar eVisa","Apply online through Hayya portal or Qatar Tourism","Passport must be valid for 6 months","Transit visa available for Hamad Airport stopover"],
    visaTypes:[{
      id:"qa-tourist",label:"Tourist eVisa — 30 Days",type:"evisa",embassyFee:1800,serviceFee:799,processingDays:"2–4",validity:"6 months from issue",maxStay:"30 days",entries:"single",
      documents:[
        {id:"qa-p",name:"Passport (Scanned Bio Page)",category:"identity",required:true,icon:"📘",specs:["Valid for at least 6 months from travel date","Clear colour scan"],acceptedFormats:["JPG","PDF"]},
        {id:"qa-ph",name:"Passport-size Photograph",category:"photo",required:true,icon:"📷",specs:["White background","35mm × 45mm","Recent — within last 6 months"],acceptedFormats:["JPG"]},
        {id:"qa-b",name:"Bank Statement",category:"financial",required:true,icon:"🏦",specs:["Last 3 months","Minimum balance ₹30,000","Bank certified"],acceptedFormats:["PDF"]},
        {id:"qa-f",name:"Return Flight Tickets",category:"travel",required:true,icon:"✈️",specs:["Confirmed return tickets"],acceptedFormats:["PDF"]},
        {id:"qa-h",name:"Hotel Booking",category:"accommodation",required:true,icon:"🏨",specs:["Confirmed booking for entire duration"],acceptedFormats:["PDF"]},
        {id:"qa-ins",name:"Travel Insurance",category:"insurance",required:false,icon:"🛡️",specs:["Recommended — minimum $30,000 medical coverage"],acceptedFormats:["PDF"]},
      ],
    }],
  },
  {
    name:"Oman",slug:"oman",flag:"🇴🇲",isoCode:"OM",tagline:"Muscat, Nizwa & Wahiba Sands",
    embassyInIndia:"Embassy of Oman, New Delhi",officialUrl:"https://evisa.rop.gov.om",
    generalNotes:["Indian passport holders are eligible for Oman eVisa","Apply online at evisa.rop.gov.om","Passport must be valid for 6 months","One of the safest and most underrated Gulf destinations"],
    visaTypes:[{
      id:"om-tourist",label:"Tourist eVisa — 30 Days",type:"evisa",embassyFee:1600,serviceFee:799,processingDays:"2–4",validity:"6 months from issue",maxStay:"30 days",entries:"single",
      documents:[
        {id:"om-p",name:"Passport (Scanned Bio Page)",category:"identity",required:true,icon:"📘",specs:["Valid for at least 6 months from travel","Colour scan, high resolution"],acceptedFormats:["JPG","PDF"]},
        {id:"om-ph",name:"Passport Photograph",category:"photo",required:true,icon:"📷",specs:["White background","35mm × 45mm","Last 6 months"],acceptedFormats:["JPG"]},
        {id:"om-b",name:"Bank Statement (3 Months)",category:"financial",required:true,icon:"🏦",specs:["Minimum balance ₹30,000","Bank stamp required"],acceptedFormats:["PDF"]},
        {id:"om-f",name:"Return Flight Tickets",category:"travel",required:true,icon:"✈️",specs:["Confirmed return tickets"],acceptedFormats:["PDF"]},
        {id:"om-h",name:"Hotel Booking",category:"accommodation",required:true,icon:"🏨",specs:["Confirmed booking for stay duration"],acceptedFormats:["PDF"]},
      ],
    }],
  },
  {
    name:"Bahrain",slug:"bahrain",flag:"🇧🇭",isoCode:"BH",tagline:"Manama & Formula 1 Circuit",
    embassyInIndia:"Embassy of Bahrain, New Delhi",officialUrl:"https://www.evisa.gov.bh",
    generalNotes:["Indian passport holders are eligible for Bahrain eVisa","Apply online at evisa.gov.bh — quick approval","Valid for 2 weeks or 1 month options available"],
    visaTypes:[{
      id:"bh-tourist",label:"Tourist eVisa — 30 Days",type:"evisa",embassyFee:1400,serviceFee:699,processingDays:"1–3",validity:"3 months from issue",maxStay:"30 days",entries:"multiple",
      documents:[
        {id:"bh-p",name:"Passport (Bio Page Scan)",category:"identity",required:true,icon:"📘",specs:["Valid for 6 months from travel","Clear colour scan"],acceptedFormats:["JPG","PDF"]},
        {id:"bh-ph",name:"Photograph",category:"photo",required:true,icon:"📷",specs:["White background","35mm × 45mm"],acceptedFormats:["JPG"]},
        {id:"bh-b",name:"Bank Statement",category:"financial",required:true,icon:"🏦",specs:["Last 3 months","Minimum ₹25,000"],acceptedFormats:["PDF"]},
        {id:"bh-f",name:"Return Flight Tickets",category:"travel",required:true,icon:"✈️",specs:["Confirmed return tickets"],acceptedFormats:["PDF"]},
        {id:"bh-h",name:"Hotel Booking",category:"accommodation",required:true,icon:"🏨",specs:["Confirmed booking for stay"],acceptedFormats:["PDF"]},
      ],
    }],
  },
  {
    name:"Kuwait",slug:"kuwait",flag:"🇰🇼",isoCode:"KW",tagline:"Kuwait City & the Arabian Gulf",
    embassyInIndia:"Embassy of Kuwait, New Delhi",officialUrl:"https://www.e.gov.kw/sites/kgoenglish/Pages/eServices/MOIServices/MOIVisaInquiry.aspx",
    generalNotes:["Kuwait requires a sticker visa — must apply through employer/sponsor or travel agent","Indian passport holders must have a sponsor in Kuwait OR apply through licensed agent","Processing time varies — apply 3–4 weeks in advance"],
    visaTypes:[{
      id:"kw-visit",label:"Visit Visa — 30 Days",type:"sticker",embassyFee:2800,serviceFee:1299,processingDays:"7–14",validity:"3 months from issue",maxStay:"30 days",entries:"single",
      documents:[
        {id:"kw-p",name:"Original Passport",category:"identity",required:true,icon:"📘",specs:["Valid for at least 6 months","At least 2 blank pages","Physical passport submitted to embassy"],acceptedFormats:["PDF","JPG"]},
        {id:"kw-ph",name:"Photographs (2 copies)",category:"photo",required:true,icon:"📷",specs:["White background","35mm × 45mm","Last 3 months"],acceptedFormats:["JPG"]},
        {id:"kw-b",name:"Bank Statement (3 Months)",category:"financial",required:true,icon:"🏦",specs:["Minimum balance ₹50,000","Bank certified and stamped"],acceptedFormats:["PDF"]},
        {id:"kw-emp",name:"Employment Letter",category:"employment",required:true,icon:"💼",specs:["Company letterhead","States position, salary, leave approved"],acceptedFormats:["PDF"]},
        {id:"kw-sponsor",name:"Sponsor / Invitation Letter",category:"forms",required:true,icon:"📋",specs:["From Kuwait-based sponsor (company or individual)","Must include sponsor's civil ID / commercial licence"],notes:"Without a valid Kuwait sponsor, visit visa is very difficult to obtain.",acceptedFormats:["PDF"]},
        {id:"kw-f",name:"Return Flight Tickets",category:"travel",required:true,icon:"✈️",specs:["Confirmed return tickets"],acceptedFormats:["PDF"]},
        {id:"kw-h",name:"Hotel / Accommodation Proof",category:"accommodation",required:true,icon:"🏨",specs:["Hotel booking or sponsor's address and accommodation confirmation"],acceptedFormats:["PDF"]},
      ],
    }],
  },

  // ── SCHENGEN / EUROPE ────────────────────────────────────────────────────

  {
    name:"Germany",slug:"germany",flag:"🇩🇪",isoCode:"DE",tagline:"Berlin, Munich & the Rhine",
    embassyInIndia:"German Embassy / VFS Global",officialUrl:"https://india.diplo.de/in-en/service/-/2297742",
    generalNotes:["Apply at German Embassy if Germany is your primary Schengen destination","VFS Global handles appointments across India","Apply 3–6 months in advance for peak season","Schengen visa covers all 27 EU member states"],
    visaTypes:[{
      id:"de-schengen",label:"Schengen Tourist Visa — 90 Days",type:"sticker",embassyFee:6500,serviceFee:1999,processingDays:"15–20",validity:"90 days within 180 days",maxStay:"90 days",entries:"multiple",
      documents:[
        {id:"de-p",name:"Passport (Original + Photocopy)",category:"identity",required:true,icon:"📘",specs:["Valid at least 3 months beyond return date","At least 2 blank pages","Copy all stamped pages"],acceptedFormats:["PDF","JPG"]},
        {id:"de-ph",name:"Photographs (2 copies)",category:"photo",required:true,icon:"📷",specs:["35mm × 45mm","White background","ICAO biometric standard","Last 6 months"],acceptedFormats:["JPG"]},
        {id:"de-form",name:"Schengen Application Form",category:"forms",required:true,icon:"📋",specs:["Available at VFS / German Embassy website","Fill, sign and date"],acceptedFormats:["PDF"]},
        {id:"de-ins",name:"Travel Insurance",category:"insurance",required:true,icon:"🛡️",specs:["Minimum €30,000 medical coverage","Covers all Schengen countries","Includes medical repatriation"],notes:"MANDATORY — without this your application will be rejected.",acceptedFormats:["PDF"]},
        {id:"de-b",name:"Bank Statement (3 Months)",category:"financial",required:true,icon:"🏦",specs:["Last 3 months","Minimum €50 per day of stay","Bank certified"],acceptedFormats:["PDF"]},
        {id:"de-emp",name:"Employment & Leave Proof",category:"employment",required:true,icon:"💼",specs:["Employment letter with salary, leave approval","Last 3 months salary slips"],acceptedFormats:["PDF"]},
        {id:"de-h",name:"Hotel Bookings (All Nights)",category:"accommodation",required:true,icon:"🏨",specs:["Confirmed bookings for entire stay","Refundable bookings acceptable"],acceptedFormats:["PDF"]},
        {id:"de-f",name:"Return Flight Tickets",category:"travel",required:true,icon:"✈️",specs:["Confirmed onward and return flights"],acceptedFormats:["PDF"]},
        {id:"de-itr",name:"Income Tax Returns (2 Years)",category:"financial",required:false,icon:"📊",specs:["Last 2 years ITR — strengthens application","Especially for self-employed"],acceptedFormats:["PDF"]},
      ],
    }],
  },
  {
    name:"Italy",slug:"italy",flag:"🇮🇹",isoCode:"IT",tagline:"Rome, Venice, Florence & the Amalfi Coast",
    embassyInIndia:"Italian Embassy / VFS Global",officialUrl:"https://vistoperitalia.esteri.it",
    generalNotes:["Apply at Italian Embassy if Italy is your primary Schengen destination","VFS Global handles visa applications across India","Apply 2–3 months in advance","Schengen visa valid for 27 European countries"],
    visaTypes:[{
      id:"it-schengen",label:"Schengen Tourist Visa — 90 Days",type:"sticker",embassyFee:6500,serviceFee:1999,processingDays:"15–20",validity:"90 days within 180 days",maxStay:"90 days",entries:"multiple",
      documents:[
        {id:"it-p",name:"Passport (Original + Copy)",category:"identity",required:true,icon:"📘",specs:["Valid 3 months beyond return date","At least 2 blank pages","Photocopy of all used pages"],acceptedFormats:["PDF","JPG"]},
        {id:"it-ph",name:"Photographs (2 copies)",category:"photo",required:true,icon:"📷",specs:["35mm × 45mm","White background","ICAO standard","Last 3 months"],acceptedFormats:["JPG"]},
        {id:"it-form",name:"Schengen Application Form",category:"forms",required:true,icon:"📋",specs:["Italian Embassy official form","Signed and dated"],acceptedFormats:["PDF"]},
        {id:"it-ins",name:"Travel Insurance",category:"insurance",required:true,icon:"🛡️",specs:["Minimum €30,000 medical cover","Valid in all Schengen countries","Includes repatriation"],notes:"Mandatory — no exceptions.",acceptedFormats:["PDF"]},
        {id:"it-b",name:"Bank Statement (3 Months)",category:"financial",required:true,icon:"🏦",specs:["€50/day minimum recommended","Bank certified and stamped"],acceptedFormats:["PDF"]},
        {id:"it-emp",name:"Employment Proof",category:"employment",required:true,icon:"💼",specs:["Employment letter with leave approval","Last 3 pay slips"],acceptedFormats:["PDF"]},
        {id:"it-h",name:"Hotel Bookings",category:"accommodation",required:true,icon:"🏨",specs:["All nights confirmed","Booking.com refundable bookings accepted"],acceptedFormats:["PDF"]},
        {id:"it-f",name:"Return Flight Tickets",category:"travel",required:true,icon:"✈️",specs:["Confirmed onward and return flights"],acceptedFormats:["PDF"]},
      ],
    }],
  },
  {
    name:"Spain",slug:"spain",flag:"🇪🇸",isoCode:"ES",tagline:"Madrid, Barcelona & Seville",
    embassyInIndia:"Spanish Embassy / VFS Global",officialUrl:"https://www.exteriores.gob.es",
    generalNotes:["Apply at Spanish Embassy if Spain is your primary Schengen destination","VFS Global handles applications in India","Spain receives one of the highest Indian Schengen applications","Apply 2–3 months in advance for summer season"],
    visaTypes:[{
      id:"es-schengen",label:"Schengen Tourist Visa — 90 Days",type:"sticker",embassyFee:6500,serviceFee:1999,processingDays:"15–20",validity:"90 days within 180 days",maxStay:"90 days",entries:"multiple",
      documents:[
        {id:"es-p",name:"Passport (Original + Copy)",category:"identity",required:true,icon:"📘",specs:["Valid 3 months beyond return date","2 blank pages minimum","All stamped pages photocopied"],acceptedFormats:["PDF","JPG"]},
        {id:"es-ph",name:"Photographs (2 copies)",category:"photo",required:true,icon:"📷",specs:["35mm × 45mm","White background","ICAO biometric standard"],acceptedFormats:["JPG"]},
        {id:"es-form",name:"Schengen Application Form",category:"forms",required:true,icon:"📋",specs:["Spanish Embassy form — download from VFS","Sign and date"],acceptedFormats:["PDF"]},
        {id:"es-ins",name:"Travel Insurance",category:"insurance",required:true,icon:"🛡️",specs:["Minimum €30,000 medical coverage","All Schengen countries covered"],notes:"Mandatory for all Schengen applications.",acceptedFormats:["PDF"]},
        {id:"es-b",name:"Bank Statement (3 Months)",category:"financial",required:true,icon:"🏦",specs:["€50/day recommended","Bank certified"],acceptedFormats:["PDF"]},
        {id:"es-emp",name:"Employment & Leave Documents",category:"employment",required:true,icon:"💼",specs:["Employment letter with salary and leave dates"],acceptedFormats:["PDF"]},
        {id:"es-h",name:"Hotel Bookings",category:"accommodation",required:true,icon:"🏨",specs:["Confirmed for all nights of stay"],acceptedFormats:["PDF"]},
        {id:"es-f",name:"Return Flight Tickets",category:"travel",required:true,icon:"✈️",specs:["Confirmed return flights"],acceptedFormats:["PDF"]},
      ],
    }],
  },
  {
    name:"Netherlands",slug:"netherlands",flag:"🇳🇱",isoCode:"NL",tagline:"Amsterdam, Tulip Fields & Windmills",
    embassyInIndia:"Netherlands Embassy / VFS Global",officialUrl:"https://www.netherlandsworldwide.nl/visas-and-travel",
    generalNotes:["Apply at Dutch Embassy if Netherlands is your primary Schengen destination","VFS Global handles applications","Schengen visa valid for 27 EU countries"],
    visaTypes:[{
      id:"nl-schengen",label:"Schengen Tourist Visa — 90 Days",type:"sticker",embassyFee:6500,serviceFee:1999,processingDays:"15–20",validity:"90 days within 180 days",maxStay:"90 days",entries:"multiple",
      documents:[
        {id:"nl-p",name:"Passport (Original + Copy)",category:"identity",required:true,icon:"📘",specs:["Valid 3 months beyond return","2 blank pages","Photocopy all used pages"],acceptedFormats:["PDF","JPG"]},
        {id:"nl-ph",name:"Photographs (2 copies)",category:"photo",required:true,icon:"📷",specs:["35mm × 45mm","White background","ICAO standard"],acceptedFormats:["JPG"]},
        {id:"nl-form",name:"Schengen Application Form",category:"forms",required:true,icon:"📋",specs:["Dutch Embassy form","Signed"],acceptedFormats:["PDF"]},
        {id:"nl-ins",name:"Travel Insurance",category:"insurance",required:true,icon:"🛡️",specs:["€30,000 minimum medical","All Schengen"],notes:"Mandatory.",acceptedFormats:["PDF"]},
        {id:"nl-b",name:"Bank Statement (3 Months)",category:"financial",required:true,icon:"🏦",specs:["€50/day minimum","Bank certified"],acceptedFormats:["PDF"]},
        {id:"nl-emp",name:"Employment Proof",category:"employment",required:true,icon:"💼",specs:["Employment letter + 3 payslips"],acceptedFormats:["PDF"]},
        {id:"nl-h",name:"Hotel Bookings",category:"accommodation",required:true,icon:"🏨",specs:["Confirmed for all nights"],acceptedFormats:["PDF"]},
        {id:"nl-f",name:"Return Flight Tickets",category:"travel",required:true,icon:"✈️",specs:["Confirmed return"],acceptedFormats:["PDF"]},
      ],
    }],
  },
  {
    name:"Greece",slug:"greece",flag:"🇬🇷",isoCode:"GR",tagline:"Athens, Santorini & Mykonos",
    embassyInIndia:"Greek Embassy / VFS Global",officialUrl:"https://www.mfa.gr/en/visas/",
    generalNotes:["One of the most popular Schengen destinations for Indians","VFS Global handles Greek visa applications","Apply 2–3 months in advance for summer/island season","Schengen visa covers 27 EU countries"],
    visaTypes:[{
      id:"gr-schengen",label:"Schengen Tourist Visa — 90 Days",type:"sticker",embassyFee:6500,serviceFee:1999,processingDays:"15–20",validity:"90 days within 180 days",maxStay:"90 days",entries:"multiple",
      documents:[
        {id:"gr-p",name:"Passport (Original + Copy)",category:"identity",required:true,icon:"📘",specs:["Valid 3 months beyond return","2 blank pages"],acceptedFormats:["PDF","JPG"]},
        {id:"gr-ph",name:"Photographs (2 copies)",category:"photo",required:true,icon:"📷",specs:["35mm × 45mm","White background","ICAO biometric"],acceptedFormats:["JPG"]},
        {id:"gr-form",name:"Schengen Application Form",category:"forms",required:true,icon:"📋",specs:["Greek Embassy form — sign and date"],acceptedFormats:["PDF"]},
        {id:"gr-ins",name:"Travel Insurance",category:"insurance",required:true,icon:"🛡️",specs:["€30,000 minimum","All Schengen"],notes:"Mandatory.",acceptedFormats:["PDF"]},
        {id:"gr-b",name:"Bank Statement (3 Months)",category:"financial",required:true,icon:"🏦",specs:["€50/day minimum","Bank certified"],acceptedFormats:["PDF"]},
        {id:"gr-emp",name:"Employment Proof",category:"employment",required:true,icon:"💼",specs:["Employment letter + payslips"],acceptedFormats:["PDF"]},
        {id:"gr-h",name:"Hotel Bookings",category:"accommodation",required:true,icon:"🏨",specs:["Confirmed all nights"],acceptedFormats:["PDF"]},
        {id:"gr-f",name:"Return Flights",category:"travel",required:true,icon:"✈️",specs:["Confirmed return tickets"],acceptedFormats:["PDF"]},
      ],
    }],
  },
  {
    name:"Switzerland",slug:"switzerland",flag:"🇨🇭",isoCode:"CH",tagline:"Zurich, Interlaken & Swiss Alps",
    embassyInIndia:"Swiss Embassy / VFS Global",officialUrl:"https://www.eda.admin.ch/countries/india/en/home/visa/entry-ch.html",
    generalNotes:["Switzerland is a Schengen member — apply at Swiss Embassy if it's your main destination","VFS Global handles Swiss visa applications","Switzerland is non-EU but Schengen","Apply 2–3 months in advance — Swiss visas are thoroughly scrutinised"],
    visaTypes:[{
      id:"ch-schengen",label:"Schengen Tourist Visa — 90 Days",type:"sticker",embassyFee:6500,serviceFee:1999,processingDays:"15–20",validity:"90 days within 180 days",maxStay:"90 days",entries:"multiple",
      documents:[
        {id:"ch-p",name:"Passport (Original + Copy)",category:"identity",required:true,icon:"📘",specs:["Valid 3 months beyond return","At least 2 blank pages","Copy all stamped pages"],acceptedFormats:["PDF","JPG"]},
        {id:"ch-ph",name:"Photographs (2 copies)",category:"photo",required:true,icon:"📷",specs:["35mm × 45mm","White background","ICAO standard"],acceptedFormats:["JPG"]},
        {id:"ch-form",name:"Schengen Application Form",category:"forms",required:true,icon:"📋",specs:["Swiss Embassy form","Signed and dated"],acceptedFormats:["PDF"]},
        {id:"ch-ins",name:"Travel Insurance",category:"insurance",required:true,icon:"🛡️",specs:["€30,000 minimum medical","All Schengen countries covered"],notes:"Mandatory.",acceptedFormats:["PDF"]},
        {id:"ch-b",name:"Bank Statement (3 Months)",category:"financial",required:true,icon:"🏦",specs:["€80–100/day recommended (Switzerland is expensive)","Bank certified"],acceptedFormats:["PDF"]},
        {id:"ch-emp",name:"Employment & Leave Documents",category:"employment",required:true,icon:"💼",specs:["Employment letter + 3 payslips"],acceptedFormats:["PDF"]},
        {id:"ch-h",name:"Hotel Bookings",category:"accommodation",required:true,icon:"🏨",specs:["Confirmed all nights"],acceptedFormats:["PDF"]},
        {id:"ch-f",name:"Return Flights",category:"travel",required:true,icon:"✈️",specs:["Confirmed return tickets"],acceptedFormats:["PDF"]},
      ],
    }],
  },
  {
    name:"Austria",slug:"austria",flag:"🇦🇹",isoCode:"AT",tagline:"Vienna, Salzburg & the Austrian Alps",
    embassyInIndia:"Austrian Embassy / VFS Global",officialUrl:"https://www.bmeia.gv.at/en/austrian-embassy-new-delhi/",
    generalNotes:["Apply at Austrian Embassy if Austria is your primary destination","VFS Global handles applications in India","Schengen visa covers 27 EU countries"],
    visaTypes:[{
      id:"at-schengen",label:"Schengen Tourist Visa — 90 Days",type:"sticker",embassyFee:6500,serviceFee:1999,processingDays:"15–20",validity:"90 days within 180 days",maxStay:"90 days",entries:"multiple",
      documents:[
        {id:"at-p",name:"Passport (Original + Copy)",category:"identity",required:true,icon:"📘",specs:["Valid 3 months beyond return","2 blank pages"],acceptedFormats:["PDF","JPG"]},
        {id:"at-ph",name:"Photographs (2 copies)",category:"photo",required:true,icon:"📷",specs:["35mm × 45mm","White background","ICAO"],acceptedFormats:["JPG"]},
        {id:"at-form",name:"Schengen Application Form",category:"forms",required:true,icon:"📋",specs:["Austrian Embassy form"],acceptedFormats:["PDF"]},
        {id:"at-ins",name:"Travel Insurance",category:"insurance",required:true,icon:"🛡️",specs:["€30,000 minimum","All Schengen countries"],notes:"Mandatory.",acceptedFormats:["PDF"]},
        {id:"at-b",name:"Bank Statement (3 Months)",category:"financial",required:true,icon:"🏦",specs:["€50/day minimum","Bank certified"],acceptedFormats:["PDF"]},
        {id:"at-emp",name:"Employment Proof",category:"employment",required:true,icon:"💼",specs:["Employment letter + payslips"],acceptedFormats:["PDF"]},
        {id:"at-h",name:"Hotel Bookings",category:"accommodation",required:true,icon:"🏨",specs:["Confirmed all nights"],acceptedFormats:["PDF"]},
        {id:"at-f",name:"Return Flights",category:"travel",required:true,icon:"✈️",specs:["Confirmed return tickets"],acceptedFormats:["PDF"]},
      ],
    }],
  },
  {
    name:"Portugal",slug:"portugal",flag:"🇵🇹",isoCode:"PT",tagline:"Lisbon, Porto & the Algarve",
    embassyInIndia:"Portuguese Embassy / VFS Global",officialUrl:"https://vistos.mne.gov.pt/en/",
    generalNotes:["Apply at Portuguese Embassy if Portugal is your primary Schengen destination","Most affordable and welcoming Schengen country for Indians","VFS Global handles applications","Schengen visa valid for 27 EU countries"],
    visaTypes:[{
      id:"pt-schengen",label:"Schengen Tourist Visa — 90 Days",type:"sticker",embassyFee:6500,serviceFee:1999,processingDays:"15–20",validity:"90 days within 180 days",maxStay:"90 days",entries:"multiple",
      documents:[
        {id:"pt-p",name:"Passport (Original + Copy)",category:"identity",required:true,icon:"📘",specs:["Valid 3 months beyond return","2 blank pages"],acceptedFormats:["PDF","JPG"]},
        {id:"pt-ph",name:"Photographs (2 copies)",category:"photo",required:true,icon:"📷",specs:["35mm × 45mm","White background","ICAO standard"],acceptedFormats:["JPG"]},
        {id:"pt-form",name:"Schengen Application Form",category:"forms",required:true,icon:"📋",specs:["Portuguese Embassy form","Signed"],acceptedFormats:["PDF"]},
        {id:"pt-ins",name:"Travel Insurance",category:"insurance",required:true,icon:"🛡️",specs:["€30,000 minimum","All Schengen"],notes:"Mandatory.",acceptedFormats:["PDF"]},
        {id:"pt-b",name:"Bank Statement (3 Months)",category:"financial",required:true,icon:"🏦",specs:["€50/day minimum","Bank certified"],acceptedFormats:["PDF"]},
        {id:"pt-emp",name:"Employment Proof",category:"employment",required:true,icon:"💼",specs:["Employment letter + payslips"],acceptedFormats:["PDF"]},
        {id:"pt-h",name:"Hotel Bookings",category:"accommodation",required:true,icon:"🏨",specs:["Confirmed all nights"],acceptedFormats:["PDF"]},
        {id:"pt-f",name:"Return Flights",category:"travel",required:true,icon:"✈️",specs:["Confirmed return tickets"],acceptedFormats:["PDF"]},
      ],
    }],
  },

  // ── ASIA PACIFIC ─────────────────────────────────────────────────────────

  {
    name:"Philippines",slug:"philippines",flag:"🇵🇭",isoCode:"PH",tagline:"Manila, Cebu & Palawan",
    embassyInIndia:"Embassy of the Philippines, New Delhi",officialUrl:"https://www.dfa.gov.ph",
    generalNotes:["Indian passport holders get visa-free access to Philippines for up to 30 days","No advance visa required — entry stamp given at airport","Passport must be valid for at least 6 months","Must have return ticket and proof of funds at immigration"],
    visaTypes:[{
      id:"ph-free",label:"Visa-Free Entry — 30 Days",type:"free",embassyFee:0,serviceFee:299,processingDays:"Instant",validity:"On arrival",maxStay:"30 days",entries:"multiple",
      documents:[
        {id:"ph-p",name:"Valid Passport",category:"identity",required:true,icon:"📘",specs:["Valid for at least 6 months from entry","At least 1 blank page"],acceptedFormats:["PDF","JPG"]},
        {id:"ph-f",name:"Return / Onward Ticket",category:"travel",required:true,icon:"✈️",specs:["Confirmed return or onward ticket","Immigration will ask for proof of departure"],acceptedFormats:["PDF"]},
        {id:"ph-h",name:"Hotel Booking",category:"accommodation",required:false,icon:"🏨",specs:["First night accommodation confirmation","Helpful at immigration"],acceptedFormats:["PDF"]},
        {id:"ph-funds",name:"Proof of Funds",category:"financial",required:false,icon:"💵",specs:["PHP 50,000 equivalent (~₹75,000) recommended","Credit card or cash"],acceptedFormats:["PDF"]},
      ],
    }],
  },
  {
    name:"Hong Kong",slug:"hong-kong",flag:"🇭🇰",isoCode:"HK",tagline:"Victoria Harbour & Lantau Island",
    embassyInIndia:"Hong Kong Immigration Department",officialUrl:"https://www.immd.gov.hk",
    generalNotes:["Indian passport holders get visa-free entry to Hong Kong for 14 days","No advance visa required — entry stamp at airport","Passport must be valid for at least 1 month beyond stay","Keep return ticket and hotel booking ready at immigration"],
    visaTypes:[{
      id:"hk-free",label:"Visa-Free Entry — 14 Days",type:"free",embassyFee:0,serviceFee:299,processingDays:"Instant",validity:"On arrival",maxStay:"14 days",entries:"multiple",
      documents:[
        {id:"hk-p",name:"Valid Passport",category:"identity",required:true,icon:"📘",specs:["Valid for at least 1 month beyond intended stay","At least 1 blank page"],acceptedFormats:["PDF","JPG"]},
        {id:"hk-f",name:"Return / Onward Ticket",category:"travel",required:true,icon:"✈️",specs:["Confirmed departure ticket mandatory","Immigration strictly checks this"],acceptedFormats:["PDF"]},
        {id:"hk-h",name:"Hotel Booking",category:"accommodation",required:false,icon:"🏨",specs:["Accommodation confirmation for stay","Strongly recommended for smooth entry"],acceptedFormats:["PDF"]},
        {id:"hk-funds",name:"Proof of Sufficient Funds",category:"financial",required:false,icon:"💵",specs:["HKD 10,000 equivalent (~₹1,00,000)","Credit card or cash"],acceptedFormats:["PDF"]},
      ],
    }],
  },
  {
    name:"Maldives",slug:"maldives",flag:"🇲🇻",isoCode:"MV",tagline:"Overwater Bungalows & Coral Reefs",
    embassyInIndia:"Maldives High Commission, New Delhi",officialUrl:"https://www.immigration.gov.mv",
    generalNotes:["Indian passport holders get free visa on arrival for 30 days — extendable","No advance visa needed","One of the most hassle-free destinations for Indians","Resort bookings are mandatory — no free independent travel restrictions"],
    visaTypes:[{
      id:"mv-voa",label:"Visa on Arrival — 30 Days",type:"voa",embassyFee:0,serviceFee:299,processingDays:"Instant",validity:"30 days from arrival",maxStay:"30 days",entries:"single",
      documents:[
        {id:"mv-p",name:"Valid Passport",category:"identity",required:true,icon:"📘",specs:["Valid for at least 6 months from entry date","At least 1 blank page"],acceptedFormats:["PDF","JPG"]},
        {id:"mv-f",name:"Return Air Ticket",category:"travel",required:true,icon:"✈️",specs:["Confirmed return ticket mandatory"],acceptedFormats:["PDF"]},
        {id:"mv-h",name:"Hotel / Resort Booking",category:"accommodation",required:true,icon:"🏨",specs:["Confirmed resort or hotel booking for entire stay","Maldives requires accommodation proof strictly"],notes:"Maldives is an island nation — all stays must be pre-booked.",acceptedFormats:["PDF"]},
        {id:"mv-funds",name:"Proof of Sufficient Funds",category:"financial",required:false,icon:"💵",specs:["USD 100 per day of stay recommended","Credit card at resort is acceptable"],acceptedFormats:["PDF"]},
      ],
    }],
  },
  {
    name:"Sri Lanka",slug:"sri-lanka",flag:"🇱🇰",isoCode:"LK",tagline:"Colombo, Sigiriya & Kandy",
    embassyInIndia:"Sri Lanka High Commission, New Delhi",officialUrl:"https://www.eta.gov.lk",
    generalNotes:["Indian passport holders can apply for Sri Lanka eVisa online","Apply at eta.gov.lk — quick approval","Passport must be valid for at least 6 months","ETA is required before travel — not a visa on arrival for Indians"],
    visaTypes:[{
      id:"lk-eta",label:"Tourist ETA — 30 Days",type:"eta",embassyFee:1200,serviceFee:499,processingDays:"1–2",validity:"6 months from issue",maxStay:"30 days",entries:"double",
      documents:[
        {id:"lk-p",name:"Passport (Bio Page Scan)",category:"identity",required:true,icon:"📘",specs:["Valid for at least 6 months","Clear colour scan of bio-data page"],acceptedFormats:["JPG","PDF"]},
        {id:"lk-ph",name:"Digital Photograph",category:"photo",required:true,icon:"📷",specs:["White background","Passport size","Recent — within 6 months"],acceptedFormats:["JPG"]},
        {id:"lk-f",name:"Return Flight Tickets",category:"travel",required:false,icon:"✈️",specs:["Not mandatory for ETA application","Useful for immigration"],acceptedFormats:["PDF"]},
        {id:"lk-h",name:"Hotel Booking",category:"accommodation",required:false,icon:"🏨",specs:["First few nights booking helpful","Not strictly required for ETA"],acceptedFormats:["PDF"]},
        {id:"lk-funds",name:"Bank Statement / Funds Proof",category:"financial",required:false,icon:"💵",specs:["USD 50/day recommended","Immigration may ask for funds proof"],acceptedFormats:["PDF"]},
      ],
    }],
  },
  {
    name:"Nepal",slug:"nepal",flag:"🇳🇵",isoCode:"NP",tagline:"Himalayas, Kathmandu & Pokhara",
    embassyInIndia:"Embassy of Nepal, New Delhi",officialUrl:"https://www.mofa.gov.np",
    generalNotes:["Indian passport holders do NOT require a visa for Nepal","Entry is completely free — no visa fee","Indian passport and voter ID are both accepted as travel documents","No need to book in advance — just travel!"],
    visaTypes:[{
      id:"np-free",label:"Visa-Free Entry — Unlimited Stay",type:"free",embassyFee:0,serviceFee:0,processingDays:"Instant",validity:"Unlimited",maxStay:"Unlimited",entries:"multiple",
      documents:[
        {id:"np-id",name:"Indian Passport OR Voter ID",category:"identity",required:true,icon:"📘",specs:["Either valid Indian passport OR valid Indian Voter ID card","Both are accepted at Nepal border and airports","No minimum validity requirement"],notes:"Nepal is the easiest international trip for Indians — no visa, no hassle.",acceptedFormats:["JPG","PDF"]},
      ],
    }],
  },
  {
    name:"Bhutan",slug:"bhutan",flag:"🇧🇹",isoCode:"BT",tagline:"Paro, Thimphu & Tiger's Nest",
    embassyInIndia:"Royal Bhutan Embassy, New Delhi",officialUrl:"https://www.tourism.gov.bt",
    generalNotes:["Indian passport holders need a Bhutan Travel Permit — not a visa","Entry permit is obtained at the border or at Paro Airport","Sustainable Development Fee (SDF): USD 200/night introduced in 2022","Indians also pay USD 200/night SDF from 2024 — book through licensed tour operator"],
    visaTypes:[{
      id:"bt-permit",label:"Tourist Permit (Entry Permit)",type:"free",embassyFee:0,serviceFee:1499,processingDays:"Instant",validity:"Duration of stay",maxStay:"As per permit",entries:"single",
      documents:[
        {id:"bt-p",name:"Indian Passport",category:"identity",required:true,icon:"📘",specs:["Valid Indian Passport","Voter ID also accepted at Phuentsholing land border","Minimum validity not specified but 6 months recommended"],acceptedFormats:["JPG","PDF"]},
        {id:"bt-booking",name:"Confirmed Tour Operator Booking",category:"travel",required:true,icon:"🏔️",specs:["Must book through a Bhutan-registered tour operator","Tour operator will arrange the entry permit","SDF (Sustainable Development Fee) USD 200/night must be paid"],notes:"Since 2022, all tourists including Indians must pay USD 200/night SDF. Book through a Bhutanese tour operator.",acceptedFormats:["PDF"]},
        {id:"bt-f",name:"Return Flight / Transport Booking",category:"travel",required:false,icon:"✈️",specs:["Air travel to Paro: Druk Air or Bhutan Airlines only","Land entry from Phuentsholing border possible"],acceptedFormats:["PDF"]},
      ],
    }],
  },
  {
    name:"Myanmar",slug:"myanmar",flag:"🇲🇲",isoCode:"MM",tagline:"Bagan, Yangon & Inle Lake",
    embassyInIndia:"Embassy of Myanmar, New Delhi",officialUrl:"https://evisa.moip.gov.mm",
    generalNotes:["Indian passport holders can apply for Myanmar eVisa online","Apply at evisa.moip.gov.mm — processing in 3 working days","Passport must be valid for at least 6 months","Tourism eVisa valid for 28 days"],
    visaTypes:[{
      id:"mm-evisa",label:"Tourist eVisa — 28 Days",type:"evisa",embassyFee:1600,serviceFee:599,processingDays:"3–5",validity:"3 months from issue",maxStay:"28 days",entries:"single",
      documents:[
        {id:"mm-p",name:"Passport (Bio Page Scan)",category:"identity",required:true,icon:"📘",specs:["Valid for at least 6 months from travel date","Clear colour scan, high resolution"],acceptedFormats:["JPG","PDF"]},
        {id:"mm-ph",name:"Digital Photograph",category:"photo",required:true,icon:"📷",specs:["White background","Passport size","Last 6 months","JPEG format"],acceptedFormats:["JPG"]},
        {id:"mm-f",name:"Return / Onward Flight Ticket",category:"travel",required:false,icon:"✈️",specs:["Not mandatory for eVisa","May be asked at immigration"],acceptedFormats:["PDF"]},
        {id:"mm-h",name:"Hotel / Accommodation Booking",category:"accommodation",required:false,icon:"🏨",specs:["At least first night booking","Helpful for immigration"],acceptedFormats:["PDF"]},
      ],
    }],
  },
  {
    name:"Cambodia",slug:"cambodia",flag:"🇰🇭",isoCode:"KH",tagline:"Angkor Wat, Phnom Penh & Siem Reap",
    embassyInIndia:"Royal Embassy of Cambodia, New Delhi",officialUrl:"https://www.evisa.gov.kh",
    generalNotes:["Indian passport holders can apply for Cambodia eVisa online","Apply at evisa.gov.kh — approval in 3 business days","Visa on Arrival also available at Phnom Penh and Siem Reap airports","Passport must be valid for 6 months"],
    visaTypes:[{
      id:"kh-evisa",label:"Tourist eVisa — 30 Days",type:"evisa",embassyFee:1200,serviceFee:499,processingDays:"3–5",validity:"3 months from issue",maxStay:"30 days",entries:"single",
      documents:[
        {id:"kh-p",name:"Passport (Bio Page Scan)",category:"identity",required:true,icon:"📘",specs:["Valid for at least 6 months","Colour scan, high resolution"],acceptedFormats:["JPG","PDF"]},
        {id:"kh-ph",name:"Digital Photograph",category:"photo",required:true,icon:"📷",specs:["White background","Passport size","Last 6 months","JPEG format minimum 300 DPI"],acceptedFormats:["JPG"]},
        {id:"kh-f",name:"Return Flight Tickets",category:"travel",required:false,icon:"✈️",specs:["Not required for eVisa","Useful for immigration"],acceptedFormats:["PDF"]},
        {id:"kh-h",name:"Hotel Booking",category:"accommodation",required:false,icon:"🏨",specs:["Accommodation for first few nights helpful"],acceptedFormats:["PDF"]},
        {id:"kh-funds",name:"Proof of Funds",category:"financial",required:false,icon:"💵",specs:["USD 50/day equivalent recommended"],acceptedFormats:["PDF"]},
      ],
    }],
  },
];

// ── REGION MAP ────────────────────────────────────────────────────────────
export type Region = 'middle-east' | 'schengen' | 'europe' | 'asia-pacific' | 'africa' | 'asia' | 'americas' | 'indian-subcontinent';

export const REGION_META: Record<Region, { label: string; icon: string; desc: string }> = {
  'middle-east':          { label: "Middle East",           icon: "🌙", desc: "UAE, Saudi Arabia, Qatar & more" },
  'schengen':             { label: "Schengen / Europe",     icon: "🇪🇺", desc: "One visa, 27 European countries" },
  'europe':               { label: "Europe (Non-Schengen)", icon: "🏰", desc: "UK, Switzerland & beyond" },
  'asia-pacific':         { label: "Asia Pacific",          icon: "🌏", desc: "Southeast Asia, Australia, NZ & more" },
  'africa':               { label: "Africa",                icon: "🌍", desc: "South Africa & beyond" },
  'asia':                 { label: "East & South Asia",     icon: "⛩️", desc: "Japan, Korea & beyond" },
  'americas':             { label: "Americas",              icon: "🌎", desc: "USA, Canada & beyond" },
  'indian-subcontinent':  { label: "Indian Subcontinent",   icon: "🕌", desc: "Nepal, Sri Lanka, Bhutan" },
};

export const COUNTRY_REGIONS: Record<string, Region> = {
  'uae':           'middle-east',
  'saudi-arabia':  'middle-east',
  'qatar':         'middle-east',
  'oman':          'middle-east',
  'bahrain':       'middle-east',
  'kuwait':        'middle-east',
  'france':        'schengen',
  'germany':       'schengen',
  'italy':         'schengen',
  'spain':         'schengen',
  'netherlands':   'schengen',
  'greece':        'schengen',
  'austria':       'schengen',
  'portugal':      'schengen',
  'united-kingdom':'europe',
  'switzerland':   'europe',
  'singapore':     'asia-pacific',
  'thailand':      'asia-pacific',
  'malaysia':      'asia-pacific',
  'indonesia':     'asia-pacific',
  'vietnam':       'asia-pacific',
  'philippines':   'asia-pacific',
  'hong-kong':     'asia-pacific',
  'maldives':      'asia-pacific',
  'cambodia':      'asia-pacific',
  'myanmar':       'asia-pacific',
  'australia':     'asia-pacific',
  'new-zealand':   'asia-pacific',
  'south-africa':  'africa',
  'japan':         'asia',
  'south-korea':   'asia',
  'usa':           'americas',
  'canada':        'americas',
  'nepal':         'indian-subcontinent',
  'sri-lanka':     'indian-subcontinent',
  'bhutan':        'indian-subcontinent',
};

export function getCountryBySlug(slug: string): Country | undefined {
  return COUNTRIES.find(c => c.slug === slug);
}
export function getCountriesByRegion(region: Region): Country[] {
  return COUNTRIES.filter(c => COUNTRY_REGIONS[c.slug] === region);
}
export function getTotalFee(visaType: VisaType): number {
  return visaType.embassyFee + visaType.serviceFee + Math.round((visaType.embassyFee + visaType.serviceFee) * 0.18);
}
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
export const CATEGORY_LABELS: Record<DocCategory, string> = {
  identity:      "Identity Documents",
  financial:     "Financial Documents",
  travel:        "Travel Documents",
  accommodation: "Accommodation",
  employment:    "Employment Proof",
  insurance:     "Travel Insurance",
  photo:         "Photographs",
  forms:         "Application Forms",
};
export const CATEGORY_ICONS: Record<DocCategory, string> = {
  identity:      "🪪",
  financial:     "💰",
  travel:        "✈️",
  accommodation: "🏨",
  employment:    "💼",
  insurance:     "🛡️",
  photo:         "📷",
  forms:         "📋",
};