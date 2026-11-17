import React, { createContext, useState, useEffect } from 'react';
import api from '../api/client';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const res = await api.get('/auth/me/');
          setUser(res.data);
        } catch (err) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = (data) => {
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    setUser(data.user);
  };

  const logout = () => {
    // 1. Удаляем токены
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // 2. Сбрасываем пользователя в стейте
    setUser(null);
    // 3. Жестко перезагружаем страницу на главную (это гарантированно сбросит все стейты)
    window.location.href = '/'; 
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-secondary">Загрузка...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};