import React, { useEffect, useState } from 'react';
import { Navbar, Footer } from '../components';
import styles from '../config/styles';

const faqs = [
  {
    id: 1,
    question: 'What is your return policy?',
    answer: 'We offer hassle-free returns within 30 days of purchase. Please ensure the product is in its original condition.',
  },
  {
    id: 2,
    question: 'How can I track my order?',
    answer: 'You can track your order using the tracking number provided in the confirmation email or by logging into your account on our website.',
  },
  {
    id: 3,
    question: 'Do you offer international shipping?',
    answer: 'Yes, we offer international shipping to selected countries. Shipping fees and delivery times vary depending on the destination.',
  },
  {
    id: 4,
    question: 'How can I contact customer support?',
    answer: 'You can contact our customer support team 24/7 via email, phone, or live chat on our website.',
  },
  {
    id: 5,
    question: 'What payment methods do you accept?',
    answer: 'We accept various payment methods, including credit/debit cards, mobile money, and online payment platforms.',
  },
];

const FAQPage = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFAQ = (id) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

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
              <h2 className="text-2xl sm:text3xl md:text-4xl font-bold text-gradient">Frequently Asked Questions</h2>
              <p className="text-gray-200 text-lg mt-4">Find answers to common questions about our services and policies.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {faqs.map((faq) => (
                <div 
                  key={faq.id} 
                  className={`bg-black-gradient-2 p-6 rounded-lg w-full md:w-[600px] shadow-lg cursor-pointer transition-all duration-300 ${activeFAQ === faq.id ? 'shadow-lg scale-105' : ''}`} 
                  onClick={() => toggleFAQ(faq.id)}
                  data-aos="fade-up" 
                  data-aos-delay={faq.id * 100}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-semibold">{faq.question}</h3>
                    <i className={`fas ${activeFAQ === faq.id ? 'fa-minus' : 'fa-plus'} text-2xl`}></i>
                  </div>
                  {activeFAQ === faq.id && (
                    <p className="text-gray-200">{faq.answer}</p>
                  )}
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

export default FAQPage;
