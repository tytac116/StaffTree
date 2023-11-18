import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import axios from 'axios';
import { Container, Typography, Box } from '@mui/material';
import AddEmployeeForm from '../components/AddEmployeeForm';
import './HierarchyPage.css';

const HierarchyPage = () => {
    const [treeData, setTreeData] = useState(null);

    const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
        <g>
            <circle r="10" onClick={toggleNode} />
            <text fill="black" strokeWidth="1" x="20">
                {nodeDatum.name}
            </text>
            {nodeDatum.role && (
                <text fill="black" x="20" dy="20" strokeWidth="1">
                    Role: {nodeDatum.role}
                </text>
            )}
            {nodeDatum.employee_number && (
                <text fill="black" x="20" dy="40" strokeWidth="1">
                    Employee Number: {nodeDatum.employee_number}
                </text>
            )}
        </g>
    );

    useEffect(() => {
        const fetchHierarchyData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employees/hierarchy`);
                const originalTreeData = response.data;
                const newTreeData = {
                    name: originalTreeData[0].name,
                    role: originalTreeData[0].role,
                    employee_number: originalTreeData[0].employee_number,
                    children: originalTreeData[0].children.map(child => ({
                        name: child.name,
                        role: child.role,
                        employee_number: child.employee_number,
                        children: child.children,
                    })),
                };
                setTreeData(newTreeData);
            } catch (error) {
                console.error('Error fetching hierarchy data:', error);
            }
        };

        fetchHierarchyData();
    }, []);

    return (
        <Container>
            <Typography variant="h4" style={{ margin: '20px 0' }}>Company Hierarchy</Typography>
            <Box height="600px" className="tree-container">
                {treeData && 
                    <Tree
                        data={treeData}
                        orientation="vertical"
                        scaleExtent={{ min: 0.1, max: 1 }}
                        translate={{ x: 100, y: 300 }}
                        renderCustomNodeElement={renderRectSvgNode}
                    />
                }
            </Box>
            <AddEmployeeForm />
        </Container>
    );
};

export default HierarchyPage;