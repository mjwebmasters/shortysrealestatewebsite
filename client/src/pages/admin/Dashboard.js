import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import {
  Home as HomeIcon,
  AccountBalance as MortgageIcon,
  ContactMail as ContactIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Properties',
      value: '24',
      icon: <HomeIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
    },
    {
      title: 'Active Mortgages',
      value: '12',
      icon: <MortgageIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
    },
    {
      title: 'Contact Requests',
      value: '8',
      icon: <ContactIcon sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: 200,
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: '50%',
                  bgcolor: `${stat.color}15`,
                  color: stat.color,
                  mb: 2,
                }}
              >
                {stat.icon}
              </Box>
              <Typography variant="h4" component="div" gutterBottom>
                {stat.value}
              </Typography>
              <Typography color="text.secondary" variant="h6">
                {stat.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            {/* Add recent activities list here */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            {/* Add quick action buttons here */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 