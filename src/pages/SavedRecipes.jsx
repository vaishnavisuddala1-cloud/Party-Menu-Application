import { Link } from 'react-router-dom';
import SavedRecipeCard from '../components/SavedRecipeCard';
import { useSavedRecipes } from '../context/SavedRecipesContext';
import '../styles/saved.css';

export default function SavedRecipes() {
  const { savedRecipes } = useSavedRecipes();

  return (
    <div className="saved-page">
      <div className="saved-header">
        <div>
          <p className="eyebrow">Your Collection</p>
          <h1>Saved Recipes</h1>
          <span>{savedRecipes.length} recipes</span>
        </div>
        <Link className="secondary-btn" to="/">
          Back to Menu
        </Link>
      </div>
      {savedRecipes.length > 0 ? (
        <div className="saved-grid">
          {savedRecipes.map((item) => (
            <SavedRecipeCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="saved-empty-state">
          <p>No saved recipes yet</p>
          <Link className="browse-link" to="/">
            Browse the menu
          </Link>
        </div>
      )}
    </div>
  );
}
