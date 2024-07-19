import React from 'react';
import { useNavigate } from 'react-router-dom';

const PayOnDelivery = () => {
  const navigate = useNavigate();

  const handlePay = () => {
    // Handle pay on delivery logic here
    alert("Order placed! Pay the delivery fee on delivery.");
    navigate('/order-success');
  };

  return (
    <div className="payment-page">
      <h1>Pay on Delivery</h1>
      <p>Please pay the delivery fee upon receiving your order.</p>
      <button onClick={handlePay}>Confirm</button>
    </div>
  );
};

export default PayOnDelivery;
