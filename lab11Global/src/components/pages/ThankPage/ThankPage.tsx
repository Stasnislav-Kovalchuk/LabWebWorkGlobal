import React from 'react';
import './ThankPage.scss';

const ThankPage = () => {
    return (
        <div className="thank-page">
            <h1>Thank You for Your Order!</h1>
            <p>Your order has been successfully submitted. We will contact you soon with the details.</p>
            <a href="/" className="home-link">Return to Home</a>
        </div>
    );
};

export default ThankPage;
