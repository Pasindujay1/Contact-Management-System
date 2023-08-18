import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'; //copied and imported from NPM React Toastify site
import 'react-toastify/dist/ReactToastify.css'; //copied and imported from NPM React Toastify site
import Authcontext from "../context/AuthContext";


const Register = () =>{
    const {registerUser} = useContext(Authcontext);
    const [credentials, setCredentials] = useState({
        name:"",
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
const userData ={...credentials, confirmPassword: undefined};
registerUser(userData);
}

    return (
    <>
    <ToastContainer  autoClose={2000}/>
    <h3>Create your account</h3>
    
     <form onSubmit={handleSubmit}>
     <div className="form-group">
        <label htmlForfor="nameInput" className="form-label mt-4">Your Name</label>
        <input type="text" className="form-control" id="nameInput" name="name"  value={credentials.name} onChange={handleInputChange} placeholder="Simon Carter" required/>
        </div>
        <div className="form-group">
        <label htmlForfor="emailInput" className="form-label mt-4">Email address</label>
        <input type="email" className="form-control" id="emailInput" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={handleInputChange} placeholder="simon@example.com" required/>
        </div>
        <div className="form-group">
        <label htmlForfor="password" className="form-label mt-4">Password</label>
        <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleInputChange} placeholder="Enter password" required/>
        </div>
        <div className="form-group">
        <label htmlFor="confirmPassword" className="form-label mt-4">Confirm Password</label>
        <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={credentials.confirmPassword} onChange={handleInputChange} placeholder="Enter password" required/>
        </div>

        <input type="submit" value="Register" className="btn btn-primary my-3" />
        <p>Already have an account ? <Link to="/Login">Login</Link></p>
    </form>
    </>
    );
};

export default Register;