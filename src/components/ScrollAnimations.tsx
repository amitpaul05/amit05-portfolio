import { useEffect, useRef } from 'react';

const useScrollAnimation = (deps: unknown[] = []) => {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      const hiddenElements = document.querySelectorAll('.animate-on-scroll:not(.visible), .slide-on-scroll:not(.visible)');
      hiddenElements.forEach(el => el.classList.add('visible'));
    }, 2000);

    if (!window.IntersectionObserver) {
      const allElements = document.querySelectorAll('.animate-on-scroll, .slide-on-scroll');
      allElements.forEach(el => el.classList.add('visible'));
      return () => clearTimeout(fallbackTimer);
    }

    const observers = new Map();

    const createObserver = (threshold = 0.1) => {
      return new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              const children = entry.target.querySelectorAll('.stagger-child');
              children.forEach((child, index) => {
                setTimeout(() => {
                  child.classList.add('visible');
                }, index * 100);
              });
              // Unobserve after first reveal — entrance fires once, never re-triggers
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold,
          rootMargin: '0px 0px -50px 0px'
        }
      );
    };

    const fadeObserver = createObserver(0.1);
    const slideObserver = createObserver(0.2);

    const setupObservers = () => {
      const fadeElements = document.querySelectorAll('.animate-on-scroll');
      const slideElements = document.querySelectorAll('.slide-on-scroll');
      fadeElements.forEach(el => fadeObserver.observe(el));
      slideElements.forEach(el => slideObserver.observe(el));
    };

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
  }, deps);

  return { elementsRef };
};

export default useScrollAnimation;
