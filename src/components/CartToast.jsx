import React from 'react'

const CartToast = ({isVisible}) => {
  return (
    <div role='alert' className={`fixed bottom-10 left-32 z-50 bg-blue-gradient shadow-lg shadow-[rgba(220,220,220,.2)] rounded-md duration-500 ease-out py-6 px-10 ${isVisible ? 'translate-x-0 visible': '-translate-x-[400%] invisible'}`}>
        <p className='text-slate-800 text-lg'>Item added to cart!</p>
    </div>
  )
}

export default CartToast