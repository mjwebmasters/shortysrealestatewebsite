import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Home as HomeIcon, Calculator, Phone } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await axios.get(`${API_URL}/properties/featured`);
        setFeaturedProperties(response.data);
      } catch (error) {
        console.error('Error fetching featured properties:', error);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Find Your Dream Home & Get the Best Mortgage Rates
            </h1>
            <p className="text-xl mb-8">
              We help you find the perfect property and secure the best mortgage rates
              for your dream home.
            </p>
            <div className="space-x-4">
              <Button asChild size="lg" variant="default">
                <Link to="/properties">Browse Properties</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/mortgage-calculator">Calculate Mortgage</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <Card key={property._id}>
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <CardHeader>
                  <CardTitle>{property.title}</CardTitle>
                  <CardDescription>{property.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">
                    ${property.price.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <span>{property.bedrooms} beds</span>
                    <span>{property.bathrooms} baths</span>
                    <span>{property.squareFeet} sqft</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/properties/${property._id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <HomeIcon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Property Listings</CardTitle>
                <CardDescription>
                  Browse through our extensive collection of properties for sale
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Mortgage Calculator</CardTitle>
                <CardDescription>
                  Calculate your monthly payments and find the best mortgage rates
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Expert Guidance</CardTitle>
                <CardDescription>
                  Get professional advice from our experienced mortgage brokers
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Home Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your mortgage options and find the perfect
            property for you.
          </p>
          <Button asChild size="lg" variant="outline">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home; 