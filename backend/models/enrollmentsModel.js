const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
  month: { type: String, required: true },
  newEnrollments: { type: Number, required: true },
  
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
