import React from 'react'

const ProductsLoader = ({visible}) => {
    if (!visible) return null
  return (
    <div className='absolute top-0 left-0 w-full h-full bg-[rgba(255,355,255,.1)] rounded-md z-40 flex justify-center items-center flex-col'>
        <div className="sr-only" role='alert'>loading products</div>
        <div className="flex justify-between w-[100px]">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
        </div>
    </div>
  )
}

export default ProductsLoader