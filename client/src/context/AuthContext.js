import {createContext, useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify'; //copied and imported from NPM React Toastify site
import 'react-toastify/dist/ReactToastify.css'; //copied and imported from NPM React Toastify site


const Authcontext = createContext();

export const AuthcontextProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [error,setError] =useState(null);

    useEffect(()=>{
        checkUserLoggedIn();
    },{})

    //check if the user is logged in
    const checkUserLoggedIn = async() =>{
        try{
            const res = await fetch(`http://localhost:8000/api/me`,{
                method:"GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            const result = await res.json();
            if(!result.error){
                setUser(result);
            }else{
                console.log(result);

            }
        }catch(err){
            console.log(err);
        }
    }

    //login request
    const loginUser = async(userData)=>{
        try{
            const res = await fetch(`http://localhost:8000/api/login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({...userData}) //This is going to spread out the user data.-The spread operator

            });
            //to save the token into local storage if no error occured 
            const result = await res.json();
            if(!result.error){
                // console.log(result);
                localStorage.setItem("token",result.token);
                setUser(result.user);
            }else{
               
            }
            
        }catch(err){
            console.log(err);
        }
    }

    //register request
    const registerUser = async (userData) => {
        try{
            const res = await fetch(`http://localhost:8000/api/register`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({...userData}) //This is going to spread out the user data.-The spread operator

            });

            const result = await res.json();
            if(!result.error){
                console.log(result);
            }else{
                console.log(result);
            }
        }catch(err){
            console.log(err);
        }
    }

    return(
         <Authcontext.Provider value={{loginUser, registerUser, user, setUser}}>
            {children}
        </Authcontext.Provider>
    );
};

export default Authcontext;