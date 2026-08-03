import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo, statistics } from '../data/portfolio';
import '../styles/about.css';

const About: React.FC = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">About Me</span>
          <h2 className="section-title">Architecting Software & Intelligence</h2>
        </div>

        <motion.div
          className="about-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="about-card glass-card">
            {/* LEFT: Photo */}
            <div className="about-photo-wrapper">
              <img
                src="/images/profile.jpg"
                alt="Saideepthi Kummari"
                className="about-photo"
              />
            </div>

            {/* RIGHT: Text & Stats */}
            <div className="about-content">
              <p className="about-text">{personalInfo.aboutIntro}</p>

              <div className="about-stats-grid">
                {statistics.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="about-stat-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <div className="about-stat-value">
                      {stat.value}
                      {stat.suffix}
                    </div>
                    <div className="about-stat-label">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
