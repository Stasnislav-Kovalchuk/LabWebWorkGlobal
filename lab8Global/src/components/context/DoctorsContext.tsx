import React, { createContext, useContext, useState, FC, ReactNode, useCallback } from 'react';
import { IDoctor } from "../../intefaces/doctorInterfaces";
import doctorsData from '../../data.json';

const flattenedDoctorsData: IDoctor[] = doctorsData.flat();

export interface SearchOptions {
  term: string;
  price: number | null;
  rating: number | null;
  country: string;
  sort: string;
}

interface DoctorsContextProps {
  doctors: IDoctor[];
  setDoctors: React.Dispatch<React.SetStateAction<IDoctor[]>>;
  searchOptions: SearchOptions;
  setSearchOptions: React.Dispatch<React.SetStateAction<SearchOptions>>;
  filteredDoctors: IDoctor[];
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
    price: null,
    rating: null,
    country: '',
    sort: ''
  });

  const filterDoctors = useCallback((doctors: IDoctor[], options: SearchOptions): IDoctor[] => {
    return doctors.filter(doctor => {
      const matchesTerm = doctor.name.toLowerCase().includes(options.term.toLowerCase());
      const matchesPrice = options.price === null || doctor.price <= options.price;
      const matchesRating = options.rating === null || doctor.rating >= options.rating;

      return matchesTerm && matchesPrice && matchesRating;
    }).sort((a, b) => {
      if (options.sort === 'price') {
        return a.price - b.price;
      } else if (options.sort === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
  }, []);

  const filteredDoctors = filterDoctors(doctors, searchOptions);

  return (
    <DoctorsContext.Provider value={{ doctors, setDoctors, searchOptions, setSearchOptions, filteredDoctors }}>
      {children}
    </DoctorsContext.Provider>
  );
};

export { DoctorsContext };
