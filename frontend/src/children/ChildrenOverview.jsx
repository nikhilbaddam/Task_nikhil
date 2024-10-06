import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import './childern.css'; // Import the CSS file

const ChildrenOverview = () => {
  const [overviewData, setOverviewData] = useState(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await fetch('https://task-nikhil.onrender.com/children/childview');
        const data = await response.json();
        setOverviewData(data);
      } catch (error) {
        console.error('Error fetching overview data:', error);
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
    { name: 'Total', value: overviewData.total } // Total value
  ];

  const COLORS = ['#a05f63', '#c46419', '#d2b22d']; // Blue, Orange, Red for Active, Inactive, and Total

  return (
    <div className="overview-container">
   <p>Children Overview</p>
      
      <div className="chart-container">
        {/* Display the total number inside the donut */}
        
          Total {overviewData.total}
        

        {/* Half Donut Pie Chart */} <div className='chart'>
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
            cornerRadius={3} // Add corner radius for smooth edges
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
        <div className='parts' style={{color:"#a05f63"}}>Active <p>{overviewData.active}</p></div>
        <div className='parts' style={{color:"#c46419"}}>Inactive <p>{overviewData.inactive}</p></div>
      </div>
    </div>
  );
};

export default ChildrenOverview;
