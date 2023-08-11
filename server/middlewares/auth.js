const jwt = require('jsonwebtoken');

const User = require("../models/User");

module.exports = (req,res,next) =>{
    const authHeader = req.headers.authorization; //we are grabbing the auth Header from our req.headers because we are going to send the token along with our headers

    if(authHeader){
        const token = authHeader.split(" ")[1];

        //verifying the token
        jwt.verify(token, process.env.JWT_SECRET, async(err, payload) =>{
          
            try{
                if(err){
                    return res.status(401).json({error: "unauthorized!"})
                }
    

                const user = await User.findOne({_id:payload._id}).select("-password")
                req.user = user; //the above code will return our user,n we are gonna attach that user into req.user
                next();//calling the next function will jump onto our routes
            }catch{
                console.log(err);
            }     
        });

    }else{
        return res.status(403).json({error: "Forbidden "})
    }

}