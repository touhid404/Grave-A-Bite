export const getEmailVerificationTemplate = (userName: string, verificationUrl: string) => {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verification Protocol | GrabABite</title>
  <style type="text/css">
    body { margin: 0; padding: 0; background-color: #030712; font-family: 'Inter', 'Segoe UI', Roboto, sans-serif; }
    table { border-collapse: collapse; }
    .main-wrapper { padding: 40px 20px; }
    .container { max-width: 600px; background-color: #09090b; border-radius: 48px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.05); overflow: hidden; box-shadow: 0 40px 100px -20px rgba(0,0,0,0.5); }
    
    .glow-header { background: radial-gradient(circle at 50% 0%, rgba(212, 255, 51, 0.15) 0%, transparent 70%); padding: 60px 40px 30px; text-align: center; }
    .brand-accent { display: inline-block; padding: 8px 16px; background: rgba(212, 255, 51, 0.05); border: 1px solid rgba(212, 255, 51, 0.2); border-radius: 100px; margin-bottom: 24px; }
    .brand-accent-text { color: #D4FF33; font-size: 10px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; }
    
    .logo-text { font-size: 38px; font-weight: 900; color: #ffffff; letter-spacing: -2px; text-transform: uppercase; font-style: italic; margin: 0; }
    .logo-text span { color: #D4FF33; font-style: normal; }
    
    .hero-content { padding: 0 50px 40px; text-align: center; }
    .display-heading { font-size: 48px; color: #ffffff; font-weight: 900; text-transform: uppercase; font-style: italic; letter-spacing: -3px; line-height: 0.9; margin: 0 0 25px 0; }
    .highlight { color: #D4FF33; }
    
    .body-copy { font-size: 16px; color: #94a3b8; line-height: 1.6; font-weight: 500; margin-bottom: 40px; }
    .user-greeting { color: #ffffff; font-weight: 700; }
    
    .action-zone { background: rgba(255,255,255,0.02); border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); padding: 50px 40px; text-align: center; }
    .verify-btn { background-color: #D4FF33; color: #000000 !important; padding: 24px 60px; text-decoration: none; font-weight: 900; border-radius: 30px; display: inline-block; text-transform: uppercase; font-style: italic; font-size: 20px; letter-spacing: -0.5px; box-shadow: 0 20px 40px -10px rgba(212, 255, 51, 0.3); }
    
    .meta-details { padding: 40px 50px; text-align: center; color: #475569; font-size: 12px; font-weight: 600; line-height: 1.5; }
    .security-token { display: inline-block; margin-top: 15px; padding: 6px 12px; background: rgba(255,255,255,0.03); border-radius: 8px; font-family: monospace; color: #64748b; }
    
    .footer { background-color: #020617; padding: 50px 40px; text-align: center; }
    .footer-brand { color: #ffffff; font-weight: 900; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; }
    .footer-tag { color: #D4FF33; opacity: 0.6; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 4px; font-style: italic; }
  </style>
</head>
<body>
  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="main-wrapper">
    <tr>
      <td align="center">
        <table class="container" width="600" border="0" cellspacing="0" cellpadding="0">
          <!-- Header with Radial Glow -->
          <tr>
            <td class="glow-header">
              <div class="brand-accent">
                <span class="brand-accent-text">Secure Access</span>
              </div>
              <h1 class="logo-text">GrabA<span>Bite</span></h1>
            </td>
          </tr>
          
          <!-- Hero Text -->
          <tr>
            <td class="hero-content">
              <h2 class="display-heading">VERIFY YOUR <span class="highlight">IDENTITY</span></h2>
              <p class="body-copy">
                Hello <span class="user-greeting">${userName}</span>,<br /><br />
                Welcome to the local culinary elite. You're one step away from unlocking visionary flavors. Authenticate your account to proceed.
              </p>
            </td>
          </tr>
          
          <!-- Call to Action Section -->
          <tr>
            <td class="action-zone">
              <a href="${verificationUrl}" class="verify-btn">Authenticate Now</a>
            </td>
          </tr>
          
          <!-- Security Notice -->
          <tr>
            <td class="meta-details">
              This verification protocol expires in 24 hours.<br />
              If you did not initiate this request, no action is required.
              <div class="security-token">ID: GB-${Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td class="footer">
              <div class="footer-brand">GrabABite &copy; 2026</div>
              <div class="footer-tag">Flavor Architecture</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
