import React, { useState } from 'react';
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

const AddEmployeeModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        email: '',
        companyId: '',
        access_role: ''
    });

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
                />
                <TextField
                    label="Access Role"
                    name="access_role"
                    value={formData.access_role}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button onClick={handleSubmit} color="primary">
                    Add Employee
                </Button>
            </Box>
        </Modal>
    );
};

export default AddEmployeeModal;
