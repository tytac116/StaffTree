import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';



const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, formData);
      console.log(response.data); // For debugging
  
      // Store the token in local storage
      localStorage.setItem('token', response.data.token);
  
      // Navigate to the hierarchy page
      navigate('/hierarchy');
      setSuccess(true);
    } catch (error) {
      console.error(error.message); // Display error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className="login-container">
      <Typography variant="h4" className="login-title">Login</Typography>
      <form onSubmit={handleSubmit} className="login-form">
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        < br />
        {loading ? <CircularProgress /> : <Button type="submit" variant="contained" color="primary" className="login-button" fullWidth>Login</Button>}
        <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
          <Alert onClose={() => setSuccess(false)} severity="success">
            Login successful!
          </Alert>
        </Snackbar>
      </form>
    </Container>
  );
};

export default LoginPage;
