import React, { FC, useRef, useEffect } from 'react';
import arrow from '../../../images/arrow.svg';
import dots from '../../../images/dots.svg';
import heroImage from '../../../images/hero-section-photo.svg'; // Імпорт зображення

import './FirstScreen.scss';
import gsap from "gsap";

const FirstScreen: FC = () => {
    const ctxRef = useRef<gsap.Context | null>(null);
    const main = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ctxRef.current = gsap.context(() => {
            let mm = gsap.matchMedia();

            const heroText = main.current?.querySelectorAll(".first-screen .h2");
            const imgContainer = main.current?.querySelectorAll(".first-screen .img-container");

            if (heroText) {
                gsap.to(heroText, { opacity: 1, x: 0, duration: 0.6 });
            }

            // desktop anim
            mm.add('(min-width: 878px)', () => {
                if (imgContainer) {
                    gsap.to(imgContainer, { opacity: 1, x: 0, duration: 0.5 });
                }
            });

        }, main);

        return () => {
            if (ctxRef.current) {
                ctxRef.current.revert();
            }
        };

    }, []);

    return (
        <section className="first-screen" ref={main}>
            <div className="info">
                <h2 className="h2">Virtual healthcare for you</h2>
                <h3 className="h4">Trafalgar provides progressive, and affordable healthcare, accessible on mobile and online for everyone</h3>
                <div></div>
                <a href='/' className="btn">Consult today</a>
            </div>
            <div className="img-container">
                <img src={heroImage} alt="Hero section image" />
            </div>
        </section>
    );
};

export default FirstScreen;
