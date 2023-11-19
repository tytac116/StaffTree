const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/employees/add-employee', employeeController.addEmployee);
router.post('/employees/complete-registration', employeeController.completeRegistration);
router.get('/employees/hierarchy', employeeController.getHierarchy);
router.get('/employees/search', employeeController.searchEmployee);
router.put('/employees/:id', employeeController.updateEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);
router.get('/employees/:id', employeeController.getEmployeeById);


// Other CRUD routes for employees

module.exports = router;
