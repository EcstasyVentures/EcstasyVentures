import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginModal from "./LoginModal"; // import modal
import "../styles.css";

export default function Header() {
    const [showLogin, setShowLogin] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // Apply theme class to body when darkMode changes
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }

        // Save theme preference to localStorage
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    // Check for saved theme preference or respect OS preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setDarkMode(true);
        }
    }, []);

    return (
        <>
            <header>
                <div className="brand">
                    <img src="/logo.jpg" alt="Ecstasy Ventures" />
                    <div>
                        <h1>Ecstasy Ventures</h1>
                        <p>By a startup. For the startups.</p>
                    </div>
                </div>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/portfolio">Portfolio</Link>
                    <Link to="/contact">Contact</Link>
                    <button
                        className="admin-btn"
                        onClick={() => setShowLogin(true)}
                    >
                        Admin Login
                    </button>
                    <button
                        className="theme-toggle"
                        onClick={toggleDarkMode}
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                </nav>
            </header>
            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </>
    );
}