const ComplaintsDetailsModel = require("../Models/complaintDetailModel.js");
const Complaints = require("../Models/ComplaintSchema.js");
const ErrorHandler = require("../utils/errorHandle.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");

exports.newComplaint = catchAsyncError(async (req, res, next)=>{

        const {complaintsInfo,complaintItems,totalComplaint} = req.body;

        const complaintsDetails = await ComplaintsDetailsModel.create({
            complaintsInfo,
            complaintItems,
            totalComplaint,
            complaintAt: Date.now(),
            user: req.user._id,
        });

        res.status(200).json({
            success:true,
            complaintsDetails,
        })
});

// get single complaint Details
exports.getSingleComplaintDetails = catchAsyncError(async (req, res, next)=>{
    const complaintDetail = await ComplaintsDetailsModel.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if(!complaintDetail){
        return next(new ErrorHandler("Complaint Details not found with this Id", 404));
    }

    res.status(200).json({
        success:true,
        complaintDetail,
    });
});

// get logged in  complaint Details
exports.myComplaintDetails = catchAsyncError(async (req, res, next)=>{
    const complaintDetails = await ComplaintsDetailsModel.findById({user: req.user._id});

    res.status(200).json({
        success:true,
        complaintDetails,
    });
});

// get All  complaint Details(Admin)
exports.getAllComplaintDetails = catchAsyncError(async (req, res, next)=>{
    const complaintDetails = await ComplaintsDetailsModel.find();

    let totalAmount = 0;

    complaintDetails.forEach((complaints)=>{
        totalAmount += complaints.totalComplaint;
    });

    res.status(200).json({
        success:true,
        totalAmount,
        complaintDetails,
    });
});

// Update complaint Details(Admin)
exports.updateComplaintDetails = catchAsyncError(async (req, res, next)=>{
    const complaintDetail = await ComplaintsDetailsModel.findById(req.params.id);

    if(!complaintDetail){
        return next(new ErrorHandler("Complaint Details not found with this Id", 404));
    }

    if(complaintDetail.complaintStatus === "Completed"){
        return next(new ErrorHandler("You have already Completed a complaint", 400));
    }

    complaintDetail.complaintItems.forEach(async (c) => {
        await updateStock(c.complaints, c.quantity);
    });

    complaintDetail.complaintStatus = req.body.status;
    if(req.body.status === "Completed"){
        complaintDetail.deleveredAt = Date.now();
    }

    await complaintDetail.save({ validateBeforeSave: false });
    res.status(200).json({
        success:true,
    });
});

async function updateStock(id, quantity) {
    const complaints = await Complaints.findById(id);

    complaints.Stock -= quantity;

    await Complaints.save({validateBeforeSave: false});
}

// Delete complaint Details(Admin)
exports.deleteComplaintDetails = catchAsyncError(async (req, res, next)=>{
    const complaintDetails = await ComplaintsDetailsModel.findById(req.params.id);

    if(!complaintDetails){
        return next(new ErrorHandler("Complaint Details not found with this Id", 404));
    }

    await complaintDetails.remove();

    res.status(200).json({
        success:true,
    });
});