import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Footer } from '../components';
import styles from '../config/styles';

const PayWithCard = () => {
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ensuring only numbers are allowed
    if (name === 'number' || name === 'cvv') {
      const sanitizedValue = value.replace(/\D/g, ''); 
      setCardDetails({ ...cardDetails, [name]: sanitizedValue });
    } else if (name === 'expiry') {
      // Allow only numbers and format as MM/YY
      const sanitizedValue = value.replace(/\D/g, ''); 

      // Auto-format as MM/YY   
      let formattedValue = sanitizedValue;
      if (sanitizedValue.length > 2) {
        formattedValue = `${sanitizedValue.slice(0, 2)}/${sanitizedValue.slice(2, 4)}`;
      }
      setCardDetails({ ...cardDetails, [name]: formattedValue });
    } else {
      setCardDetails({ ...cardDetails, [name]: value });
    }
  };

  const handlePay = () => {
    
    alert("Payment successful! Order confirmed.");
    navigate('/order-success');
  };

  return (
    <div className='bg-primary w-full overflow-hidden relative'>
        <div className="absolute -left-1/2 top-0 w-1/2 h-1/2 white__gradient" />
        <div className="absolute -left-1/2 bottom-0 w-1/2 h-1/2 pink__gradient" />
        <div className={`bg-primary ${styles.flexStart} ${styles.paddingX}`}>
            <div className={`${styles.boxWidth} min-h-[100vh] flex items-center justify-center`}>
                <article>
                    <div className="article-wrapper">
                        <div className="payment-page">
                            <h2 className='text-gradient text-center mb-4'>Pay with Card</h2>
                            <p className='text-white text-center mb-4'>Please enter your card details to complete your order.</p>
                            <form onSubmit={handlePay} className='bg-black-gradient p-6 rounded-md w-[90%] sm:w-[400px] flex flex-col gap-4 items-center shadow shadow-[rgba(255,255,255,.2)] border-gradient'>
                                <input 
                                    type="text" 
                                    name="number" 
                                    placeholder="Card Number" 
                                    value={cardDetails.number} 
                                    onChange={handleInputChange} 
                                    required 
                                    className='w-full border-gradient rounded-[30px] py-1 px-4 bg-transparent text-white'
                                />
                                <input 
                                    type="text" 
                                    name="expiry" 
                                    placeholder="Expiry Date (MM/YY)" 
                                    value={cardDetails.expiry} 
                                    onChange={handleInputChange} 
                                    required 
                                    className='w-full border-gradient rounded-[30px] py-1 px-4 bg-transparent text-white'
                                />
                                <input 
                                    type="text" 
                                    name="cvv" 
                                    placeholder="CVV" 
                                    value={cardDetails.cvv} 
                                    maxLength={3}
                                    onChange={handleInputChange} 
                                    required 
                                    className='w-full border-gradient rounded-[30px] py-1 px-4 bg-transparent text-white'
                                />
                                <button type="submit" className='text-primary bg-blue-gradient rounded py-2 px-4 btn-glow'>Confirm Payment</button>
                            </form>
                        </div>
                    </div>
                </article>
            </div>
        </div>
        <Footer/>
    </div>
  );
};

export default PayWithCard;
