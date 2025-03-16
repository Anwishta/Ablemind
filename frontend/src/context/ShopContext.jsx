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

    // ✅ Add item to cart
    const addToCart = async (itemId) => {
        let cartData = { ...cartItems }; // Clone current cart items

        if (cartData[itemId]) {
            cartData[itemId] += 1; // Increment quantity for existing item
        } else {
            cartData[itemId] = 1; // Initialize quantity for new item
        }

        setCartItems(cartData); // Update state with the modified cart data
        toast.success("Item added to cart!"); // Show success toast
    };

    // ✅ Get total cart count
    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            totalCount += cartItems[itemId]; // Count all items
        }
        return totalCount;
    };

    // ✅ Update quantity of a cart item
    const updateQuantity = async (itemId, quantity) => {
        let cartData = { ...cartItems };
        
        if (quantity <= 0) {
            delete cartData[itemId]; // Remove item if quantity is 0
        } else {
            cartData[itemId] = quantity;
        }

        setCartItems(cartData);
    };

    // ✅ Calculate total cart amount
    const getCartAmount = () => {
        let totalAmount = 0;

        for (const itemId in cartItems) {
            let itemInfo = products.find((product) => product._id === itemId);
            
            if (itemInfo) {
                totalAmount += itemInfo.price * cartItems[itemId];
            }
        }
        return totalAmount;
    };

    // ✅ Provide values to the context
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
        backendUrl,
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