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

const EditEmployeeModal = ({ employee, onClose, onSave }) => {
    const [formData, setFormData] = useState(employee);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        // Call onSave with the updated formData
        onSave(formData);
        onClose(); // Close modal after save
    };

    return (
        <Modal
            open={Boolean(employee)}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <TextField
                    label="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                {/* Add other fields similarly */}
                <Button onClick={handleSubmit} color="primary">
                    Save
                </Button>
            </Box>
        </Modal>
    );
};

export default EditEmployeeModal;
