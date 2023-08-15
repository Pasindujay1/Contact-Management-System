import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'; //copied and imported from NPM React Toastify site
import 'react-toastify/dist/ReactToastify.css'; //copied and imported from NPM React Toastify site


const Register = () =>{
    const [credentials, setCredentials] = useState({
        email:"",
        password:"",
        confirmPassword:""

});
const handleInputChange = (event) =>{
    const {name,value} = event.target;

    setCredentials({...credentials,[name]:value }); //we create a shallow copy of the current credentials object and update the relevent property
};

const handleSubmit = (event) =>{
    event.preventDefault(); //to perevent the page from being refreshed when Register button is clicked

    if(!credentials.email || !credentials.password || !credentials.confirmPassword){
    toast.error("Please enter all the required fields!");
    return; //To return from the If statement
}
//to check if password and confirm password match
if(credentials.password !== credentials.confirmPassword){
    toast.error("Passwords do not match!");
    return;
}
}

    return (
    <>
    <ToastContainer  autoClose={2000}/>
    <h3>Create your account</h3>
    
     <form onSubmit={handleSubmit}>
        <div class="form-group">
        <label for="emailInput" class="form-label mt-4">Email address</label>
        <input type="email" class="form-control" id="emailInput" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={handleInputChange} placeholder="simon@example.com" required/>
        </div>
        <div class="form-group">
        <label for="password" class="form-label mt-4">Password</label>
        <input type="password" class="form-control" id="password" name="password" value={credentials.password} onChange={handleInputChange} placeholder="Enter password" required/>
        </div>
        <div class="form-group">
        <label for="confirmPassword" class="form-label mt-4">Confirm Password</label>
        <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" value={credentials.confirmPassword} onChange={handleInputChange} placeholder="Enter password" required/>
        </div>

        <input type="submit" value="Register" className="btn btn-primary my-3" />
        <p>Already have an account ? <Link to="/Login">Login</Link></p>
    </form>
    </>
    );
};

export default Register;