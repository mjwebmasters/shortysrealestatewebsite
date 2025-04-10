import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import MortgageCalculator from './pages/MortgageCalculator';
import MortgageApplication from './pages/MortgageApplication';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProperties from './pages/admin/Properties';
import AdminMortgages from './pages/admin/Mortgages';
import AdminContacts from './pages/admin/Contacts';
import PrivateRoute from './components/routing/PrivateRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
            <Route path="/mortgage-application" element={<MortgageApplication />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
            <Route path="/admin/properties" element={<PrivateRoute><AdminProperties /></PrivateRoute>} />
            <Route path="/admin/mortgages" element={<PrivateRoute><AdminMortgages /></PrivateRoute>} />
            <Route path="/admin/contacts" element={<PrivateRoute><AdminContacts /></PrivateRoute>} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
