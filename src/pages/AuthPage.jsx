import React, {useState, useEffect} from 'react'

// custom imports
import styles from '../config/styles'
import {SignUpForm, LoginForm, Footer, Navbar} from '../components'

const AuthPage = () => {
  const [showLoginFrom, setShowLoginForm] = useState(true)

  const toggleForms = () => {
    setShowLoginForm(prev => !prev)
    scrollToTop()
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }
  // scroll to top on page load
  useEffect(() => {
    scrollToTop()
  }, [])

  return (
    <div className='bg-primary w-full overflow-hidden'>
      {/* navbar */}
      <div className={`${styles.paddingX} ${styles.flexCenter} z-[999]`}>
        <div className={`${styles.boxWidth} z-[999]`}>
          <Navbar/>
t        </div>
      </div>
      {/* end of navbar */}
      <article role='region' className="relative">
        <div className="absolute -left-1/2 top-0 w-1/2 h-1/2 white__gradient" />
        <div className="absolute -left-1/2 bottom-0 w-1/2 h-1/2 pink__gradient" />
        <div className="article-wrapper flex items-center justify-center min-h-[50vh]">
          <div className="w-full sm:w-[28rem] border-gradient p-2 flex-center flex-col rounded-lg">
            {showLoginFrom ? <LoginForm /> : <SignUpForm />}
            <div 
              className="text-white w-full text-center bg-black-gradient-2 p-2 rounded-md animate__animated animate__bounceInDown"
              style={{
                animationDelay: '0.6s'
              }}
            >
              <p className="text-sm">{showLoginFrom ? 'New here?': "Already a member?"}</p>
              <button className="bg-blue-gradient py-1 px-2 text-slate-800 rounded-lg mt-2" onClick={toggleForms}>{showLoginFrom ? 'Sign up': 'Login'}</button>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  )
}

export default AuthPage