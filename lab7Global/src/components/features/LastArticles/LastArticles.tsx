import React, {FC, useRef} from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {IArticle} from "../../../intefaces/commonInterfaces";
import Article from "../../entities/Article/Article";

import article1 from '../../../images/article1.webp';
import article2 from '../../../images/article2.webp';
import article3 from '../../../images/article3.webp';

import bubble from '../../../images/bubble.svg';
import dots from '../../../images/dots.svg';

import './LastArticles.scss';

gsap.registerPlugin(ScrollTrigger);

const articles: IArticle[] = [
    {
        id: 1,
        title: 'Disease detection, check up in the laboratory',
        description: 'In this case, the role of the health laboratory is very important to do a disease detection...',
        picture: article1
    },
    {
        id: 2,
        title: 'Herbal medicines that are safe for consumption',
        description: 'Herbal medicine is very widely used at this time because of its very good for your health...',
        picture: article2
    },
    {
        id: 3,
        title: 'Natural care for healthy facial skin',
        description: 'A healthy lifestyle should start from now and also for your skin health. There are some...',
        picture: article3
    }
]

const LastArticles: FC = () => {
    const ctxRef = useRef<gsap.Context>(gsap.context());
    const main = useRef<HTMLDivElement>(document.createElement('div'));

    console.log(typeof article1)

    React.useEffect(() => {
        ctxRef.current = gsap.context(() => {
            const articles = main.current.querySelectorAll(".article");

            articles.forEach((article, index) => {
                const animation: any = gsap.fromTo(article,
                    {
                        opacity: 0,
                        transform: 'translateY(10svh)'
                    },
                    {
                        opacity: 1,
                        transform: 'translateY(0px)',
                        ease: "power1.inOut",
                        delay: (index + 1) * 0.2,
                        scrollTrigger: {
                            trigger: article,
                            once: false,
                            start: 'top bottom 100%',
                            toggleActions: 'play none none reverse',
                            onEnter: () => animation.restart(true),
                            onLeaveBack: () => animation.reverse(),
                            invalidateOnRefresh: true
                        }
                    });
            });
        }, main);

        return () => {
            if (ctxRef.current) {
                ctxRef.current.revert();
            }
        };
    }, []);

    return (
        <section className="last-articles" ref={main}>
            <h2 className="h2">Check out our latest article</h2>
            <div className="line"></div>
            <div className="articles">
                {articles.map(article => (
                    <Article key={article.id} {...article}/>
                ))}
            </div>
            <a href='/' className="blue-btn small h6">Show more</a>
            <img className="bubble" src={bubble} alt="bubble"/>
            <img className="dots" src={dots} alt='dots'/>
        </section>
    );
};

export default LastArticles;