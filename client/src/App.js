import Layout from "./components/Layout";
import {Routes as Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthcontextProvider } from "./context/AuthContext";
import { ToastContextProvider } from "./context/ToastContext";
import CreateContact from "./pages/CreateContact";
import AllContact from "./pages/AllContact";


const App = () => {
  return(
    <ToastContextProvider>
      <AuthcontextProvider>
        <Layout>
          <Switch>
            <Route path ="/" element={<Home/>} />
            <Route path ="/login" element={<Login/>} />
            <Route path ="/register" element={<Register/>} />
            <Route path ="/create" element={<CreateContact/>} />
            <Route path ="/mycontacts" element={<AllContact/>} />

          </Switch>  
        </Layout>
      </AuthcontextProvider>
    </ToastContextProvider>

  
  );
}

export default App;