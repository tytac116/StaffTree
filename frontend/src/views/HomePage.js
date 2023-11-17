import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material'; // import icons
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Container className="homepage-container">
            <Typography variant="h2" gutterBottom>Welcome to StaffTree</Typography> {/* Larger title */}
            <Box mt={8}> {/* More spacing */}
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigate('/register-company')} 
                    style={{ marginRight: '20px' }} 
                    size="large" // Larger button
                    endIcon={<ArrowForward />} // Icon
                >
                    Sign Up
                </Button>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => navigate('/login')} 
                    size="large" // Larger button
                    endIcon={<ArrowForward />} // Icon
                >
                    Login
                </Button>
            </Box>
        </Container>
    );
};

export default HomePage;