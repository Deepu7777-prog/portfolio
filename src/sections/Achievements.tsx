import React from 'react';
import { motion } from 'framer-motion';
import { achievements } from '../data/portfolio';
import '../styles/achievements.css';

const Achievements = () => {
  return (
    <section id="achievements" className="section">
      <div className="container">
        <div className="section-header text-center">
          <motion.p 
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Achievements
          </motion.p>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Milestones & Recognition
          </motion.h2>
        </div>

        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="achievement-card"
              style={{ 
                '--card-color': achievement.color,
                animation: `float-achievement 6s ease-in-out infinite`,
                animationDelay: `${index * 1.5}s`
              } as React.CSSProperties}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <span className="achievement-icon">{achievement.icon}</span>
              <h3 className="achievement-title">{achievement.title}</h3>
              <p className="achievement-description">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
