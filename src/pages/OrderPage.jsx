import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Footer, Button, PaymentModal } from '../components';
import styles from '../config/styles';
import { formatNumber } from '../utils/utils';

const OrderPage = () => {
  const location = useLocation();
  const { products } = location.state || {products: []};
  console.log(products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const grandTotal = products[products?.length - 1]?.grandTotal;
  const singleItemGrandTotal = products?.map(product => product.totalPrice);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmOrder = (paymentMethod) => {
    const orderDetails = {
      products,
      grandTotal,
      deliveryFee: 10,
      totalAmount: Number(grandTotal || singleItemGrandTotal) + 10
    };

    sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    setIsModalOpen(false);
    switch (paymentMethod) {
      case 'Pay on Delivery':
        navigate('/pay-on-delivery');
        break;
      case 'Pay with Card':
        navigate('/pay-with-card');
        break;
      case 'Pay with Mobile Money':
        navigate('/pay-with-mobile-money');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-primary w-full overflow-hidden relative">
      {/* navbar */}
      <div className={`${styles.paddingX} ${styles.flexCenter} z-[999]`}>
        <div className={`${styles.boxWidth} z-[999]`}>
          <Navbar />
        </div>
      </div>
      {/* end of navbar */}
      <main role='main' className=''>
        <div className={`bg-primary ${styles.flexStart} ${styles.paddingX}`}>
          <div className={`${styles.boxWidth}`}>
            <article role='region'>
              <div className="article-wrapper text-white">
                <div className="">
                  {/* order details */}
                  <div className="">
                    <h2 className="text-xl sm:text-2xl md:text-3xl text-gradient mb-4">Order Summary</h2>
                    {products?.map(product => {
                      return (
                        product?.id &&(
                          <div className="bg-cyan-700 py-4 px-6 rounded-md mb-4 flex flex-col sm:flex-row items-center justify-between" key={product?.id}>
                            <div className="">
                              <h3 className="text-lg mb-2">{product?.name}</h3>
                              <h3 className="text-sm md:text-lg mb-2">Seller: {product?.seller?.username || product?.seller}</h3>
                              <p className="text-sm md:text-lg mb-2">Quantity: {product?.quantity}</p>
                              <p className="text-sm md:text-lg mb-2">Price per item: Ghc {formatNumber(Number(product?.discounted_price))}</p>
                              <p className="text-sm md:text-lg mb-2">Total price: Ghc {formatNumber(Number(product?.totalPrice))}</p>
                            </div>
                            <figure className='bg-slate-800 rounded-md overflow-hidden'>
                              <img src={product?.images[0].image} alt={product?.name} className="w-32 h-32 object-contain rounded-md" />
                            </figure>
                          </div>
                        )
                    
                    )})}
                  </div>
                  {/* end of order details */}
                  {/* user details */}
                  <div className="">
                    <h2 className="text-xl sm:text-2xl md:text-3xl text-gradient mb-4">User Details</h2>
                    <div className="bg-cyan-600 py-4 px-6 rounded-md mb-4">
                      <p className="text-sm mb-2">Name: John Doe</p>
                      <p className="text-sm mb-2">Email: fe@gna.co</p>
                      <p className="text-sm mb-2">Phone: 024 123 4567</p>
                      <p className="text-sm mb-2">Address: 123, Accra, Ghana</p>
                    </div>
                  </div>
                  {/* end of user details */}
                  {/* amounts calculation with delivery fee */}
                  <h2 className="text-xl sm:text-2xl md:text-3xl text-gradient mb-4">Amount details</h2>
                  <div className="bg-cyan-700 py-4 px-6 rounded-md mb-4">
                    <p className="text-sm md:text-lg mb-2">Subtotal: Ghc {formatNumber(Number(grandTotal || singleItemGrandTotal))}</p>
                    <p className="text-sm md:text-lg mb-2">Delivery fee: Ghc {formatNumber(Number(10))}</p>
                    <p className="text-sm md:text-lg mb-2">Total: Ghc {formatNumber(Number(grandTotal || singleItemGrandTotal) + 10)}</p>
                  </div>
                </div>
                <button onClick={handleOpenModal} className='text-primary bg-blue-gradient rounded py-2 px-4 btn-glow'>Confirm Order</button>
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
      {/* modal */}
      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onConfirm={handleConfirmOrder} 
      />
    </div>
  );
}

export default OrderPage;
