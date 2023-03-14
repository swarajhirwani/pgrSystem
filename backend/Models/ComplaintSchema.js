const mongoose = require("mongoose");

const ComplaintSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter Your Name"],
        
    },
    address:{
        type:String,
        required:[true, "Please Enter Your Address"]
    },
    phoneNumber:{
        type:Number,
        required:[true, "Please Enter Your Phone Number"],
        minLength:[10]
    },
    selectGrievance:[
        {
        type:String,
        required:[true, "Please Select Your Complaints"]
        }
    ],
    complaintDetails:{
        type:String,
        required:[true, "Please Enter Your Details"]
    },
    uploadPhotos:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    numOfReviews:{
        type:Number,
        default:0
    },
    ratings:{
        type:Number,
       default:0,
    },

    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"user",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    },

    createAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Complaints",ComplaintSchema);