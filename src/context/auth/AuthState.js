import AuthContext from "./AuthContext";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const host = "http://localhost:5000";
const AuthState = (props) => {
    const navigate = useNavigate();
    
    const loginUser = async (email, password) => {
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({ email, password })
        });

        if (response.status !== 200) return toast.warning("Try with correct credentials ");
        // Wait for data 
        const data = await response.json();
        localStorage.setItem("authToken", data.authtoken);
        toast.success("User login successfully");
        navigate("/");

    }
    const SignupUser = async (name, email, password) => {
     
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({ name, email, password })
        });

        // Wait for data 
        const data = await response.json();

        if (!data.success) return toast.warning(data.error); // check for success if error then toast the error message
        // If no error then execute 
        toast.success("User Signup Successfully");
        localStorage.setItem("authToken", data.authtoken);
        navigate("/");
    }
    return (
        <AuthContext.Provider value={{ loginUser, SignupUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState;