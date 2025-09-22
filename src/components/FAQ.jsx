import React, { useState } from 'react';
import '../styles.css';
import "../master.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What is Ecstasy Ventures?",
      answer: "Ecstasy Ventures is a startup studio that partners with early-stage founders to help them build, scale, and grow their businesses. We provide end-to-end support in tech, marketing, branding, legal, and fundraising — in exchange for equity, not upfront fees."
    },
    {
      question: "How is Ecstasy Ventures different from traditional agencies or consultants?",
      answer: "Unlike agencies that work on a fixed fee model, we invest our expertise and resources into your startup in return for equity. This ensures we grow only if you grow — making us a true long-term partner instead of a service provider."
    },
    {
      question: "What kind of startups do you work with?",
      answer: "We primarily work with early-stage startups (idea stage to pre-Series A) across multiple sectors such as tech, healthcare, consumer brands, edtech, and lifestyle. If you are a passionate founder with a scalable idea, we'd love to hear from you."
    },
    {
      question: "What services does Ecstasy Ventures provide?",
      answer: "We provide a 360° growth ecosystem for startups, including: \n- Tech development (websites, apps, dashboards, AI/automation tools)\n- Branding & design (logos, pitch decks, social media creatives)\n- Digital marketing & growth campaigns\n- Legal, compliance & company registration support\n- Fundraising & investor connects\n- Business strategy & mentorship"
    },
    {
      question: "Do I need to pay any upfront fees?",
      answer: "No. We usually work on an equity-based model, which means we only earn if your startup grows. However, third-party expenses (like cloud hosting, domain costs, software subscriptions, courier services, etc.) are borne by the startup."
    },
    {
      question: "How much equity do you usually take?",
      answer: "It depends on the scope of work and level of involvement. Typically, we take 5% to 20% equity depending on whether we're providing only tech/marketing support or a complete end-to-end growth partnership."
    },
    {
      question: "How can I apply to collaborate with Ecstasy Ventures?",
      answer: "You can simply fill out the Startup Onboarding Form on our website or reach out to us via email. Once we review your idea, our team will schedule a call to discuss possible collaboration."
    },
    {
      question: "Do you also invest money in startups?",
      answer: "Currently, we primarily invest our time, expertise, and resources. But through our network of investors, VCs, and angel partners, we can help raise funds for your startup when the time is right."
    },
    {
      question: "Will my idea remain confidential if I share it with you?",
      answer: "Absolutely. We take confidentiality seriously and sign an NDA (Non-Disclosure Agreement) with founders to ensure your idea and IP remain safe."
    },
    {
      question: "Can student founders or first-time entrepreneurs approach Ecstasy Ventures?",
      answer: "Yes! In fact, one of our key missions is to promote entrepreneurship among students and first-time founders in India. We provide mentorship and hands-on support so your ideas don't just stay ideas."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">
        Frequently Asked Questions
      </h1>
      
      <div>
        {faqData.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          >
            <button
              className="faq-question"
              onClick={() => toggleAccordion(index)}
            >
              <span>{faq.question}</span>
              <span className={`faq-arrow ${activeIndex === index ? 'active' : ''}`}>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M5 7.5L10 12.5L15 7.5" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            <div className="faq-answer">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;