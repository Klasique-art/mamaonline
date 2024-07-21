import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

// custom imports
import { Navbar, Footer, Swipper, Button, ReviewCard, CartToast } from '../components'
import styles from '../config/styles'
import {useAllProducts} from '../context/AllProductsProvider'
import { formatNumber } from '../utils/utils'
import pic1 from '../assets/pic1.png'
import { useCartItems } from '../context/CartItemsProvider'

const reviews = [
  {
    id: 1,
    img: pic1,
    name: 'John Doe',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quae.'
  },
  {
    id: 2,
    img: pic1,
    name: 'Elsie Fisher',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quae.'
  },
  {
    id: 3,
    img: pic1,
    name: 'John Doe',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quae.'
  },
  {
    id: 4,
    img: pic1,
    name: 'Elsie Fisher',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quae.'
  },
  {
    id: 5,
    img: pic1,
    name: 'John Doe',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quae.'
  },
  {
    id: 6,
    img: pic1,
    name: 'Elsie Fisher',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quae.'
  },
  {
    id: 7,
    img: pic1,
    name: 'John Doe',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quae.'
  },
  {
    id: 8,
    img: pic1,
    name: 'Elsie Fisher',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quae.'
  },
  {
    id: 9,
    img: pic1,
    name: 'John Doe',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quae.'
  },
  {
    id: 10,
    img: pic1,
    name: 'Elsie Fisher',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quae.'
  },
  {
    id: 11,
    img: pic1,
    name: 'John Doe',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quae.'
  },
  {
    id: 12,
    img: pic1,
    name: 'Elsie Fisher',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quae.'
  },
  {
    id: 13,
    img: pic1,
    name: 'John Doe',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quae.'
  },
  {
    id: 14,
    img: pic1,
    name: 'Elsie Fisher',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quae.'
  },
]


const DetailsPage = () => {
  const [counter, setCounter] = useState(1)
  const [reviewBoxOpen, setReviewBoxOpen] = useState(false)
  const {slug} = useParams()
  const {allProducts, fetchProducts} = useAllProducts()
  const product = allProducts.find(product => product.slug === slug)
  const [totalPrice, setTotalPrice] = useState(0)
  const {addToCart} = useCartItems()
  const [showCartToast, setShowCartToast] = useState(false)
  const [selectedAttributes, setSelectedAttributes] = useState({});

  // fetch products
  useEffect(() => {
    fetchProducts()
  }, [])

  // set total price based on the product and counter
  useEffect(() => {
    if (product) {
      setTotalPrice(Number(product?.discounted_price) * counter);
      const initialAttributes = {};
      product.attributes.forEach((attr) => {
        initialAttributes[attr.attribute_type] = attr.value;
      });
      setSelectedAttributes(initialAttributes);
    }
  }, [product, counter]);

  const images = product?.images?.map(image => image.image) || []

  const increasePrice = () => {
    setCounter(prevCounter => {
      const newCounter = prevCounter + 1;
      setTotalPrice(Number(product?.discounted_price) * newCounter);
      return newCounter;
    });
  }

  const decreasePrice = () => {
    setCounter(prevCounter => {
      if (prevCounter > 1) {
        const newCounter = prevCounter - 1;
        setTotalPrice(Number(product?.discounted_price) * newCounter);
        return newCounter;
      }
      return prevCounter;
    }); 
  }

  const handleAddToCart = () => {
    addToCart(product)
    setShowCartToast(true)
    setTimeout(() => {
      setShowCartToast(false)
    }, 3000)
  }

  const handleAttributeChange = (type, value) => {
    setSelectedAttributes((prevAttributes) => ({
      ...prevAttributes,
      [type]: value,
    }));
  };

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  
  return (
    <div className="bg-primary w-full overflow-hidden relative">
      <CartToast isVisible={showCartToast} />
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
                    {images.length > 0 ? 
                      (<Swipper 
                        imgArray={images}
                        imgAlt={product?.name}
                      />): (
                        // loading
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="loader">
                            <span className="sr-only" role='alert'>loading images</span>
                          </div>
                        </div>
                      )
                    }
                  </div>
                  {/* end of image box*/}
                  <div className="w-full sm:w-[calc(100%-25rem)] md:w-[calc(100%-32rem)]">
                    <h2 className='text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gradient mb-2' data-aos="fade-up">{product?.name}</h2>
                    <h3 className='text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2' data-aos="fade-up" data-aos-delay="100">Ghc {formatNumber(Number(product?.discounted_price))}</h3>
                    <p className="text-gray-200 text-sm xs:text-base md:text-lg mb-2 font-thin" data-aos="fade-up" data-aos-delay="200">{product?.description}</p>
                    {/* quantity controls */}
                    <div className="flex items-center gap-4 mb-4" data-aos="fade-up" data-aos-delay="300">
                      <button className='bg-blue-gradient details-quantity-btn' onClick={decreasePrice} aria-label='decrease number of item.'>
                        <div className="fas fa-minus"></div>
                      </button>
                      <p className="text-white" role='alert'>{counter}</p>
                      <button className='bg-blue-gradient details-quantity-btn' onClick={increasePrice} aria-label='increase number of item.'>
                        <div className="fas fa-plus"></div>
                      </button>
                    </div>
                    <div className="bg-cyan-600 max-w-[max-content] py-2 px-4 rounded-md" data-aos="fade-up" data-aos-delay="350">
                      <p className='text-sm'>total price</p>
                      <h3 className="text-white">Ghc {formatNumber(Number(totalPrice))}</h3>
                    </div>
                    {/* attribute specific box */}
                    <div className="my-4" data-aos="fade-up" data-aos-delay="300">
                      {product?.attributes.map((attribute) => (
                        <div key={attribute.attribute_type} className="my-2">
                          <label htmlFor={attribute.attribute_type} className="text-white">{`Choose ${attribute.attribute_type}:`}</label>
                          <select
                            id={attribute.attribute_type}
                            className="bg-primary text-white ml-2 p-2 rounded"
                            value={selectedAttributes[attribute.attribute_type]}
                            onChange={(e) => handleAttributeChange(attribute.attribute_type, e.target.value)}
                          >
                            <option value={attribute.value}>{attribute.value}</option>
                          </select>
                        </div>
                      ))}
                    </div>
                    {/* end of attribute specific box */}
                    <div className="flex items-center justify-between py-4" data-aos="fade-up" data-aos-delay="400">
                      <Button
                        title="add to cart"
                        onClick={handleAddToCart}
                      />
                      <Button
                        title="buy now"
                        linkTo="/order"
                        state={{ products: [{...product, totalPrice, quantity: counter}] }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* reviews */}
              <article role='region'>
                <div className="article-wrapper">
                  <h2 className='text-gradient text-xl sm:text-2xl text-center mb-4'>reviews</h2>
                  <div className="w-full flex flex-row items-center overflow-y-hidden overflow-x-auto snap-x snap-mandatory review-container py-5 gap-4 relative">
                    {/* review card */}
                    {
                      reviews.map(review => (
                        <ReviewCard
                          key={review.id}
                          img={review.img}
                          name={review.name}
                          text={review.text}
                        />
                      ))
                    }
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