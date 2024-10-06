import React from 'react'
import ChildrenOverview from './children/ChildrenOverview'
import CaregiverOverview from './caregiver/CaregiverOverview'
import FinanceDetails from './finanicalOverview/FinanceDetails'
import AttendanceOverview from './attendence/attendence'
import EnrollmentsBarChart from './enrollments/enrollments'

import './dashboard.css'


const dashbord = () => {








  return (
    <div  className="dashboard-container" >
         
      <div className="dashboard-grid"  >
       <div className='row1'>
       <div  className='widgets' >
          <ChildrenOverview />
        </div>
        <div  className='widgets' >
          <CaregiverOverview/>
        </div>
        <div  className='widgets' >
          <FinanceDetails/>
        </div>
       </div>



       <div className='row2'>
       <div  className='widgets' >
          <AttendanceOverview/>
        </div>
        <div  className="widget-enrollment" >
          <EnrollmentsBarChart/>
        </div>
       </div>


      </div>
    </div>
  )
}

export default dashbord