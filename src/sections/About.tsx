import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, aboutTags } from '../data/portfolio';
import '../styles/about.css';

const About = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">About Me</span>
          <h2 className="section-title">Get to Know Me</h2>
        </div>

        <motion.div 
          className="about-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="about-card glass-card">
            {imgError ? (
              <div 
                className="about-image" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  background: 'linear-gradient(135deg, var(--accent-blue), var(--lavender-deep))',
                  color: 'white',
                  fontSize: '3rem',
                  fontWeight: 'bold'
                }}
              >
                SK
              </div>
            ) : (
              <img 
                src="/images/profile.jpg" 
                alt="Profile" 
                className="about-image"
                onError={() => setImgError(true)}
              />
            )}
            
            <div className="about-text">
              <p>{personalInfo.intro}</p>
            </div>

            <div className="about-tags">
              {aboutTags.map((tag, index) => (
                <motion.span
                  key={index}
                  className="about-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
