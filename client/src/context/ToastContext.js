import  {createContext} from "react";
import { ToastContainer, toast } from 'react-toastify'; //copied and imported from NPM React Toastify site
import 'react-toastify/dist/ReactToastify.css'; //copied and imported from NPM React Toastify site


const ToastContext = createContext();

export const ToastContextProvider = ({children}) =>{
    return(
        <ToastContext.Provider value={{toast}}>
            <ToastContainer autoClose={2000}/>
            {children}
        </ToastContext.Provider>
    );
};

export default ToastContext;