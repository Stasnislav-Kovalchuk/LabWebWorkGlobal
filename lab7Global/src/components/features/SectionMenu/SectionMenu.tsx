import React, {Dispatch, FC, FormEvent, useState} from 'react';

// import searchIcon from '../../../images/search_button.svg';
// import deleteIcon from '../../../images/clear_button.svg';
import './SectionMenu.scss';
import {defaultDoctor, IDoctor} from "../../../intefaces/doctorInterfaces";
import PopUpModalWindow from "../../common/PopUpModalWindow/PopUpModalWindow";

interface SectionMenuProps {
    doctors: IDoctor[];
    setDoctors: Dispatch<React.SetStateAction<IDoctor[]>>;
    setSearchOptions: Dispatch<React.SetStateAction<{term: string, sort: string}>>;
}


const SectionMenu: FC<SectionMenuProps> = ({doctors, setDoctors, setSearchOptions}) => {
    const [active, setActive] = useState<boolean>(false);
    const [newDoctor, setNewDoctor] = useState<IDoctor>(defaultDoctor);
    const [error, setError] = useState<string>('')

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
        setDoctors([...doctors, {...newDoctor, doctor_id: maxId + 1}]);
        setActive(false);
        setError('');
        setNewDoctor(defaultDoctor);

        console.log(newDoctor);
    }

    return (
        <section className="section-menu">
            <div className="create">
                <button className="create-button" onClick={() => setActive(true)}>Create a doctor</button>
            </div>
            <div className="search-menu" id="search-menu">
                <form>
                    <label className="input-buttons-menu">
                        <input placeholder="Type something..."
                               onChange={(e) => setSearchOptions(prev => ({...prev, term: e.target.value}))}
                        />
                        {/*<label className="buttons-menu">*/}
                        {/*    <button type="submit" className="search"><span>Search</span><img*/}
                        {/*        src={searchIcon} alt="Search"/></button>*/}
                        {/*    <button type="reset" className="clear"><span>Clear</span><img*/}
                        {/*        src={deleteIcon} alt="Clear"/></button>*/}
                        {/*</label>*/}
                    </label>
                </form>
            </div>

            <PopUpModalWindow headText={'Add new doctor'} active={active} setActive={setActive}>
                <form className='doctor-popup-form' onSubmit={handleNewDoctor}>
                    <div>
                        <label>Name:</label>
                        <input
                            value={newDoctor.name}
                            onChange={e => setNewDoctor({...newDoctor, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            value={newDoctor.description}
                            onChange={e => setNewDoctor({...newDoctor, description: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type={"number"}
                            min={0}
                            value={newDoctor.price || ''}
                            onChange={e => setNewDoctor({...newDoctor, price: Number(e.target.value)})}
                        />
                    </div>
                    <div>
                        <label>Picture's url:</label>
                        <input
                            value={newDoctor.picture}
                            onChange={e => setNewDoctor({...newDoctor, picture: e.target.value})}
                        />
                    </div>
                    <span className='error'>{error}</span>
                    <button className={'blue-btn small'} type={'submit'}>Добавити</button>
                </form>
            </PopUpModalWindow>

        </section>
    );
};

export default SectionMenu;