import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Pages/NavBar/Header";
import Contact from "./Pages/Contact";
import About from "./Pages/about";
import Howtouse from "./Pages/howtouse";
import Homepage from "./Pages/Homepage/Homepage";
import Login from "./Pages/LoginPage/Login";
import OtpVerification from "./Pages/OtpPage/OtpVerification";
import DashBoard from "./Pages/DashBoard/DashBoard";
import SignUp from "./Pages/SignUp/SignUp";
import Footer from "./Pages/Footer/Footer";
import CopmlaintsDetails from "./Pages/ComplaintsDetails/CopmlaintsDetails";
import Search from "./Pages/ComplaintsDetails/Search";
import ComplaintsList from "./Pages/ComplaintsDetails/ComplaintsList.jsx";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtrctedRoute";
import Success from "./Pages/SuccessPage/Success";

function Home() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/howtouse" element={<Howtouse />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/verify" element={<OtpVerification />}></Route>
          <Route path="/dashboard" element={<DashBoard />}></Route>
          <Route path="/complaints/:id" element={<CopmlaintsDetails />}></Route>
          <Route path="/complaintsList" element={<ComplaintsList />}></Route>
          <Route
            path="/complaints/:keyword"
            element={<ComplaintsList />}
          ></Route>
          <Route path="/search" element={<Search />}></Route>
        </Route>

        <Route path="/signup" element={<SignUp />}></Route>

        <Route path="/success" element={<Success />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Home;
