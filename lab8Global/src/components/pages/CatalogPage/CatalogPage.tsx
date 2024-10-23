import React, { FC, useEffect, useState } from 'react';
import { IDoctor } from '../../../intefaces/doctorInterfaces';
import SectionMenu from "../../features/SectionMenu/SectionMenu";
import SectionItems from "../../features/SectionItems/SectionItems";
import { useDoctors } from '../../context/DoctorsContext';
import './CatalogPage.scss';

const filterDoctorsBySearchOptions = (doctors: IDoctor[], searchOptions: { term: string, price: number | null, rating: number | null, country: string }) => {
    const { term, price, rating, country } = searchOptions;

    return doctors.filter(doctor => {
        const matchesTerm = term ? doctor.name.toLowerCase().includes(term.toLowerCase()) || doctor.description.toLowerCase().includes(term.toLowerCase()) : true;
        const matchesPrice = price !== null ? doctor.price <= price : true;
        const matchesRating = rating !== null ? doctor.rating >= rating : true;
        const matchesCountry = country ? doctor.location.toLowerCase() === country.toLowerCase() : true;

        return matchesTerm && matchesPrice && matchesRating && matchesCountry;
    });
};

const CatalogPage: FC = () => {
    const { doctors, searchOptions } = useDoctors();
    const [filteredDoctors, setFilteredDoctors] = useState<IDoctor[]>(doctors);
    const [visibleDoctors, setVisibleDoctors] = useState(10);

    const filterDoctorsBySearchOptions = (doctors: IDoctor[], searchOptions: { term: string, price: number | null, rating: number | null, country: string }) => {
        const { term, price, rating, country } = searchOptions;
    
        return doctors.filter(doctor => {
            const matchesTerm = term ? doctor.name.toLowerCase().includes(term.toLowerCase()) || doctor.description.toLowerCase().includes(term.toLowerCase()) : true;
            const matchesPrice = price !== null ? doctor.price <= price : true;
            const matchesRating = rating !== null ? doctor.rating >= rating : true;
            const matchesCountry = country ? doctor.location.toLowerCase() === country.toLowerCase() : true;
    
            return matchesTerm && matchesPrice && matchesRating && matchesCountry;
        });
    };

    useEffect(() => {
        const newFilteredDoctors = filterDoctorsBySearchOptions(doctors, searchOptions);
        setFilteredDoctors(newFilteredDoctors);
    }, [doctors, searchOptions]);

    return (
        <div className="catalog-page">
            <SectionMenu />
            <SectionItems doctors={filteredDoctors.slice(0, visibleDoctors)} />
        </div>
    );
};

export default CatalogPage;
