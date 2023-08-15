import Layout from "./components/Layout";
import {Routes as Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthcontextProvider } from "./context/AuthContext";


const App = () => {
  return(
    <AuthcontextProvider>
      <Layout>
        <Switch>
          <Route path ="/" element={<Home/>} />
          <Route path ="/Login" element={<Login/>} />
          <Route path ="/Register" element={<Register/>} />
        </Switch>  
      </Layout>
    </AuthcontextProvider>
  
  );
}

export default App;