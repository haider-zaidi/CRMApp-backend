const express = require('express');
const router = express.Router();
const { addOrder, getOrders } = require('../controllers/orderController');
const authenticateUser = require('../utils/authMiddleware');

router.post('/', authenticateUser, addOrder);
router.get('/', authenticateUser, getOrders);

module.exports = router;
