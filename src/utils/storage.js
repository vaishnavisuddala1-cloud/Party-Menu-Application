export const STORAGE_KEYS = {
  token: 'party_menu_token',
  user: 'party_menu_user',
  savedRecipes: 'party_menu_saved_recipes',
};

export function readStorage(key) {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export function writeStorage(key, value) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorage(key) {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(key);
}

export function getStoredUser() {
  return readStorage(STORAGE_KEYS.user);
}

export function getStoredToken() {
  return readStorage(STORAGE_KEYS.token);
}

export function getStoredSavedRecipes() {
  return readStorage(STORAGE_KEYS.savedRecipes) ?? [];
}
