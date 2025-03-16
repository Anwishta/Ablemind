import { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import GoogleTranslator from "./GoogleTranslator";
import FontSizeAdjuster from "./FontSizeAdjuster";
import SlideButton from "./SlideButton";

const Navbar = ({ toggleCursor }) => {
  const [visible, setVisible] = useState(false);
  const [isCursorEnabled, setIsCursorEnabled] = useState(false);
  const navigate = useNavigate();
  const { setShowSearch, getCartCount, token, setToken, cartItems, setCartItems } = useContext(ShopContext);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error parsing stored cart:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    setToken("");
    setCartItems({});
  };

  const handleCursorToggle = () => {
    setIsCursorEnabled(!isCursorEnabled);
    toggleCursor(!isCursorEnabled);
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Logo" aria-label="Website Logo" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COURSES</p>
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
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
          alt="Search Icon"
          aria-label="Search Icon"
        />

        <GoogleTranslator />
        <FontSizeAdjuster />

        {/* 🔹 Slider Cursor Toggle Button */}
        <SlideButton onToggle={handleCursorToggle} />


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
          <img
            src={assets.cart_icon}
            className="w-5 min-w-5 cursor-pointer"
            alt="Cart Icon"
            aria-label="Cart Icon"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Button */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu Icon"
          aria-label="Menu Icon"
        />
      </div>

      {/* Mobile Sidebar */}
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
              alt="Back Icon"
              aria-label="Back Icon"
            />
            <p>Back</p>
          </div>

          <NavLink className="py-2 pl-6 border" to="/" onClick={() => setVisible(false)}>
            HOME
          </NavLink>
          <NavLink className="py-2 pl-6 border" to="/collection" onClick={() => setVisible(false)}>
            COURSES
          </NavLink>
          <NavLink className="py-2 pl-6 border" to="/about" onClick={() => setVisible(false)}>
            ABOUT
          </NavLink>
          <NavLink className="py-2 pl-6 border" to="/contact" onClick={() => setVisible(false)}>
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
