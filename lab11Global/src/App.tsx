import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layouts/Layout/Layout";
import HomePage from "./components/pages/HomePage/HomePage";
import CatalogPage from "./components/pages/CatalogPage/CatalogPage";
import ItemPage from "./components/pages/ItemPage/ItemPage";
import ServicePage from "./components/pages/ServicePage/ServicePage";
import CartPage from "./components/pages/CartPage/CartPage";
import OrderPage from './components/pages/OrderPage/OrderPage';
import ThankPage from './components/pages/ThankPage/ThankPage';


function App() {
    return (
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        index
                        element={<HomePage />}
                    />
                    <Route path="catalog" element={<CatalogPage/>} />
                    <Route path="cart" element={<CartPage/>}/>
                    <Route path="catalog/:id" element={<ItemPage/>} />
                    <Route path="/order" element={<OrderPage/>} />
                    <Route path="/thank-you" element={<ThankPage/>} /> 
                    <Route path="service/:id" element={<ServicePage/>} />

                </Route>
            </Routes>


    );
}

export default App;
