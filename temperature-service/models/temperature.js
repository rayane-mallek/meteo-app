const mongoose = require('mongoose');

const temperatureSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    index: true
  },
  value: {
    type: Number,
    required: true
  },
  recordedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Temperature', temperatureSchema);
