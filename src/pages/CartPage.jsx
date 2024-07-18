import React, { useEffect } from 'react';

// custom imports
import { formatNumber } from '../utils/utils';
import { Navbar, Footer, Button } from '../components';
import styles from '../config/styles';
import {useCartItems} from '../context/CartItemsProvider'

const CartPage = () => {
  const { cartItems, removeFromCart, changeQuantity} = useCartItems();

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      changeQuantity(id, quantity);
    }
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id)
  };

  const cartItemsWithTotal = cartItems.map(item => ({
    ...item,
    totalPrice: item.discounted_price * item.quantity
  }));

  const grandTotal = cartItemsWithTotal.reduce((acc, item) => acc + item.discounted_price * item.quantity, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-primary w-full overflow-hidden relative">
      {/* navbar */}
      <div className={`${styles.paddingX} ${styles.flexCenter} z-[999]`}>
        <div className={`${styles.boxWidth} z-[999]`}>
          <Navbar />
        </div>
      </div>
      {/* end of navbar */}
      <main role='main' className='min-h-screen'>
        <div className={`bg-primary ${styles.flexStart} ${styles.paddingX}`}>
          <div className={`${styles.boxWidth}`}>
            <div className="container mx-auto p-4 relative">
            <div className="absolute -right-1/2 top-0 w-1/2 h-1/2 white__gradient"></div>
            <div className="absolute -right-1/2 bottom-0 w-1/2 h-1/2 pink__gradient"></div>
                <h1 className="text-2xl font-bold mb-4 text-center text-gradient">Your Cart</h1>
                {cartItemsWithTotal.length === 0 ? (
                  <p className="text-center text-white">Your cart is empty.</p>
                ) : (
                  <div>
                    <ul className="space-y-4 text-white">
                      {cartItemsWithTotal.map((item) => (
                        <li 
                          key={item.id} 
                          className="flex items-center justify-between border-gradient p-4 rounded shadow" 
                          data-aos="fade-up"
                          data-aos-delay={item.id * 100}
                        >
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1 ml-4">
                            <h2 className="text-xl font-semibold">{item.name}</h2>
                            <p className="text-gray-300">GHC {formatNumber(item.totalPrice)}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="px-2 py-1 rounded btn-glow bg-blue-gradient"
                              >
                                <i className="fas fa-minus text-slate-800"></i>
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="px-2 py-1 rounded btn-glow bg-blue-gradient"
                              >
                                <i className="fas fa-plus text-slate-800"></i>
                              </button>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleRemoveItem(item.id)}
                            title="Remove"
                          />
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-right flex flex-col justify-end">
                      <p className="text-xl font-semibold mb-10 text-white" role='alert'>Total: GHC {formatNumber(grandTotal)}</p>
                      <Button
                        state={{ products: [...cartItemsWithTotal, {grandTotal}] }}
                        linkTo="/order"
                        title="Order Now"
                        styles="ml-auto"
                      />
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
   
  );
};

export default CartPage;
