import React, { FC, FormEvent, useState, useEffect } from 'react';
import './SectionMenu.css';
import { defaultDoctor, IDoctor } from "../../../intefaces/doctorInterfaces";
import PopUpDoctorForm from "../../entities/PopUpDoctorForm/PopUpDoctorForm";
import { useDoctors } from "../../context/DoctorsContext";
import FilterForm from '../FilterForm/FilterForm';

const SectionMenu: FC = () => {
    const { doctors, setDoctors, searchOptions, setSearchOptions } = useDoctors();
    const [active, setActive] = useState<boolean>(false);
    const [newDoctor, setNewDoctor] = useState<IDoctor>(defaultDoctor);
    const [error, setError] = useState<string>('');
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        const total = doctors.reduce((sum, doctor) => sum + doctor.price, 0);
        setTotalPrice(total);
    }, [doctors]);

    const handleNewDoctor = (e: FormEvent) => {
        e.preventDefault();
        if (!newDoctor.name || !newDoctor.description || !newDoctor.price || !newDoctor.picture) {
            setError('All fields are required');
            return;
        }

        const isNameUnique = !doctors.some(doctor => doctor.name === newDoctor.name);
        if (!isNameUnique) {
            setError('Doctor name must be unique');
            return;
        }

        const maxId = doctors.length > 0 ? Math.max(...doctors.map(doctor => doctor.doctor_id)) : 0;
        setDoctors([...doctors, { ...newDoctor, doctor_id: maxId + 1 }]);
        setActive(false);
        setError('');
        setNewDoctor(defaultDoctor);

        console.log(newDoctor);
    }

    const handleFilterChange = (filterType: string, value: string | number) => {
        setSearchOptions(prev => ({
            ...prev,
            [filterType]: value === "" ? null : filterType === 'rating' ? Number(value) : value
        }));
    }

    const handleSearchChange = (value: string) => {
        setSearchOptions(prev => ({...prev, term: value}));
    };

    return (
        <section className="section-menu">
            <div className="create">
                <button className="create-button" onClick={() => setActive(true)}>Create a doctor</button>
            </div>
            <div className="total-price">
                Total price of all doctors: ${totalPrice.toFixed(2)}
            </div>
            <div className="search-menu" id="search-menu">
                <FilterForm 
                    searchOptions={searchOptions}
                    onFilterChange={handleFilterChange}
                    onSearchChange={handleSearchChange}
                />
            </div>

            <PopUpDoctorForm
                doctor={newDoctor}
                setDoctor={setNewDoctor}
                handleSubmit={handleNewDoctor}
                error={error}
                headText="Add new doctor"
                active={active}
                setActive={setActive}
            />
        </section>
    );
};

export default SectionMenu;
