import { createContext, useContext, useMemo, useState } from 'react';
import { getStoredSavedRecipes, STORAGE_KEYS, writeStorage } from '../utils/storage';

const SavedRecipesContext = createContext(null);

export function SavedRecipesProvider({ children }) {
  const [savedRecipes, setSavedRecipes] = useState(() => getStoredSavedRecipes());

  const toggleSavedRecipe = (recipe) => {
    setSavedRecipes((current) => {
      const exists = current.some((item) => item.id === recipe.id);
      const next = exists ? current.filter((item) => item.id !== recipe.id) : [...current, recipe];
      writeStorage(STORAGE_KEYS.savedRecipes, next);
      return next;
    });
  };

  const isSaved = (recipeId) => savedRecipes.some((item) => item.id === recipeId);

  const value = useMemo(
    () => ({ savedRecipes, toggleSavedRecipe, isSaved }),
    [savedRecipes]
  );

  return <SavedRecipesContext.Provider value={value}>{children}</SavedRecipesContext.Provider>;
}

export function useSavedRecipes() {
  return useContext(SavedRecipesContext);
}
