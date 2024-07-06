import React from 'react'

import pic1 from '../assets/pic1.png'
import Button from './Button'
import SideBarLinks from './SideBarLinks'

const Sidebar = ({ toggleSidebar, userImgStyle, ...otherProps }) => {
  return (
    <nav role='navigation' {...otherProps}>
      <button 
        onClick={toggleSidebar}
        className="absolute top-4 right-4 sm:hidden btn-glow bg-blue-gradient py-2 px-4 text-xl text-red-500"
        aria-label='close sidebar'
      >
        <i className="fas fa-times"></i>
      </button>
      <div className="p-2">
        {/* user image */}
        <div className={userImgStyle}>
            <img src={pic1} alt="user." className='w-full h-full object-cover' />
        </div>
        {/* end of user image */}
        <ul className='flex flex-col gap-2'>
          <SideBarLinks label="home" linkTo="/">
            <i className="fas fa-home"></i>
          </SideBarLinks>
          <SideBarLinks label="our services" linkTo="/services">
            <i class="fa-solid fa-briefcase"></i>
          </SideBarLinks>
          <SideBarLinks label="FAQ" linkTo="/faq">
            <i class="fa-solid fa-question"></i>
          </SideBarLinks>
        </ul>
      </div>
    </nav>
  )
}

export default Sidebar