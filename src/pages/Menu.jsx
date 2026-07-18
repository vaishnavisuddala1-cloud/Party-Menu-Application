import { useMemo, useState } from 'react';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import FoodCard from '../components/FoodCard';
import { menuData } from '../data/menuData';
import { filterMenuItems } from '../utils/filterMenuItems';
import '../styles/menu.css';

const initialFilters = {
  category: 'all',
  diet: 'all',
  search: '',
};

export default function Menu() {
  const [filters, setFilters] = useState(initialFilters);

  const filteredItems = useMemo(() => filterMenuItems(menuData, filters), [filters]);

  return (
    <div className="page-shell">
      <Header />
      <main className="menu-page">
        <FilterBar filters={filters} onFilterChange={setFilters} />
        <div className="results-header">
          <h2>Menu</h2>
          <span>{filteredItems.length} items found</span>
        </div>
        {filteredItems.length > 0 ? (
          <div className="card-grid">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No dishes found. Try different filters.</p>
          </div>
        )}
      </main>
    </div>
  );
}
