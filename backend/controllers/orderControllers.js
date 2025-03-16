// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js"; // Added missing import for userModel
// import Stripe from 'stripe'; // Added missing import for Stripe

// const currency = "inr"; 
// const deliveryCharge = 10;

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Added missing Stripe secret key



// // Placing orders using COD Method
// const placeOrder = async (req, res) => {
//     try {
//         const { userId, items, amount, address } = req.body;

//         if (!userId || !items || !amount || !address) {
//             return res.status(400).json({ success: false, message: "All fields are required" });
//         }

//         const orderData = {
//             userId,
//             items,
//             address,
//             amount,
//             paymentMethod: "COD",
//             payment: false,
//             date: Date.now()
//         };

//         const newOrder = new orderModel(orderData);
//         await newOrder.save();

//         await userModel.findByIdAndUpdate(userId, { cartData:{} });

//         res.status(201).json({ success: true, message: "Order placed successfully", order: newOrder });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, error: "Internal Server Error" });
//     }
// };

// // Placing orders using Stripe Method
// const placeOrderStripe = async (req, res) => {
//   try {
//     const { userId, items, amount, address } = req.body;
//     const { origin } = req.headers;

//     if (!userId || !items || !amount || !address) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     // Create Stripe line items
//     const line_items = items.map((item) => ({
//       price_data: {
//         currency: "usd",
//         product_data: { name: item.name },
//         unit_amount: item.price * 100, // Convert price to cents
//       },
//       quantity: item.quantity,
//     }));

//     // Add delivery charge
//     const deliveryCharge = 500; // Set delivery charge
//     line_items.push({
//       price_data: {
//         currency: "usd",
//         product_data: { name: "Delivery Charges" },
//         unit_amount: deliveryCharge * 100,
//       },
//       quantity: 1,
//     });

//     // Create Stripe Checkout Session
//     const session = await stripe.checkout.sessions.create({
//       success_url: `${origin}/verify?success=true&userId=${userId}&items=${encodeURIComponent(
//         JSON.stringify(items)
//       )}&amount=${amount}&address=${encodeURIComponent(address)}`,
//       cancel_url: `${origin}/verify?success=false`,
//       line_items,
//       mode: "payment",
//     });

//     res.json({ success: true, session_url: session.url });
//   } catch (error) {
//     console.error("Stripe Order Error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const verifyStripe = async (req, res) => {
//   const { success, userId, items, amount, address } = req.body;

//   try {
//     if (success === "true") {
//       const orderData = {
//         userId,
//         items: JSON.parse(items), // Decode items
//         address,
//         amount,
//         paymentMethod: "Stripe",
//         payment: true,
//         date: Date.now(),
//       };

//       const newOrder = new orderModel(orderData);
//       await newOrder.save();

//       await userModel.findByIdAndUpdate(userId, { $set: { cartData: {} } });

//       res.json({ success: true });
//     } else {
//       res.json({ success: false });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };


// // Placing orders using Razorpay Method
// const placeOrderRazorpay = async (req, res) => {
//     try {
//         // Your logic for placing an order using Razorpay
//         res.status(200).json({ success: true, message: "Order placed successfully (Razorpay)" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, error: "Internal Server Error" });
//     }
// };


//   // All Orders data for Admin Panel
//   const allOrders = async (req, res) => {
//     try {
//       const orders = await orderModel.find({}); // Fixed incorrect syntax
//       res.json({ success: true, orders });
//     } catch (error) {
//       console.log("Error fetching orders:", error);
//       res.json({ success: false, message: error.message }); // Fixed incorrect response formatting
//     }
//   };
  

//  // user orders data for frontend
//  const userOrders = async (req, res) => {
//   try {
//       const { userId } = req.body; // Corrected variable extraction
//       const orders = await orderModel.find({ userId }); // Fixed incorrect variable reference

//       res.json({ success: true, orders });
//   } catch (error) {
//       console.log(error);
//       res.json({ success: false, message: error.message }); // Corrected error message extraction
//   }
// };


// // Update order status for Admin Panel
// const updateStatus = async (req, res) => {
//   try {
//     const { orderId, status } = req.body;
    
//     await orderModel.findByIdAndUpdate(orderId, { status });

//     res.json({ success: true, message: "Status Updated" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

  
//   export { verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus };
  

