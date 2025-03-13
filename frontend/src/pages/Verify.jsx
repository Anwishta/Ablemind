import { useSearchParams } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext'; // Ensure this import matches your project structure


const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderid');

  const verifyPayment = async () => {
    try {
      if (!token) return;

      const response = await axios.post(`${backendUrl}/api/order/verifyStripe`, { orderId, success }, {headers: { token }});

      if (response.data.success) {
        setCartItems({});
        navigate('/orders');
      } else {
        navigate('/cart');
      }
    } catch (error) {
      console.log(error);
      toast.error('Payment verification failed');
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]); // Runs only when `token` changes

  return null; // No UI rendering needed
};

export default Verify;


