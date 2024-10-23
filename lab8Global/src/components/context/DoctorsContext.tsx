import React, { createContext, useContext, useState, FC, ReactNode } from 'react';
import { IDoctor } from "../../intefaces/doctorInterfaces";
import doctorsData from '../../data.json';

const flattenedDoctorsData: IDoctor[] = doctorsData.flat().map(doctor => ({
    ...doctor,
    rating: 5, // Додаємо значення за замовчуванням
    location: 'Ukraine' // Додаємо значення за замовчуванням
}));

interface SearchOptions {
    term: string;
    sort: string;
    price: number | null;
    rating: number | null;
    country: string;
}

interface DoctorsContextProps {
    doctors: IDoctor[];
    setDoctors: React.Dispatch<React.SetStateAction<IDoctor[]>>;
    searchOptions: SearchOptions;
    setSearchOptions: React.Dispatch<React.SetStateAction<SearchOptions>>;
}

const DoctorsContext = createContext<DoctorsContextProps | undefined>(undefined);

export const useDoctors = () => {
    const context = useContext(DoctorsContext);
    if (!context) {
        throw new Error('useDoctors must be used within a DoctorsProvider');
    }
    return context;
};

export const DoctorsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [doctors, setDoctors] = useState<IDoctor[]>(flattenedDoctorsData);
    const [searchOptions, setSearchOptions] = useState<SearchOptions>({
        term: '',
        sort: '',
        price: null,
        rating: null,
        country: ''
    });

    return (
        <DoctorsContext.Provider value={{ doctors, setDoctors, searchOptions, setSearchOptions }}>
            {children}
        </DoctorsContext.Provider>
    );
};
