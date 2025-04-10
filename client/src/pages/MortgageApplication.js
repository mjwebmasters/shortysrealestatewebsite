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
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const steps = ['Personal Information', 'Loan Details', 'Financial Information'];

const validationSchema = Yup.object({
  // Personal Information
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipCode: Yup.string().required('ZIP code is required'),

  // Loan Details
  loanAmount: Yup.number()
    .required('Loan amount is required')
    .min(50000, 'Minimum loan amount is $50,000'),
  downPayment: Yup.number()
    .required('Down payment is required')
    .min(0, 'Down payment cannot be negative'),
  loanTerm: Yup.number()
    .required('Loan term is required')
    .min(10, 'Minimum loan term is 10 years')
    .max(40, 'Maximum loan term is 40 years'),
  interestRate: Yup.number()
    .required('Interest rate is required')
    .min(1, 'Interest rate must be at least 1%')
    .max(10, 'Interest rate cannot exceed 10%'),
  loanType: Yup.string().required('Loan type is required'),

  // Financial Information
  annualIncome: Yup.number()
    .required('Annual income is required')
    .min(0, 'Annual income cannot be negative'),
  employmentStatus: Yup.string().required('Employment status is required'),
  creditScore: Yup.number()
    .required('Credit score is required')
    .min(300, 'Credit score must be at least 300')
    .max(850, 'Credit score cannot exceed 850'),
  monthlyDebt: Yup.number()
    .required('Monthly debt is required')
    .min(0, 'Monthly debt cannot be negative'),
});

const MortgageApplication = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [status, setStatus] = useState({ type: '', message: '' });

  const formik = useFormik({
    initialValues: {
      // Personal Information
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',

      // Loan Details
      loanAmount: '',
      downPayment: '',
      loanTerm: 30,
      interestRate: '',
      loanType: 'Conventional',

      // Financial Information
      annualIncome: '',
      employmentStatus: '',
      creditScore: '',
      monthlyDebt: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(`${API_URL}/mortgages`, values);
        setStatus({
          type: 'success',
          message: 'Application submitted successfully! We will contact you soon.',
        });
        formik.resetForm();
      } catch (error) {
        setStatus({
          type: 'error',
          message: 'Failed to submit application. Please try again later.',
        });
      }
    },
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
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
            <Grid item xs={12} sm={6}>
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
                id="address"
                name="address"
                label="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="City"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="state"
                name="state"
                label="State"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="zipCode"
                name="zipCode"
                label="ZIP Code"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                helperText={formik.touched.zipCode && formik.errors.zipCode}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="loanAmount"
                name="loanAmount"
                label="Loan Amount"
                type="number"
                value={formik.values.loanAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.loanAmount && Boolean(formik.errors.loanAmount)}
                helperText={formik.touched.loanAmount && formik.errors.loanAmount}
                InputProps={{
                  startAdornment: '$',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="downPayment"
                name="downPayment"
                label="Down Payment"
                type="number"
                value={formik.values.downPayment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.downPayment && Boolean(formik.errors.downPayment)}
                helperText={formik.touched.downPayment && formik.errors.downPayment}
                InputProps={{
                  startAdornment: '$',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="loanTerm"
                name="loanTerm"
                label="Loan Term (years)"
                type="number"
                value={formik.values.loanTerm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.loanTerm && Boolean(formik.errors.loanTerm)}
                helperText={formik.touched.loanTerm && formik.errors.loanTerm}
                InputProps={{
                  endAdornment: 'years',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="interestRate"
                name="interestRate"
                label="Interest Rate"
                type="number"
                value={formik.values.interestRate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.interestRate && Boolean(formik.errors.interestRate)}
                helperText={formik.touched.interestRate && formik.errors.interestRate}
                InputProps={{
                  endAdornment: '%',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Loan Type</InputLabel>
                <Select
                  value={formik.values.loanType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="loanType"
                  label="Loan Type"
                >
                  <MenuItem value="Conventional">Conventional</MenuItem>
                  <MenuItem value="FHA">FHA</MenuItem>
                  <MenuItem value="VA">VA</MenuItem>
                  <MenuItem value="USDA">USDA</MenuItem>
                </Select>
                {formik.touched.loanType && formik.errors.loanType && (
                  <Typography color="error" variant="caption">
                    {formik.errors.loanType}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="annualIncome"
                name="annualIncome"
                label="Annual Income"
                type="number"
                value={formik.values.annualIncome}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.annualIncome && Boolean(formik.errors.annualIncome)}
                helperText={formik.touched.annualIncome && formik.errors.annualIncome}
                InputProps={{
                  startAdornment: '$',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Employment Status</InputLabel>
                <Select
                  value={formik.values.employmentStatus}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="employmentStatus"
                  label="Employment Status"
                >
                  <MenuItem value="Full Time">Full Time</MenuItem>
                  <MenuItem value="Part Time">Part Time</MenuItem>
                  <MenuItem value="Self Employed">Self Employed</MenuItem>
                  <MenuItem value="Retired">Retired</MenuItem>
                </Select>
                {formik.touched.employmentStatus && formik.errors.employmentStatus && (
                  <Typography color="error" variant="caption">
                    {formik.errors.employmentStatus}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="creditScore"
                name="creditScore"
                label="Credit Score"
                type="number"
                value={formik.values.creditScore}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.creditScore && Boolean(formik.errors.creditScore)}
                helperText={formik.touched.creditScore && formik.errors.creditScore}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="monthlyDebt"
                name="monthlyDebt"
                label="Monthly Debt"
                type="number"
                value={formik.values.monthlyDebt}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.monthlyDebt && Boolean(formik.errors.monthlyDebt)}
                helperText={formik.touched.monthlyDebt && formik.errors.monthlyDebt}
                InputProps={{
                  startAdornment: '$',
                }}
              />
            </Grid>
          </Grid>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Mortgage Application
          </Typography>

          {status.message && (
            <Alert severity={status.type} sx={{ mb: 2 }}>
              {status.message}
            </Alert>
          )}

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={formik.handleSubmit}>
            {getStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  Submit Application
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default MortgageApplication; 