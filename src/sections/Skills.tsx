import React from 'react';
import { motion } from 'framer-motion';
import { skillsBento } from '../data/portfolio';
import '../styles/skills.css';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="section gradient-bg">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Technical Arsenal</span>
          <h2 className="section-title">Skills & Competencies</h2>
          <p className="section-subtitle">
            Hover over cards to explore technologies powering intelligent AI systems and robust web platforms.
          </p>
        </div>

        <div className="skills-bento-grid">
          {skillsBento.map((skill, index) => (
            <motion.div
              key={index}
              className="skill-bento-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, rotate: index % 2 === 0 ? 0.8 : -0.8, scale: 1.02 }}
            >
              <div className="skill-bento-header">
                <span className="skill-bento-category">{skill.category}</span>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: skill.color,
                    boxShadow: `0 0 12px ${skill.color}`,
                  }}
                />
              </div>

              <div>
                <h3 className="skill-bento-name">{skill.name}</h3>
                <p className="skill-bento-desc">{skill.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
