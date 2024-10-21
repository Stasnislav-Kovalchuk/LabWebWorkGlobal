import React from 'react';
import '../styles/hero.css'; // Змінено шлях
import heroImage from '../assets/hero-section-photo.svg'; // Імпорт зображення

const HeroSection = () => {
    return (
        <section className="heroSection" data-aos="fade-up">
            <div className="dots" data-aos="fade-up"></div>
            <div className="qwerty" data-aos="fade-up">
                <h2>Virtual healthcare for you</h2>
                <h3>Trafalgar provides progressive, and affordable healthcare, accessible on mobile and online for everyone</h3>
                <div>
                    <a href="#" className="consult-button">Consult today</a>
                </div>
            </div>
            <img src={heroImage} alt="Hero section image" data-aos="fade-up"/>
        </section>
    );
};

export default HeroSection;
