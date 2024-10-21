import React, {Dispatch, FC, FormEvent, useEffect, useState} from 'react';
import './SectionItems.scss';
import {defaultDoctor, IDoctor} from "../../../intefaces/doctorInterfaces";
import DoctorItem from "../../entities/DoctorItem/DoctorItem";
import PopUpModalWindow from "../../common/PopUpModalWindow/PopUpModalWindow";

interface SectionItemsProps {
    doctors: IDoctor[];
    setDoctors: Dispatch<React.SetStateAction<IDoctor[]>>;
    searchOptions: {term: string, sort: string};
    setSearchOptions: Dispatch<React.SetStateAction<{term: string, sort: string}>>;

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
}



const SectionItems: FC<SectionItemsProps> = ({doctors, setDoctors, searchOptions, setSearchOptions}) => {
    const [editedDoctor, setEditedDoctor] = useState<IDoctor>(defaultDoctor);
    const [active, setActive] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [filteredDoctors, setFilteredDoctors] = useState(filterDoctorsBySearchOptions(doctors, searchOptions));

    useEffect(() => {
        setFilteredDoctors(filterDoctorsBySearchOptions(doctors, searchOptions));
    }, [doctors, searchOptions]);

    const handleEditedDoctor = (e: FormEvent) => {
        e.preventDefault();
        if (!editedDoctor.name || !editedDoctor.description || !editedDoctor.price || !editedDoctor.picture) {
            setError('All fields are required');
            return;
        }

        const isNameUnique = !doctors.some(doctor => doctor.name === editedDoctor.name);
        if (!isNameUnique) {
            setError('Doctor name must be unique');
            return;
        }

        const updatedDoctors = doctors.map(doctor =>
            doctor.doctor_id === editedDoctor.doctor_id ? editedDoctor : doctor
        );
        setDoctors(updatedDoctors);
        setActive(false);
        setError('');
        setEditedDoctor(defaultDoctor);

    }



    return (
        <section className="section-items">
            <div className="item-manager">
                <div className="sort-div">
                    <h1>Manage Doctors</h1>
                    <form>
                        <label htmlFor="sort"> Sort by: </label>
                        <select className="sort-select" name="sort" id="sort" onChange={(e) => setSearchOptions(prev => ({
                            ...prev,
                            sort: e.target.value
                        }))}>
                            <option value='price'>Price</option>
                            <option value='name'>Name</option>
                        </select>
                    </form>
                </div>
                <hr/>
                <div className="count-div">
                    <h2>Count price</h2>
                    <form>
                        <label>
                            {/*<button type="submit" className="item-count-button">Count</button>*/}
                            <output>Total:
                                <span id="total_price">
                                    {` ${filteredDoctors.reduce((total, doctor) => total + doctor.price, 0)} $`}
                                </span>
                            </output>
                        </label>
                    </form>
                </div>
            </div>

            <div id="ItemsWrappper" className="items-wrapper">
                {filteredDoctors.map((doctor: IDoctor) => (
                    <DoctorItem
                        key={doctor.doctor_id}
                        doctor={doctor}
                        setDoctors={setDoctors}
                        setEditedDoctor={setEditedDoctor}
                        setActive={setActive}
                    />
                    ))}
            </div>
            <PopUpModalWindow headText={'Add new doctor'} active={active} setActive={setActive}>
                <form className='doctor-popup-form' onSubmit={handleEditedDoctor}>
                    <div>
                        <label>Name:</label>
                        <input
                            value={editedDoctor.name}
                            onChange={e => setEditedDoctor({...editedDoctor, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            value={editedDoctor.description}
                            onChange={e => setEditedDoctor({...editedDoctor, description: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type={"number"}
                            min={0}
                            value={editedDoctor.price || ''}
                            onChange={e => setEditedDoctor({...editedDoctor, price: Number(e.target.value)})}
                        />
                    </div>
                    <div>
                        <label>Picture's url:</label>
                        <input
                            value={editedDoctor.picture}
                            onChange={e => setEditedDoctor({...editedDoctor, picture: e.target.value})}
                        />
                    </div>
                    <span className='error'>{error}</span>
                    <button className={'blue-btn small'} type={'submit'}>Добавити</button>
                </form>
            </PopUpModalWindow>
        </section>
    );
};

export default SectionItems;