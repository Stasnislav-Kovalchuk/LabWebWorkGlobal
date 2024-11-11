import React, { FC, useEffect, useState } from 'react';
import { IDoctor } from '../../../intefaces/doctorInterfaces';
import SectionMenu from "../../features/SectionMenu/SectionMenu";
import SectionItems from "../../features/SectionItems/SectionItems";
import './CatalogPage.scss';
import { ISearchOptions } from '../../../intefaces/commonInterfaces';

interface FilterOptions {
    term: string;
    price: number | null;
    rating: number | null;
    country: string | null;
    sort: 'price' | 'rating' | '';
}

const filterDoctorsBySearchOptions = (doctors: IDoctor[], options: FilterOptions) => {
    const { term, price, rating, country, sort } = options;

    return doctors.filter(doctor => {
        const matchesTerm = term ? doctor.name.toLowerCase().includes(term.toLowerCase()) || doctor.description.toLowerCase().includes(term.toLowerCase()) : true;
        const matchesPrice = price !== null ? doctor.price <= price : true;
        const matchesRating = rating ? doctor.rating >= Number(rating) : true;
        const matchesCountry = country ? doctor.location.toLowerCase() === country.toLowerCase() : true;

        return matchesTerm && matchesPrice && matchesRating && matchesCountry;
    });
};

const CatalogPage: FC = () => {
    const [searchOptions, setSearchOptions] = useState<ISearchOptions>({ search: '', order_by: 'price', price_le: 0, rate_ge: 0, country: '' });
    const [doctors, setDoctors] = useState<IDoctor[]>([])

    return (
        <>
            <SectionMenu
                searchOptions={searchOptions}
                setSearchOptions={setSearchOptions}
                doctors={doctors}
                setDoctors={setDoctors}
            />
            <SectionItems
                searchOptions={searchOptions}
                setSearchOptions={setSearchOptions}
                doctors={doctors}
                setDoctors={setDoctors}
            />
        </>
    );
};

export default CatalogPage;
