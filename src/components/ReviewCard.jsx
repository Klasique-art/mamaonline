import React from 'react'

const ReviewCard = ({img, name, text, ...otherProps}) => {
  return (
    <div className="flex items-center p-2  gap-2 md:gap-4 border-gradient rounded-md min-w-full xs:min-w-80 h-40 snap-center select-none feedback-card" data-aos="fade-up" tabIndex="0" {...otherProps}>
        <figure className="w-12 h-12 md:h-16 md:w-16 flex-shrink-0 border-gradient rounded-full">
            <img src={img} alt="profile." draggable="false" loading='lazy' className='w-full h-full rounded-full object-cover' />
        </figure>
        <div className='h-full flex flex-col justify-center'>
            <h3 className="text-white font-bold text-sm md:text-lg mb-1">{name}</h3>
            <p className="text-gray-400 text-xs sm:text-sm italic">{text}</p>
        </div>
    </div>
  )
}

export default ReviewCard