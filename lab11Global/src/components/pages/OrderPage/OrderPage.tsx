import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './OrderPage.scss';
import { getCarts } from '../../../store/carts.slice'; 
import CartServices from '../../../services/CartServices';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { ICart } from '../../../intefaces/commonInterfaces';

// Імпортуємо функції для API
import { fetchCities, fetchWarehouses } from '../../../components/api/api';
// Імпортуємо функцію для ініціалізації LiqPay
import { initiateLiqPayPayment } from '../../../components/api/liqpay';

const OrderPage = () => {
    const {
        carts
    } = useSelector((state: RootState) => state.cartsReducer);
    const dispatch = useDispatch<AppDispatch>();
    
    const location = useLocation();
    const navigate = useNavigate();

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

    useEffect(() => {
        const loadCities = async () => {
            try {
                const citiesData = await fetchCities();
                setCities(citiesData);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };
        loadCities();
    }, []);

    useEffect(() => {
        if (selectedCity) {
            const loadWarehouses = async () => {
                try {
                    const warehousesData = await fetchWarehouses(selectedCity);
                    setWarehouses(warehousesData);
                } catch (error) {
                    console.error('Error fetching warehouses:', error);
                }
            };
            loadWarehouses();
        }
    }, [selectedCity]);

    const handleInputChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Name must be at least 3 characters long.')
            .max(50, 'Name cannot exceed 50 characters.')
            .required('Name is required.'),
        email: Yup.string()
            .email('Please enter a valid email address.')
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Invalid email address'
            )          
            .required('Email is required.'),
        phone: Yup.string()
            .min(12, 'Please enter a valid phone number.')
            .required('Phone number is required.'),
        paymentType: Yup.string().required('Please select a payment type.'),
        deliveryType: Yup.string().required('Please select a delivery type.'),
        selectedCity: Yup.string().required('Please select a city.'),
        selectedWarehouse: Yup.string().required('Please select a warehouse.'),
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await validationSchema.validate({ ...formData, selectedCity, selectedWarehouse }, { abortEarly: false });
            console.log('Form Data:', { ...formData, selectedCity, selectedWarehouse });
            alert('Order submitted successfully!');

            try {
                console.log('Clearing cart...');
                await CartServices.clearCart();
                console.log('Cart cleared, dispatching getCarts...');
                dispatch(getCarts());
                console.log('getCarts dispatched');
            } catch (error) {
                console.error('Error clearing cart:', error);
                alert('Failed to clear cart. Please try again.');
            }

            navigate('/thank-you');
        } catch (validationErrors) {
            if (validationErrors instanceof Yup.ValidationError) {
                validationErrors.inner.forEach((error) => {
                    alert(error.message);
                });
            }
        }
    };

    const handleLiqPayPayment = () => {
        // Викликаємо функцію для ініціалізації LiqPay
        initiateLiqPayPayment(1000, 'Оплата за лікарів');
    };

    return (
        <div className="order-page">
            <h1>Complete Your Order</h1>

            <div className="selected-doctors">
                <h2>Your Selected Doctors</h2>
                <ul>
                    {carts?.map((cart:ICart) => (
                        <li key={cart.id}>
                            {cart.doctor.name} - <strong>{cart.doctor.price} UAH</strong>
                        </li>
                    ))}
                </ul>
            </div>

            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="name">Ім'я ну і Прізвище</label>
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
                    <label htmlFor="email">Напиши пошту щоб ми тоб розсилку кидали</label>
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