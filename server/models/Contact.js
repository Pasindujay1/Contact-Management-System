const mongoose = require("mongoose");

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
        type
    }

})