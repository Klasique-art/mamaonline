import React from 'react'

const ServiceHeroReverse = ({image, imageAlt, heading="This is the heading", children}) => {
  return (
    <div className='w-full flex flex-col md:flex-row gap-2'>
      <div className="w-full md:w-1/2 p-2 text-white">
        <h2 className='text-center text-2xl sm:text-3xl md:text-4xl mb-2 text-gradient' data-aos="fade-up">{heading}</h2>
        <div className="">
          {children}
        </div>
      </div>
      <figure className='w-full sm:w-96 sm:mx-auto md:w-1/2 md:h-[30rem] bg-[#33bbcf] p-1 rounded' data-aos="zoom-out">
        <img src={image} alt={imageAlt} className='w-full h-full' />
      </figure>
    </div>
  )
}

export default ServiceHeroReverse