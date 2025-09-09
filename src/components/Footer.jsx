import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import "../styles.css";

export default function Footer() {
    return (
        <footer>
            <div className="logo-mark">
                <img src="/logo.jpg" alt="Logo" />
            </div>
            <div style={{ marginBottom: '16px', fontWeight: '700', fontSize: '18px' }}>
                Ecstasy Ventures
            </div>
            <div style={{ marginBottom: '20px', color: '#ccc', fontSize: '16px' }}>
                By a startup. For the startups.
            </div>
            <div style={{ marginBottom: '12px', fontSize: '16px' }}>
                © {new Date().getFullYear()} Ecstasy Ventures •
                <a href="mailto:jigar@ecstasyventures.com"><FaEnvelope style={{ margin: '0 5px' }} /></a>
                <a href="https://www.linkedin.com/company/ecstasyventures" target="_blank" rel="noreferrer"><FaLinkedin style={{ margin: '0 5px' }} /></a>
                <a href="https://www.instagram.com/ecstasy_ventures_" target="_blank" rel="noreferrer"><FaInstagram style={{ margin: '0 5px' }} /></a>
            </div>
            <div>
                <Link to="/terms">Terms & Conditions</Link> • <Link to="/privacy">Privacy Policy</Link>
            </div>
        </footer>
    );
}
