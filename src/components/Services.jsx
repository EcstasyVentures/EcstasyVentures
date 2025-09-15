import React from "react";
import "../styles.css";

export default function Services() {
    const servicePoints = [
        {
            title: "Startup Funding & Investment",
            desc: "Seed funding for early-stage ventures, Growth capital for scaling businesses."
        },
        {
            title: "Business Strategy & Mentorship",
            desc: "Founder coaching & leadership development, Market entry strategies, Product-market fit guidance."
        },
        {
            title: "Branding & Marketing",
            desc: "Performance marketing, PR, content, and growth funnels."
        },
        {
            title: "Fundraising Support",
            desc: "Pitch decks, investor intros, and fundraising strategy to help you secure capital when you’re ready."
        },
        {
            title: "Tech & Product Development",
            desc: "MVP (Minimum Viable Product) design & build, UI/UX design services, Software development partnerships."
        },
        {
            title: "Operations & Scaling Support",
            desc: "Recruitment & talent acquisition help, Process optimization, International expansion guidance."
        }
    ];

    return (
        <main className="container">
            <section className="section center">
                <h3>What We Do</h3>
                <p className="small service-intro">
                    We provide end-to-end startup execution: product development, design, growth, and investor readiness. You keep your cash — we work for equity.
                </p>
                <div className="grid grid-3">
                    {servicePoints.map((service, idx) => (
                        <div className="card" key={idx}>
                            <h4>{service.title}</h4>
                            <p className="small">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
