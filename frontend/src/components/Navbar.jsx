import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">Empowerment</Link>
            <div>
                <Link to="/login" className="px-4 py-2 hover:bg-blue-500 rounded">Login</Link>
                <Link to="/register" className="ml-4 px-4 py-2 bg-white text-blue-600 rounded">Sign Up</Link>
            </div>
        </nav>
    );
};

export default Navbar;
