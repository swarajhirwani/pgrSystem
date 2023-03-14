import React from "react";
import { useState ,useEffect} from "react";
import { authentication } from "./firebase-config";
import { RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import { useSelector} from "react-redux"
import "./otp.css";
import { Link,Navigate } from "react-router-dom";


function OtpVerification() {
  const [isDisabled, SetisDisabled] = useState();
  const [dashboard, SetDashboard] = useState(true)
  const [dashboardlink, Setdashboardlink] = useState()
  const [spinner, Setspinner] = useState();
  const [spinnerrole, Setspinnerrole] = useState();
  const [hiddenstatus, Sethiddenstatus] = useState();
  const user = useSelector(state=>state.user.user)
  const countryCode = "+91";
  const [phoneNumber,setPhoneNumber] = useState("");
  const [OTP, setOTP] = useState();
  const [msg, Setmsg] = useState()
  

  const timer = () => setTimeout(phone, 5000)
  
  const phone = () => { 
    requestOtp();
  }

  const generateRecapture = () => {
    window.RecaptchaVerifier = new RecaptchaVerifier(
      "recaptch-container",
      {
        size: "invisible",
        callback: (Response = { }),
      },
      authentication
    );
  };

  const requestOtp = (e) => {
    Setmsg(`OTP has been send to registered number ${phoneNumber}`)
    if (phoneNumber.length >= 12) {
      generateRecapture();
      let appVerifier = window.RecaptchaVerifier;
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
        .then((conformationResult) => {
          window.conformationResult = conformationResult;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const verifyOtp = () => {
    if (OTP.length === 6) {
      Setspinner("spinner-border spinner-border-sm")
      Setspinnerrole("status")
      Sethiddenstatus("true")
      let conformationResult = window.conformationResult;
      conformationResult
        .confirm(OTP)
        .then((result) => {
          Setspinner("")
          Setspinnerrole("")
          Sethiddenstatus("")
          SetDashboard(false)
          Setdashboardlink("/dashboard")
          SetisDisabled(true)
          Navigate("/dashboard")
        })
        .catch((err) => {
        });
    }
  };

  useEffect(() => { 
    setPhoneNumber(countryCode + user.phoneNum);
    timer();
  },[phoneNumber])

  return (
    <div>
      <div className="container-fluid otp-container">
        <div className="row justify-content-center align-items-center otp-row">
          <div className="col-xxl-4 col-xl-4 col-lg-5 col-md-6 col-sm-8 bg-white p-5 text-center rounded-2 shadow">
          <h3 className="mb-2">OTP Verification</h3>
            <button className="btn btn-primary" onClick={requestOtp}>Send OTP</button>
            <h2  >{ msg}</h2>
            <label className="fs-1 m-5">
              <i className="bi bi-shield-lock-fill"></i>
            </label>
            <input
              type="text"
              className="form-control-lg border-none  text-center "
              pattern="[0-9]{6}"
              value={OTP}
              maxLength="6"
              onChange={(e) => setOTP(e.target.value)}
              placeholder="Enter Your 6 digit Otp"
            />
            
            <br />
            <button
              className="btn btn-primary mt-2"
              type="button"
              disabled={isDisabled}
              onClick={verifyOtp}
            >
              <span
                className={spinner}
                role={spinnerrole}
                aria-hidden={hiddenstatus}
                // className="spinner-border spinner-border-sm"
                // role="status"
                // aria-hidden="true"
              ></span>
              Verify
            </button>
            <br />
            <Link to={ dashboardlink} ><button className="btn btn-primary mt-2" disabled={dashboard}>Go To DashBoard</button></Link>
          </div>
        </div>
        <div id="recaptch-container"></div>
      </div>
    </div>
  );
}

export default OtpVerification;
