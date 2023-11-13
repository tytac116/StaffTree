const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const { sendRegistrationEmail } = require('../utils/emailService');

const addEmployee = async (req, res) => {
    const { email, companyId, access_role } = req.body;
    try{    
        await db.query('INSERT INTO employee (email, company_id, access_role) VALUES ($1, $2, $3)', [email, companyId, access_role]); // Add employee with minimal details
        sendRegistrationEmail(email); //Send email invitation
        res.status(201).json({ message: 'Employee added and invitation sent successfully' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const completeRegistration = async (req, res) => {
    const { email, password, first_name, last_name, birth_date, employee_number, salary, role, manager_id} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); //hash password
};

// Other CRUD operations for employees

module.exports = {
    addEmployee,
    completeRegistration,
    // other exported functions
};
