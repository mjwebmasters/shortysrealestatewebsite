import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Paper,
  Chip,
} from '@mui/material';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    propertyType: 'all',
    minPrice: 0,
    maxPrice: 5000000,
    bedrooms: 0,
    bathrooms: 0,
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${API_URL}/properties`);
        setProperties(response.data);
        setFilteredProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    let filtered = [...properties];

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter((property) =>
        property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.location.address.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.location.city.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply property type filter
    if (filters.propertyType !== 'all') {
      filtered = filtered.filter(
        (property) => property.propertyType === filters.propertyType
      );
    }

    // Apply price range filter
    filtered = filtered.filter(
      (property) =>
        property.price >= filters.minPrice &&
        property.price <= filters.maxPrice
    );

    // Apply bedrooms filter
    if (filters.bedrooms > 0) {
      filtered = filtered.filter(
        (property) => property.features.bedrooms >= filters.bedrooms
      );
    }

    // Apply bathrooms filter
    if (filters.bathrooms > 0) {
      filtered = filtered.filter(
        (property) => property.features.bathrooms >= filters.bathrooms
      );
    }

    setFilteredProperties(filtered);
  }, [filters, properties]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 8 }}>
        {/* Filters */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Search"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Property Type</InputLabel>
                <Select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  label="Property Type"
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="Single Family">Single Family</MenuItem>
                  <MenuItem value="Multi Family">Multi Family</MenuItem>
                  <MenuItem value="Condo">Condo</MenuItem>
                  <MenuItem value="Townhouse">Townhouse</MenuItem>
                  <MenuItem value="Land">Land</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography gutterBottom>Price Range</Typography>
              <Slider
                value={[filters.minPrice, filters.maxPrice]}
                onChange={(_, value) => {
                  handleFilterChange('minPrice', value[0]);
                  handleFilterChange('maxPrice', value[1]);
                }}
                valueLabelDisplay="auto"
                min={0}
                max={5000000}
                step={100000}
                valueLabelFormat={(value) => `$${value.toLocaleString()}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom>Bedrooms</Typography>
              <Slider
                value={filters.bedrooms}
                onChange={(_, value) => handleFilterChange('bedrooms', value)}
                valueLabelDisplay="auto"
                min={0}
                max={10}
                step={1}
                marks
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom>Bathrooms</Typography>
              <Slider
                value={filters.bathrooms}
                onChange={(_, value) => handleFilterChange('bathrooms', value)}
                valueLabelDisplay="auto"
                min={0}
                max={10}
                step={1}
                marks
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Property Listings */}
        <Grid container spacing={4}>
          {filteredProperties.map((property) => (
            <Grid item key={property._id} xs={12} md={6} lg={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={property.images[0] || 'https://via.placeholder.com/300x200'}
                  alt={property.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {property.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {property.location.address}
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    ${property.price.toLocaleString()}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={`${property.features.bedrooms} Beds`}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={`${property.features.bathrooms} Baths`}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={`${property.features.squareFeet} sqft`}
                      size="small"
                    />
                  </Box>
                  <Button
                    component={RouterLink}
                    to={`/properties/${property._id}`}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredProperties.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No properties found matching your criteria
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Properties; 