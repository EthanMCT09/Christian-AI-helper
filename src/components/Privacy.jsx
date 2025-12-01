import React from 'react';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-content">
        <h1>Privacy Policy & Data Protection</h1>
        <p className="last-updated">Last updated: November 28, 2025</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            FaithGPT ("we," "us," "our," or "Company") is committed to protecting your privacy
            and ensuring you have a positive experience on our platform. This Privacy Policy explains
            our data handling practices, security measures, and your rights.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li><strong>Personal Information:</strong> First name, last name, email address, date of birth, and password (encrypted)</li>
            <li><strong>Conversation Data:</strong> All conversations with FaithGPT are encrypted and stored securely</li>
            <li><strong>Device Information:</strong> Browser type, IP address, operating system, and device type (for analytics)</li>
            <li><strong>Usage Analytics:</strong> Pages visited, features used, interaction patterns (aggregated and anonymized)</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use collected information for the following purposes:</p>
          <ul>
            <li>To provide and maintain FaithGPT services</li>
            <li>To authenticate your account and ensure security</li>
            <li>To improve our AI's understanding and responses</li>
            <li>To analyze usage patterns and improve user experience</li>
            <li>To send important security and service updates (optional marketing emails)</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Encryption & Security</h2>
          <p>
            Your conversations with FaithGPT are protected through industry-standard encryption:
          </p>
          <ul>
            <li><strong>Conversation Encryption:</strong> All chat messages are encrypted using AES-256 before storage</li>
            <li><strong>Password Security:</strong> Passwords are hashed and salted using Firebase Authentication</li>
            <li><strong>Transmission Security:</strong> All data transmitted between your device and our servers is encrypted via HTTPS/TLS</li>
            <li><strong>Firestore Security:</strong> Firebase Firestore rules restrict access to only your own data</li>
          </ul>
        </section>

        <section>
          <h2>5. Personal Information & Sensitive Data</h2>
          <p>
            If you choose to share personal, mental health, or sensitive information with FaithGPT,
            please be aware:
          </p>
          <ul>
            <li>All data is encrypted and stored securely</li>
            <li>FaithGPT does not sell or share your data with third parties</li>
            <li>You maintain full control and can delete your account and all associated data at any time</li>
            <li>For mental health crises, FaithGPT directs you to professional resources (988, crisis text lines, etc.)</li>
            <li>FaithGPT is NOT a replacement for professional mental health care or medical advice</li>
          </ul>
        </section>

        <section>
          <h2>6. Third-Party Services</h2>
          <p>FaithGPT uses the following third-party services:</p>
          <ul>
            <li><strong>Firebase (Google):</strong> Authentication, database, and hosting</li>
            <li><strong>Google Analytics:</strong> Aggregated usage analytics (no personal data)</li>
            <li><strong>OAuth Providers:</strong> Google, Apple, Microsoft for authentication</li>
          </ul>
          <p>
            These services have their own privacy policies. We recommend reviewing them at:
            <br />
            - Google: https://policies.google.com/privacy
            <br />
            - Apple: https://www.apple.com/privacy/
            <br />
            - Microsoft: https://privacy.microsoft.com/
          </p>
        </section>

        <section>
          <h2>7. Data Retention</h2>
          <ul>
            <li><strong>Account Data:</strong> Retained for as long as your account is active</li>
            <li><strong>Conversations:</strong> Retained for as long as you wish; you can delete specific messages or entire chats</li>
            <li><strong>Analytics:</strong> Aggregated analytics retained for up to 24 months</li>
            <li><strong>Upon Account Deletion:</strong> All personal data and conversations are permanently deleted within 30 days</li>
          </ul>
        </section>

        <section>
          <h2>8. Your Rights & Control</h2>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access:</strong> View all data we have about you</li>
            <li><strong>Correction:</strong> Correct inaccurate information</li>
            <li><strong>Deletion:</strong> Delete your account and all associated data</li>
            <li><strong>Export:</strong> Export your conversations in a readable format</li>
            <li><strong>Opt-Out:</strong> Disable analytics and marketing emails</li>
            <li><strong>Portability:</strong> Request your data in a standard format</li>
          </ul>
        </section>

        <section>
          <h2>9. Cookies & Local Storage</h2>
          <p>
            FaithGPT uses:
          </p>
          <ul>
            <li><strong>Cookies:</strong> Session cookies for authentication (no tracking cookies)</li>
            <li><strong>Local Storage:</strong> To store your conversation history locally for fast access</li>
            <li><strong>User Preferences:</strong> Background theme, Bible version, tone preference</li>
          </ul>
          <p>You can clear cookies and local storage at any time through your browser settings.</p>
        </section>

        <section>
          <h2>10. Children's Privacy</h2>
          <p>
            FaithGPT is not intended for users under 13 years old. We do not knowingly collect
            information from children under 13. If we become aware of such collection, we will
            delete the account and data immediately.
          </p>
        </section>

        <section>
          <h2>11. Security Measures</h2>
          <p>We implement multiple security measures to protect your data:</p>
          <ul>
            <li>HTTPS/TLS encryption for all data transmission</li>
            <li>AES-256 encryption for stored conversations</li>
            <li>Firebase Security Rules to enforce access control</li>
            <li>Rate limiting and CORS protection to prevent abuse</li>
            <li>Regular security audits and vulnerability scanning</li>
            <li>No sharing of data with advertisers or marketing companies</li>
          </ul>
        </section>

        <section>
          <h2>12. Policy Changes</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any
            significant changes via email or through the FaithGPT platform. Your continued
            use of FaithGPT after changes constitutes your acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2>13. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, your data, or how FaithGPT handles
            your information, please contact us at:
          </p>
          <p>
            📧 <strong>Email:</strong> privacy@faithgpt.example.com
            <br />
            📱 <strong>Support:</strong> support@faithgpt.example.com
            <br />
            🌐 <strong>Website:</strong> www.faithgpt.example.com
          </p>
        </section>

        <section>
          <h2>14. Additional Resources</h2>
          <ul>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#accessibility">Accessibility Statement</a></li>
            <li><a href="#support">Support Center</a></li>
          </ul>
        </section>

        <div className="privacy-footer">
          <p>
            ✝️ <strong>FaithGPT — Compassionate, Secure, Faith-Centered</strong>
            <br />
            Your privacy and safety are our highest priorities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
