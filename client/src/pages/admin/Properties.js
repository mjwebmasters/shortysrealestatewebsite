import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${API_URL}/properties`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await axios.delete(`${API_URL}/properties/${id}`);
        fetchProperties();
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Manage Properties
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {/* Add navigation to create property form */}}
        >
          Add Property
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property._id}>
                <TableCell>{property.title}</TableCell>
                <TableCell>{property.location}</TableCell>
                <TableCell>${property.price.toLocaleString()}</TableCell>
                <TableCell>{property.type}</TableCell>
                <TableCell>{property.status}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {/* Add navigation to edit property */}}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(property._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminProperties; 