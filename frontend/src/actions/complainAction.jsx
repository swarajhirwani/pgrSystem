import axios from "axios";

import {
    ALL_COMPLAINTS_FAIL,
    ALL_COMPLAINTS_REQUEST,
    ALL_COMPLAINTS_SUCCESS,
    COMPLAINTS_DETAILS_REQUEST,
  COMPLAINTS_DETAILS_SUCCESS,
  COMPLAINTS_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
    CLEAR_ERRORS,
  } from "../constants/complainConstants";

  // Get All complaints
export const getComplaints =
(keyword = "", currentPage = 1, category, ratings = 0) =>
async (dispatch) => {
  try {
    dispatch({ type: ALL_COMPLAINTS_REQUEST });

    let link = `/api/v1/complaints?keyword=${keyword}&page=${currentPage}&ratings[gte]=${ratings}`;

    if (category) {
      link = `/api/v1/complaints?keyword=${keyword}&page=${currentPage}&category=${category}&ratings[gte]=${ratings}`;
    }

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_COMPLAINTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_COMPLAINTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Complaints Details
export const getComplaintsDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COMPLAINTS_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/complaints/${id}`);

    dispatch({
      type: COMPLAINTS_DETAILS_SUCCESS,
      payload: data.complaints,
    });
  } catch (error) {
    dispatch({
      type: COMPLAINTS_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };