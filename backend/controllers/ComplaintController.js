const Complaints = require("../Models/ComplaintSchema.js");
const ErrorHandler = require("../utils/errorHandle.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const ApiFeatures = require("../utils/apiFeatures.js");
const { request } = require("express");

// Create complaints -- admin
exports.createComplaints = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;

  const complaints = await Complaints.create(req.body);

  res.status(201).json({
    success: true,
    complaints,
  });
});

//GET ALL Complaints
exports.getAllComplaints = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 10;
  const complaintsCount = await Complaints.countDocuments();

  const apiFeature = new ApiFeatures(Complaints.find(), req.query)
    .search()
    .filter();

    let complaints = await apiFeature.query;

    let filteredComplaintsCount = complaints.length;

  apiFeature.pagination(resultPerPage);

  complaints = await apiFeature.query;

  res.status(200).json({
    success: true,
    complaints,
    complaintsCount,
    resultPerPage,
    filteredComplaintsCount,
  });
});

// get Complaints details
exports.getComplaintsDetails = catchAsyncError(async (req, res, next) => {
  const complaints = await Complaints.findById(req.params.id);

  if (!complaints) {
    return next(new ErrorHandler("Complaints not found", 404));
  }

  res.status(200).json({
    success: true,
    complaints,
  });
});

// update all Complaints --admin
exports.updateComplaints = catchAsyncError(async (req, res, next) => {
  let complaints = await Complaints.findById(req.params.id);

  if (!complaints) {
    return next(new ErrorHandler("Complaints not found", 404));
  }

  complaints = await Complaints.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    complaints,
  });
});

// delete complaints -- admin
exports.deleteComplaints = catchAsyncError(async (req, res, next) => {
  const complaints = await Complaints.findById(req.params.id);

  if (!complaints) {
    return next(new ErrorHandler("Complaints not found", 404));
  }

  await complaints.remove();

  res.status(200).json({
    success: true,
    message: "complaints deleted successfully",
  });
});

// Create New Review or Update Complaints reviews
exports.createComplaintsReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, complaintId } = req.body;

  const review = {
    user: req.user._id,
    name: req.body.name,
    rating: Number(rating),
    comment,
  };

  const complaints = await complaints.findById(complaintId);

  const isReviewed = complaints.reviews.find(
    (rev) => rev.user.toString() === request.user._id.toString()
  );

  if (isReviewed) {
    complaints.reviews.forEach((rev) => {
      if (rev.user.toString() === request.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    complaints.reviews.push(review);
    complaints.numOfReviews = complaints.reviews.length;
  }
  let avg = 0;
  complaints.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  complaints.ratings = avg / complaints.reviews.length;

  await Complaints.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//get All reviews of a complaints
exports.getComplaintsReviews = catchAsyncError(async (req, res, next) => {
  const complaints = await complaints.findById(req.query.id);

  if (!complaints) {
    return next(new ErrorHandler("Complaints not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: complaints.reviews,
  });
});

//Delete Reviews
exports.deleteReviews = catchAsyncError(async (req, res, next) => {
  const complaints = await complaints.findById(req.query.id);

  if (!complaints) {
    return next(new ErrorHandler("Complaints not found", 404));
  }

  const reviews = complaints.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  const ratings = avg / reviews.length;

  const numOfReviews = reviews.length;

  await Complaints.findByIdAndUpdate(
    req.query.complaintsId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
  });
});
