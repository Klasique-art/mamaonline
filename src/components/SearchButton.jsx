import React from 'react'

const SearchButton = ({onClick}) => {
  return (
    <button type='button' className='bg-blue-gradient text-slate-800 w-[45px] h-[45px] rounded-full duration-300 hover:-translate-y-1 text-xl' onClick={onClick} aria-label='toggle search bar.'>
        <i className="fa-solid fa-magnifying-glass-dollar"></i>
    </button>
  )
}

export default SearchButton