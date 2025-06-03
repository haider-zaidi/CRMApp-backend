// const mongoose = require('mongoose');

// const campaignSchema = new mongoose.Schema({
//   name: String,
//   segment: { type: mongoose.Schema.Types.ObjectId, ref: 'Segment' },
//   message: {type: String},
//   status: { type: String, default: 'pending' },
//   createdAt:{type:Date,default:Date.now},
//   updatedAt:{type:Date},
//   sentCount:{type:Number},
//   fieldCount:{type:Number},
// }, {timestamps: true});

// module.exports = mongoose.model('Campaign', campaignSchema);


// const mongoose = require('mongoose');

// const campaignSchema = new mongoose.Schema({
// // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// name: String,
// segment: { type: mongoose.Schema.Types.ObjectId, ref: 'Segment' },
// message: String,
// status: { type: String, default: 'pending' },
// audienceSize: Number,
// sent: Number,
// failed: Number,
// createdAt: { type: Date, default: Date.now }
// }, { timestamps: true });

// module.exports = mongoose.model('Campaign', campaignSchema);

const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    message: { type: String, required: true },
    segment: { type: mongoose.Schema.Types.ObjectId, ref: 'Segment', required: true },
    audienceSize: { type: Number, default: 0 },
    sent: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'sent', 'failed'], default: 'draft' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Campaign', campaignSchema);

