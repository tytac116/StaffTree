import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './CompleteRegistration.css';

const CompleteRegistration = () => {
    const navigate = useNavigate();
    const { token } = useParams(); // Assuming the token is passed as a URL param
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        birth_date: '',
        employee_number: '',
        salary: '',
        role: '',
        manager_id: ''
    });
    
    const [success, setSuccess] = useState(false);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchAllEmployees();
    }, []);

    const fetchAllEmployees = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employees`);
            const filteredEmployees = response.data.filter(emp => emp.email !== formData.email);
            setEmployees(filteredEmployees);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/employees/complete-registration`, { ...formData, token });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
        } catch (err) {
            console.error(err);
            setSuccess(false);
        }
    };

    return (
        <Container maxWidth="sm" className="complete-registration-container">
            <Typography variant="h4" className="complete-registration-title">Complete Your Registration</Typography>
            <form onSubmit={handleSubmit} className="complete-registration-form">
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
        label="Role"
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
        type="text"
        name="managerId"
        value={formData.managerId}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
    /> */}
    <FormControl fullWidth margin="normal">
                <InputLabel id="manager-label">Manager</InputLabel>
                <Select
                    labelId="manager-label"
                    name="manager_id"
                    value={formData.manager_id}
                    label="Manager"
                    onChange={handleChange}
                >
                    {employees.map(emp => (
                        <MenuItem key={emp.id} value={emp.id}>
                            {emp.first_name} {emp.last_name}
                        </MenuItem>
                    ))}
                </Select>
    </FormControl>
    <Button type="submit" variant="contained" color="primary" className="complete-registration-button" fullWidth>Complete Registration</Button>
</form>
            {success && <Alert severity="success">Registration successful! Redirecting to login...</Alert>}
        </Container>
    );
};

export default CompleteRegistration;
