import "../styles.css";
import "../master.css";

export default function Solution() {
    return (
        <section className="section" id="solution">
            <div>
                <h3>Our Solution</h3>
                <p>
                    We provide end-to-end execution for early-stage startups — product, brand, growth,
                    and investor readiness — in exchange for milestone-based equity so founders keep cash for runway.
                </p>

                <div className="grid-3 solution-grid">
                    <div className="feature">
                        <h4>Tech & Product</h4>
                        <div className="small">End-to-end development: MVP, iteration, scalable architecture.</div>
                    </div>
                    <div className="feature">
                        <h4>Brand & Design</h4>
                        <div className="small">Brand identity, UI/UX, and product experience that converts.</div>
                    </div>
                    <div className="feature">
                        <h4>Growth & Fundraising</h4>
                        <div className="small">Performance marketing, growth strategy, and investor introductions.</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
