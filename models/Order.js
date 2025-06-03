const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
  amount: Number,
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
