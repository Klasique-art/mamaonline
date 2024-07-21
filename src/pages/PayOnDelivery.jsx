import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { Footer, MobileMoneyCard } from '../components';
import styles from '../config/styles';
import { formatNumber } from '../utils/utils';

const PayOnDelivery = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');

  // getting orderDetails from sessionStorage
  const orderDetails = JSON.parse(sessionStorage.getItem('orderDetails'));
  const {products} = orderDetails
  const totalAmount = products[products?.length - 1]?.grandTotal;

  const handlePay = (e) => {
    e.preventDefault();
    console.log(phoneNumber)
    setPhoneNumber('')
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
                            <h2 className='text-gradient text-center mb-4 md:text-xl'>Pay on Delivery</h2>
                            <p className='text-white text-center mb-4 max-w-[600px] text-xs sm:text-sm md:text-base'>Please note that you are required to pay the delivery fee <span className='text-cyan-500'>(ghc 10)</span> via mobile money. You need to pay for the product <span className='text-cyan-500'>(ghc {formatNumber(totalAmount)})</span> on delivery. Click the button below to confirm your order.</p>
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

export default PayOnDelivery;
