import React, { useEffect } from "react";
import "./complaints.css";
import { getComplaints, clearErrors } from "../../../actions/complainAction";
import { useSelector, useDispatch } from "react-redux";
import "./Complaints";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import Complaints from "./Complaints";

const complaintsCard = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, complaints } = useSelector(
    (state) => state.complaints
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getComplaints());
  }, [dispatch, error, alert]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container" id="container">
            {complaints &&
              complaints.map((complaint) => (
                <Complaints key={complaints._id} complaint={complaint} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default complaintsCard;
