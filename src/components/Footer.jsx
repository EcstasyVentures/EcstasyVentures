import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagram, FaEnvelope, FaArrowUp } from "react-icons/fa";
import "../styles.css";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <div className="logo-mark">
                        <img src="/logo.jpg" alt="Ecstasy Ventures Logo" />
                    </div>
                    <h2 className="brand-name">Ecstasy Ventures</h2>
                    <p className="tagline">By a startup. For the startups.</p>
                </div>

                <div className="footer-links">
                    <div className="footer-column">
                        <h3>Company</h3>
                        <ul>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/team">Our Team</Link></li>
                            <li><Link to="/careers">Careers</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>Resources</h3>
                        <ul>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/resources">Resources</Link></li>
                            <li><Link to="/events">Events</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>Legal</h3>
                        <ul>
                            <li><Link to="/terms">Terms & Conditions</Link></li>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                            <li><Link to="/cookies">Cookie Policy</Link></li>
                            <li><Link to="/disclaimer">Disclaimer</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-newsletter">
                    <h3>Stay Updated</h3>
                    <form className="newsletter-form">
                        <input type="email" placeholder="Your email" required />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="social-icons">
                    <a href="mailto:jigar@ecstasyventures.com" aria-label="Email">
                        <FaEnvelope />
                    </a>
                    <a href="https://www.linkedin.com/company/ecstasyventures" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                        <FaLinkedin />
                    </a>
                    <a href="https://www.instagram.com/ecstasy_ventures_" target="_blank" rel="noreferrer" aria-label="Instagram">
                        <FaInstagram />
                    </a>
                </div>

                <div className="copyright">
                    © {new Date().getFullYear()} Ecstasy Ventures. All rights reserved.
                </div>

                <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
                    <FaArrowUp />
                </button>
            </div>
        </footer>
    );
}