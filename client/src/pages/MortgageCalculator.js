import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const MortgageCalculator = () => {
  const [formData, setFormData] = useState({
    loanAmount: 300000,
    downPayment: 20,
    interestRate: 4.5,
    loanTerm: 30,
    loanType: 'Conventional',
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateMortgage = () => {
    const principal = formData.loanAmount * (1 - formData.downPayment / 100);
    const monthlyRate = formData.interestRate / 12 / 100;
    const numberOfPayments = formData.loanTerm * 12;

    // Monthly payment formula: M = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
    const monthlyPayment =
      (principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
    });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Mortgage Calculator
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom>Loan Amount</Typography>
              <Slider
                value={formData.loanAmount}
                onChange={(_, value) =>
                  setFormData((prev) => ({ ...prev, loanAmount: value }))
                }
                min={50000}
                max={2000000}
                step={10000}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `$${value.toLocaleString()}`}
              />
              <TextField
                fullWidth
                type="number"
                value={formData.loanAmount}
                onChange={handleChange}
                name="loanAmount"
                InputProps={{
                  startAdornment: '$',
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography gutterBottom>Down Payment (%)</Typography>
              <Slider
                value={formData.downPayment}
                onChange={(_, value) =>
                  setFormData((prev) => ({ ...prev, downPayment: value }))
                }
                min={0}
                max={50}
                step={1}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}%`}
              />
              <TextField
                fullWidth
                type="number"
                value={formData.downPayment}
                onChange={handleChange}
                name="downPayment"
                InputProps={{
                  endAdornment: '%',
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography gutterBottom>Interest Rate (%)</Typography>
              <Slider
                value={formData.interestRate}
                onChange={(_, value) =>
                  setFormData((prev) => ({ ...prev, interestRate: value }))
                }
                min={1}
                max={10}
                step={0.1}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}%`}
              />
              <TextField
                fullWidth
                type="number"
                value={formData.interestRate}
                onChange={handleChange}
                name="interestRate"
                InputProps={{
                  endAdornment: '%',
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography gutterBottom>Loan Term (years)</Typography>
              <Slider
                value={formData.loanTerm}
                onChange={(_, value) =>
                  setFormData((prev) => ({ ...prev, loanTerm: value }))
                }
                min={10}
                max={40}
                step={5}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} years`}
              />
              <TextField
                fullWidth
                type="number"
                value={formData.loanTerm}
                onChange={handleChange}
                name="loanTerm"
                InputProps={{
                  endAdornment: 'years',
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Loan Type</InputLabel>
                <Select
                  value={formData.loanType}
                  onChange={handleChange}
                  name="loanType"
                  label="Loan Type"
                >
                  <MenuItem value="Conventional">Conventional</MenuItem>
                  <MenuItem value="FHA">FHA</MenuItem>
                  <MenuItem value="VA">VA</MenuItem>
                  <MenuItem value="USDA">USDA</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={calculateMortgage}
                size="large"
              >
                Calculate
              </Button>
            </Grid>
          </Grid>

          {result && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                Results
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">Monthly Payment</Typography>
                    <Typography variant="h4" color="primary">
                      ${result.monthlyPayment.toFixed(2)}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">Total Payment</Typography>
                    <Typography variant="h4" color="primary">
                      ${result.totalPayment.toFixed(2)}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">Total Interest</Typography>
                    <Typography variant="h4" color="primary">
                      ${result.totalInterest.toFixed(2)}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default MortgageCalculator; 