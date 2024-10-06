import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const CaregiverOverview = () => {
  const [overviewData, setOverviewData] = useState(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await fetch('https://task-nikhil.onrender.com/caregiver/caregiverOverview');
        const data = await response.json();
        setOverviewData(data);
      } catch (error) {
        console.error('Error fetching caregiver overview data:', error);
      }
    };

    fetchOverview();
  }, []);

  if (!overviewData) {
    return <div>Loading...</div>; // Loading state
  }

  const data = [
    { name: 'Active', value: overviewData.active },
    { name: 'Inactive', value: overviewData.inactive },
    { name: 'Total', value: overviewData.total }
  ];

  const COLORS = ['#43245a', '#9d69c4', '#ebede1']; // Green, Yellow, Red for Active, Inactive, and Total

  return (
    <div className="overview-container">
      <p>Caregivers Overview</p>
      
      <div className="chart-container">
        {/* Display the total number inside the donut */}
        
          Total  {overviewData.total}
        

        {/* Half Donut Pie Chart */}<div className='chart'>
        <PieChart width={400} height={200}>
          <Pie
            data={data}
            cx={200}
            cy={100}
            innerRadius={80}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            startAngle={180} // Start angle for half donut
            endAngle={0}     // End angle for half donut
            cornerRadius={5} // Add corner radius for smooth edges
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />

            ))}
          </Pie>
          
        </PieChart>
        </div>
      </div>

      {/* Display Active and Inactive Counts */}
      <div className="counts-container">
        <div className='parts' >Active <p> {overviewData.active}</p></div>
        <div className='parts' >Inactive <p>{overviewData.inactive}</p></div>
      </div>
    </div>
  );
};

export default CaregiverOverview;
