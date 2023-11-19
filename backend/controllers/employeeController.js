const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const { sendRegistrationEmail } = require('../utils/emailService');

const addEmployee = async (req, res) => {
    const { email, companyId, access_role } = req.body;
    try{    
        await db.query('INSERT INTO employee (email, company_id, access_role, first_name, last_name, employee_number) VALUES ($1, $2, $3, $4, $5, $6)', [email, companyId, access_role, "", "",""]); // Add employee with minimal details

        const registrationLink = `https://yourapp.com/complete-registration?email=${email}`; //Create registration link
        sendRegistrationEmail(email, registrationLink); //Send email invitation
        res.status(201).json({ message: 'Employee added and invitation sent successfully' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const completeRegistration = async (req, res) => {
    const { email, password, first_name, last_name, birth_date, employee_number, salary, role, manager_id} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); //hash password

    try{
        await db.query( //insert new employee into DB
            'UPDATE employee SET password_hash = $1, first_name = $2, last_name = $3, birth_date = $4, employee_number = $5, salary = $6, role = $7, manager_id = $8 WHERE email = $9',
            [hashedPassword, first_name, last_name, birth_date, employee_number, salary, role, manager_id, email]
        );
        res.status(201).json({ message: 'Employee registration completed successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getHierarchy = async (req, res) => {// Function to get the hierarchy of employees within a company
    try {
        // Execute a SQL query to get all employees in the company along with their manager's first and last name
        const result = await db.query(`
            SELECT e1.*, e2.first_name AS manager_first_name, e2.last_name AS manager_last_name
            FROM employee e1
            LEFT JOIN employee e2 ON e1.manager_id = e2.id`);
        //     WHERE e1.company_id = $1
        // ` , [req.user.companyId]); // $1 is replaced with the company ID from the request user
        const hierarchyData = buildHierarchyTree(result.rows);
        res.json(hierarchyData);
    } catch (err) {
        // If an error occurs, send a 500 status code and the error message
        res.status(500).json({ message: err.message });
    }
};


const buildHierarchyTree = (employees) => {// Function to build a hierarchical tree from a flat array of employees
    // Initialize the tree and lookup structures
    let tree = [];
    let lookup = {};

    // First loop: add each employee to the lookup object and add an empty children array to each employee
    employees.forEach(emp => {
        emp.name = `${emp.first_name} ${emp.last_name}`; // Combine name and ID
        //emp.name = `${emp.first_name} ${emp.last_name} (${emp.role}, ${emp.employee_number})`;

        lookup[emp.id] = emp;
        lookup[emp.id].children = [];
    });

    // Second loop: add each employee to their manager's children array or to the tree if they don't have a manager
    employees.forEach(emp => {
        if (emp.manager_id && lookup[emp.manager_id]) {
            lookup[emp.manager_id].children.push(lookup[emp.id]);
        } else if (!emp.manager_id) {
            tree.push(lookup[emp.id]);
        }
    });

    // Return the tree structure
    return tree;
};

// In employeeController.js

// Search employees
const searchEmployee = async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const query = `
            SELECT * FROM employee 
            WHERE CONCAT(first_name, ' ', last_name) ILIKE $1
               OR role ILIKE $1
               OR employee_number::text ILIKE $1`;
        const result = await db.query(query, [`%${searchTerm}%`]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update employee details
const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, salary, role, manager_id } = req.body;

    try {
        await db.query(
            'UPDATE employee SET first_name = $1, last_name = $2, salary = $3, role = $4, manager_id = $5 WHERE id = $6',
            [first_name, last_name, salary, role, manager_id, id]
        );
        res.json({ message: 'Employee updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete employee
const deleteEmployee = async (req, res) => {
    const { id } = req.params; // assuming the employee ID is passed as a URL parameter

    try {
        await db.query('DELETE FROM employee WHERE id = $1', [id]);
        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// In your employeeController.js or similar file
const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM employee WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Employee not found');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};








module.exports = {
    addEmployee,
    completeRegistration,
    getHierarchy,
    buildHierarchyTree,
    searchEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById
};