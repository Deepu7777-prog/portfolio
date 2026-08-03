import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGithub,
  FiDownload,
  FiCopy,
  FiCheck,
  FiExternalLink,
} from 'react-icons/fi';
import { personalInfo } from '../data/portfolio';
import GlobeCanvas from '../components/3d/Globe';
import '../styles/contact.css';

const Contact: React.FC = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedText(null), 2500);
  };

  return (
    <section id="contact" className="section gradient-bg">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Let's Connect</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Currently looking for internship opportunities and software engineering projects.
          </p>
        </div>

        <div className="contact-container">
          <motion.div
            className="contact-glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Action Buttons Bar */}
            <div className="contact-action-bar">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <FiLinkedin /> Open LinkedIn
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <FiGithub /> Open GitHub
              </a>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <FiDownload /> Download Resume
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="btn btn-secondary"
              >
                <FiMail /> Send Email
              </a>
            </div>

            {/* Info Grid with Copy Buttons */}
            <div className="contact-grid-info">
              {/* Email Card */}
              <div className="contact-info-item">
                <div className="contact-info-left">
                  <div className="contact-icon-box">
                    <FiMail />
                  </div>
                  <div>
                    <div className="contact-info-label">Email Address</div>
                    <div className="contact-info-val">{personalInfo.email}</div>
                  </div>
                </div>
                <button
                  className="contact-copy-btn"
                  onClick={() => handleCopy(personalInfo.email, 'Email')}
                >
                  <FiCopy /> Copy
                </button>
              </div>

              {/* Phone Card */}
              <div className="contact-info-item">
                <div className="contact-info-left">
                  <div className="contact-icon-box">
                    <FiPhone />
                  </div>
                  <div>
                    <div className="contact-info-label">Phone Number</div>
                    <div className="contact-info-val">{personalInfo.phone}</div>
                  </div>
                </div>
                <button
                  className="contact-copy-btn"
                  onClick={() => handleCopy(personalInfo.phone, 'Phone')}
                >
                  <FiCopy /> Copy
                </button>
              </div>

              {/* Location Card */}
              <div className="contact-info-item">
                <div className="contact-info-left">
                  <div className="contact-icon-box">
                    <FiMapPin />
                  </div>
                  <div>
                    <div className="contact-info-label">Location</div>
                    <div className="contact-info-val">{personalInfo.location}</div>
                  </div>
                </div>
                <button
                  className="contact-copy-btn"
                  onClick={() => handleCopy(personalInfo.location, 'Location')}
                >
                  <FiCopy /> Copy
                </button>
              </div>

              {/* LinkedIn URL Card */}
              <div className="contact-info-item">
                <div className="contact-info-left">
                  <div className="contact-icon-box">
                    <FiExternalLink />
                  </div>
                  <div>
                    <div className="contact-info-label">LinkedIn Profile</div>
                    <div className="contact-info-val">saideepthikummarii</div>
                  </div>
                </div>
                <button
                  className="contact-copy-btn"
                  onClick={() => handleCopy(personalInfo.linkedin, 'LinkedIn URL')}
                >
                  <FiCopy /> Copy
                </button>
              </div>
            </div>

            {/* 3D Sangareddy Globe Canvas */}
            <div style={{ marginTop: '48px', height: '320px', borderRadius: '24px', overflow: 'hidden' }}>
              <GlobeCanvas />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Copy Notification Toast */}
      <AnimatePresence>
        {copiedText && (
          <motion.div
            className="copy-toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <FiCheck style={{ fontSize: '1.2rem', color: '#10B981' }} />
            <span>{copiedText}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
