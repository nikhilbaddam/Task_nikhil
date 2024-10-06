const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const childrenRoutes = require('./routes/childrenRoute');
const caregiverRoutes=require('./routes/caregiverRoute');
const Attendance=require('./routes/attendenceRoute');
const cors =require('cors');
const predictions=require('./routes/geminiRoute')

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());


app.use('/children', childrenRoutes);
app.use('/caregiver',caregiverRoutes);
app.use('/attendence', Attendance);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
