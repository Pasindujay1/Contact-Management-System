const jwt = require('jsonwebtoken');

const User = require("../models/User");

module.exports = (req,res,next) =>{
    const authHeader = req.headers.authorization; //we are grabbing the auth Header from our req.headers because we are going to send the token along with our headers

    if(authHeader){

    }else{
        return res.status(403).json({error: "Forbidden"})
    }

}