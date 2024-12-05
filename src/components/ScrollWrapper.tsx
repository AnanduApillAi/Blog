"use client";
import { ReactNode, useEffect } from 'react';

const ScrollWrapper = ({ children }: { children: ReactNode }) => {
//   useEffect(() => {
//     const handleScroll = (e: WheelEvent) => {
//       e.preventDefault();
      
//       const sections = document.querySelectorAll('section');
//       let currentSectionIndex = 0;
      
//       sections.forEach((section, index) => {
//         const rect = section.getBoundingClientRect();
//         if (rect.top <= 100) currentSectionIndex = index;
//       });

//       const direction = e.deltaY > 0 ? 1 : -1;
//       const nextIndex = currentSectionIndex + direction;
      
//       if (nextIndex >= 0 && nextIndex < sections.length) {
//         sections[nextIndex].scrollIntoView({ 
//           behavior: 'smooth',
//           block: 'start'
//         });
//       }
//     };

//     window.addEventListener('wheel', handleScroll, { passive: false });
//     return () => window.removeEventListener('wheel', handleScroll);
//   }, []);

  return <>{children}</>;
};

export default ScrollWrapper;