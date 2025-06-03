const express = require('express');
const router = express.Router();
const {addCustomer, getCustomers} = require('../controllers/customerController');
const authenticateUser = require('../utils/authMiddleware');

router.post('/', authenticateUser, addCustomer);
router.get('/', authenticateUser, getCustomers);

module.exports = router;
