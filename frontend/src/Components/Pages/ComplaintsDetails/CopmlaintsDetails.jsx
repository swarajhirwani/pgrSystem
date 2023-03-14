import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ComplaintsDetail.css"
import Loader from "../Loader/Loader"
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getComplaintsDetails,
  newReview,
} from "../../../actions/complainAction";
import ReviewCard from "./ReviewCard";
import { useAlert } from "react-alert";
import MetaData from "../MetaData";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
//import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../../constants/complainConstants";


const CopmlaintsDetails = ({ match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { complaints, loading, error } = useSelector(
      (state) => state.complaintsDetails
    );
  
    const { success, error: reviewError } = useSelector(
      (state) => state.newReview
    );
  
    const options = {
      size: "large",
      value: complaints.ratings,
      readOnly: true,
      precision: 0.5,
    };
  
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
  
    const increaseQuantity = () => {
      if (complaints.Stock <= quantity) return;
  
      const qty = quantity + 1;
      setQuantity(qty);
    };
  
    const decreaseQuantity = () => {
      if (1 >= quantity) return;
  
      const qty = quantity - 1;
      setQuantity(qty);
    };
  
  
    const submitReviewToggle = () => {
      open ? setOpen(false) : setOpen(true);
    };
  
    const reviewSubmitHandler = () => {
      const myForm = new FormData();
  
      myForm.set("rating", rating);
      myForm.set("comment", comment);
      myForm.set("complaintsId", match.params.id);
  
      dispatch(newReview(myForm));
  
      setOpen(false);
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (reviewError) {
        alert.error(reviewError);
        dispatch(clearErrors());
      }
  
      if (success) {
        alert.success("Review Submitted Successfully");
        dispatch({ type: NEW_REVIEW_RESET });
      }
      dispatch(getComplaintsDetails(match.params.id));
    }, [dispatch, match.params.id, error, alert, reviewError, success]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${complaints.name} -- HOME`} />
          <div className="ComplaintsDetails">
            <div>
              <Carousel>
                {complaints.images &&
                  complaints.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{complaints.name}</h2>
                <p>Complaints # {complaints._id}</p>
              </div>
              <div className="detailsBlock-2">
                {/* <Rating {...options} /> */}
                <span className="detailsBlock-2-span">
                  {" "}
                  ({complaints.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  
                </div>

                <p>
                  Status:
                  <b className={complaints.Stock < 1 ? "redColor" : "greenColor"}>
                    {complaints.Stock < 1 ? "Pending" : "success"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{complaints.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              {/* <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              /> */}

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {complaints.reviews && complaints.reviews[0] ? (
            <div className="reviews">
              {complaints.reviews &&
                complaints.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default CopmlaintsDetails