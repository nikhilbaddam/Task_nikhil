const mongoose = require('mongoose');

const ChildSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  dateOfRegistration: { type: Date, required: true }
});

module.exports = mongoose.model('Child', ChildSchema);
