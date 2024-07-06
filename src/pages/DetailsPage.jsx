import React from 'react'
import { useParams } from 'react-router-dom'

// custom imports
import { Navbar, Footer, Swipper, Button } from '../components'
import styles from '../config/styles'
import { useProduct } from '../context/ProductProvider'
import { formatNumber } from '../utils/utils'

const DetailsPage = () => {
  const {slug} = useParams()
  const {product} = useProduct()

  const images = [product.image]
  
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
                <div className="text-white flex items-start flex-col sm:flex-row gap-4">
                  {/* image box*/}
                  <div className="w-full sm:w-[25rem] md:w-[32rem] h-[25rem] md:h-[30rem] flex flex-center" data-aos="zoom-out" data-aos-delay="100">
                    <Swipper 
                      imgArray={images}
                      imgAlt={product?.name}
                    />
                  </div>
                  {/* end of image box*/}
                  <div className="w-full sm:w-[calc(100%-25rem)] md:w-[calc(100%-32rem)]">
                    <h2 className='text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gradient mb-2' data-aos="fade-up">{product?.name}</h2>
                    <h3 className='text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2' data-aos="fade-up" data-aos-delay="100">Ghc {formatNumber(parseInt(product?.price))}</h3>
                    <p className="text-gray-200 text-sm xs:text-base md:text-lg mb-2 font-thin" data-aos="fade-up" data-aos-delay="200">{product?.description}</p>
                    {/* quantity controls */}
                    <div className="flex items-center gap-4 mb-4" data-aos="fade-up" data-aos-delay="300">
                      <button className='bg-blue-gradient details-quantity-btn'>
                        <div className="fas fa-minus"></div>
                      </button>
                      <p className="text-white">1</p>
                      <button className='bg-blue-gradient details-quantity-btn'>
                        <div className="fas fa-plus"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-4" data-aos="fade-up" data-aos-delay="400">
                      <Button
                        title="add to cart"
                      />
                      <Button
                        title="buy now"
                      />
                    </div>
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