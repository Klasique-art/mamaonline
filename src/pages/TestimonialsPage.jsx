import React, { useState, useEffect } from 'react';
import { Navbar, Footer, Button, TestimonialCard } from '../components';
import styles from '../config/styles';
import pic1 from '../assets/pic1.png';

const initialTestimonials = [
  {
    id: 1,
    msg: 'This service is outstanding! Highly recommend to everyone.',
    img: pic1,
    name: 'John Doe',
    subText: 'CEO, Company Inc.',
  },
  {
    id: 2,
    msg: 'Amazing experience! Will definitely use again.',
    img: pic1,
    name: 'Jane Smith',
    subText: 'Marketing Head, XYZ Ltd.',
  },
  {
    id: 3,
    msg: 'Great service! Keep up the good work.',
    img: pic1,
    name: 'Michael Johnson',
    subText: 'CTO, ABC Ltd.',
  },
  {
    id: 4,
    msg: 'Great service! Keep up the good work.',
    img: pic1,
    name: 'Michael Johnson',
    subText: 'CTO, ABC Ltd.',
  },
  {
    id: 5,
    msg: 'Great service! Keep up the good work.',
    img: pic1,
    name: 'Michael Johnson',
    subText: 'CTO, ABC Ltd.',
  },
  {
    id: 6,
    msg: 'Great service! Keep up the good work.',
    img: pic1,
    name: 'Michael Johnson',
    subText: 'CTO, ABC Ltd.',
  },
  {
    id: 7,
    msg: 'Great service! Keep up the good work.',
    img: pic1,
    name: 'Michael Johnson',
    subText: 'CTO, ABC Ltd.',
  },
  {
    id: 8,
    msg: 'Great service! Keep up the good work.',
    img: pic1,
    name: 'Michael Johnson',
    subText: 'CTO, ABC Ltd.',
  },
  {
    id: 9,
    msg: 'Great service! Keep up the good work.',
    img: pic1,
    name: 'Michael Johnson',
    subText: 'CTO, ABC Ltd.',
  },
  {
    id: 10,
    msg: 'Great service! Keep up the good work.',
    img: pic1,
    name: 'Michael Johnson',
    subText: 'CTO, ABC Ltd.',
  },
  {
    id: 11,
    msg: 'Great service! Keep up the good work.',
    img: pic1,
    name: 'Michael Johnson',
    subText: 'CTO, ABC Ltd.',
  },
  {
    id: 12,
    msg: 'Great service! Keep up the good work.',
    img: pic1,
    name: 'Michael Johnson',
    subText: 'CTO, ABC Ltd.',
  },
];

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [newTestimonial, setNewTestimonial] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setNewTestimonial(value);
  };

  const handleAddTestimonial = () => {
    setShowForm(false);
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
          <article className="text-white">
            <div className="article-wrapper">
              <div className=" text-center mb-8">
                <h2 className="text-4xl font-bold text-gradient animate__animated animate__bounceInDown">Testimonials</h2>
                <p className="text-gray-200 text-lg mt-4 animate__animated animate__bounceInDown" style={{animationDelay: "0.3s"}}>See what our customers have to say about us.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {testimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    msg={testimonial.msg}
                    img={testimonial.img}
                    name={testimonial.name}
                    subText={testimonial.subText}
                    data-aos="fade-up"
                    data-aos-delay={testimonial.id * 50}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <button 
                  className='text-primary bg-blue-gradient rounded py-2 px-4 btn-glow'
                  onClick={() => setShowForm(!showForm)}
                >
                  {showForm ? 'Close Form' : 'Add Testimonial'}
                </button>
              </div>
              {showForm && (
                <div className="flex justify-center mt-8">
                  <form className='bg-black-gradient p-6 rounded w-full sm:w-[500px] flex flex-col gap-4 items-center shadow-lg'>
                    <textarea 
                      name="msg" 
                      placeholder="Your Testimonial" 
                      value={newTestimonial.msg} 
                      onChange={handleInputChange} 
                      required 
                      maxLength={230}
                      className='w-full border-gradient rounded h-44 py-1 px-4 bg-transparent text-white resize-none'
                    />
                    <button 
                      type="button" 
                      onClick={handleAddTestimonial} 
                      className='text-primary bg-blue-gradient rounded py-2 px-4 btn-glow'
                    >
                      Submit Testimonial
                    </button>
                  </form>
                </div>
              )}
            </div>
          </article>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
