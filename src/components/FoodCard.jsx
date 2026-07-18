import { Link } from 'react-router-dom';

export default function FoodCard({ item }) {
  return (
    <Link to={`/menu/${item.id}`} className="food-card">
      <div className="card-image">
        <img src={item.image} alt={item.name} />
        <span className={`diet-badge ${item.isVeg ? 'veg' : 'non-veg'}`}>{item.isVeg ? 'Veg' : 'Non-Veg'}</span>
      </div>
      <div className="card-body">
        <span className="category-badge">{item.category.toUpperCase()}</span>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <span className="servings">{item.servings}</span>
      </div>
    </Link>
  );
}
