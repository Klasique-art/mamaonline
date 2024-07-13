import React, {useState} from 'react'
import { useParams } from 'react-router-dom'

// custom imports
import { Navbar, Footer, Swipper, Button, ReviewCard } from '../components'
import styles from '../config/styles'
import { useProduct } from '../context/ProductProvider'
import { formatNumber } from '../utils/utils'
import pic1 from '../assets/pic1.png'

const DetailsPage = () => {
  const [reviewBoxOpen, setReviewBoxOpen] = useState(false)
  const {slug} = useParams()
  const {product} = useProduct()

  const images = [product.image]

  const renderCategorySpecific = () => {
    switch (product?.category) {
      case 3:
        return (
          <div className="mb-4" data-aos="fade-up" data-aos-delay="300">
            <label htmlFor="size" className="text-white">Choose Size:</label>
            <select id="size" className="bg-primary text-white ml-2 p-2 rounded">
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra Large</option>
            </select>
          </div>
        );
      case 1:
        return (
          <div className="mb-4" data-aos="fade-up" data-aos-delay="300">
            <label htmlFor="storage" className="text-white">Choose Storage:</label>
            <select id="storage" className="bg-primary text-white ml-2 p-2 rounded">
              <option value="64GB">64GB</option>
              <option value="128GB">128GB</option>
              <option value="256GB">256GB</option>
            </select>
          </div>
        );
      case 2:
        return (
          <div className="mb-4" data-aos="fade-up" data-aos-delay="300">
            <label htmlFor="capacity" className="text-white">Choose Capacity:</label>
            <select id="capacity" className="bg-primary text-white ml-2 p-2 rounded">
              <option value="1L">1L</option>
              <option value="1.8L">1.8L</option>
              <option value="2L">2L</option>
            </select>
          </div>
        );
      default:
        return null;
    }
  };
  
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
                    {/* category specific box */}
                    {renderCategorySpecific()}
                    {/* end of category specific box */}
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
              {/* reviews */}
              <article role='region'>
                <div className="article-wrapper">
                  <h2 className='text-gradient text-xl sm:text-2xl text-center mb-4'>reviews</h2>
                  <div className="w-full flex flex-row items-center overflow-x-auto snap-x snap-mandatory review-container py-5 gap-4 relative">
                    {/* review card */}
                    <ReviewCard
                      img={pic1}
                      name="John Doe"
                      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quae."
                    />
                    <ReviewCard
                      img={pic1}
                      name="Elsie Fisher"
                      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quae."
                    />
                    <ReviewCard
                      img={pic1}
                      name="Jane Doe"
                      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quae."
                    />
                    <ReviewCard
                      img={pic1}
                      name="Lina Wagner"
                      text="occasionally furniture calm blue positive brown sun column since energy today softly scientific fed action happened man question spell forward state scared bill uncle."
                    />
                    {/* review card */}
                  </div>
                  {/* add your review box */}
                  <div className="py-4">
                    {reviewBoxOpen? (
                      <button className="text-slate-800 uppercase item-glow-light bg-blue-gradient text-sm py-1 px-3 rounded-sm" onClick={()=> setReviewBoxOpen(prev => !prev)}>close</button>
                    ): (
                      <button className="text-slate-800 uppercase item-glow-light bg-blue-gradient text-sm py-1 px-3 rounded-sm" onClick={()=> setReviewBoxOpen(prev => !prev)}>add your review</button>
                    )}
                    {reviewBoxOpen && <form action="#" className='w-full sm:w-64 my-2 py-2'>
                      <textarea name="review" id="review" className="w-full h-24 border-gradient bg-transparent text-white text-xs md:text-sm p-1 rounded mt-1" placeholder="write your review here..." maxLength="167"></textarea>
                      <Button title="submit" style={{
                        padding: '6px 16px',
                      }} />
                    </form>}
                  </div>
                  {/* end of add your review box */}
                </div>
              </article>
              {/* end of reviews */}
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default DetailsPage