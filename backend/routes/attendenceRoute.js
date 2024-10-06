const express = require('express');
const { enterAttendance,getAttendanceSummary}=require('../controllers/attendanceController')
const router = express.Router();
router.post('/attendenter',enterAttendance);
router.get('/getattend',getAttendanceSummary);
module.exports = router;