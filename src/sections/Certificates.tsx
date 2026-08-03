import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import { certificates, type CertificateItem } from '../data/portfolio';
import '../styles/certificates.css';

const Certificates: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || certificates.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % certificates.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section id="certificates" className="section gradient-bg">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Certificates & Awards</span>
          <h2 className="section-title">Verified Credentials</h2>
        </div>

        <div
          className="certificates-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="certificate-carousel">
            <AnimatePresence mode="wait">
              {certificates.map((cert: CertificateItem, index: number) => (
                index === activeIndex && (
                  <motion.div
                    key={index}
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
              {certificates.map((_: CertificateItem, index: number) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
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
