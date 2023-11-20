import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl, Snackbar } from '@mui/material';
import {jwtDecode} from 'jwt-decode';
import MuiAlert from '@mui/material/Alert';
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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const AddEmployeeModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        email: '',
        companyId: '',
        access_role: ''
    });

    const [employees, setEmployees] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token'); // Replace 'token' with the exact key
    
        if (storedToken) {
            const decodedToken = jwtDecode(storedToken);
            //setCurrentUser(decodedToken);
            setCurrentUser({ userId: decodedToken.userId, companyId: decodedToken.companyId });
            //console.log("Decoded token:", decodedToken); // Debugging line
            setFormData(prevFormData => ({ ...prevFormData, companyId: decodedToken.companyId }));
            fetchAllEmployees();
        }
    }, []);
    
    const fetchAllEmployees = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employees`);
            const filteredEmployees = response.data.filter(emp => emp.id !== currentUser.userId);
            setEmployees(filteredEmployees);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        onSave(formData)
            .then(() => {
                // Close and reset after successful save
                onClose();
                setFormData({ email: '', companyId: '', access_role: '' });
                setOpenSnackbar(true);
            })
            .catch(error => {
                console.error('Error saving employee:', error);
                // Handle error (e.g., show error notification)
            });
    };
    

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
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
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success">
                        Employee added successfully!
                    </Alert>
                </Snackbar>
            </Box>
        </Modal>
    );
};

export default AddEmployeeModal;
