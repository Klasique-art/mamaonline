import React, {useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import 'animate.css'

// custom imports
import logo1 from '../assets/logo1.png'
import SearchButton from './SearchButton'
import SearchInput from './SearchInput'

const Navbar = () => {
  const [mobileNavToggle, setMobileNavToggle] = useState(false)
  const [fixedNav, setFixedNav] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(false)

  const mobileNavMenuRef = useRef(null)

  const handleScrollNav = () => {
    if(window.scrollY > 100) {
      setFixedNav(true)
      setShowSearchBar(false)

      mobileNavMenuRef.current.classList.remove('mobile-nav-active')
      mobileNavMenuRef.current.classList.add('mobile-nav-inactive')

      setMobileNavToggle(false)
    } else {
      setFixedNav(false)
    }
  }

  // handle scroll event
  useEffect(() => {
    window.addEventListener('scroll', handleScrollNav);

    return () => {
      window.removeEventListener('scroll', handleScrollNav);
    };
  }, []);

  return (
    <nav role='navigation' className={`w-full flex py-2 justify-between items-center navbar z-[99999] duration-300 ${fixedNav ? 'nav-fixed' : ''}`}>
      <Link to="/" className='animate__animated animate__bounceInDown'>
        <img src={logo1} alt="mama online logo" className='w-[100px] drop-shadow ' />
      </Link>
      {/* nav list */}
      <ul className='hidden sm:flex justify-end items-center flex-1 gap-4'>
        <li>
          <Link
            to='/' 
            className='text-white text-[1.1rem]'
          >home</Link>
        </li>
        <li>
          <Link 
            to='/services' 
            className='text-white text-[1.1rem]'
          >services</Link>
        </li>
        <li>
            <Link 
              to='/auth'
              className='text-white text-[1.1rem]'
            >Login</Link>
        </li>
        <li>
          <SearchButton 
            onClick={() => setShowSearchBar(prev => !prev)}
          />
        </li>
      </ul>
      {/* end of nav */}
      {/* mobile nav */}
      <button 
        className='sm:hidden flex flex-1 justify-end items-center relative' 
        onClick={() => setMobileNavToggle(prev => !prev)}
        aria-label={mobileNavToggle ? 'close mobile nav' : 'open mobile nav'}
      >
        {mobileNavToggle ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        ) }
        
        <ul 
          className={`absolute right-0 top-[180%] p-5 bg-black-gradient rounded-lg w-1/2 min-h-32 flex items-center justify-center flex-col gap-3 duration-500 ${mobileNavToggle ? 'mobile-nav-active' : 'mobile-nav-inactive'}`}
          ref={mobileNavMenuRef}
        >
          <li>
            <Link 
              to='/'
              className='text-white text-[1.1rem]'
            >home</Link>
          </li>
          <li>
            <Link 
              to='/services'
              className='text-white text-[1.1rem]'
            >services</Link>
          </li>
          <li>
            <Link 
              to='/auth'
              className='text-white text-[1.1rem]'
            >Login</Link>
          </li>
          <li>
            <SearchButton 
              onClick={() => setShowSearchBar(prev => !prev)}
            />
          </li>
        </ul>
      </button>
      {/* end of mobile nav */}

      {/* search input field */}
      <SearchInput 
        styles={`fixed top-[8rem] right-1/2 -translate-x-1/2 ${showSearchBar ? 'search-active' : 'search-inactive'}`}
      />
      {/* end of search input field */}
    </nav>
  )
} 

export default Navbar