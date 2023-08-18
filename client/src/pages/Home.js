
import { useContext, useEffect } from "react";
import Authcontext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Home = () =>{
    const navigate = useNavigate();
    const {user} = useContext(Authcontext);
    useEffect(()=>{
        !user && navigate("/login",{replace:true});
    },[]);
    return <>This is Home page</>
};


export default Home;