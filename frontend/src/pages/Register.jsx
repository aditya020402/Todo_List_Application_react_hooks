import React,{useContext,useState} from 'react'
import axios from "axios";
import {Context} from "../main.jsx";
import {Link,Navigate} from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);
    const submitHandler = async(e) => {
        setLoading(true);
        e.preventDefault();
        try{
            const { data } = await axios.post(
							`http://127.0.0.1:5000/api/v1/users/new`,
							{ name, email, password },
							{
								withCredentials: true,
								headers: {
									'Content-Type': 'application/json',
								},
							}
						)
            toast.success(data.message);
            setIsAuthenticated(true);
            setLoading(false);
        }
        catch(error){
            toast.error(error.response.data.message);
            setLoading(false);
            setIsAuthenticated(false);
        }
    }
    if(isAuthenticated) 
        return <Navigate to={"/"}/>;
    else
        return (
        <div className="login">
            <section>
                <form onSubmit={submitHandler}>
                    <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Name" required/>
                    <input type="email" placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} required placeholder='Password' value={password} />
                    <button type="submit">Signup</button>
                    <h4>Or</h4>
                    <Link to="/login">Log In</Link>
                </form>
            </section>
        </div>
    )
}

export default Register
