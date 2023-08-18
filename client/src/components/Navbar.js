import { useContext } from "react";
import { Link } from "react-router-dom";
import Authcontext from "../context/AuthContext";


const Navbar = ({title = "CMS"}) =>{ //Destructure the title prop  and replace it with thee manager
    const {user, setUser} = useContext(Authcontext);

    
    return (
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
            
            <Link to="/">
                <a className="navbar-brand">{title}</a>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav ms-auto">
                {user ? (
                    <>
                        <li className="nav-item" onClick={() => {
                            setUser(null); //to clear the state of the user when logging out
                            localStorage.clear();
                        }}> 
                            <button className="btn btn-danger"> Logout</button>
                        
                        </li>
                    </>
                ):(
                    <>
                        <li className="nav-item">
                            <Link to="/Login">
                                <a className="nav-link">Login</a>
                            </Link>
                        
                        </li>
                        <li className="nav-item">
                        <Link to="/Register">
                            <a className="nav-link">Register</a>
                        </Link>
                        </li>
                    </>
                )}
                
                
            </ul>
            
            </div>
        </div>
</nav>
    )
}

export default Navbar;