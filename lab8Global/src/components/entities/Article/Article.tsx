import React, {FC} from 'react';
import {IArticle} from "../../../intefaces/commonInterfaces";
import arrow from "../../../images/arrow.svg";
import './Article.scss';

const Article: FC<IArticle> = ({title, description, picture}) => {
    return (
        <div className="article">
            <img src={picture} alt="article 1"/>
            <h3 className="h3">{title}</h3>
            <h4 className="h4">{description}</h4>
            <a href='/' className="blue-btn h6">View all<img src={arrow} alt="→"/></a>
        </div>
    );
};

export default Article;