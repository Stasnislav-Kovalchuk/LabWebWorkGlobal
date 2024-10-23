import React, { FC, FormEvent, useState, useEffect } from 'react';
import './SectionItems.scss';
import { defaultDoctor, IDoctor } from "../../../intefaces/doctorInterfaces";
import DoctorItem from "../../entities/DoctorItem/DoctorItem";
import PopUpModalWindow from "../../common/PopUpModalWindow/PopUpModalWindow";
import PopUpDoctorForm from '../../entities/PopUpDoctorForm/PopUpDoctorForm';
import { useDoctors } from '../../context/DoctorsContext';

interface SectionItemsProps {
    doctors: IDoctor[];
}

const filterDoctorsBySearchOptions = (doctors: IDoctor[], searchOptions: {term: string, sort: string}) => {
    const { term, sort } = searchOptions;

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().trim().includes(term.toLowerCase().trim()) ||
        doctor.description.toLowerCase().trim().includes(term.toLowerCase().trim())
    );

    return filteredDoctors.sort((a, b) => {
        if (sort === 'price') {
            return a.price - b.price;
        } else if (sort === 'name') {
            return a.name.localeCompare(b.name);
        }
        return 0;
    });
};

const SectionItems: FC<SectionItemsProps> = ({ doctors }) => {
    const { setDoctors, searchOptions, setSearchOptions } = useDoctors();
    const [active, setActive] = useState(false);
    const [editedDoctor, setEditedDoctor] = useState<IDoctor>(defaultDoctor);
    const [error, setError] = useState('');
    const [visibleDoctors, setVisibleDoctors] = useState(3);

    const handleEditDoctor = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editedDoctor.name || !editedDoctor.description || !editedDoctor.price || !editedDoctor.picture) {
            setError('All fields are required');
            return;
        }

        const updatedDoctors = doctors.map(doctor =>
            doctor.doctor_id === editedDoctor.doctor_id ? editedDoctor : doctor
        );
        setDoctors(updatedDoctors);
        setActive(false);
        setError('');
        setEditedDoctor(defaultDoctor);
    };

    const handleLoadMore = () => {
        setVisibleDoctors(prevVisible => prevVisible + 3);
    };

    return (
        <section className="section-items">
            <div className="sort">
                <select
                    name="sort" 
                    id="sort" 
                    onChange={(e) => setSearchOptions((prev: typeof searchOptions) => ({
                        ...prev,
                        sort: e.target.value
                    }))}
                    value={searchOptions.sort}
                >
                    <option value="">Sort by</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                </select>
            </div>
            <div className="items">
                {doctors.slice(0, visibleDoctors).map((doctor) => (
                    <DoctorItem
                        key={doctor.doctor_id}
                        doctor={doctor}
                        setDoctors={setDoctors}
                        setEditedDoctor={setEditedDoctor}
                        setActive={setActive}
                    />
                ))}
            </div>
            {visibleDoctors < doctors.length && (
                <button className="load-more-btn" onClick={handleLoadMore}>
                    <span className="load-more-text">Load More</span>
                    <span className="load-more-icon">+</span>
                </button>
            )}
            <PopUpDoctorForm
                doctor={editedDoctor}
                setDoctor={setEditedDoctor}
                handleSubmit={handleEditDoctor}
                error={error}
                headText="Edit doctor"
                active={active}
                setActive={setActive}
            />
        </section>
    );
};

export default SectionItems;
