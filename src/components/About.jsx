import React from "react";
import "../styles.css"; 
export default function About() {
    const missionPoints = [
        "Break early-stage barriers that prevent startups from reaching their full potential.",
        "Offer complete technology, marketing, and growth support in exchange for equity — no upfront costs.",
        "Free founders to focus entirely on building their dream without financial strain.",
        "Leverage our network of investors, mentors, and industry experts to accelerate growth.",
        "Act as the extended team, loudest cheerleaders, and strategic growth partners for every startup we work with."
    ];

    const visionPoints = [
        "Be the most trusted growth partner for ambitious startups.",
        "Empower founders to transform bold ideas into thriving, world-changing businesses.",
        "Remove the barriers of limited funds, limited networks, or limited resources.",
        "Create a future where every great startup can scale fearlessly.",
        "Build a team that believes in the founder’s vision as much as they do."
    ];

    const coreValues = [
        {
            title: "Founder First",
            desc: "We prioritize the vision and success of founders, offering tailored support and resources to empower their entrepreneurial journey."
        },
        {
            title: "Innovation",
            desc: "We embrace creativity and continuous innovation to drive breakthrough solutions and help startups scale new heights."
        },
        {
            title: "Transparency",
            desc: "We conduct our business with honesty, openness, and ethical practices, building trust with our partners and clients."
        },
        {
            title: "Agility and Adaptability",
            desc: "We stay flexible and quick to respond in the fast-evolving startup ecosystem, always ready to pivot and optimize."
        },
        {
            title: "Accountability",
            desc: "We set high standards for ourselves and take responsibility for delivering measurable results with professionalism."
        },
        {
            title: "Customer and Market Focus",
            desc: "We deeply understand market needs and customer pain points, guiding startups to create meaningful and scalable solutions."
        }
    ];

    return (
        <main className="container">
            <section className="section">
                <div className="center">
                    <h3>Our Story</h3>
                    <div className="about-story-container">
                        <div className="about-story">
                            <p className="small">
                                Every great venture begins with a question. For us, it was simple: 
                                "Why do so many brilliant startup ideas in India never see the light of day?"
                            </p>
                            <p className="small">
                                In 2024, our Founder & CEO, Jigar Shah, witnessed firsthand how thousands of aspiring entrepreneurs—especially from Tier-2 and Tier-3 India—struggled to take their ideas forward. The challenges weren't passion or innovation, but a lack of the right ecosystem: no access to advanced technology, no guidance on branding, complicated legal hurdles, and limited connections with investors.
                            </p>
                            <p className="small">
                                That gap gave birth to Ecstasy Ventures Pvt Ltd (under Strivio Pvt Ltd).
                            </p>
                            <p className="small">
                                We started with a bold belief:<br />
                                👉 <strong>"By a startup, for the startups."</strong>
                            </p>
                            <p className="small">
                                Unlike traditional agencies or consultants, Ecstasy Ventures was built as a co-builder—a true partner for founders. Our unique equity-plus-services model ensures we grow with the startups we support.
                            </p>
                            <p className="small">
                                From the very beginning, our mission has been clear:
                            </p>
                            <ul className="about-list">
                                <li>To make entrepreneurship accessible for every founder.</li>
                                <li>To provide end-to-end support in tech, branding, legal, and investor readiness.</li>
                                <li>To create a movement of founders, not just a company.</li>
                            </ul>
                            <p className="small">
                                Today, Ecstasy Ventures is more than a venture studio. It's a startup ecosystem enabler, designed to empower 1,000+ entrepreneurs in the coming decade, and prove to the world that world-class businesses can rise from every corner of India.
                            </p>
                            <p className="small">
                                This is not just our story—it's the story of every founder who dares to dream, and every idea that deserves to scale.
                            </p>
                            <p className="small">
                                ✨ <strong>Ecstasy Ventures – Execution > Ideas.</strong>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mission-vision-grid">
                    <div className="card">
                        <h4>Mission</h4>
                        <ul>
                            {missionPoints.map((point, idx) => (
                                <li key={idx}>{point}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="card">
                        <h4>Vision</h4>
                        <ul>
                            {visionPoints.map((point, idx) => (
                                <li key={idx}>{point}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="section">
                <h3 className="center">Core Values</h3>
                <div className="grid grid-3">
                    {coreValues.map((value, idx) => (
                        <div className="card" key={idx}>
                            <strong>{value.title}</strong>
                            <div className="small">{value.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section">
                <h3 className="center">Why Startups Love Us</h3>
                <div className="grid grid-3">
                    <div className="card">
                        <strong>End-to-End Support</strong>
                        <p className="small">We handle product, branding, marketing, and growth — so founders can focus entirely on their vision.</p>
                    </div>
                    <div className="card">
                        <strong>Equity-Based Model</strong>
                        <p className="small">No upfront fees. We succeed only when you succeed, aligning our incentives with your startup's growth.</p>
                    </div>
                    <div className="card">
                        <strong>Investor Network</strong>
                        <p className="small">Access our network of investors, mentors, and strategic partners to accelerate funding and scaling opportunities.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}