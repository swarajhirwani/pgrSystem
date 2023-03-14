const express = require("express");
const { getAllComplaints,createComplaints, updateComplaints, deleteComplaints, getComplaintsDetails, createComplaintsReview, getComplaintsReviews, deleteReviews } = require("../controllers/ComplaintController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();


router.route("/complaints").get(getAllComplaints);

router.route("/user/complaints/new").post(isAuthenticatedUser, createComplaints);

router.route("/user/complaints/:id")
.put(isAuthenticatedUser, updateComplaints)
.delete(isAuthenticatedUser, deleteComplaints)

router.route("/user/complaints/:id")
.put(isAuthenticatedUser,  updateComplaints)
.delete(isAuthenticatedUser,  deleteComplaints)

router.route("/complaints/:id").get(getComplaintsDetails);

router.route("/review").put(isAuthenticatedUser, createComplaintsReview);

router.route("/reviews").get(getComplaintsReviews).delete(isAuthenticatedUser, deleteReviews);

module.exports = router;