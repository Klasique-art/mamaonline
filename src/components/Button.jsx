import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({styles, title, children, linkTo, onClick, ...otherProps}) => {
  return (
    <Link to={linkTo} className={`py-4 px-6 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles} capitalize flex items-center gap-2 btn-glow max-w-[max-content]`} aria-label={title} onClick={onClick} {...otherProps}>
    {children}
    {title}
  </Link>
  )
}

export default Button