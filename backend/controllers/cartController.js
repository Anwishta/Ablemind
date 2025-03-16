import userModel from "../models/userModel.js";

// Add products to user cart
const addToCart = async (req, res) => {

    console.log('Request received at /api/cart/add');
    try {
      const { userId, itemId, size } = req.body;
      const userData = await userModel.findById(userId);
      let cartData = userData.cartData;
  
      if (cartData[itemId]) {
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1; // Increment quantity if item and size exist
        } else {
          cartData[itemId][size] = 1; // Set quantity to 1 if the size is not found
        }
      } else {
        cartData[itemId] = {};
        cartData[itemId][size] = 1; // Add the new item and size with quantity 1
      }
      await userModel.findByIdAndUpdate(userId, { cartData });
      // Save the updated cart data
      res.json({ success: true, message: "Item added to cart successfully" });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Error adding item to cart" });
    }
  };
  


// Update user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData ; // Ensure cartData is initialized

        

        cartData[itemId][size] = quantity; // Update quantity

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Cart updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating cart" });
    }
};

// Get user cart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;
        
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData ; // Ensure cartData is initialized
        
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };
