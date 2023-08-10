const mongoose=require("mongoose")


//Defining User Schema
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required."]
    },
    email:{
        type:String,
        required:[true,"Email is required."]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    }
});

//Creating our model. "User" is the name of our collection
const User = new mongoose.model("User", UserSchema)

module.exports = User;



