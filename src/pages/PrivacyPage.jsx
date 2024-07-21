import React, { useEffect } from 'react';
import { Navbar, Footer } from '../components';
import styles from '../config/styles';
import { privacyPolicies } from '../data/infoData';

const PrivacyPage = () => {
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
              <h2 className="text-4xl font-bold text-gradient">Privacy Policy</h2>
              <p className="text-gray-200 text-lg mt-4">Your privacy is important to us. This policy outlines how we handle your personal information.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {privacyPolicies.map((policy) => (
                <div key={policy.id} className="bg-black-gradient-2 p-6 rounded-lg w-full md:w-[45%] shadow-lg" data-aos="fade-up" data-aos-delay={policy.id * 100}>
                  <h3 className="text-2xl font-semibold mb-2">{policy.title}</h3>
                  <p className="text-gray-200">{policy.content}</p>
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

export default PrivacyPage;
