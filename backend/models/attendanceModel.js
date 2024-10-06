const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  child: { type: mongoose.Schema.Types.ObjectId, ref: 'Child' },
  status: { type: String, enum: ['On-time', 'Late', 'Absent'], required: true },
  dateofattend: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
