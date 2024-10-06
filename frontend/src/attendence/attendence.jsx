import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './attendence.css'
const AttendanceOverview = () => {
  const [attendanceData, setAttendanceData] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch('http://localhost:5000/attendence/getattend');
        const data = await response.json();
        setAttendanceData(data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendance();
  }, []);

  if (!attendanceData) {
    return <div>Loading...</div>; // Loading state
  }

  // Process the data to count the number of On-time, Late, and Absent statuses
  
  

  const data = [
    { name: 'On-time', value: attendanceData.onTime },
    { name: 'Late', value: attendanceData.late },
    { name: 'Absent', value: attendanceData.absent },
  ];

  const COLORS = ['#FF6600', '#7E60BF', '#FF885B']; // Colors for On-time, Late, and Absent

  return (
    <div className="overview-container">
      <p>Attendance Overview</p>
     <div className='total'> Total {attendanceData.totalChildren}</div>
      <div className='chartAttendence'>
      <PieChart width={400} height={160}>
        <Pie
          data={data}
          cx="150"
          cy="70"
          innerRadius={50}
          outerRadius={70}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          cornerRadius={3}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}

     

        </Pie>
        <Tooltip />
        
      </PieChart>
      </div>

      {/* Display counts */} 
      <div className="counts-container-attendence">
        <div className='parts' style={{"color":"#FF6600"}} >On-time <p>{attendanceData.onTime}</p></div>
        <div className='parts'  style={{"color":"#7E60BF"}}  >Late <p>{attendanceData.late}</p></div>
        <div className='parts'  style={{"color":"#Fs886A"}} >Absent <p>{attendanceData.absent}</p></div>
      </div>
    </div>
  );
};

export default AttendanceOverview;
