import React from 'react'

import styles from '../config/styles'
import logo1 from '../assets/logo1.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer role='contentinfo' className={`${styles.paddingX} bg-black`}>
      <div className="footer-wrapper text-white">
        <div className="flex items-start gap-5 flex-col md:flex-row pb-4">
          <div className="flex-1">
            <img src={logo1} alt="mama online logo." className='drop-shadow w-32 sm:w-40 mb-2' data-aos="fade-up" />
            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum non nobis aspernatur? Laborum, quod fugit?</p>
          </div>
          <ul className='flex-1'>
            <h4 className='uppercase text-gradient'>useful links</h4>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/">home</Link>
            </li>
          </ul>
          <ul className='flex-1'>
            <h4 className='uppercase text-gradient'>resources</h4>
            <li>
              <Link to="/">FAQ</Link>
            </li>
            <li>
              <Link to="/">Terms and conditions</Link>
            </li>
            <li>
              <Link to="/">Privacy policy</Link>
            </li>
          </ul>
        </div>
        <div className="border-t border-[rgba(255,255,255,.3)] flex items-center justify-between pt-6 flex-col sm:flex-row">
          <p className='text-gray-400 text-[12px] md:text-[14px]'>Copyright &copy; 2024 Mamaonline | all rights reserved.</p>
          <div className="p-2">
            <a href="#" className='p-1 ml-1 text-gradient text-xl' aria-label='twitter-x link'>
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="#" className='p-1 ml-1 text-gradient text-xl' aria-label='facebook link'>
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className='p-1 ml-1 text-gradient text-xl' aria-label='youtube link'>
              <i class="fa-brands fa-square-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer