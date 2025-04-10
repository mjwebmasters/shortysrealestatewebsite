import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../config/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axiosInstance.get('/api/users/me');
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem('token');
      delete axiosInstance.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/api/users/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 