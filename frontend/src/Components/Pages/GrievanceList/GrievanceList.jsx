import React from 'react'

const GrievanceList = () => {
  return (
    <div>
      <div class="card">
        <h5 class="card-header">List of Grievance</h5>
        <div class="card-body">
          <div className="row justify-content-center">
            <div className="col-10 ">
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th className="ps-5">Registration No</th>
                    <th>Recieved Date</th>
                    <th>Grievance Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GrievanceList