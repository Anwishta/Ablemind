import express from 'express';
import { 
    placeOrder, 
    placeOrderStripe, 
    placeOrderRazorpay, 
    allOrders, 
    userOrders, 
    updateStatus, 
    verifyStripe
} from '../controllers/orderControllers.js';

import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const router = express.Router();

router.post('/list', adminAuth, allOrders);
router.post('/status', adminAuth, updateStatus);  // Fixed function reference

router.post('/place', authUser, placeOrder);
router.post('/stripe', authUser, placeOrderStripe);
router.post('/razorpay', authUser, placeOrderRazorpay);

router.post('/userorders', authUser, userOrders);

router.post('/verifyStripe', authUser, verifyStripe);

export default router;  // Fixed export
