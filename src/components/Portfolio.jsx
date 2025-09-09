import React from "react";
import "../styles.css";

export default function Portfolio() {
    const portfolioItems = [
        {
            image: "portfolio1.jpg",
            title: "Startup A",
            description: "MVP built · 3x user growth in 60 days"
        },
        {
            image: "portfolio2.jpg",
            title: "Startup B",
            description: "Brand refresh · Raised pre-seed"
        },
        {
            image: "portfolio3.jpg",
            title: "Startup C",
            description: "GTM + paid funnels · 2x MRR in 90 days"
        }
    ];

    return (
        <main className="container">
            <section className="section center">
                <h3>Portfolio</h3>
                <p className="small portfolio-intro">
                    We’ll showcase real case studies here. For now, these are placeholders to show the layout.
                </p>
                <div className="grid grid-3">
                    {portfolioItems.map((item, idx) => (
                        <div className="card" key={idx}>
                            <img src={item.image} alt={item.title} className="portfolio-image" />
                            <strong>{item.title}</strong>
                            <div className="small">{item.description}</div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
