import React, { FC } from 'react';

export interface SearchOptions {
  title: string;
  options: string[];
}

interface FilterSelectorProps {
  searchOptions?: SearchOptions;
  title?: string;
  options?: string[];
  onFilterChange: (filterType: string, value: string | number) => void;
  onSearchChange?: (value: string) => void;
}

const FilterSelector: FC<FilterSelectorProps> = ({ searchOptions, title, options, onFilterChange }) => {
  const displayTitle = searchOptions?.title || title || '';
  const displayOptions = searchOptions?.options || options || [];

  if (!displayTitle || displayOptions.length === 0) return null;

  return (
    <label>
      {displayTitle}:
      <select onChange={(e) => onFilterChange(displayTitle.toLowerCase(), e.target.value)}>
        <option value="">Select a {displayTitle.toLowerCase()}</option>
        {displayOptions.map((option: string) => (
          <option key={option} value={option}>
            {displayTitle === 'Price' ? `< ${option}` : option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default FilterSelector; 