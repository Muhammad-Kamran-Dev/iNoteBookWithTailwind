import AuthContext from "./AuthContext";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const AuthState = (props) => {
    const navigate = useNavigate();
    const host = "http://localhost:5000";
    const loginUser = async (email, password) => {

        console.log("Login user is Execting ");
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
        navigate("/");

    }
    return (
        <AuthContext.Provider value={{ loginUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState;