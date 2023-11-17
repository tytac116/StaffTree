import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import axios from 'axios';
import { Container, Typography, Button, Box } from '@mui/material';
import AddEmployeeForm from '../components/AddEmployeeForm';


const HierarchyPage = () => {
    const [treeData, setTreeData] = useState([]);

    const sampleData = [
        {
            name: "CEO (John Doe)",
            children: [
                {
                    name: "Employee (Alice Smith)",
                    children: [] // Empty children array
                }
            ]
        }
    ];
    

    useEffect(() => {
        const fetchHierarchyData = async () => {
            try {
                // Replace with your API endpoint to fetch hierarchy data
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employees/hierarchy`);
                setTreeData(response.data);
            } catch (error) {
                console.error('Error fetching hierarchy data:', error);
            }
        };

        fetchHierarchyData();
        console.log("Hierarchy Data:", treeData);
    }, [treeData]);

    return (
        <Container>
            <Typography variant="h4" style={{ margin: '20px 0' }}>Company Hierarchy</Typography>
            <Box height="600px">
            <Tree data={treeData} orientation="vertical" scaleExtent={{ min: 0.1, max: 1 }} translate={{ x: 100, y: 300 }} />

            </Box>
            <AddEmployeeForm />
        </Container>
    );
};

export default HierarchyPage;
