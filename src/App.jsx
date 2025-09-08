import Header from "./components/Header";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import Footer from "./components/Footer";
import "./styles.css";

export default function App() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <Problem />
                <Solution />
            </main>
            <Footer />
        </>
    );
}
