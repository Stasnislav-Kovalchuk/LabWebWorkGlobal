import React from 'react';
// import '../styles/testimonials.css'; // Змінено шлях
import linrLogo from '../../../images/linr.svg'; 
import ser1 from '../../../images/ser1.svg'; 
import ser2 from '../../../images/ser2.svg'; 
import ser3 from '../../../images/ser3.svg'; 
import ser4 from '../../../images/ser4.svg'; 
import ser5 from '../../../images/ser5.svg'; 
import ser6 from '../../../images/ser6.svg'; 

// import React, {FC, useRef} from 'react';
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import {IArticle} from "../../../intefaces/commonInterfaces";
// import Article from "../../entities/Article/Article";

// import article1 from '../../../images/article1.webp';
// import article2 from '../../../images/article2.webp';
// import article3 from '../../../images/article3.webp';

// import bubble from '../../../images/bubble.svg';
// import dots from '../../../images/dots.svg';

import './LastArticles.css';
import './services.css';


// import ser1 from '../assets/doctror1.webp'; 
// import ser2 from '../assets/doctor2.webp'; 
// import ser3 from '../assets/doctor4.webp'; 
// import ser4 from '../assets/doctor5.webp'; 
// import ser5 from '../assets/doctor2.webp'; 
// import ser6 from '../assets/doctor3.webp'; 

import bubble from '../../../images/big-bubble.svg'; 


const TestimonialsSection = () => {
    return (
        <section className="testimonials-section" data-aos="fade-up">
            <h2 className="testimonials-heading">Our services</h2>
            <img src={linrLogo} alt="logo" data-aos="zoom-in" />
            <img src={bubble} alt="bubble" className="bubble" />
            <p className="sup-descrip" data-aos="fade-up">
                We provide to you the best choices for your health needs. Make sure to undergo treatment with our highly qualified doctors.
            </p>

            <div className="services" data-aos="fade-up">
                <div className="service">
                    <img src={ser1} alt="Search doctor" />
                    <h3>Search doctor</h3>
                    <p>Choose from thousands of specialists, general practitioners, and trusted hospitals.</p>
                </div>
                <div className="service" data-aos="fade-up">
                    <img src={ser2} alt="Online pharmacy" />
                    <h3>Online pharmacy</h3>
                    <p>Buy your medicines easily with our mobile app and fast delivery system.</p>
                </div>
                <div className="service" data-aos="fade-up">
                    <img src={ser3} alt="Consultation" />
                    <h3>Consultation</h3>
                    <p>Get a free consultation from our trusted doctors with the best advice.</p>
                </div>
                <div className="service" data-aos="fade-up">
                    <img src={ser4} alt="Details info" />
                    <h3>Details info</h3>
                    <p>Access detailed health information and personalized guidance from specialists.</p>
                </div>
                <div className="service" data-aos="fade-up">
                    <img src={ser5} alt="Emergency care" />
                    <h3>Emergency care</h3>
                    <p>Receive 24/7 urgent care for you and your loved ones anytime.</p>
                </div>
                <div className="service" data-aos="fade-up">
                    <img src={ser6} alt="Tracking" />
                    <h3>Tracking</h3>
                    <p>Easily track and save your medical history and health data with our system.</p>
                </div>
            </div>

            <div className="learn-more">
                <a href="#" className="button" data-aos="fade-up">Learn More</a>
            </div>
        </section>
    );
};

export default TestimonialsSection;
