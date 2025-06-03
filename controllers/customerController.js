const Customer = require('../models/Customer');

const addCustomer = async (req, res) => {
  try {
    const customerData = {
      ...req.body,
      user: req.user._id
    };
    const customer = await Customer.create(customerData);
    res.status(201).json(customer);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getCustomers = async (req, res) => {
  try {
    const userId = req.user._id; // Comes from authMiddleware
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getCustomerOrder = async (req, res) => {

}

module.exports = { addCustomer, getCustomers };
