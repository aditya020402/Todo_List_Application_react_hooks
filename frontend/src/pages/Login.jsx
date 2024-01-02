import React,{useContext,useState} from 'react'
import axios from "axios";
import {toast} from "react-hot-toast";
import {Link,Navigate} from "react-router-dom";
import {Context} from "../main.jsx";


const Login = () => {
    const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const submitHandler = async(e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const { data } = await axios.post(
							`http://127.0.0.1:5000/api/v1/users/login`,
							{ email, password },
							{
								headers: {
									'Content-Type': 'application/json',
								},
								withCredentials: true,
							}
						)
            toast.success(data.message);
            setLoading(false);
            setIsAuthenticated(true);
        }
        catch(error){
            toast.error(error.response.data.message);
            setLoading(false);
            setIsAuthenticated(false);
        }
    }
    if(isAuthenticated){
        return <Navigate to="/"/>
    }
    else{
        return (
            <div className="login">
                <section>
                    <form onSubmit={submitHandler}>
                        <input type="email" placeholder="Email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <input type="password" required placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        <button disabled={loading} type="submit">Login</button>
                        <h4>Or</h4>
                        <Link to="/register">Sign Up</Link>
                    </form>
                </section>
            </div>
        )
    }
}

export default Login
