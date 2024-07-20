import React from 'react'

const MobileMoneyCard = ({phoneNumber, setPhoneNumber, handlePay}) => {

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
      
  return (
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
  )
}

export default MobileMoneyCard