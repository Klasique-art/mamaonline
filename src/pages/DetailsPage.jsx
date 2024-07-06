import React from 'react'
import { useParams } from 'react-router-dom'

// custom imports
import { Navbar, Footer, Swipper } from '../components'
import styles from '../config/styles'
import img1 from '../assets/drone1.png'
import img2 from '../assets/drone2.png'
import img3 from '../assets/drone3.png'
import img4 from '../assets/gadget.png'

const images = [img1, img2, img3, img4]

const DetailsPage = () => {
  const {slug} = useParams()
  
  return (
    <div className="bg-primary w-full overflow-hidden relative">
      {/* navbar */}
      <div className={`${styles.paddingX} ${styles.flexCenter} z-[999]`}>
        <div className={`${styles.boxWidth} z-[999]`}>
          <Navbar />
        </div>
      </div>
      {/* end of navbar */}
      <main role='main' className=''>
        <div className={`bg-primary ${styles.flexStart} ${styles.paddingX}`}>
          <div className={`${styles.boxWidth}`}>
            <article role='region'>
              <div className="article-wrapper">
                <div className="text-white flex items-start gap-4">
                  {/* image box*/}
                  <div className="w-full md:w-[32rem] h-[25rem] md:h-[30rem] flex flex-center">
                    <Swipper 
                      imgArray={images}
                    />
                  </div>
                  {/* end of image box*/}
                  <div className="">
                    <p>item {slug}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default DetailsPage