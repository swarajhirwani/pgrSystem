const express = require("express");
const { newComplaint, getSingleComplaintDetails, myComplaintDetails, getAllComplaintDetails, updateComplaintDetails, deleteComplaintDetails } = require("../controllers/complaintDetailsController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router.route("/complaint/new").post(isAuthenticatedUser, newComplaint);

router.route("/complaint/:id").get(isAuthenticatedUser, getSingleComplaintDetails);

router.route("/complaint/me").get(isAuthenticatedUser, myComplaintDetails);

router.route("/admin/complaint").get(isAuthenticatedUser, authorizeRoles("admin"), getAllComplaintDetails);

router.route("/admin/complaint/:id")
.put(isAuthenticatedUser, authorizeRoles("admin"), updateComplaintDetails)
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteComplaintDetails);

module.exports = router;