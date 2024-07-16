import React, {useEffect} from 'react';
import { Navbar, Footer, Button } from '../components';
import styles from '../config/styles';

const services = [
  {
    id: 1,
    title: 'Heavily Discounted Products',
    description: 'Offering a wide range of products at unbeatable prices.',
    icon: 'fas fa-tags',
  },
  {
    id: 2,
    title: 'Fast Delivery',
    description: 'Ensuring your orders are delivered swiftly and on time.',
    icon: 'fas fa-shipping-fast',
  },
  {
    id: 3,
    title: '24/7 Customer Support',
    description: 'Providing round-the-clock assistance for all your needs.',
    icon: 'fas fa-headset',
  },
  {
    id: 4,
    title: 'Secure Payments',
    description: 'Offering multiple secure payment options for your convenience.',
    icon: 'fas fa-lock',
  },
  {
    id: 5,
    title: 'Easy Returns',
    description: 'Hassle-free returns within 30 days of purchase.',
    icon: 'fas fa-undo-alt',
  },
  {
    id: 6,
    title: 'Wide Product Range',
    description: 'A vast selection of products across various categories.',
    icon: 'fas fa-th-large',
  },
  {
    id: 7,
    title: 'Exclusive Deals',
    description: 'Special deals and offers available only to our members.',
    icon: 'fas fa-gift',
  },
];


const ServicesPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-primary w-full overflow-hidden relative">
      {/* Navbar */}
      <div className={`${styles.paddingX} ${styles.flexCenter} z-[999]`}>
        <div className={`${styles.boxWidth} z-[999]`}>
          <Navbar />
        </div>
      </div>

      {/* Main content */}
      <main role="main" className={`${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <section className="text-white py-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gradient">Our Services</h2>
              <p className="text-gray-200 text-lg mt-4">We offer a wide range of services to meet your needs.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {services.map((service) => (
                <div key={service.id} className="bg-black-gradient-2 p-6 rounded-lg w-[300px] shadow-lg" data-aos="fade-up" data-aos-delay={service.id * 100}>
                  <div className="flex items-center justify-center mb-4">
                    <i className={`${service.icon} text-3xl md:text-4xl text-gradient`}></i>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-200 mb-4">{service.description}</p>
                </div>
              ))}
            </div>
          </section>
          <article role='region'>
            <div className="article-wrapper">
              <div className="relative">
                <div className="absolute -left-1/2 top-0 w-1/2 h-1/2 white__gradient"></div>
                <div className="absolute -left-1/2 bottom-0 w-1/2 h-1/2 pink__gradient"></div>
                <div className="bg-black-gradient-2 p-4 rounded-lg shadow-lg text-white" data-aos="fade-up" data-aos-delay="100">
                  <h2 className="text-gradient mb-4 text-3xl text-center">the best in ghana.</h2>
                  <div className="">
                    <p className='mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quidem velit nobis cum dolorem maiores sunt. Mollitia quibusdam hic, ea et totam fuga provident alias aliquam debitis officiis labore fugiat?</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi porro neque inventore optio itaque fugit odit nisi dolore reprehenderit quo odio, consectetur nesciunt iure quod exercitationem excepturi enim, iusto doloribus!</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ServicesPage;
