const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/EmployeeController');

router.post('/employees/add-employee', employeeController.addEmployee);
router.post('/employees/complete-registration', employeeController.completeRegistration);

// Other CRUD routes for employees

module.exports = router;
