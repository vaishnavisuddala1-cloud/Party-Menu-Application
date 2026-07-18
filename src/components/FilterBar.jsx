import { useState } from 'react';

const categoryOptions = ['all', 'starter', 'main', 'sides', 'desert'];
const dietOptions = ['all', 'veg', 'nonveg'];

export default function FilterBar({ filters, onFilterChange }) {
  const [searchValue, setSearchValue] = useState(filters.search || '');

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onFilterChange({ ...filters, search: searchValue });
  };

  return (
    <section className="filter-section">
      <div className="filter-group">
        <h3>Category</h3>
        <div className="chip-row">
          {categoryOptions.map((option) => (
            <button
              key={option}
              className={`chip ${filters.category === option ? 'active' : ''}`}
              onClick={() => onFilterChange({ ...filters, category: option })}
            >
              {option === 'all' ? 'All' : option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h3>Diet</h3>
        <div className="chip-row">
          {dietOptions.map((option) => (
            <button
              key={option}
              className={`chip ${filters.diet === option ? 'active' : ''}`}
              onClick={() => onFilterChange({ ...filters, diet: option })}
            >
              {option === 'all' ? 'All' : option === 'veg' ? 'Veg' : 'Nonveg'}
            </button>
          ))}
        </div>
      </div>

      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search dishes"
          aria-label="Search dishes"
        />
        <button type="submit">Search</button>
      </form>
    </section>
  );
}
