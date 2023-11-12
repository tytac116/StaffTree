const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');
const dotenv = require('dotenv');


router.get('/employees', async (req, res) => {
    try {
        const employees = await db.query('SELECT * FROM employee');
        res.json(employees.rows);
    } catch (err) {
        console.error(err.message);
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