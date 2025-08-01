import { useEffect, useRef } from 'react';

const useScrollAnimation = () => {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  
  useEffect(() => {
    const observers = new Map();
    
    const createObserver = (threshold = 0.1) => {
      return new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              // Add staggered animation for child elements
              const children = entry.target.querySelectorAll('.stagger-child');
              children.forEach((child, index) => {
                setTimeout(() => {
                  child.classList.add('visible');
                }, index * 100);
              });
            }
          });
        },
        { 
          threshold,
          rootMargin: '0px 0px -50px 0px'
        }
      );
    };
    
    // Create observers for different animation types
    const fadeObserver = createObserver(0.1);
    const slideObserver = createObserver(0.2);
    
    // Observe elements with scroll animation classes
    const fadeElements = document.querySelectorAll('.animate-on-scroll');
    const slideElements = document.querySelectorAll('.slide-on-scroll');
    
    fadeElements.forEach(el => fadeObserver.observe(el));
    slideElements.forEach(el => slideObserver.observe(el));
    
    observers.set('fade', fadeObserver);
    observers.set('slide', slideObserver);
    
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);
  
  return { elementsRef };
};

export default useScrollAnimation;