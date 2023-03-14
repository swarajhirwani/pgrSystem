const ErrorHandler = require("../utils/errorHandle.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const User = require("../Models/userSchema.js");
const sendToken = require("../utils/jwtToken.js");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");

// Register a user 
exports.registerUser = catchAsyncError(async(req,res,next)=>{
    const { name, gender, address, aadharNumber, phoneNum, email, password } = req.body;
    console.log(req.body);

    const user = await User.create({
        name,
        gender,
        address,
        aadharNumber,
        phoneNum,
        email,
        password,
        
    });

    sendToken(user, 201, res);
});

// Login user
exports.loginUser = catchAsyncError( async (req, res, next)=>{

    const { email, password } = req.body;

    //checking if user has given password and email both

    if(!email || !password){
        return next(new ErrorHandler("Please enter Email & Password", 400));

    }
    const user = await User.findOne({ email }).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);

});

//Logout User
exports.logout = catchAsyncError(async(req,res,next)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "User logged out",
    });
});

// Forgot Password
exports.forgotPassword = catchAsyncError(async(req,res,next)=>{

    const user  = await User.findOne({ email: req.body.email });

    if(!user){
        return next(new ErrorHandler("User not found", 404
        ));
    }

    //Get Reset Password token
   const resetToken =  user.getResetPasswordToken();

   await user.save({ validateBeforeSave: false });

   const resetPasswordUrl  = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

   const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requseted this email then, please ignore it `;

   try{
        await sendEmail({
            email: user.email,
            subject: `pgrsystem Password Recovery`,
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
   } catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
   }
});


// reset password
exports.resetPassword = catchAsyncError(async(req,res,next)=>{

    // creating token hash
   const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() },

        });

        if(!user){
            return next(new ErrorHandler("Reset Passord Token is invalid or has been expired ", 400
            ));
        }

        if(req.body.password !== req.body.confirmPassword){
            return next(new ErrorHandler("Password does not password ", 400
            ));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        sendToken(user, 200, res);
});

// Get User Details
exports.getUserDetails = catchAsyncError(async(req, res, next)=>{

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

//Update User password
exports.updatePassword = catchAsyncError(async(req, res, next)=>{

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);

});

//Update User Profile
exports.updateProfile = catchAsyncError(async(req, res, next)=>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    // we will add cloudinary later

    const user  = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new :true,
        runValidators:true,
        useFindAndModify: false,

    });

    res.status(200).json({
        success:true,
    });
   // sendToken(user, 200, res);
});

//get all users(admin)
exports.getAllUser = catchAsyncError(async(req, res, next)=>{
    const users = await User.find();

    res.status(200).json({
        success:true,
        users,
    });
});

//get single user(admin)
exports.getSingleUser = catchAsyncError(async(req, res, next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`))
    }
    res.status(200).json({
        success:true,
        user,
    });
});

//Update User Role (admin)
exports.updateUserRole = catchAsyncError(async(req, res, next)=>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    const user  = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new :true,
        runValidators:true,
        useFindAndModify: false,

    });

    res.status(200).json({
        success:true,
    });
   // sendToken(user, 200, res);
});

//Delete User (Admin)
exports.deleteUser = catchAsyncError(async(req, res, next)=>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    // we will remove cloudinary later
    const user  = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`));
    }

    await user.remove();

    res.status(200).json({
        success:true,
        message: "User Deleted successfully"
    });
   // sendToken(user, 200, res);
});