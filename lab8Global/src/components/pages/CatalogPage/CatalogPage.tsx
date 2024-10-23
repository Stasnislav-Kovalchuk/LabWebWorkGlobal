import React, { FC, useState } from 'react';
import SectionMenu from "../../features/SectionMenu/SectionMenu";
import SectionItems from "../../features/SectionItems/SectionItems";
import doctorsData from '../../../data.json';
import { IDoctor } from "../../../intefaces/doctorInterfaces";
import './CatalogPage.scss';

const flattenedDoctorsData: IDoctor[] = doctorsData.flat().map(doctor => ({
    ...doctor,
    rating: 5,
    location: 'Ukraine'
}));

const CatalogPage: FC = () => {
    const [doctors, setDoctors] = useState<IDoctor[]>(flattenedDoctorsData);
    const [searchOptions, setSearchOptions] = useState<{ term: string, sort: string }>({ term: '', sort: 'price' });

    // Стан для контролю кількості відображуваних лікарів
    const [visibleDoctors, setVisibleDoctors] = useState(3); // Початково відображаємо 5 лікарів

    // Функція для збільшення кількості відображуваних лікарів
    const loadMoreDoctors = () => {
        setVisibleDoctors(prev => prev + 3); // Додаємо ще 5 лікарів при натисканні
    };

    const paginationStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    };

    const buttonStyle: React.CSSProperties = {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        borderRadius: '5px',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    return (
        <>
            <SectionMenu
                doctors={doctors}
                setDoctors={setDoctors}
                setSearchOptions={setSearchOptions}
            />
            <SectionItems
                doctors={doctors.slice(0, visibleDoctors)} // Відображаємо лише частину лікарів
                setDoctors={setDoctors}
                searchOptions={searchOptions}
                setSearchOptions={setSearchOptions}
            />

            {/* Кнопка для завантаження більше лікарів */}
            {visibleDoctors < doctors.length && (
                <div style={paginationStyle}>
                    <button 
                        style={buttonStyle} 
                        onClick={loadMoreDoctors}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#0056b3';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#007bff';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                        }}
                    >
                        Load More
                    </button>
                </div>
            )}
        </>
    );
};

export default CatalogPage;
