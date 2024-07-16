import React, {createContext, useContext, useEffect, useState} from 'react'

const CartItemsContext = createContext()

const CartItemsProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : [];
      })

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
          // Check if the product is already in the cart
          const existingProduct = prevItems.find((item) => item.id === product.id);
          if (existingProduct) {
            // If the product is already in the cart, update its quantity
            return prevItems.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
          } else {
            // If the product is not in the cart, add it with a quantity of 1
            return [...prevItems, { ...product, quantity: 1 }];
          }
        });
    };

     // Function to change the quantity of a product in the cart
    const changeQuantity = (productId, quantity) => {
        setCartItems((prevItems) => {
        return prevItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item
        );
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => {
          const updatedItems = prevItems.filter((item) => item.id !== productId);
          localStorage.setItem('cartItems', JSON.stringify(updatedItems));
          return updatedItems;
        });
    };

  return (
    <CartItemsContext.Provider value={{cartItems, addToCart, removeFromCart, changeQuantity}}>
      {children}
    </CartItemsContext.Provider>
  )
}

export const useCartItems = () => {
    const context = useContext(CartItemsContext)
    if (!context) {
        throw new Error('useCartItems must be used within a CartItemsProvider')
    }
    return context
}

export default CartItemsProvider