import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }>
          <Route index element={<Dashboard />} />
          {/* Add other admin routes here */}
        </Route>

        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </Router>
  );
};

export default App; 