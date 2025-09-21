import React, { useRef, useEffect, useCallback, useState } from "react";
import "../styles.css";

const InteractiveCard = ({ children, className = '' }) => {
    const cardRef = useRef(null);
    const particlesRef = useRef([]);
    const timeoutsRef = useRef([]);
    const isHoveredRef = useRef(false);
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth <= 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);
  
    const createParticle = (x, y) => {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: #8400ff;
        box-shadow: 0 0 6px rgba(132, 0, 255, 0.6);
        pointer-events: none;
        z-index: 100;
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        opacity: 0;
      `;
      return particle;
    };
  
    const clearParticles = useCallback(() => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      particlesRef.current.forEach(particle => {
        if (particle.parentNode) {
          particle.style.transition = 'all 0.3s ease';
          particle.style.transform = 'scale(0)';
          particle.style.opacity = '0';
          setTimeout(() => particle.parentNode?.removeChild(particle), 300);
        }
      });
      particlesRef.current = [];
    }, []);
  
    const animateParticles = useCallback(() => {
      if (!cardRef.current || !isHoveredRef.current) return;
  
      for (let i = 0; i < 6; i++) {
        const timeoutId = setTimeout(() => {
          if (!isHoveredRef.current || !cardRef.current) return;
  
          const rect = cardRef.current.getBoundingClientRect();
          const x = Math.random() * rect.width;
          const y = Math.random() * rect.height;
          
          const particle = createParticle(x, y);
          cardRef.current.appendChild(particle);
          particlesRef.current.push(particle);
  
          setTimeout(() => {
            particle.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            particle.style.transform = 'scale(1)';
            particle.style.opacity = '1';
          }, 10);
  
          const animate = () => {
            if (!isHoveredRef.current) return;
            const moveX = (Math.random() - 0.5) * 40;
            const moveY = (Math.random() - 0.5) * 40;
            particle.style.transition = 'all 2s ease-in-out';
            particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(1)`;
            setTimeout(() => {
              if (!isHoveredRef.current) return;
              particle.style.transform = `translate(${-moveX}px, ${-moveY}px) scale(1)`;
              setTimeout(animate, 2000);
            }, 2000);
          };
          setTimeout(animate, 300);
  
        }, i * 100);
        timeoutsRef.current.push(timeoutId);
      }
    }, []);
  
    useEffect(() => {
      if (isMobile || !cardRef.current) return;
  
      const element = cardRef.current;
  
      const handleMouseEnter = () => {
        isHoveredRef.current = true;
        animateParticles();
        element.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        element.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg)';
      };
  
      const handleMouseLeave = () => {
        isHoveredRef.current = false;
        clearParticles();
        element.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px)';
        element.style.boxShadow = '';
      };
  
      const handleMouseMove = (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
  
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        const magnetX = (x - centerX) * 0.03;
        const magnetY = (y - centerY) * 0.03;
  
        element.style.transition = 'transform 0.1s ease';
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${magnetX}px) translateY(${magnetY}px)`;
        
        const intensity = Math.min(1, Math.max(0, 1 - Math.hypot(x - centerX, y - centerY) / (Math.max(rect.width, rect.height) / 2)));
        element.style.boxShadow = `0 0 ${20 * intensity}px rgba(132, 0, 255, ${0.3 * intensity})`;
      };
  
      const handleClick = (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
  
        const ripple = document.createElement('div');
        const maxDistance = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
          position: absolute;
          width: ${maxDistance * 2}px;
          height: ${maxDistance * 2}px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(132, 0, 255, 0.4) 0%, rgba(132, 0, 255, 0.2) 30%, transparent 70%);
          left: ${x - maxDistance}px;
          top: ${y - maxDistance}px;
          pointer-events: none;
          z-index: 1000;
          transform: scale(0);
          opacity: 1;
          transition: all 0.8s ease;
        `;
  
        element.appendChild(ripple);
        setTimeout(() => {
          ripple.style.transform = 'scale(1)';
          ripple.style.opacity = '0';
        }, 10);
        setTimeout(() => ripple.remove(), 800);
      };
  
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('click', handleClick);
  
      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('click', handleClick);
        clearParticles();
      };
    }, [animateParticles, clearParticles, isMobile]);
  
    return (
        <div
          ref={cardRef}
          className={className}
          style={{ 
            position: 'relative', 
            overflow: 'hidden',
            border: '1px solid rgba(132, 0, 255, 0.1)',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
          }}
        >
          {children}
        </div>
      );
  };

