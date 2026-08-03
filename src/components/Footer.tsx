import React from 'react';
import { FiHeart, FiLinkedin, FiGithub, FiMail } from 'react-icons/fi';
import { personalInfo } from '../data/portfolio';
import '../styles/components.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="nav-logo-text">SK</span>
            <span>Saideepthi Kummari</span>
          </div>

          <p className="footer-text">
            Made with <FiHeart className="footer-heart" /> by Saideepthi Kummari
          </p>

          <div className="footer-links">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
            >
              <FiMail />
            </a>
          </div>

          <div className="footer-copy">
            © 2026 All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
