import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { Footer, MobileMoneyCard } from '../components';
import { formatNumber } from '../utils/utils';
import styles from '../config/styles';

const PayWithMobileMoney = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  // getting orderDetails from sessionStorage
  const orderDetails = JSON.parse(sessionStorage.getItem('orderDetails'));

  const totalAmount = orderDetails?.totalAmount;

  const handlePay = () => {
    // Handle mobile money payment logic here
    console.log(phoneNumber)
    // navigate('/order-success');
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
                            <p className='text-white text-center mb-4 max-w-[600px] text-xs sm:text-sm md:text-base'>Please enter your mobile money number to complete your order <br /> <span className='text-cyan-500'>(ghc {formatNumber(totalAmount)})</span>. You will receive a prompt to enter your pin. If you didn't get any prompt, try:</p>
                            <ol className='text-white text-center mb-4 w-full p-2 rounded max-w-[600px] text-xs sm:text-sm md:text-base listing-ol'>
                                <li>Ensure you have enough balance</li>
                                <li>dial *170#</li>
                                <li>choose option 6 (My Wallet)</li>
                                <li>choose option 3 (My Approvals)</li>
                                <li>Enter your pin</li>
                            </ol>
                            <MobileMoneyCard
                                handlePay={handlePay}
                                phoneNumber={phoneNumber}
                                setPhoneNumber={setPhoneNumber}
                            />
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
