import { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../../public/assets/assets";
import GoogleTranslator from "./GoogleTranslator";


const Navbar = () => {
  const [visible, setVisible] = useState(false);
  
  const navigate = useNavigate();
  const { setShowSearch, getCartCount, token, setToken, cartItems, setCartItems } = useContext(ShopContext);

  console.log("Current cartItems in Navbar:", cartItems);  // Log cartItems, not setCartItems

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error parsing stored cart:", error);
      }
    }
  }, []);  // Initial load - setting cart items from localStorage

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));  // Updating localStorage whenever cartItems change
  }, [cartItems]);  // This will be triggered when cartItems change
  
  


  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("cart"); // Clear cart on logout
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Logo" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COURSES</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => {
            navigate("/collection");
            setShowSearch(true);
          }}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />
        <GoogleTranslator />
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="Profile"
          />
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-2 bg-slate-100 text-gray-500">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="Back"
            />
            <p>Back</p>
          </div>

          <NavLink
            className="py-2 pl-6 border"
            to="/"
            onClick={() => setVisible(false)}
          >
            HOME
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            to="/collection"
            onClick={() => setVisible(false)}
          >
            COLLECTION
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            to="/about"
            onClick={() => setVisible(false)}
          >
            ABOUT
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            to="/contact"
            onClick={() => setVisible(false)}
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
