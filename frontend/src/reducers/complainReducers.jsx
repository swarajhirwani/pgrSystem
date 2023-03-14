import {
  ALL_COMPLAINTS_FAIL,
  ALL_COMPLAINTS_REQUEST,
  ALL_COMPLAINTS_SUCCESS,
  ADMIN_COMPLAINTS_REQUEST,
  ADMIN_COMPLAINTS_SUCCESS,
  ADMIN_COMPLAINTS_FAIL,
  NEW_COMPLAINTS_REQUEST,
  NEW_COMPLAINTS_SUCCESS,
  NEW_COMPLAINTS_FAIL,
  NEW_COMPLAINTS_RESET,
  UPDATE_COMPLAINTS_REQUEST,
  UPDATE_COMPLAINTS_SUCCESS,
  UPDATE_COMPLAINTS_FAIL,
  UPDATE_COMPLAINTS_RESET,
  DELETE_COMPLAINTS_REQUEST,
  DELETE_COMPLAINTS_SUCCESS,
  DELETE_COMPLAINTS_FAIL,
  DELETE_COMPLAINTS_RESET,
  COMPLAINTS_DETAILS_REQUEST,
  COMPLAINTS_DETAILS_SUCCESS,
  COMPLAINTS_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  CLEAR_ERRORS,

} from "../constants/complainConstants";

export const complainReducer = (state = { complaints: []}, action)=>{
    
    switch (action.type) {
        case ALL_COMPLAINTS_REQUEST:
        case ADMIN_COMPLAINTS_REQUEST:
            return{
                loading: true,
                complaints:[]
            }
        case ALL_COMPLAINTS_SUCCESS:
            return{
                loading:false,
                complaints:action.payload.complaints,
                complaintsCount:action.payload.complaintsCount,
                resultPerPage:action.payload.resultPerPage,
                filteredComplaintsCount: action.payload.filteredComplaintsCount,
            }
            case ADMIN_COMPLAINTS_SUCCESS:
      return {
        loading: false,
        complaints: action.payload,
      };
        case ALL_COMPLAINTS_FAIL:
        case ADMIN_COMPLAINTS_FAIL:
            return{
                loading:false,
                error:action.payload
            } 
         case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }   
        default:
            return state;
    }
};

export const newComplaintsReducer = (state = { complaints: {} }, action) => {
    switch (action.type) {
      case NEW_COMPLAINTS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_COMPLAINTS_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          complaints: action.payload.complaints,
        };
      case NEW_COMPLAINTS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_COMPLAINTS_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

export const complaintsReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_COMPLAINTS_REQUEST:
      case UPDATE_COMPLAINTS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_COMPLAINTS_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_COMPLAINTS_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_COMPLAINTS_FAIL:
      case UPDATE_COMPLAINTS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_COMPLAINTS_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case UPDATE_COMPLAINTS_RESET:
        return {
          ...state,
          isUpdated: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

export const complainDetailsReducer = (state = { complaints: {} }, action)=>{
    
    switch (action.type) {
        case COMPLAINTS_DETAILS_REQUEST:
            return{
                loading: true,
                ...state,
            };
        case COMPLAINTS_DETAILS_SUCCESS:
            return{
                loading:false,
                complaint:action.payload,
            };
        case COMPLAINTS_DETAILS_FAIL:
            return{
                loading:false,
                error:action.payload
            };
         case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }   
        default:
            return state;
    }
};

export const complaintsDetailsReducer = (state = { complaints: {} }, action) => {
    switch (action.type) {
      case COMPLAINTS_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case COMPLAINTS_DETAILS_SUCCESS:
        return {
          loading: false,
          product: action.payload,
        };
      case COMPLAINTS_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case NEW_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_REVIEW_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };
      case NEW_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_REVIEW_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

export const complaintsReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
      case ALL_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_REVIEW_SUCCESS:
        return {
          loading: false,
          reviews: action.payload,
        };
      case ALL_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };


export const reviewReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_REVIEW_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_REVIEW_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };