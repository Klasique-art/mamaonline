import React, { useEffect } from 'react';
import { Navbar, Footer } from '../components';
import styles from '../config/styles';
import { terms } from '../data/infoData';

const TermsPage = () => {
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
              <h2 className="text-4xl font-bold text-gradient">Terms and Conditions</h2>
              <h3 className='mt-4'>Welcome to mamaonline. By accessing and using our services, you agree to comply with and be bound by the following terms and conditions</h3>
              <p className="text-gray-200 text-lg mt-4">Please read these terms and conditions carefully before using our services.</p>
            </div>
            <div className="flex flex-wrap justify-center flex-col gap-3 md:gap-4">
              {terms.map((term) => (
                <div key={term.id} className="bg-black-gradient-2 p-6 rounded-lg w-full shadow-lg" data-aos="fade-up" data-aos-delay={term.id * 100}>
                  <h3 className="text-2xl font-semibold mb-2 text-gradient">{term.title}</h3>
                  <p className="text-gray-200">{term.content}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TermsPage;
