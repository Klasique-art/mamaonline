import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

const SideBarLinks = ({linkTo, children, label}) => {
  return (
    <li className='w-full h-14 flex items-center gap-2 bg-[rgba(51,187,207,.2)] overflow-hidden rounded-md px-[2px] item-glow-light focus:outline-none' tabIndex={0}>
        <Button
            linkTo={linkTo}
            styles="justify-center btn-glow"
            style={{
                width: 55,
                maxWidth: 55,
            }}
        >
            {children}
        </Button>
        <Link to={linkTo} className='text-white text-lg sm:text-2xl uppercase' tabIndex={-1}>{label}</Link>
    </li>
  )
}

export default SideBarLinks