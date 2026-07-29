import React from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { personalInfo, socialLinks } from '../data/portfolio';
import '../styles/components.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-links">
        {socialLinks.map((link) => {
          let Icon = FiGithub;
          if (link.name.toLowerCase() === 'linkedin') Icon = FiLinkedin;
          if (link.name.toLowerCase() === 'email') Icon = FiMail;

          return (
            <a 
              key={link.name} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
              aria-label={link.name}
            >
              <Icon />
            </a>
          );
        })}
      </div>
      
      <p className="footer-text">
        Designed & Developed with <span className="footer-heart">❤️</span> by {personalInfo.name}
      </p>
      
      <p className="footer-text" style={{ fontSize: '0.85rem' }}>
        &copy; {currentYear} All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
