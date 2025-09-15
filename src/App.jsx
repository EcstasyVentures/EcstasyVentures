import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import Dashboard from "./components/Dashboard";
import "./styles.css";

function Layout({ children }) {
    const location = useLocation();
    const hideHeaderFooter = location.pathname === "/dashboard";

    return (
        <>
            {!hideHeaderFooter && <Header />}
            <main>{children}</main>
            {!hideHeaderFooter && <Footer />}
        </>
    );
}

export default function App() {
    return (
        <Router>
            <Layout>
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
                    {/* Other Pages */}
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/terms" element={<Terms />} />

                    {/* Dashboard (no header/footer) */}
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Layout>
        </Router>
    );
}
