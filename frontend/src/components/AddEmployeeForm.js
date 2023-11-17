import React from 'react';
import { Button, TextField, Box } from '@mui/material';

const AddEmployeeForm = ({ isAdmin }) => {
    const isAdmin = checkAdminRole();
    if (!isAdmin) return null;

    return (
        <Box>
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
        </Box>
    );
};

export default AddEmployeeForm;
