import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSavedRecipes } from '../context/SavedRecipesContext';

export default function Header() {
  const { user, logout } = useAuth();
  const { savedRecipes } = useSavedRecipes();

  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">Celebrate with</p>
        <h1>Party Menu</h1>
        <p className="welcome-text">Welcome, {user?.name || 'Guest'}</p>
      </div>
      <div className="header-actions">
        <div className="user-info">
          <Link to="/saved-recipes" className="saved-link">
            Saved Recipes
            {savedRecipes.length > 0 ? <span className="badge">{savedRecipes.length}</span> : null}
          </Link>
        </div>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}
