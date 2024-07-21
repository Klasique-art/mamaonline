import React, {useEffect, useState} from 'react'

import drone3 from '../assets/drone3.png'
import pic1 from '../assets/pic1.png'
import pic2 from '../assets/pic2.png'
import pic3 from '../assets/pic3.png'
import robot_sound from '../assets/sounds/robot_m.wav'
import TestimonialCard from './TestimonialCard'
import Button from './Button'

const Testimonials = () => {
  const [audio] = useState(new Audio(robot_sound));
  
  const handleMouseEnter = () => {
    if (audio) {
      audio.currentTime = 0; 
      audio.play().catch(error => console.error("Audio playback failed:", error));
    }
  }

  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, []);

  return (
    <article role='region' className='relative'>
      <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient"></div>
      <div data-aos="zoom-out">
        <img src={drone3} alt="Futuristic flying drone" className='absolute -top-[1rem] sm:-top-[2rem] md:-top-[3rem] left-1/2 hover_up_down w-52 sm:w-64 md:w-96' draggable="false" onMouseEnter={handleMouseEnter} />
      </div>
      <div className="article-wrapper text-white">
        <div className="flex flex-col md:flex-row gap-2 py-16 md:pt-32">
          <h2 className='heading text-gradient text-left w-full md:w-1/2' data-aos="fade-in">What do people say <br className="hidden sm:block" /> about us?</h2>
          <p className='w-full md:w-1/2' data-aos="fade-in" data-aos-delay="100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur sapiente repellendus reprehenderit facilis.</p>
        </div>
        <div className="flex items-center gap-4 justify-center flex-wrap">
          <TestimonialCard
            msg="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur sapiente repellendus reprehenderit facilis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur sapiente repellendus reprehenderit facilis."
            img={pic1}
            name="John Doe"
            subText="CEO, Company Inc."
            data-aos="fade-up"
            data-aos-delay="100"
          />
          <TestimonialCard
            msg="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur sapiente repellendus reprehenderit facilis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur sapiente repellendus reprehenderit facilis."
            img={pic2}
            name="Jane Doe"
            subText="CEO, Company Inc."
            data-aos="fade-up"
            data-aos-delay="200"
          />
          <TestimonialCard
            msg="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur sapiente repellendus reprehenderit facilis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur sapiente repellendus reprehenderit facilis."
            img={pic3}
            name="John Doe"
            subText="CEO, Company Inc."
            data-aos="fade-up"
            data-aos-delay="300"
          />
        </div>
        <div data-aos="fade-up" data-aos-delay="400">
          <Button styles='mt-8 mx-auto' title='view more testimonials' linkTo="/testimonials" />
        </div>
      </div>
    </article>  
  )
}

export default Testimonials