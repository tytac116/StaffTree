import React, { useState } from 'react';
import InputField from '../components/InputField';
import axios from 'axios';

const CompanyRegistration = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        companyName: '',
        address: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        employeeNumber: '',
        salary: '',
        role: '',
        managerId: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/api/register', formData);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
            <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
            <InputField label="Company Name" type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
            <InputField label="Address" type="text" name="address" value={formData.address} onChange={handleChange} />
            <InputField label="First Name" type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            <InputField label="Last Name" type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            <InputField label="Birth Date" type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
            <InputField label="Employee Number" type="text" name="employeeNumber" value={formData.employeeNumber} onChange={handleChange} />
            <InputField label="Salary" type="number" name="salary" value={formData.salary} onChange={handleChange} />
            <InputField label="Role" type="text" name="role" value={formData.role} onChange={handleChange} />
            <InputField label="Manager ID" type="text" name="managerId" value={formData.managerId} onChange={handleChange} />
        </form>
    );
};

export default CompanyRegistration;