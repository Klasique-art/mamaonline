import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Footer } from '../components';
import styles from '../config/styles';

const PayWithMobileMoney = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { value } = e.target;

    // Ensuring only numbers are allowed
    const sanitizedValue = value.replace(/\D/g, '');
    setPhoneNumber(sanitizedValue);

    // Allow only 10 digits
    if (sanitizedValue.length > 10) {
      setPhoneNumber(sanitizedValue.slice(0, 10));
    }
  };

  const handlePay = () => {
    // Handle mobile money payment logic here
    alert("Payment successful! Order confirmed.");
    navigate('/order-success');
  };

  return (
    <div className='bg-primary w-full overflow-hidden relative'>
        <div className="absolute -right-1/2 top-0 w-1/2 h-1/2 white__gradient" />
        <div className="absolute -right-1/2 bottom-0 w-1/4 h-1/2 pink__gradient" />
        <div className={`bg-primary ${styles.flexStart} ${styles.paddingX}`}>
            <div className={`${styles.boxWidth} min-h-[100vh] flex items-center justify-center`}>
                <article>
                    <div className="article-wrapper text-white">
                        <div className="flex items-center justify-center flex-col">
                            <h2 className='text-gradient text-center mb-4 md:text-xl'>Pay with Mobile Money</h2>
                            <p className='text-white text-center mb-4 max-w-[600px] text-xs sm:text-sm md:text-base'>Please enter your mobile money number to complete your order. You will receive a prompt to enter your pin. If you didn't get any prompt, try:</p>
                            <ol className='text-white text-center mb-4 w-full p-2 rounded max-w-[600px] text-xs sm:text-sm md:text-base listing-ol'>
                                <li>Ensure you have enough balance</li>
                                <li>dial *170#</li>
                                <li>choose option 6 (My Wallet)</li>
                                <li>choose option 3 (My Approvals)</li>
                                <li>Enter your pin</li>
                            </ol>
                            <form onSubmit={handlePay} className='bg-black-gradient p-6 rounded-md w-[90%] sm:w-[400px] flex flex-col gap-4 items-center shadow shadow-[rgba(255,255,255,.2)] border-gradient'>
                                <input 
                                    type="tel" 
                                    placeholder="Mobile Phone Number" 
                                    value={phoneNumber} 
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
        <Footer />
    </div>

  );
};

export default PayWithMobileMoney;
