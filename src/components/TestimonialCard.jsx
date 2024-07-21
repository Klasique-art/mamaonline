import React from 'react'

const TestimonialCard = ({msg, img, name, subText, ...otherProps}) => {
  return (
    <div {...otherProps}>
      <div tabIndex="0" className='text-white border-gradient py-6 px-4 w-full sm:w-72 md:w-96 rounded-[20px] flex flex-col gap-3 sm:gap-5 justify-between feedback-card min-h-[280px]'>
        <i className="fa-solid fa-quote-left text-4xl md:text-6xl text-gradient"></i>
        <p className='italic font-thin'>{msg}</p>
        <div className="w-full flex items-center gap-2">
          <figure className='w-[50px] md:w-[60px] h-[50px] md:h-[60px] rounded-full'>
            <img src={img} alt="person" className='rounded-full w-full h-full' loading='lazy'  />
          </figure>
          <div className="">
            <h3 className='font-semibold'>{name}</h3>
            <p className='text-[14px] font-thin tracking-tight text-gray-400'>{subText}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard