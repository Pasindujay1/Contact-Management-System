const mongoose = require("mongoose");
const Joi = require('joi'); //joi library is used to validate user inputs



//Defining Contact Schema
const ContactSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Name is required."]
    },
    address:{
        type:String,
        required:[true,"Address is required."]
    },
    email:{
        type:String,
        required:[true,"Email is required."]
    },
    phone:{
        type:Number,
        required:[true,"Phone number is required."]
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }

});

//creating contact model
const Contact = new mongoose.model("Contact",ContactSchema);

//validating user inputs using joi library
const validateContact = (data) =>{
    const schema = Joi.object({
        name:Joi.string().min(4).max(50).required(),
        address:Joi.string().min(4).max(100).required(),
        email:Joi.string().email().required(),
        phone:Joi.number().min(7).max(10000000000).required(),
    });
    return schema.validate(data);
};

module.exports = {
    validateContact,
    Contact,
};
