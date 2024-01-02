import React,{useContext} from 'react';
import axios from "axios";
import {toast} from "react-hot-toast";
import {Link} from "react-router-dom";
import {Context} from "../main.jsx";

const Header = () => {
  
    const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);
    
    const logoutHandler = async() => {
        setLoading(true);
        try{
            await axios.get(`http://127.0.0.1:5000/api/v1/users/logout`
            , {
							withCredentials: true,
						}
            )
            toast.success("Logged Out Successfully");
            setIsAuthenticated(false);
            setLoading(false);
        }
        catch{
            toast.error(error.response.data.message);
            setIsAuthenticated(true);
            setLoading(false);
        }
    }
  return (
    <nav className="header">
        <div>
            <h2>Todo App</h2>
        </div>
        <article>
            <Link to={`/`}>Home</Link>
            <Link to={'/profile'}>Profile</Link>
            {
            isAuthenticated ? (
            <button disabled={loading} onClick={logoutHandler} className="btn">
                Logout 
            </button>)
            :(
                <Link to={"/login"}>Login</Link>
            )
        }
        </article>
    </nav>
  )
}

export default Header
