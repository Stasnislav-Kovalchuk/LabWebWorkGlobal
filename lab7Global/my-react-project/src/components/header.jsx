import React from 'react';
import '../styles/header.css'; // Змінено шлях
import logo from '../assets/logo.svg'; // Імпорт зображення

const Header = () => {
    return (
        <header>
            <a href="/"><img src={logo} alt="logo" /></a>  {/* Використання імпортованого зображення */}
            <nav className="desktop-nav"> 
                <a href="/"> <span>Home</span></a>
                <a href="/find_a_doctor.html"> Find a doctor </a>
                <a href="/"> Apps </a>
                <a href="/"> Testimonials </a>
                <a href="/"> About us </a>
            </nav>
            <nav className="burger-nav" role="navigation">
                <div id="menuToggle">
                    <input type="checkbox" id="burger-checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <div id="popup-menu">
                        <ul id="menu">
                            <a href="#"><li>Home</li></a>
                            <a href="#"><li>Find a doctor</li></a>
                            <a href="https://play.google.com/store/apps/details?id=com.binance.dev&hl=ru"><li>Apps</li></a>
                            <a href="https://www.indeed.com/career-advice/career-development/how-to-write-a-testimonial#:~:text=A%20testimonial%20is%20a%20statement,or%20provide%20specific%20improvement%20statistics."><li>Testimonials</li></a>
                            <a href="https://www.trafalgar.com/en-eu"><li>About us</li></a>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
