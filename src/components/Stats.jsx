import React from 'react'

import Counter from './Counter'
import styles from '../config/styles'
import drone1 from '../assets/drone1.png'
import drone2 from '../assets/drone2.png'

const Stats = () => {
  return (
    <section role='region' className='py-4 sm:py-6 md:py-8'>
      <div className={`${styles.boxWidth} flex items-center justify-center gap-4 flex-wrap capitalize`}>
        <img src={drone1} alt="animated drone." className='w-24 fly_about_slow' draggable="false" />
        {/* stat card */}
        <div className="stat-card p-2 text-white rounded-md flex justify-center items-center flex-col gap-1 md:gap-2 text-lg sm:text-xl feedback-card">
          <p>over</p>
          <Counter targetNumber={20}/>
          <p>Trusted Shops</p>
        </div>
        {/* end of stat card */}
        {/* stat card */}
        <div className="stat-card p-2 text-white rounded-md flex justify-center items-center flex-col gap-1 md:gap-2 text-lg sm:text-xl feedback-card">
          <Counter targetNumber={800}/>
          <p>deliveries</p>
          <p>each month</p>
        </div>
        {/* end of stat card */}
        {/* stat card */}
        <div className="stat-card p-2 text-white rounded-md flex justify-center items-center flex-col gap-1 md:gap-2 text-lg sm:text-xl feedback-card">
          <p>over</p>
          <Counter targetNumber={20}/>
          <p>Shops</p>
        </div>
        {/* end of stat card */}
        <img src={drone2} alt="animated drone." className='w-24 fly_about_slow' draggable="false" />
      </div>
    </section>
  )
}

export default Stats