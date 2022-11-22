import React from 'react'
import { Link, useLocation,useNavigate } from "react-router-dom";

export function Navbar({ title }) {
    const navigate = useNavigate();
    let location = useLocation();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    }
    return (
        <nav className='w-full shadow-sm '>
            <div className="nav-header flex justify-between items-baseline w-9/12 mx-auto pt-10 pb-7">
                <div className="nav-logo font-newFont text-xl w-fit font-bold ">
                    <div className="flex flex-col justify-center w-fit items-center">
                        <img className='w-14 bg-center bg-cover' src="/images/logo.png" alt="" />
                        {title}
                    </div>

                </div>

                <div className="nav-item w-9/12 mx-auto pt-10 pb-7 ">
                    <ul className='uppercase flex flex-row space-x-10 font-newFont tracking-tighter  text-black items-center  justify-center'>
                        <li className={`cursor-pointer hover:text-gray-500 ${location.pathname === "/" ? "font-bold" : ""}`}><Link to="/">Home</Link></li>
                        <li className={`cursor-pointer hover:text-gray-500 ${location.pathname === "/notes" ? "font-bold" : ""}`}><Link to="/notes">Notes</Link></li>
                        <li className={`cursor-pointer hover:text-gray-500 ${location.pathname === "/contact" ? "font-bold" : ""}`}><Link to="/contact">Contact</Link></li>
                        <li className={`cursor-pointer hover:text-gray-500 ${location.pathname === "/about" ? "font-bold" : ""}`}><Link to="/about">About</Link></li>
                    </ul>
                </div>
                <div className="nav-icons-with-search flex space-x-3" >
                    <div className="icons flex items-center justify-center space-x-2 ">
                        <div className="facebook-icon w-10 ">
                            <i className="fa-brands fa-facebook"></i> </div>
                        <div className="twiter-icon w-10 ">
                            <i className="fa-brands fa-twitter"></i> </div>
                        <div className="instagram-icon w-10">
                            <i className="fa-brands fa-instagram"></i></div>

                    </div>

                    <div className="authinticate flex gap-3">
                        {(!localStorage.getItem("authToken")) ?
                            <Link to="/login" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 text-base px-3 rounded mx-1">
                                Login
                            </Link> : <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 text-base px-3 rounded" onClick={handleLogout}>
                                Logout
                            </button>
                        }
                    </div>

                </div>
            </div>
        </nav>
    )

}


export default Navbar