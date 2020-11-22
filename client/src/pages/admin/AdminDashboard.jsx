import React from 'react'
import AdminNav from '../../components/nav/AdminNav'


const AdminDashboard = () => {
  
  return (
    <div className ="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav/>
        </div>
        <div className="col">
          <h4 className="text-center pt-3 pb-3">Admin Dashboard</h4>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
