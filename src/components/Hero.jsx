import "../styles.css";
import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-left">
                <h2 className="hero-title">
                    The Thrill of Building,<br />Without the Bill.
                </h2>
                <p className="hero-sub">
                    Ecstasy Ventures partners with early-stage founders to build product,
                    brand, and growth — in exchange for fair, milestone-based equity.
                    We win only when you win.
                </p>

                <div className="hero-actions">
                    <Link to="/contact" className="btn-primary">Work with Us</Link>
                    <Link to="/about" className="btn">Learn More</Link>
                </div>
            </div>

            <div className="hero-right">
                <img src="/hero.jpg" alt="Hero" />
            </div>
        </section>
    );
}
