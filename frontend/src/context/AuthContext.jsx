import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storage = localStorage.getItem('nova_salud_user');
    return storage ? JSON.parse(storage) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('nova_salud_token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('nova_salud_token', token);
    } else {
      localStorage.removeItem('nova_salud_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('nova_salud_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nova_salud_user');
    }
  }, [user]);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    setToken(response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
