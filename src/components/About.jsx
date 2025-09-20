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
                    <p className="small about-story">
                        Ecstasy Ventures was founded by entrepreneurs who lived the early-stage grind. We built this company because founders shouldn't have to choose between building a product and paying the bills.
                        <strong> We provide teams, technology, branding, and growth support to startups in exchange for fair equity.</strong> Our goal is to help startups reach investor readiness faster and scale sustainably.
                    </p>
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