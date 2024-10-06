import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import './enrollments.css'
// Function to process enrollment data month-wise
const getMonthlyEnrollments = (data) => {
  // Initialize with all months in short form
  const enrollmentsPerMonth = {
    Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
    Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0
  };

  data.forEach((entry) => {
    const date = new Date(entry.dateOfRegistration);
    const month = date.toLocaleString('default', { month: 'short' });
    enrollmentsPerMonth[month]++;
  });

  return enrollmentsPerMonth;
};

const EnrollmentsBarChart = () => {
  const [childrenEnrollments, setChildrenEnrollments] = useState([]);
  const [caregiversEnrollments, setCaregiversEnrollments] = useState([]);

  useEffect(() => {
    // Fetch Children enrollments
    const fetchChildrenEnrollments = async () => {
      try {
        const response = await fetch('https://task-nikhil.onrender.com/children/enrollments');
        const data = await response.json();
        setChildrenEnrollments(getMonthlyEnrollments(data));
      } catch (error) {
        console.error('Error fetching children enrollments:', error);
      }
    };

    // Fetch Caregivers enrollments
    const fetchCaregiversEnrollments = async () => {
      try {
        const response = await fetch('https://task-nikhil.onrender.com/caregiver/enrollments');
        const data = await response.json();
        setCaregiversEnrollments(getMonthlyEnrollments(data));
      } catch (error) {
        console.error('Error fetching caregivers enrollments:', error);
      }
    };

    fetchChildrenEnrollments();
    fetchCaregiversEnrollments();
  }, []);

  // Combine the enrollments data
  const combinedData = Object.keys(childrenEnrollments).map((month) => ({
    month,
    children: childrenEnrollments[month],
    caregivers: caregiversEnrollments[month] || 0,
  }));

  return (
    <div style={{ textAlign: 'center', margin: '0px' }}>
      <p className='para_enroll'>Monthly Enrollments Overview</p>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={combinedData} margin={{ top: 10, right: 30, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3" />
          <XAxis dataKey="month" />
          <YAxis axisLine/>
          <Tooltip />
          <Legend />

          {/* Bar for Children enrollments */}
          <Bar dataKey="children" fill="#1230AE" name="Children Enrollments" radius={[10, 10, 0, 0]}/>

          {/* Bar for Caregiver enrollments */}
          <Bar dataKey="caregivers" fill="#185519" name="Caregiver Enrollments" radius={[10, 10, 0, 0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnrollmentsBarChart;
