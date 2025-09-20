import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginModal from "./LoginModal"; // import modal
import "../styles.css";

export default function Header() {
    const [showLogin, setShowLogin] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }

        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

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
                    {/* <Link to="/portfolio">Portfolio</Link> */}
                    <Link to="/contact">Contact</Link>
                    <button
                        className="admin-btn"
                        onClick={() => setShowLogin(true)}
                    >
                        Login
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