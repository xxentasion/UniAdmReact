import React, { createContext, useState, useContext } from 'react';

// Создаем контекст
const AuthContext = createContext();

// Хук для использования контекста
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const role = localStorage.getItem('role') || 'user'; // Значение по умолчанию - обычный пользователь
    return isAuthenticated ? { isAuthenticated, role } : null;
  });

  const login = (role) => {
    setUser({ isAuthenticated: true, role });
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('role', role);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
