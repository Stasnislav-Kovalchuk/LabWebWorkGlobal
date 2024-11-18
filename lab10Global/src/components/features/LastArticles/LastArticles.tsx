import React from 'react';
import { Link } from 'react-router-dom';
// import '../styles/testimonials.css'; // Змінено шлях
import linrLogo from '../../../images/linr.svg'; 
import ser1 from '../../../images/ser1.svg'; 
import ser2 from '../../../images/ser2.svg'; 
import ser3 from '../../../images/ser3.svg'; 
import ser4 from '../../../images/ser4.svg'; 
import ser5 from '../../../images/ser5.svg'; 
import ser6 from '../../../images/ser6.svg'; 
import bubble from '../../../images/big-bubble.svg'; 

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

interface Service {
  id: string;
  image: string;
  title: string;
  description: string;
}

const services: Service[] = [
  { id: '1', image: ser1, title: 'Search doctor', description: 'Choose from thousands of specialists, general practitioners, and trusted hospitals.' },
  { id: '2', image: ser2, title: 'Online pharmacy', description: 'Buy your medicines easily with our mobile app and fast delivery system.' },
  { id: '3', image: ser3, title: 'Consultation', description: 'Get a free consultation from our trusted doctors with the best advice.' },
  { id: '4', image: ser4, title: 'Details info', description: 'Access detailed health information and personalized guidance from specialists.' },
  { id: '5', image: ser5, title: 'Emergency care', description: 'Receive 24/7 urgent care for you and your loved ones anytime.' },
  { id: '6', image: ser6, title: 'Tracking', description: 'Easily track and save your medical history and health data with our system.' },
];

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
                {services.map((service) => (
                    <div key={service.id} className="service">
                        <Link to={`/service/${service.id}`}>
                            <img src={service.image} alt={service.title} />
                        </Link>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>

            <div className="learn-more">
                <Link to="/services" className="button" data-aos="fade-up">Learn More</Link>
            </div>
        </section>
    );
};

export default TestimonialsSection;
