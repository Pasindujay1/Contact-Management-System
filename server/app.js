const express = require('express');
const morgan = require("morgan");
const connectDB = require('./config/db');

const app=express();

//middlewares - Middlewares help us to send responses back in JSON format
app.use(express.json()); 
app.use(morgan("tiny"));

//routes
app.use("/api",require("./routes/auth"));

//server configurations
const PORT = process.env.PORT || 8000;
app.listen(PORT, async() =>{
    try{
        await connectDB(); //We don't want our app to be executed until our app successfully connects to a database
        console.log(`Server is listening on port : ${PORT}`)
    }catch(err){
        console.log(err);
    }
})