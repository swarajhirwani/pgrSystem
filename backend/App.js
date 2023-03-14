const { application } = require("express");
const express = require("express");
const App = express();
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error");

App.use(express.json());
App.use(cookieParser());


// Routes Imports 
const complaints = require("./routes/ComplaintRoutes");
const user = require("./routes/userRoutes");
const complaintsDetails = require("./routes/complaintDetailsRoutes");

App.use("/api/v1", complaints);
App.use("/api/v1", user);
App.use("/api/v1", complaintsDetails);

// Middleware for error
App.use(errorMiddleware);

module.exports = App