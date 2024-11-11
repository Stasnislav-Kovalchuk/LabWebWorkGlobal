import React, { FC } from 'react';
import FilterSelector from '../FilterSelector/FilterSelector';
import { ISearchOptions } from '../../../intefaces/commonInterfaces';

interface FilterFormProps {
  searchOptions: ISearchOptions;
  onFilterChange: (filterType: string, value: string | number) => void;
  onSearchChange: (value: string) => void;
}

const FilterForm: FC<FilterFormProps> = ({ searchOptions, onFilterChange, onSearchChange }) => {
  return (
    <form className='filter-form'>
      <FilterSelector 
        title="Price" 
        options={['50', '100', '200', '400']} 
        onFilterChange={onFilterChange} 
      />
      <FilterSelector 
        title="Rating" 
        options={['1', '2', '3', '4']} 
        onFilterChange={onFilterChange} 
      />
      <FilterSelector 
        title="Country" 
        options={['Ukraine', 'Poland', 'USA']} 
        onFilterChange={onFilterChange} 
      />
      <label>
        Search:
        <label className="input-buttons-menu">
          <input 
            placeholder="Type something..."
            onChange={(e) => onSearchChange(e.target.value)}
            value={searchOptions.search}
          />
        </label>
      </label>
    </form>
  );
};

export default FilterForm; 