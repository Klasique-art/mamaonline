import React, { useEffect, useState, useRef } from 'react';

const Counter = ({ targetNumber }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    let observer;
    let didAnimate = false;
    
    const animateCount = () => {
      let start = 0;
      const duration = 2500;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        setCount(Math.floor(progress * targetNumber));
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };

      requestAnimationFrame(updateCount);
    };

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !didAnimate) {
          animateCount();
          didAnimate = true;
        }
      });
    };

    observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (observer && counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [targetNumber]);

  return (
    <h1 ref={counterRef} className="text-3xl sm:text-4xl md:text-5xl text-gradient ">
      {count}
    </h1>
  );
};

export default Counter;
