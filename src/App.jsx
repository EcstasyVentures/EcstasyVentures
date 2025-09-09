import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Terms from "./components/Terms";
import Footer from "./components/Footer";
import "./styles.css";

export default function App() {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    {/* Home Page */}
                    <Route
                        path="/"
                        element={
                            <>
                                <Hero />
                                <Problem />
                                <Solution />
                            </>
                        }
                    />

                    {/* About Page */}
                    <Route path="/about" element={<About />} />

                    {/* Services Page */}
                    <Route path="/services" element={<Services />} />

                    {/* Portfolio Page */}
                    <Route path="/portfolio" element={<Portfolio />} />

                    {/* Contact Page */}
                    <Route path="/contact" element={<Contact />} />

                    {/* Terms Page */}
                    <Route path="/terms" element={<Terms />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}
