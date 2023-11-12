const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');
const dotenv = require('dotenv');


// Create a new employee
router.post('/employees', async (req, res) => {
    const { first_name, last_name, birth_date, employee_number, salary, role, manage_id } = req.body;
    try{
        const newEmployee = await db.query(
            'INSERT INTO employee (first_name, last_name, birth_date, employee_number, salary, role, manage_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [first_name, last_name, birth_date, employee_number, salary, role, manage_id]
        );
        res.json(newEmployee.rows[0]);
    } catch (err){
        res.status(500).json({message: err.message});
    }
 });

// Get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await db.query('SELECT * FROM employee');
        res.json(employees.rows);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Get a single employee
router.get('/employees/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await db.query('SELECT * FROM employee WHERE employee_id = $1', [id]);
        res.json(employee.rows[0]);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Edit an employee
router.put('/employees/:id', async (req, res) => {
    const {id} = params;
    const { first_name, last_name, birth_date, employee_number, salary, role, manage_id } = req.body;

    try{
        const updatedEmployee = await db.query(
            'UPDATE employee SET first_name = $1, last_name = $2, birth_date = $3, employee_number = $4, salary = $5, role = $6, manage_id = $7 WHERE employee_id = $8 RETURNING *',
            [first_name, last_name, birth_date, employee_number, salary, role, manage_id, id]
        );
        res.json(updatedEmployee.rows[0]);
    } catch (err){
        res.status(500).json({message: err.message});
    }
});

// Delete an employee
router.delete('/employees/:id', async (req, res) => {
    const {id} = req.params;

    try{
        await db.query('DELETE FROM employee WHERE employee_id = $1', [id]);
        res.status(200).send('Employee with id: ${id} was deleted.')
        } catch (err){
        res.status(500).json({message: err.message});
    }
});

router.get('/test', async (req, res) => {
    try{
        const test = await db.query('SELECT * FROM testtable');
        res.json(test.rows);
    } catch (err){
        console.log("DB ERROR MY BOY")
        console.log(process.env.DB_USER)
        console.error(err.message);
    }
});

module.exports = router;