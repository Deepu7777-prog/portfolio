import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiAward, FiX } from 'react-icons/fi';
import { experiences } from '../data/portfolio';
import '../styles/experience.css';

const Experience: React.FC = () => {
  const [showCertModal, setShowCertModal] = useState(false);

  return (
    <section id="experience" className="section gradient-bg">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Professional Experience</span>
          <h2 className="section-title">Internships & Industry Projects</h2>
        </div>

        <div className="experience-container">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="experience-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* LEFT: Experience Details */}
              <div>
                <div className="experience-header-top">
                  <h3 className="experience-company">{exp.company}</h3>
                  <span className="experience-duration">
                    <FiCalendar style={{ marginRight: '6px' }} />
                    {exp.duration}
                  </span>
                </div>

                <div className="experience-role">
                  <FiBriefcase style={{ marginRight: '8px' }} />
                  {exp.role}
                </div>

                <div className="experience-project-badge">
                  <span>🚀 Project: {exp.project}</span>
                </div>

                <p className="skill-bento-desc">{exp.description}</p>

                <div className="experience-highlights">
                  {exp.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="experience-highlight-chip">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Certificate Preview */}
              <div
                className="experience-cert-wrapper"
                onClick={() => setShowCertModal(true)}
              >
                <img
                  src="/images/certificate.jpg"
                  alt="Edunet Foundation Certificate"
                  className="experience-cert-img"
                />
                <div className="experience-cert-overlay">
                  <FiAward style={{ fontSize: '1.4rem', marginRight: '6px' }} />
                  View Certificate
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertModal && (
          <motion.div
            className="cert-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCertModal(false)}
          >
            <motion.div
              className="cert-modal-content"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="cert-modal-close"
                onClick={() => setShowCertModal(false)}
              >
                <FiX />
              </button>

              <img
                src="/images/certificate.jpg"
                alt="Edunet Foundation Certificate"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experience;
