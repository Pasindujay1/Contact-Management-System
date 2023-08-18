
import { useContext, useEffect } from "react";
import Authcontext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () =>{
    const navigate = useNavigate();
    const {user} = useContext(Authcontext);
    useEffect(()=>{
        !user && navigate("/login",{replace:true});
    },[]);
    return <>
        <div className="jumbotron">
            <h1>Welcome {user ? user.name : null}</h1> 
            <hr className="my-4"/>
            <a className="btn btn-primary btn-info" href="#" role="button">ADD CONTACTS</a>
        </div>
    </>
};


export default Home;