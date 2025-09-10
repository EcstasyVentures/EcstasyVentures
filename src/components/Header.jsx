import { Link } from "react-router-dom";
import { useState } from "react";
import LoginModal from "./LoginModal"; // import modal
import "../styles.css";

export default function Header() {
    const [showLogin, setShowLogin] = useState(false);

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
                </nav>
            </header>

            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </>
    );
}
