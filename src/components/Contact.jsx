import React from "react";
import "../styles.css";

export default function Contact() {
    return (
        <main className="container">
            <section className="section center">
                <h3>Get in Touch</h3>
                <p className="small contact-intro">
                    Ready to partner? Fill the form or email us directly at <strong>jigar@ecstasyventures.com</strong>.
                </p>

                <div className="contact-form">
                    <form action="mailto:jigar@ecstasyventures.com" method="post" enctype="text/plain">
                        <input className="input" type="text" name="name" placeholder="Your Name" required />
                        <input className="input" type="email" name="email" placeholder="Your Email" required />
                        <input className="input" type="text" name="startup" placeholder="Startup Name (optional)" />
                        <textarea className="input" name="message" rows="6" placeholder="How can we help?" required></textarea>
                        <div className="center-cta">
                            <button className="btn btn-primary" type="submit">Send Message</button>
                            <a className="btn" href="mailto:jigar@ecstasyventures.com">Or Email Directly</a>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
