const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/dbConfig');

const register = async (req, res) => {
    const { email, password, companyName, address, first_name, last_name, birth_date, employee_number, salary, role, manager_id} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); //hash password
        const newCompany = await db.query( //insert new company into DB
            "INSERT INTO company (company_name, address) VALUES ($1, $2) RETURNING id",
            [companyName, address]
        );
        const companyID = newCompany.rows[0].id; //get new company id
        const newUser = await db.query( //insert new employee into DB
            "INSERT INTO employee (email, password_hash, company_id, access_role, first_name, last_name, birth_date, employee_number, salary, role, manager_id) ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id", 
            [email, hashedPassword, companyID, 'admin', first_name, last_name, birth_date, employee_number, salary, role, manager_id]
        );

        res.status(201).json({ userId: newUser.rows[0].id, companyId: companyID });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};

const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        //Check if user exists
        const userResult = await db.query(
            "SELECT * FROM employee WHERE email = $1",
            [email]
        );
        const user = userResult.rows[0];
        if (!user) return res.status(400).json({ message: 'User not found' });

        //Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        //Create and assign a token
        const token = jwt.sign({ userId: user.id, email: user.email, accessRole: user.access_role, companyId: user.company_id }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {register,login};
