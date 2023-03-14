import React from 'react'
import Show_grievance_count from "../Card/Show_grievance_count"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import GrievanceList from '../GrievanceList/GrievanceList'
import MetaData from '../MetaData';
function DashBoard() {
  return (
    <>
    <MetaData title="DASHBOARD" />
    <div className='container-fluid'>
      <div className="row">
        <div className="col-3 SidePannel bg-success" style={{ minHeight: "25vh" }}>
          <div className="row justify-centent-center align-item-center">
            <div className="col">
              <div className="row my-4">
                <div className="col">
                  <Link className='btn btn-primary' to={"/complainent"} >File A Complaint</Link>
                </div>
              </div>
              <div className="row my-4">
                <div className="col">
                  <Link className='btn btn-primary' to={"/changepassword"} >Change Password</Link>
                </div>
              </div>
              <div className="row my-4">
                <div className="col">
                  <Link className='btn btn-primary' to={"/signout"} >SignOut</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-9 border border-primary" style={{minHeight:"91.65vh"}}>
          <div className="row my-3 GrievanceNumber-Card">
            <div className="col">
              <Show_grievance_count name={"Total Grievance Registered"} count={32} />
            </div>
            <div className="col">
            <Show_grievance_count name={"Pending Grievance"} count={32} />
            </div>
            <div className="col">
            <Show_grievance_count name={"Number of Grievence Closed"} count={32} />
            </div>
          </div>
          <div className="row GrievanceNumber-Card">
            <GrievanceList />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default DashBoard
