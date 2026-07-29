import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import { certificates } from '../data/portfolio';
import '../styles/certificates.css';

const Certificates = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || certificates.length <= 1) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % certificates.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHovered, certificates.length]);

  return (
    <section id="certificates" className="section gradient-bg">
      <div className="container">
        <div className="section-header text-center">
          <motion.p 
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Certificates
          </motion.p>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Certifications & Awards
          </motion.h2>
        </div>

        <div 
          className="certificates-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="certificate-carousel">
            <AnimatePresence mode="wait">
              {certificates.map((cert, index) => (
                index === activeIndex && (
                  <motion.div
                    key={cert.id}
                    className="certificate-card"
                    initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                    transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
                  >
                    <div className="certificate-decoration d1"></div>
                    <div className="certificate-decoration d2"></div>
                    
                    <div className="certificate-badge">
                      <FiAward />
                    </div>
                    
                    <h3 className="certificate-title">{cert.title}</h3>
                    <div className="certificate-issuer">{cert.issuer}</div>
                    <div className="certificate-date">{cert.date}</div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
          
          {certificates.length > 1 && (
            <div className="carousel-nav">
              {certificates.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to certificate ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
