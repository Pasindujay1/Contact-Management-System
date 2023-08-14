import Layout from "./components/Layout";
import {Routes as Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


const App = () => {
  return(
  <Layout>
    <Switch>
      <Route path ="/" element={<Home/>} />
      <Route path ="/Login" element={<Login/>} />
      <Route path ="/Register" element={<Register/>} />
    </Switch>  
  </Layout>
  );
}

export default App;