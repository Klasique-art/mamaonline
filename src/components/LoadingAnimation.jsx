import React from 'react'

import '../assets/animation/loadingAnimation.css'

const LoadingAnimation = () => {
  return (
    <div className="bg-primary z-[9090990909] w-screen h-screen fixed top-0 left-0 flex justify-center items-center overflow-hidden">
        <div className="cube">
            <div className="top select-none" role='alert'>LOADING...</div>
            <div>
                <span style={{ '--i': 0 }} />
                <span style={{ '--i': 1 }} />
                <span style={{ '--i': 2 }} />
                <span style={{ '--i': 3 }} />
            </div>
        </div>
    </div>
  )
}

export default LoadingAnimation