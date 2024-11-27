import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderPage.scss';

const OrderPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedDoctors = location.state?.selectedDoctors || [];

    const toBase64 = (str: string): string => {
        return window.btoa(unescape(encodeURIComponent(str)));
    };

    const [cities, setCities] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedWarehouse, setSelectedWarehouse] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        paymentType: '',
        deliveryType: '',
    });

    const API_KEY = '4b43b81dfa23afae2dbf44851510a110'; // API Нової Пошти
    const LIQPAY_PUBLIC_KEY = 'sandbox_i1180960224'; // Ваш LiqPay Public Key
    const LIQPAY_PRIVATE_KEY = 'sandbox_XysjrvqzETT1mDbWisgJCbUYm1mgh7x2NRJhIa2W'; // Ваш LiqPay Private Key

    useEffect(() => {
        axios
            .post('https://api.novaposhta.ua/v2.0/json/', {
                apiKey: API_KEY,
                modelName: 'Address',
                calledMethod: 'getCities',
                methodProperties: {},
            })
            .then((response: any) => {
                if (response.data.success) {
                    setCities(response.data.data);
                } else {
                    console.error('Error fetching cities:', response.data.errors);
                }
            })
            .catch((error) => {
                console.error('Error fetching cities:', error);
            });
    }, []);

    useEffect(() => {
        if (selectedCity) {
            axios
                .post('https://api.novaposhta.ua/v2.0/json/', {
                    apiKey: API_KEY,
                    modelName: 'Address',
                    calledMethod: 'getWarehouses',
                    methodProperties: {
                        CityRef: selectedCity,
                    },
                })
                .then((response: any) => {
                    if (response.data.success) {
                        setWarehouses(response.data.data);
                    } else {
                        console.error('Error fetching warehouses:', response.data.errors);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching warehouses:', error);
                });
        }
    }, [selectedCity]);

    const handleInputChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { name, email, phone, paymentType, deliveryType } = formData;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name.trim() || name.length < 3 || name.length > 50) {
            alert('Name must be 3-50 characters long.');
            return false;
        }

        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        if (!phone.trim() || phone.length < 12) {
            alert('Please enter a valid phone number.');
            return false;
        }

        if (!selectedCity) {
            alert('Please select a city.');
            return false;
        }

        if (!selectedWarehouse) {
            alert('Please select a warehouse.');
            return false;
        }

        if (!deliveryType) {
            alert('Please select a delivery type.');
            return false;
        }

        if (!paymentType) {
            alert('Please select a payment type.');
            return false;
        }

        return true;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form Data:', { ...formData, selectedCity, selectedWarehouse });
            alert('Order submitted successfully!');
            navigate('/thank-you');
        }
    };

    const handleLiqPayPayment = () => {
        const paymentData = {
            public_key: LIQPAY_PUBLIC_KEY,
            version: '3',
            action: 'pay',
            amount: '1000', // Сума оплати
            currency: 'UAH',
            description: 'Оплата за лікарів',
            order_id: `order_${Date.now()}`,
            sandbox: '1',
        };

        const base64Data = toBase64(JSON.stringify(paymentData));
        const signature = CryptoJS.enc.Base64.stringify(
            CryptoJS.SHA1(LIQPAY_PRIVATE_KEY + base64Data + LIQPAY_PRIVATE_KEY)
        );

        const form = document.createElement('form');
        form.action = 'https://www.liqpay.ua/api/3/checkout';
        form.method = 'POST';
        form.target = '_blank';

        const dataInput = document.createElement('input');
        dataInput.type = 'hidden';
        dataInput.name = 'data';
        dataInput.value = base64Data;

        const signatureInput = document.createElement('input');
        signatureInput.type = 'hidden';
        signatureInput.name = 'signature';
        signatureInput.value = signature;

        form.appendChild(dataInput);
        form.appendChild(signatureInput);
        document.body.appendChild(form);
        form.submit();
        form.remove();
    };

    return (
        <div className="order-page">
            <h1>Complete Your Order</h1>

            <div className="selected-doctors">
                <h2>Your Selected Doctors</h2>
                <ul>
                    {selectedDoctors.map((doctor: any) => (
                        <li key={doctor.id}>
                            {doctor.doctor.name} - <strong>{doctor.doctor.price} UAH</strong>
                        </li>
                    ))}
                </ul>
            </div>

            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        placeholder="Enter your full name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <PhoneInput
                        country="ua"
                        value={formData.phone}
                        onChange={(phone) => handleInputChange('phone', phone)}
                        inputProps={{
                            name: 'phone',
                            required: true,
                            placeholder: '+380 (__) ___-__-__',
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <select
                        id="city"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        required
                    >
                        <option value="">Select your city</option>
                        {cities.map((city: any) => (
                            <option key={city.Ref} value={city.Ref}>
                                {city.Description}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="warehouse">Warehouse</label>
                    <select
                        id="warehouse"
                        value={selectedWarehouse}
                        onChange={(e) => setSelectedWarehouse(e.target.value)}
                        disabled={!selectedCity}
                        required
                    >
                        <option value="">Select your warehouse</option>
                        {warehouses.map((warehouse: any) => (
                            <option key={warehouse.Ref} value={warehouse.Ref}>
                                {warehouse.Description}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group radio-group">
                    <label>Delivery Type</label>
                    <div className="radio-options">
                        <label className="radio-option">
                            <input
                                type="radio"
                                name="deliveryType"
                                value="courier"
                                onChange={(e) => setFormData({ ...formData, deliveryType: e.target.value })}
                                required
                            />
                            <span className="custom-radio"></span>
                            Courier Delivery
                        </label>
                        <label className="radio-option">
                            <input
                                type="radio"
                                name="deliveryType"
                                value="pickup"
                                onChange={(e) => setFormData({ ...formData, deliveryType: e.target.value })}
                                required
                            />
                            <span className="custom-radio"></span>
                            Pickup from Warehouse
                        </label>
                    </div>
                </div>

                <div className="form-group radio-group">
                    <label>Payment Type</label>
                    <div className="radio-options">
                        <label className="radio-option">
                            <input
                                type="radio"
                                name="paymentType"
                                value="card"
                                onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
                                required
                            />
                            <span className="custom-radio"></span>
                            Credit Card
                        </label>
                        <label className="radio-option">
                            <input
                                type="radio"
                                name="paymentType"
                                value="cash"
                                onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
                                required
                            />
                            <span className="custom-radio"></span>
                            Cash on Delivery
                        </label>
                    </div>
                </div>

                <button type="submit">Submit Order</button>
            </form>
            <button onClick={handleLiqPayPayment} className="liqpay-button">
                Pay with LiqPay
            </button>
        </div>
    );
};

export default OrderPage;
