import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';



const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, formData);
      console.log(response.data);  // Handle the response appropriately
      navigate('/hierarchy');
    } catch (error) {
      console.error(error.message);  // Display error message
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
        <Button type="submit" variant="contained" color="primary" className="login-button" fullWidth>Login</Button>

      </form>
    </Container>
  );
};

export default LoginPage;
