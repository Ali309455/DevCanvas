import { useEffect, useState } from 'react';

export const useScrollSpy = (contentRef, dependency) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    // We delay the query slightly to allow the HTML parser to render the content and inject IDs
    const timer = setTimeout(() => {
      const headingElements = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6')).filter(h => h.id);

      if (headingElements.length === 0) return;

      const handleScroll = () => {
        // Offset to trigger when heading reaches near top of the viewport
        const scrollPosition = window.scrollY + 200; 

        let currentActiveId = headingElements[0].id;

        for (let i = 0; i < headingElements.length; i++) {
          const heading = headingElements[i];
          const headingTop = heading.getBoundingClientRect().top + window.scrollY;
          
          if (scrollPosition >= headingTop) {
            currentActiveId = heading.id;
          } else {
            break;
          }
        }

        setActiveId(currentActiveId);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial check

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, 500);

    return () => clearTimeout(timer);
  }, [contentRef, dependency]); 

  return activeId;
};