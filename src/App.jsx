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
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import FounderDashboard from "./components/FounderDashboard";
import LiquidEther from "./components/LiquidEther";
import "./styles.css";

function Layout({ children }) {
    const location = useLocation();
    const hideHeaderFooter = 
        location.pathname === "/dashboard" || location.pathname === "/founder-dashboard";

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
                                <div className="liquid-ether-background">
                                    <LiquidEther
                                        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                                        mouseForce={20}
                                        cursorSize={100}
                                        isViscous={false}
                                        viscous={30}
                                        iterationsViscous={32}
                                        iterationsPoisson={32}
                                        resolution={0.5}
                                        isBounce={false}
                                        autoDemo={true}
                                        autoSpeed={0.5}
                                        autoIntensity={2.2}
                                        takeoverDuration={0.25}
                                        autoResumeDelay={3000}
                                        autoRampDuration={0.6}
                                    />
                                </div>
                                <Hero />
                                <Problem />
                                <Solution />
                            </>
                        }
                    />
                    {/* Other Pages */}
                    <Route 
                        path="/about" 
                        element={
                            <>
                                <div className="liquid-ether-background">
                                    <LiquidEther
                                        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                                        mouseForce={20}
                                        cursorSize={100}
                                        isViscous={false}
                                        viscous={30}
                                        iterationsViscous={32}
                                        iterationsPoisson={32}
                                        resolution={0.5}
                                        isBounce={false}
                                        autoDemo={true}
                                        autoSpeed={0.5}
                                        autoIntensity={2.2}
                                        takeoverDuration={0.25}
                                        autoResumeDelay={3000}
                                        autoRampDuration={0.6}
                                    />
                                </div>
                                <About />
                            </>
                        } 
                    />
                    <Route 
                        path="/services" 
                        element={
                            <>
                                <div className="liquid-ether-background">
                                    <LiquidEther
                                        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                                        mouseForce={20}
                                        cursorSize={100}
                                        isViscous={false}
                                        viscous={30}
                                        iterationsViscous={32}
                                        iterationsPoisson={32}
                                        resolution={0.5}
                                        isBounce={false}
                                        autoDemo={true}
                                        autoSpeed={0.5}
                                        autoIntensity={2.2}
                                        takeoverDuration={0.25}
                                        autoResumeDelay={3000}
                                        autoRampDuration={0.6}
                                    />
                                </div>
                                <Services />
                            </>
                        } 
                    />
                    <Route 
                        path="/portfolio" 
                        element={
                            <>
                                <div className="liquid-ether-background">
                                    <LiquidEther
                                        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                                        mouseForce={20}
                                        cursorSize={100}
                                        isViscous={false}
                                        viscous={30}
                                        iterationsViscous={32}
                                        iterationsPoisson={32}
                                        resolution={0.5}
                                        isBounce={false}
                                        autoDemo={true}
                                        autoSpeed={0.5}
                                        autoIntensity={2.2}
                                        takeoverDuration={0.25}
                                        autoResumeDelay={3000}
                                        autoRampDuration={0.6}
                                    />
                                </div>
                                <Portfolio />
                            </>
                        } 
                    />
                    <Route 
                        path="/contact" 
                        element={
                            <>
                                <div className="liquid-ether-background">
                                    <LiquidEther
                                        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                                        mouseForce={20}
                                        cursorSize={100}
                                        isViscous={false}
                                        viscous={30}
                                        iterationsViscous={32}
                                        iterationsPoisson={32}
                                        resolution={0.5}
                                        isBounce={false}
                                        autoDemo={true}
                                        autoSpeed={0.5}
                                        autoIntensity={2.2}
                                        takeoverDuration={0.25}
                                        autoResumeDelay={3000}
                                        autoRampDuration={0.6}
                                    />
                                </div>
                                <Contact />
                            </>
                        } 
                    />
                    <Route 
                        path="/terms" 
                        element={
                            <>
                                <div className="liquid-ether-background">
                                    <LiquidEther
                                        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                                        mouseForce={20}
                                        cursorSize={100}
                                        isViscous={false}
                                        viscous={30}
                                        iterationsViscous={32}
                                        iterationsPoisson={32}
                                        resolution={0.5}
                                        isBounce={false}
                                        autoDemo={true}
                                        autoSpeed={0.5}
                                        autoIntensity={2.2}
                                        takeoverDuration={0.25}
                                        autoResumeDelay={3000}
                                        autoRampDuration={0.6}
                                    />
                                </div>
                                <Terms />
                            </>
                        } 
                    />
                    <Route 
                        path="/faq" 
                        element={
                            <>
                                <div className="liquid-ether-background">
                                    <LiquidEther
                                        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                                        mouseForce={20}
                                        cursorSize={100}
                                        isViscous={false}
                                        viscous={30}
                                        iterationsViscous={32}
                                        iterationsPoisson={32}
                                        resolution={0.5}
                                        isBounce={false}
                                        autoDemo={true}
                                        autoSpeed={0.5}
                                        autoIntensity={2.2}
                                        takeoverDuration={0.25}
                                        autoResumeDelay={3000}
                                        autoRampDuration={0.6}
                                    />
                                </div>
                                <FAQ />
                            </>
                        } 
                    />

                    {/* 
                        Dashboards (no header/footer) - COMMENTED OUT FOR PRODUCTION
                        These routes are disabled to prevent public access after deployment.
                        
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/founder-dashboard" element={<FounderDashboard />} />
                    */}
                </Routes>
            </Layout>
        </Router>
    );
}