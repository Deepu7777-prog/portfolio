import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiShield } from 'react-icons/fi';
import { featuredProjects } from '../data/portfolio';
import '../styles/projects.css';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Featured Work</span>
          <h2 className="section-title">Flagship AI & Cyber Project</h2>
        </div>

        <div className="projects-container">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              className="cinematic-project-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              {/* LEFT: Project Specs */}
              <div>
                <div className="project-badge-tag">
                  <FiShield /> Featured Capstone & AI Platform
                </div>

                <h3 className="project-title">{project.title}</h3>
                <div className="project-subtitle">{project.subtitle}</div>
                <p className="project-description">{project.description}</p>

                <div className="project-features-grid">
                  {project.features.map((feature, fIdx) => (
                    <div key={fIdx} className="project-feature-item">
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="project-tech-stack">
                  {project.tech.map((t, tIdx) => (
                    <span key={tIdx} className="project-tech-chip">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="project-buttons">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <FiExternalLink /> Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    <FiGithub /> GitHub Code
                  </a>
                </div>
              </div>

              {/* RIGHT: Laptop Mockup with Live Frame */}
              <div className="laptop-mockup">
                <div className="laptop-header">
                  <span className="laptop-dot red" />
                  <span className="laptop-dot yellow" />
                  <span className="laptop-dot green" />
                  <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#94A3B8' }}>
                    cyberguard-5lg8.vercel.app
                  </span>
                </div>
                <iframe
                  src={project.liveUrl}
                  title="CyberGuard Live Preview"
                  className="laptop-screen-iframe"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
