"use client";
import Link from "next/link";

export default function PrivacyPageClient() {
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

      {/* Nav */}
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
            Privacy <em style={{color:"#D4AF6A",fontStyle:"italic"}}>Policy</em>
          </h1>
          <p style={{marginTop:16,fontSize:13,color:"#5A5A6E"}}>Last updated: 11 March 2026 &nbsp;·&nbsp; Effective immediately</p>
        </div>

        <div style={{background:"#141420",border:"1px solid rgba(212,175,106,0.15)",borderRadius:14,padding:"20px 24px",marginBottom:36}}>
          <p style={{color:"#A0A0B8",fontSize:14,lineHeight:1.8,margin:0}}>
            MyTripLooker (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect data when you use <strong style={{color:"#F5F0E8"}}>visa.mytriplooker.com</strong>.
          </p>
        </div>

        <h2>1. Information We Collect</h2>
        <h3>Personal Information</h3>
        <ul>
          <li>Full name, date of birth, gender, nationality</li>
          <li>Passport number, issue date, expiry date</li>
          <li>Email address and mobile number (+91)</li>
          <li>Travel dates, destination, hotel booking details</li>
          <li>Payment information (processed securely via Razorpay — we do not store card details)</li>
        </ul>
        <h3>Documents Uploaded</h3>
        <ul>
          <li>Passport scans and photographs</li>
          <li>Bank statements, flight tickets, hotel bookings</li>
          <li>Any supporting documents for visa application</li>
        </ul>
        <h3>Automatically Collected Data</h3>
        <ul>
          <li>IP address, browser type, device type</li>
          <li>Pages visited, time spent, referral source</li>
          <li>Cookies and session data</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To process and submit your visa application to the relevant embassy or consulate</li>
          <li>To communicate application status via email and WhatsApp</li>
          <li>To verify your identity and documents for accuracy</li>
          <li>To process payments and issue receipts</li>
          <li>To comply with legal and regulatory requirements</li>
          <li>To improve our services and prevent fraud</li>
        </ul>

        <h2>3. Data Sharing</h2>
        <p>We share your data only as necessary to process your visa:</p>
        <ul>
          <li><strong style={{color:"#F5F0E8"}}>Embassies &amp; Consulates:</strong> Your application data is submitted to the relevant government authority</li>
          <li><strong style={{color:"#F5F0E8"}}>Razorpay:</strong> Payment processing (PCI-DSS compliant)</li>
          <li><strong style={{color:"#F5F0E8"}}>Supabase:</strong> Secure cloud database for application storage</li>
          <li><strong style={{color:"#F5F0E8"}}>Google Cloud Vision:</strong> Passport OCR (document scanning only)</li>
        </ul>
        <p>We do <strong style={{color:"#E85D4A"}}>not</strong> sell, rent, or share your personal data with any third-party marketers.</p>

        <h2>4. Data Security</h2>
        <ul>
          <li>All data is encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
          <li>Access to your data is restricted to authorised MyTripLooker staff only</li>
          <li>Documents are stored securely and deleted after visa processing is complete (within 180 days)</li>
          <li>Payment data is handled by Razorpay and never stored on our servers</li>
        </ul>

        <h2>5. Cookies</h2>
        <p>We use essential cookies to maintain your session and preferences. We use analytics cookies (Google Analytics) to understand how users interact with our site. You may disable cookies in your browser settings, but this may affect functionality.</p>

        <h2>6. Your Rights</h2>
        <p>Under applicable Indian law and GDPR (for EU residents), you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data (subject to legal obligations)</li>
          <li>Withdraw consent for marketing communications</li>
        </ul>
        <p>To exercise these rights, email us at <a href="mailto:sales@mytriplooker.com">sales@mytriplooker.com</a>.</p>

        <h2>7. Data Retention</h2>
        <p>We retain application data for 3 years for legal compliance. Documents are deleted within 180 days of visa delivery. You may request earlier deletion by contacting us.</p>

        <h2>8. Children&apos;s Privacy</h2>
        <p>Our services are not directed at children under 18. We do not knowingly collect data from minors without parental consent.</p>

        <h2>9. Changes to This Policy</h2>
        <p>We may update this Privacy Policy periodically. Changes will be posted here with the updated date. Continued use of our services constitutes acceptance of the updated policy.</p>

        <h2>10. Contact Us</h2>
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
