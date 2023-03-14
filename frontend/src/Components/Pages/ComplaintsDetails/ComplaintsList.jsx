import React, { Fragment, useEffect, useState } from "react";
import "./ComplaintsList.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import ComplaintsCard from "../Complaints/complaintsCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../MetaData";
import { clearErrors, getComplaints } from "../../../actions/complainAction";

const categories = [
  
];

const ComplaintsList = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const {
    complaints,
    loading,
    error,
    complaintsCount,
    resultPerPage,
    filteredComplaintsCount,
  } = useSelector((state) => state.complaints);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  let count = filteredComplaintsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getComplaints(keyword, currentPage, category, ratings));
  }, [dispatch, keyword, currentPage, category, ratings, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="COMPLAINTS -- HOME" />
          <h2 className="complaintsHeading">Complaints</h2>

          <div className="complaints">
            {complaints &&
              complaints.map((complaint) => (
                <ComplaintsCard key={complaint._id} complaint={complaint.complaints} />
              ))}
          </div>

          <div className="filterBox">

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={complaintsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ComplaintsList;
