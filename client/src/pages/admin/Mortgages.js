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
  Chip,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const AdminMortgages = () => {
  const [mortgages, setMortgages] = useState([]);

  useEffect(() => {
    fetchMortgages();
  }, []);

  const fetchMortgages = async () => {
    try {
      const response = await axios.get(`${API_URL}/mortgages`);
      setMortgages(response.data);
    } catch (error) {
      console.error('Error fetching mortgages:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this mortgage application?')) {
      try {
        await axios.delete(`${API_URL}/mortgages/${id}`);
        fetchMortgages();
      } catch (error) {
        console.error('Error deleting mortgage:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Manage Mortgage Applications
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Applicant Name</TableCell>
              <TableCell>Loan Amount</TableCell>
              <TableCell>Loan Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Application Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mortgages.map((mortgage) => (
              <TableRow key={mortgage._id}>
                <TableCell>{`${mortgage.firstName} ${mortgage.lastName}`}</TableCell>
                <TableCell>${mortgage.loanAmount.toLocaleString()}</TableCell>
                <TableCell>{mortgage.loanType}</TableCell>
                <TableCell>
                  <Chip
                    label={mortgage.status}
                    color={getStatusColor(mortgage.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(mortgage.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {/* Add view details functionality */}}
                  >
                    <ViewIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => {/* Add edit functionality */}}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(mortgage._id)}
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

export default AdminMortgages; 