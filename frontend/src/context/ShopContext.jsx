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
    const navigate = useNavigate();

    // ✅ Fixed: Removed size logic from addToCart
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

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            totalCount += cartItems[itemId]; // Count all items
        }
        return totalCount;
    };

    // ✅ Fixed: Removed size logic from updateQuantity
    const updateQuantity = (itemId, quantity) => {
        let cartData = { ...cartItems };
        if (quantity > 0) {
            cartData[itemId] = quantity; // Update quantity
        } else {
            delete cartData[itemId]; // Remove item if quantity is 0
        }
        setCartItems(cartData);
    };

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
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
