import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Import Toastify styles
import { useNavigate } from "react-router-dom"; 
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate(); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const endpoint = currentState === "Sign Up" ? "/api/user/register" : "/api/user/login";
      const payload = currentState === "Sign Up" ? { name, email, password } : { email, password };

      const response = await axios.post(backendUrl + endpoint, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        
        // ✅ Show success message
        toast.success("Login Successful!");

        // ✅ Navigate after 1 second for smooth UX
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Authentication Error:", error);
      toast.error(error.response?.data?.message || "Network Error. Please try again!");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="text-center mt-14">
      <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-[400px] m-auto mt-14 gap-4">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {currentState === "Sign Up" && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Enter your name"
            required
          />
        )}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Enter your email"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Enter your password"
          required
        />

        {currentState === "Login" ? (
          <div className="w-full flex justify-between text-sm mt-[-8px]">
            <p className="cursor-pointer text-black hover:underline">Forgot your password?</p>
            <p onClick={() => setCurrentState("Sign Up")} className="cursor-pointer text-black hover:underline">
              Create an account
            </p>
          </div>
        ) : (
          <div className="w-full text-right text-sm mt-[-8px]">
            <p onClick={() => setCurrentState("Login")} className="cursor-pointer text-black hover:underline">
              Login
            </p>
          </div>
        )}

        <button type="submit" className="px-8 py-2 bg-black text-white mt-4">
          {currentState}
        </button>
      </form>
    </div>
  );
};

export default Login;
