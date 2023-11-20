import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CompanyRegistration.css';



const CompanyRegistration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        companyName: '',
        address: '',
        first_name: '',
        last_name: '',
        birth_date: '',
        employee_number: '',
        salary: '',
        role: ''
        
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, formData);
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/hierarchy'); // after successful login

        } catch (err) {
            console.error(err);
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
                name="first_name" 
                value={formData.first_name} 
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Last Name"
                type="text"
                name="last_name" 
                value={formData.last_name} 
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />

            <TextField
                label="Birth Date"
                type="date"
                name="birth_date" 
                value={formData.birth_date} 
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />

            <TextField
                label="Employee Number"
                type="text"
                name="employee_number" 
                value={formData.employee_number} 
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
                label="Role/Position"
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />

            {/* <TextField
                label="Manager ID"
                type="number"
                name="managerId"
                value={formData.managerId}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            /> */}

            <br />
                <Button type="submit" variant="contained" color="primary" className="registration-button" fullWidth>Register</Button>
            </form>
        </Container>
    );
};

export default CompanyRegistration;