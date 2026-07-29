import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';
import { experiences } from '../data/portfolio';
import '../styles/experience.css';

const Experience = () => {
  return (
    <section id="experience" className="section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Experience</span>
          <h2 className="section-title">Professional Journey</h2>
        </div>

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="experience-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="experience-header">
                <h3 className="experience-company">
                  <FiBriefcase style={{ display: 'inline', marginRight: '8px', color: 'var(--text-tertiary)' }} />
                  {exp.company}
                </h3>
                <div className="experience-role">{exp.role}</div>
                <div className="experience-duration">
                  <FiCalendar />
                  {exp.duration}
                </div>
              </div>
              
              <div className="experience-project">Project: {exp.project}</div>
              
              <ul className="experience-responsibilities">
                {exp.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
