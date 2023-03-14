import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../../../actions/userAction";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import MetaData from "../MetaData";
function SignUp() {
  const [name, SetName] = useState();
  const [password, SetPassword] = useState();
  const [email, Setemail] = useState();
  const [gender, Setgender] = useState();
  const [aadharNumber, SetaadharNumber] = useState();
  const [phoneNum, SetphoneNum] = useState();
  const [address, setaddress] = useState({houseno: "", state:"", district:"", pinCode: ""});
  const { error,isSignUp} = useSelector((state)=>state.user)

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const submitdata = () => {
    dispatch(register(name,password, email, gender, aadharNumber, phoneNum, address))
  };

  useEffect(() => {
    if (error) {
      alert(error)
      dispatch(clearErrors())
    }
    if (isSignUp) { 
      navigate("/success")
    }

  },[dispatch,error,isSignUp])

  return (
    <>
      <MetaData title="SIGN-UP" />
      <div className="container-fluid signup-container">
        {/* <form> */}
          <div className="row signup-row justify-content-center align-content-center text-white">
            <div className="col-6 my-2 shadow shadow-4 p-5 border">
              <div className="row mb-4">
                <div className="col">
                  <h3>Welcome For Registration</h3>
                </div>
              </div>
              <div className="row">
                <div className="col-6 my-2  ">
                  <h4>Name</h4>
                </div>
                <div className="col-6 my-2  ">
                  <h4>email</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-6 my-2  ">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => SetName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-6 my-2  ">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => Setemail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6 my-2  ">
                  <h4>gender</h4>
                </div>
                <div className="col-6 my-2  ">
                  <h4>Addhar Number</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-6 my-2   ">
                  <input
                    className="form-check-input me-1"
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={(e) => Setgender(e.target.value)}
                  />
                  <label className="me-2">Male</label>
                  <input
                    className="form-check-input me-1"
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={(e) => Setgender(e.target.value)}
                  />
                  <label label className="me-2">
                    Female
                  </label>
                  <input
                    className="form-check-input me-1"
                    type="radio"
                    name="gender"
                    value="Other"
                    onChange={(e) => Setgender(e.target.value)}
                  />
                  <label label className="me-2">
                    Other
                  </label>
                </div>
                <div className="col-6 my-2  ">
                  <input
                    className="form-control"
                    type="text"
                    name="aadharNumber"
                    value={aadharNumber}
                    onChange={(e) => SetaadharNumber(e.target.value)}
                    maxLength={12}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6 my-2   ">
                  <h4>Phone Number</h4>
                </div>
                <div className="col-6 my-2  ">
                  <h4>Password</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-6 my-2   ">
                  <input
                    className="form-control"
                    type="tel"
                    name="phoneNum"
                    value={phoneNum}
                    onChange={(e) => SetphoneNum(e.target.value)}
                    maxLength={10}
                    autoComplete="off"
                  />
                </div>
                <div className="col-6 my-2  ">
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => SetPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="row my-2">
                <div className="col">
                  <h4>Address</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <h4>State</h4>
                </div>
                <div className="col-4">
                  <h4>District</h4>
                </div>
                <div className="col-4">
                  <h4>PinCode</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <input
                    className="form-control"
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={(e) => setaddress({...address,state:e.target.value})}
                    required
                  />
                </div>
                <div className="col-4">
                  <input
                    className="form-control"
                    type="text"
                    name="district"
                    value={address.district}
                    onChange={(e) => setaddress({...address,district:e.target.value})}
                    required
                  />
                </div>
                <div className="col-4">
                  <input
                    className="form-control"
                    type="text"
                    name="pinCode"
                    value={address.pinCode}
                    onChange={(e) => setaddress({...address,pinCode:e.target.value})}
                    required
                    maxLength="6"
                  />
                </div>
              </div>
              <div className="row my-2">
                <div className="col">
                  <h4>House No</h4>
                </div>
              </div>
              <div className="row my-2">
                <div className="col">
                <input
                  className="form-control"
                  type="text"
                  name="houseno"
                  value={address.houseno}
                  onChange={(e) => setaddress({...address,houseno:e.target.value})}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <button 
                    onClick={submitdata}
                    className="btn btn-success p-2 px-4"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        {/* </form> */}
      </div>
    </>
  );
}

export default SignUp;
