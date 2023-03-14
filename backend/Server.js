const App = require("./App");

const dotenv = require("dotenv");
const connectDatabase = require("./config/Database")

// Handling Uncought Exceptions
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.messages}`);
    console.log(`Shutting down the server due to uncaught Exception`);
    process.exit(1);
});

// config
dotenv.config({path:"backend/config/config.env"});

// connection to database
connectDatabase();

const server = App.listen(process.env.PORT,()=>{
    console.log(`Server listening on http://localhost:${process.env.PORT}`)
});

// unhandled promise rejections
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(()=>{
        process.exit(1);
    });
});