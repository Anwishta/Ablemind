import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "$";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState("");
    
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

      setCartItems(cartData);
      if (token) {
        try {
            await axios.post(
                backendUrl + "/api/cart/add",
                { itemId, size },
                { headers: { token } } // Directly passing the token in headers
            );
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    
      
  };
  
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = cartData[itemId] || {};
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
        try {
            await axios.post(
                backendUrl + "/api/cart/update",
                { itemId, size, quantity },
                { headers: { token } }
            );
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
}; // ✅ Closing bracket added


    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const size in cartItems[items]) {
                totalCount += cartItems[items][size] || 0;
            }
        }
        return totalCount;
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            let itemInfo = products.find((product) => product._id === itemId);
            if (!itemInfo) continue;

            for (const size in cartItems[itemId]) {
                totalAmount += itemInfo.price * (cartItems[itemId][size] || 0);
            }
        }
        return totalAmount;
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/product/list");
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };



    useEffect(() => {
        getProductsData();
    }, []);

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(
                backendUrl + "/api/cart/get",
                {}, // Fixed empty object for POST request body
                { headers: { token } } // Properly closed headers object
            );
    
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
    

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            getUserCart(storedToken);
        }
    }, []);
    
    

    

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems, 
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token,
        getUserCart
        
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
