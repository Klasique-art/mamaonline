import React, { useState } from 'react';

const PaymentModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10000000] ">
        <div className="bg-black-gradient p-6 rounded-md w-[90%] sm:w-[400px] flex flex-col gap-4 items-center shadow shadow-[rgba(255,255,255,.2)]" role='alert'>
            <h2 className='text-lg sm:text-xl md:text-2xl text-gradient animate__animated animate__slideInDown'>Choose Payment Method</h2>
            <button 
                onClick={() => onConfirm('Pay on Delivery')} 
                className="text-primary bg-blue-gradient rounded py-2 px-4 btn-glow animate__animated animate__slideInDown"
                style={{animationDelay: '.2s'}}
            ><i class="fa-solid fa-sack-dollar mr-2"></i> Pay on Delivery</button>
            <button 
                onClick={() => onConfirm('Pay with Card')} 
                className="text-primary bg-blue-gradient rounded py-2 px-4 btn-glow animate__animated animate__slideInDown"
                style={{animationDelay: '.4s'}}
            ><i className="fas fa-credit-card mr-2" aria-hidden="true"></i> Pay with Card</button>
            <button 
                onClick={() => onConfirm('Pay with Mobile Money')} 
                className="text-primary bg-blue-gradient rounded py-2 px-4 btn-glow animate__animated animate__slideInDown"
                style={{animationDelay: '.6s'}}
            ><i class="fa-solid fa-money-bill-wave mr-2"></i> Pay with Mobile Money</button>
            <button 
                onClick={onClose} 
                className="text-white bg-gray-600 rounded py-2 px-4 animate__animated animate__slideInDown"
                style={{animationDelay: '.8s'}}
            >Cancel</button>
        </div>
    </div>

  );
};

export default PaymentModal;
