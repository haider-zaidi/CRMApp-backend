// const mongoose = require('mongoose');

// const customerSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   totalSpend: Number,
//   visits: Number,
//   lastActive: Date,
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// }, { timestamps: true });

// module.exports = mongoose.model('Customer', customerSchema);


const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  totalSpend: Number,
  visits: Number,
  lastActive: Date,
}, { timestamps: true });

// Virtual field to get orders for a customer
customerSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'customer',
});

// Ensure virtuals are included in JSON output
customerSchema.set('toObject', { virtuals: true });
customerSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Customer', customerSchema);

