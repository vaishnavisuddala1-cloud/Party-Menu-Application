import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/authService';
import { getStoredToken, getStoredUser, removeStorage, STORAGE_KEYS, writeStorage } from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [token, setToken] = useState(() => getStoredToken());
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      writeStorage(STORAGE_KEYS.token, token);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      writeStorage(STORAGE_KEYS.user, user);
    }
  }, [user]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await signIn(credentials);
      const nextUser = response.user ?? { name: 'Admin' };
      const nextToken = response.token ?? 'demo-token';
      setUser(nextUser);
      setToken(nextToken);
      writeStorage(STORAGE_KEYS.token, nextToken);
      writeStorage(STORAGE_KEYS.user, nextUser);
      navigate('/');
      return response;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    removeStorage(STORAGE_KEYS.token);
    removeStorage(STORAGE_KEYS.user);
    navigate('/signin');
  };

  const value = useMemo(
    () => ({ user, token, loading, login, logout, isAuthenticated: Boolean(token) }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
