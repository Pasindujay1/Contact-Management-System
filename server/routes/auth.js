const router = require("express").Router();
const bcrypt = require("bcrypt"); // Required to Hash our password when we pass it to DB
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const auth = require("../middlewares/auth");
require("dotenv").config({path: "./config/config.env"} );




router.post("/register",async(req,res)=>{
    const {name, email, password} = req.body;

    //check all the missing fields
    if(!name || !email || !password )
        return res.status(400).json({error: `Please  enter all the required fields`}); //400 is used as bad user input.
    
    //Name validation
    if(name.length >=25)
        return res.status(400).json({error:`Name can be only less than 25 characters`});

     //Email Validation - to validate email-search google about email reg regex function
    const emailReg =       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

     if(!emailReg.test(email))
         return res.status(400).json({error:"Please enter a valid email address."});
    
    //validation of password
    if(password.length <= 6) 
        return res.status(400).json({error:"Password must be at least 6 characters long"});

    try{

        //Check if user already exists
        const doesUserAlreadyExist = await User.findOne({email}); 
        if(doesUserAlreadyExist)
            return res.status(400).json({error:`a user with that email [${email}] already exists, so please try another email`});

        //We used a library called bcrypt to Hash (encrypt) our password when we pass it to our DB
        const hashedPassword = await bcrypt.hash(password,12)
        console.log(email);

        //Creating our model
        const newUser = new User({ name, email, password: hashedPassword});

        //save the users.
        const result = await newUser.save();

        result._doc.password = undefined; //To make the password not be sent n seen in the response

        return res.status(201).json({...result._doc}); //201 means success with creation
        //doc property defines everything. i.e. name,email

    }catch(err){
        console.log(err);
        return res.status(500).json({ error: err.message});
    }
});

router.post("/login",async (req,res)=>{
    const {email, password} = req.body;

    if(!email || !password)
        return res.status(400).json({error:"Please enter all the required fields!"});

    //Email Validation - to validate email-search google about email reg regex function
    const emailReg =       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

     if(!emailReg.test(email))
         return res.status(400).json({error:"Please enter a valid email address."});
    


    try{

        //check if user already exists
        const doesUserExists = await User.findOne({email});
        if(!doesUserExists)
            return res.status(400).json({error:"Invalid Email or Password"});

        //if there were any user present
        const doesPasswordMatch = await bcrypt.compare(password,doesUserExists.password);
        if(!doesPasswordMatch) 
            return res.status(400).json({error:"Invalid Email or Password"});


        //Generating token
        const payload = { _id: doesUserExists._id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"1h",});

        const user = {...doesUserExists._doc, password:undefined};
        return res.status(200).json({token, user}); //sending the token and the state of the user

    }catch(err){
        console.log(err);
        return res.status(500).json({error: err.message});
            
    }
});

router.get("/me",auth,async (req,res) =>{ //we use auth since it needs to be protected middleware
    return res.status(200).json({...req.user._doc});
})

module.exports = router;