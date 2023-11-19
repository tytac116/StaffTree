import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

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

const EditEmployeeModal = ({ employee, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...employee });
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        if (employee) {
            setFormData({ ...employee });
            fetchEmployees();
        }
    }, [employee]);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employees`);
            setEmployees(response.data); // Assuming the response has a list of employees
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleManagerChange = (e) => {
        const selectedEmployeeId = employees.find(emp => `${emp.first_name} ${emp.last_name}` === e.target.value)?.id;
        setFormData({ ...formData, manager_id: selectedEmployeeId });
    };

    const handleSubmit = async () => {
        onSave(formData);
        onClose();
    };

    return (
        <Modal
            open={Boolean(employee)}
            onClose={onClose}
            aria-labelledby="edit-employee-modal-title"
            aria-describedby="edit-employee-modal-description"
        >
            <Box sx={style}>
                <TextField
                    label="First Name"
                    name="first_name"
                    value={formData.first_name || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Last Name"
                    name="last_name"
                    value={formData.last_name || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Salary"
                    name="salary"
                    value={formData.salary || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Role"
                    name="role"
                    value={formData.role || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Manager ID"
                    name="manager_id"
                    value={formData.manager_id || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

<               FormControl fullWidth margin="normal">
                    <InputLabel>Manager</InputLabel>
                    <Select
                        value={employees.find(emp => emp.id === formData.manager_id)?.name || ''}
                        onChange={handleManagerChange}
                        label="Manager"
                    >
                        {employees.map(emp => (
                            <MenuItem key={emp.id} value={`${emp.first_name} ${emp.last_name}`}>
                                {emp.first_name} {emp.last_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button onClick={handleSubmit} color="primary">
                    Save
                </Button>
            </Box>
        </Modal>
    );
};

export default EditEmployeeModal;
