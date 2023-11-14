const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const { sendRegistrationEmail } = require('../utils/emailService');

const addEmployee = async (req, res) => {
    const { email, companyId, access_role } = req.body;
    try{    
        await db.query('INSERT INTO employee (email, company_id, access_role) VALUES ($1, $2, $3)', [email, companyId, access_role]); // Add employee with minimal details

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

// Other CRUD operations for employees

module.exports = {
    addEmployee,
    completeRegistration,
    // other exported functions
};