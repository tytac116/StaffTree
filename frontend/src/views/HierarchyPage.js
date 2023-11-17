import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import axios from 'axios';
import { Container, Typography, Button, Box } from '@mui/material';
import AddEmployeeForm from '../components/AddEmployeeForm';
import jwt_decode from 'jwt-decode';

const checkAdminRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decodedToken = jwt_decode(token);
    return decodedToken.accessRole === 'Admin';
};


const HierarchyPage = () => {
    const [treeData, setTreeData] = useState([]);

    useEffect(() => {
        const fetchHierarchyData = async () => {
            try {
                // Replace with your API endpoint to fetch hierarchy data
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/hierarchy`);
                setTreeData(response.data);
            } catch (error) {
                console.error('Error fetching hierarchy data:', error);
            }
        };

        fetchHierarchyData();
    }, []);

    return (
        <Container>
            <Typography variant="h4" style={{ margin: '20px 0' }}>Company Hierarchy</Typography>
            <Box height="600px">
                <Tree data={treeData} orientation="vertical" />
            </Box>
            {/* Add a button or form to add new employees */}
        </Container>
    );
};

export default HierarchyPage;
