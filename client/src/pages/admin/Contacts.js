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
  IconButton,
  Box,
  Chip,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Delete as DeleteIcon,
  Mail as MailIcon,
} from '@mui/icons-material';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API_URL}/contacts`);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact message?')) {
      try {
        await axios.delete(`${API_URL}/contacts/${id}`);
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'error';
      case 'in progress':
        return 'warning';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Manage Contact Messages
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact._id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.subject}</TableCell>
                <TableCell>
                  <Chip
                    label={contact.status}
                    color={getStatusColor(contact.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(contact.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {/* Add view message functionality */}}
                  >
                    <ViewIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => {/* Add email functionality */}}
                  >
                    <MailIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(contact._id)}
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

export default AdminContacts; 