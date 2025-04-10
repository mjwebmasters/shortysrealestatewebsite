import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Alert,
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  AccessTime,
} from '@mui/icons-material';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
});

const Contact = () => {
  const [status, setStatus] = useState({ type: '', message: '' });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(`${API_URL}/contacts`, values);
        setStatus({
          type: 'success',
          message: 'Message sent successfully! We will get back to you soon.',
        });
        formik.resetForm();
      } catch (error) {
        setStatus({
          type: 'error',
          message: 'Failed to send message. Please try again later.',
        });
      }
    },
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 8 }}>
        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Contact Information
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>
                    123 Real Estate Street
                    <br />
                    City, State 12345
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Phone sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>(555) 123-4567</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Email sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>info@realestatebroker.com</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTime sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>
                    Mon - Fri: 9:00 AM - 6:00 PM
                    <br />
                    Sat: 10:00 AM - 4:00 PM
                    <br />
                    Sun: Closed
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Send us a Message
              </Typography>

              {status.message && (
                <Alert severity={status.type} sx={{ mb: 2 }}>
                  {status.message}
                </Alert>
              )}

              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="phone"
                      name="phone"
                      label="Phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.phone && Boolean(formik.errors.phone)}
                      helperText={formik.touched.phone && formik.errors.phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="subject"
                      name="subject"
                      label="Subject"
                      value={formik.values.subject}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.subject && Boolean(formik.errors.subject)}
                      helperText={formik.touched.subject && formik.errors.subject}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="message"
                      name="message"
                      label="Message"
                      multiline
                      rows={4}
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.message && Boolean(formik.errors.message)}
                      helperText={formik.touched.message && formik.errors.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Contact; 