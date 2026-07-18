import { Link } from 'react-router-dom';
import { useSavedRecipes } from '../context/SavedRecipesContext';

export default function SavedRecipeCard({ item }) {
  const { toggleSavedRecipe } = useSavedRecipes();

  return (
    <article className="saved-recipe-card">
      <div className="saved-card-link-wrapper">
        <Link to={`/menu/${item.id}`} className="saved-card-link">
          <div className="card-image">
            <img src={item.image} alt={item.name} />
            <span className={`diet-badge ${item.isVeg ? 'veg' : 'non-veg'}`}>{item.isVeg ? 'Veg' : 'Non-Veg'}</span>
          </div>
          <div className="saved-card-body">
            <div className="saved-card-top">
              <div>
                <span className="category-badge">{item.category.toUpperCase()}</span>
              </div>
            </div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span className="servings">{item.servings}</span>
          </div>
        </Link>
      </div>
      <button className="remove-btn" onClick={() => toggleSavedRecipe(item)}>
        Remove
      </button>
    </article>
  );
}
