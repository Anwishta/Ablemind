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
  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    cartItems,
    setCartItems,
  } = useContext(ShopContext);

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
        <img
          src={assets.logo}
          className="w-36"
          alt="Logo"
          aria-label="Website Logo"
        />
      </Link>

      {/* 🔹 Navigation Links */}
      <ul className="hidden sm:flex gap-5 text-sm">
        {["/", "/collection", "/about", "/contact"].map((path, index) => (
          <NavLink
            key={index}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${
                isActive ? "border-b-2 border-gray-500 dark:border-white" : ""
              } ${isDarkMode ? "text-white" : "text-black"}`
            }
          >
            <p>{path === "/" ? "HOME" : path.slice(1).toUpperCase()}</p>
          </NavLink>
        ))}
      </ul>

      {/* 🔹 Right Side Icons */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <img
          onClick={() => {
            navigate("/collection");
            setShowSearch(true);
          }}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search Icon"
        />

        {/* Dark Mode Toggle */}
        <DarkModeToggle onToggle={handleDarkModeToggle} />

        {/* Google Translator */}
        <GoogleTranslator />

        {/* Font Size Adjuster */}
        <FontSizeAdjuster isDarkMode={isDarkMode} />

        {/* 🔹 Cursor Toggle */}
        <SlideButton onToggle={toggleCursor} />

        {/* 🔹 Profile Dropdown */}
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="Profile Icon"
            aria-label="Profile Icon"
          />
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-2 bg-slate-100 dark:bg-gray-800">
                <p className="cursor-pointer hover:text-black dark:hover:text-white">My Profile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black dark:hover:text-white"
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-black dark:hover:text-white"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 🔹 Cart Icon */}
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 min-w-5 cursor-pointer"
            alt="Cart Icon"
            aria-label="Cart Icon"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white dark:bg-white dark:text-black aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
