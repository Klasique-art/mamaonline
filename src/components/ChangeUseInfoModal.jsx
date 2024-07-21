import React, { useState } from 'react';

const ChangeUseInfoModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10000000]">
      <form 
        className="bg-black-gradient p-6 rounded-md w-[90%] sm:w-[400px] flex flex-col gap-4 items-center shadow shadow-[rgba(255,255,255,.2)]"
        role="alert"
        onSubmit={handleSubmit}
      >
        <h2 className='text-lg sm:text-xl md:text-2xl text-gradient animate__animated animate__slideInDown'>Change User Information</h2>
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={formData.name} 
          onChange={handleChange} 
          className="w-full border-gradient rounded-[30px] py-1 px-4 bg-transparent text-white animate__animated animate__slideInDown"
          style={{animationDelay: '.2s'}}
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          className="w-full border-gradient rounded-[30px] py-1 px-4 bg-transparent text-white animate__animated animate__slideInDown"
          style={{animationDelay: '.4s'}}
        />
        <input 
          type="tel" 
          name="phone" 
          placeholder="Phone Number" 
          value={formData.phone} 
          onChange={handleChange} 
          className="w-full border-gradient rounded-[30px] py-1 px-4 bg-transparent text-white animate__animated animate__slideInDown"
          style={{animationDelay: '.6s'}}
        />
        <input 
          type="text" 
          name="address" 
          placeholder="Address" 
          value={formData.address} 
          onChange={handleChange} 
          className="w-full border-gradient rounded-[30px] py-1 px-4 bg-transparent text-white animate__animated animate__slideInDown"
          style={{animationDelay: '.8s'}}
        />
        <div className="flex gap-4 mt-4 animate__animated animate__slideInDown" style={{animationDelay: '1s'}}>
          <button type="submit" className="text-primary bg-blue-gradient rounded py-2 px-4 btn-glow">Submit</button>
          <button type="button" onClick={onClose} className="text-white bg-gray-600 rounded py-2 px-4">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ChangeUseInfoModal;