// Add this GlobalSpotlight component after your InteractiveCard component
const GlobalSpotlight = ({ containerRef }) => {
    const spotlightRef = useRef(null);
  
    useEffect(() => {
      if (!containerRef?.current) return;
  
      const spotlight = document.createElement('div');
      spotlight.style.cssText = `
        position: fixed;
        width: 600px;
        height: 600px;
        border-radius: 50%;
        pointer-events: none;
        background: radial-gradient(circle,
          rgba(132, 0, 255, 0.15) 0%,
          rgba(132, 0, 255, 0.08) 15%,
          rgba(132, 0, 255, 0.04) 25%,
          rgba(132, 0, 255, 0.02) 40%,
          rgba(132, 0, 255, 0.01) 65%,
          transparent 70%
        );
        z-index: 50;
        opacity: 0;
        transform: translate(-50%, -50%);
        mix-blend-mode: screen;
        transition: opacity 0.3s ease;
      `;
      document.body.appendChild(spotlight);
      spotlightRef.current = spotlight;
  
      const handleMouseMove = (e) => {
        if (!spotlightRef.current || !containerRef.current) return;
  
        const containerRect = containerRef.current.getBoundingClientRect();
        const mouseInContainer = 
          e.clientX >= containerRect.left && 
          e.clientX <= containerRect.right && 
          e.clientY >= containerRect.top && 
          e.clientY <= containerRect.bottom;
  
        if (mouseInContainer) {
          spotlightRef.current.style.left = e.clientX + 'px';
          spotlightRef.current.style.top = e.clientY + 'px';
          spotlightRef.current.style.opacity = '1';
  
          // Enhanced glow for cards under spotlight
          const cards = containerRef.current.querySelectorAll('.card');
          cards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const distance = Math.hypot(e.clientX - cardCenterX, e.clientY - cardCenterY);
            const maxDistance = 300;
            
            if (distance <= maxDistance) {
              const intensity = (maxDistance - distance) / maxDistance;
              card.style.boxShadow = `
                0 0 ${30 * intensity}px rgba(132, 0, 255, ${0.4 * intensity}),
                inset 0 0 ${20 * intensity}px rgba(132, 0, 255, ${0.1 * intensity})
              `;
              card.style.borderColor = `rgba(132, 0, 255, ${0.5 * intensity})`;
            } else {
              card.style.boxShadow = '';
              card.style.borderColor = '';
            }
          });
        } else {
          spotlightRef.current.style.opacity = '0';
          // Reset card glows
          const cards = containerRef.current.querySelectorAll('.card');
          cards.forEach(card => {
            card.style.boxShadow = '';
            card.style.borderColor = '';
          });
        }
      };
  
      const handleMouseLeave = () => {
        if (spotlightRef.current) {
          spotlightRef.current.style.opacity = '0';
        }
        // Reset all card effects
        const cards = containerRef.current?.querySelectorAll('.card');
        cards?.forEach(card => {
          card.style.boxShadow = '';
          card.style.borderColor = '';
        });
      };
  
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
  
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        if (spotlightRef.current) {
          spotlightRef.current.remove();
        }
      };
    }, [containerRef]);
  
    return null;
  };

export default function About() {

    const containerRef = useRef(null);

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
        <main className="container" ref={containerRef}>
        <GlobalSpotlight containerRef={containerRef} />
        {/* <main className="container"> */}
        
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
                                ✨ <strong>Ecstasy Ventures – Execution &gt; Ideas.</strong>
                            </p>
                        </div>
                    </div>
                </div>

                {/* <div className="mission-vision-grid">
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
                </div> */}
                <div className="mission-vision-grid">
                  <InteractiveCard className="card">
                    <h4>Mission</h4>
                    <ul>
                      {missionPoints.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </InteractiveCard>
                  <InteractiveCard className="card">
                    <h4>Vision</h4>
                    <ul>
                      {visionPoints.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </InteractiveCard>
                </div>
            </section>

            {/* <section className="section">
                <h3 className="center">Core Values</h3>
                
                <div className="grid grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
                  {coreValues.map((value, idx) => (
                    <InteractiveCard className="card" key={idx}>
                      <strong>{value.title}</strong>
                      <div className="small">{value.desc}</div>
                    </InteractiveCard>
                  ))}
                </div>
            </section> */}
            <section className="section">
                <h3 className="center">Core Values</h3>
                <div 
                    className="core-values-grid" 
                    style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(3, 1fr)', 
                        gap: '1.5rem', 
                        alignItems: 'stretch' 
                    }}
                >
                    {coreValues.map((value, idx) => (
                        <InteractiveCard 
                            className="card" 
                            key={idx}
                            style={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                minHeight: '200px'
                            }}
                        >
                            <strong style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                                {value.title}
                            </strong>
                            <div className="small" style={{ flex: 1 }}>
                                {value.desc}
                            </div>
                        </InteractiveCard>
                    ))}
                </div>
                
                {/* Add responsive styles */}
                <style jsx>{`
                    @media (max-width: 1024px) {
                        .core-values-grid {
                            grid-template-columns: repeat(2, 1fr) !important;
                        }
                    }
                    
                    @media (max-width: 768px) {
                        .core-values-grid {
                            grid-template-columns: 1fr !important;
                            gap: 1rem !important;
                        }
                    }
                `}</style>
            </section>

            <section className="section">
                <h3 className="center">Why Startups Love Us</h3>
                {/* <div className="grid grid-3">
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
                </div> */}
                <div className="grid grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
                  <InteractiveCard className="card">
                    <strong>End-to-End Support</strong>
                    <p className="small">We handle product, branding, marketing, and growth — so founders can focus entirely on their vision.</p>
                  </InteractiveCard>
                  <InteractiveCard className="card">
                    <strong>Equity-Based Model</strong>
                    <p className="small">No upfront fees. We succeed only when you succeed, aligning our incentives with your startup's growth.</p>
                  </InteractiveCard>
                  <InteractiveCard className="card">
                    <strong>Investor Network</strong>
                    <p className="small">Access our network of investors, mentors, and strategic partners to accelerate funding and scaling opportunities.</p>
                  </InteractiveCard>
                </div>
            </section>
        </main>
    );
}