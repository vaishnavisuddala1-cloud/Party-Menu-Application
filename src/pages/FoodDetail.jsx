import { Link, useNavigate, useParams } from "react-router-dom";
import { useSavedRecipes } from "../context/SavedRecipesContext";
import { menuData } from "../data/menuData";
import { getMenuItemById } from "../utils/getMenuItemById";
import "../styles/detail.css";

export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleSavedRecipe, isSaved } = useSavedRecipes();

  const item = getMenuItemById(menuData, id);

  if (!item) {
    return (
      <div className="detail-page empty-state">
        <p>Dish not found.</p>
        <button className="secondary-btn" onClick={() => navigate("/")}>
          Back to Menu
        </button>
      </div>
    );
  }

  const saved = isSaved(item.id);

  return (
    <div className="detail-page">

      {/* Toolbar */}
      <div className="detail-toolbar">
        <button
          className="secondary-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Menu
        </button>

        <div className="detail-toolbar-actions">
          <Link className="secondary-btn" to="/saved-recipes">
            Saved Recipes
          </Link>

          <button
            className={`primary-btn ${saved ? "saved" : ""}`}
            onClick={() => toggleSavedRecipe(item)}
          >
            {saved ? "Saved" : "Save Recipe"}
          </button>
        </div>
      </div>

      {/* Top Section */}
      <div className="detail-top">

        {/* Left Image */}
      <div className="detail-image-panel">
          <img
            className="detail-hero"
            src={item.image}
            alt={item.name}
          />
        </div>

        {/* Right Content */}
      <div className="detail-content">
          <div className="detail-header">
            <div className="detail-badges">
              <span className="category-badge">
                {item.category}
              </span>

              <span
                className={`diet-badge ${
                  item.isVeg ? "veg" : "non-veg"
                }`}
              >
                {item.isVeg ? "Veg" : "Non-Veg"}
              </span>
            </div>

            <h1>{item.name}</h1>

            <p className="detail-servings">
              {item.servings}
            </p>

            <p className="detail-description">
              {item.fullDescription}
            </p>
          </div>
        </div>

      </div>

      {/* Ingredients */}
      <div className="detail-section">

        <h2>Ingredients</h2>

        <ul>
          {item.ingredients.map((ingredient) => (
            <li key={`${item.id}-${ingredient.name}`}>
              <strong>{ingredient.name}</strong>

              <span>{ingredient.quantity}</span>
            </li>
          ))}
        </ul>

      </div>

    </div>
  );
}