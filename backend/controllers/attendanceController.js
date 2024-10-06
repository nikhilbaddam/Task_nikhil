const Attendance = require('../models/attendanceModel'); // Import the Attendance model
const Child = require('../models/childModel'); // Import the Child model to count total children

const enterAttendance = async (req, res) => {
  const { childId, status, dateofattend } = req.body;

  try {
    // Check if the child exists
    const childExists = await Child.findById(childId);
    if (!childExists) {
      return res.status(404).json({ message: 'Child not found' });
    }

    // Create new attendance record
    const newAttendance = new Attendance({
      child: childId,
      status,
      dateofattend: dateofattend || Date.now(), // Use current date if not provided
    });

    // Save attendance record
    await newAttendance.save();

    res.status(201).json({ message: 'Attendance recorded successfully', data: newAttendance });
  } catch (error) {
    console.error('Error adding attendance:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Controller to get the attendance summary (count of On-time, Late, Absent and total children)
const getAttendanceSummary = async (req, res) => {
  try {
    // Fetch the count of total children
    const totalChildren = await Child.countDocuments();

    // Fetch the count of attendance status
    const onTime = await Attendance.countDocuments({ status: 'On-time' });
    const late = await Attendance.countDocuments({ status: 'Late' });
    const absent = await Attendance.countDocuments({ status: 'Absent' });

    // Respond with the counts of attendance and total children
    res.json({
      totalChildren,
      
        onTime,
         late,
        absent
    
    });
  } catch (error) {
    // Handle any errors during the process
    res.status(500).json({ message: 'Error retrieving attendance summary', error });
  }
};

module.exports = { enterAttendance, getAttendanceSummary };
