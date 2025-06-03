// const Order = require('../models/Order');

// const addOrder = async (req, res) => {
//   const customerId=req.headers.customer-id;
//   try {
//     const order = await Order.create({
//       ...req.body,
//       // user: req.user._id
//       customer: customerId
//     });
//     res.status(201).json(order);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// const getOrders = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const orders = await Order.find({ user: userId });
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { addOrder, getOrders };



// const Order = require('../models/Order');
// const Customer=require('../models/Customer');

// const addOrder = async (req, res) => {
//   try {
//     const { product, quantity, amount, customer } = req.body; // Get customer ID from body

//     const order = await Order.create({
//       product,
//       quantity,
//       amount,
//       customer, // customer ID must be passed in body
//       // user: req.user._id  // Uncomment this if you add 'user' in schema
//     });

//     res.status(201).json(order);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// const getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate('customer', 'name'); // populate only name

//     const formattedOrders = orders.map(order => ({
//       product: order.product,
//       quantity: order.quantity,
//       amount: order.amount,
//       user: order.customer?.name || 'Unknown'
//     }));

//     res.status(200).json(formattedOrders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// module.exports = { addOrder, getOrders };


const Order = require('../models/Order');
const Customer = require('../models/Customer');

const addOrder = async (req, res) => {
  try {
    const { product, quantity, amount, customer } = req.body;

    // Create the order
    const newOrder = new Order({
      product,
      quantity,
      amount,
      customer,
    });

    await newOrder.save();

    // Update customer stats: totalSpend, visits, lastActive
    await Customer.findByIdAndUpdate(customer, {
      $inc: {
        totalSpend: amount,
        visits: 1,
      },
      $set: {
        lastActive: new Date(),
      },
    });

    res.status(201).json({ message: 'Order placed and customer updated', order: newOrder });
  } catch (error) {
    console.error('Error in addOrder:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customer', 'name');

    // Format each order to flatten the customer name
    const formattedOrders = orders.map(order => ({
      _id: order._id,
      product: order.product,
      amount: order.amount,
      quantity: order.quantity,
      user: order.customer?.name || 'Unknown'
    }));

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error('Error in getOrders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = { addOrder, getOrders };
