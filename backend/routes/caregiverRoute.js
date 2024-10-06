const express = require('express');
const { registerCaregiver,getCaregiverOverview,getCaregiversEnrollments }=require('../controllers/caregiverController');
 const router = express.Router();

 router.post('/caregiverReg',registerCaregiver);
 router.get('/caregiverOverview', getCaregiverOverview);
 router.get('/enrollments',getCaregiversEnrollments)
 module.exports = router;
 