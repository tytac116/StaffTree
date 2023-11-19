import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

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

    useEffect(() => {
        if (employee) {
            setFormData({ ...employee });
        }
    }, [employee]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                <Button onClick={handleSubmit} color="primary">
                    Save
                </Button>
            </Box>
        </Modal>
    );
};

export default EditEmployeeModal;
