import React from 'react'

// custom imports
import styles from '../config/styles'
import { Navbar, Hero, Stats, ServiceHero, ServiceHeroReverse, Button, Testimonials, SubscribeCard, Footer } from '../components'
import homeShopImg from '../assets/home_shop.png'
import mallImg from '../assets/mall.png'

const HomePage = () => {
  return (
    // div to wrap the entire page
    <div className='bg-primary w-full overflow-hidden'>
      {/* navbar */}
      <div className={`${styles.paddingX} ${styles.flexCenter} z-[999]`}>
        <div className={`${styles.boxWidth} z-[999]`}>
          <Navbar/>
        </div>
      </div>
      {/* end of navbar */}

      {/* welcome hero section */}
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>
      {/* end of welcome hero section */}

      {/* rest of app */}
      <div className={`bg-primary ${styles.flexStart} ${styles.paddingX}`}>
        <div className={`${styles.boxWidth}`}>
          <Stats/>
          {/* services hero section */}
          <article role='region'>
            <div className="article-wrapper">
              <ServiceHero
                image={homeShopImg}
                imageAlt="A neon lighted glass room."
                heading='The best online mall for discounts.'
              >
                <p className='mb-2' data-aos="fade-up" data-aos-delay="100">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum nulla quasi illo vero earum, nemo assumenda totam ad illum consequuntur vitae provident corporis similique porro voluptatibus recusandae nostrum quas repudiandae.</p>
                <p data-aos="fade-up" data-aos-delay="200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, labore! Minima odit animi nisi vero commodi odio ipsa nemo a quod excepturi in molestiae exercitationem fugit, iusto laborum pariatur placeat?</p>
                <div data-aos="fade-up" data-aos-delay="300">
                  <Button styles='mt-4' title='visit mall' linkTo='/mall'>
                    <i className="fa-solid fa-cart-flatbed-suitcase"></i>
                  </Button>
                </div>
              </ServiceHero>
              <div className="relative">
                <div className="absolute -left-1/2 top-0 w-1/2 h-1/2 white__gradient"></div>
                <div className="absolute -left-1/2 bottom-0 w-1/2 h-1/2 pink__gradient"></div>
                <ServiceHeroReverse
                  image={mallImg}
                  imageAlt="futuristic mall interior with people."
                  heading='The best online mall for discounts.'
                >
                  <p className='mb-2' data-aos="fade-up" data-aos-delay="100">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum nulla quasi illo vero earum, nemo assumenda totam ad illum consequuntur vitae provident corporis similique porro voluptatibus recusandae nostrum quas repudiandae.</p>
                  <p data-aos="fade-up" data-aos-delay="200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, labore! Minima odit animi nisi vero commodi odio ipsa nemo a quod excepturi in molestiae exercitationem fugit, iusto laborum pariatur placeat?</p>
                </ServiceHeroReverse>
              </div>
            </div> 
          </article>
          {/* end of services hero section */}
          <Testimonials />
          {/* subscribe */}
          <article role='region'>
            <div className="article-wrapper">
              <SubscribeCard />
            </div>
          </article>
          {/* end of subscribe */}
        </div>
      </div>
      {/* end of rest of app */}
      
          <Footer />
    </div>
    // end of div to wrap the entire page
  )
}

export default HomePage