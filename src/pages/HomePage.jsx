import React from 'react'

// custom imports
import styles from '../config/styles'
import { Navbar, Hero } from '../components'

const HomePage = () => {
  return (
    // div to wrap the entire page
    <div className='bg-primary w-full overflow-hidden'>
      {/* navbar */}
      <div className={`${styles.paddingX} ${styles.flexCenter} z-[999]`}>
        <div className={`${styles.boxWidth} z-[999]`}>
          <Navbar/>
        </div>
      </div>
      {/* end of navbar */}

      {/* welcome hero section */}
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>
      {/* end of welcome hero section */}

      {/* rest of app */}
      <div className={`bg-primary ${styles.flexStart} ${styles.paddingX}`}>
        <div className={`${styles.boxWidth}`}>
          Stats
          Business
          Billing
          carddeal
          testimonials
          clients
          cta
          footer
        </div>
      </div>
      {/* end of rest of app */}
      
    </div>
    // end of div to wrap the entire page
  )
}

export default HomePage