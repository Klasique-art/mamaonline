import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

// custom imports
import styles from '../config/styles'
import { SignUpForm, LoginForm, Footer, Navbar } from '../components'
import users from '../api/users' // failed
import categories from '../api/categories'
import orders from '../api/orders' // failed
import reviews from '../api/reviews'
import register from '../api/register'

const AuthPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(true)
  const location = useLocation()

  const toggleForms = () => {
    setShowLoginForm(prev => !prev)
    scrollToTop()
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  const testEndpoint = async () => {
    try {
      const response = await register.resister('felix', 'feboapong@gmail.com', 'Klasique1', 'Klasique1' )
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    testEndpoint()
  }, [])

  // scroll to top on page load
  useEffect(() => {
    scrollToTop()
  }, [])

  const renderAuthContent = () => {
    if (location.pathname === '/auth/forgot-password') {
      return <Outlet />
    }

    return (
      <article role='region' className="relative">
        <div className="absolute -left-1/2 top-0 w-1/2 h-1/2 white__gradient" />
        <div className="absolute -left-1/2 bottom-0 w-1/2 h-1/2 pink__gradient" />
        <div className="article-wrapper flex items-center justify-center min-h-[50vh]">
          <div className="w-full sm:w-[28rem] border-gradient p-2 flex-center flex-col rounded-lg">
            {showLoginForm ? <LoginForm /> : <SignUpForm />}
            <div 
              className="text-white w-full text-center bg-black-gradient-2 p-2 rounded-md animate__animated animate__bounceInDown"
              style={{
                animationDelay: '0.6s'
              }}
            >
              <p className="text-sm">{showLoginForm ? 'New here?': "Already a member?"}</p>
              <button className="bg-blue-gradient py-1 px-2 text-slate-800 rounded-lg mt-2" onClick={toggleForms}>{showLoginForm ? 'Sign up': 'Login'}</button>
            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    <div className='bg-primary w-full overflow-hidden'>
      {/* navbar */}
      <div className={`${styles.paddingX} ${styles.flexCenter} z-[999]`}>
        <div className={`${styles.boxWidth} z-[999]`}>
          <Navbar/>
        </div>
      </div>
      {/* end of navbar */}
      {renderAuthContent()}
      <Footer />
    </div>
  )
}

export default AuthPage