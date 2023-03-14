import React from 'react'
import "./Success.css"

function Success() {
  return (
    <div className='container-fluid success'>
          <div className="row justify-content-center align-content-center" style={{ minHeight: "100vh" }}>
              <div className="col">
                  <h2 className="text-center text-success">Your account has been created Successfully!</h2>
                </div>
          </div>
    </div>
  )
}

export default Success
