import { motion } from 'framer-motion';
import { education } from '../data/portfolio';
import '../styles/education.css';

const Education = () => {
  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-header text-center">
          <motion.p 
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Education
          </motion.p>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Academic Background
          </motion.h2>
        </div>

        <div className="education-grid">
          {education.map((item, index) => {
            return (
              <motion.div
                key={index}
                className="education-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <span className="education-icon">{item.icon}</span>
                <h3 className="education-degree">{item.degree}</h3>
                {item.field && <div className="education-field">{item.field}</div>}
                <div className="education-year">{item.year}</div>
                
                <div className="education-score">
                  <motion.span 
                    className="education-score-value"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {item.score}
                  </motion.span>
                  <span className="education-score-label">{item.scoreLabel}</span>
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
