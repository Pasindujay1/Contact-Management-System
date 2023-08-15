import { useState } from "react";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify'; //copied and imported from NPM React Toastify site
import 'react-toastify/dist/ReactToastify.css'; //copied and imported from NPM React Toastify site

const Login = () =>{

    const [credentials ,setCredentials] = useState({
        email:"",
        password:""
    })
    //function to change state with user inputs
    const handleInputChange = (event) =>{
        const {name, value} = event.target;

        //to change the state of our login page
        //changing the previous state with the new state
        setCredentials({...credentials, [name]:value});
         
    }

    const handleSubmit = event =>{
        event.preventDefault(); //prevent the page from refreshing on submit
    
    if(!credentials.email || !credentials.password){
        toast.error("Please enter all the required fields.");
        return;
    }


    }

    return <>
    <ToastContainer  autoClose={2000}/>
    <h3>Login</h3>

    <form onSubmit={handleSubmit}>
        <div class="form-group">
        <label for="emailInput" class="form-label mt-4">Email address</label>
        <input type="email" class="form-control"  value={credentials.email} id="emailInput" onChange={handleInputChange} name="email" aria-describedby="emailHelp" placeholder="simon@example.com" required/>
        </div>
        <div class="form-group">
        <label for="password" class="form-label mt-4">Password</label>
        <input type="password" class="form-control" value={credentials.password} id="password" onChange={handleInputChange} name="password"  placeholder="Enter password" required/>
        </div>
        <input type="submit" value="Login" className="btn btn-primary my-3" />
        <p>Don't have an account ? <Link to="/Register">Create One</Link></p>
    </form>
    </>
}

export default Login;