import React, {useState} from 'react';

import { Navbar, Footer, Alert } from '../components';
import styles from '../config/styles';

const ContactPage = () => {
    const [contactDetails, setContactDetails] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [showAlert, setShowAlert] = useState(false);

    const handleSendMessage = (e) => {
        e.preventDefault();
        setContactDetails({
            name: '',
            email: '',
            message: ''
        });
        setShowAlert(true);
    }

    const handleCloseAlert = () => {
        setShowAlert(false);
    }

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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient" data-aos="fade-up">Contact Us</h2>
              <p className="text-gray-200 text-lg mt-4" data-aos="fade-up" data-aos-delay="50">We'd love to hear from you! Please fill out the form below to get in touch with us.</p>
            </div>
            <div className="flex flex-wrap justify-between gap-8">
              {/* Contact Form */}
              <form className="w-full md:w-[48%] bg-black-gradient-2 p-6 rounded-lg shadow-lg" onSubmit={handleSendMessage} data-aos="fade-up" data-aos-delay="100">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-white text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border-gradient rounded-[30px] py-2 px-4 bg-transparent text-white"
                    placeholder="Your Name"
                    required
                    onChange={(e) => setContactDetails({...contactDetails, name: e.target.value})}
                    value={contactDetails.name}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-white text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border-gradient rounded-[30px] py-2 px-4 bg-transparent text-white"
                    placeholder="Your Email"
                    required
                    onChange={(e) => setContactDetails({...contactDetails, email: e.target.value})}
                    value={contactDetails.email}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-white text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    className="w-full border-gradient rounded py-2 px-4 bg-transparent text-white"
                    placeholder="Your Message"
                    rows="5"
                    required
                    onChange={(e) => setContactDetails({...contactDetails, message: e.target.value})}
                    value={contactDetails.message}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full max-w-36 bg-blue-gradient text-slate-800 btn-glow py-2 px-4 rounded-[30px]"
                >Send Message</button>
              </form>

              {/* Contact Information */}
              <div className="w-full md:w-[48%] bg-black-gradient-2 p-6 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="200">
                <h3 className="text-2xl font-semibold text-gradient mb-4">Contact Information</h3>
                <p className="text-gray-200 mb-4">Feel free to reach out to us through any of the following methods:</p>
                <ul className="text-gray-200">
                  <li className="mb-2"><strong>Email:</strong> support@example.com</li>
                  <li className="mb-2"><strong>Phone:</strong> 0243 456 789</li>
                  <li className="mb-2"><strong>Address:</strong> 123 Main Street, Anytown, USA</li>
                </ul>
                <div className="flex gap-4 mt-4">
                  <a href="https://facebook.com" target='_blank' rel='noreferrer' className="text-2xl text-white hover:text-blue-600 transition-all duration-300">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="https://twitter.com" target='_blank' rel='noreferrer' className="text-2xl text-white hover:text-blue-400 transition-all duration-300">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://instagram.com" target='_blank' rel='noreferrer' className="text-2xl text-white hover:text-pink-600 transition-all duration-300">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      {showAlert && (
            <Alert
                message="Your message is sent, we will reply via email within 48 hrs."
                type="success"
                onClose={handleCloseAlert}
            />
        )}
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
