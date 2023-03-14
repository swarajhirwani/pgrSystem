import React, { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, userlogin } from "../../../actions/userAction";
import MetaData from "../MetaData";
function Login() {
  const [email, Setemail] = useState();
  const [password, Setpassword] = useState();
  const { error, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const formsubmit = () => {
    dispatch(userlogin(email, password));
  };


  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      Navigate("/verify");
    }
  }, [dispatch, error, isAuthenticated]);
  return (
    <>
      <MetaData title="LOG-IN" />
      <div className="container-fluid login">
        <div className="row login-row justify-content-center align-items-center ">
          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 bg-white p-5 text-center rounded-2 shadow ">
            <h2 className="mb-5 " style={{ fontWeight: "bold" }}>
              Welcome
            </h2>
            <input
              className="form-control mb-3 rounded-0"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => Setemail(e.target.value)}
            />
            <input
              className="form-control mb-3 rounded-0"
              type=""
              placeholder="Password"
              value={password}
              onChange={(e) => Setpassword(e.target.value)}
            />
            <button
              className="p-2 form-control mb-3 rounded-0 text-white bg-success"
              onClick={formsubmit}
            >
              LOGIN
            </button>
            <h4>Not registred ?</h4>
            <Link to="/signup" className="text-decoration-none">
              <h4 className="text-success">Create an account</h4>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
