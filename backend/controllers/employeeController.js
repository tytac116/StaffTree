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
            LEFT JOIN employee e2 ON e1.manager_id = e2.id
            WHERE e1.company_id = $1
        ` , [req.user.companyId]); // $1 is replaced with the company ID from the request user
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
        lookup[emp.id] = emp;
        lookup[emp.id].children = [];
    });

    // Second loop: add each employee to their manager's children array or to the tree if they don't have a manager
    employees.forEach(emp => {
        if (emp.manager_id) {
            lookup[emp.manager_id].children.push(lookup[emp.id]);
        } else {
            tree.push(lookup[emp.id]);
        }
    });

    // Return the tree structure
    return tree;
};


module.exports = {
    addEmployee,
    completeRegistration,
    getHierarchy,
    buildHierarchyTree
};