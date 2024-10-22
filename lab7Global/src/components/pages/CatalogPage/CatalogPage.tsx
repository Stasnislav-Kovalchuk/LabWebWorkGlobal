import React, {FC, useState} from 'react';
import SectionMenu from "../../features/SectionMenu/SectionMenu";
import SectionItems from "../../features/SectionItems/SectionItems";
import doctorsData from '../../../data.json';
import {IDoctor} from "../../../intefaces/doctorInterfaces";

const flattenedDoctorsData: IDoctor[] = doctorsData.flat();

const CatalogPage: FC = () => {
    const [doctors, setDoctors] = useState<IDoctor[]>(flattenedDoctorsData);
    const [searchOptions, setSearchOptions] = useState<{term: string, sort: string}>({term: '', sort: 'price'});

    return (
        <>
            <SectionMenu
                doctors={doctors}
                setDoctors={setDoctors}
                setSearchOptions={setSearchOptions}
            />
            <SectionItems
                doctors={doctors}
                setDoctors={setDoctors}
                searchOptions={searchOptions}
                setSearchOptions={setSearchOptions}

            />
        </>
    );
};

export default CatalogPage;