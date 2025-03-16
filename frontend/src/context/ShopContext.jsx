import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "$";
    const delivery_fee = 10;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(localStorage.getItem("token") || ""); // Token management
    const backendUrl = "http://localhost:8000"; // ✅ Define backend URL
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size){
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems); // Clone current cart items

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1; // Increment quantity for existing size
            } else {
                cartData[itemId][size] = 1; // Initialize quantity for new size
            }
        } else {
            cartData[itemId] = {}; // Initialize item object
            cartData[itemId][size] = 1; // Set quantity for the first size
        }

        setCartItems(cartData); // Update state with the modified cart data
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
          for (const item in cartItems[items]) {
            try {
              if (cartItems[items][item] > 0) {
                totalCount += cartItems[items][item];
              }
            } catch (error) {
              console.error("Error calculating cart count:", error);
            }
          }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    };

    const getCartAmount =  () => {
        let totalAmount = 0;

        for (const items in cartItems) {
          let itemInfo = products.find((product) => product._id === items);

          for (const item in cartItems[items]) {
            try {
              if (cartItems[items][item] > 0) {
                totalAmount += itemInfo.price * cartItems[items][item];
              }
            } catch (error) {
              console.error("Error calculating cart amount:", error);
            }
          }
        }
        return totalAmount;
    };

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl, // ✅ Add backend URL here
        token,
        setToken
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
