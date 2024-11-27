import React, {FC, useEffect, useState} from 'react';
import './CartPage.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, getCarts, RootState} from "../../../store";
import {Link, useNavigate} from "react-router-dom";
import {timeSince} from "../../../utils/common";
import CartServices from "../../../services/CartServices";
const CartPage: FC = () => {
    const {
        carts
    } = useSelector((state: RootState) => state.cartsReducer)
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCarts()).then(() => setLoading(false));
    }, [dispatch]);

    const handleCartDelete = async (e: React.MouseEvent<HTMLButtonElement>, item_index: number) => {
        e.preventDefault()
        CartServices.deleteCart(item_index).then(() => dispatch(getCarts()));
    }

    const handleOrder = () => {
        navigate('/order', {
            state: { selectedDoctors: carts }
        });
    };

    return (
        <>
 <section className='cart'>
        <h1>Your selected doctors:</h1>
        <br/>
        {loading ? (
            <div className="loader">Loading...</div>
        ) : (
            <>
                {carts?.length && carts?.length > 0 ? (
                    <>
                        <div className='carts-wrapper'>
                            {carts.map((cart) => (
                                <div className="item" key={cart.id}>
                                    <Link
                                        to={`/catalog/${cart.doctor.doctor_id}`}
                                        className="avatar"
                                        style={{ backgroundImage: `url(${cart.doctor.picture})` }}
                                    ></Link>
                                    <div className="info">
                                        <h3>{cart.doctor.name}</h3>
                                        <h4>{cart.doctor.description}</h4>
                                        <h5>{timeSince(cart.doctor.updated_at)}</h5>
                                        <h6>{cart.doctor.price} $</h6>
                                        <h6>Type: {cart.doctor_type}</h6>
                                        <h6>Quantity: {cart.quantity}</h6>
                                    </div>
                                    <div className="manage">
                                        <button
                                            onClick={(e) => handleCartDelete(e, cart.id)}
                                            className="remove-doctor"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleOrder} className="order-button">
                            Order
                        </button>
                    </>
                ) : (
                    <div>
                        <p>No doctors selected.</p>
                        <Link to="/catalog" className="go-to-catalog">Go to Doctors Catalog</Link>
                    </div>
                )}
            </>
        )}
        <br/>
    </section>

        </>
    );
};

export default CartPage;