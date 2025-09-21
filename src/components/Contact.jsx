import React, { useState } from "react";
import "../styles.css";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        startup: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Use the full URL to the server
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    startup: '',
                    message: ''
                });
            } else {
                throw new Error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="container">
            <section className="section center">
                <h3>Get in Touch</h3>
                <p className="small contact-intro">
                    Ready to partner? Fill the form or email us directly.
                </p>

                {submitStatus === 'success' && (
                    <div className="success-message">
                        Thank you for your message! We'll get back to you soon.
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="error-message">
                        Something went wrong. Please try again or email us directly.
                    </div>
                )}

                <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="input"
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="input"
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="input"
                            type="text"
                            name="startup"
                            placeholder="Startup Name (optional)"
                            value={formData.startup}
                            onChange={handleChange}
                        />
                        <textarea
                            className="input"
                            name="message"
                            rows="6"
                            placeholder="How can we help?"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>

                        <div className="center-cta">
                            <button
                                className="btn btn-primary"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>

                            {/* Gmail direct link */}
                            <a
                                className="btn"
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=jigar@ecstasyventures.com&su=Partnership+Inquiry&body=Hi+Jigar,"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Or Email Directly
                            </a>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
