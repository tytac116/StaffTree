import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import AddEmployeeForm from '../components/AddEmployeeForm';
import './HierarchyPage.css';
import { debounce } from 'lodash';
import EditEmployeeModal from '../components/EditEmployeeModal';
import AddEmployeeModal from '../components/AddEmployeeModal';


const HierarchyPage = () => {
    const [treeData, setTreeData] = useState(null);
    const [originalTreeData, setOriginalTreeData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);






   
    const renderRectSvgNode = ({ nodeDatum, toggleNode }) => {
        //console.log("Node Data:", nodeDatum.id); // Log to see the structure of nodeDatum
        return (
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

            <text
                className="tree-node-text"
                x={20} // Adjust x coordinate
                y={60} // Adjust y coordinate
                onClick={() => handleEdit(nodeDatum.id)}
                style={{ cursor: 'pointer', fill: 'blue' }} // Style the text
            >
                Edit
            </text>
            <text
                className="tree-node-text"
                x={20} // Adjust x coordinate
                y={80} // Adjust y coordinate
                onClick={() => handleDelete(nodeDatum.id)}
                style={{ cursor: 'pointer', fill: 'red'}} // Style the text
            >
                Delete
            </text>

            
        </g>
        );
    };

    const fetchHierarchyData = async () => {
        try {
            // const endpoint = searchTerm ? `/api/employees/search?term=${encodeURIComponent(searchTerm)}` : '/api/employees/hierarchy';
            // const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`);
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employees/hierarchy`);
            const originalTreeData = response.data;
            const fetchedData = response.data;
            const newTreeData = {
                name: originalTreeData[0].name,
                role: originalTreeData[0].role,
                employee_number: originalTreeData[0].employee_number,
                id: originalTreeData[0].id,
                children: originalTreeData[0].children.map(child => ({
                    name: child.name,
                    role: child.role,
                    employee_number: child.employee_number,
                    children: child.children,
                    id: child.id,
                })),
            };
            setTreeData([newTreeData]);
            setOriginalTreeData([fetchedData]);
        } catch (error) {
            console.error('Error fetching hierarchy data:', error);
        };
    };

    const handleSearchChange = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employees/search`, {
                    params: { searchTerm: term }
                });
                setTreeData(response.data);
            } catch (error) {
                console.error('Error fetching search data:', error);
            }
        } else {
            fetchHierarchyData(); // Fetch original data when search is cleared
        }
    };

    const handleEdit = async (id) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employees/${id}`);
            console.log('Selected Employee Data:', response.data); // Check the received data
            setSelectedEmployee(response.data);
            setIsEditModalOpen(true);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };

    const handleAddEmployee = async (newEmployee) => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/employees/add-employee`, newEmployee);
            fetchHierarchyData(); // Refresh data
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };
    
    

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/employees/${id}`);
                // Optionally, refresh the tree data or remove the employee from the local state
                fetchHierarchyData(); // If you want to refresh the whole tree
                // Or use a state update to remove the employee from the local state
            } catch (error) {
                console.error('Error deleting employee:', error);
                // Handle error (e.g., show a notification to the user)
            }
        }
    };
    
    const handleSaveEdit = async (updatedEmployee) => {
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/employees/${updatedEmployee.id}`, updatedEmployee);
            fetchHierarchyData(); // Refresh data
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };
    

    


    useEffect(() => {
        fetchHierarchyData();
    }, []);
    
    return (
        <Container>
            <Typography variant="h4" style={{ margin: '20px 0' }}>Company Hierarchy</Typography>
            <Button onClick={() => setIsAddModalOpen(true)}>Add Employee</Button>
            {isAddModalOpen && (
                <AddEmployeeModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onSave={handleAddEmployee}
                />
            )}
            <Box height="600px" className="tree-container">
            <TextField
                label="Search Employees"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginBottom: '20px' }}
            />
            {treeData && 
                    <Tree
                        data={treeData}
                        orientation="vertical"
                        scaleExtent={{ min: 0.1, max: 1 }}
                        translate={{ x: 100, y: 300 }}
                        renderCustomNodeElement={renderRectSvgNode}
                    />
                
            }

            {isEditModalOpen && (
                <EditEmployeeModal
                    employee={selectedEmployee}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleSaveEdit}
                />
            )}
            </Box>
            {/* <AddEmployeeForm /> */}
        </Container>
    );
};


export default HierarchyPage;