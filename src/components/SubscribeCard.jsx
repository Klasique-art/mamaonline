import React, {useState} from 'react'

import Toast from './Toast'

const SubscribeCard = () => {
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [toast, setToast] = useState(null);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(String(email).toLowerCase());
  }

  const handleChange = e => {
    const inputVal = e.target.value
    setEmail(inputVal.trim())
    setIsValid(validateEmail(inputVal.trim()) || inputVal === '');
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateEmail(email)) {
      console.log('Submitted email:', email);
      setEmail('');
      setToast({ message: 'Successfully subscribed!', type: 'success' });
    } else {
      setIsValid(false);
      setToast({ message: 'Please enter a valid email address', type: 'error' });
    }

  }

  return (
    <div className='w-full text-white flex items-center bg-black-gradient-2 py-10 px-8 md:py-16 md:px-10 rounded-lg flex-col md:flex-row gap-5 md:gap-10' data-aos="zoom-out">
      <div className="w-full md:w-1/2">
        <h2 className='text-gradient text-2xl sm:text-3xl md:text-4xl mb-2'>subscribe to our newsletter</h2>
        <p>Submit your email to keep up with the latest updates from us.</p>
      </div>
      <form action="#" className='w-full md:w-1/2 h-16' onSubmit={handleSubmit}>
        <input 
          type="text" 
          className='w-[70%] md:w-[80%] bg-transparent border-2 border-blue-300 rounded-l-[30px] py-2 px-4 text-lg md:text-xl h-full text-white' 
          placeholder='enter your email...' 
          value={email}
          onChange={handleChange}
        />
        <button type='submit' className='w-[30%] md:w-[20%] btn-glow bg-blue-gradient text-slate-900 h-full border-2 border-blue-300 rounded-r-[30px] text-lg md:text-xl'>Send</button>
        {!isValid && <p className="absolute text-red-400 text-sm mt-1" role='alert'>Please enter a valid email address</p>}
      </form>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default SubscribeCard