import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiFolder, FiSend, FiLinkedin, FiGithub, FiChevronDown } from 'react-icons/fi';
import { personalInfo } from '../data/portfolio';
import HeroScene from '../components/3d/HeroScene';
import '../styles/hero.css';

const easeOutTransition = [0.16, 1, 0.3, 1] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutTransition } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const Hero: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        {/* LEFT SIDE: Typography, Role Chips, CTAs, Social Icons */}
        <motion.div
          className="hero-text"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-greeting" variants={fadeInUp}>
            <span>Hello</span>
            <span className="wave">👋</span>
          </motion.div>

          <motion.div variants={fadeInUp} style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
            I'm
          </motion.div>

          <motion.h1 className="hero-name text-gradient" variants={fadeInUp}>
            {personalInfo.name}
          </motion.h1>

          <motion.div className="hero-role-badges" variants={fadeInUp}>
            <span className="hero-role-chip">AI & Machine Learning Enthusiast</span>
            <span className="hero-role-chip">Python Developer</span>
            <span className="hero-role-chip">Cybersecurity Explorer</span>
          </motion.div>

          <motion.p className="hero-description" variants={fadeInUp}>
            {personalInfo.heroIntro}
          </motion.p>

          <motion.div className="hero-cta" variants={fadeInUp}>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <FiDownload /> Download Resume
            </a>
            <a
              href="#projects"
              onClick={(e) => handleScrollTo(e, '#projects')}
              className="btn btn-secondary"
            >
              <FiFolder /> View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="btn btn-secondary"
            >
              <FiSend /> Let's Connect
            </a>
          </motion.div>

          <motion.div className="hero-social" variants={fadeInUp}>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hero-social-btn"
            >
              <FiLinkedin />
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hero-social-btn"
            >
              <FiGithub />
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: Pixar 3D Girl Avatar Canvas */}
        <motion.div
          className="hero-avatar-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="hero-avatar-glow" />
          <div className="hero-canvas-container">
            <HeroScene />
          </div>
        </motion.div>
      </div>

      <div className="hero-scroll-indicator">
        <span>Scroll Down</span>
        <FiChevronDown />
      </div>
    </section>
  );
};

export default Hero;
