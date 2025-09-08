import "../styles.css";

export default function Header() {
    return (
        <header>
            <div className="brand">
                <img src="/logo.jpg" alt="Ecstasy Ventures" />
                <div>
                    <h1>Ecstasy Ventures</h1>
                    <p>By a startup. For the startups.</p>
                </div>
            </div>

            <nav>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#portfolio">Portfolio</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
    );
}
