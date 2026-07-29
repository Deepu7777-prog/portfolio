import React, { useEffect, useRef } from 'react';
import '../styles/components.css';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on mobile devices
    if (window.innerWidth < 768) return;

    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!dot || !glow) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Dot follows instantly
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const render = () => {
      // Glow lerps to mouse position
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;

      glow.style.left = `${glowX}px`;
      glow.style.top = `${glowY}px`;

      requestAnimationFrame(render);
    };

    const handleHoverStart = () => {
      document.body.classList.add('cursor-hover');
    };

    const handleHoverEnd = () => {
      document.body.classList.remove('cursor-hover');
    };

    window.addEventListener('mousemove', onMouseMove);
    requestAnimationFrame(render);

    // Add hover effects for interactive elements
    const interactiveSelectors = 'a, button, .btn, input, textarea, select';
    const elements = document.querySelectorAll(interactiveSelectors);
    
    elements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    // Observer to attach events to dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const newElements = document.querySelectorAll(interactiveSelectors);
          newElements.forEach((el) => {
            el.removeEventListener('mouseenter', handleHoverStart);
            el.removeEventListener('mouseleave', handleHoverEnd);
            el.addEventListener('mouseenter', handleHoverStart);
            el.addEventListener('mouseleave', handleHoverEnd);
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
      observer.disconnect();
    };
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-glow" ref={glowRef}></div>
    </>
  );
};

export default CustomCursor;
