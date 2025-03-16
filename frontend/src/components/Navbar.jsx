import { useState, useContext, useLayoutEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import GoogleTranslator from "./GoogleTranslator";
import FontSizeAdjuster from "./FontSizeAdjuster";
import SlideButton from "./SlideButton";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = ({ toggleCursor, toggleTheme }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const navigate = useNavigate();
  const { setShowSearch, getCartCount, token, setToken, cartItems, setCartItems } = useContext(ShopContext);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    setToken("");
    setCartItems({});
  };

  const handleDarkModeToggle = (newMode) => {
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("darkMode", newMode);
    toggleTheme(newMode);
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium transition-all duration-300">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Logo" aria-label="Website Logo" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm">
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? "border-b-2 border-gray-500 dark:border-white" : ""} ${isDarkMode ? "text-white" : "text-black"}`}>
          <p>HOME</p>
        </NavLink>
        <NavLink to="/collection" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? "border-b-2 border-gray-500 dark:border-white" : ""} ${isDarkMode ? "text-white" : "text-black"}`}>
          <p>COURSES</p>
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? "border-b-2 border-gray-500 dark:border-white" : ""} ${isDarkMode ? "text-white" : "text-black"}`}>
          <p>ABOUT</p>
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? "border-b-2 border-gray-500 dark:border-white" : ""} ${isDarkMode ? "text-white" : "text-black"}`}>
          <p>CONTACT</p>
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img onClick={() => { navigate("/collection"); setShowSearch(true); }} src={assets.search_icon} className="w-5 cursor-pointer" alt="Search Icon" />

        <DarkModeToggle onToggle={handleDarkModeToggle} />
        <GoogleTranslator />
        <FontSizeAdjuster isDarkMode={isDarkMode} />

        {/* ✅ SlideButton to Toggle Cursor */}
        <SlideButton onToggle={toggleCursor} />

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5 cursor-pointer" alt="Cart Icon" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black dark:bg-white dark:text-black aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
