import React from 'react';
import { motion } from 'framer-motion';
import { educationList } from '../data/portfolio';
import '../styles/education.css';

const Education: React.FC = () => {
  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Academic Journey</span>
          <h2 className="section-title">Education & Milestones</h2>
          <p className="section-subtitle">
            Strong foundational knowledge in Computer Science, AI, Mathematics, and Analytical Problem Solving.
          </p>
        </div>

        <div className="education-timeline">
          <div className="education-timeline-line" />

          {educationList.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                className={`education-timeline-item ${isLeft ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="education-node" />
                <div className="education-card-inner">
                  <div className="education-header">
                    <span className="education-icon">{item.icon}</span>
                    <h3 className="education-degree">{item.degree}</h3>
                  </div>

                  <div className="education-institution">{item.institution}</div>
                  {item.affiliation && (
                    <div className="education-affiliation">{item.affiliation}</div>
                  )}

                  <p className="skill-bento-desc" style={{ marginTop: '10px' }}>
                    {item.details}
                  </p>

                  <div className="education-meta">
                    <span className="education-duration">{item.duration}</span>
                    <span className="education-score-badge">
                      {item.scoreLabel}: {item.score}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
