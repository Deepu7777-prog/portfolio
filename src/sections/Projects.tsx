import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import { projects } from '../data/portfolio';
import '../styles/projects.css';

const Projects = () => {
  return (
    <section id="projects" className="section gradient-bg">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">My Projects</span>
          <h2 className="section-title">Featured Work</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => {
            const cardRef = useRef<HTMLDivElement>(null);

            const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
              if (!cardRef.current) return;
              const rect = cardRef.current.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              
              const rotateX = (y / rect.height) * -10;
              const rotateY = (x / rect.width) * 10;
              
              cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            };

            const handleMouseLeave = () => {
              if (!cardRef.current) return;
              cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div 
                  ref={cardRef}
                  className="project-card glass-card"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ transition: 'transform 0.1s ease-out, box-shadow 0.3s ease' }}
                >
                  <div className="project-card-header">
                    <div 
                      className="project-card-gradient" 
                      style={{ background: project.gradient || 'var(--accent-blue)' }} 
                    />
                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-desc">{project.description}</p>
                  </div>
                  
                  <div className="project-card-body">
                    <div className="project-tech-tags">
                      {project.tech.map((tech, techIdx) => (
                        <span key={techIdx} className="project-tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <ul className="project-features">
                      {project.features.map((feature, featureIdx) => (
                        <li key={featureIdx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="project-card-footer">
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-live-link btn secondary"
                    >
                      View Live <FiExternalLink />
                    </a>
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

export default Projects;
