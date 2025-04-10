import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Button,
  Chip,
  Divider,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import {
  LocationOn,
  Home,
  Bed,
  Bathtub,
  SquareFoot,
  CalendarToday,
} from '@mui/icons-material';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`${API_URL}/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return (
      <Container>
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography variant="h5">Loading...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 8 }}>
        {/* Property Images */}
        <Paper elevation={3} sx={{ mb: 4 }}>
          <Grid container>
            <Grid item xs={12} md={8}>
              <Box
                component="img"
                src={property.images[selectedImage] || 'https://via.placeholder.com/800x600'}
                alt={property.title}
                sx={{
                  width: '100%',
                  height: 500,
                  objectFit: 'cover',
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <ImageList cols={2} rowHeight={164} sx={{ height: 500 }}>
                {property.images.map((image, index) => (
                  <ImageListItem
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      cursor: 'pointer',
                      opacity: selectedImage === index ? 1 : 0.7,
                      '&:hover': {
                        opacity: 1,
                      },
                    }}
                  >
                    <img
                      src={image || 'https://via.placeholder.com/400x300'}
                      alt={`${property.title} - ${index + 1}`}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      position="bottom"
                      sx={{
                        background:
                          'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={4}>
          {/* Property Details */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom>
                {property.title}
              </Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                ${property.price.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body1">
                  {property.location.address}
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Chip
                  icon={<Bed />}
                  label={`${property.features.bedrooms} Bedrooms`}
                  sx={{ mr: 1 }}
                />
                <Chip
                  icon={<Bathtub />}
                  label={`${property.features.bathrooms} Bathrooms`}
                  sx={{ mr: 1 }}
                />
                <Chip
                  icon={<SquareFoot />}
                  label={`${property.features.squareFeet} sqft`}
                  sx={{ mr: 1 }}
                />
                <Chip
                  icon={<CalendarToday />}
                  label={`Built in ${property.features.yearBuilt}`}
                />
              </Box>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" paragraph>
                {property.description}
              </Typography>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Interested in this property?
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Contact us to schedule a viewing or get more information about this property.
              </Typography>
              <Button
                component={RouterLink}
                to="/contact"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ mb: 2 }}
              >
                Contact Agent
              </Button>
              <Button
                component={RouterLink}
                to="/mortgage-calculator"
                variant="outlined"
                color="primary"
                fullWidth
                size="large"
              >
                Calculate Mortgage
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PropertyDetail; 