import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";

function Header() {

  const { isAuthenticated } = useSelector((state) => state.user);
  const user = useSelector(state => state.user.user);
  const [name, SetName] = useState();

  useEffect(() => { 
    SetName(user.name);
  },[name])

  return (
    <div>
      <nav
        class="navbar bg-primary navbar-expand-lg bg-body-tertiary "
        data-bs-theme="dark"
      >
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            <img
              src="logo.png"
              alt="Logo"
              width="auto"
              height="30"
              class="d-inline-block align-text-center"
            />
          </Link>
          <Link class="navbar-brand text-center" to="/">
            PGRS
          </Link>
          <button
            class="navbar-toggler bg-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/Contact">
                  Contact
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/about">
                  About Us
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/howtouse">
                  How to Use?
                </Link>
              </li>
            </ul>
            { isAuthenticated? null: <Link to="/Login"><button class="btn btn-outline-primary mx-2" >LOGIN</button></Link>}
            { isAuthenticated? null: <Link to="/signup"><button class="btn btn-outline-primary">SIGN UP</button></Link>}
            {isAuthenticated ? null : <h4>{name}</h4>}
            
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
