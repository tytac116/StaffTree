import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import {jwtDecode} from 'jwt-decode';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const AddEmployeeModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        email: '',
        companyId: '',
        access_role: ''
    });

    useEffect(() => {
        const storedToken = localStorage.getItem('token'); // Replace 'token' with the exact key
        console.log("Captured token:", storedToken); // Debugging line
    
        if (storedToken) {
            const decodedToken = jwtDecode(storedToken);
            console.log("Decoded token:", decodedToken); // Debugging line
            setFormData(prevFormData => ({ ...prevFormData, companyId: decodedToken.companyId }));
        }
    }, []);
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        onSave(formData);
        onClose();
        setFormData({ email: '', companyId: '', access_role: '' }); // Reset form
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="add-employee-modal-title"
            aria-describedby="add-employee-modal-description"
        >
            <Box sx={style}>
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Company ID"
                    name="companyId"
                    value={formData.companyId}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="access-role-label">Access Role</InputLabel>
                    <Select
                        labelId="access-role-label"
                        name="access_role"
                        value={formData.access_role}
                        label="Access Role"
                        onChange={handleChange}
                    >
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Employee">Employee</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={handleSubmit} color="primary">
                    Add Employee
                </Button>
            </Box>
        </Modal>
    );
};

export default AddEmployeeModal;
