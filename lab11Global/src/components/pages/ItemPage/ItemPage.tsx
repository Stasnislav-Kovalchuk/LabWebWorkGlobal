import { IDoctor } from "../../../intefaces/doctorInterfaces";
import React, {FC, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import starIcon from '../../../images/star.png';
import './ItemPage.scss';
import DoctorServices from "../../../services/DoctorServices";
import SectionMenu from '../../features/SectionMenu/SectionMenu';
import DoctorCard from '../../entities/DoctorItem/DoctorItem';
import CartServices from "../../../services/CartServices";

const ItemPage: FC = () => {
    const {id} = useParams<{ id: string }>();
    const [doctor, setDoctor] = useState<IDoctor | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [doctorType, setDoctorType] = useState<string>('');
    const [message, setMessage] = useState('')
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        try {
            if (id != null) {
                const doctorId = parseInt(id);
                DoctorServices.getDoctorById(doctorId).then(({data}) => {
                    setDoctor(data as IDoctor);
                    setLoading(false);
                });
            }
        } catch (e) {
            setLoading(false);
        }
    }, [id]);

    const handleAddToCart = async () => {
        try {
            if (doctor) {
                await CartServices.addCart(doctor.doctor_id, quantity, doctorType);
                setMessage('Doctor added to cart');
                setShowPopup(true);

                setTimeout(() => {
                    setMessage('');
                    setShowPopup(false);
                }, 800000);
            }
        } catch (e) {
            console.error(e);
        }
    }

    if (loading) {
        return <div className="loader"></div>;
    }

    if (!doctor) {
        return <div className='item-page'>Doctor not found</div>;
    }

    return (
        <div className='item-page'>
            <div className='info'>
                <img className='avatar' src={doctor.picture} alt={doctor.name}/>
                <div className='details'>
                    <div className='filters'>
                        <div className='yellow'>
                            {doctor.rating}
                            <img width={20} height={20} src={starIcon} alt='stars'/>
                        </div>
                        <div className='blue'>{doctor.country}</div>
                    </div>
                    <h1 className='h2'>{doctor.name}</h1>
                    <h2 className={'h7'}>{doctor.description}</h2>
                    <label>
                        Quantity:
                        <input
                            type="number"
                            required
                            value={quantity || ''}
                            onChange={(e) => setQuantity(Number(e.target.value)??0)}
                            min="1"
                        />
                    </label>
                    <label>
                        Doctor Type:
                        <select required value={doctorType} onChange={(e) => setDoctorType(e.target.value)}>
                            <option value="">Select a type</option>
                            <option value="Molodec">Molodec</option>
                            <option value="heniy">heniy</option>
                            <option value="Misio">Misio</option>
                        </select>
                    </label>
                    <h3 className='h3'>{message}</h3>
                </div>
            </div>

            <div className='navigation'>
                <h5 className='h4'>Price: {doctor.price} $</h5>
                <button className='blue-btn small' onClick={handleAddToCart}>Add to cart</button>
                <button onClick={() => navigate(-1)} className='blue-btn small'>Go back</button>
            </div>

            {showPopup && (
                <div className='popup'>
                    <div className='popup-content'>
                        <h3>{message}</h3>
                        <button onClick={() => setShowPopup(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemPage;