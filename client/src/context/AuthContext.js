import {createContext} from "react";

const Authcontext = createContext();

export const AuthcontextProvider = ({children}) =>{
    const [user, setUser] = useState(null);

    //login request
    const loginUser = async(userData)=>{
        try{
            const res = await fetch('http://localhost:8000/api/login',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({...userData}) //This is going to spread out the user data.-The spread operator

            });
            const user = await res.json();
            console.log(user);
        }catch{
            console.log(err);
        }
    }

    //register request

    return <Authcontext.Provider value={loginUser}>{children}</Authcontext.Provider>
};

export default Authcontext;