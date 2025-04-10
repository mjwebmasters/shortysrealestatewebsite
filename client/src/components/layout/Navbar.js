import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Container,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Home,
  Business,
  Calculate,
  ContactMail,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/');
  };

  const handleAdminClick = () => {
    handleClose();
    navigate('/admin');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" component={RouterLink} to="/" sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'inherit' 
          }}>
            Real Estate Broker
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/"
              startIcon={<Home />}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/properties"
              startIcon={<Business />}
            >
              Properties
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/mortgage-calculator"
              startIcon={<Calculate />}
            >
              Calculator
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/contact"
              startIcon={<ContactMail />}
            >
              Contact
            </Button>
          </Box>

          {isAuthenticated ? (
            <>
              <IconButton
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {user?.role === 'admin' && (
                  <MenuItem onClick={handleAdminClick}>Admin Dashboard</MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              component={RouterLink}
              to="/login"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 