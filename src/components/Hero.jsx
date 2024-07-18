import React from 'react'
import 'animate.css'

// custom imports
import styles from '../config/styles'
import FunBigButton from './FunBigButton'
import droneWelcome from '../assets/drone_welcome.png'
import drone1 from '../assets/drone1.png'

const Hero = () => {
  return (
    <section 
      role='region' 
      id='home' 
      className={`flex md:flex-row flex-col py-4`}
    >
      {/* left side */}
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 relative`}>
      <img src={drone1} alt="futuristic drone." className=' absolute bottom-[100px] -right-[10px] rounded-lg w-[190px] fly_about_slow z-[10]' draggable="false" />
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className='ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]'>
            Ghana's best <br className='sm:block hidden' /> {" "}
            <span className='text-gradient animate__animated animate__bounceInDown'>online</span> <br className='sm:block hidden' /> {" "}
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
            <FunBigButton 
              linkTo='/auth'
            />
          </div>
        </div>
        <h1 className='ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]'>discount mall</h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum accusamus impedit dignissimos velit! Repellat, laboriosam repellendus? Quaerat aperiam saepe ratione iste quibusdam, consequuntur, magni mollitia eius sunt corrupti fuga! Laboriosam?</p>
      </div>
      {/* end of left side */}
      {/* right side */}
      <div className="flex-1">
        <img src={droneWelcome} alt="futuristic drones flying over the city with packages." className='w-[90%] mt-4 sm:mt-0 mx-auto sm:mx-[unset] sm:w-full sm:h-full relative z-[5] rounded-lg' loading='lazy' />

        <div className="absolute right-0 z-[0] top-0 w-[20%] h-[15%] pink__gradient"></div>
        <div className="absolute right-0 z-[0] bottom-40 w-[10%] h-[10%] white__gradient"></div>
        <div className="absolute z-[0] right-20 bottom-20 w-[50%] h-[50%] blue__gradient"></div>
      </div>
        
      {/* end of right side */}
    </section>
  )
}

export default Hero