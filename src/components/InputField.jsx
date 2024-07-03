import React from 'react'

const InputField = ({ariaLabel,icon, placeholder, label="input_field", onIconClick, ...otherProps}) => {
  return (
    <label htmlFor={label} className='w-full md:w-96 h-12 flex items-center border-gradient rounded-[30px] relative'>
        <span className='absolute bottom-full right-1/2 translate-x-1/2 text-slate-800 rounded-t px-2 py-1 bg-blue-gradient text-[10px]'>{label}</span>
        <input 
            type="text" 
            className={`h-full bg-transparent text-white rounded-l-[30px] px-4 ${icon ? 'w-[80%]' : 'w-full rounded-r-[30px]'}`} 
            placeholder={placeholder}
            id={label}
            {...otherProps}
        />
        {icon && <button className={`bg-blue-gradient h-full ${icon ? 'w-[20%] rounded-r-[30px]' : ''} flex-center md:text-xl btn-glow`} onClick={onIconClick} aria-label={ariaLabel}>
            <i className={`fa-solid fa-${icon}`}></i>
        </button>}
    </label>
  )
}

export default InputField