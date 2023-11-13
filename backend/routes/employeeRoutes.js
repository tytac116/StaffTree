const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/employees', employeeController.addEmployee);
router.post('/employees/complete-registration', employeeController.completeRegistration);

// Other CRUD routes for employees

module.exports = router;
