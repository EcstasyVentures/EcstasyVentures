import React from "react";
import "../styles.css";

export default function Terms() {
    return (
        <main className="terms-container">
            <section className="terms-section">
                <h2>Terms & Conditions</h2>
                <p className="small terms-intro">
                    These Terms & Conditions govern your use of the Ecstasy Ventures website, services, and related offerings. By accessing our website or working with us, you agree to comply with these terms.
                </p>

                <h3>1. Acceptance of Terms</h3>
                <p>By accessing our website, contacting us, or engaging in our services, you agree to be bound by these Terms & Conditions and our Privacy Policy.</p>

                <h3>2. Services</h3>
                <p>Ecstasy Ventures provides branding, design, consulting, and related services for startups. The scope, timeline, and costs of each project will be agreed upon in writing before work begins.</p>

                <h3>3. Intellectual Property</h3>
                <p>All content on our website (logos, text, graphics, etc.) is owned by Ecstasy Ventures. You may not reproduce or use our content without prior written consent.</p>

                <h3>4. Limits of Liabilities</h3>
                <p>We are not liable for the Losses incurred from your business decisions</p>

                <h3>5. Eligibility</h3>
                <p> You must be at least 18 years old to apply for our services.</p>

                <h3>6. Changes to Terms</h3>
                <p>We may update these Terms & Conditions at any time. Changes will be posted on this page with an updated revision date.</p>

                <h3>7. Contact Us</h3>
                <p>If you have any questions about these Terms & Conditions, please email us at <strong>jigar@ecstasyventures.com</strong>.</p>

                <p className="last-updated">
                    Last updated: {new Date().toLocaleDateString()}
                </p>
            </section>
        </main>
    );
}
