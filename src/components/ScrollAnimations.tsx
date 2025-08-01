import { useEffect, useRef } from 'react';

const useScrollAnimation = () => {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  
  useEffect(() => {
    console.log('ScrollAnimation hook mounted');
    
    // Fallback: ensure all elements are visible if IntersectionObserver fails
    const fallbackTimer = setTimeout(() => {
      const hiddenElements = document.querySelectorAll('.animate-on-scroll:not(.visible), .slide-on-scroll:not(.visible)');
      console.log('Fallback: Making', hiddenElements.length, 'elements visible');
      hiddenElements.forEach(el => el.classList.add('visible'));
    }, 2000);
    
    // Check if IntersectionObserver is supported
    if (!window.IntersectionObserver) {
      console.log('IntersectionObserver not supported, showing all elements');
      const allElements = document.querySelectorAll('.animate-on-scroll, .slide-on-scroll');
      allElements.forEach(el => el.classList.add('visible'));
      return () => clearTimeout(fallbackTimer);
    }
    
    const observers = new Map();
    
    const createObserver = (threshold = 0.1) => {
      return new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              console.log('Element became visible:', entry.target.tagName);
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
    
    // Wait for DOM to be ready
    const setupObservers = () => {
      const fadeElements = document.querySelectorAll('.animate-on-scroll');
      const slideElements = document.querySelectorAll('.slide-on-scroll');
      
      console.log('Found elements to animate:', { fade: fadeElements.length, slide: slideElements.length });
      
      fadeElements.forEach(el => fadeObserver.observe(el));
      slideElements.forEach(el => slideObserver.observe(el));
    };
    
    // Setup observers immediately or wait for next tick
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupObservers);
    } else {
      setTimeout(setupObservers, 100);
    }
    
    observers.set('fade', fadeObserver);
    observers.set('slide', slideObserver);
    
    return () => {
      clearTimeout(fallbackTimer);
      observers.forEach(observer => observer.disconnect());
    };
  }, []);
  
  return { elementsRef };
};

export default useScrollAnimation;