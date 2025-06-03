// const mongoose = require('mongoose');

// const conditionSchema = new mongoose.Schema({
//   field: { type: String, required: true },
//   operator: { type: String, required: true },
//   value: { type: mongoose.Schema.Types.Mixed, required: true },
// });

// const segmentSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
//   name: { type: String, required: true },
//   conditions: { type: [conditionSchema], required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Segment', segmentSchema);


const mongoose = require('mongoose');

const segmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  rule: { type: mongoose.Schema.Types.Mixed, required: true },
  previewSize: { type: Number},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

module.exports = mongoose.model('Segment', segmentSchema);
