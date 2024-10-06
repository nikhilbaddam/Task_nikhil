import React, { useEffect, useState } from 'react';
import './finanical.css';

const FinanceDetails = () => {
  const [childrenData, setChildrenData] = useState(null);
  const [caregiverData, setCaregiverData] = useState(null);

  useEffect(() => {
    const fetchChildrenData = async () => {
      try {
        const response = await fetch('http://localhost:5000/children/childview');
        const data = await response.json();
        setChildrenData(data);
      } catch (error) {
        console.error('Error fetching children data:', error);
      }
    };

    const fetchCaregiverData = async () => {
      try {
        const response = await fetch('http://localhost:5000/caregiver/caregiverOverview');
        const data = await response.json();
        setCaregiverData(data);
      } catch (error) {
        console.error('Error fetching caregiver data:', error);
      }
    };

    fetchChildrenData();
    fetchCaregiverData();
  }, []);

  if (!childrenData || !caregiverData) {
    return <div>Loading...</div>;
  }

  // Calculate metrics
  const revenueFromChildren = childrenData.active * 30;
  const revenueFromCaregivers = caregiverData.active * 10;
  const totalRevenue = revenueFromChildren ;

  
  const totalExpense = revenueFromCaregivers;

  const income = totalRevenue - totalExpense;
  const profitMargin = income === 0 ? 0 : ((income / totalRevenue) * 100).toFixed(2);

  return (
    <div className="finance-details-container">
      <p>Finance Overview</p>

      <div className="finance-card-container">
        {/* Revenue Section */}
        <div className="finance-card">
          <h3> Revenue</h3>
          
          <p> ${totalRevenue}</p>
        </div>

        {/* Expense Section */}
        <div className="finance-card">
          <h3>Expenses</h3>
          
          <p> ${totalExpense}</p>
        </div>

        {/* Income Section */}
        <div className="finance-card">
          <h3>Income</h3>
          <p>${income}</p>
        </div>

        {/* Profit Margin Section */}
        <div className="finance-card">
          <h3>Profit Margin</h3>
          <p>{profitMargin}%</p>
         
        </div>
      </div>
      <p id='finance_p'>check daily to keep it on track</p>
    </div>
  );
};

export default FinanceDetails;
