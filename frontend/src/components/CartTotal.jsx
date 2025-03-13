import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div className="w-full">
      {/* Title Section */}
      <div className="text-2xl">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      {/* Totals Section */}
      <div className="flex flex-col gap-2 mt-2 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {getCartAmount()}.00
          </p>
        </div>

        <hr />

        {/* Shipping Fee */}
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {delivery_fee}.00
          </p>
        </div>

        <hr />

        {/* Total */}
        <div className="flex justify-between font-bold text-lg">
          <p>Total</p>
          <p>
            {currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
