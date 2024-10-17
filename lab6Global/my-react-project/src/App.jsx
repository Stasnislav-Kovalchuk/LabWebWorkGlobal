import Header from './components/header';  // Важливо: регістр має збігатися
import HeroSection from './components/HeroSection';
// import Features from './components/Features';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

import './App.css';  // Глобальні стилі

function App() {
    return (
        <div className="App">
            <Header />
            <main>
                <HeroSection />
                {/* <Features /> */}
                <TestimonialsSection />
            </main>
            <Footer />
        </div>
    );
}

export default App;
