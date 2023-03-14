const mongoose  = require("mongoose")

const complaintDetailsModel = new mongoose.Schema({
    complaintsInfo:{
        address:{
            type: String,
            required: true,
        },
        city:{
            type: String,
            required: true,
        },
        state:{
            type: String,
            required: true,
        },
        country:{
            type: String,
            required: true,
        },
        pinCode:{
            type: Number,
            required: true,
        },
        phoneNo:{
            type: Number,
            required: true,
        },
    },
    complaintItems:[
        {
            name:{
                type: String,
                required: true,
            },
            quantity:{
                type: Number,
                required: true,
            },
            image:{
                type: String,
                required: true,
            },
            complaints:{
                type: mongoose.Schema.ObjectId,
                ref: "complaints",
                required: true,
            },
        },
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    },
    complaintAt:{
        type: Date,
        required: true,
    },
    totalComplaint:{
        type:Number,
        required: true,
        default: 0,
    },
    complaintStatus:{
        type:String,
        required: true,
        default:"Processing",
    },
    deleveredAt:Date,
    createdAt:{
        type:Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("ComplaintsDetails", complaintDetailsModel);