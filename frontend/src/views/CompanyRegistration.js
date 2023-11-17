import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import './CompanyRegistration.css';


const CompanyRegistration = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        companyName: '',
        address: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        employeeNumber: '',
        salary: '',
        role: '',
        managerId: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, formData);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container maxWidth="sm" className="registration-container">
            <Typography variant="h4" className="registration-title">Company Registration</Typography>
            <br />
            <Typography variant="h6" className="registration-heading">Enter Company Details</Typography>
            <form onSubmit={handleSubmit} className="registration-form">
            
            <TextField
                label="Company Name"
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            
            <TextField
                label="Address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            < br />
            <Typography variant="h6" className="registration-employee">Add Yourself As The First Employee! </Typography>

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
            
            <TextField
                label="First Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />

            <TextField
                label="Birth Date"
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />

            <TextField
                label="Employee Number"
                type="text"
                name="employeeNumber"
                value={formData.employeeNumber}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />

            <TextField
                label="Salary"
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />

            <TextField
                label="Role"
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />

            <TextField
                label="Manager ID"
                type="number"
                name="managerId"
                value={formData.managerId}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />

            <br />
                <Button type="submit" variant="contained" color="primary" className="registration-button" fullWidth>Register</Button>
            </form>
        </Container>
    );
};

export default CompanyRegistration;