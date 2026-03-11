"use client";
import Link from "next/link";

export default function TermsPageClient() {
  return (
    <div style={{ fontFamily:"'Outfit',sans-serif", background:"#08080F", color:"#F5F0E8", minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,400;0,500;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        h2{font-family:'Cormorant Garant',serif;color:#F5F0E8;font-size:clamp(22px,3vw,30px);font-weight:500;margin:36px 0 12px;border-bottom:1px solid rgba(212,175,106,0.2);padding-bottom:8px}
        h3{color:#D4AF6A;font-size:16px;font-weight:600;margin:20px 0 8px}
        p{color:#A0A0B8;line-height:1.8;font-size:14px;margin-bottom:12px}
        ul{color:#A0A0B8;line-height:1.8;font-size:14px;margin:8px 0 12px 20px}
        li{margin-bottom:6px}
        a{color:#D4AF6A;text-decoration:none}
        a:hover{text-decoration:underline}
      `}</style>

      <nav style={{position:"sticky",top:0,zIndex:100,height:64,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 clamp(16px,4vw,48px)",background:"rgba(8,8,15,0.97)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(212,175,106,0.12)"}}>
        <Link href="/" style={{display:"flex",alignItems:"center",textDecoration:"none"}}>
          <img src="/logo.png" alt="MyTripLooker" style={{height:36,width:"auto"}} />
        </Link>
        <Link href="/" style={{fontSize:13,color:"#A0A0B8",textDecoration:"none"}}>← Back to Home</Link>
      </nav>

      <main style={{maxWidth:800,margin:"0 auto",padding:"60px clamp(16px,4vw,40px) 100px"}}>
        <div style={{marginBottom:40}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:"#D4AF6A",marginBottom:12}}>Legal</div>
          <h1 style={{fontFamily:"'Cormorant Garant',serif",fontSize:"clamp(36px,5vw,56px)",fontWeight:400,color:"#F5F0E8",lineHeight:1.1}}>
            Terms of <em style={{color:"#D4AF6A",fontStyle:"italic"}}>Service</em>
          </h1>
          <p style={{marginTop:16,fontSize:13,color:"#5A5A6E"}}>Last updated: 11 March 2026 &nbsp;·&nbsp; Effective immediately</p>
        </div>

        <div style={{background:"#141420",border:"1px solid rgba(212,175,106,0.15)",borderRadius:14,padding:"20px 24px",marginBottom:36}}>
          <p style={{color:"#A0A0B8",fontSize:14,lineHeight:1.8,margin:0}}>
            By using <strong style={{color:"#F5F0E8"}}>visa.mytriplooker.com</strong>, you agree to these Terms of Service. Please read them carefully before submitting an application or making payment.
          </p>
        </div>

        <h2>1. Service Description</h2>
        <p>MyTripLooker is a private visa facilitation service for Indian passport holders. We assist with document preparation, application filing, and embassy coordination on behalf of applicants. We are <strong style={{color:"#E85D4A"}}>not</strong> a government body or official embassy representative.</p>

        <h2>2. Eligibility</h2>
        <ul>
          <li>You must be 18 years or older, or have parental/guardian consent</li>
          <li>You must hold a valid Indian passport</li>
          <li>You must provide accurate and truthful information</li>
          <li>You must not be subject to visa bans or travel restrictions</li>
        </ul>

        <h2>3. Application Accuracy</h2>
        <p>You are responsible for providing accurate personal, travel, and document information. MyTripLooker is not liable for rejections caused by:</p>
        <ul>
          <li>Inaccurate information provided by the applicant</li>
          <li>Incorrect or fraudulent documents submitted</li>
          <li>Changes in embassy requirements after application submission</li>
          <li>Applicant&apos;s travel history or criminal record</li>
        </ul>

        <h2>4. Payment Terms</h2>
        <ul>
          <li>All fees are in Indian Rupees (INR) and inclusive of GST</li>
          <li>Fees comprise: Embassy/Government fee + MyTripLooker service fee</li>
          <li>Payment is required in full before application submission</li>
          <li>Payments are processed securely by Razorpay (PCI-DSS compliant)</li>
          <li>We accept UPI, credit/debit cards, net banking, and wallets</li>
        </ul>

        <h2>5. Refund Policy</h2>
        <h3>Full Refund</h3>
        <ul>
          <li>If we are unable to submit your application due to our error</li>
          <li>If the embassy/consulate is closed and cannot accept applications</li>
          <li>Requested within 24 hours of payment, before application is filed</li>
        </ul>
        <h3>Partial Refund (Service Fee Only — Embassy Fee Non-Refundable)</h3>
        <ul>
          <li>Visa rejection due to embassy discretion (not document errors)</li>
          <li>Application withdrawn by applicant before embassy submission</li>
        </ul>
        <h3>No Refund</h3>
        <ul>
          <li>Visa rejection due to incorrect/incomplete documents provided by applicant</li>
          <li>Change of travel plans after application has been submitted</li>
          <li>Express processing fees once processing has commenced</li>
        </ul>
        <p>To request a refund, email <a href="mailto:sales@mytriplooker.com">sales@mytriplooker.com</a> with your MTL reference number.</p>

        <h2>6. Processing Times</h2>
        <p>All processing times stated are estimates. MyTripLooker does not guarantee specific processing times as these are determined by the respective embassy or consulate. Express processing upgrades reduce our processing time, not embassy processing time.</p>

        <h2>7. Free Re-processing</h2>
        <p>If your visa is rejected solely due to an error made by MyTripLooker (incorrect form submission, missing mandatory document on our checklist), we will re-process your application at no additional service charge. This does not cover embassy fees for the second application.</p>

        <h2>8. Document Responsibility</h2>
        <ul>
          <li>You must upload clear, valid, unedited documents</li>
          <li>Submitting fraudulent documents is a criminal offence — we will report such cases to authorities</li>
          <li>We reserve the right to cancel your application without refund if fraud is detected</li>
        </ul>

        <h2>9. Limitation of Liability</h2>
        <p>MyTripLooker&apos;s maximum liability is limited to the service fee paid by you. We are not liable for:</p>
        <ul>
          <li>Loss of travel bookings, accommodation, or other expenses due to visa delays or rejection</li>
          <li>Embassy processing delays beyond our control</li>
          <li>Changes in visa regulations or entry requirements</li>
        </ul>

        <h2>10. Intellectual Property</h2>
        <p>All content on visa.mytriplooker.com — including text, design, logos, and software — is owned by MyTripLooker. Unauthorised reproduction or use is prohibited.</p>

        <h2>11. Governing Law</h2>
        <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of New Delhi, India.</p>

        <h2>12. Changes to Terms</h2>
        <p>We may update these Terms at any time. Continued use of our services after changes constitutes acceptance of the updated Terms.</p>

        <h2>13. Contact</h2>
        <div style={{background:"#141420",border:"1px solid rgba(212,175,106,0.15)",borderRadius:12,padding:"20px 24px",marginTop:8}}>
          <p style={{margin:0,color:"#A0A0B8"}}><strong style={{color:"#F5F0E8"}}>MyTripLooker</strong><br/>
          Email: <a href="mailto:sales@mytriplooker.com">sales@mytriplooker.com</a><br/>
          WhatsApp: <a href="https://wa.me/919012222901">+91 90122 22901</a><br/>
          Website: <a href="https://visa.mytriplooker.com">visa.mytriplooker.com</a></p>
        </div>
      </main>

      <footer style={{borderTop:"1px solid rgba(255,255,255,0.05)",padding:"28px clamp(16px,4vw,48px)",textAlign:"center"}}>
        <p style={{fontSize:12,color:"#3A3A4E",margin:0}}>
          © 2026 MyTripLooker &nbsp;·&nbsp; <Link href="/terms" style={{color:"#5A5A6E"}}>Terms of Service</Link> &nbsp;·&nbsp; <Link href="/privacy" style={{color:"#5A5A6E"}}>Privacy Policy</Link>
        </p>
      </footer>
    </div>
  );
}
