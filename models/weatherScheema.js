const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    enum: ['Delhi', 'Moscow', 'Paris', 'New York', 'Sydney', 'Riyadh']
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  temperature: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  humidity: {
    type: Number
  },
  windSpeed: {
    type: Number
  },
  pressure: {
    type: Number
  }
});

weatherSchema.index({ location: 1, date: 1 });

module.exports = mongoose.model('Weather', weatherSchema);